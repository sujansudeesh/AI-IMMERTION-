'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  productId: string;
  sku: string;
  name: string;
  brand: string;
  sellingPrice: number;
  discountPrice?: number | null;
  gstRate: number;
  quantity: number;
  currentStock: number;
  imageUrl: string;
  unit: string;
}

interface CartContextType {
  cart: CartItem[];
  savedForLater: CartItem[];
  wishlist: string[];
  addToCart: (product: any, quantity?: number) => { success: boolean; error?: string };
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => { success: boolean; error?: string };
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
  subtotal: number;
  gstTotal: number;
  deliveryFee: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType>({} as any);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('pos_cart');
      const savedLater = localStorage.getItem('pos_saved_later');
      const savedWish = localStorage.getItem('pos_wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedLater) setSavedForLater(JSON.parse(savedLater));
      if (savedWish) setWishlist(JSON.parse(savedWish));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('pos_cart', JSON.stringify(newCart));
  };

  const addToCart = (product: any, qty: number = 1) => {
    const existingIndex = cart.findIndex((i) => i.productId === product.id);
    const currentQty = existingIndex > -1 ? cart[existingIndex].quantity : 0;
    const targetQty = currentQty + qty;

    if (targetQty > product.currentStock) {
      return {
        success: false,
        error: `Only ${product.currentStock} units of "${product.name}" available in stock.`,
      };
    }

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = cart.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: targetQty } : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          productId: product.id,
          sku: product.sku,
          name: product.name,
          brand: product.brand,
          sellingPrice: product.sellingPrice,
          discountPrice: product.discountPrice,
          gstRate: product.gstRate,
          quantity: qty,
          currentStock: product.currentStock,
          imageUrl: product.imageUrl,
          unit: product.unit || 'pcs',
        },
      ];
    }

    saveCartToStorage(updatedCart);
    return { success: true };
  };

  const removeFromCart = (productId: string) => {
    const updated = cart.filter((i) => i.productId !== productId);
    saveCartToStorage(updated);
  };

  const updateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return { success: true };
    }

    const item = cart.find((i) => i.productId === productId);
    if (!item) return { success: false, error: 'Item not found' };

    if (newQty > item.currentStock) {
      return {
        success: false,
        error: `Cannot add more than available stock (${item.currentStock} left).`,
      };
    }

    const updated = cart.map((i) => (i.productId === productId ? { ...i, quantity: newQty } : i));
    saveCartToStorage(updated);
    return { success: true };
  };

  const saveForLater = (productId: string) => {
    const item = cart.find((i) => i.productId === productId);
    if (item) {
      removeFromCart(productId);
      const updatedLater = [...savedForLater, item];
      setSavedForLater(updatedLater);
      localStorage.setItem('pos_saved_later', JSON.stringify(updatedLater));
    }
  };

  const moveToCart = (productId: string) => {
    const item = savedForLater.find((i) => i.productId === productId);
    if (item) {
      const res = addToCart(item, item.quantity);
      if (res.success) {
        const updatedLater = savedForLater.filter((i) => i.productId !== productId);
        setSavedForLater(updatedLater);
        localStorage.setItem('pos_saved_later', JSON.stringify(updatedLater));
      }
    }
  };

  const toggleWishlist = (productId: string) => {
    let updated: string[];
    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
    } else {
      updated = [...wishlist, productId];
    }
    setWishlist(updated);
    localStorage.setItem('pos_wishlist', JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('pos_cart');
  };

  // Pricing Calculations
  const subtotal = cart.reduce((sum, item) => {
    const price = item.discountPrice || item.sellingPrice;
    return sum + price * item.quantity;
  }, 0);

  const gstTotal = Math.round(
    cart.reduce((sum, item) => {
      const lineTotal = (item.discountPrice || item.sellingPrice) * item.quantity;
      return sum + (lineTotal * item.gstRate) / 100;
    }, 0)
  );

  const deliveryFee = subtotal > 500 || cart.length === 0 ? 0 : 40;
  const grandTotal = Math.round(subtotal + gstTotal + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        savedForLater,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        saveForLater,
        moveToCart,
        toggleWishlist,
        clearCart,
        subtotal,
        gstTotal,
        deliveryFee,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
