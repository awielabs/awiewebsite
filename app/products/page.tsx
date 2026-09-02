'use client';

import Link from 'next/link';
import { Layers, Zap, HeartPulse, CheckCircle2 } from 'lucide-react';

export default function ProductsPage() {
  const gemV1Features = [
    { title: 'OLED Display', desc: 'High-contrast graphic face expressions' },
    { title: 'Piezo Audio Buzzer', desc: 'Touch sound beeps & audio alerts' },
    { title: '4 White LED Bulbs', desc: 'Pure white crisp ambient illumination' },
    { title: '1000mAh Battery', desc: 'Rechargeable LiPo power via USB Type-C' },
    { title: 'GEM Mobile App', desc: 'Full Wi-Fi & Bluetooth app support' },
    { title: 'Touch Interaction', desc: 'Capacitive touch sensors for mood feedback' }
  ];

  const gemV2Features = [
    { title: 'Heart Rate PPG Sensor', desc: 'MAX30102 Optical Biometric Pulse Sensor' },
    { title: 'IR Proximity Sensor', desc: 'IR distance & motion monitoring' },
    { title: 'Piezo Audio Buzzer', desc: 'Pulse-synced audio chimes & alerts' },
    { title: '1500mAh Battery', desc: 'High capacity LiPo battery via Type-C' },
    { title: '4 White LED Bulbs', desc: 'Pulse-synced ambient lighting' },
    { title: 'Biometric Telemetry', desc: 'Real-time SpO2 & BPM App Sync' }
  ];

  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
            <span>AWIE HARDWARE PRODUCTS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            AWIE <span className="text-[#2563EB]">Products</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium max-w-2xl mx-auto">
            In-house hardware engineering, embedded companion devices, and smart electronics kits built by AWIE.
          </p>
        </div>

        {/* GEM Models Lineup Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: GEM v1 Standard */}
          <div className="p-8 rounded-3xl bg-slate-50 hover:bg-[#0B1528] border border-slate-200 hover:border-[#2563EB] shadow-xl hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-700 ease-out group relative overflow-hidden flex flex-col justify-between space-y-6">
            {/* Smooth Dark Gradient Overlay */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none rounded-3xl" />
            
            {/* Ambient Corner Glows */}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
            <div className="absolute -bottom-12 -left-12 w-60 h-60 bg-blue-600/15 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-bold text-[#2563EB] group-hover:bg-blue-950 group-hover:border-blue-700/60 group-hover:text-blue-300 transition-all duration-500 ease-out">
                  <Zap className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400 transition-colors duration-500" />
                  <span>STANDARD EDITION</span>
                </div>
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-400 transition-colors duration-500">PRE-BOOKING OPEN SOON</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900 group-hover:text-white tracking-tight transition-colors duration-500 inline-block animate-float hover:scale-105">GEM v1</h2>
                <p className="text-[#2563EB] group-hover:text-blue-400 text-sm font-bold transition-colors duration-500">Autonomous Desktop Companion • Audio Buzzer & GEM App</p>
                <p className="text-slate-600 group-hover:text-slate-300 text-xs leading-relaxed transition-colors duration-500">
                  Featuring 4 White LED ambient bulbs, piezo audio buzzer sound alerts, 1000mAh rechargeable LiPo battery, animated OLED eyes, capacitive touch reactions, and full GEM Mobile App synchronization.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {gemV1Features.map((f) => (
                  <div key={f.title} className="p-3 rounded-xl bg-white border border-slate-200 group-hover:bg-[#0F1B33]/80 group-hover:border-blue-900/60 space-y-0.5 shadow-sm transition-all duration-500">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-white flex items-center gap-1.5 transition-colors duration-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400 transition-colors duration-500 shrink-0" />
                      {f.title}
                    </span>
                    <p className="text-[11px] text-slate-500 group-hover:text-slate-400 font-medium transition-colors duration-500">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 group-hover:border-slate-800 transition-colors duration-500 flex items-center justify-between relative z-10">
              <Link
                href="/products/gem-buddy?version=v1"
                className="w-full relative group/btn overflow-hidden flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-[#2563EB]/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <span>Explore GEM v1 Details</span>
                <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
              </Link>
            </div>
          </div>

          {/* Card 2: GEM v2 Pro Health & Motion */}
          <div className="p-8 rounded-3xl bg-slate-50 hover:bg-[#0B1528] border border-slate-200 hover:border-[#2563EB] shadow-xl hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-700 ease-out group relative overflow-hidden flex flex-col justify-between space-y-6">
            {/* Smooth Dark Gradient Overlay */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none rounded-3xl" />
            
            {/* Ambient Corner Glows */}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
            <div className="absolute -bottom-12 -left-12 w-60 h-60 bg-blue-600/15 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-bold text-[#2563EB] group-hover:bg-blue-950 group-hover:border-blue-700/60 group-hover:text-blue-300 transition-all duration-500 ease-out">
                  <HeartPulse className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400 transition-colors duration-500" />
                  <span>PRO HEALTH & MOTION EDITION</span>
                </div>
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-400 transition-colors duration-500">PRE-BOOKING OPEN SOON</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900 group-hover:text-white tracking-tight transition-colors duration-500 inline-block animate-float-delayed-1 hover:scale-105">GEM v2 Pro</h2>
                <p className="text-[#2563EB] group-hover:text-blue-400 text-sm font-bold transition-colors duration-500">Biometric Telemetry, Audio Buzzer, IR Motion & 1500mAh</p>
                <p className="text-slate-600 group-hover:text-slate-300 text-xs leading-relaxed transition-colors duration-500">
                  Includes an integrated MAX30102 PPG optical pulse sensor, IR distance motion sensor, piezo audio buzzer sound feedback, 1500mAh LiPo battery, 4 White LED bulbs, and real-time pulse telemetry via the GEM Mobile App.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {gemV2Features.map((f) => (
                  <div key={f.title} className="p-3 rounded-xl bg-white border border-slate-200 group-hover:bg-[#0F1B33]/80 group-hover:border-blue-900/60 space-y-0.5 shadow-sm transition-all duration-500">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-white flex items-center gap-1.5 transition-colors duration-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400 transition-colors duration-500 shrink-0" />
                      {f.title}
                    </span>
                    <p className="text-[11px] text-slate-500 group-hover:text-slate-400 font-medium transition-colors duration-500">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 group-hover:border-slate-800 transition-colors duration-500 flex items-center justify-between relative z-10">
              <Link
                href="/products/gem-buddy?version=v2"
                className="w-full relative group/btn overflow-hidden flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-[#2563EB]/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <span>Explore GEM v2 Pro Details</span>
                <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Future Products Banner */}
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 shadow-sm">
          <Layers className="w-8 h-8 text-[#2563EB] mx-auto opacity-80" />
          <h3 className="text-xl font-extrabold text-slate-900">More AWIE products are in development.</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
            Our hardware engineers are actively working on custom sensor modules, IoT dev boards, and smart automation accessories.
          </p>
        </div>

      </div>
    </div>
  );
}
