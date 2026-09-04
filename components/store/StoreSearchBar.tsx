'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Sparkles, Tag, Layers, CheckCircle2, ShoppingBag } from 'lucide-react';
import { STORE_PRODUCTS, STORE_CATEGORIES, Product, StoreCategory } from '@/lib/storeData';

interface StoreSearchBarProps {
  className?: string;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

const TRENDING_KEYWORDS = [
  'ESP32',
  'OLED Display',
  'SG90 Servo',
  'Li-Po Battery',
  'L298N Driver',
  'DHT11 Sensor',
  'TP4056 Charger',
  'Buck Converter'
];

export default function StoreSearchBar({ className = '', isMobile = false, onCloseMobile }: StoreSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut: Ctrl+K or Cmd+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter matching categories and products
  const matchingCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return STORE_CATEGORIES.filter((cat) =>
      cat.name.toLowerCase().includes(q) ||
      cat.subCategories.some((sub) => sub.toLowerCase().includes(q))
    ).slice(0, 3);
  }, [query]);

  const matchingProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return STORE_PRODUCTS.filter((product) => {
      return (
        product.name.toLowerCase().includes(q) ||
        product.slug.toLowerCase().includes(q) ||
        product.categoryName.toLowerCase().includes(q) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(q)) ||
        product.sku.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q)
      );
    }).slice(0, 7);
  }, [query]);

  // Total navigable items (categories + products)
  const totalItems = matchingCategories.length + matchingProducts.length;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0) {
        if (selectedIndex < matchingCategories.length) {
          const cat = matchingCategories[selectedIndex];
          router.push(`/store/category/${cat.slug}`);
          setIsOpen(false);
          onCloseMobile?.();
        } else {
          const prodIndex = selectedIndex - matchingCategories.length;
          const prod = matchingProducts[prodIndex];
          if (prod) {
            router.push(`/store/product/${prod.slug}`);
            setIsOpen(false);
            onCloseMobile?.();
          }
        }
      } else if (matchingProducts.length > 0) {
        router.push(`/store/product/${matchingProducts[0].slug}`);
        setIsOpen(false);
        onCloseMobile?.();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectProduct = (slug: string) => {
    setIsOpen(false);
    onCloseMobile?.();
    router.push(`/store/product/${slug}`);
  };

  const handleSelectCategory = (slug: string) => {
    setIsOpen(false);
    onCloseMobile?.();
    router.push(`/store/category/${slug}`);
  };

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
    inputRef.current?.focus();
    setIsOpen(true);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={isMobile ? "Search all store products..." : "Search components..."}
          className={`w-full pl-9 pr-9 py-2.5 rounded-full bg-slate-100 hover:bg-slate-100/90 focus:bg-white border border-slate-200 focus:border-[#2563EB] text-xs text-slate-900 placeholder-slate-400 font-medium transition-all shadow-inner focus:shadow-md focus:shadow-[#2563EB]/10 outline-none`}
        />
        
        {/* Search Icon */}
        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Autocomplete Recommendation Dropdown */}
      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-2 z-50 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-2xl shadow-blue-950/15 overflow-hidden transition-all duration-200 animate-in fade-in-0 zoom-in-95 ${
          isMobile ? 'w-full max-h-[75vh] overflow-y-auto' : 'w-[380px] lg:w-[460px] max-h-[480px] overflow-y-auto'
        }`}>
          
          {/* 1. Empty Query State: Show Trending Searches */}
          {!query.trim() && (
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Trending & Popular Searches</span>
              </div>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {TRENDING_KEYWORDS.map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    onClick={() => handleKeywordClick(keyword)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 text-xs font-bold text-slate-700 hover:text-[#2563EB] transition-all"
                  >
                    <Search className="w-3 h-3 text-slate-400" />
                    <span>{keyword}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Browse Categories</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {STORE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.slug)}
                      className="flex items-center justify-between p-2 rounded-xl text-left bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all text-xs font-semibold text-slate-700 hover:text-[#2563EB]"
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 ml-1">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Active Query Results */}
          {query.trim() && (
            <div className="p-2 space-y-2">
              
              {/* Matching Categories Header Pills */}
              {matchingCategories.length > 0 && (
                <div className="p-2 space-y-1.5 border-b border-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-1">
                    Matching Categories
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matchingCategories.map((cat, idx) => {
                      const isSelected = selectedIndex === idx;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleSelectCategory(cat.slug)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25'
                              : 'bg-blue-50/80 hover:bg-blue-100 border border-blue-200 text-[#2563EB]'
                          }`}
                        >
                          <Tag className="w-3 h-3" />
                          <span>{cat.name}</span>
                          <span className="text-[10px] opacity-75">({cat.itemCount} items)</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Matching Products List */}
              {matchingProducts.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between px-2 pt-1 pb-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Product Matches ({matchingProducts.length})
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Press ↵ to open
                    </span>
                  </div>

                  {matchingProducts.map((prod, idx) => {
                    const itemIndex = matchingCategories.length + idx;
                    const isSelected = selectedIndex === itemIndex;

                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => handleSelectProduct(prod.slug)}
                        className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl text-left transition-all ${
                          isSelected
                            ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25'
                            : 'hover:bg-slate-100/90 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Image Thumbnail */}
                          <div className={`w-10 h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-1 border ${
                            isSelected ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-slate-200'
                          }`}>
                            <Image
                              src={prod.image.startsWith('http') || prod.image.startsWith('/store') ? prod.image : `/store/products/${prod.image}`}
                              alt={prod.name}
                              width={36}
                              height={36}
                              className="object-contain w-full h-full"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/store/display.svg';
                              }}
                            />
                          </div>

                          {/* Product Info */}
                          <div className="min-w-0">
                            <h4 className={`text-xs font-bold truncate leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                              {prod.name}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] mt-0.5">
                              <span className={`font-semibold ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                                {prod.categoryName}
                              </span>
                              {prod.inStock && (
                                <span className={`inline-flex items-center gap-0.5 font-bold ${
                                  isSelected ? 'text-emerald-200' : 'text-emerald-600'
                                }`}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                  In Stock
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="text-right shrink-0">
                          <span className={`text-xs font-extrabold block ${
                            isSelected ? 'text-white' : 'text-[#2563EB]'
                          }`}>
                            {prod.price > 0 ? `₹${prod.price}` : 'Price TBD'}
                          </span>
                          <span className={`text-[10px] font-semibold flex items-center justify-end gap-1 ${
                            isSelected ? 'text-blue-100' : 'text-slate-400'
                          }`}>
                            View <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* No Results Found State */}
              {matchingCategories.length === 0 && matchingProducts.length === 0 && (
                <div className="p-6 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center mx-auto">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      No matching components for &ldquo;{query}&rdquo;
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">
                      Try searching by keyword like <span className="text-[#2563EB] font-bold">OLED</span>, <span className="text-[#2563EB] font-bold">ESP32</span>, <span className="text-[#2563EB] font-bold">Servo</span>, <span className="text-[#2563EB] font-bold">Sensor</span>, or <span className="text-[#2563EB] font-bold">Driver</span>.
                    </p>
                  </div>

                  {/* Product Request CTA */}
                  {query.trim().length >= 3 && (
                    <Link
                      href={`/contact?interest=${encodeURIComponent('Product Request')}&product=${encodeURIComponent(query.trim())}`}
                      onClick={() => {
                        setIsOpen(false);
                        onCloseMobile?.();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-bold shadow-md shadow-[#2563EB]/25 hover:scale-[1.02] transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Looking for &ldquo;{query.trim()}&rdquo;? Request this product</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  {/* Quick Suggestions */}
                  <div className="pt-2 flex flex-wrap justify-center gap-1.5">
                    {['ESP32', 'OLED', 'Servo', 'Sensor'].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleKeywordClick(term)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-[11px] font-bold text-slate-700 hover:text-[#2563EB] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* View all in Shop footer */}
              {matchingProducts.length > 0 && (
                <div className="p-2 border-t border-slate-100">
                  <Link
                    href="/store"
                    onClick={() => {
                      setIsOpen(false);
                      onCloseMobile?.();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-xs font-bold text-[#2563EB] transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Browse Full Store Catalogue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

            </div>
          )}

        </div>
      )}
    </div>
  );
}
