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

    const customers = await prisma.user.findMany({
      where: { role: 'CUSTOMER' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        orders: {
          select: {
            id: true,
            orderNumber: true,
            grandTotal: true,
            createdAt: true,
            orderStatus: true,
          },
        },
        addresses: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const sanitizedCustomers = customers.map((c) => {
      const totalOrders = c.orders.length;
      const totalSpent = c.orders.reduce((sum, o) => sum + o.grandTotal, 0);
      const lastOrder = c.orders[0]?.createdAt || null;

      return {
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        createdAt: c.createdAt,
        totalOrders,
        totalSpent,
        lastOrder,
        addresses: c.addresses,
        orders: c.orders,
      };
    });

    return NextResponse.json({ customers: sanitizedCustomers });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}
