'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/invoice';
import { ShoppingCart, Trash2, Bookmark, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    savedForLater,
    removeFromCart,
    updateQuantity,
    saveForLater,
    moveToCart,
    subtotal,
    gstTotal,
    deliveryFee,
    grandTotal,
  } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
          Online Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-4 max-w-lg mx-auto my-8">
            <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Your Cart is Empty</h2>
            <p className="text-xs text-slate-500">
              Browse our fresh grocery staples and daily branded items to add products to your cart.
            </p>
            <Link
              href="/products"
              className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition"
            >
              Start Shopping Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 divide-y divide-slate-100 dark:divide-slate-700/60 shadow-sm">
                {cart.map((item) => {
                  const effectivePrice = item.discountPrice || item.sellingPrice;
                  const itemTotal = effectivePrice * item.quantity;

                  return (
                    <div key={item.productId} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      
                      <div className="flex items-center gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-contain bg-slate-50 dark:bg-slate-900 rounded-xl p-2 shrink-0 border border-slate-100 dark:border-slate-800"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.brand}</span>
                          <Link href={`/products/${item.productId}`} className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1 hover:text-brand-600 transition">
                            {item.name}
                          </Link>
                          <div className="flex items-center gap-2 text-xs mt-1">
                            <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(effectivePrice)}</span>
                            <span className="text-slate-400 text-[11px] font-semibold">({item.currentStock} in stock)</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls & Item Actions */}
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 font-bold"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-bold text-slate-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= item.currentStock}
                            className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 font-bold disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-bold text-slate-900 dark:text-white text-sm min-w-[70px] text-right">
                          {formatCurrency(itemTotal)}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => saveForLater(item.productId)}
                            className="p-2 text-slate-400 hover:text-brand-600 transition rounded-lg"
                            title="Save for later"
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="p-2 text-slate-400 hover:text-red-600 transition rounded-lg"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Saved For Later Section */}
              {savedForLater.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 space-y-4 shadow-sm mt-6">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Saved for Later ({savedForLater.length})
                  </h3>
                  <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
                    {savedForLater.map((item) => (
                      <div key={item.productId} className="py-3 flex items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-contain" />
                          <div>
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</p>
                            <p className="text-slate-400">{formatCurrency(item.discountPrice || item.sellingPrice)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => moveToCart(item.productId)}
                          className="bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-bold px-3 py-1.5 rounded-xl hover:bg-brand-100"
                        >
                          Move to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary & Checkout Action */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 space-y-4 shadow-sm sticky top-24">
                <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-700/60 pb-3">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span>Items Subtotal:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated GST / Tax:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(gstTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge:</span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE Delivery</span>
                    ) : (
                      <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(deliveryFee)}</span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Grand Total:</span>
                    <span className="font-extrabold text-xl text-brand-600 dark:text-brand-400">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <div className="p-3 bg-brand-50 dark:bg-brand-950/40 rounded-xl text-[11px] text-brand-800 dark:text-brand-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Real-time stock validation applied at checkout.</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <span>Proceed to Multi-step Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
