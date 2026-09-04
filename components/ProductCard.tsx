'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Heart, Star, Check, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/invoice';

export interface ProductProps {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category?: { name: string };
  sellingPrice: number;
  discountPrice?: number | null;
  currentStock: number;
  minStock: number;
  unit: string;
  weight?: string | null;
  imageUrl: string;
  rating?: number;
  reviewsCount?: number;
  publicStockVisible?: boolean;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [added, setAdded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isWishlisted = wishlist.includes(product.id);
  const effectivePrice = product.discountPrice || product.sellingPrice;
  const hasDiscount = product.discountPrice && product.discountPrice < product.sellingPrice;
  const discountPct = hasDiscount
    ? Math.round(((product.sellingPrice - product.discountPrice!) / product.sellingPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setErrorMsg('');
    const res = addToCart(product, 1);
    if (res.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } else {
      setErrorMsg(res.error || 'Cannot add to cart');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  // Stock status badge helper
  const getStockBadge = () => {
    if (product.currentStock === 0) {
      return (
        <span className="bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 text-[11px] font-semibold px-2 py-0.5 rounded-md">
          Out of Stock
        </span>
      );
    }
    if (product.currentStock <= (product.minStock || 5)) {
      return (
        <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[11px] font-semibold px-2 py-0.5 rounded-md">
          Only {product.currentStock} left!
        </span>
      );
    }
    return (
      <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[11px] font-semibold px-2 py-0.5 rounded-md">
        In Stock {product.publicStockVisible ? `(${product.currentStock})` : ''}
      </span>
    );
  };

  return (
    <div className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col relative">
      
      {/* Discount Tag */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 bg-red-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-md shadow">
          {discountPct}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-full text-slate-400 hover:text-red-500 transition shadow-sm"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Product Image Link */}
      <Link href={`/products/${product.id}`} className="block relative w-full h-48 bg-slate-50 dark:bg-slate-900/50 p-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {product.brand}
          </span>
          {getStockBadge()}
        </div>

        <Link
          href={`/products/${product.id}`}
          className="font-medium text-slate-900 dark:text-slate-100 text-sm line-clamp-2 hover:text-brand-600 dark:hover:text-brand-400 transition mb-2"
        >
          {product.name}
        </Link>

        {product.weight && (
          <span className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            Unit: {product.weight}
          </span>
        )}

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-3 text-amber-400 text-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">
            {product.rating || 4.5}
          </span>
          <span className="text-slate-400 text-[11px]">({product.reviewsCount || 12})</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-slate-900 dark:text-white">
                {formatCurrency(effectivePrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.sellingPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.currentStock === 0}
            className={`p-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition ${
              product.currentStock === 0
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                : added
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-600 hover:bg-brand-700 text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

        {/* Stock error alert message */}
        {errorMsg && (
          <div className="mt-2 p-1.5 bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300 text-[11px] font-medium rounded-lg flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

    </div>
  );
}
