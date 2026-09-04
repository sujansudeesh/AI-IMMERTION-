'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

function CatalogueContent() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [availability, setAvailability] = useState('');
  const [sort, setSort] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategory, selectedBrand, availability, sort, minPrice, maxPrice]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (selectedCategory) params.set('category', selectedCategory);
      if (selectedBrand) params.set('brand', selectedBrand);
      if (availability) params.set('availability', availability);
      if (sort) params.set('sort', sort);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedBrand('');
    setAvailability('');
    setSort('newest');
    setMinPrice('');
    setMaxPrice('');
  };

  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Product Catalogue
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Showing {products.length} products with real-time stock availability
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-xl text-xs">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500 font-medium">Sort By:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 dark:text-slate-100 outline-none"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
                <option value="popular">Popularity</option>
                <option value="rating">Best Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                  <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                  <span>Filters</span>
                </div>
                {(selectedCategory || selectedBrand || availability || search || minPrice) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Search */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Search SKU / Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="E.g. Atta, GRO-001..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                      selectedCategory === '' ? 'bg-brand-50 text-brand-700 font-bold dark:bg-brand-950/60 dark:text-brand-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                        selectedCategory === cat.slug ? 'bg-brand-50 text-brand-700 font-bold dark:bg-brand-950/60 dark:text-brand-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Stock Status
                </label>
                <div className="space-y-1 text-xs">
                  {[
                    { id: '', label: 'All Items' },
                    { id: 'in_stock', label: 'In Stock' },
                    { id: 'low_stock', label: 'Low Stock (< 5 left)' },
                    { id: 'out_of_stock', label: 'Out of Stock' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAvailability(opt.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition ${
                        availability === opt.id ? 'bg-brand-50 text-brand-700 font-bold dark:bg-brand-950/60 dark:text-brand-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Price Range (₹)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/2 px-2.5 py-1.5 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none"
                  />
                  <span className="text-slate-400 text-xs">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-1/2 px-2.5 py-1.5 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-72 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No products found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search criteria or category filters to find what you are looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {products.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <CatalogueContent />
    </Suspense>
  );
}
