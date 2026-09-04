'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown, LogOut, User, Package, ShoppingBag } from 'lucide-react';
import { useAuthSession } from '@/lib/useAuthSession';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthSession();

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

  // Scroll show/hide listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        if (!isMobileMenuOpen) {
          setIsVisible(false);
        }
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  if (pathname?.startsWith('/store')) {
    return null;
  }



  const navLinks = [
    { name: 'Students', href: '/students' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'AWIE Products', href: '/products', isPill: true },
    { name: 'AWIE Store', href: '/store', isPill: true }
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const isContactPage = pathname === '/contact' || pathname?.startsWith('/contact/');
  const isProductsPage = pathname === '/products' || pathname?.startsWith('/products/');
  const isHomePage = pathname === '/';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isHomePage
          ? (isMobileMenuOpen ? 'bg-white' : 'bg-transparent')
          : 'bg-white/80 backdrop-blur-md'
      } ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Brand Logo (hidden on home page) */}
        {!isHomePage ? (
          <Link href="/" className="flex items-center h-full group py-1">
            <Image
              src="/logobg.png"
              alt="AWIE Logo"
              width={240}
              height={80}
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-opacity group-hover:opacity-85"
              priority
            />
          </Link>
        ) : (
          <div className="hidden lg:block w-32" aria-hidden="true" />
        )}

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-3">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);

            if (link.isPill) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={
                    active
                      ? "px-3.5 py-1.5 rounded-full bg-[#2563EB] text-white border border-[#2563EB] text-xs font-black shadow-md shadow-[#2563EB]/25 transition-all flex items-center gap-1.5"
                      : "px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all shadow-sm flex items-center gap-1.5"
                  }
                >
                  {link.name}
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={
                  active
                    ? "px-3.5 py-1.5 rounded-full bg-[#2563EB] text-white text-xs font-black shadow-md shadow-[#2563EB]/25 transition-all"
                    : "px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-[#2563EB] hover:bg-slate-100 transition-all tracking-wide"
                }
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full hover:bg-slate-100/90 transition-all border border-slate-200/90 bg-white/95 shadow-sm group focus:outline-none"
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
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight group-hover:text-[#2563EB] transition-colors truncate max-w-[120px]">
                    {user.name || 'Account'}
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight truncate max-w-[120px]">
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
                        Active Account
                      </span>
                    </div>
                  </div>

                  {/* Navigation Links inside Dropdown */}
                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#2563EB] transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>User Profile &amp; Delivery Details</span>
                    </Link>
                    <Link
                      href="/products"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors"
                    >
                      <Package className="w-3.5 h-3.5 text-slate-400" />
                      <span>AWIE Products</span>
                    </Link>
                    <Link
                      href="/store"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                      <span>AWIE Store</span>
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
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            isProductsPage && (
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#2563EB] hover:bg-slate-100 transition-all"
              >
                Log In
              </Link>
            )
          )}

          <Link
            href="/contact"
            tabIndex={isContactPage ? -1 : undefined}
            aria-hidden={isContactPage ? 'true' : undefined}
            className={`px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md shadow-[#2563EB]/20 flex items-center gap-1.5 ${
              isContactPage ? 'invisible pointer-events-none' : ''
            }`}
          >
            <span>Start Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-700 hover:text-slate-900 ${
            isHomePage ? 'ml-auto' : ''
          }`}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4">
          {user && (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between gap-3">
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
                  className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              <Link
                href="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#2563EB] hover:bg-blue-50 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>User Profile &amp; Delivery Details</span>
              </Link>
            </div>
          )}

          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={
                    active
                      ? "px-4 py-2 rounded-xl bg-[#2563EB] text-white text-sm font-bold shadow-md shadow-[#2563EB]/25 inline-block w-fit"
                      : link.isPill
                      ? "px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm font-bold text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all inline-block w-fit"
                      : "px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 transition-colors inline-block w-fit"
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {!isContactPage && (
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold text-center shadow-md shadow-[#2563EB]/20"
              >
                Start Project
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
