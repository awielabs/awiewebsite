'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Code2, Globe } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/store')) {
    return null;
  }
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 py-16 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0284C7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white border border-slate-200/90 flex items-center justify-center p-1.5 shadow-md">
              <Image
                src="/logo.jpeg"
                alt="AWIE Logo"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-black text-2xl tracking-tight text-[#0F172A] leading-tight">
                AWIE
              </span>
              <span className="text-[10px] font-extrabold text-[#2563EB] tracking-wider uppercase">
                Technology • Software • IoT • Electronics
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
            AWIE is a proprietary enterprise operating as a technology and electronics business, registered under the Udyam Registration framework as a Micro Enterprise.
          </p>

          <div className="text-xs text-slate-600 space-y-1 font-mono bg-white p-3 rounded-xl border border-slate-200 shadow-xs max-w-sm">
            <p className="font-bold text-slate-900">Udyam No: UDYAM-MH-33-0820594</p>
            <p>Email: awielabs@gmail.com</p>
            <p className="text-[11px] text-slate-500 font-sans mt-1">
              Registered Location: AWIE, Nerul, Navi Mumbai, Maharashtra – 400706, India
            </p>

          </div>

          <div className="flex items-center gap-3 pt-1 text-slate-600">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-slate-300 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors shadow-xs">
              <Code2 className="w-4 h-4" />
            </a>
            <a href="https://awie.in" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-slate-300 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors shadow-xs">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="text-slate-900 text-xs font-black tracking-wider uppercase mb-3">Explore</h3>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/" className="hover:text-[#2563EB] transition-colors">Technology Development</Link></li>
            <li><Link href="/students" className="hover:text-[#2563EB] transition-colors">Student Projects</Link></li>
            <li><Link href="/products" className="hover:text-[#2563EB] transition-colors">AWIE Products</Link></li>
            <li><Link href="/store" className="hover:text-[#2563EB] transition-colors">AWIE Store</Link></li>
            <li><Link href="/about" className="hover:text-[#2563EB] transition-colors">About AWIE</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-slate-900 text-xs font-black tracking-wider uppercase mb-3">Legal</h3>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/terms" className="hover:text-[#2563EB] transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-[#2563EB] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/refund" className="hover:text-[#2563EB] transition-colors">Refund & Cancellation</Link></li>
            <li><Link href="/shipping" className="hover:text-[#2563EB] transition-colors">Shipping & Delivery</Link></li>
            <li><Link href="/services-terms" className="hover:text-[#2563EB] transition-colors">Technology Services</Link></li>
            <li><Link href="/student-terms" className="hover:text-[#2563EB] transition-colors">Student Projects</Link></li>
            <li><Link href="/repair-policy" className="hover:text-[#2563EB] transition-colors">Product Service & Repair</Link></li>
            <li><Link href="/store-terms" className="hover:text-[#2563EB] transition-colors">AWIE Store Terms</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-slate-900 text-xs font-black tracking-wider uppercase mb-3">Support</h3>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/contact" className="hover:text-[#2563EB] transition-colors">Contact Us</Link></li>
            <li><Link href="/grievance" className="hover:text-[#2563EB] transition-colors">Grievance Redressal</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 AWIE. Udyam Registered Micro Enterprise (UDYAM-MH-33-0820594). All rights reserved.</p>
      </div>
    </footer>
  );
}

