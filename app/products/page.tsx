'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, CheckCircle2, Cpu, Battery, Wifi, Flame, Layers, Clock } from 'lucide-react';

export default function ProductsPage() {
  const gemBuddyFeatures = [
    { title: 'OLED Display', desc: 'High-contrast graphic face expressions' },
    { title: 'ESP32 Chipset', desc: '32-bit dual-core microcontroller core' },
    { title: 'Touch Interaction', desc: 'Capacitive touch sensors for mood feedback' },
    { title: 'LiPo Battery', desc: 'Rechargeable battery for portable placement' },
    { title: 'Wi-Fi & App Sync', desc: 'Seamless companion app configuration' },
    { title: 'Dynamic LED Moods', desc: 'Addressable RGB LED halo lighting' }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-[#06B6D4]">
            <span>AWIE HARDWARE PRODUCTS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
            AWIE <span className="text-[#3B82F6]">Products</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            In-house hardware engineering, embedded companion devices, and smart electronics kits built by AWIE.
          </p>
        </div>

        {/* Official GEM Launch Poster & Product Showcase */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-[#3B82F6]/40 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#2563EB]/20 border border-[#2563EB]/40 text-xs font-bold text-[#3B82F6]">
                <Sparkles className="w-4 h-4 text-[#06B6D4]" />
                <span>LAUNCHING SOON — OUR FIRST PRODUCT</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                GEM v1
              </h2>
              <p className="text-[#06B6D4] text-xl font-bold">
                Your Smart Buddy • Own-Made Hardware
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                WE ARE LAUNCHING OUR OWN-MADE PRODUCT! GEM v1 is an autonomous physical desk companion featuring hardware touch sensors, animated OLED eyes, Wi-Fi sync, dynamic LED mood lights, and custom low-latency firmware.
              </p>

              {/* Pre Booking Badge */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 to-slate-900 border border-[#3B82F6]/40 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#06B6D4]">
                  <Clock className="w-4 h-4" />
                  <span>PRE-BOOKING OPEN SOON</span>
                </div>
                <p className="text-xs text-slate-400">
                  Stay tuned. Stay excited! Registration for early-bird hardware pre-bookings will open shortly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {gemBuddyFeatures.map((f) => (
                  <div key={f.title} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-0.5">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4]" />
                      {f.title}
                    </span>
                    <p className="text-[11px] text-slate-400">{f.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/products/gem-buddy"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#2563EB] text-white font-semibold text-sm transition-all hover:bg-[#1D4ED8] shadow-lg shadow-[#2563EB]/30 hover:scale-[1.02] w-full sm:w-auto"
                >
                  <span>Explore GEM Buddy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-950 border border-slate-700 hover:border-[#06B6D4] text-white font-semibold text-sm transition-all hover:bg-slate-900 w-full sm:w-auto"
                >
                  <span>Notify Me</span>
                </Link>
              </div>
            </div>

            {/* Right Banner Showcase Card */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950 group hover:border-[#3B82F6] transition-all">
                <Image
                  src="/gem-banner.png"
                  alt="AWIE GEM v1 - Own-Made Product Launch Banner"
                  width={600}
                  height={1000}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </div>

        {/* Future Products Banner */}
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
          <Layers className="w-8 h-8 text-[#06B6D4] mx-auto opacity-80" />
          <h3 className="text-xl font-bold text-white">More AWIE products are in development.</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Our hardware engineers are actively working on custom sensor modules, IoT dev boards, and smart automation accessories.
          </p>
        </div>

      </div>
    </div>
  );
}
