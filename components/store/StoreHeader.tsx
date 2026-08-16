'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, ChevronDown, Menu, X } from 'lucide-react';
import { useCart } from '@/components/store/CartContext';
import { STORE_CATEGORIES } from '@/lib/storeData';

export default function StoreHeader() {
  const { setIsCartOpen, totalItems } = useCart();
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo matching Screenshot: AWIE with Orbital Blue Ring */}
        <Link href="/store" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center">
            <svg className="w-10 h-10 text-[#2563EB]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="50" rx="42" ry="24" stroke="currentColor" strokeWidth="6" transform="rotate(-25 50 50)" />
              <circle cx="50" cy="50" r="16" fill="#2563EB" />
            </svg>
          </div>
          <span className="font-black text-2xl tracking-tighter text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors">
            AWIE
          </span>
        </Link>

        {/* Center Nav Links matching Screenshot */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-[#2563EB] transition-colors">
            Home
          </Link>

          <Link href="/store" className="text-[#2563EB] font-bold relative py-1 border-b-2 border-[#2563EB]">
            Shop
          </Link>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowCategoriesDropdown(true)}
            onMouseLeave={() => setShowCategoriesDropdown(false)}
          >
            <button className="flex items-center gap-1 hover:text-[#2563EB] transition-colors py-1">
              <span>Categories</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {showCategoriesDropdown && (
              <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 grid grid-cols-1 gap-1">
                {STORE_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/store/category/${cat.slug}`}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#2563EB] transition-all"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/store/category/diy-maker-kits" className="hover:text-[#2563EB] transition-colors">
            Kits
          </Link>

          <Link href="/about" className="hover:text-[#2563EB] transition-colors">
            About Us
          </Link>

          <Link href="/contact" className="hover:text-[#2563EB] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Search & Actions matching Screenshot */}
        <div className="flex items-center gap-4">
          
          {/* Search Box */}
          <div className="relative hidden sm:block w-48 lg:w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-9 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#2563EB] transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          </div>

          {/* Cart Icon Button with Count Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition-all"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-slate-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#2563EB] text-white text-[9px] font-black flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </button>

          {/* User Profile Button */}
          <Link
            href="/login"
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 text-xs font-bold">
          <Link href="/" className="block py-2 text-slate-700 hover:text-[#2563EB]">Main Website Home</Link>
          <Link href="/store" className="block py-2 text-[#2563EB]">AWIE Store Shop</Link>
          <Link href="/store/category/development-boards" className="block py-2 text-slate-700">Development Boards</Link>
          <Link href="/store/category/sensors" className="block py-2 text-slate-700">Sensors & Modules</Link>
          <Link href="/store/category/diy-maker-kits" className="block py-2 text-slate-700">Kits</Link>
          <Link href="/about" className="block py-2 text-slate-700">About Us</Link>
          <Link href="/contact" className="block py-2 text-slate-700">Contact</Link>
        </div>
      )}
    </header>
  );
}
