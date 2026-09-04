'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/invoice';
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  Settings,
  Plus,
  RotateCcw,
  CheckCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();
  const { cart, addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'wishlist' | 'settings'>('overview');
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Address Form State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    addressLine: '',
    city: '',
    state: 'Haryana',
    pincode: '',
    landmark: '',
  });

  useEffect(() => {
    async function loadProfileData() {
      try {
        const [ordRes, prodRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/products?limit=10'),
        ]);
        const ordData = await ordRes.json();
        const prodData = await prodRes.json();

        setOrders(ordData.orders || []);
        setWishlistProducts((prodData.products || []).slice(0, 4));

        // Seed initial address for preview
        setAddresses([
          {
            id: 'addr-1',
            fullName: user?.name || 'Rohan Mehta',
            phone: user?.phone || '+91 98444 55566',
            addressLine: 'A-402, Sunshine Apartments, DLF Phase 4',
            city: 'Gurugram',
            state: 'Haryana',
            pincode: '122009',
            landmark: 'Opposite Supermart 1',
            isDefault: true,
          },
        ]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadProfileData();
  }, [user]);

  const handleReorder = (order: any) => {
    order.items?.forEach((item: any) => {
      addToCart(item.product, item.quantity);
    });
    window.location.href = '/cart';
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setAddresses([...addresses, { ...newAddress, id: `addr-${Date.now()}`, isDefault: false }]);
    setShowAddressModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Customer Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 text-white rounded-3xl p-6 md:p-8 mb-8 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-600 font-bold text-2xl flex items-center justify-center border-2 border-brand-400">
              {user?.name ? user.name.charAt(0) : 'R'}
            </div>
            <div>
              <h1 className="text-xl font-bold">{user?.name || 'Rohan Mehta'}</h1>
              <p className="text-xs text-slate-400">{user?.email || 'customer@store.com'} • {user?.phone || '+91 98444 55566'}</p>
              <span className="inline-block mt-1 bg-brand-500/20 text-brand-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-brand-500/30">
                Verified SuperMart Retail Customer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="bg-slate-800/80 px-4 py-2 rounded-xl text-center">
              <span className="block font-bold text-sm text-brand-400">{orders.length}</span>
              <span className="text-slate-400">Total Orders</span>
            </div>
          </div>
        </div>

        {/* Amazon-Style Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto pb-2 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Account Overview', icon: User },
            { id: 'orders', label: `My Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'addresses', label: `Saved Addresses (${addresses.length})`, icon: MapPin },
            { id: 'wishlist', label: 'Wishlist & Saved Items', icon: Heart },
            { id: 'settings', label: 'Account Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white font-bold shadow'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-700/60 pb-3">
                Personal Information
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Full Name:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{user?.name || 'Rohan Mehta'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email Address:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{user?.email || 'customer@store.com'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone Number:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{user?.phone || '+91 98444 55566'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-700/60 pb-3">
                Recent Activity Summary
              </h3>
              <p className="text-xs text-slate-500">
                You have {orders.length} past orders placed with SuperMart Retail.
              </p>
              <button
                onClick={() => setActiveTab('orders')}
                className="bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 text-xs font-bold px-4 py-2 rounded-xl"
              >
                View Orders History
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: My Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
                  <div>
                    <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">#{order.orderNumber}</span>
                    <span className="text-xs text-slate-400 ml-2">Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      order.orderStatus === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.orderStatus}
                    </span>
                    <button
                      onClick={() => handleReorder(order)}
                      className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder Items</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{order.items?.length || 1} items in order</span>
                  <span className="font-bold text-brand-600 text-base">{formatCurrency(order.grandTotal)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Your Shipping Addresses</h3>
              <button
                onClick={() => setShowAddressModal(true)}
                className="bg-brand-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-2 relative shadow-sm">
                  {addr.isDefault && (
                    <span className="bg-brand-100 text-brand-800 dark:bg-brand-950/60 dark:text-brand-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      DEFAULT ADDRESS
                    </span>
                  )}
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{addr.fullName}</h4>
                  <p className="text-xs text-slate-500">{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</p>
                  <p className="text-xs text-slate-500">Phone: {addr.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {wishlistProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Tab 5: Account Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 max-w-lg space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-700/60 pb-3">
              Change Account Password
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none" />
              </div>
              <button className="bg-brand-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs">
                Update Password
              </button>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
