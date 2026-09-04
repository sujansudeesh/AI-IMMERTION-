'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Flame, Sparkles, Store, Camera, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products?limit=20'),
        ]);
        const catData = await catRes.json();
        const prodData = await prodRes.json();
        setCategories(catData.categories || []);
        setProducts(prodData.products || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const lowStockDeals = products.filter((p) => p.currentStock > 0 && p.currentStock <= p.minStock);
  const featuredProducts = products.filter((p) => p.currentStock > 0).slice(0, 8);
  const popularProducts = products.filter((p) => p.discountPrice).slice(0, 8);

  const storePhotos = [
    {
      url: '/store-gallery/store-front.jpg',
      title: 'Sri Chamundi Stores & Tea Stall Entrance',
      subtitle: 'Our main store front with Bisleri, 3 Roses Tea & MilkyMist banners',
    },
    {
      url: '/store-gallery/store-counter.jpg',
      title: 'Physical Store Counter & Ice Cream Freezer',
      subtitle: 'Full walk-in store layout with snacks, beverages and ice creams',
    },
    {
      url: '/store-gallery/snack-display.jpg',
      title: 'Fresh Biscuit & Snack Display',
      subtitle: 'Stocked with Parle-G, Good Day, Dark Fantasy & traditional savories',
    },
    {
      url: '/store-gallery/biscuit-jars.jpg',
      title: 'Bakery Cookie Jars & Tea Snacks',
      subtitle: 'Freshly stacked cookies, rusk and daily refreshment items',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-700/60 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 border border-emerald-500/30">
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>Sri Chamundi Stores & Tea Stall • Live Storefront</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Welcome to Sri Chamundi Stores
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg">
              Order online from our physical store counter. Fresh tea, biscuits, packaged snacks, cooking oils, dairy, and daily household groceries delivered right to your door!
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition flex items-center gap-2 shadow-lg"
              >
                <span>Browse Online Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#store-gallery"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold px-5 py-3 rounded-xl text-sm transition border border-slate-700 flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>See Our Store Photos</span>
              </a>
            </div>
          </div>

          <div className="hidden md:flex justify-end relative">
            <div className="relative group overflow-hidden rounded-3xl border-2 border-emerald-500/40 shadow-2xl max-w-md">
              <img
                src="/store-gallery/store-front.jpg"
                alt="Sri Chamundi Stores & Tea Stall Front"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-5">
                <div>
                  <span className="bg-emerald-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded">Real Store Photo</span>
                  <h3 className="text-white font-bold text-base mt-1">Sri Chamundi Stores & Tea Stall</h3>
                  <p className="text-xs text-slate-300">Highway Main Road • Walk-ins & Online Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Physical Store Showcase Gallery */}
      <section id="store-gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
            <Camera className="w-4 h-4" />
            <span>Storefront & Counter Tour</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Take a Look Inside Sri Chamundi Stores
          </h2>
          <p className="text-xs text-slate-500">
            Here is how our physical store looks in person! We keep our shelves freshly stocked every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {storePhotos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhoto(photo.url)}
              className="group cursor-pointer bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow transition-opacity">
                    View Full Image
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs line-clamp-1">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    {photo.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Shop by Category
          </h2>
          <Link href="/products" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 p-4 rounded-2xl text-center hover:border-brand-500 hover:shadow-md transition group flex flex-col items-center justify-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Low-Stock Deals Section */}
      {lowStockDeals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          <div className="bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-500 text-white rounded-xl">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-950 dark:text-amber-300">Limited Stock Alerts</h3>
                  <p className="text-xs text-amber-800 dark:text-amber-400">Order before units sell out at the physical store!</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lowStockDeals.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Featured Snacks & Staples
            </h2>
            <p className="text-xs text-slate-500">Handpicked items straight from our counter</p>
          </div>
          <Link href="/products" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            See All Products
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </section>

      <Footer />

      {/* Full-Screen Image Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src={activePhoto}
              alt="Sri Chamundi Stores Full View"
              className="max-h-[80vh] w-auto object-contain rounded-2xl border border-slate-700 shadow-2xl"
            />
            <p className="text-xs text-slate-400 mt-3 font-semibold">Click anywhere to close full-screen view</p>
          </div>
        </div>
      )}
    </div>
  );
}
