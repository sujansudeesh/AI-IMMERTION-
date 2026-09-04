import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isStaffOrAbove, canViewSensitiveFinancials } from '@/lib/permissions';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;
    const canSeeFinancials = canViewSensitiveFinancials(authUser);

    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        supplier: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const { purchasePrice, ...rest } = product;
    return NextResponse.json({ product: canSeeFinancials ? product : rest });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error fetching product' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isStaffOrAbove(authUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();

    const existingProduct = await prisma.product.findUnique({ where: { id: params.id } });
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name ?? existingProduct.name,
        brand: body.brand ?? existingProduct.brand,
        categoryId: body.categoryId ?? existingProduct.categoryId,
        description: body.description ?? existingProduct.description,
        purchasePrice: body.purchasePrice !== undefined ? parseFloat(body.purchasePrice) : existingProduct.purchasePrice,
        sellingPrice: body.sellingPrice !== undefined ? parseFloat(body.sellingPrice) : existingProduct.sellingPrice,
        discountPrice: body.discountPrice !== undefined ? (body.discountPrice ? parseFloat(body.discountPrice) : null) : existingProduct.discountPrice,
        gstRate: body.gstRate !== undefined ? parseFloat(body.gstRate) : existingProduct.gstRate,
        minStock: body.minStock !== undefined ? parseInt(body.minStock, 10) : existingProduct.minStock,
        maxStock: body.maxStock !== undefined ? parseInt(body.maxStock, 10) : existingProduct.maxStock,
        unit: body.unit ?? existingProduct.unit,
        weight: body.weight ?? existingProduct.weight,
        supplierId: body.supplierId !== undefined ? body.supplierId : existingProduct.supplierId,
        status: body.status ?? existingProduct.status,
        imageUrl: body.imageUrl ?? existingProduct.imageUrl,
        publicStockVisible: body.publicStockVisible ?? existingProduct.publicStockVisible,
      },
    });

    return NextResponse.json({ product: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isStaffOrAbove(authUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Soft delete: set status to HIDDEN
    const updated = await prisma.product.update({
      where: { id: params.id },
      data: { status: 'HIDDEN' },
    });

    return NextResponse.json({ message: 'Product deactivated successfully', product: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to deactivate product' }, { status: 500 });
  }
}
