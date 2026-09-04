import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isSuperAdmin } from '@/lib/permissions';

export async function GET() {
  try {
    const settings = await prisma.storeSetting.findUnique({ where: { id: 'default' } });
    return NextResponse.json({ settings });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isSuperAdmin(authUser)) {
      return NextResponse.json({ error: 'Super Admin access required' }, { status: 403 });
    }

    const body = await req.json();

    const updated = await prisma.storeSetting.upsert({
      where: { id: 'default' },
      update: {
        storeName: body.storeName,
        storeAddress: body.storeAddress,
        storePhone: body.storePhone,
        storeEmail: body.storeEmail,
        gstin: body.gstin,
        currency: body.currency,
        defaultGst: parseFloat(body.defaultGst || 18),
        lowStockThreshold: parseInt(body.lowStockThreshold || 5, 10),
        showExactStockToCustomers: body.showExactStockToCustomers ?? true,
      },
      create: {
        id: 'default',
        storeName: body.storeName || 'SuperMart Retail',
        storeAddress: body.storeAddress || '',
        storePhone: body.storePhone || '',
        storeEmail: body.storeEmail || '',
        gstin: body.gstin || '',
        currency: body.currency || '₹',
        defaultGst: parseFloat(body.defaultGst || 18),
        lowStockThreshold: parseInt(body.lowStockThreshold || 5, 10),
        showExactStockToCustomers: body.showExactStockToCustomers ?? true,
      },
    });

    return NextResponse.json({ settings: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update settings' }, { status: 500 });
  }
}
