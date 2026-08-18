'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Lock,
  Headphones,
  Cpu,
  Wifi,
  Layers,
  Monitor,
  Cog,
  BatteryCharging,
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';
import { STORE_CATEGORIES, STORE_PRODUCTS } from '@/lib/storeData';
import { useCart } from '@/components/store/CartContext';

export default function StorePage() {
  const { addToCart } = useCart();

  const categoryIcons: Record<string, React.ElementType> = {
    'microcontrollers': Cpu,
    'sensors': Wifi,
    'modules': Layers,
    'displays': Monitor,
    'motors-drivers': Cog,
    'power-battery': BatteryCharging
  };

  const featuredProducts = STORE_PRODUCTS.filter((p) => p.inStock).slice(0, 12);

  return (
    <div className="bg-slate-50 text-slate-800 pb-20">
      
      {/* 1. Store Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50/80 via-white to-slate-50 border-b border-slate-200 overflow-hidden py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
              <Cpu className="w-4 h-4 text-[#2563EB]" />
              <span>AWIE OFFICIAL ELECTRONICS & HARDWARE STORE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Genuine Microcontrollers, Sensors & <span className="text-[#2563EB]">Hardware Components</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
              Verified electronics components, development boards, sensors, and power modules for engineers, makers, and students.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#catalog"
                className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs transition-all shadow-lg shadow-[#2563EB]/25 flex items-center gap-2"
              >
                <span>Explore Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/contact?interest=B2B+Bulk+Hardware+Quote"
                className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#2563EB] text-slate-700 font-extrabold text-xs transition-all shadow-sm flex items-center gap-2"
              >
                <span>B2B Bulk Quote</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 max-w-sm w-full">
              <div className="w-full h-48 rounded-2xl bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
                <Image
                  src="/logo.jpeg"
                  alt="AWIE Electronics Store"
                  width={140}
                  height={140}
                  className="object-contain"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-[#2563EB] uppercase block">100% Genuine Tested</span>
                <h3 className="text-lg font-black text-slate-900">Lab Tested Microcontrollers & Modules</h3>
                <p className="text-xs text-slate-500 font-medium">All components undergo quality check before dispatch.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Store Features Row */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div className="flex items-center gap-3 p-2">
            <ShieldCheck className="w-6 h-6 text-[#2563EB] shrink-0" />
            <div>
              <span className="font-extrabold text-slate-900 block">Genuine Components</span>
              <span className="text-slate-500 font-medium">Tested & Verified Hardware</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <Truck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <span className="font-extrabold text-slate-900 block">Fast Shipping</span>
              <span className="text-slate-500 font-medium">Dispatched via Courier</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <Lock className="w-6 h-6 text-indigo-600 shrink-0" />
            <div>
              <span className="font-extrabold text-slate-900 block">Secure Checkout</span>
              <span className="text-slate-500 font-medium">UPI, Cards & Net Banking</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <Headphones className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <span className="font-extrabold text-slate-900 block">Engineering Support</span>
              <span className="text-slate-500 font-medium">Technical datasheets available</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 6 Categories Grid */}
      <section id="catalog" className="py-16 max-w-7xl mx-auto px-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Product Categories</h2>
          <p className="text-xs text-slate-500 font-medium">Select a category to browse specific hardware components</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORE_CATEGORIES.map((cat) => {
            const IconComp = categoryIcons[cat.slug] || Cpu;
            const categoryCount = STORE_PRODUCTS.filter(p => p.categorySlug === cat.slug).length;

            return (
              <Link
                key={cat.id}
                href={`/store/category/${cat.slug}`}
                className="group p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#2563EB] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full font-mono">
                    {categoryCount} Products
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#2563EB]">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Hardware Catalog */}
      <section className="py-12 max-w-7xl mx-auto px-6 space-y-8 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Featured Store Products</h2>
            <p className="text-xs text-slate-500 font-medium">Verified components ready for fast dispatch</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group rounded-2xl bg-white border border-slate-200 hover:border-[#2563EB] hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden"
            >
              
              {/* Product Image */}
              <Link href={`/store/product/${prod.slug}`} className="p-6 bg-slate-50 flex items-center justify-center h-48 relative overflow-hidden group-hover:bg-slate-100/80 transition-colors">
                <Image
                  src={prod.image}
                  alt={prod.name}
                  width={112}
                  height={112}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </Link>

              {/* Product Info */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block">{prod.sku} • {prod.categoryName}</span>
                  <Link href={`/store/product/${prod.slug}`}>
                    <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug">
                      {prod.name}
                    </h3>
                  </Link>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>In Stock</span>
                </div>

                {/* Price Display */}
                <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-base font-black text-slate-900">₹{prod.price.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500 font-medium block">Incl. GST</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => addToCart(prod)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#2563EB] text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-sm mt-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>

              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
