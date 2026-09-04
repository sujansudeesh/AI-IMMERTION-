'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { formatCurrency } from '@/lib/invoice';
import { Users, Phone, Mail, ShoppingBag } from 'lucide-react';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then((data) => setCustomers(data.customers || []));
  }, []);

  return (
    <div>
      <AdminHeader title="Customer Directory & Order History" />

      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase font-semibold bg-slate-50 dark:bg-slate-900/50">
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Lifetime Spend (LTV)</th>
                <th className="py-3 px-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {customers.map((c) => (
                <tr key={c.id}>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{c.name}</td>
                  <td className="py-3 px-4 text-slate-500">
                    <p>{c.email}</p>
                    <p>{c.phone}</p>
                  </td>
                  <td className="py-3 px-4 font-semibold">{c.totalOrders} orders</td>
                  <td className="py-3 px-4 font-bold text-brand-600 dark:text-brand-400">{formatCurrency(c.totalSpent)}</td>
                  <td className="py-3 px-4 text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
