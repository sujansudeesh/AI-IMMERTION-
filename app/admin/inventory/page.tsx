'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { formatCurrency } from '@/lib/invoice';
import { Layers, History, Sliders, AlertTriangle, Plus, Minus } from 'lucide-react';

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [activeTab, setActiveTab] = useState<'inventory' | 'logs'>('inventory');
  const [filter, setFilter] = useState('all');

  // Adjustment Modal
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [adjustmentQty, setAdjustmentQty] = useState(0);
  const [adjustAction, setAdjustAction] = useState('ADJUSTMENT');
  const [reason, setReason] = useState('');

  useEffect(() => {
    fetchInventory();
    fetchLogs();
  }, [filter]);

  const fetchInventory = async () => {
    const res = await fetch(`/api/inventory?filter=${filter}`);
    const data = await res.json();
    setInventory(data.inventory || []);
    setStats(data.stats || {});
  };

  const fetchLogs = async () => {
    const res = await fetch('/api/inventory/logs');
    const data = await res.json();
    setLogs(data.logs || []);
  };

  const handleStockAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    await fetch('/api/inventory/adjust', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: selectedProduct.id,
        adjustment: adjustmentQty,
        action: adjustAction,
        reason,
      }),
    });

    setShowAdjustModal(false);
    fetchInventory();
    fetchLogs();
  };

  return (
    <div>
      <AdminHeader title="Real-time Inventory Management" />

      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* KPI Alert Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-slate-400 font-semibold uppercase">Total Tracked SKUs</span>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.totalProducts || 0}</p>
            </div>
            <Layers className="w-6 h-6 text-brand-500" />
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-amber-600 dark:text-amber-400 font-semibold uppercase">Low Stock Threshold</span>
              <p className="text-xl font-bold text-amber-600">{stats.lowStockCount || 0}</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-amber-500" />
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-red-600 dark:text-red-400 font-semibold uppercase">Out of Stock SKUs</span>
              <p className="text-xl font-bold text-red-600">{stats.outOfStockCount || 0}</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
        </div>

        {/* Tab Selection & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'inventory' ? 'bg-brand-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Master Inventory</span>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'logs' ? 'bg-brand-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Transaction Audit History</span>
            </button>
          </div>

          {activeTab === 'inventory' && (
            <div className="flex gap-2 text-xs">
              {['all', 'low_stock', 'out_of_stock'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-xl font-semibold capitalize ${
                    filter === f ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'bg-white dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  {f.replace('_', ' ')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab 1: Inventory Table */}
        {activeTab === 'inventory' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase font-semibold bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-3 px-4">Product / SKU</th>
                  <th className="py-3 px-4">Supplier</th>
                  <th className="py-3 px-4">Selling Price</th>
                  <th className="py-3 px-4">Current Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {inventory.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{p.sku} • {p.category?.name}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{p.supplier?.name || 'N/A'}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{formatCurrency(p.sellingPrice)}</td>
                    <td className="py-3 px-4 font-bold">
                      {p.currentStock} <span className="text-[10px] font-normal text-slate-400">(Min: {p.minStock})</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.currentStock === 0 ? 'bg-red-100 text-red-700' : p.currentStock <= p.minStock ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {p.currentStock === 0 ? 'Out of Stock' : p.currentStock <= p.minStock ? 'Low Stock' : 'Healthy Stock'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedProduct(p);
                          setAdjustmentQty(0);
                          setShowAdjustModal(true);
                        }}
                        className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold px-3 py-1.5 rounded-xl transition"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Transaction Audit Log */}
        {activeTab === 'logs' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase font-semibold bg-slate-50 dark:bg-slate-900/50">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Product SKU</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Quantity Change</th>
                  <th className="py-3 px-4">Stock Before → After</th>
                  <th className="py-3 px-4">Audit Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="py-3 px-4 text-slate-400">{new Date(log.createdAt).toLocaleString()}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{log.product?.name} ({log.product?.sku})</td>
                    <td className="py-3 px-4">
                      <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded font-bold text-[10px]">{log.action}</span>
                    </td>
                    <td className={`py-3 px-4 font-bold ${log.quantityChange > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {log.quantityChange > 0 ? `+${log.quantityChange}` : log.quantityChange}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{log.previousStock} → {log.newStock}</td>
                    <td className="py-3 px-4 text-slate-500">{log.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>

      {/* Adjust Stock Modal */}
      {showAdjustModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Adjust Inventory Stock: {selectedProduct.name}
            </h3>
            <p className="text-slate-500">Current Stock: <span className="font-bold text-slate-900 dark:text-white">{selectedProduct.currentStock}</span></p>

            <form onSubmit={handleStockAdjustment} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Action Type</label>
                <select
                  value={adjustAction}
                  onChange={(e) => setAdjustAction(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                >
                  <option value="ADJUSTMENT">Manual Adjustment</option>
                  <option value="DAMAGE">Damaged Stock Removal</option>
                  <option value="RETURN">Customer Return Restock</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Adjustment Quantity (+ or -)</label>
                <input
                  type="number"
                  required
                  value={adjustmentQty}
                  onChange={(e) => setAdjustmentQty(parseInt(e.target.value, 10) || 0)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl font-bold"
                />
                <span className="text-[10px] text-slate-400">Resulting New Stock: {selectedProduct.currentStock + adjustmentQty}</span>
              </div>

              <div>
                <label className="block font-semibold mb-1">Audit Reason / Note</label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="E.g. Physical audit recount, expired batch..."
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                  className="w-1/2 py-2 bg-slate-100 dark:bg-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-brand-600 text-white font-bold rounded-xl"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
