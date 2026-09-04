import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isStaffOrAbove } from '@/lib/permissions';
import { deductStockAtomic } from '@/lib/stock';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isStaffOrAbove(authUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { items, paymentMethod, discountFlat = 0, customerId } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in POS cart' }, { status: 400 });
    }

    const orderNumber = `POS-${Date.now().toString().slice(-6)}`;

    // Calculate billing totals server-side
    let subtotal = 0;
    let gstTotal = 0;
    const orderItemsData = [];
    const stockDeductions = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) throw new Error(`Product ${item.productId} not found`);

      const qty = parseInt(item.quantity, 10);
      if (qty <= 0) throw new Error(`Invalid quantity for ${product.name}`);

      if (product.currentStock < qty) {
        throw new Error(`Insufficient stock for ${product.name}. Available: ${product.currentStock}`);
      }

      const unitPrice = product.sellingPrice;
      const discount = product.discountPrice ? unitPrice - product.discountPrice : 0;
      const lineSubtotal = (unitPrice - discount) * qty;
      const lineGst = (lineSubtotal * product.gstRate) / 100;

      subtotal += lineSubtotal;
      gstTotal += lineGst;

      orderItemsData.push({
        productId: product.id,
        quantity: qty,
        unitPrice,
        discount,
        gst: lineGst,
        totalPrice: lineSubtotal,
      });

      stockDeductions.push({
        productId: product.id,
        quantity: qty,
      });
    }

    const grandTotal = Math.max(0, subtotal + gstTotal - discountFlat);

    // 1. Perform atomic stock deduction
    await deductStockAtomic(stockDeductions, 'POS_SALE', orderNumber, authUser?.id);

    // 2. Create POS order & Invoice record
    const store = await prisma.storeSetting.findUnique({ where: { id: 'default' } });

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customerId || null,
        orderType: 'POS',
        orderStatus: 'DELIVERED',
        paymentStatus: 'PAID',
        paymentMethod: paymentMethod || 'CASH',
        subtotal,
        discountTotal: discountFlat,
        gstTotal,
        deliveryFee: 0,
        grandTotal,
        createdById: authUser?.id,
        items: { create: orderItemsData },
        invoice: {
          create: {
            invoiceNumber: `INV-${orderNumber}`,
            notes: 'Thank you for shopping with us!',
          },
        },
      },
      include: {
        items: { include: { product: true } },
        invoice: true,
        customer: true,
      },
    });

    return NextResponse.json({
      order,
      invoiceData: {
        invoiceNumber: order.invoice?.invoiceNumber,
        orderNumber: order.orderNumber,
        issueDate: new Date().toISOString(),
        storeInfo: {
          name: store?.storeName || 'SuperMart Retail',
          address: store?.storeAddress || '',
          phone: store?.storePhone || '',
          email: store?.storeEmail || '',
          gstin: store?.gstin || '',
        },
        customerInfo: {
          name: order.customer?.name || 'Walk-in Customer',
          phone: order.customer?.phone || 'N/A',
          address: 'Store Counter POS',
        },
        items: order.items.map((i) => ({
          name: i.product.name,
          sku: i.product.sku,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          discount: i.discount,
          gstRate: i.product.gstRate,
          totalPrice: i.totalPrice,
        })),
        subtotal,
        discountTotal: discountFlat,
        gstTotal,
        deliveryFee: 0,
        grandTotal,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'POS Billing failed' }, { status: 500 });
  }
}
