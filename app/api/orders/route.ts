import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isStaffOrAbove } from '@/lib/permissions';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const orderType = searchParams.get('orderType');

    let where: any = {};

    if (!isStaffOrAbove(authUser)) {
      if (!authUser) {
        return NextResponse.json({ orders: [] });
      }
      where.customerId = authUser.id;
    }

    if (status) where.orderStatus = status;
    if (orderType) where.orderType = orderType;

    const orders = await prisma.order.findMany({
      where,
      include: {
        customer: { select: { id: true, name: true, email: true, phone: true } },
        items: { include: { product: true } },
        invoice: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
