'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, CheckCircle2, Layers, Clock, Radar, HeartPulse } from 'lucide-react';

export default function ProductsPage() {
  const gemV1Features = [
    { title: 'OLED Display', desc: 'High-contrast graphic face expressions' },
    { title: 'IR Proximity Sensor', desc: 'IR distance & motion monitoring' },
    { title: 'ESP32 Chipset', desc: '32-bit dual-core microcontroller core' },
    { title: 'Touch Interaction', desc: 'Capacitive touch sensors for mood feedback' },
    { title: 'LiPo Battery', desc: 'Rechargeable battery for portable placement' },
    { title: 'Wi-Fi & App Sync', desc: 'Seamless companion app configuration' }
  ];

  const gemV2Features = [
    { title: 'Heart Rate PPG Sensor', desc: 'MAX30102 Optical Biometric Pulse Sensor' },
    { title: 'IR Proximity Sensor', desc: 'IR distance & motion monitoring' },
    { title: 'Biometric Telemetry', desc: 'Real-time SpO2 & BPM App Sync' },
    { title: 'Pulse-Synced RGB LEDs', desc: 'Heartbeat animated LED mood lighting' },
    { title: 'OLED Display', desc: 'High-contrast graphic face expressions' },
    { title: 'Wi-Fi & App Sync', desc: 'Seamless companion app configuration' }
  ];

  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
            <span>AWIE HARDWARE PRODUCTS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900">
            AWIE <span className="text-[#2563EB]">Products</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed font-medium">
            In-house hardware engineering, embedded companion devices, and smart electronics kits built by AWIE.
          </p>
        </div>

        {/* GEM Models Lineup Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: GEM v1 Standard */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-bold text-[#2563EB]">
                  <Radar className="w-3.5 h-3.5" />
                  <span>STANDARD EDITION</span>
                </div>
                <span className="text-xs font-bold text-slate-500">PRE-BOOKING OPEN SOON</span>
              </div>

              <h2 className="text-3xl font-black text-slate-900">GEM v1</h2>
              <p className="text-[#2563EB] text-sm font-bold">Autonomous Desktop Companion with IR Motion Monitoring</p>
              <p className="text-slate-600 text-xs leading-relaxed">
                Featuring an IR distance proximity sensor, animated OLED eyes, capacitive touch reactions, and addressable RGB LED mood lighting.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {gemV1Features.map((f) => (
                  <div key={f.title} className="p-3 rounded-xl bg-white border border-slate-200 space-y-0.5 shadow-sm">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                      {f.title}
                    </span>
                    <p className="text-[11px] text-slate-500 font-medium">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <Link
                href="/products/gem-buddy?version=v1"
                className="w-full text-center py-3 rounded-xl bg-[#2563EB] text-white font-bold text-xs hover:bg-[#1D4ED8] transition-all shadow-md shadow-[#2563EB]/20"
              >
                Explore GEM v1 Details →
              </Link>
            </div>
          </div>

          {/* Card 2: GEM v2 Pro Biometric */}
          <div className="p-8 rounded-3xl bg-slate-900 text-slate-100 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-xs font-bold text-rose-400">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                  <span>PRO HEALTH EDITION</span>
                </div>
                <span className="text-xs font-bold text-rose-400">PRE-BOOKING OPEN SOON</span>
              </div>

              <h2 className="text-3xl font-black text-white">GEM v2 Pro</h2>
              <p className="text-rose-400 text-sm font-bold">Biometric Telemetry & Heart Rate Sensing Companion</p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Includes an integrated MAX30102 PPG optical pulse sensor for real-time heart rate (BPM) monitoring, biometric health telemetry, and heartbeat-synced RGB lighting.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {gemV2Features.map((f) => (
                  <div key={f.title} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5 shadow-sm">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
                      {f.title}
                    </span>
                    <p className="text-[11px] text-slate-400 font-medium">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <Link
                href="/products/gem-buddy?version=v2"
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs hover:from-red-700 hover:to-rose-700 transition-all shadow-md shadow-rose-600/30"
              >
                Explore GEM v2 Pro Details →
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
