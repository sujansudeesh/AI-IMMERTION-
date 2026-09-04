'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { formatCurrency } from '@/lib/invoice';
import { BarChart3, Download, Printer, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState<'sales' | 'products' | 'inventory'>('sales');
  const [reportData, setReportData] = useState<any[]>([]);
  const [totalValuation, setTotalValuation] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [reportType]);

  const fetchReport = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/reports?type=${reportType}`);
    const data = await res.json();
    setReportData(data.report || []);
    setTotalValuation(data.totalValuation || 0);
    setLoading(false);
  };

  const handleExportCSV = () => {
    window.open(`/api/admin/reports?type=${reportType}&export=true`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <AdminHeader title="Financial & Sales Analytics Reports" />

      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* Report Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex gap-2 text-xs">
            {[
              { id: 'sales', label: 'Sales & Revenue Report' },
              { id: 'products', label: 'Product Profitability Report' },
              { id: 'inventory', label: 'Inventory Valuation Report' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setReportType(t.id as any)}
                className={`px-4 py-2 rounded-xl font-bold transition ${
                  reportType === t.id ? 'bg-brand-600 text-white shadow' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow transition"
            >
              <Download className="w-4 h-4" />
              <span>Export as CSV</span>
            </button>
            <button
              onClick={handlePrint}
              className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Report</span>
            </button>
          </div>
        </div>

        {/* Report Table Area */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden text-xs" id="printable-invoice">
          
          {reportType === 'sales' && (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase font-semibold bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-3 px-4">Order #</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Channel</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">GST Tax</th>
                  <th className="py-3 px-4">Grand Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {reportData.map((o) => (
                  <tr key={o.id}>
                    <td className="py-3 px-4 font-mono font-bold">#{o.orderNumber}</td>
                    <td className="py-3 px-4 text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-semibold">{o.orderType}</td>
                    <td className="py-3 px-4">{o.customer?.name || 'Walk-in'}</td>
                    <td className="py-3 px-4 text-slate-500">{formatCurrency(o.gstTotal)}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{formatCurrency(o.grandTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'products' && (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase font-semibold bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-3 px-4">SKU / Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Cost vs Selling</th>
                  <th className="py-3 px-4">Units Sold</th>
                  <th className="py-3 px-4">Total Revenue</th>
                  <th className="py-3 px-4">Estimated Gross Profit</th>
                  <th className="py-3 px-4">Margin %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {reportData.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{p.sku}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{p.category}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {formatCurrency(p.purchasePrice)} → {formatCurrency(p.sellingPrice)}
                    </td>
                    <td className="py-3 px-4 font-semibold">{p.totalSold} pcs</td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{formatCurrency(p.totalRevenue)}</td>
                    <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(p.grossProfit)}</td>
                    <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">{p.profitMarginPct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'inventory' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 flex justify-between items-center border-b">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Total Inventory Asset Valuation:</span>
                <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{formatCurrency(totalValuation)}</span>
              </div>

              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase font-semibold bg-slate-50 dark:bg-slate-900/50">
                    <th className="py-3 px-4">SKU / Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Stock Quantity</th>
                    <th className="py-3 px-4">Unit Purchase Cost</th>
                    <th className="py-3 px-4">Asset Valuation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {reportData.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900 dark:text-white">{item.ProductName}</p>
                        <p className="text-[10px] font-mono text-slate-400">{item.SKU}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{item.Category}</td>
                      <td className="py-3 px-4 font-bold">{item.StockQuantity} pcs</td>
                      <td className="py-3 px-4 font-semibold">{formatCurrency(item.UnitPurchaseCost)}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{formatCurrency(item.TotalValuation)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
