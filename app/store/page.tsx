'use client';

import Link from 'next/link';
import { ShoppingBag, Cpu, Layers, Sparkles, ArrowRight, Bell } from 'lucide-react';

export default function StorePage() {
  const upcomingCategories = [
    { name: 'AWIE Products', desc: 'Flagship companion hardware, smart desk devices, and custom accessories.' },
    { name: 'Development Kits', desc: 'Pre-assembled ESP32 and STM32 prototyping hardware platforms.' },
    { name: 'Electronic Modules', desc: 'Custom sensor breakout boards, motor drivers, and power regulators.' },
    { name: 'Components & Chips', desc: 'Curated microcontrollers, OLED displays, touch sensors, and ICs.' }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#06B6D4]">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>AWIE ELECTRONICS STORE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
            AWIE Store — <span className="text-[#3B82F6]">Coming Soon</span>
          </h1>

          <p className="text-slate-400 text-base leading-relaxed">
            We are preparing our direct hardware store catalog featuring AWIE products, development kits, sensor modules, and electronics components.
          </p>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto space-y-4">
            <span className="text-xs font-semibold text-white block">Get notified when store inventory goes live</span>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] flex-1"
              />
              <button
                type="button"
                className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Notify Me</span>
              </button>
            </div>
          </div>
        </div>

        {/* Store Categories Preview */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-white">Upcoming Store Catalog</h2>
            <p className="text-xs text-slate-400">Categories currently undergoing final inventory staging</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingCategories.map((cat) => (
              <div key={cat.name} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-[#06B6D4] w-fit">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">In Staging</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Solutions */}
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Need custom hardware or prototype components now?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Our custom electronics engineering team can assist with component selection and prototype design directly.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8] transition-all"
            >
              <span>Contact Engineering Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
