'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4 text-xs text-slate-500">
          <div className="space-y-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/store-logo.png" alt="AWIE STORE Logo" width={120} height={35} className="h-7 w-auto object-contain" />
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              AWIE Store — Genuine Microcontrollers, Sensors & Hardware Components. Udyam Registered Micro Enterprise (UDYAM-MH-33-0820594).
            </p>
          </div>

          <div>
            <h5 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] mb-2.5">Legal Policies</h5>
            <ul className="space-y-1.5 font-medium">
              <li><Link href="/terms" className="hover:text-[#2563EB]">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-[#2563EB]">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-[#2563EB]">Refund & Cancellation</Link></li>
              <li><Link href="/shipping" className="hover:text-[#2563EB]">Shipping & Delivery</Link></li>
              <li><Link href="/store-terms" className="hover:text-[#2563EB]">AWIE Store Terms</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] mb-2.5">Services & Support</h5>
            <ul className="space-y-1.5 font-medium">
              <li><Link href="/services-terms" className="hover:text-[#2563EB]">Technology Services</Link></li>
              <li><Link href="/student-terms" className="hover:text-[#2563EB]">Student Projects</Link></li>
              <li><Link href="/repair-policy" className="hover:text-[#2563EB]">Product Service & Repair</Link></li>
              <li><Link href="/contact" className="hover:text-[#2563EB]">Contact Us</Link></li>
              <li><Link href="/grievance" className="hover:text-[#2563EB]">Grievance Redressal</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] mb-2.5">Contact AWIE</h5>
            <p className="text-[11px] text-slate-600 font-mono">awielabs@gmail.com</p>
            <p className="text-[11px] text-slate-500">Navi Mumbai, Maharashtra – 400706, India</p>
            <Link href="/" className="inline-block pt-1 font-bold text-[#2563EB] hover:underline">
              ← Return to AWIE Main Site
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} AWIE. All rights reserved.</p>
          <p>Udyam Registration: UDYAM-MH-33-0820594</p>
        </div>


      </div>
    </footer>
  );
}
