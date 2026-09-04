import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { deductStockAtomic } from '@/lib/stock';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    const { items, address, paymentMethod } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!address || !address.fullName || !address.addressLine || !address.city || !address.pincode) {
      return NextResponse.json({ error: 'Incomplete delivery address' }, { status: 400 });
    }

    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

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
        throw new Error(`Insufficient stock for "${product.name}". Available: ${product.currentStock}`);
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

    const deliveryFee = subtotal > 500 ? 0 : 40;
    const grandTotal = Math.round(subtotal + gstTotal + deliveryFee);

    // 1. Atomic Stock Locking & Deduction
    await deductStockAtomic(stockDeductions, 'SALE', orderNumber, authUser?.id);

    // 2. Create Order & Invoice
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: authUser?.id || null,
        orderType: 'ONLINE',
        orderStatus: 'CONFIRMED',
        paymentStatus: 'PAID',
        paymentMethod: paymentMethod || 'UPI',
        subtotal,
        discountTotal: 0,
        gstTotal,
        deliveryFee,
        grandTotal,
        shippingAddressJson: JSON.stringify(address),
        items: { create: orderItemsData },
        invoice: {
          create: {
            invoiceNumber: `INV-${orderNumber}`,
            notes: 'Online Order Confirmation',
          },
        },
      },
      include: {
        items: { include: { product: true } },
        invoice: true,
      },
    });

    // 3. Admin Notification
    const adminUsers = await prisma.user.findMany({
      where: { role: { in: ['SUPER_ADMIN', 'MANAGER'] } },
    });

    for (const admin of adminUsers) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          title: `New Online Order #${orderNumber}`,
          message: `Order of ₹${grandTotal} placed by ${address.fullName}.`,
          type: 'NEW_ORDER',
        },
      });
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}
