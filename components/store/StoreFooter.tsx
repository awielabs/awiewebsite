'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, Lock, Headphones, Globe } from 'lucide-react';

export default function StoreFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Trust Badges Bar matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-3 rounded-full bg-blue-100 text-[#2563EB]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Quality Products</h4>
              <p className="text-[11px] text-slate-500">Tested & Reliable Components</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-3 rounded-full bg-blue-100 text-[#2563EB]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Fast Shipping</h4>
              <p className="text-[11px] text-slate-500">Pan India Express Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-3 rounded-full bg-blue-100 text-[#2563EB]">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Secure Payments</h4>
              <p className="text-[11px] text-slate-500">100% Encrypted Checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-3 rounded-full bg-blue-100 text-[#2563EB]">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Dedicated Support</h4>
              <p className="text-[11px] text-slate-500">awielabs@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#2563EB] text-sm">AWIE STORE</span>
            <span>— Electronics. Modules. Kits.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#2563EB]">Main Website</Link>
            <Link href="/privacy" className="hover:text-[#2563EB]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#2563EB]">Terms of Service</Link>
            <Link href="/refund" className="hover:text-[#2563EB]">Refund Policy</Link>
          </div>

          <p>© {new Date().getFullYear()} AWIE Store (awie.in)</p>
        </div>

      </div>
    </footer>
  );
}
