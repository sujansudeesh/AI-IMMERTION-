import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Shield, Truck, RefreshCw, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Props Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-brand-400 rounded-xl">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Fast Neighborhood Delivery</h4>
              <p className="text-xs text-slate-500">Same day local delivery on orders over ₹500</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-brand-400 rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% Genuine Stock</h4>
              <p className="text-xs text-slate-500">Fresh biscuits, tea, beverages & groceries</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-brand-400 rounded-xl">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Easy Returns</h4>
              <p className="text-xs text-slate-500">Hassle-free 48h store return policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-brand-400 rounded-xl">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Store Helpline</h4>
              <p className="text-xs text-slate-500">+91 98655 70413 (6 AM - 10 PM)</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <div className="bg-brand-600 p-1.5 rounded-lg text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span>Sri Chamundi Stores</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Sri Chamundi Stores & Tea Stall — Your premier local store for tea, bakery biscuits, ice creams, packaged snacks, and daily groceries.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/products" className="hover:text-white transition">Product Catalogue</Link></li>
              <li><Link href="/#store-gallery" className="hover:text-white transition">Physical Store Photos</Link></li>
              <li><Link href="/cart" className="hover:text-white transition">Shopping Cart</Link></li>
              <li><Link href="/orders" className="hover:text-white transition">Track Your Order</Link></li>
              <li><Link href="/profile" className="hover:text-white transition">Customer Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Store Administration</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/login" className="hover:text-white transition">Admin & Staff Login</Link></li>
              <li><Link href="/admin" className="hover:text-white transition">Store Management Portal</Link></li>
              <li><Link href="/admin/pos" className="hover:text-white transition">POS Terminal (Cashier)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Store Location</h4>
            <p className="text-xs leading-relaxed">
              Sri Chamundi Stores & Tea Stall<br />
              Main Highway Road, Tamil Nadu<br />
              Helpline: +91 98655 70413<br />
              GSTIN: 33AAAAA0000A1Z5
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2026 Sri Chamundi Stores & Tea Stall. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
