import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isManagerOrAbove } from '@/lib/permissions';

export async function GET() {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        supplier: true,
        createdBy: { select: { name: true } },
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ purchases });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch purchases' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isManagerOrAbove(authUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { supplierId, invoiceNumber, purchaseDate, items, notes } = await req.json();

    if (!supplierId || !invoiceNumber || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Missing required purchase details' }, { status: 400 });
    }

    const purchaseNumber = `PO-${Date.now().toString().slice(-6)}`;

    let totalAmount = 0;

    const createdPurchase = await prisma.$transaction(async (tx) => {
      // 1. Calculate items total cost and create purchase record
      const purchaseItemsData = [];
      for (const item of items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product) throw new Error(`Product ${item.productId} not found`);

        const qty = parseInt(item.quantity, 10);
        const unitCost = parseFloat(item.unitCost);
        const gstAmount = Math.round(((qty * unitCost) * product.gstRate) / 100);
        const totalCost = qty * unitCost + gstAmount;

        totalAmount += totalCost;

        purchaseItemsData.push({
          productId: item.productId,
          quantity: qty,
          unitCost,
          gstAmount,
          totalCost,
        });

        // 2. Increment stock automatically
        const previousStock = product.currentStock;
        const newStock = previousStock + qty;

        await tx.product.update({
          where: { id: product.id },
          data: {
            currentStock: newStock,
            purchasePrice: unitCost, // Update latest purchase cost
            status: 'ACTIVE',
          },
        });

        // 3. Record Inventory Log
        await tx.inventoryLog.create({
          data: {
            productId: product.id,
            action: 'PURCHASE',
            quantityChange: qty,
            previousStock,
            newStock,
            notes: `Purchase Order #${purchaseNumber} (Inv #${invoiceNumber})`,
            createdById: authUser?.id,
          },
        });
      }

      const purchase = await tx.purchase.create({
        data: {
          purchaseNumber,
          supplierId,
          invoiceNumber,
          purchaseDate: purchaseDate ? new Date(purchaseDate) : new Date(),
          totalAmount,
          notes: notes || '',
          createdById: authUser!.id,
          items: {
            create: purchaseItemsData,
          },
        },
        include: {
          supplier: true,
          items: { include: { product: true } },
        },
      });

      return purchase;
    });

    return NextResponse.json({ purchase: createdPurchase });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Stock purchase failed' }, { status: 500 });
  }
}
