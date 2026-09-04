'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/lib/invoice';
import { MapPin, ShoppingBag, CreditCard, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, subtotal, gstTotal, deliveryFee, grandTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 Address state
  const [address, setAddress] = useState({
    fullName: user?.name || 'Rohan Mehta',
    phone: user?.phone || '+91 98444 55566',
    addressLine: 'A-402, Sunshine Apartments, DLF Phase 4',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122009',
    landmark: 'Opposite Supermart 1',
  });

  // Step 3 Payment State
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NET_BANKING' | 'CASH'>('UPI');
  const [upiId, setUpiId] = useState('rohan@okaxis');
  const [cardNo, setCardNo] = useState('4532 •••• •••• 8892');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          address,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      setCompletedOrder(data.order);
      clearCart();
      setStep(4);
    } catch (e: any) {
      setErrorMsg(e.message || 'Server stock validation error');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="max-w-md mx-auto p-12 text-center my-12 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Cart is empty</h2>
          <Link href="/products" className="inline-block bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-xl">
            Return to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Step Indicator Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Multi-step Checkout
          </h1>

          <div className="flex items-center justify-between max-w-xl text-xs font-semibold text-slate-500">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-brand-600 dark:text-brand-400 font-bold' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'}`}>1</div>
              <span>Address</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-800" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-brand-600 dark:text-brand-400 font-bold' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</div>
              <span>Summary</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-800" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-brand-600 dark:text-brand-400 font-bold' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</div>
              <span>Payment</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-800" />
            <div className={`flex items-center gap-1.5 ${step === 4 ? 'text-brand-600 dark:text-brand-400 font-bold' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 4 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'}`}>4</div>
              <span>Confirmation</span>
            </div>
          </div>
        </div>

        {/* Step 1: Delivery Address */}
        {step === 1 && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 md:p-8 space-y-6 max-w-2xl shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <MapPin className="w-5 h-5 text-brand-600" />
              <h2>Step 1 — Delivery Address Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Address Line</label>
                <input
                  type="text"
                  value={address.addressLine}
                  onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">PIN Code</label>
                <input
                  type="text"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition"
            >
              <span>Continue to Order Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Order Items Summary */}
        {step === 2 && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 md:p-8 space-y-6 max-w-2xl shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <ShoppingBag className="w-5 h-5 text-brand-600" />
              <h2>Step 2 — Order Items & Cost Breakdown</h2>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.productId} className="flex items-center justify-between text-xs py-2 border-b border-slate-100 dark:border-slate-700/50">
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</span>
                    <span className="text-slate-400 block text-[11px]">Qty: {item.quantity} x {formatCurrency(item.discountPrice || item.sellingPrice)}</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatCurrency((item.discountPrice || item.sellingPrice) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST Tax:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(gstTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery:</span>
                <span className="font-semibold text-emerald-600">{deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Grand Total:</span>
                <span className="text-brand-600">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-semibold py-3 rounded-xl text-xs"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Gateway Architecture */}
        {step === 3 && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 md:p-8 space-y-6 max-w-2xl shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <CreditCard className="w-5 h-5 text-brand-600" />
              <h2>Step 3 — Select Payment Method</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { id: 'UPI', title: 'UPI / QR Code', desc: 'Google Pay, PhonePe, Paytm' },
                { id: 'CARD', title: 'Credit / Debit Card', desc: 'Visa, MasterCard, RuPay' },
                { id: 'NET_BANKING', title: 'Net Banking', desc: 'SBI, HDFC, ICICI, Axis' },
                { id: 'CASH', title: 'Cash on Delivery', desc: 'Pay cash upon receipt' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPaymentMethod(p.id as any)}
                  className={`p-3.5 rounded-2xl border text-left space-y-1 transition ${
                    paymentMethod === p.id
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 font-bold text-brand-900 dark:text-brand-200'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <p className="font-bold text-xs">{p.title}</p>
                  <p className="text-[10px] text-slate-400">{p.desc}</p>
                </button>
              ))}
            </div>

            {paymentMethod === 'UPI' && (
              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl text-xs space-y-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300">Enter VPA / UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300 text-xs font-semibold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-semibold py-3 rounded-xl text-xs"
              >
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={submitting}
                className="w-2/3 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition"
              >
                {submitting ? (
                  <span>Securing Atomic Stock...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay & Place Order ({formatCurrency(grandTotal)})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Instant Confirmation */}
        {step === 4 && completedOrder && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-8 text-center max-w-xl mx-auto space-y-5 shadow-lg">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Order Placed Successfully!</h2>
              <p className="text-xs text-slate-500 mt-1">Thank you for your purchase from SuperMart Retail.</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl text-xs text-left space-y-1.5 font-medium">
              <p><span className="text-slate-400">Order Number:</span> <span className="font-bold text-slate-900 dark:text-white">#{completedOrder.orderNumber}</span></p>
              <p><span className="text-slate-400">Total Amount Paid:</span> <span className="font-bold text-brand-600">{formatCurrency(completedOrder.grandTotal)}</span></p>
              <p><span className="text-slate-400">Payment Status:</span> <span className="text-emerald-600 font-bold">{completedOrder.paymentStatus}</span></p>
              <p><span className="text-slate-400">Estimated Delivery:</span> <span className="font-semibold">Today within 2 hours</span></p>
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                href={`/orders/${completedOrder.id}`}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs transition shadow"
              >
                Track Live Order
              </Link>
              <Link
                href="/products"
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-white font-semibold py-3 rounded-xl text-xs transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
