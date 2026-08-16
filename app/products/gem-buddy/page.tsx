'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Cpu, 
  Tv, 
  Hand, 
  BatteryCharging, 
  Wifi, 
  Sun, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  ChevronLeft,
  Clock
} from 'lucide-react';

export default function GemBuddyPage() {
  const [activeMood, setActiveMood] = useState<'happy' | 'focused' | 'sleepy' | 'alert'>('happy');

  const moodColors = {
    happy: 'from-[#06B6D4] to-[#2563EB]',
    focused: 'from-[#3B82F6] to-[#6366F1]',
    sleepy: 'from-[#8B5CF6] to-[#1E293B]',
    alert: 'from-[#F59E0B] to-[#EF4444]'
  };

  const specs = [
    { label: 'Microcontroller', value: 'ESP32 Dual-Core 240MHz' },
    { label: 'Display', value: '0.96" Monochromatic OLED (128x64)' },
    { label: 'Connectivity', value: '2.4GHz Wi-Fi (802.11 b/g/n) & BLE' },
    { label: 'Interactivity', value: 'Capacitive Touch Top & Side Guard' },
    { label: 'Lighting', value: 'Addressable RGB Ambient Mood LEDs' },
    { label: 'Battery', value: '3.7V 1200mAh Rechargeable LiPo' },
    { label: 'Charging Interface', value: 'USB Type-C with Overcharge Guard' },
    { label: 'Firmware Support', value: 'OTA Updates via Companion App' }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Back Link */}
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to AWIE Products</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Product Display Preview */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-md p-10 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden text-center space-y-8">
              {/* Dynamic LED halo glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${moodColors[activeMood]} opacity-20 blur-3xl transition-all duration-500 pointer-events-none`} />

              <div className="w-48 h-48 mx-auto rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center relative shadow-2xl">
                {/* OLED Display Container */}
                <div className="w-32 h-24 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 relative overflow-hidden">
                  
                  {/* Eye Animations based on Mood */}
                  {activeMood === 'happy' && (
                    <div className="flex gap-6 items-center">
                      <div className="w-5 h-5 rounded-full bg-[#06B6D4] animate-pulse" />
                      <div className="w-5 h-5 rounded-full bg-[#06B6D4] animate-pulse" style={{ animationDelay: '0.15s' }} />
                    </div>
                  )}
                  {activeMood === 'focused' && (
                    <div className="flex gap-6 items-center">
                      <div className="w-6 h-2 bg-[#3B82F6] rounded-full" />
                      <div className="w-6 h-2 bg-[#3B82F6] rounded-full" />
                    </div>
                  )}
                  {activeMood === 'sleepy' && (
                    <div className="flex gap-6 items-center">
                      <div className="w-5 h-1 bg-[#8B5CF6] rounded-full" />
                      <div className="w-5 h-1 bg-[#8B5CF6] rounded-full" />
                    </div>
                  )}
                  {activeMood === 'alert' && (
                    <div className="flex gap-6 items-center">
                      <div className="w-5 h-5 rounded-full bg-[#F59E0B] animate-ping" />
                      <div className="w-5 h-5 rounded-full bg-[#F59E0B] animate-ping" />
                    </div>
                  )}

                  <span className="text-[9px] font-mono text-slate-500 uppercase mt-2 tracking-widest">{activeMood} state</span>
                </div>
              </div>

              {/* Mood Selector Buttons */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Interactive Mood Simulator</span>
                <div className="flex justify-center gap-2">
                  {(['happy', 'focused', 'sleepy', 'alert'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setActiveMood(m)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                        activeMood === m
                          ? 'bg-[#3B82F6] text-white shadow-md'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/20 border border-[#2563EB]/40 text-xs font-bold text-[#3B82F6]">
              <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>LAUNCHING SOON — PRE BOOKING OPEN SOON</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white">GEM v1</h1>
            <p className="text-[#06B6D4] text-lg font-semibold">Your Smart Buddy • Own-Made Hardware Product</p>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              Designed and built by AWIE, GEM v1 is an autonomous physical desk companion that responds to your touch, displays expressive face animations on an OLED screen, and syncs seamlessly with your phone or local network.
            </p>

            {/* Pre Booking Announcement */}
            <div className="p-4 rounded-xl bg-slate-900 border border-[#3B82F6]/40 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#06B6D4] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">WE ARE LAUNCHING OUR OWN-MADE PRODUCT</span>
                <span className="text-slate-400">Pre-booking open soon. Stay tuned. Stay excited!</span>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <Tv className="w-5 h-5 text-[#06B6D4] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">OLED Face</span>
                  <span className="text-[11px] text-slate-400">Animated expressive states</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <Cpu className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">ESP32 Core</span>
                  <span className="text-[11px] text-slate-400">32-bit micro-architecture</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <Hand className="w-5 h-5 text-[#06B6D4] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">Touch Sensors</span>
                  <span className="text-[11px] text-slate-400">Capacitive touch reactions</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <Sun className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">LED Moods</span>
                  <span className="text-[11px] text-slate-400">Ambient RGB halo lighting</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?interest=GEM+Buddy+PreBooking"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#2563EB] text-white font-semibold text-sm hover:bg-[#1D4ED8] transition-all shadow-lg shadow-[#2563EB]/30"
              >
                <span>Register for Pre-Booking Notification</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Launch Poster Graphic Section */}
        <div className="pt-8 border-t border-slate-800/80 max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-extrabold text-white">Official Launch Poster</h2>
          <div className="max-w-md mx-auto rounded-3xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
            <Image
              src="/gem-banner.png"
              alt="AWIE GEM v1 Official Banner"
              width={600}
              height={1000}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Technical Specifications Table */}
        <div className="space-y-6 pt-8 border-t border-slate-800/80">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Technical Specifications</h2>
            <p className="text-xs text-slate-400">Hardware and micro-architecture details for GEM Buddy v1.0</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specs.map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">{item.label}</span>
                <span className="text-white font-mono bg-slate-950 px-3 py-1 rounded border border-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
