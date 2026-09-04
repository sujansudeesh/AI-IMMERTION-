import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { isManagerOrAbove } from '@/lib/permissions';
import { convertToCSV } from '@/lib/csv';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('pos_token')?.value;
    const authUser = token ? verifyJwt(token) : null;

    if (!isManagerOrAbove(authUser)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'sales'; // sales | products | inventory | purchases
    const exportCsv = searchParams.get('export') === 'true';

    if (type === 'sales') {
      const orders = await prisma.order.findMany({
        include: {
          customer: { select: { name: true, email: true } },
          items: { include: { product: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (exportCsv) {
        const rows = orders.map((o) => ({
          OrderNumber: o.orderNumber,
          Date: new Date(o.createdAt).toLocaleDateString(),
          Type: o.orderType,
          Customer: o.customer?.name || 'Walk-in',
          ItemsCount: o.items.length,
          Subtotal: o.subtotal,
          GST: o.gstTotal,
          DeliveryFee: o.deliveryFee,
          GrandTotal: o.grandTotal,
          PaymentMethod: o.paymentMethod,
          Status: o.orderStatus,
        }));
        const csvContent = convertToCSV(rows);
        return new NextResponse(csvContent, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="sales_report.csv"',
          },
        });
      }

      return NextResponse.json({ report: orders });
    } else if (type === 'products') {
      // Product Profitability & Performance Report
      const products = await prisma.product.findMany({
        include: {
          category: true,
          orderItems: true,
        },
      });

      const productReport = products.map((p) => {
        const totalSold = p.orderItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalRevenue = p.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
        const totalCost = totalSold * p.purchasePrice;
        const grossProfit = totalRevenue - totalCost;

        return {
          id: p.id,
          sku: p.sku,
          name: p.name,
          category: p.category.name,
          purchasePrice: p.purchasePrice,
          sellingPrice: p.sellingPrice,
          currentStock: p.currentStock,
          totalSold,
          totalRevenue,
          totalCost,
          grossProfit,
          profitMarginPct: totalRevenue > 0 ? ((grossProfit / totalRevenue) * 100).toFixed(1) : '0.0',
        };
      });

      if (exportCsv) {
        const csvContent = convertToCSV(productReport);
        return new NextResponse(csvContent, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="product_profitability_report.csv"',
          },
        });
      }

      return NextResponse.json({ report: productReport });
    } else if (type === 'inventory') {
      // Inventory Valuation Report
      const products = await prisma.product.findMany({
        include: { category: true, supplier: true },
      });

      const inventoryReport = products.map((p) => ({
        SKU: p.sku,
        ProductName: p.name,
        Category: p.category.name,
        Supplier: p.supplier?.name || 'N/A',
        StockQuantity: p.currentStock,
        UnitPurchaseCost: p.purchasePrice,
        TotalValuation: p.currentStock * p.purchasePrice,
        Status: p.currentStock === 0 ? 'Out of Stock' : p.currentStock <= p.minStock ? 'Low Stock' : 'In Stock',
      }));

      if (exportCsv) {
        const csvContent = convertToCSV(inventoryReport);
        return new NextResponse(csvContent, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="inventory_valuation_report.csv"',
          },
        });
      }

      const totalValuation = inventoryReport.reduce((sum, r) => sum + r.TotalValuation, 0);
      return NextResponse.json({ report: inventoryReport, totalValuation });
    }

    return NextResponse.json({ error: 'Invalid report type' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Report generation failed' }, { status: 500 });
  }
}
