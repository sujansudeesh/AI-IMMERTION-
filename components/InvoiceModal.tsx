'use client';

import React from 'react';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/invoice';

export interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: any;
}

export default function InvoiceModal({ isOpen, onClose, invoiceData }: InvoiceModalProps) {
  if (!isOpen || !invoiceData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 print:shadow-none print:m-0 print:w-full">
        
        {/* Modal Top Controls (Hidden during print) */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-brand-400" />
            <h3 className="font-semibold text-sm">Tax Invoice Preview</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Body (Printable Area) */}
        <div className="p-8 space-y-6 text-sm" id="printable-invoice">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{invoiceData.storeInfo?.name || 'SuperMart Retail'}</h1>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">{invoiceData.storeInfo?.address}</p>
              <p className="text-xs text-slate-500">Phone: {invoiceData.storeInfo?.phone}</p>
              <p className="text-xs text-slate-500">Email: {invoiceData.storeInfo?.email}</p>
              <p className="text-xs font-semibold text-slate-700 mt-1">GSTIN: {invoiceData.storeInfo?.gstin}</p>
            </div>
            <div className="text-right">
              <div className="inline-block bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-2">
                TAX INVOICE
              </div>
              <p className="font-mono text-sm font-semibold text-slate-900">#{invoiceData.invoiceNumber}</p>
              <p className="text-xs text-slate-500">Order: #{invoiceData.orderNumber}</p>
              <p className="text-xs text-slate-500">Date: {new Date(invoiceData.issueDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Customer & Payment Meta */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs">
            <div>
              <h4 className="font-semibold text-slate-700 uppercase tracking-wider mb-1">Customer Info</h4>
              <p className="font-medium text-slate-900">{invoiceData.customerInfo?.name || 'Walk-in Customer'}</p>
              <p className="text-slate-500">{invoiceData.customerInfo?.phone}</p>
              <p className="text-slate-500">{invoiceData.customerInfo?.address}</p>
            </div>
            <div className="text-right">
              <h4 className="font-semibold text-slate-700 uppercase tracking-wider mb-1">Payment Details</h4>
              <p className="font-medium text-slate-900">Method: {invoiceData.paymentMethod}</p>
              <p className="text-emerald-600 font-semibold">Status: {invoiceData.paymentStatus}</p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-100 text-slate-700 font-semibold">
                <th className="py-2.5 px-2">Item Description</th>
                <th className="py-2.5 px-2">SKU</th>
                <th className="py-2.5 px-2 text-center">Qty</th>
                <th className="py-2.5 px-2 text-right">Price</th>
                <th className="py-2.5 px-2 text-right">GST</th>
                <th className="py-2.5 px-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {invoiceData.items?.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="py-2.5 px-2 font-medium text-slate-900">{item.name}</td>
                  <td className="py-2.5 px-2 text-slate-500 font-mono text-[11px]">{item.sku}</td>
                  <td className="py-2.5 px-2 text-center">{item.quantity}</td>
                  <td className="py-2.5 px-2 text-right">{formatCurrency(item.unitPrice - (item.discount || 0))}</td>
                  <td className="py-2.5 px-2 text-right">{item.gstRate}%</td>
                  <td className="py-2.5 px-2 text-right font-semibold">{formatCurrency(item.totalPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals Summary */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-medium">{formatCurrency(invoiceData.subtotal || 0)}</span>
              </div>
              {invoiceData.discountTotal > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount:</span>
                  <span className="font-medium">-{formatCurrency(invoiceData.discountTotal)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>GST / Tax:</span>
                <span className="font-medium">{formatCurrency(invoiceData.gstTotal || 0)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge:</span>
                <span className="font-medium">{formatCurrency(invoiceData.deliveryFee || 0)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 border-t border-slate-300 pt-2">
                <span>Grand Total:</span>
                <span className="text-brand-600">{formatCurrency(invoiceData.grandTotal || 0)}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
            <p className="font-semibold text-slate-700">Thank you for shopping with SuperMart Retail!</p>
            <p className="text-[11px] mt-0.5">Computer generated invoice. No signature required.</p>
          </div>

        </div>

      </div>
    </div>
  );
}
