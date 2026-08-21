'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname?.startsWith('/store')) {
    return null;
  }

  // Show Login button ONLY on AWIE Products or AWIE Store pages
  const showLoginButton = pathname?.startsWith('/products') || pathname?.startsWith('/store');

  const navLinks = [
    { name: 'Students', href: '/students' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'AWIE Products', href: '/products', isPill: true },
    { name: 'AWIE Store', href: '/store', isPill: true }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-11 w-auto flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
            <Image
              src="/logobg.png"
              alt="AWIE Logo"
              width={160}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>

          <div className="flex flex-col justify-center border-l border-slate-200 pl-3">
            <span className="text-[10px] font-black text-[#2563EB] tracking-wider uppercase leading-none">
              INNOVATE • BUILD • CONNECT
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={
                link.isPill
                  ? "px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all shadow-sm flex items-center gap-1.5"
                  : "text-xs font-bold text-slate-700 hover:text-[#2563EB] transition-colors tracking-wide"
              }
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {showLoginButton && (
            <Link
              href="/login"
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold text-slate-800 transition-all flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Login</span>
            </Link>
          )}

          <Link
            href="/contact"
            className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md shadow-[#2563EB]/20 flex items-center gap-1.5"
          >
            <span>Start Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-700 hover:text-slate-900"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={
                  link.isPill
                    ? "px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm font-bold text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all inline-block w-fit"
                    : "text-sm font-bold text-slate-700 hover:text-[#2563EB] py-1 transition-colors"
                }
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            {showLoginButton && (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold text-center flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-[#2563EB]" />
                <span>Client Login</span>
              </Link>
            )}

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold text-center shadow-md shadow-[#2563EB]/20"
            >
              Start Project
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
