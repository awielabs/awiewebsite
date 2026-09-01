'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import RazorpayCheckoutButton from './RazorpayCheckoutButton';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '@/lib/storeData';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  totalSavings: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('awie_store_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('LocalStorage cart error:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('awie_store_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage cart error:', e);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalOriginal = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const totalSavings = totalOriginal - subtotal;

  const handleCheckout = async () => {
    try {
      await fetch('/api/store/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          totalAmount: subtotal,
          customerEmail: 'awielabs@gmail.com',
          customerName: 'AWIE Store Visitor',
        }),
      });
    } catch (e) {
      console.warn('Checkout submission error:', e);
    }
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        totalSavings,
      }}
    >
      {children}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              {/* Header */}
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#2563EB] text-white">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-white">AWIE Store Cart</h2>
                    <span className="text-xs text-slate-300">
                      {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {checkoutSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Pre-Order Submitted!</h3>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto">
                      Thank you! Our sales team will confirm your stock & shipping details via awielabs@gmail.com.
                    </p>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">Your cart is empty</h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Browse development boards, sensors, drone parts, and components to add items.
                    </p>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200"
                    >
                      <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{product.name}</h4>
                        <span className="text-[10px] font-mono text-slate-500 block">{product.sku}</span>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] font-bold text-[#2563EB] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                            Price on Request
                          </span>
                          <div className="flex items-center gap-2 border border-slate-300 rounded-lg bg-white px-2 py-1">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="text-slate-500 hover:text-slate-900"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-slate-900 w-4 text-center">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="text-slate-500 hover:text-slate-900"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && !checkoutSuccess && (
                <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
                  {/* Store not live yet — hide Razorpay & totals */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-[#2563EB]/30 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping shrink-0" />
                    <div>
                      <span className="text-xs font-extrabold text-white block">Products will go live soon!</span>
                      <span className="text-[11px] text-slate-400 font-medium">Checkout & pricing will be available at launch.</span>
                    </div>
                  </div>

                  <div className="flex justify-around pt-2 text-[10px] text-slate-500 border-t border-slate-200">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#2563EB]" />
                      Genuine Parts
                    </span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-emerald-600" />
                      Fast All-India Shipping
                    </span>
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
