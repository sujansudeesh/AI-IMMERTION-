'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { formatCurrency } from '@/lib/invoice';
import { RotateCcw, Check, X, RefreshCw } from 'lucide-react';

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState<any[]>([]);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    const res = await fetch('/api/returns');
    const data = await res.json();
    setReturns(data.returns || []);
  };

  const handleProcessReturn = async (returnId: string, action: 'APPROVE' | 'REJECT', restocked: boolean) => {
    await fetch('/api/returns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        returnId,
        action,
        restocked,
      }),
    });
    fetchReturns();
  };

  return (
    <div>
      <AdminHeader title="Returns & Restock Management" />

      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase font-semibold bg-slate-50 dark:bg-slate-900/50">
                <th className="py-3 px-4">Order # / Date</th>
                <th className="py-3 px-4">Product Item</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Refund Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {returns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No active return requests.
                  </td>
                </tr>
              ) : (
                returns.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3 px-4 font-mono font-bold">#{r.order?.orderNumber}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{r.product?.name}</td>
                    <td className="py-3 px-4 font-bold">{r.quantity} pcs</td>
                    <td className="py-3 px-4 text-slate-500">{r.reason}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{formatCurrency(r.refundAmount)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : r.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.status} {r.restocked ? '(Restocked)' : ''}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      {r.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleProcessReturn(r.id, 'APPROVE', true)}
                            className="bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg hover:bg-emerald-700"
                          >
                            Approve & Restock
                          </button>
                          <button
                            onClick={() => handleProcessReturn(r.id, 'REJECT', false)}
                            className="bg-red-600 text-white font-bold px-2.5 py-1 rounded-lg hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
