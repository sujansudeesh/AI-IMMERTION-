'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Bell, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeader({ title }: { title: string }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Quick POS Terminal Button */}
        <Link
          href="/admin/pos"
          className="bg-brand-600 hover:bg-brand-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Calculator className="w-4 h-4" />
          <span>New Bill (POS)</span>
        </Link>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <div className="hidden sm:block text-xs">
            <p className="font-semibold text-slate-900 dark:text-white leading-tight">{user?.name || 'Admin'}</p>
            <p className="text-slate-400">{user?.role || 'Staff'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
