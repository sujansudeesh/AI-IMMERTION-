'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import InvoiceModal from '@/components/InvoiceModal';
import { formatCurrency } from '@/lib/invoice';
import { ShoppingBag, Printer, CheckCircle, Clock } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = async () => {
    const url = filterStatus === 'ALL' ? '/api/orders' : `/api/orders?status=${filterStatus}`;
    const res = await fetch(url);
    const data = await res.json();
    setOrders(data.orders || []);
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderStatus: newStatus }),
    });
    fetchOrders();
  };

  const openInvoice = (order: any) => {
    setSelectedInvoice({
      invoiceNumber: order.invoice?.invoiceNumber || `INV-${order.orderNumber}`,
      orderNumber: order.orderNumber,
      issueDate: order.createdAt,
      storeInfo: { name: 'SuperMart Retail', address: 'Plot 42, Sector 18, Gurugram', phone: '+91 98765 43210', email: 'support@supermartretail.in', gstin: '07AAAAA0000A1Z5' },
      customerInfo: { name: order.customer?.name || 'Walk-in', phone: order.customer?.phone || 'N/A', address: 'Store Counter' },
      items: order.items.map((i: any) => ({
        name: i.product.name,
        sku: i.product.sku,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        discount: i.discount,
        gstRate: i.product.gstRate,
        totalPrice: i.totalPrice,
      })),
      subtotal: order.subtotal,
      discountTotal: order.discountTotal,
      gstTotal: order.gstTotal,
      deliveryFee: order.deliveryFee,
      grandTotal: order.grandTotal,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
    });
    setShowInvoiceModal(true);
  };

  return (
    <div>
      <AdminHeader title="Order Management Panel" />

      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          {['ALL', 'PENDING', 'CONFIRMED', 'PROCESSING', 'READY', 'OUT_OF_DELIVERY', 'DELIVERED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl font-semibold capitalize shrink-0 ${
                filterStatus === st ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'bg-white dark:bg-slate-800 text-slate-600'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase font-semibold bg-slate-50 dark:bg-slate-900/50">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">#{o.orderNumber}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${o.orderType === 'POS' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {o.orderType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-800 dark:text-slate-200">{o.customer?.name || 'Walk-in'}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{formatCurrency(o.grandTotal)}</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold">{o.paymentStatus} ({o.paymentMethod})</td>
                  <td className="py-3 px-4">
                    <select
                      value={o.orderStatus}
                      onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                      className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-1 px-2 font-bold text-xs outline-none"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="READY">READY</option>
                      <option value="OUT_OF_DELIVERY">OUT_OF_DELIVERY</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED (AUTO-RESTOCK)</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => openInvoice(o)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
                      title="Print Invoice"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>

      <InvoiceModal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        invoiceData={selectedInvoice}
      />
    </div>
  );
}
