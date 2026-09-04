'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Users, Plus, Phone, Mail, MapPin } from 'lucide-react';

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    gstin: '',
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const res = await fetch('/api/suppliers');
    const data = await res.json();
    setSuppliers(data.suppliers || []);
  };

  const handleCreateSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/suppliers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setShowModal(false);
    fetchSuppliers();
  };

  return (
    <div>
      <AdminHeader title="Supplier Management" />

      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Registered Wholesale Suppliers</h2>
            <p className="text-xs text-slate-500">Manage FMCG & Grain supplier contacts and purchases</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add Supplier</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.map((sup) => (
            <div key={sup.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-3 text-xs shadow-sm">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{sup.name}</h3>
                {sup.gstin && <span className="bg-slate-100 dark:bg-slate-700 font-mono text-[10px] px-2 py-0.5 rounded font-semibold">{sup.gstin}</span>}
              </div>

              <div className="space-y-1 text-slate-500">
                <p className="font-medium text-slate-800 dark:text-slate-200">Contact: {sup.contactPerson}</p>
                <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brand-600" /> {sup.phone}</p>
                <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-brand-600" /> {sup.email}</p>
                <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-600" /> {sup.address}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                <span>Products Supplied: {sup._count?.products || 0}</span>
                <span>Total Purchases: {sup._count?.purchases || 0}</span>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Add Supplier Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl p-6 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Add New Supplier</h3>

            <form onSubmit={handleCreateSupplier} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Company / Supplier Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="E.g. National FMCG Supplies"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">GSTIN</label>
                  <input
                    type="text"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="w-1/2 py-2 bg-slate-100 dark:bg-slate-700 font-semibold rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="w-1/2 py-2 bg-brand-600 text-white font-bold rounded-xl">
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
