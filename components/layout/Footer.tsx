'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Code2, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 py-16 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0284C7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 relative z-10">
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center p-1 shadow-sm">
              <Image
                src="/logo.jpeg"
                alt="AWIE Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-extrabold text-xl tracking-wide leading-none">
                <span className="text-slate-900">AWIE</span>
              </div>
              <span className="text-[10px] font-bold text-[#2563EB] tracking-wider mt-0.5 uppercase">
                INNOVATE • BUILD • CONNECT
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
            Building practical technology solutions across Apps, Web Applications, IoT Systems, and Custom Electronics. Engineered with precision.
          </p>

          <div className="flex items-center gap-3 pt-2 text-slate-600">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-slate-300 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors shadow-sm">
              <Code2 className="w-4 h-4" />
            </a>
            <a href="https://awie.in" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white border border-slate-300 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors shadow-sm">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-slate-900 text-sm font-bold tracking-wider uppercase mb-4">Navigation</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-[#2563EB] transition-colors">Home</Link></li>
            <li><Link href="/solutions" className="hover:text-[#2563EB] transition-colors">Custom Solutions</Link></li>
            <li><Link href="/products" className="hover:text-[#2563EB] transition-colors">AWIE Products</Link></li>
            <li><Link href="/products/gem-buddy" className="hover:text-[#2563EB] transition-colors text-xs text-[#2563EB] font-bold">↳ GEM Buddy</Link></li>
            <li><Link href="/store" className="hover:text-[#2563EB] transition-colors">Electronics Store</Link></li>
            <li><Link href="/projects" className="hover:text-[#2563EB] transition-colors">Projects & Proof</Link></li>
            <li><Link href="/students" className="hover:text-[#2563EB] transition-colors">Student Mentorship</Link></li>
          </ul>
        </div>

        {/* Client & Portals */}
        <div>
          <h3 className="text-slate-900 text-sm font-bold tracking-wider uppercase mb-4">Client Portal</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/login" className="hover:text-[#2563EB] transition-colors">Customer Login</Link></li>
            <li><Link href="/signup" className="hover:text-[#2563EB] transition-colors">Register Account</Link></li>
            <li><Link href="/dashboard" className="hover:text-[#2563EB] transition-colors">Project Dashboard</Link></li>
            <li><Link href="/contact" className="hover:text-[#2563EB] transition-colors">Start a Project</Link></li>
            <li><Link href="/admin" className="hover:text-[#2563EB] text-slate-400 text-xs transition-colors">Admin Access</Link></li>
          </ul>
        </div>

        {/* Legal & Policy */}
        <div>
          <h3 className="text-slate-900 text-sm font-bold tracking-wider uppercase mb-4">Legal & Support</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/privacy" className="hover:text-[#2563EB] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#2563EB] transition-colors">Terms of Service</Link></li>
            <li><Link href="/refund" className="hover:text-[#2563EB] transition-colors">Refund & Cancellation</Link></li>
            <li><Link href="/about" className="hover:text-[#2563EB] transition-colors">About AWIE</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} AWIE. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Domain target: awie.in</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Vercel Hosted</span>
        </p>
      </div>
    </footer>
  );
}
