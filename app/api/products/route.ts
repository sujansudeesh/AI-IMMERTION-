import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isStaffOrAbove, canViewSensitiveFinancials } from '@/lib/permissions';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const availability = searchParams.get('availability');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;
    const canSeeFinancials = canViewSensitiveFinancials(authUser);

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { sku: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (category) {
      where.OR = [
        { categoryId: category },
        { category: { slug: category } },
      ];
    }

    if (brand) {
      where.brand = brand;
    }

    if (minPrice || maxPrice) {
      where.sellingPrice = {};
      if (minPrice) where.sellingPrice.gte = parseFloat(minPrice);
      if (maxPrice) where.sellingPrice.lte = parseFloat(maxPrice);
    }

    if (availability) {
      if (availability === 'in_stock') where.currentStock = { gt: 5 };
      else if (availability === 'low_stock') where.currentStock = { gt: 0, lte: 5 };
      else if (availability === 'out_of_stock') where.currentStock = 0;
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_low_high') orderBy = { sellingPrice: 'asc' };
    else if (sort === 'price_high_low') orderBy = { sellingPrice: 'desc' };
    else if (sort === 'popular') orderBy = { reviewsCount: 'desc' };
    else if (sort === 'rating') orderBy = { rating: 'desc' };

    const total = await prisma.product.count({ where });
    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        supplier: true,
      },
    });

    // Sanitize purchasePrice for non-admin/manager users
    const sanitizedProducts = products.map((p) => {
      const { purchasePrice, ...rest } = p;
      return canSeeFinancials ? p : rest;
    });

    return NextResponse.json({
      products: sanitizedProducts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isStaffOrAbove(authUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const {
      name,
      brand,
      categoryId,
      description,
      purchasePrice,
      sellingPrice,
      discountPrice,
      gstRate,
      currentStock,
      minStock,
      maxStock,
      unit,
      weight,
      supplierId,
      imageUrl,
      publicStockVisible,
    } = body;

    if (!name || !brand || !categoryId || !sellingPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const sku = body.sku || `SKU-${Date.now().toString().slice(-6)}`;
    const status = currentStock > 0 ? 'ACTIVE' : 'OUT_OF_STOCK';

    const product = await prisma.product.create({
      data: {
        sku,
        name,
        brand,
        categoryId,
        description: description || '',
        purchasePrice: parseFloat(purchasePrice || 0),
        sellingPrice: parseFloat(sellingPrice),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        gstRate: parseFloat(gstRate || 18),
        currentStock: parseInt(currentStock || 0, 10),
        minStock: parseInt(minStock || 5, 10),
        maxStock: parseInt(maxStock || 100, 10),
        unit: unit || 'pcs',
        weight: weight || null,
        supplierId: supplierId || null,
        status,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500',
        publicStockVisible: publicStockVisible ?? true,
      },
    });

    if (product.currentStock > 0) {
      await prisma.inventoryLog.create({
        data: {
          productId: product.id,
          action: 'PURCHASE',
          quantityChange: product.currentStock,
          previousStock: 0,
          newStock: product.currentStock,
          createdById: authUser?.id,
          notes: 'Initial Product Stock Addition',
        },
      });
    }

    return NextResponse.json({ product });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}
