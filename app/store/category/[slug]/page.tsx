'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, SlidersHorizontal, ArrowLeft, Grid, CheckCircle2 } from 'lucide-react';
import { STORE_CATEGORIES, STORE_PRODUCTS, Product, StoreCategory } from '@/lib/storeData';
import { useCart } from '@/components/store/CartContext';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addToCart } = useCart();

  const category = STORE_CATEGORIES.find((c) => c.slug === slug) || {
    name: 'Hardware Store',
    slug: 'microcontrollers',
    description: 'Browse genuine electronics components, development boards, and hardware modules.',
    subCategories: ['All Subcategories']
  };

  const categoryProducts = STORE_PRODUCTS.filter((p) => p.categorySlug === slug);
  const highestPriceInCat = Math.max(...categoryProducts.map((p) => p.price), 0);
  const dynamicMaxPriceLimit = highestPriceInCat > 0 ? highestPriceInCat : 1500;

  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(dynamicMaxPriceLimit);

  const products = categoryProducts.filter((p) => {
    const matchesSub = selectedSubCategory === 'All' || p.subCategory === selectedSubCategory;
    const matchesPrice = p.price === 0 || p.price <= maxPrice;
    return matchesSub && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/store" className="hover:text-[#2563EB]">Home</Link>
          <span>→</span>
          <span className="text-slate-900 font-bold">{category.name}</span>
        </div>

        {/* Category Description Banner */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {category.name}
            </h1>
            <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {products.length} Items Listed
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl font-medium">
            {category.description}
          </p>

          {/* Subcategory Pill Badges */}
          {category.subCategories && category.subCategories.length > 0 && (
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2.5">
              <button
                onClick={() => setSelectedSubCategory('All')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  selectedSubCategory === 'All'
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All Subcategories
              </button>
              {category.subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    selectedSubCategory === sub
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'bg-blue-50 border border-blue-200 text-[#2563EB] hover:bg-blue-100'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-slate-500 whitespace-nowrap">Filter max price:</span>
            <input
              type="range"
              min={50}
              max={dynamicMaxPriceLimit}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#2563EB] cursor-pointer"
            />
            <span className="font-bold text-slate-900">Up to ₹{maxPrice.toLocaleString()}</span>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{products.length}</span> genuine components
          </div>
        </div>

        {/* Product Cards Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="group rounded-2xl bg-white border border-slate-200 hover:border-[#2563EB] hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden relative"
              >
                
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

                  {/* Stock Status */}
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In Stock</span>
                  </div>

                  {/* Price Breakdown — Hidden until store goes live */}
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
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">No components found matching your filter</h3>
            <button
              onClick={() => { setSelectedSubCategory('All'); setMaxPrice(dynamicMaxPriceLimit); }}
              className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
