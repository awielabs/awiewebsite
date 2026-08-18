'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Truck, ShieldCheck, Mail, ArrowLeft, CheckCircle2, AlertCircle, Plus, Minus, Cpu } from 'lucide-react';
import { STORE_PRODUCTS, Product } from '@/lib/storeData';
import { useCart } from '@/components/store/CartContext';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const product: Product = STORE_PRODUCTS.find((p) => p.slug === slug) || STORE_PRODUCTS[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#2563EB]">Home</Link>
          <span>→</span>
          <Link href="/store" className="hover:text-[#2563EB]">Shop</Link>
          <span>→</span>
          <Link href={`/store/category/${product.categorySlug}`} className="hover:text-[#2563EB]">{product.categoryName}</Link>
          <span>→</span>
          <span className="text-slate-900 font-bold">{product.name}</span>
        </div>

        {/* Main Product Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Product Image Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-center h-96 relative">
              <Image
                src={product.image}
                alt={product.name}
                width={260}
                height={260}
                className="object-contain max-h-80"
                priority
              />
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2563EB] shrink-0" />
              <div>
                <span className="font-extrabold text-slate-900 block">AWIE Quality Assured</span>
                <span className="text-slate-600 font-medium">100% genuine tested components directly sourced for lab use.</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details Panel */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
                <Cpu className="w-3.5 h-3.5" />
                <span>{product.categoryName} • {product.subCategory || 'Hardware'}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 text-xs pt-1 font-mono text-slate-500">
                <span>SKU: {product.sku}</span>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900">₹{product.price.toLocaleString()}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  GST Included
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Standard shipping calculated at checkout.</p>
            </div>

            {/* Availability */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span>Stock Status:</span>
                {product.inStock ? (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Ready for Immediate Dispatch ({product.stockCount} in stock)
                  </span>
                ) : (
                  <span className="text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Out of Stock (Pre-Booking Available)
                  </span>
                )}
              </div>

              {/* B2B Contact Box */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Mail className="w-4 h-4 text-[#2563EB]" />
                  <span>Bulk Order & Institutional Procurement</span>
                </div>
                <p className="text-slate-600 font-medium">
                  Need bulk quantities for lab setup or institution? Contact us at <strong className="text-slate-900 font-mono">awielabs@gmail.com</strong>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Overview</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Features Bullet List */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Key Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-4 border-t border-slate-200 flex items-center gap-4">
              <div className="flex items-center gap-3 border border-slate-300 rounded-xl bg-white p-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-extrabold text-slate-900 w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Specifications Table */}
            <div className="pt-6 space-y-3 border-t border-slate-200">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Technical Specifications</h3>
              <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex p-3 bg-white hover:bg-slate-50">
                    <span className="w-1/3 font-bold text-slate-700">{key}</span>
                    <span className="w-2/3 text-slate-600 font-mono font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
