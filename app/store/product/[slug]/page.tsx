'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Truck, ShieldCheck, Mail, ArrowLeft, CheckCircle2, AlertCircle, Plus, Minus, Share2 } from 'lucide-react';
import { STORE_PRODUCTS, Product } from '@/lib/storeData';
import { useCart } from '@/components/store/CartContext';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const product: Product = STORE_PRODUCTS.find((p) => p.slug === slug) || STORE_PRODUCTS[0];

  const gallery = [product.image, '/logo.jpeg', '/logo.jpeg'];

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
          
          {/* Left: Gallery View */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-center h-96 relative">
              <Image
                src={gallery[activeImageIndex]}
                alt={product.name}
                width={280}
                height={280}
                className="object-contain max-h-80"
                priority
              />
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-4">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl bg-white border p-2 flex items-center justify-center transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#2563EB] shadow-md ring-2 ring-[#2563EB]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Image src={img} alt="Thumbnail" width={60} height={60} className="object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Detail Panel */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#2563EB] tracking-wider uppercase">
                {product.subCategory || product.categoryName}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 text-xs pt-1">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} reviews)</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="font-mono text-slate-500">{product.sku}</span>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#2563EB]">₹{product.price.toLocaleString()}.00</span>
                <span className="text-sm font-semibold text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}.00</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-extrabold">
                  Save {product.discountPercent}% (₹{(product.originalPrice - product.price).toLocaleString()})
                </span>
              </div>
              <p className="text-xs text-slate-500">Includes all applicable GST & Taxes.</p>
            </div>

            {/* Availability & B2B Inquiry */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span>Availability:</span>
                {product.inStock ? (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> In Stock ({product.stockCount} units available)
                  </span>
                ) : (
                  <span className="text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Pre-Booking Open (Dispatching soon)
                  </span>
                )}
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#0F172A] space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#2563EB]">
                  <Mail className="w-4 h-4" />
                  <span>Bulk Order & B2B Inquiries</span>
                </div>
                <p className="text-slate-600">
                  For bulk engineering orders or institutional pricing, email us at: <strong className="text-slate-900 font-mono">awielabs@gmail.com</strong>
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector & Action Button */}
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
                <span>{product.inStock ? 'Add to Cart' : 'Pre-Book Now'}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-slate-600 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
                <span>100% Genuine Tested Components</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                <span>Fast Dispatch via Bluedart / DTDC</span>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="pt-6 space-y-3 border-t border-slate-200">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Specifications</h3>
              <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex p-3 bg-white hover:bg-slate-50">
                    <span className="w-1/3 font-bold text-slate-700">{key}</span>
                    <span className="w-2/3 text-slate-600 font-mono">{value}</span>
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
