'use client';

import React, { useEffect, useState, useRef } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import InvoiceModal from '@/components/InvoiceModal';
import { formatCurrency } from '@/lib/invoice';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Printer,
  CheckCircle2,
  DollarSign,
  QrCode,
  CreditCard,
  User,
  AlertCircle,
} from 'lucide-react';

export default function POSTerminalPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [discountFlat, setDiscountFlat] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'UPI' | 'CARD'>('CASH');

  // Cash Payment Calculator
  const [cashReceived, setCashReceived] = useState<number>(0);

  // Invoice & Processing State
  const [processing, setProcessing] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/products?limit=100')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
      });
  }, []);

  // Filter products by SKU or Name
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
    setFilteredProducts(matches);
  }, [searchQuery, products]);

  // Auto SKU Barcode Scan Enter
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredProducts.length === 1) {
      addToPOSCart(filteredProducts[0]);
      setSearchQuery('');
    }
  };

  const addToPOSCart = (product: any) => {
    setErrorMsg('');
    const existingIndex = cart.findIndex((i) => i.productId === product.id);
    const currentQty = existingIndex > -1 ? cart[existingIndex].quantity : 0;

    if (currentQty + 1 > product.currentStock) {
      setErrorMsg(`Cannot add more than available stock (${product.currentStock} left) for ${product.name}`);
      return;
    }

    if (existingIndex > -1) {
      setCart(cart.map((item, idx) => (idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          sku: product.sku,
          name: product.name,
          unitPrice: product.sellingPrice,
          discountPrice: product.discountPrice,
          gstRate: product.gstRate,
          currentStock: product.currentStock,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setErrorMsg('');
    const item = cart.find((i) => i.productId === productId);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      setCart(cart.filter((i) => i.productId !== productId));
      return;
    }

    if (newQty > item.currentStock) {
      setErrorMsg(`Only ${item.currentStock} items in stock for ${item.name}`);
      return;
    }

    setCart(cart.map((i) => (i.productId === productId ? { ...i, quantity: newQty } : i)));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((i) => i.productId !== productId));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => {
    const price = item.discountPrice || item.unitPrice;
    return sum + price * item.quantity;
  }, 0);

  const gstTotal = Math.round(
    cart.reduce((sum, item) => {
      const lineSubtotal = (item.discountPrice || item.unitPrice) * item.quantity;
      return sum + (lineSubtotal * item.gstRate) / 100;
    }, 0)
  );

  const grandTotal = Math.max(0, subtotal + gstTotal - discountFlat);
  const changeDue = Math.max(0, cashReceived - grandTotal);

  const handleCheckoutAndPrint = async () => {
    if (cart.length === 0) return;
    setProcessing(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/pos/bill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          paymentMethod,
          discountFlat,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'POS checkout failed');
      }

      setInvoiceData(data.invoiceData);
      setShowInvoiceModal(true);

      // Refresh products stock
      const updatedProducts = await fetch('/api/products?limit=100').then((r) => r.json());
      setProducts(updatedProducts.products || []);

      // Clear POS cart
      setCart([]);
      setDiscountFlat(0);
      setCashReceived(0);
    } catch (e: any) {
      setErrorMsg(e.message || 'POS Checkout error');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AdminHeader title="POS Fast Billing Terminal" />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Side: Product Search & Catalogue Grid (7 cols) */}
        <div className="lg:col-span-7 p-6 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
          
          {/* Top Bar: SKU Barcode Scanner & Search */}
          <div className="relative mb-4">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Scan SKU barcode or type product name... (Press Enter)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              autoFocus
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-semibold text-slate-900 dark:text-white shadow-sm outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3 pr-1">
            {filteredProducts.map((p) => {
              const effectivePrice = p.discountPrice || p.sellingPrice;
              const isOutOfStock = p.currentStock === 0;

              return (
                <button
                  key={p.id}
                  onClick={() => addToPOSCart(p)}
                  disabled={isOutOfStock}
                  className={`bg-white dark:bg-slate-900 border rounded-2xl p-3 text-left transition flex flex-col justify-between hover:shadow-md ${
                    isOutOfStock
                      ? 'opacity-50 cursor-not-allowed border-slate-200 dark:border-slate-800'
                      : 'border-slate-200 dark:border-slate-700/80 hover:border-brand-500'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-[10px] font-mono text-slate-400">{p.sku}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isOutOfStock ? 'bg-red-100 text-red-700' : p.currentStock <= p.minStock ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {p.currentStock} {p.unit}
                    </span>
                  </div>

                  <p className="font-semibold text-slate-900 dark:text-white text-xs line-clamp-2 mb-2 leading-tight">
                    {p.name}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-brand-400 text-xs">
                      {formatCurrency(effectivePrice)}
                    </span>
                    <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300 flex items-center justify-center">
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Side: Fast Billing Terminal & Cart (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-white dark:bg-slate-900 flex flex-col h-full overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <h2 className="font-bold text-slate-900 dark:text-white text-base">Current POS Bill</h2>
            <span className="text-xs text-slate-400 font-semibold">{cart.length} items</span>
          </div>

          {/* Cart Table */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
                <Search className="w-8 h-8 text-slate-300" />
                <p className="text-xs">Scan or click products on the left to add to bill</p>
              </div>
            ) : (
              cart.map((item) => {
                const price = item.discountPrice || item.unitPrice;
                return (
                  <div
                    key={item.productId}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex-1 pr-2">
                      <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{item.sku} • {formatCurrency(price)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.productId, -1)}
                        className="p-1 text-slate-500 hover:bg-slate-200 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-slate-900 dark:text-white w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, 1)}
                        className="p-1 text-slate-500 hover:bg-slate-200 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-slate-900 dark:text-white w-16 text-right">
                      {formatCurrency(price * item.quantity)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-1 text-slate-400 hover:text-red-600 ml-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Billing Calculation & Payment Section */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3 text-xs">
            
            <div className="space-y-1 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(gstTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Flat Discount (₹):</span>
                <input
                  type="number"
                  value={discountFlat}
                  onChange={(e) => setDiscountFlat(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 text-right bg-slate-100 dark:bg-slate-800 border rounded outline-none font-bold text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Grand Total:</span>
                <span className="text-brand-600 dark:text-brand-400">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'CASH', label: 'Cash', icon: DollarSign },
                { id: 'UPI', label: 'UPI QR', icon: QrCode },
                { id: 'CARD', label: 'Card', icon: CreditCard },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition ${
                      paymentMethod === m.id
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Cash Calculator */}
            {paymentMethod === 'CASH' && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl flex items-center justify-between">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400">Cash Received (₹)</label>
                  <input
                    type="number"
                    value={cashReceived || ''}
                    onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-24 px-2 py-1 bg-white dark:bg-slate-900 border rounded font-bold text-sm outline-none"
                  />
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-bold uppercase text-slate-400">Change Due</span>
                  <span className="text-sm font-extrabold text-emerald-600">{formatCurrency(changeDue)}</span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-2 bg-red-50 text-red-600 dark:bg-red-950/60 text-xs font-semibold rounded-xl flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Generate & Print Invoice Button */}
            <button
              onClick={handleCheckoutAndPrint}
              disabled={cart.length === 0 || processing}
              className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition"
            >
              {processing ? (
                <span>Deducting Stock & Printing...</span>
              ) : (
                <>
                  <Printer className="w-4 h-4" />
                  <span>Complete Sale & Print Tax Invoice ({formatCurrency(grandTotal)})</span>
                </>
              )}
            </button>

          </div>

        </div>

      </main>

      {/* Invoice Modal Trigger */}
      <InvoiceModal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        invoiceData={invoiceData}
      />
    </div>
  );
}
