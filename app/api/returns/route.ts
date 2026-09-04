import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isStaffOrAbove } from '@/lib/permissions';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isStaffOrAbove(authUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const returns = await prisma.returnRequest.findMany({
      include: {
        order: { select: { id: true, orderNumber: true, customer: { select: { name: true, phone: true } } } },
        product: { select: { id: true, name: true, sku: true, imageUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ returns });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch return requests' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    const body = await req.json();
    const { action } = body; // 'REQUEST' | 'APPROVE' | 'REJECT'

    if (action === 'REQUEST') {
      const { orderId, productId, quantity, reason } = body;
      const orderItem = await prisma.orderItem.findFirst({
        where: { orderId, productId },
        include: { product: true },
      });

      if (!orderItem) {
        return NextResponse.json({ error: 'Item not found in order' }, { status: 404 });
      }

      const returnReq = await prisma.returnRequest.create({
        data: {
          orderId,
          productId,
          quantity: parseInt(quantity, 10),
          reason: reason || 'Customer requested return',
          refundAmount: orderItem.totalPrice,
          status: 'PENDING',
        },
      });

      return NextResponse.json({ returnRequest: returnReq });
    } else if (action === 'APPROVE' || action === 'REJECT') {
      if (!isStaffOrAbove(authUser)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }

      const { returnId, restocked = true } = body;

      const returnReq = await prisma.returnRequest.findUnique({
        where: { id: returnId },
        include: { product: true, order: true },
      });

      if (!returnReq) {
        return NextResponse.json({ error: 'Return request not found' }, { status: 404 });
      }

      if (action === 'APPROVE') {
        await prisma.$transaction(async (tx) => {
          if (restocked) {
            const prevStock = returnReq.product.currentStock;
            const newStock = prevStock + returnReq.quantity;

            await tx.product.update({
              where: { id: returnReq.product.id },
              data: { currentStock: newStock, status: 'ACTIVE' },
            });

            await tx.inventoryLog.create({
              data: {
                productId: returnReq.product.id,
                action: 'RETURN',
                quantityChange: returnReq.quantity,
                previousStock: prevStock,
                newStock,
                notes: `Restock from approved return #${returnReq.id} (Order #${returnReq.order.orderNumber})`,
                createdById: authUser?.id,
              },
            });
          }

          await tx.returnRequest.update({
            where: { id: returnId },
            data: {
              status: 'APPROVED',
              restocked,
            },
          });
        });
      } else {
        await prisma.returnRequest.update({
          where: { id: returnId },
          data: { status: 'REJECTED' },
        });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Return processing failed' }, { status: 500 });
  }
}
