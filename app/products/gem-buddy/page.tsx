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
  Zap,
  Volume2,
  ChevronRight,
  Shield,
  Eye,
  Sliders
} from 'lucide-react';

export default function GemBuddyPage() {
  const [selectedVersion, setSelectedVersion] = useState<'v1' | 'v2'>('v1');
  const [simMode, setSimMode] = useState<'happy' | 'sleep' | 'guard' | 'pulse'>('happy');
  const [appCarouselIndex, setAppCarouselIndex] = useState(0);

  const appScreenshots = [
    { title: '1. Welcome & Onboarding', desc: 'Introduction to GEM companion app setup & connectivity.', src: '/gem/intro.jpg' },
    { title: '2. Wi-Fi & Device Setup', desc: 'Seamless wireless pairing over 2.4GHz network.', src: '/gem/Setup screen.jpg' },
    { title: '3. Home Dashboard', desc: 'Real-time telemetry, battery status, and mood overview.', src: '/gem/home screen.jpg' },
    { title: '4. Device Control Panel', desc: 'Customize expressions, 4 White LED brightness, and audio beeps.', src: '/gem/control panel.jpg' },
    { title: '5. Desk Security Sentinel', desc: 'Arm Desk Guard mode to detect motion and security events.', src: '/gem/Desk Security screen.jpg' },
    { title: '6. Security Log History', desc: 'Review logged events and proximity alert timestamps.', src: '/gem/History screen.jpg' },
    { title: '7. OTA Firmware Updates', desc: 'Wireless over-the-air firmware updates for new features.', src: '/gem/Update.jpg' },
    { title: '8. Companion Settings', desc: 'Configure Wi-Fi credentials, audio chimes, and thresholds.', src: '/gem/Settings.jpg' },
    { title: '9. Hardware User Guide', desc: 'Built-in interactive guide and troubleshooting manual.', src: '/gem/Device Guid screen.jpg' }
  ];

  const specsV1 = [
    { label: 'Model', value: 'GEM v1 Standard Companion' },
    { label: 'Microcontroller', value: 'ESP32 Dual-Core 240MHz' },
    { label: 'Display', value: '0.96" Monochromatic OLED (128x64)' },
    { label: 'Audio Feedback', value: 'Piezo Audio Buzzer (Touch Beeps & Chimes)' },
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
    { label: 'Audio Feedback', value: 'Piezo Audio Buzzer (Pulse & Touch Chimes)' },
    { label: 'Ambient Lighting', value: '4 White LED Bulbs (Pulse Synced)' },
    { label: 'Motion Detection', value: 'IR Proximity & Distance Sensor' },
    { label: 'Heart Rate & Pulse', value: 'MAX30102 PPG Optical Biometric Sensor' },
    { label: 'Touch Interactivity', value: 'Capacitive Touch Top Guard' },
    { label: 'App Support', value: 'Full GEM Mobile App Telemetry (Wi-Fi + BLE)' },
    { label: 'Battery & Power', value: '1500mAh LiPo Battery via Type-C' }
  ];

  const nextAppSlide = () => {
    setAppCarouselIndex((prev) => (prev + 1) % appScreenshots.length);
  };

  const prevAppSlide = () => {
    setAppCarouselIndex((prev) => (prev - 1 + appScreenshots.length) % appScreenshots.length);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50/50 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Back Link */}
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#2563EB] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to AWIE Products</span>
          </Link>
        </div>

        {/* Top Header & Version Selector */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 text-center lg:text-left relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>AWIE OWN-MADE PRODUCT LINEUP</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              GEM <span className="text-[#2563EB]">Buddy</span>
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Interactive ESP32 desktop companion featuring animated OLED expressions, 4 White LED ambient lights, piezo audio buzzer, and companion app telemetry.
            </p>
          </div>

          {/* Version Selector Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0 relative z-10">
            <button
              onClick={() => setSelectedVersion('v1')}
              className={`px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                selectedVersion === 'v1'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>GEM v1 (Standard 1000mAh)</span>
            </button>

            <button
              onClick={() => setSelectedVersion('v2')}
              className={`px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                selectedVersion === 'v2'
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/25'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>GEM v2 Pro (Biometric 1500mAh)</span>
            </button>
          </div>
        </div>

        {/* Hero Section with Hardware Image & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Hardware Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md p-6 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden group hover:border-[#2563EB] transition-all">
              <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center p-4">
                <Image
                  src="/gem/gem_device_mockup.jpg"
                  alt="GEM Buddy Hardware Mockup"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                  <span>{selectedVersion === 'v1' ? 'GEM v1 Standard' : 'GEM v2 Pro Biometric'}</span>
                </div>
                <span className="font-extrabold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  {selectedVersion === 'v1' ? '1000mAh Battery' : '1500mAh + MAX30102'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column Specifications & Details */}
          <div className="lg:col-span-6 space-y-6">
            
            {selectedVersion === 'v1' ? (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
                  <span>PRE-BOOKING OPEN SOON</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">GEM v1 Standard Companion</h2>
                <p className="text-[#2563EB] text-base font-bold">1000mAh Battery • 4 White LEDs • Audio Buzzer & GEM App</p>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Designed and manufactured in-house by AWIE. GEM v1 features 4 crisp White LED ambient bulbs, a piezo audio buzzer for sound alerts & touch feedback, 1000mAh rechargeable LiPo battery power, capacitive touch sensors, animated OLED eyes, and full GEM Mobile App synchronization.
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200 text-xs font-bold text-rose-600">
                  <HeartPulse className="w-4 h-4 text-rose-500" />
                  <span>PRE-BOOKING OPEN SOON — PRO HEALTH EDITION</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">GEM v2 Pro Biometric Edition</h2>
                <p className="text-rose-600 text-base font-bold">1500mAh Battery • MAX30102 Heart Sensor & IR Motion</p>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  GEM v2 Pro combines an integrated MAX30102 PPG optical pulse sensor for real-time heart rate monitoring, an IR distance motion sensor, 1500mAh LiPo battery, 4 White LED bulbs, piezo audio buzzer sound feedback, and biometric telemetry on the GEM Mobile App.
                </p>
              </>
            )}

            {/* Launch Banner Box */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#2563EB] shrink-0" />
              <div className="text-xs font-medium">
                <span className="font-bold text-slate-900 block">WE ARE LAUNCHING OUR OWN-MADE PRODUCT</span>
                <span className="text-slate-600">Pre-booking for GEM {selectedVersion === 'v1' ? 'v1' : 'v2 Pro'} will open shortly. Stay tuned!</span>
              </div>
            </div>

            {/* Core Feature Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                <Tv className="w-4 h-4 text-[#2563EB] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">OLED Face</span>
                  <span className="text-[11px] text-slate-500 font-medium">Animated expressions</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                <Volume2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Audio Buzzer</span>
                  <span className="text-[11px] text-slate-500 font-medium">Touch sound chimes</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                <Sun className="w-4 h-4 text-[#2563EB] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">4 White LEDs</span>
                  <span className="text-[11px] text-slate-500 font-medium">Pure white illumination</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                <BatteryCharging className="w-4 h-4 text-[#2563EB] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">LiPo Battery</span>
                  <span className="text-[11px] text-slate-500 font-medium">{selectedVersion === 'v1' ? '1000mAh Power' : '1500mAh Power'}</span>
                </div>
              </div>
            </div>

            {/* Pre-Booking Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/contact?interest=GEM+${selectedVersion === 'v1' ? 'v1+Standard' : 'v2+Pro'}+PreBooking`}
                className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold text-xs transition-all shadow-lg ${
                  selectedVersion === 'v1'
                    ? 'bg-[#2563EB] hover:bg-[#1D4ED8] shadow-[#2563EB]/25'
                    : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/25'
                }`}
              >
                <span>Register for GEM {selectedVersion === 'v1' ? 'v1' : 'v2 Pro'} Pre-Booking</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

        {/* Interactive Device Simulator Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
              <Sliders className="w-3.5 h-3.5" />
              <span>INTERACTIVE DEMO SIMULATOR</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Interact with GEM Buddy</h2>
            <p className="text-xs text-slate-600 font-medium">Test GEM's OLED face expressions, guard mode alerts, and telemetry in real time.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
            
            {/* Device Face Display Box */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-sm p-6 rounded-3xl bg-slate-900 text-white shadow-2xl text-center space-y-6 relative overflow-hidden border border-slate-800">
                <div className="w-40 h-40 mx-auto rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center relative shadow-inner p-2">
                  
                  {/* Face Image */}
                  <div className="w-32 h-24 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative shadow-lg">
                    {simMode === 'happy' && (
                      <Image src="/gem/gem_happy.jpg" alt="GEM Happy" fill className="object-cover" />
                    )}
                    {simMode === 'sleep' && (
                      <Image src="/gem/gem_sleep.jpg" alt="GEM Sleep" fill className="object-cover" />
                    )}
                    {simMode === 'guard' && (
                      <Image src="/gem/gem_angry.jpg" alt="GEM Guard Alert" fill className="object-cover" />
                    )}
                    {simMode === 'pulse' && (
                      <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center space-y-1">
                        <HeartPulse className="w-8 h-8 text-rose-500 animate-bounce" />
                        <span className="text-[10px] font-mono text-rose-400 font-bold">78 BPM • SpO2 99%</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300">
                  <span>State: </span>
                  <span className="text-[#2563EB] font-bold uppercase">{simMode} MODE</span>
                </div>
              </div>
            </div>

            {/* Controls Panel */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">Select Simulator Mode</h3>
              
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setSimMode('happy')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    simMode === 'happy'
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#2563EB]'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Happy Face</span>
                </button>

                <button
                  onClick={() => setSimMode('sleep')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    simMode === 'sleep'
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#2563EB]'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Sleep Mode</span>
                </button>

                <button
                  onClick={() => setSimMode('guard')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    simMode === 'guard'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-rose-500'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Desk Guard</span>
                </button>

                <button
                  onClick={() => setSimMode('pulse')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                    simMode === 'pulse'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-900'
                  }`}
                >
                  <HeartPulse className="w-4 h-4 text-rose-500" />
                  <span>Pulse Telemetry</span>
                </button>
              </div>

              {/* Status Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 block">Live Telemetry Feedback</span>
                <p className="text-xs text-slate-600 font-medium">
                  {simMode === 'happy' && 'GEM is happy, tracking ambient light, and responsive to top touch guard.'}
                  {simMode === 'sleep' && 'GEM enters low-power idle sleep state with soft OLED eye animations.'}
                  {simMode === 'guard' && 'Desk Guard Armed! Motion detection or light changes trigger alert chimes.'}
                  {simMode === 'pulse' && 'GEM v2 Pro MAX30102 PPG sensor reading live pulse rate (78 BPM) and oxygen levels.'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Companion App Showcase Carousel Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
              <Smartphone className="w-3.5 h-3.5" />
              <span>GEM MOBILE COMPANION APP</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Total Control on Your Phone</h2>
            <p className="text-xs text-slate-600 font-medium">Configure face expressions, audio buzzer chimes, security guard mode, and firmware updates.</p>
          </div>

          {/* Carousel Viewport */}
          <div className="max-w-md mx-auto relative flex flex-col items-center">
            <div className="w-64 h-[440px] rounded-3xl overflow-hidden border-4 border-slate-900 shadow-2xl relative bg-slate-950">
              <Image
                src={appScreenshots[appCarouselIndex].src}
                alt={appScreenshots[appCarouselIndex].title}
                fill
                className="object-cover transition-opacity duration-300"
              />
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={prevAppSlide}
                className="p-3 rounded-full bg-slate-100 hover:bg-[#2563EB] text-slate-700 hover:text-white transition-colors border border-slate-200 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="text-center space-y-0.5">
                <span className="text-xs font-bold text-slate-900 block">{appScreenshots[appCarouselIndex].title}</span>
                <span className="text-[11px] text-slate-500 font-medium block max-w-xs">{appScreenshots[appCarouselIndex].desc}</span>
              </div>

              <button
                onClick={nextAppSlide}
                className="p-3 rounded-full bg-slate-100 hover:bg-[#2563EB] text-slate-700 hover:text-white transition-colors border border-slate-200 shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Comparison Matrix Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Compare GEM Models</h2>
            <p className="text-xs text-slate-600 font-medium">Select the companion model tailored to your desktop workspace</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-4 text-slate-500 font-bold uppercase">Feature / Specification</th>
                  <th className="p-4 text-[#2563EB] font-black text-sm">🔹 GEM v1 (Standard)</th>
                  <th className="p-4 text-slate-900 font-black text-sm">🚀 GEM v2 Pro (Biometric)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-4 font-semibold text-slate-800">ESP32 32-bit Dual Core Processor (240MHz)</td>
                  <td className="p-4 text-emerald-600 font-bold"><Check className="w-4 h-4 inline mr-1" /> Included</td>
                  <td className="p-4 text-emerald-600 font-bold"><Check className="w-4 h-4 inline mr-1" /> Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">0.96" OLED Expression Screen (128x64)</td>
                  <td className="p-4 text-emerald-600 font-bold"><Check className="w-4 h-4 inline mr-1" /> Included</td>
                  <td className="p-4 text-emerald-600 font-bold"><Check className="w-4 h-4 inline mr-1" /> Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">Piezo Audio Buzzer (Beeps & Sound Alerts)</td>
                  <td className="p-4 text-emerald-600 font-bold"><Check className="w-4 h-4 inline mr-1" /> Audio Buzzer</td>
                  <td className="p-4 text-emerald-600 font-bold"><Check className="w-4 h-4 inline mr-1" /> Audio Buzzer</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">4 White LED Bulbs (Pure White Lighting)</td>
                  <td className="p-4 text-emerald-600 font-bold"><Check className="w-4 h-4 inline mr-1" /> 4 White LEDs</td>
                  <td className="p-4 text-emerald-600 font-bold"><Check className="w-4 h-4 inline mr-1" /> 4 White LEDs (Pulse Synced)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">Rechargeable LiPo Battery Power</td>
                  <td className="p-4 text-slate-900 font-bold">1000mAh Battery</td>
                  <td className="p-4 text-[#2563EB] font-bold">1500mAh Battery</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">GEM Mobile App Support (Wi-Fi + BLE)</td>
                  <td className="p-4 text-emerald-600 font-bold"><Check className="w-4 h-4 inline mr-1" /> GEM App Supported</td>
                  <td className="p-4 text-emerald-600 font-bold"><Check className="w-4 h-4 inline mr-1" /> GEM App Supported</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">IR Distance & Motion Proximity Sensor</td>
                  <td className="p-4 text-slate-400 font-semibold"><XCircle className="w-4 h-4 inline mr-1 text-slate-400" /> Not Included</td>
                  <td className="p-4 text-[#2563EB] font-extrabold"><Check className="w-4 h-4 inline mr-1" /> Included (IR Motion)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-900">MAX30102 Heart Rate & Pulse Oximeter Sensor</td>
                  <td className="p-4 text-slate-400 font-semibold"><XCircle className="w-4 h-4 inline mr-1 text-slate-400" /> Not Included</td>
                  <td className="p-4 text-[#2563EB] font-extrabold"><Check className="w-4 h-4 inline mr-1" /> Included (MAX30102 PPG)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Launch Poster Graphic Section */}
        <div className="pt-4 max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-black text-slate-900">Official GEM Launch Poster</h2>
          <div className="max-w-md mx-auto rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-2xl">
            <Image
              src="/gem-banner.png"
              alt="AWIE GEM Official Launch Banner"
              width={600}
              height={1000}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Selected Version Technical Specifications Grid */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">
              {selectedVersion === 'v1' ? 'GEM v1 Technical Specifications' : 'GEM v2 Pro Technical Specifications'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">Hardware and micro-architecture details</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(selectedVersion === 'v1' ? specsV1 : specsV2).map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-white border border-slate-200 flex justify-between items-center text-xs shadow-sm">
                <span className="text-slate-600 font-semibold">{item.label}</span>
                <span className="text-slate-900 font-mono bg-slate-100 px-3 py-1 rounded border border-slate-300 font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
