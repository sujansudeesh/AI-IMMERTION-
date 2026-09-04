'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { formatCurrency } from '@/lib/invoice';
import { Truck, Plus, Trash2, CheckCircle } from 'lucide-react';

export default function AdminPurchasesPage() {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  // New Purchase Form State
  const [supplierId, setSupplierId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<any[]>([{ productId: '', quantity: 10, unitCost: 100 }]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [purRes, supRes, prodRes] = await Promise.all([
      fetch('/api/purchases'),
      fetch('/api/suppliers'),
      fetch('/api/products?limit=100'),
    ]);
    const purData = await purRes.json();
    const supData = await supRes.json();
    const prodData = await prodRes.json();

    setPurchases(purData.purchases || []);
    setSuppliers(supData.suppliers || []);
    setProducts(prodData.products || []);
    if (supData.suppliers?.length) setSupplierId(supData.suppliers[0].id);
    if (prodData.products?.length) {
      setItems([{ productId: prodData.products[0].id, quantity: 10, unitCost: prodData.products[0].purchasePrice }]);
    }
  };

  const addItemRow = () => {
    if (products.length === 0) return;
    setItems([...items, { productId: products[0].id, quantity: 10, unitCost: products[0].purchasePrice }]);
  };

  const removeItemRow = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleCreatePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/purchases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        supplierId,
        invoiceNumber: invoiceNumber || `INV-${Date.now()}`,
        items,
        notes,
      }),
    });

    setShowModal(false);
    fetchData();
  };

  return (
    <div>
      <AdminHeader title="Stock-In Purchase Management" />

      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Supplier Purchase Logs</h2>
            <p className="text-xs text-slate-500">Record inventory stock-in purchases from distributors</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Create Purchase Entry</span>
          </button>
        </div>

        {/* Purchase Orders Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase font-semibold bg-slate-50 dark:bg-slate-900/50">
                <th className="py-3 px-4">PO # / Invoice</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Items Count</th>
                <th className="py-3 px-4">Total Cost</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {purchases.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900 dark:text-white">{p.purchaseNumber}</p>
                    <p className="text-[10px] text-slate-400 font-mono">Inv: {p.invoiceNumber}</p>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">{p.supplier?.name}</td>
                  <td className="py-3 px-4 text-slate-500">{new Date(p.purchaseDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{p.items?.length || 0} items</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{formatCurrency(p.totalAmount)}</td>
                  <td className="py-3 px-4">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      COMPLETED (STOCK UPDATED)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>

      {/* New Purchase Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 w-full max-w-xl rounded-3xl p-6 space-y-4 shadow-xl text-xs my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Record Stock-In Purchase</h3>

            <form onSubmit={handleCreatePurchase} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Supplier</label>
                  <select
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  >
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Supplier Invoice Number</label>
                  <input
                    type="text"
                    required
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="E.g. INV-SUP-901"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-slate-900 dark:text-white">Purchase Products</label>
                  <button type="button" onClick={addItemRow} className="text-brand-600 font-bold flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                {items.map((row, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-2 rounded-xl border">
                    <select
                      value={row.productId}
                      onChange={(e) => {
                        const prod = products.find((p) => p.id === e.target.value);
                        const updated = [...items];
                        updated[idx].productId = e.target.value;
                        if (prod) updated[idx].unitCost = prod.purchasePrice;
                        setItems(updated);
                      }}
                      className="flex-1 p-1.5 bg-white dark:bg-slate-800 border rounded-lg text-xs"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                      ))}
                    </select>

                    <input
                      type="number"
                      placeholder="Qty"
                      value={row.quantity}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx].quantity = parseInt(e.target.value, 10) || 0;
                        setItems(updated);
                      }}
                      className="w-16 p-1.5 bg-white dark:bg-slate-800 border rounded-lg font-bold text-center"
                    />

                    <input
                      type="number"
                      placeholder="Unit Cost ₹"
                      value={row.unitCost}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx].unitCost = parseFloat(e.target.value) || 0;
                        setItems(updated);
                      }}
                      className="w-20 p-1.5 bg-white dark:bg-slate-800 border rounded-lg font-bold text-right"
                    />

                    {items.length > 1 && (
                      <button type="button" onClick={() => removeItemRow(idx)} className="text-red-500 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-semibold mb-1">Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="E.g. Batch #441, Expiry 2027..."
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="w-1/2 py-2 bg-slate-100 dark:bg-slate-700 font-semibold rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="w-1/2 py-2 bg-brand-600 text-white font-bold rounded-xl">
                  Submit Purchase & Update Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
