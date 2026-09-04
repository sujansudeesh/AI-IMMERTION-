'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { formatCurrency } from '@/lib/invoice';
import { Plus, Edit3, Trash2, Search, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    brand: '',
    categoryId: '',
    description: '',
    purchasePrice: 100,
    sellingPrice: 130,
    discountPrice: 120,
    gstRate: 18,
    currentStock: 20,
    minStock: 5,
    maxStock: 100,
    unit: 'pack',
    supplierId: '',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [prodRes, catRes, supRes] = await Promise.all([
      fetch('/api/products?limit=100'),
      fetch('/api/categories'),
      fetch('/api/suppliers'),
    ]);
    const prodData = await prodRes.json();
    const catData = await catRes.json();
    const supData = await supRes.json();

    setProducts(prodData.products || []);
    setCategories(catData.categories || []);
    setSuppliers(supData.suppliers || []);
    if (catData.categories?.length) {
      setFormData((f) => ({ ...f, categoryId: catData.categories[0].id }));
    }
    setLoading(false);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeactivate = async (id: string) => {
    if (!confirm('Are you sure you want to deactivate this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AdminHeader title="Product Management" />

      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search products by SKU or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase font-semibold bg-slate-50 dark:bg-slate-900/50">
                <th className="py-3 px-4">SKU / Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Selling Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-slate-50 p-1" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{p.name}</p>
                        <p className="text-[10px] font-mono text-slate-400">{p.sku} • {p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{p.category?.name}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{formatCurrency(p.sellingPrice)}</td>
                  <td className="py-3 px-4 font-semibold">{p.currentStock} {p.unit}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDeactivate(p.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                      title="Deactivate Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-xl text-xs my-8">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Add New Product</h3>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="E.g. GRO-099"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="E.g. Amul"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="E.g. Amul Fresh Paneer 200g"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Supplier</label>
                  <select
                    value={formData.supplierId}
                    onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Purchase Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={formData.currentStock}
                    onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value, 10) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2 bg-slate-100 dark:bg-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-brand-600 text-white font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
