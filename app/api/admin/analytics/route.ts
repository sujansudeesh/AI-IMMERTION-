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

    const canSeeFinancials = canViewSensitiveFinancials(authUser);

    // 1. KPI Cards
    const totalOrders = await prisma.order.count();
    const totalCustomers = await prisma.user.count({ where: { role: 'CUSTOMER' } });

    const products = await prisma.product.findMany();
    const lowStockCount = products.filter((p) => p.currentStock > 0 && p.currentStock <= p.minStock).length;
    const outOfStockCount = products.filter((p) => p.currentStock === 0).length;

    const orders = await prisma.order.findMany({
      include: {
        items: { include: { product: true } },
      },
    });

    const totalSales = orders.reduce((sum, o) => sum + o.grandTotal, 0);

    // Today's Sales
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = orders.filter((o) => new Date(o.createdAt) >= today);
    const todaySales = todayOrders.reduce((sum, o) => sum + o.grandTotal, 0);

    // Estimated Profit Calculation (Admin Only)
    let totalProfit = 0;
    if (canSeeFinancials) {
      for (const o of orders) {
        for (const item of o.items) {
          const cost = item.product.purchasePrice * item.quantity;
          const revenue = item.totalPrice;
          totalProfit += Math.max(0, revenue - cost);
        }
      }
    }

    // 2. Sales Trends Chart Data (Last 7 days)
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

      const startOfDay = new Date(d);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(d);
      endOfDay.setHours(23, 59, 59, 999);

      const dayOrders = orders.filter((o) => {
        const orderDate = new Date(o.createdAt);
        return orderDate >= startOfDay && orderDate <= endOfDay;
      });

      const daySales = dayOrders.reduce((sum, o) => sum + o.grandTotal, 0);

      chartData.push({
        date: dayStr,
        sales: daySales,
        orders: dayOrders.length,
      });
    }

    // Recent 5 orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: { select: { name: true } },
      },
    });

    // Recent Notifications
    const notifications = await prisma.notification.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      kpis: {
        todaySales,
        todayOrdersCount: todayOrders.length,
        totalSales: canSeeFinancials ? totalSales : null,
        totalProfit: canSeeFinancials ? totalProfit : null,
        totalOrders,
        totalCustomers,
        lowStockCount,
        outOfStockCount,
      },
      salesChart: chartData,
      recentOrders,
      notifications,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Analytics error' }, { status: 500 });
  }
}
