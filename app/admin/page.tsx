'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Link from 'next/link';
import { formatCurrency } from '@/lib/invoice';
import {
  DollarSign,
  ShoppingBag,
  Users,
  AlertTriangle,
  PackageX,
  TrendingUp,
  Calculator,
  PlusCircle,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((res) => res.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <AdminHeader title="Store Overview Dashboard" />
        <div className="p-8 text-center">
          <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  const kpis = data?.kpis || {};

  return (
    <div>
      <AdminHeader title="Store Overview Dashboard" />

      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* Low Stock Warning Banner */}
        {(kpis.lowStockCount > 0 || kpis.outOfStockCount > 0) && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-300">
            <div className="flex items-center gap-3 text-xs">
              <div className="p-2 bg-amber-500 text-white rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Inventory Attention Required</h4>
                <p>
                  You have <span className="font-bold">{kpis.lowStockCount} low-stock</span> and{' '}
                  <span className="font-bold text-red-600 dark:text-red-400">{kpis.outOfStockCount} out-of-stock</span> products.
                </p>
              </div>
            </div>
            <Link
              href="/admin/inventory?filter=low_stock"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shrink-0"
            >
              Manage Inventory
            </Link>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pos"
            className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Calculator className="w-4 h-4" />
            <span>Open POS Terminal (New Bill)</span>
          </Link>
          <Link
            href="/admin/purchases"
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-brand-600" />
            <span>Add Stock Purchase</span>
          </Link>
        </div>

        {/* Today & Overall KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Today's Sales</span>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {formatCurrency(kpis.todaySales || 0)}
            </p>
            <p className="text-[11px] text-slate-500">{kpis.todayOrdersCount || 0} orders processed today</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Sales</span>
              <TrendingUp className="w-4 h-4 text-brand-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {kpis.totalSales !== null ? formatCurrency(kpis.totalSales) : 'Hidden'}
            </p>
            <p className="text-[11px] text-slate-500">Gross revenue across all channels</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Est. Gross Profit</span>
              <ShieldCheck className="w-4 h-4 text-brand-400" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {kpis.totalProfit !== null ? formatCurrency(kpis.totalProfit) : 'Hidden'}
            </p>
            <p className="text-[11px] text-slate-500">Selling Price - Purchase Cost</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Customers</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {kpis.totalCustomers || 0}
            </p>
            <p className="text-[11px] text-slate-500">Registered store users</p>
          </div>

        </div>

        {/* Recharts Sales Trend Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">7-Day Sales Trend (₹)</h3>
            <span className="text-xs text-slate-400">POS + Online Orders</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.salesChart || []}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val: any) => [formatCurrency(val), 'Sales']}
                />
                <Area type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Recent Orders</h3>
            <Link href="/admin/orders" className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase font-semibold">
                <th className="py-2.5">Order #</th>
                <th className="py-2.5">Type</th>
                <th className="py-2.5">Customer</th>
                <th className="py-2.5">Total</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {(data?.recentOrders || []).map((o: any) => (
                <tr key={o.id}>
                  <td className="py-2.5 font-mono font-bold text-slate-900 dark:text-white">#{o.orderNumber}</td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${o.orderType === 'POS' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {o.orderType}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-700 dark:text-slate-300">{o.customer?.name || 'Walk-in'}</td>
                  <td className="py-2.5 font-bold text-slate-900 dark:text-white">{formatCurrency(o.grandTotal)}</td>
                  <td className="py-2.5">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {o.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
