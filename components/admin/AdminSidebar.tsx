'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Calculator,
  ShoppingBag,
  Package,
  Layers,
  Truck,
  Users,
  RotateCcw,
  BarChart3,
  Settings,
  Store,
  LogOut,
  Shield,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'MANAGER', 'STAFF'] },
    { label: 'POS Billing', href: '/admin/pos', icon: Calculator, roles: ['SUPER_ADMIN', 'MANAGER', 'STAFF'], highlight: true },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag, roles: ['SUPER_ADMIN', 'MANAGER', 'STAFF'] },
    { label: 'Products', href: '/admin/products', icon: Package, roles: ['SUPER_ADMIN', 'MANAGER', 'STAFF'] },
    { label: 'Inventory', href: '/admin/inventory', icon: Layers, roles: ['SUPER_ADMIN', 'MANAGER', 'STAFF'] },
    { label: 'Purchases (Stock-In)', href: '/admin/purchases', icon: Truck, roles: ['SUPER_ADMIN', 'MANAGER'] },
    { label: 'Suppliers', href: '/admin/suppliers', icon: Users, roles: ['SUPER_ADMIN', 'MANAGER'] },
    { label: 'Customers', href: '/admin/customers', icon: Users, roles: ['SUPER_ADMIN', 'MANAGER', 'STAFF'] },
    { label: 'Returns & Restock', href: '/admin/returns', icon: RotateCcw, roles: ['SUPER_ADMIN', 'MANAGER', 'STAFF'] },
    { label: 'Sales Reports', href: '/admin/reports', icon: BarChart3, roles: ['SUPER_ADMIN', 'MANAGER'] },
    { label: 'Settings', href: '/admin/settings', icon: Settings, roles: ['SUPER_ADMIN'] },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col min-h-screen shrink-0 border-r border-slate-800">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-brand-600 text-white p-2 rounded-xl">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-white text-base leading-tight">SuperMart Admin</h2>
          <span className="text-[11px] text-brand-400 font-medium">{user?.role || 'Portal'}</span>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto text-sm">
        {navItems.map((item) => {
          if (user?.role && !item.roles.includes(user.role)) return null;

          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition ${
                item.highlight
                  ? isActive
                    ? 'bg-brand-600 text-white shadow'
                    : 'bg-brand-950/60 text-brand-400 hover:bg-brand-900/60 border border-brand-800/40'
                  : isActive
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'hover:bg-slate-800/60 hover:text-white text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
        >
          <Store className="w-4 h-4" />
          <span>View Customer Store</span>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-950/40 rounded-xl transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
}
