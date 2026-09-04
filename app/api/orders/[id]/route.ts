import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isStaffOrAbove } from '@/lib/permissions';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: params.id }, { orderNumber: params.id }],
      },
      include: {
        customer: { select: { id: true, name: true, email: true, phone: true } },
        items: { include: { product: true } },
        invoice: true,
        createdBy: { select: { name: true } },
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (!isStaffOrAbove(authUser) && order.customerId !== authUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const storeInfo = await prisma.storeSetting.findUnique({ where: { id: 'default' } });

    return NextResponse.json({ order, storeInfo });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching order' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isStaffOrAbove(authUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { orderStatus, paymentStatus } = await req.json();

    const existingOrder = await prisma.order.findUnique({
      where: { id: params.id },
      include: { items: true },
    });

    if (!existingOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Auto-restock inventory if order is cancelled
    if (orderStatus === 'CANCELLED' && existingOrder.orderStatus !== 'CANCELLED') {
      await prisma.$transaction(async (tx) => {
        for (const item of existingOrder.items) {
          const prod = await tx.product.findUnique({ where: { id: item.productId } });
          if (prod) {
            const prevStock = prod.currentStock;
            const newStock = prevStock + item.quantity;
            await tx.product.update({
              where: { id: prod.id },
              data: { currentStock: newStock, status: 'ACTIVE' },
            });
            await tx.inventoryLog.create({
              data: {
                productId: prod.id,
                action: 'ADJUSTMENT',
                quantityChange: item.quantity,
                previousStock: prevStock,
                newStock,
                notes: `Restock due to cancelled order #${existingOrder.orderNumber}`,
                createdById: authUser?.id,
              },
            });
          }
        }
      });
    }

    const updated = await prisma.order.update({
      where: { id: params.id },
      data: {
        orderStatus: orderStatus || existingOrder.orderStatus,
        paymentStatus: paymentStatus || existingOrder.paymentStatus,
      },
    });

    return NextResponse.json({ order: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update order status' }, { status: 500 });
  }
}
