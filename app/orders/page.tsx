'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/invoice';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
          My Order History & Live Tracking
        </h1>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-3">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">No orders placed yet</h3>
            <p className="text-xs text-slate-500">Your online grocery orders will appear here.</p>
            <Link href="/products" className="inline-block bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-xl">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">#{order.orderNumber}</span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      order.orderStatus === 'DELIVERED'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : order.orderStatus === 'CANCELLED'
                        ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString()} • {order.items?.length || 1} items
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                  <span className="font-extrabold text-brand-600 dark:text-brand-400 text-base">
                    {formatCurrency(order.grandTotal)}
                  </span>
                  <Link
                    href={`/orders/${order.id}`}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1 transition"
                  >
                    <span>View & Track</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
