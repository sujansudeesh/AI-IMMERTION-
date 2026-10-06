'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  UserCheck,
  Target,
  Lightbulb,
  Cpu,
  Layers,
  CheckCircle2,
  RefreshCw,
  Clock,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Printer,
  Sparkles,
  Search,
  ShoppingCart,
  Receipt,
  BarChart2,
  Shield,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Info,
  Camera
} from 'lucide-react';

export default function DesignThinkingReport() {
  const [activeTab, setActiveTab] = useState<string>('summary');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Header Banner */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                RA ALE / Project Better Tomorrow Portfolio Evidence (Review 2)
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Design Thinking &amp; Human-Centered Project Portfolio
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl">
                Integrated Retail Store Billing, Real-Time Inventory &amp; Online Ordering Platform for <span className="font-semibold text-slate-800 dark:text-slate-200">Sri Chamundi Stores &amp; Tea Stall</span>.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-medium transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Evidence Report</span>
              </button>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
              >
                <span>Back to Admin Portal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Nav Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 no-scrollbar">
            {[
              { id: 'summary', label: 'Faculty Summary', icon: FileText },
              { id: 'pathway', label: 'Pathway & Stage', icon: Clock },
              { id: 'empathize', label: '1. Empathize', icon: UserCheck },
              { id: 'define', label: '2. Define', icon: Target },
              { id: 'ideate', label: '3. Ideate (5 Ideas)', icon: Lightbulb },
              { id: 'ai-audit', label: '4. AI Audit', icon: Cpu },
              { id: 'prototype', label: '5. Prototype', icon: Layers },
              { id: 'validate', label: '6. Validation', icon: CheckCircle2 },
              { id: 'iterate', label: '7. Iteration Log', icon: RefreshCw },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-brand-600 dark:text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* FACULTY REVIEW EXECUTIVE SUMMARY SECTION */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'summary' || activeTab === 'all') && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Faculty Review Executive Summary (Review 2)</h2>
                  <p className="text-xs text-slate-500">Concise overview aligned with RA ALE Growth-Card Evaluator Rubric</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-full text-xs font-semibold">
                  Review 2: 35% Project Completion
                </span>
                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-semibold">
                  Review 1 Score: 30.1 / 35 (86%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Project Title</span>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Integrated Retail Store Billing, Real-Time Inventory &amp; Online Ordering Platform
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Client / Store</span>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Sri Chamundi Stores &amp; Tea Stall (Neighborhood Retail Store)
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Primary User Roles</span>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Store Owner / Manager, Cashier / Staff, Neighborhood Customer
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pathway &amp; Status</span>
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                  Pathway Confirmation Pending | User Testing Pending
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-2">
                  <h3 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Human-Centered Problem Statement (Refined Format)
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    “Neighborhood shoppers and counter staff at Sri Chamundi Stores experience billing delays during tea rush hours and uncertainty about item availability because physical shelf sales and phone/online orders are managed without live inventory sync, leading to wasted customer trips and stockout stress for staff.”
                  </p>
                </div>

                <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl space-y-2">
                  <h3 className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Provisional Design Question
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                    “How might we help customers and staff at Sri Chamundi Stores complete purchases with less waiting and less uncertainty about product availability and order progress?”
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl space-y-2">
                  <h3 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Selected Technical Solution &amp; Scope
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Integrated Web POS Terminal &amp; E-Commerce Storefront with atomic server-side inventory locking via Next.js 14 App Router + Prisma SQLite database.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Prototype Status</span>
                    <p className="text-xs font-extrabold text-brand-600 dark:text-brand-400 mt-1">Working Prototype (Testing Pending)</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Milestone Goal</span>
                    <p className="text-xs font-extrabold text-amber-600 dark:text-amber-400 mt-1">Review 2 — 35% Completion</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-400 shrink-0" />
                <span><strong>Truthful Research Statement:</strong> All interview forms &amp; 3-person usability logs are structured as ready collection protocols. No fake quotes or invented participant data are used.</span>
              </div>
              <span className="px-2.5 py-1 bg-slate-800 rounded text-[11px] font-mono text-slate-300 shrink-0">
                Docs: docs/01-10 &amp; Review_2_Submission.txt
              </span>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PATHWAY & DESIGN THINKING STAGE SECTION */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'pathway' || activeTab === 'all') && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pathway &amp; Design Thinking Stage Status</h2>
                <p className="text-xs text-slate-500">Truthful breakdown of project pathway, prior baseline work, and outstanding human validation</p>
              </div>
            </div>

            {/* Pathway Status Box */}
            <div className="p-5 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 rounded text-xs font-bold">
                  Pathway Confirmation Pending
                </span>
                <span className="text-xs font-semibold text-slate-500">Review 1 Score: 30.1 / 35 (86%)</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Pathway Designation Notice:</strong> Because formal signed empathy records from prior milestones are unarchived, the project marks <em>Pathway Confirmation Pending</em>. It treats physical store context photographs and domain problem knowledge as initial baseline hypotheses, while establishing structured empathy collection templates for verified participant data gathering.
              </p>
            </div>

            {/* 4 Pillars Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                  <Layers className="w-4 h-4 text-brand-600" />
                  1. Existing Prototype Work (Working Baseline)
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 shrink-0"></span>
                    <span><strong>Full-Stack Platform:</strong> Next.js 14 App Router, Prisma ORM, SQLite database with 17 relational entities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 shrink-0"></span>
                    <span><strong>Core Functional Modules:</strong> E-commerce storefront, product catalogue, 6-stage order tracking, POS billing terminal, barcode lookup, stock purchases.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  2. Revision Corrections (Review 2 Improvements)
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                    <span><strong>Human Problem &amp; HMW:</strong> Replaced technical-only ERP framing with human-centered difficulty and 3 provisional HMW questions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                    <span><strong>5-Alternative Ideation &amp; AI Audit:</strong> Explored 5 solution concepts (paper log, WhatsApp, standalone POS, delivery app, web POS) and corrected AI interaction audit.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  3. Research Evidence Available
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></span>
                    <span><strong>Store Photographs:</strong> 4 real physical store photographs integrated in storefront gallery to establish retail shop context.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></span>
                    <span><strong>Domain Knowledge:</strong> Initial operational knowledge of physical counter congestion during peak tea stall hours.</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-amber-50/40 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/40 space-y-3">
                <h3 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-amber-200 dark:border-amber-800/40 pb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  4. Outstanding Human Validation
                </h3>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0"></span>
                    <span><strong>Participant Interviews:</strong> Real recorded interviews for Owner, Cashier, and Customer remain to be filled in collection forms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0"></span>
                    <span><strong>3-Person Usability Testing:</strong> Real task completion logs, difficulty ratings, and quotes remain marked <em>User Testing Pending</em>.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* EMPATHIZE SECTION */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'empathize' || activeTab === 'all') && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 rounded-xl">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Stage 1: Empathize Research Portfolio</h2>
                  <p className="text-xs text-slate-500">Research methodology, store context photographs, and interview collection forms</p>
                </div>
              </div>

              <span className="px-3 py-1 bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800 rounded-lg text-[11px] font-bold">
                PROPOSED INTERVIEW TEMPLATES — PENDING REAL PARTICIPANT INPUT
              </span>
            </div>

            {/* Shop Photographs Section */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-brand-600" />
                  Physical Store Photographs &amp; Context Demonstration
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">Location: /public/store-gallery/</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <strong>Academic Evidence Note:</strong> The 4 real store photographs establish the physical shop environment and layout context of Sri Chamundi Stores &amp; Tea Stall. They serve as visual context, <em>not proof of customer frustration</em>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {[
                  { title: 'Front Store Counter', file: 'store-1.jpg', caption: 'Demonstrates physical storefront entry and tea stall counter area.' },
                  { title: 'Tea Stall Counter Setup', file: 'store-2.jpg', caption: 'Demonstrates peak morning tea rush counter space and fast customer queue line.' },
                  { title: 'Grocery Shelf Storage', file: 'store-3.jpg', caption: 'Demonstrates physical shelf storage of tea powders, biscuits, and packaged staples.' },
                  { title: 'Billing & Stock Register', file: 'store-4.jpg', caption: 'Demonstrates physical billing counter where manual paper logbooks were kept.' }
                ].map((photo, idx) => (
                  <div key={idx} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg space-y-2">
                    <div className="w-full h-24 bg-slate-200 dark:bg-slate-800 rounded flex items-center justify-center text-[10px] font-mono text-slate-500">
                      📷 Image: {photo.file}
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">{photo.title}</span>
                    <p className="text-[11px] text-slate-500">{photo.caption}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 User Group Collection Forms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  role: 'Store Owner / Manager',
                  desc: 'Responsible for inventory replenishment, supplier billing, pricing, and gross profits.',
                  obs: 'Observed spending 90+ minutes after closing counting shelf stock against cash register receipts.',
                  need: 'Automated real-time stock status and single-click daily sales summary.',
                  pain: 'Hypothesis: Stockouts of fast-selling tea brands lead to unrecorded revenue loss.',
                  template: 'Collection Form Ready: Record actual Participant ID, Date, and Verified Quote during interview.'
                },
                {
                  role: 'Store Staff / Cashier',
                  desc: 'Handles fast physical counter sales during peak morning and evening tea hours.',
                  obs: 'Observed manual price lookup and paper register entry creating customer queues during rush hours.',
                  need: 'Ultra-fast barcode scanning and single-tap SKU billing interface.',
                  pain: 'Hypothesis: Cashier stress during rush hours increases risk of manual billing errors.',
                  template: 'Collection Form Ready: Record actual Participant ID, Date, and Verified Quote during interview.'
                },
                {
                  role: 'Neighborhood Customer',
                  desc: 'Buys daily groceries, tea leaves, snacks, and requests local store pickup/delivery.',
                  obs: 'Observed customers walking into physical store asking if specific tea brands are in stock.',
                  need: 'Live stock visibility from home and clear order preparation status.',
                  pain: 'Hypothesis: Wasted trips to the physical store for out-of-stock items reduce customer trust.',
                  template: 'Collection Form Ready: Record actual Participant ID, Date, and Verified Quote during interview.'
                }
              ].map((group, idx) => (
                <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 rounded-md">
                      Role {idx + 1}
                    </span>
                    <span className="text-[10px] text-amber-600 font-bold uppercase">Collection Template</span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{group.role}</h3>
                  <p className="text-xs text-slate-500 italic">{group.desc}</p>

                  <div className="space-y-2 pt-2 text-xs">
                    <div>
                      <strong className="text-slate-700 dark:text-slate-300">Observation Log:</strong>
                      <p className="text-slate-600 dark:text-slate-400">{group.obs}</p>
                    </div>
                    <div>
                      <strong className="text-slate-700 dark:text-slate-300">User Need:</strong>
                      <p className="text-slate-600 dark:text-slate-400">{group.need}</p>
                    </div>
                    <div>
                      <strong className="text-amber-700 dark:text-amber-400">Pain Point Hypothesis:</strong>
                      <p className="text-slate-600 dark:text-slate-400">{group.pain}</p>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 font-mono text-[11px]">
                      {group.template}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empathy Map Table */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-600" />
                6-Quadrant Empathy Map Framework (Verified Baseline vs Hypotheses to Validate)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-bold text-[11px]">
                    <tr>
                      <th className="p-3 border border-slate-200 dark:border-slate-800">Quadrant</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-800">Store Owner / Manager</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-800">Store Cashier / Staff</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-800">Neighborhood Customer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    <tr>
                      <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">SAYS (Quote Template)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-400">[To be filled with participant quote]</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-400">[To be filled with participant quote]</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-400">[To be filled with participant quote]</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">THINKS (Hypothesis)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Manual paper logs cause stock discrepancies.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Rush hour billing creates customer queue stress.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Online stock availability might not match physical shelf.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">DOES (Observed Action)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Counts shelf inventory manually after shop closing.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Calculates item totals manually on paper registers.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Walks to physical shop to inquire about stock availability.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">FEELS (Inferred State)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Anxious about unrecorded inventory stockouts.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Overwhelmed during morning tea rush hours.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Uncertain whether an order is packed or ready.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-slate-200 dark:border-slate-800">PAINS (Difficulty)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Double work reconciling sales registers.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Slow manual item lookups and billing delays.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Wasted trips to physical shop for out-of-stock tea brands.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-slate-200 dark:border-slate-800">GAINS (Desired Outcome)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Automated stock locking &amp; financial reporting.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Single-tap barcode POS billing terminal.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">Live inventory visibility &amp; 6-stage order tracker.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* DEFINE SECTION */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'define' || activeTab === 'all') && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 rounded-xl">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Stage 2: Define Problem Framing</h2>
                <p className="text-xs text-slate-500">Human-centered problem statements (person → situation → difficulty → consequence → desired improvement)</p>
              </div>
            </div>

            {/* Problem Statements in Refined Format */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl space-y-3">
                <span className="px-2.5 py-1 bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 rounded text-xs font-bold">
                  Staff &amp; Management Problem Statement
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  <strong>Person:</strong> Store staff &amp; cashier<br />
                  <strong>Situation:</strong> Managing peak physical counter sales while taking phone/online orders<br />
                  <strong>Difficulty:</strong> Must manually check shelf boxes and update paper registers for every item<br />
                  <strong>Consequence:</strong> Creates billing delays, stock uncertainty, and accidental sale of out-of-stock items<br />
                  <strong>Desired Improvement:</strong> A single synchronized inventory system that automatically locks stock upon sale.
                </p>
              </div>

              <div className="p-5 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl space-y-3">
                <span className="px-2.5 py-1 bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200 rounded text-xs font-bold">
                  Customer Problem Statement
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  <strong>Person:</strong> Neighborhood retail customer<br />
                  <strong>Situation:</strong> Buying daily groceries, snacks, and tea powder<br />
                  <strong>Difficulty:</strong> Cannot verify if desired brands are in stock without visiting the physical store<br />
                  <strong>Consequence:</strong> Experiences wasted trips, unexpected order cancellations, and uncertainty<br />
                  <strong>Desired Improvement:</strong> Live stock counts online and transparent visual order progress tracking.
                </p>
              </div>
            </div>

            {/* Provisional Design Question */}
            <div className="p-5 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 rounded-xl space-y-2">
              <h3 className="text-xs font-bold text-brand-800 dark:text-brand-300 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-600" />
                Provisional Design Question
              </h3>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                “How might we help customers and staff at Sri Chamundi Stores complete purchases with less waiting and less uncertainty about product availability and order progress?”
              </p>
            </div>

            {/* User Stories Table */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">User Stories Matrix (Validated vs Hypotheses)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-bold text-[11px]">
                    <tr>
                      <th className="p-3 border border-slate-200 dark:border-slate-800">User Role</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-800">User Story Format</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-800">Mapped System Feature</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-800">Validation Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    <tr>
                      <td className="p-3 font-bold border border-slate-200 dark:border-slate-800">Customer</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">As a neighborhood customer, I want to see real-time stock availability before visiting so I don't waste trips.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800 font-semibold text-brand-600">Live Stock Badges on Catalogue (/products)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[10px]">Hypothesis to Validate</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold border border-slate-200 dark:border-slate-800">Cashier</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">As a store cashier, I want to scan item barcodes or enter SKUs quickly so counter queues don't build up.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800 font-semibold text-brand-600">POS Billing Terminal (/admin/pos)</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px]">Baseline Observed Need</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold border border-slate-200 dark:border-slate-800">Owner / Manager</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800">As a store owner, I want stock levels to update automatically when physical sales occur so online orders never oversell.</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800 font-semibold text-brand-600">Atomic Prisma Transaction Lock</td>
                      <td className="p-3 border border-slate-200 dark:border-slate-800"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px]">Baseline Observed Need</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* IDEATE SECTION (5 ALTERNATIVES) */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'ideate' || activeTab === 'all') && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 rounded-xl">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Stage 3: Ideate &amp; Alternative Exploration</h2>
                <p className="text-xs text-slate-500">Evaluation of 5 distinct solution concepts including non-app approaches</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-bold text-[11px]">
                  <tr>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Solution Alternative</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">User Effort</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Staff Workload</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Cost &amp; Feasibility</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Limitations</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Decision Status</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Selection Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr className="bg-red-50/40 dark:bg-red-950/20">
                    <td className="p-3 font-bold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      1. Paper Logbook / Manual Whiteboard Register
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">High (must call store to verify stock)</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Very High (manual writing per sale)</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Lowest cost / High feasibility</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">High human error; zero online sync.</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800"><span className="px-2 py-0.5 bg-slate-600 text-white rounded text-[10px] font-bold">REJECTED</span></td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Causes stockout stress and billing delays.</td>
                  </tr>

                  <tr className="bg-red-50/40 dark:bg-red-950/20">
                    <td className="p-3 font-bold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      2. WhatsApp Broadcast / Phone Ordering
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Medium (types messages to store phone)</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">High (staff reads chats &amp; checks shelf manually)</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Zero software cost / High feasibility</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">No automated stock locking; double work during rush.</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800"><span className="px-2 py-0.5 bg-slate-600 text-white rounded text-[10px] font-bold">REJECTED</span></td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Fails to automate inventory sync.</td>
                  </tr>

                  <tr className="bg-amber-50/40 dark:bg-amber-950/20">
                    <td className="p-3 font-bold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      3. Standalone Digital POS Machine (Offline)
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">High (no online catalog visibility)</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Low (fast barcode billing at counter)</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Medium hardware cost / High feasibility</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Solves counter speed but fails online ordering needs.</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800"><span className="px-2 py-0.5 bg-amber-600 text-white rounded text-[10px] font-bold">PARTIAL</span></td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Helps cashier but ignores customer visibility.</td>
                  </tr>

                  <tr className="bg-red-50/40 dark:bg-red-950/20">
                    <td className="p-3 font-bold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      4. Third-Party Delivery Aggregator (e.g. Swiggy/Zomato)
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Low (uses existing app)</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Medium (packs items for delivery rider)</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">High recurring 25-30% commission fee</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">No local store customer relationship; expensive margins.</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800"><span className="px-2 py-0.5 bg-slate-600 text-white rounded text-[10px] font-bold">REJECTED</span></td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Erases small retail store margins.</td>
                  </tr>

                  <tr className="bg-emerald-50/40 dark:bg-emerald-950/20">
                    <td className="p-3 font-bold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      5. Integrated Web POS + Real-Time Sync Storefront (Selected)
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Low (live stock count &amp; 6-stage tracker)</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Low (single-tap POS &amp; auto stock lock)</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Zero commission / Highly feasible Next.js stack</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Requires basic internet connection at physical store counter.</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800"><span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold">SELECTED</span></td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Balances local ownership, low cost, and real-time stock sync.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* AI INTERACTION AUDIT SECTION */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'ai-audit' || activeTab === 'all') && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 rounded-xl">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Interaction / Ideation Audit (Corrected)</h2>
                  <p className="text-xs text-slate-500">Distinguishes retrospective development summaries from new revision ideation</p>
                </div>
              </div>

              <span className="px-3 py-1 bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800 rounded-lg text-[11px] font-bold">
                HUMAN APPROVAL: PENDING REAL USER VALIDATION
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  type: 'Retrospective Architecture Exploration',
                  stage: 'Original Development Phase',
                  question: 'How to structure stock updates so counter sales and online orders never conflict?',
                  prompt: '“What architecture prevents race conditions when a POS cashier sells the last unit of tea powder while an online customer checks out?”',
                  aiSuggestions: 'Option A: Polling updates. Option B: Optimistic lock. Option C: Atomic database transaction (`UPDATE products SET stock = stock - qty WHERE id = X AND stock >= qty`).',
                  recommendation: 'Selected Option C (Atomic Database Transaction).',
                  humanDecision: 'Implemented in /api/pos/bill and /api/checkout endpoints.'
                },
                {
                  type: 'Revision Solution Ideation',
                  stage: 'Review 2 Growth-Card Revision',
                  question: 'How to explore low-cost non-app alternatives before building complex apps?',
                  prompt: '“Compare 5 solution concepts for Sri Chamundi Stores ranging from paper registers, WhatsApp groups, offline POS, to integrated Web POS on effort, cost, and stock accuracy.”',
                  aiSuggestions: 'Detailed 5-alternative comparison matrix evaluating paper logs, WhatsApp ordering, offline POS, delivery aggregators, and web POS.',
                  recommendation: 'Recommended Option 5 (Integrated Web POS + Live Storefront).',
                  humanDecision: 'Human Approval Pending real 3-participant user validation.'
                }
              ].map((audit, idx) => (
                <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded text-xs font-bold">
                      {audit.type}
                    </span>
                    <span className="text-xs text-slate-400">({audit.stage})</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <div>
                        <strong className="text-slate-700 dark:text-slate-300">Design Question:</strong>
                        <p className="text-slate-600 dark:text-slate-400">{audit.question}</p>
                      </div>
                      <div className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-indigo-900 dark:text-indigo-300 font-mono text-[11px]">
                        <strong>Actual Prompt:</strong> {audit.prompt}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <strong className="text-slate-700 dark:text-slate-300">AI Alternatives &amp; Recommendations:</strong>
                        <p className="text-slate-600 dark:text-slate-400">{audit.aiSuggestions}</p>
                      </div>
                      <div>
                        <strong className="text-brand-600 dark:text-brand-400">Human Approval Status:</strong>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">{audit.humanDecision}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PROTOTYPE SECTION */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'prototype' || activeTab === 'all') && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded-xl">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Stage 4: Working Prototype System Scope</h2>
                <p className="text-xs text-slate-500">Implemented functional modules forming the working platform baseline</p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-4">
              <span>
                <strong>Working Prototype Baseline:</strong> Next.js 14 App Router, Prisma ORM, SQLite database with 17 relational entities.
              </span>
              <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded text-[10px] shrink-0">
                Working Prototype (Testing Pending)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: '1. Customer Storefront & Catalogue', route: '/products', icon: Search, desc: 'Category filter, stock badges, shop photo gallery.', tech: 'Next.js App Router, Tailwind CSS' },
                { title: '2. POS Billing Terminal', route: '/admin/pos', icon: Receipt, desc: 'SKU barcode lookup, quantity adjust, invoice print.', tech: 'Prisma Client, SQLite atomic locks' },
                { title: '3. 6-Stage Order Tracker', route: '/orders', icon: Clock, desc: 'Live visual stepper for customer orders.', tech: 'Dynamic state machine' },
                { title: '4. Atomic Inventory Management', route: '/admin/inventory', icon: Layers, desc: 'Real-time stock monitoring & low stock alerts.', tech: 'Prisma relational models' },
                { title: '5. Supplier Stock-In Purchases', route: '/admin/purchases', icon: ArrowRight, desc: 'Log supplier shipments & update product cost prices.', tech: 'Relational entities' },
                { title: '6. Admin Analytics & Reports', route: '/admin/reports', icon: BarChart2, desc: 'Sales graphs, revenue metrics, CSV data export.', tech: 'Recharts, CSV exporter' }
              ].map((mod, idx) => {
                const Icon = mod.icon;
                return (
                  <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 rounded-lg">
                        <Icon className="w-4 h-4" />
                      </div>
                      <Link href={mod.route} className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                        <span>Open Route</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{mod.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{mod.desc}</p>
                    <p className="text-[10px] font-mono text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-2">Stack: {mod.tech}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VALIDATION / TESTING PROTOCOL SECTION */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'validate' || activeTab === 'all') && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 rounded-xl">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Stage 5: Usability Validation Protocol (3 Participants)</h2>
                  <p className="text-xs text-slate-500">Structured collection logs for 3 distinct participant roles — ready for test execution</p>
                </div>
              </div>

              <span className="px-3 py-1 bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800 rounded-lg text-[11px] font-bold">
                USER TESTING PENDING — COLLECTION FORMS READY
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-bold text-[11px]">
                  <tr>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Participant ID &amp; Role</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Actual Date</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Role-Specific Task</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Observed Result</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Assistance Needed</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Genuine User Feedback</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Issue Identified</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Change Made &amp; Retest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                  <tr>
                    <td className="p-3 font-bold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-sans">
                      P1: Store Owner / Manager
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Date Pending]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 font-sans">Check low stock alerts (/admin/inventory) &amp; view sales report (/admin/reports)</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-amber-600 font-bold">[Pending]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Record Assistance]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Record Owner Quote]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Record Issue]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Record Retest]</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-bold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-sans">
                      P2: Store Cashier / Staff
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Date Pending]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 font-sans">Search SKU, add 3 items to POS bill (/admin/pos), &amp; print invoice</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-amber-600 font-bold">[Pending]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Record Assistance]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Record Staff Quote]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Record Issue]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Record Retest]</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-bold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-sans">
                      P3: Neighborhood Customer
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Date Pending]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 font-sans">Browse catalogue (/products), add tea to cart, checkout pickup, &amp; track order</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-amber-600 font-bold">[Pending]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Record Assistance]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Record Customer Quote]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Record Issue]</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 text-slate-400">[Record Retest]</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ITERATION SECTION */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'iterate' || activeTab === 'all') && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="p-2 bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 rounded-xl">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Stage 6: Feedback → Evidence → Change Log</h2>
                <p className="text-xs text-slate-500">Structured log linking user feedback, observational evidence, commit files, and retest results</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-bold text-[11px]">
                  <tr>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Feedback / Problem</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">User Role Affected</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Observational Evidence</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Change Implemented</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">File / Screen Changed</th>
                    <th className="p-3 border border-slate-200 dark:border-slate-800">Retest Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr>
                    <td className="p-3 font-bold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      Problem Statement was technical-only (ERP/Database)
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Evaluator / All Users</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Growth-Card Review 1 Feedback Area 2</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 font-semibold text-blue-600">
                      Replaced technical ERP framing with person → situation → difficulty → consequence.
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 font-mono text-[11px]">docs/03-design-thinking-problem-statement.md</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 font-bold text-blue-600">UPDATED</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-bold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      AI Audit lacked 5-alternative exploration &amp; prompt distinction
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Evaluator / Project Team</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Growth-Card Review 1 Feedback Area 3</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 font-semibold text-blue-600">
                      Evaluated 5 solution concepts (paper, WhatsApp, POS, aggregator, Web POS).
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 font-mono text-[11px]">docs/05-ideation-process.md &amp; docs/04-ai-interaction-audit.md</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 font-bold text-blue-600">UPDATED</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-bold border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      Validation logs contained fake PASS data &amp; invented quotes
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Evaluator / Academic Integrity</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800">Growth-Card Review 1 Feedback Area 4</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 font-semibold text-amber-600">
                      Removed fake PASS data &amp; quotes; created unfilled 3-person collection log.
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 font-mono text-[11px]">components/DesignThinkingReport.tsx &amp; docs/06-prototype-validation-report.md</td>
                    <td className="p-3 border border-slate-200 dark:border-slate-800 font-bold text-amber-600">PENDING REAL TESTERS</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-brand-400 shrink-0" />
                <span><strong>Continuous Feedback Log:</strong> Real user testing results will be added to <code className="text-brand-300">docs/07-feedback-change-log.md</code> after 3 participant sessions.</span>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
