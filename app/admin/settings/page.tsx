'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    storeName: 'SuperMart Retail & Groceries',
    storeAddress: 'Plot 42, Commercial Complex, Sector 18, Gurugram, HR - 122002',
    storePhone: '+91 98765 43210',
    storeEmail: 'support@supermartretail.in',
    gstin: '07AAAAA0000A1Z5',
    currency: '₹',
    defaultGst: 18,
    lowStockThreshold: 5,
    showExactStockToCustomers: true,
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setFormData(data.settings);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <AdminHeader title="Store Configuration Settings" />

      <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 md:p-8 space-y-6 shadow-sm text-xs">
          
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">General Store Information</h2>
              <p className="text-slate-500">Configure store branding, tax details, and stock alert rules</p>
            </div>
            {saved && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Settings Saved</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Store Name</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">GSTIN Number</label>
              <input
                type="text"
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Support Phone</label>
              <input
                type="text"
                value={formData.storePhone}
                onChange={(e) => setFormData({ ...formData, storePhone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Support Email</label>
              <input
                type="email"
                value={formData.storeEmail}
                onChange={(e) => setFormData({ ...formData, storeEmail: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Physical Store Address</label>
              <input
                type="text"
                value={formData.storeAddress}
                onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Low Stock Alert Threshold (Units)</label>
              <input
                type="number"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value, 10) })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="showStock"
                checked={formData.showExactStockToCustomers}
                onChange={(e) => setFormData({ ...formData, showExactStockToCustomers: e.target.checked })}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <label htmlFor="showStock" className="font-semibold text-slate-800 dark:text-slate-200">
                Display exact numerical stock quantity to online customers
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center gap-2 shadow transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>

        </form>

      </main>
    </div>
  );
}
