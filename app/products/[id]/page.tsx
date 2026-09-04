'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/invoice';
import { ShoppingCart, Heart, Star, ShieldCheck, Check, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();
        if (data.product) {
          setProduct(data.product);

          // Load related products from same category
          const relRes = await fetch(`/api/products?category=${data.product.categoryId}&limit=4`);
          const relData = await relRes.json();
          setRelatedProducts((relData.products || []).filter((p: any) => p.id !== data.product.id));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="max-w-7xl mx-auto p-8 w-full flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="max-w-7xl mx-auto p-12 text-center w-full flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Product Not Found</h2>
          <Link href="/products" className="inline-block bg-brand-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl">
            Return to Catalogue
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const effectivePrice = product.discountPrice || product.sellingPrice;
  const hasDiscount = product.discountPrice && product.discountPrice < product.sellingPrice;

  const handleAddToCart = () => {
    setErrorMsg('');
    const res = addToCart(product, quantity);
    if (res.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } else {
      setErrorMsg(res.error || 'Cannot add to cart');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Back Link */}
        <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 mb-6 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>

        {/* Product Details Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Image Gallery */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl flex items-center justify-center relative min-h-[320px]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-80 w-auto object-contain"
            />
            {hasDiscount && (
              <div className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs uppercase px-2.5 py-1 rounded-md shadow">
                Save {Math.round(((product.sellingPrice - product.discountPrice!) / product.sellingPrice) * 100)}%
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {product.brand} • SKU: {product.sku}
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-2 text-slate-400 hover:text-red-500 transition rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {product.name}
            </h1>

            {/* Category & Rating */}
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium px-2.5 py-1 rounded-lg">
                {product.category?.name}
              </span>
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || 4.5}</span>
                <span className="text-slate-400 text-xs font-normal">({product.reviewsCount || 12} customer reviews)</span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-700/50 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {formatCurrency(effectivePrice)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatCurrency(product.sellingPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">Includes {product.gstRate}% GST where applicable</p>
            </div>

            {/* Inventory Stock Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Availability:</span>
                {product.currentStock === 0 ? (
                  <span className="bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-md">
                    Out of Stock
                  </span>
                ) : product.currentStock <= product.minStock ? (
                  <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-md">
                    Low Stock: Only {product.currentStock} remaining!
                  </span>
                ) : (
                  <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-md">
                    In Stock ({product.currentStock} {product.unit} available)
                  </span>
                )}
              </div>
              {product.weight && (
                <p className="text-xs text-slate-500">Unit Weight/Size: {product.weight}</p>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-slate-100 dark:border-slate-700/60 pt-3">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1">Description</h4>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={product.currentStock === 0 || quantity <= 1}
                    className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.currentStock, q + 1))}
                    disabled={product.currentStock === 0 || quantity >= product.currentStock}
                    className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.currentStock === 0}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition ${
                    product.currentStock === 0
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                      : added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-600 hover:bg-brand-700 text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Shopping Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart ({formatCurrency(effectivePrice * quantity)})</span>
                    </>
                  )}
                </button>
              </div>

              {errorMsg && (
                <div className="p-2 bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300 text-xs font-semibold rounded-xl flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Related Products in {product.category?.name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
