'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, UserCheck, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@store.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      login(data.user);
      if (data.user.role === 'CUSTOMER') {
        window.location.href = '/profile';
      } else {
        window.location.href = '/admin';
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-12 w-full flex-1 flex flex-col justify-center">
        
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-8 space-y-6 shadow-lg">
          
          <div className="text-center space-y-1">
            <div className="w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Store Access Sign In</h1>
            <p className="text-xs text-slate-500">Sign in as Customer, POS Cashier, Manager or Super Admin</p>
          </div>

          {/* Quick Demo Accounts Selection */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl space-y-2 border border-slate-100 dark:border-slate-700/50">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              1-Click Demo Login Shortcuts:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin@store.com')}
                className={`px-2.5 py-2 rounded-xl text-left border font-medium transition ${
                  email === 'admin@store.com'
                    ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold dark:bg-brand-950/60 dark:text-brand-200'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="block font-bold">Super Admin</span>
                <span className="text-[10px] text-slate-400">admin@store.com</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('manager@store.com')}
                className={`px-2.5 py-2 rounded-xl text-left border font-medium transition ${
                  email === 'manager@store.com'
                    ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold dark:bg-brand-950/60 dark:text-brand-200'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="block font-bold">Store Manager</span>
                <span className="text-[10px] text-slate-400">manager@store.com</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('staff@store.com')}
                className={`px-2.5 py-2 rounded-xl text-left border font-medium transition ${
                  email === 'staff@store.com'
                    ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold dark:bg-brand-950/60 dark:text-brand-200'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="block font-bold">POS Cashier</span>
                <span className="text-[10px] text-slate-400">staff@store.com</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('customer@store.com')}
                className={`px-2.5 py-2 rounded-xl text-left border font-medium transition ${
                  email === 'customer@store.com'
                    ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold dark:bg-brand-950/60 dark:text-brand-200'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="block font-bold">Customer</span>
                <span className="text-[10px] text-slate-400">customer@store.com</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-white"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300 text-xs font-semibold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>

      </main>

      <Footer />
    </div>
  );
}
