import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isStaffOrAbove } from '@/lib/permissions';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isStaffOrAbove(authUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { productId, adjustment, action, reason } = await req.json();

    if (!productId || adjustment === undefined || !action) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const previousStock = product.currentStock;
    const newStock = previousStock + parseInt(adjustment, 10);

    if (newStock < 0) {
      return NextResponse.json({ error: 'Cannot reduce stock below zero' }, { status: 400 });
    }

    const status = newStock === 0 ? 'OUT_OF_STOCK' : 'ACTIVE';

    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: productId },
        data: { currentStock: newStock, status },
      });

      await tx.inventoryLog.create({
        data: {
          productId,
          action, // 'ADJUSTMENT' | 'DAMAGE' | 'RETURN' | 'PURCHASE'
          quantityChange: parseInt(adjustment, 10),
          previousStock,
          newStock,
          notes: reason || `Manual adjustment by ${authUser?.name || 'Staff'}`,
          createdById: authUser?.id,
        },
      });
    });

    return NextResponse.json({ success: true, newStock });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Stock adjustment failed' }, { status: 500 });
  }
}
