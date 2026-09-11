'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import {
  ShoppingBag,
  Search,
  ShoppingCart,
  Heart,
  User as UserIcon,
  Sun,
  Moon,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Package,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart, wishlist } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-lg tracking-tight shrink-0">
            <div className="bg-brand-600 text-white p-2 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="hidden sm:inline">Sri Chamundi Stores</span>
            <span className="sm:hidden">Sri Chamundi</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search tea, biscuits, groceries, SKUs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/products"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              Catalogue
            </Link>

            <Link
              href="/#store-gallery"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              Our Store
            </Link>

            <Link
              href="/orders"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition flex items-center gap-1"
            >
              <Package className="w-4 h-4" />
              <span>Orders</span>
            </Link>

            <Link
              href="/project-review"
              className="text-sm font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 px-2.5 py-1 rounded-lg hover:bg-brand-100 transition border border-brand-200 dark:border-brand-800"
            >
              Design Thinking
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Wishlist */}
            <Link
              href="/profile?tab=wishlist"
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 px-3.5 py-2 rounded-xl text-sm font-medium transition"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>

            {/* User Account / Admin Badge */}
            {user ? (
              <div className="flex items-center gap-2">
                {user.role !== 'CUSTOMER' && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-3 py-1.5 rounded-xl text-xs font-semibold hover:opacity-90 transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
                    <span>{user.role === 'STAFF' ? 'POS Terminal' : 'Admin'}</span>
                  </Link>
                )}

                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition text-slate-700 dark:text-slate-200"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                </Link>

                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-xl transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-xl"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="/cart" className="relative p-2 text-slate-700 dark:text-slate-200">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search tea, snacks, groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-100 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <div className="flex flex-col space-y-2">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              Home
            </Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              Products Catalogue
            </Link>
            <Link href="/#store-gallery" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              Visit Our Store
            </Link>
            <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              My Orders
            </Link>
            {user ? (
              <>
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Account Profile ({user.name})
                </Link>
                {user.role !== 'CUSTOMER' && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-semibold text-brand-600">
                    Go to Admin Portal ({user.role})
                  </Link>
                )}
                <button onClick={logout} className="text-left py-2 text-sm font-medium text-red-600">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm font-semibold text-brand-600">
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
