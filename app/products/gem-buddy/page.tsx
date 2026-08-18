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
  Clock,
  HeartPulse,
  Activity,
  Radar,
  XCircle,
  Check,
  Smartphone,
  Zap
} from 'lucide-react';

export default function GemBuddyPage() {
  const [selectedVersion, setSelectedVersion] = useState<'v1' | 'v2'>('v1');
  const [activeMood, setActiveMood] = useState<'happy' | 'focused' | 'sleepy' | 'alert'>('happy');

  const specsV1 = [
    { label: 'Model', value: 'GEM v1 Standard Companion' },
    { label: 'Microcontroller', value: 'ESP32 Dual-Core 240MHz' },
    { label: 'Display', value: '0.96" Monochromatic OLED (128x64)' },
    { label: 'Ambient Lighting', value: '4 White LED Bulbs (Pure White)' },
    { label: 'Motion Detection', value: 'Not Included (Available in v2)' },
    { label: 'Heart Rate Monitoring', value: 'Not Included (Available in v2)' },
    { label: 'Touch Interactivity', value: 'Capacitive Touch Top Guard' },
    { label: 'App Support', value: 'Full GEM Mobile App (Wi-Fi + BLE)' },
    { label: 'Battery & Power', value: '1000mAh LiPo Battery via Type-C' }
  ];

  const specsV2 = [
    { label: 'Model', value: 'GEM v2 Pro Biometric Edition' },
    { label: 'Microcontroller', value: 'ESP32 Dual-Core 240MHz' },
    { label: 'Display', value: '0.96" Monochromatic OLED (128x64)' },
    { label: 'Ambient Lighting', value: '4 White LED Bulbs (Pulse Synced)' },
    { label: 'Motion Detection', value: 'IR Proximity & Distance Sensor' },
    { label: 'Heart Rate & Pulse', value: 'MAX30102 PPG Optical Biometric Sensor' },
    { label: 'Touch Interactivity', value: 'Capacitive Touch Top Guard' },
    { label: 'App Support', value: 'Full GEM Mobile App Telemetry (Wi-Fi + BLE)' },
    { label: 'Battery & Power', value: '1500mAh LiPo Battery via Type-C' }
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

        {/* Top Version Toggle Banner */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/40 text-xs font-bold text-[#3B82F6]">
              <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>AWIE OWN-MADE PRODUCT LINEUP</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Choose Your GEM Edition</h1>
            <p className="text-xs text-slate-400">Available in GEM v1 (Standard 1000mAh) and GEM v2 (Pro Health & Motion 1500mAh)</p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setSelectedVersion('v1')}
              className={`px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedVersion === 'v1'
                  ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>GEM v1 (Standard 1000mAh)</span>
            </button>

            <button
              onClick={() => setSelectedVersion('v2')}
              className={`px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedVersion === 'v2'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              <span>GEM v2 Pro (Biometric 1500mAh)</span>
            </button>
          </div>
        </div>

        {/* Main Product Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Simulator Card */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden text-center space-y-8">
              
              {/* Crisp 4 White LED ambient halo glow */}
              <div className="absolute inset-0 bg-white/10 blur-3xl pointer-events-none" />

              {/* Product Body Sphere */}
              <div className="w-48 h-48 mx-auto rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center relative shadow-2xl">
                
                {/* 4 White LED Bulbs Indicator Ring */}
                <div className="absolute inset-2 rounded-full border border-white/20 flex items-center justify-between p-2 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                </div>

                {/* OLED Display Container */}
                <div className="w-32 h-24 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 relative overflow-hidden">
                  
                  {/* Eye Animations */}
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

              {/* Version Specific Sensor Badge */}
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-center gap-2 text-xs font-semibold">
                {selectedVersion === 'v1' ? (
                  <>
                    <Zap className="w-4 h-4 text-[#06B6D4]" />
                    <span className="text-slate-300">1000mAh Battery • 4 White LED Bulbs • GEM App</span>
                  </>
                ) : (
                  <>
                    <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" />
                    <span className="text-rose-400 font-bold">1500mAh Battery • MAX30102 Heart Sensor & IR Motion</span>
                  </>
                )}
              </div>

              {/* Mood Buttons */}
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

          {/* Right Product Info */}
          <div className="lg:col-span-6 space-y-6">
            
            {selectedVersion === 'v1' ? (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/20 border border-[#2563EB]/40 text-xs font-bold text-[#3B82F6]">
                  <span>PRE-BOOKING OPEN SOON</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white">GEM v1 (Standard)</h1>
                <p className="text-[#06B6D4] text-lg font-semibold">Autonomous Desktop Companion • 1000mAh Battery & GEM App</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  GEM v1 is equipped with 4 crisp White LED bulbs, 1000mAh rechargeable LiPo battery power, capacitive touch sensors, animated OLED eyes, and full GEM Mobile App synchronization.
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-xs font-bold text-rose-400">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                  <span>PRE-BOOKING OPEN SOON — PRO HEALTH & MOTION EDITION</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white">GEM v2 Pro (Biometric)</h1>
                <p className="text-rose-400 text-lg font-semibold">Pulse Oximeter, IR Motion Sensor & 1500mAh Battery</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  GEM v2 Pro features the MAX30102 optical PPG pulse sensor for real-time heart rate monitoring, an IR distance motion sensor, 1500mAh LiPo battery, 4 White LED bulbs, and biometric telemetry on the GEM Mobile App.
                </p>
              </>
            )}

            {/* Launch Banner Box */}
            <div className="p-4 rounded-xl bg-slate-900 border border-[#3B82F6]/40 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#06B6D4] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">WE ARE LAUNCHING OUR OWN-MADE PRODUCT</span>
                <span className="text-slate-400">Pre-booking for GEM {selectedVersion === 'v1' ? 'v1' : 'v2 Pro'} will open shortly. Stay tuned!</span>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <Sun className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">4 White LED Bulbs</span>
                  <span className="text-[11px] text-slate-400">Pure white crisp ambient light</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <BatteryCharging className="w-5 h-5 text-[#06B6D4] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">Rechargeable LiPo Battery</span>
                  <span className="text-[11px] text-slate-400">{selectedVersion === 'v1' ? '1000mAh Type-C Power' : '1500mAh Type-C Power'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <Smartphone className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">GEM Mobile App</span>
                  <span className="text-[11px] text-slate-400">Wi-Fi & Bluetooth sync</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <HeartPulse className={`w-5 h-5 shrink-0 mt-0.5 ${selectedVersion === 'v2' ? 'text-rose-500 animate-pulse' : 'text-slate-600'}`} />
                <div>
                  <span className="text-xs font-bold text-white block">Pulse & Motion Sensors</span>
                  <span className="text-[11px] text-slate-400">{selectedVersion === 'v2' ? 'MAX30102 Heart Rate + IR Motion' : 'Available in GEM v2 Pro'}</span>
                </div>
              </div>
            </div>

            {/* Action Pre-booking Button */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/contact?interest=GEM+${selectedVersion === 'v1' ? 'v1+Standard' : 'v2+Pro'}+PreBooking`}
                className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-sm transition-all shadow-lg ${
                  selectedVersion === 'v1'
                    ? 'bg-[#2563EB] hover:bg-[#1D4ED8] shadow-[#2563EB]/30'
                    : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-rose-600/30'
                }`}
              >
                <span>Register for GEM {selectedVersion === 'v1' ? 'v1' : 'v2 Pro'} Pre-Booking</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

        {/* Feature Comparison Matrix Section */}
        <div className="pt-12 border-t border-slate-800/80 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Compare GEM Models</h2>
            <p className="text-xs text-slate-400">Select the companion model tailored to your desktop workspace</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60">
                  <th className="p-4 text-slate-400 font-bold uppercase">Feature / Specification</th>
                  <th className="p-4 text-[#06B6D4] font-black text-sm">🔹 GEM v1 (Standard)</th>
                  <th className="p-4 text-rose-400 font-black text-sm">🚀 GEM v2 Pro (Biometric)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="p-4 font-semibold text-slate-300">ESP32 32-bit Dual Core Processor (240MHz)</td>
                  <td className="p-4 text-emerald-400 font-bold"><Check className="w-4 h-4 inline mr-1" /> Included</td>
                  <td className="p-4 text-emerald-400 font-bold"><Check className="w-4 h-4 inline mr-1" /> Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-300">0.96" OLED Expression Screen (128x64)</td>
                  <td className="p-4 text-emerald-400 font-bold"><Check className="w-4 h-4 inline mr-1" /> Included</td>
                  <td className="p-4 text-emerald-400 font-bold"><Check className="w-4 h-4 inline mr-1" /> Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-300">4 White LED Bulbs (Pure White Lighting)</td>
                  <td className="p-4 text-emerald-400 font-bold"><Check className="w-4 h-4 inline mr-1" /> 4 White LEDs</td>
                  <td className="p-4 text-emerald-400 font-bold"><Check className="w-4 h-4 inline mr-1" /> 4 White LEDs (Pulse Synced)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-300">Rechargeable LiPo Battery Power</td>
                  <td className="p-4 text-white font-bold">1000mAh Battery</td>
                  <td className="p-4 text-rose-400 font-bold">1500mAh Battery</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-300">GEM Mobile App Support (Wi-Fi + BLE)</td>
                  <td className="p-4 text-emerald-400 font-bold"><Check className="w-4 h-4 inline mr-1" /> GEM App Supported</td>
                  <td className="p-4 text-emerald-400 font-bold"><Check className="w-4 h-4 inline mr-1" /> GEM App Supported</td>
                </tr>
                <tr className="bg-slate-900/40">
                  <td className="p-4 font-semibold text-white">IR Distance & Motion Proximity Sensor</td>
                  <td className="p-4 text-slate-500 font-semibold"><XCircle className="w-4 h-4 inline mr-1 text-slate-600" /> Not Included</td>
                  <td className="p-4 text-rose-400 font-extrabold"><Check className="w-4 h-4 inline mr-1" /> Included (IR Motion)</td>
                </tr>
                <tr className="bg-slate-900/40">
                  <td className="p-4 font-semibold text-white">MAX30102 Heart Rate & Pulse Oximeter Sensor</td>
                  <td className="p-4 text-slate-500 font-semibold"><XCircle className="w-4 h-4 inline mr-1 text-slate-600" /> Not Included</td>
                  <td className="p-4 text-rose-400 font-extrabold"><Check className="w-4 h-4 inline mr-1" /> Included (MAX30102 PPG)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Launch Poster Graphic Section */}
        <div className="pt-8 border-t border-slate-800/80 max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-extrabold text-white">Official GEM Launch Poster</h2>
          <div className="max-w-md mx-auto rounded-3xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
            <Image
              src="/gem-banner.png"
              alt="AWIE GEM Official Launch Banner"
              width={600}
              height={1000}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Selected Version Technical Specifications */}
        <div className="space-y-6 pt-8 border-t border-slate-800/80">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">
              {selectedVersion === 'v1' ? 'GEM v1 Specifications' : 'GEM v2 Pro Specifications'}
            </h2>
            <p className="text-xs text-slate-400">Micro-architecture specifications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(selectedVersion === 'v1' ? specsV1 : specsV2).map((item) => (
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
