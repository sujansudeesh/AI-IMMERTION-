'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InvoiceModal from '@/components/InvoiceModal';
import { formatCurrency } from '@/lib/invoice';
import { Check, Clock, Truck, Package, CheckCircle2, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SingleOrderTrackingPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null);
  const [storeInfo, setStoreInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.order);
        setStoreInfo(data.storeInfo);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="max-w-5xl mx-auto p-12 text-center flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="max-w-5xl mx-auto p-12 text-center flex-1 space-y-4">
          <h2 className="text-xl font-bold">Order Not Found</h2>
          <Link href="/orders" className="inline-block bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-xl">
            Return to Orders
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const timelineSteps = [
    { key: 'PENDING', label: 'Order Placed' },
    { key: 'CONFIRMED', label: 'Confirmed' },
    { key: 'PROCESSING', label: 'Processing' },
    { key: 'READY', label: 'Ready for Delivery' },
    { key: 'OUT_OF_DELIVERY', label: 'Out for Delivery' },
    { key: 'DELIVERED', label: 'Delivered' },
  ];

  const statusOrder = ['PENDING', 'CONFIRMED', 'PROCESSING', 'READY', 'OUT_OF_DELIVERY', 'DELIVERED'];
  const currentStepIdx = statusOrder.indexOf(order.orderStatus);

  const invoiceData = {
    invoiceNumber: order.invoice?.invoiceNumber || `INV-${order.orderNumber}`,
    orderNumber: order.orderNumber,
    issueDate: order.createdAt,
    storeInfo: {
      name: storeInfo?.storeName || 'SuperMart Retail',
      address: storeInfo?.storeAddress || '',
      phone: storeInfo?.storePhone || '',
      email: storeInfo?.storeEmail || '',
      gstin: storeInfo?.gstin || '',
    },
    customerInfo: {
      name: order.customer?.name || 'Customer',
      phone: order.customer?.phone || 'N/A',
      address: order.shippingAddressJson ? JSON.parse(order.shippingAddressJson).addressLine : 'N/A',
    },
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
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
        
        <Link href="/orders" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-brand-600">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>

        {/* Order Info & Invoice Button */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Order #{order.orderNumber}</h1>
              <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {order.paymentStatus}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
          </div>

          <button
            onClick={() => setInvoiceOpen(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow transition"
          >
            <FileText className="w-4 h-4" />
            <span>View & Print Tax Invoice</span>
          </button>
        </div>

        {/* 6-Stage Visual Timeline Tracker */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-8 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Delivery Status Timeline</h3>

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
            
            {/* Timeline Connect Line */}
            <div className="hidden md:block absolute top-4 left-6 right-6 h-1 bg-slate-200 dark:bg-slate-700 -z-0" />
            <div
              className="hidden md:block absolute top-4 left-6 h-1 bg-brand-600 transition-all duration-500 -z-0"
              style={{ width: `${Math.max(0, (currentStepIdx / (timelineSteps.length - 1)) * 90)}%` }}
            />

            {timelineSteps.map((stepItem, idx) => {
              const isCompleted = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={stepItem.key} className="relative z-10 flex md:flex-col items-center gap-3 md:gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isCompleted
                        ? 'bg-brand-600 text-white ring-4 ring-brand-100 dark:ring-brand-950'
                        : 'bg-slate-200 text-slate-500 dark:bg-slate-700'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>

                  <span className={`text-xs font-medium ${isCurrent ? 'font-bold text-brand-600 dark:text-brand-400' : 'text-slate-500'}`}>
                    {stepItem.label}
                  </span>
                </div>
              );
            })}

          </div>
        </div>

        {/* Order Items Table */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Items in this Order</h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {order.items.map((item: any) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-contain bg-slate-50 dark:bg-slate-900 rounded-xl p-1" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.product.name}</p>
                    <p className="text-slate-400">Qty: {item.quantity} x {formatCurrency(item.unitPrice)}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(item.totalPrice)}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex justify-between items-baseline text-sm font-bold">
            <span className="text-slate-900 dark:text-white">Grand Total:</span>
            <span className="text-brand-600 dark:text-brand-400">{formatCurrency(order.grandTotal)}</span>
          </div>
        </div>

      </main>

      {/* Invoice Modal Component */}
      <InvoiceModal isOpen={invoiceOpen} onClose={() => setInvoiceOpen(false)} invoiceData={invoiceData} />

      <Footer />
    </div>
  );
}
