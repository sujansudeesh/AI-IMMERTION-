import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isStaffOrAbove } from '@/lib/permissions';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
    return NextResponse.json({ categories });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isStaffOrAbove(authUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { name, description, icon } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'Category name required' }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        icon: icon || 'Tag',
      },
    });

    return NextResponse.json({ category });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create category' }, { status: 500 });
  }
}
