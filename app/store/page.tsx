'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  ChevronRight,
  Star,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap,
  ArrowRight,
  Phone,
  HelpCircle,
  Layers,
  Cpu,
  Navigation,
  Printer,
  Radio,
  Cog,
  Monitor,
  Wifi,
  Wrench,
  Package,
  BatteryCharging,
  Grid,
  ListFilter
} from 'lucide-react';
import { STORE_CATEGORIES, STORE_PRODUCTS, Product, StoreCategory } from '@/lib/storeData';
import { useCart } from '@/components/store/CartContext';

export default function StorePage() {
  const { addToCart, setIsCartOpen, totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  // Filter products by tab and search
  const filteredProducts = STORE_PRODUCTS.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && prod.categorySlug === activeTab;
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Navigation': return <Navigation className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Printer': return <Printer className="w-6 h-6" />;
      case 'Radio': return <Radio className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Cog': return <Cog className="w-6 h-6" />;
      case 'Monitor': return <Monitor className="w-6 h-6" />;
      case 'Wifi': return <Wifi className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'Package': return <Package className="w-6 h-6" />;
      case 'BatteryCharging': return <BatteryCharging className="w-6 h-6" />;
      default: return <Cpu className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#2563EB] via-[#0066FF] to-[#0284C7] text-white py-2 px-4 text-xs font-semibold text-center flex items-center justify-center gap-3 shadow-md">
        <span>🔥 AWIE FREEDOM SALE IS LIVE | Up to 40% OFF on Development Boards, Sensors & Components</span>
        <button
          onClick={() => setIsCartOpen(true)}
          className="px-2.5 py-0.5 rounded-full bg-white text-[#2563EB] hover:bg-slate-100 font-extrabold text-[11px] transition-colors"
        >
          SHOP NOW →
        </button>
      </div>

      {/* 2. Secondary E-Commerce Store Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Category Selector */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <Link href="/store" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm">
                <Image src="/logo.jpeg" alt="AWIE Store" width={32} height={32} className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight text-slate-900 leading-none">AWIE STORE</span>
                <span className="text-[9px] font-bold text-[#2563EB] tracking-wider uppercase">ELECTRONICS & COMPONENTS</span>
              </div>
            </Link>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-300 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#2563EB]"
            >
              <option value="all">All Categories</option>
              {STORE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Raspberry Pi, ESP32, sensors, motors..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* User Quick Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end text-xs font-semibold text-slate-700">
            <a href="tel:18002666123" className="hidden lg:flex items-center gap-1.5 hover:text-[#2563EB]">
              <Phone className="w-4 h-4 text-[#2563EB]" />
              <span>Support</span>
            </a>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all shadow-md flex items-center gap-2 px-4 font-bold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-[#2563EB] text-[10px] font-black flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-12">
        
        {/* 3. Hero Promo Banner */}
        <div className="w-full">
          <div className="w-full rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#2563EB] p-8 sm:p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[320px]">
            <div className="absolute right-0 top-0 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-300 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL AWIE STORE LAUNCH</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-white">
                AWIE'S FREEDOM SALE IS <span className="text-[#38BDF8]">LIVE!</span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Up to <span className="text-amber-400 font-extrabold text-base">40% OFF</span> on Raspberry Pi boards, microcontrollers, sensor kits, and electronic components. Genuine parts with fast all-India delivery.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs transition-all shadow-lg shadow-[#2563EB]/40 flex items-center gap-2"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/products/gem-buddy"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all backdrop-blur-md"
                >
                  Pre-Book GEM Buddy →
                </Link>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
              <span>LIVE DATES: 15TH – 17TH AUGUST</span>
              <span className="font-bold text-emerald-400">✓ 100% Guaranteed Stock Staging</span>
            </div>
          </div>

        </div>

        {/* 4. Store Categories Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Categories</h2>
              <p className="text-xs text-slate-500">Explore components by engineering domain</p>
            </div>
            <Link href="/store/categories" className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-[#2563EB] text-xs font-bold text-slate-700 hover:text-[#2563EB] transition-all shadow-sm">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {STORE_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/store/category/${cat.slug}`}
                className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#2563EB] hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white w-fit shadow-md group-hover:scale-105 transition-transform">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] font-semibold text-slate-500 block">{cat.itemCount} Items</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 5. Featured Products Section */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Featured Products</h2>
              <p className="text-xs text-slate-500">Top-rated microcontrollers and component kits</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {[
                { label: 'All Products', value: 'all' },
                { label: 'Dev Boards', value: 'development-boards' },
                { label: 'IoT Modules', value: 'iot-wireless-modules' },
                { label: 'Sensors', value: 'sensors' }
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.value
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group rounded-2xl bg-white border border-slate-200 hover:border-[#2563EB] hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden relative"
              >
                
                {/* Discount Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-1 rounded-md bg-emerald-600 text-white text-[10px] font-black shadow-sm">
                    {prod.discountPercent}% OFF
                  </span>
                </div>

                {/* Stock Ribbon */}
                {!prod.inStock && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 border border-rose-200 text-rose-700 text-[10px] font-bold">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Image Container */}
                <Link href={`/store/product/${prod.slug}`} className="p-6 bg-slate-50 flex items-center justify-center h-48 relative overflow-hidden group-hover:bg-slate-100/80 transition-colors">
                  <div className="w-28 h-28 relative flex items-center justify-center">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      width={112}
                      height={112}
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Info Container */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 block">{prod.sku}</span>
                    <Link href={`/store/product/${prod.slug}`}>
                      <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug">
                        {prod.name}
                      </h3>
                    </Link>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{prod.rating}</span>
                    <span className="text-slate-400 text-[10px]">({prod.reviewCount})</span>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-0.5 pt-2 border-t border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-slate-900">₹{prod.price.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 line-through">₹{prod.originalPrice.toLocaleString()}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 block">
                      You save ({prod.discountPercent}%) ₹{(prod.originalPrice - prod.price).toLocaleString()} (Incl. GST)
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => addToCart(prod)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#2563EB] text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-sm mt-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{prod.inStock ? 'Add to Cart' : 'Pre-Book'}</span>
                  </button>

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
