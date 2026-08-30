'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at top of page
      if (currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down -> hide
        if (!isMobileMenuOpen) {
          setIsVisible(false);
        }
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> show
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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Brand Logo */}
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
        <div className="flex items-center gap-3">
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

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
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
