import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isStaffOrAbove, canViewSensitiveFinancials } from '@/lib/permissions';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isStaffOrAbove(authUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter') || 'all'; // all | low_stock | out_of_stock
    const search = searchParams.get('search') || '';

    const canSeeFinancials = canViewSensitiveFinancials(authUser);

    let where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { sku: { contains: search } },
        { brand: { contains: search } },
      ];
    }

    if (filter === 'low_stock') {
      where.AND = [
        { currentStock: { gt: 0 } },
        { currentStock: { lte: prisma.product.fields.minStock } }, // Handled in JS or raw comparison
      ];
    } else if (filter === 'out_of_stock') {
      where.currentStock = 0;
    }

    let products = await prisma.product.findMany({
      where: search ? where : undefined,
      include: {
        category: true,
        supplier: true,
      },
      orderBy: { currentStock: 'asc' },
    });

    if (filter === 'low_stock') {
      products = products.filter((p) => p.currentStock > 0 && p.currentStock <= p.minStock);
    } else if (filter === 'out_of_stock') {
      products = products.filter((p) => p.currentStock === 0);
    }

    const lowStockCount = products.filter((p) => p.currentStock > 0 && p.currentStock <= p.minStock).length;
    const outOfStockCount = products.filter((p) => p.currentStock === 0).length;

    const sanitized = products.map((p) => {
      const { purchasePrice, ...rest } = p;
      return canSeeFinancials ? p : rest;
    });

    return NextResponse.json({
      inventory: sanitized,
      stats: {
        totalProducts: products.length,
        lowStockCount,
        outOfStockCount,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch inventory' }, { status: 500 });
  }
}
