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
import StoreScrollBackground from '@/components/ui/StoreScrollBackground';

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

  const featuredProducts = STORE_PRODUCTS.filter((p) => p.inStock).slice(0, 10);

  // Helper to render words intact while allowing letter-by-letter hover pop effect
  const renderInteractiveText = (text: string, isHighlighted: boolean = false, prefixKey: string = '') => {
    return text.split(' ').map((word, wIdx) => (
      <span key={`${prefixKey}-w-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.35em] my-[0.1em] align-bottom">
        {word.split('').map((char, cIdx) => (
          <span
            key={`${prefixKey}-c-${wIdx}-${cIdx}`}
            className={`inline-block transition-all duration-300 ease-out cursor-default select-none hover:-translate-y-1 hover:scale-110 ${
              isHighlighted
                ? 'text-[#2563EB] hover:text-slate-900 hover:drop-shadow-[0_6px_14px_rgba(15,23,42,0.5)]'
                : 'text-slate-900 hover:text-[#2563EB] hover:drop-shadow-[0_6px_14px_rgba(37,99,235,0.7)]'
            }`}
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };


  return (
    <div className="bg-slate-50 text-slate-800 pb-20">

      {/* 1. Store Hero Section (Light Studio Background with 100% Full Video Frames) */}
      <section className="relative z-10 border-b border-slate-200 pt-12 sm:pt-16 lg:pt-20 pb-32 min-h-[550px] sm:min-h-[640px] flex items-start overflow-hidden bg-white">

        {/* Video Frames Interactive Scroll Background (Hero Section Only) */}
        <StoreScrollBackground />

        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full flex justify-end relative z-10">
          
          {/* Right-Aligned Content (Shifted Upwards into Clear White Space) */}
          <div className="max-w-md sm:max-w-lg lg:max-w-xl space-y-5 text-right flex flex-col items-end -mt-2 sm:-mt-4 lg:-mt-6">

            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-200 text-xs font-black text-[#2563EB] shadow-md shadow-blue-900/5 hover:-translate-y-1 hover:bg-[#2563EB] hover:text-white transition-all duration-300">
              <Cpu className="w-4 h-4" />
              <span>AWIE OFFICIAL ELECTRONICS & HARDWARE STORE</span>
            </div>

            {/* Interactive Main Heading with Clean Line Spacing & Hover Color Effects */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black tracking-tight leading-[1.3] text-slate-900">
              {renderInteractiveText('Genuine Microcontrollers, Sensors &', false, 'heading-part1')}
              <br className="hidden sm:inline" />
              {renderInteractiveText('Hardware Components', true, 'heading-part2')}
            </h1>

            {/* Go Live Soon Banner */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-md border border-[#2563EB]/40 text-xs font-extrabold text-white shadow-lg shadow-[#2563EB]/10">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping shrink-0" />
              <span>Products will go live soon — Stay tuned!</span>
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
              <span className="text-slate-500 font-medium">Hardware Components & Modules</span>
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
              <span className="font-extrabold text-slate-900 block">Pre-Book & Enquiry</span>
              <span className="text-slate-500 font-medium">Order via WhatsApp & Email</span>
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
            const categoryImages: Record<string, string> = {
              'microcontrollers': '/categories/microcontrollers.png',
              'sensors': '/categories/sensors.png',
              'modules': '/categories/modules.png',
              'displays': '/categories/displays.png',
              'motors-drivers': '/categories/motors-drivers.png',
              'power-battery': '/categories/power-battery.png',
            };
            const catImage = categoryImages[cat.slug];

            return (
              <Link
                key={cat.id}
                href={`/store/category/${cat.slug}`}
                className="group relative p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-700 hover:bg-slate-900 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 overflow-visible"
              >
                {/* Floating Category Image — pops out of card container on hover */}
                {catImage && (
                  <div className="absolute -right-3 -bottom-3 pointer-events-none opacity-0 group-hover:opacity-100 translate-y-4 group-hover:-translate-y-2 scale-90 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out z-20">
                    <img
                      src={catImage}
                      alt={cat.name}
                      className="h-[140px] sm:h-[155px] w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
                      style={{ animation: 'float 3s ease-in-out infinite' }}
                    />
                  </div>
                )}


                {/* Icon & Count Row */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-transparent transition-all duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-300 bg-slate-100 group-hover:bg-slate-700 px-2.5 py-1 rounded-full font-mono transition-colors duration-300">
                    {categoryCount} Products
                  </span>
                </div>

                {/* Text */}
                <div className="space-y-1 relative z-10">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-white transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 group-hover:text-slate-400 font-medium line-clamp-2 leading-relaxed transition-colors duration-300">
                    {cat.description}
                  </p>
                </div>

                {/* CTA Arrow */}
                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#2563EB] group-hover:text-blue-400 relative z-10">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
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
                  <span>Genuine Component</span>
                </div>

                {/* Price — Hidden until store goes live */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">Price on Request</span>
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
