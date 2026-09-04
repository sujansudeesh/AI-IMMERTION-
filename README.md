# 🛒 Sri Chamundi Stores & Tea Stall — Retail Billing, Inventory & Online Ordering Platform

A complete, production-quality retail management and e-commerce web application built for small-to-medium retail stores. It seamlessly combines **Online Shopping**, an **Amazon-Style Customer Account Portal**, **Real-Time Stock Inventory Sync**, an **Ultra-Fast POS Billing Terminal**, **Supplier Purchase Management**, and **CSV/PDF Financial Reports**.

![Next.js](https://img.shields.io/badge/Next.js-14.1-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma_ORM-5.22-2D3748?logo=prisma)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?logo=sqlite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)

---

## 🌟 Live Demo Login Credentials

| Role | Email | Password | Access Capabilities |
|------|-------|----------|---------------------|
| **Super Admin** | `admin@store.com` | `password123` | Full administrative control, profit calculations, store settings, reports |
| **Store Manager** | `manager@store.com` | `password123` | Product management, inventory stock adjustments, stock-in purchases |
| **POS Cashier (Staff)** | `staff@store.com` | `password123` | Fast POS billing terminal, order fulfillment, tax invoice generation |
| **Customer** | `customer@store.com` | `password123` | Online catalogue, cart, multi-step checkout, Amazon-style account profile & live tracking |

*(Quick 1-click login buttons are also available directly on the `/login` page).*

---

## ✨ Key Features & Highlights

### 1. 🛍️ Customer Storefront & E-Commerce
- **Responsive Homepage**: Hero banner, category grid, low-stock deal alerts ("Only 3 left!"), and featured FMCG staples.
- **Physical Store Showcase**: Live photo gallery featuring real storefront views (**Sri Chamundi Stores & Tea Stall**), physical counter, snack display, and tea refreshment stack with full-screen lightbox view.
- **Product Catalogue (`/products`)**: Debounced search, category filter pills, price range slider, stock availability filter (`In Stock`, `Low Stock`, `Out of Stock`), and sorting options.
- **Product Details (`/products/[id]`)**: Stock status badges, pricing breakdown (Selling price, Discount price, GST slab), customer reviews, and quantity selectors bounded strictly by live stock.
- **Shopping Cart (`/cart`)**: Real-time stock boundary enforcement (prevents ordering more units than available), "Save for Later" drawer, and automated GST & delivery calculations.
- **Multi-Step Checkout (`/checkout`)**: Step 1 Address selection, Step 2 Order Summary, Step 3 Payment architecture (UPI, Credit/Debit Cards, Net Banking, COD), and Step 4 Order Confirmation.
- **Order Tracking (`/orders/[id]`)**: 6-stage visual timeline tracker (`Placed` → `Confirmed` → `Processing` → `Ready` → `Out for Delivery` → `Delivered`).
- **Amazon-Style Customer Account (`/profile`)**: Order history list with 1-click **Reorder Items**, address book management, and wishlist.

### 2. ⚡ Lightning-Fast POS & Billing Terminal (`/admin/pos`)
- **Keyboard & SKU Barcode Scanner**: Instant product lookup by SKU or name with auto-cart addition on Enter.
- **Billing Cart**: Inline quantity adjustments, flat discount application, and automated GST computation.
- **Payment Processing**: Cash (with Cash Received & Change Due calculator), UPI QR display, and Card processing.
- **Printable Tax Invoice Modal**: Thermal/A4 tax invoice preview with print trigger (`window.print()`).
- **Atomic Stock Deduction**: Server-side Prisma transaction deducting stock instantly and writing an audit trail.

### 3. 📦 Real-Time Inventory & Stock-In Purchases (`/admin/inventory` & `/admin/purchases`)
- **Master Inventory**: Real-time tracking of SKUs, min/max thresholds, purchase vs selling costs, and stock status badges.
- **Stock Adjustment Modal**: Adjust stock (+/- quantity) with mandatory audit reasons (`Manual Adjustment`, `Damaged Stock Removal`, `Customer Return`).
- **Transaction Audit Log**: Complete history of every stock movement (`PURCHASE`, `SALE`, `POS_SALE`, `ADJUSTMENT`, `RETURN`).
- **Stock-In Purchases (`/admin/purchases`)**: Create supplier purchase orders with itemized unit purchase costs & GST. Submitting a purchase automatically increments inventory stock.

### 4. 📊 Admin Dashboard, Reports & Settings (`/admin`)
- **Dashboard (`/admin`)**: Today's sales KPI cards, total orders, active customer count, interactive 7-day sales trend charts (Recharts), and low-stock warning banners.
- **Financial & Profit Reports (`/admin/reports`)**:
  - Sales & Revenue Report.
  - Product Profitability Report (`Gross Profit = Selling Price - Purchase Cost`).
  - Inventory Asset Valuation Report.
  - 1-Click **CSV Export** & Printable PDF reports.
- **Returns & Restock Management (`/admin/returns`)**: Approve/reject customer return requests with optional automatic restocking.
- **Store Settings (`/admin/settings`)**: Customize Store Name, Address, GSTIN, Currency, Low Stock Threshold, and Public Stock Visibility toggles.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Light & Dark mode support
- **Database & ORM**: [SQLite](https://sqlite.org/) with [Prisma ORM 5](https://www.prisma.io/)
- **State & Context**: React Context API (`AuthContext`, `CartContext`, `ThemeContext`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Authentication**: JWT / HTTP-only cookies with `bcryptjs` password hashing

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sujansudeesh/AI-IMMERTION-.git
   cd AI-IMMERTION-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the Database Schema**:
   ```bash
   npx prisma db push
   ```

4. **Seed Demo Data**:
   Populate the database with 35+ realistic FMCG products, categories, suppliers, customers, historical orders, and store settings:
   ```bash
   npx ts-node -O '{"module": "commonjs"}' prisma/seed.ts
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Data Integrity Highlights

- **Server-Side Validation**: All item prices, GST rates, stock availability, and totals are strictly computed on the server.
- **Atomic Transactions**: Inventory deductions use server-side Prisma transactions (`$transaction`) to eliminate negative stock and race conditions.
- **Role-Based Access Control (RBAC)**: Sensitive financial metrics (supplier purchase costs, gross profit margins, revenue reports) are hidden from cashier/staff roles and public customers.
- **Soft Delete**: Deactivated products are marked as `HIDDEN` rather than permanently deleted, preserving past transaction logs.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
