'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, ChevronDown, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '@/components/store/CartContext';
import { STORE_CATEGORIES } from '@/lib/storeData';
import { useAuthSession } from '@/lib/useAuthSession';

import StoreSearchBar from './StoreSearchBar';

export default function StoreHeader() {
  const { setIsCartOpen, totalItems } = useCart();
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthSession();
  const pathname = usePathname();

  // On the main store page "Home" goes to the site home screen;
  // from deeper store pages (category/product) "Home" returns to the Shop Catalog
  const isStoreRoot = pathname === '/store';
  const homeHref = isStoreRoot ? '/' : '/store';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        
        {/* Official AWIE STORE Logo */}
        <Link href="/store" className="flex items-center group shrink-0">
          <Image
            src="/store-logo.png"
            alt="AWIE STORE Logo"
            width={160}
            height={48}
            className="h-11 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link href={homeHref} prefetch={false} className="hover:text-[#2563EB] transition-colors">
            Home
          </Link>

          <Link href="/store" className="text-[#2563EB] font-bold relative py-1 border-b-2 border-[#2563EB]">
            Shop Catalog
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
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          
          {/* Search Box with Autocomplete Recommendations */}
          <div className="hidden sm:block w-48 lg:w-64">
            <StoreSearchBar />
          </div>

          {/* Account / User Profile */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full hover:bg-slate-100/90 transition-all border border-slate-200/90 bg-white shadow-sm group focus:outline-none cursor-pointer"
                aria-label="User profile menu"
                aria-expanded={isProfileOpen}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-[#2563EB] to-indigo-600 text-white font-bold text-xs shadow-inner ring-2 ring-blue-500/20 shrink-0">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name || 'User'}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                  )}
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-white" />
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight group-hover:text-[#2563EB] transition-colors truncate max-w-[110px]">
                    {user.name || 'Account'}
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight truncate max-w-[110px]">
                    {user.email}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-[#2563EB] to-indigo-600 text-white font-bold text-sm shrink-0 shadow-sm">
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.name || 'User'}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user.name || 'AWIE Member'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {user.email}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-blue-50 text-[#2563EB] border border-blue-100">
                        Unified Account
                      </span>
                    </div>
                  </div>

                  {/* Navigation Links inside Dropdown */}
                  <div className="py-1">
                    <Link
                      href="/store"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors"
                    >
                      <span>Store Catalog</span>
                    </Link>
                    <Link
                      href="/store/orders"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors"
                    >
                      <span>My Orders</span>
                    </Link>
                    <Link
                      href="/products"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors"
                    >
                      <span>AWIE Products</span>
                    </Link>
                  </div>

                  {/* Sign Out Button */}
                  <div className="pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition-all"
            >
              <User className="w-4 h-4 text-slate-700" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}

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
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-4 text-xs font-bold">
          {/* User profile card in mobile drawer */}
          {user && (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-[#2563EB] to-indigo-600 text-white font-bold text-xs shrink-0 shadow-inner">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name || 'User'}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{user.name || 'AWIE Member'}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile Search Bar with Live Recommendations */}
          <div className="w-full">
            <StoreSearchBar isMobile onCloseMobile={() => setIsMobileMenuOpen(false)} />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <Link href={homeHref} onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-slate-700 hover:text-[#2563EB]">Main Website Home</Link>
            <Link href="/store" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-[#2563EB]">AWIE Store Shop</Link>
            <Link href="/store/orders" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-slate-700 hover:text-[#2563EB]">My Store Orders</Link>
            <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-slate-700 hover:text-[#2563EB]">AWIE Products</Link>
            <Link href="/store/category/sensors" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-slate-700">Sensors</Link>
            <Link href="/store/category/modules" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-slate-700">Modules</Link>
            <Link href="/store/category/displays" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-slate-700">Displays</Link>
            <Link href="/store/category/motors-drivers" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-slate-700">Motors & Drivers</Link>
            <Link href="/store/category/power-battery" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-slate-700">Power & Battery</Link>
          </div>
        </div>
      )}
    </header>
  );
}
