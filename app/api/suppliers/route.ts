import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isManagerOrAbove } from '@/lib/permissions';

export async function GET(req: NextRequest) {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        _count: { select: { products: true, purchases: true } },
      },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ suppliers });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch suppliers' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isManagerOrAbove(authUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { name, contactPerson, phone, email, address, gstin } = await req.json();

    if (!name || !contactPerson || !phone || !email) {
      return NextResponse.json({ error: 'Missing required supplier fields' }, { status: 400 });
    }

    const supplier = await prisma.supplier.create({
      data: {
        name,
        contactPerson,
        phone,
        email,
        address: address || '',
        gstin: gstin || null,
      },
    });

    return NextResponse.json({ supplier });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create supplier' }, { status: 500 });
  }
}
