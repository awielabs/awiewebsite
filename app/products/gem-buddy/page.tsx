'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Sparkles,
  Cpu,
  Tv,
  BatteryCharging,
  Sun,
  ArrowRight,
  ChevronLeft,
  Clock,
  HeartPulse,
  Zap,
  Volume2,
  Shield,
  Eye,
  Sliders,
  Hand,
  Radio,
  Layers,
  Smartphone
} from 'lucide-react';

function GemBuddyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial version from URL query if present (?version=v2 or ?version=v1)
  const initialVersion = searchParams.get('version') === 'v2' ? 'v2' : 'v1';
  const [selectedVersion, setSelectedVersion] = useState<'v1' | 'v2'>(initialVersion);
  const [simMode, setSimMode] = useState<'happy' | 'sleep' | 'guard' | 'pulse'>('happy');
  const [ledBrightness, setLedBrightness] = useState<100 | 50 | 0>(100);
  const [isPetting, setIsPetting] = useState(false);
  const [appCarouselIndex, setAppCarouselIndex] = useState(0);
  const [isAppCarouselPaused, setIsAppCarouselPaused] = useState(false);

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

  const nextAppSlide = () => {
    setAppCarouselIndex((prev) => (prev + 1) % appScreenshots.length);
  };

  const prevAppSlide = () => {
    setAppCarouselIndex((prev) => (prev - 1 + appScreenshots.length) % appScreenshots.length);
  };

  // Auto-scroll through app screenshots every 3.5s (pauses on hover/touch)
  useEffect(() => {
    if (isAppCarouselPaused) return;
    const timer = setInterval(() => {
      setAppCarouselIndex((prev) => (prev + 1) % appScreenshots.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isAppCarouselPaused, appScreenshots.length]);

  useEffect(() => {
    const versionFromQuery = searchParams.get('version');
    if (versionFromQuery === 'v2' || versionFromQuery === 'v1') {
      setSelectedVersion(versionFromQuery);
    }
  }, [searchParams]);

  const handleVersionChange = (version: 'v1' | 'v2') => {
    setSelectedVersion(version);
    router.replace(`/products/gem-buddy?version=${version}`, { scroll: false });
    if (version === 'v1' && simMode === 'pulse') {
      setSimMode('happy');
    }
  };

  const triggerPet = () => {
    setIsPetting(true);
    setSimMode('happy');
    setTimeout(() => {
      setIsPetting(false);
    }, 1200);
  };

  const specsV1 = [
    { category: 'Compute & Wireless', label: 'Microcontroller', value: 'ESP32 32-bit Dual-Core 240MHz' },
    { category: 'Compute & Wireless', label: 'Connectivity', value: '2.4 GHz Wi-Fi 802.11 b/g/n + BLE 5.0' },
    { category: 'Display & Audio', label: 'Screen', value: '0.96" Monochromatic Graphic OLED (128×64)' },
    { category: 'Display & Audio', label: 'Audio Engine', value: 'Piezo Resonant Buzzer (Melodic Beeps & Chimes)' },
    { category: 'Lighting & Touch', label: 'Ambient Lighting', value: '4× Ultra-Crisp Pure White LEDs' },
    { category: 'Lighting & Touch', label: 'Touch Sensing', value: 'Capacitive Touch Top Enclosure' },
    { category: 'Sensors', label: 'Environmental', value: 'Ambient Light & Internal Temperature Sensor' },
    { category: 'Sensors', label: 'Biometrics', value: 'Not Included (Available on GEM v2)' },
    { category: 'Power & Battery', label: 'Battery Capacity', value: '2500mAh High-Density Li-ion Rechargeable' },
    { category: 'Power & Battery', label: 'Charging Interface', value: 'USB Type-C (5V / 1A Fast Charge Support)' }
  ];

  const specsV2 = [
    { category: 'Compute & Wireless', label: 'Microcontroller', value: 'ESP32 32-bit Dual-Core 240MHz' },
    { category: 'Compute & Wireless', label: 'Connectivity', value: '2.4 GHz Wi-Fi 802.11 b/g/n + BLE 5.0' },
    { category: 'Display & Audio', label: 'Screen', value: '0.96" Monochromatic Graphic OLED (128×64)' },
    { category: 'Display & Audio', label: 'Audio Engine', value: 'Piezo Resonant Buzzer (Pulse Sync Chimes & Alerts)' },
    { category: 'Lighting & Touch', label: 'Ambient Lighting', value: '4× Pure White LEDs (Pulse Synced Illumination)' },
    { category: 'Lighting & Touch', label: 'Touch Sensing', value: 'Capacitive Touch Top Enclosure' },
    { category: 'Sensors', label: 'Biometric Pulse', value: 'MAX30102 PPG Optical Heart Rate & SpO2 Sensor' },
    { category: 'Sensors', label: 'Motion Proximity', value: 'Infrared (IR) Distance Sentinel Sensor' },
    { category: 'Power & Battery', label: 'Battery Capacity', value: '2500mAh High-Density Li-ion Rechargeable' },
    { category: 'Power & Battery', label: 'Charging Interface', value: 'USB Type-C (5V / 1A Fast Charge Support)' }
  ];

  return (
    <div className="pt-28 pb-24 bg-white text-slate-800 min-h-screen relative overflow-hidden selection:bg-[#2563EB] selection:text-white">
      {/* Background Soft Glows matching AWIE theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-blue-500/10 via-blue-400/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-96 -left-48 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[800px] -right-48 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-600 hover:text-slate-900 transition-all shadow-sm group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>All AWIE Products</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-[#2563EB]">
            <Radio className="w-3.5 h-3.5 text-[#2563EB] animate-pulse" />
            <span>AWIE IN-HOUSE HARDWARE</span>
          </div>
        </div>

        {/* Model Switcher Pill Bar */}
        <div className="p-1.5 sm:p-2 rounded-2xl bg-slate-100 border border-slate-200/80 max-w-2xl mx-auto shadow-sm flex flex-col sm:flex-row items-stretch gap-2">
          <button
            onClick={() => handleVersionChange('v1')}
            className={`flex-1 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 ${
              selectedVersion === 'v1'
                ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Zap className={`w-4 h-4 ${selectedVersion === 'v1' ? 'text-yellow-300' : 'text-slate-500'}`} />
            <div className="text-left">
              <span className="block font-black tracking-tight leading-none">GEM v1 Standard</span>
              <span className="text-[10px] opacity-80 font-medium">2500mAh • 4 White LEDs • OLED Face</span>
            </div>
          </button>

          <button
            onClick={() => handleVersionChange('v2')}
            className={`flex-1 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 ${
              selectedVersion === 'v2'
                ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <HeartPulse className={`w-4 h-4 ${selectedVersion === 'v2' ? 'text-rose-300 animate-pulse' : 'text-slate-500'}`} />
            <div className="text-left">
              <span className="block font-black tracking-tight leading-none">GEM v2 Biometric</span>
              <span className="text-[10px] opacity-80 font-medium">MAX30102 PPG • IR Motion • 2500mAh</span>
            </div>
          </button>
        </div>

        {/* Hero Hardware Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive Hardware Display Stage */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-lg p-6 rounded-3xl bg-white hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-xl hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-700 ease-out relative overflow-hidden group">
              {/* Smooth Dark Blue Gradient Overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none rounded-3xl" />
              <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              <div className="absolute -bottom-12 -left-12 w-60 h-60 bg-blue-600/15 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

              {/* Top Bar */}
              <div className="flex items-center mb-4 relative z-10 text-xs">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 group-hover:bg-blue-950/80 border border-blue-200 group-hover:border-blue-700/60 text-xs font-bold text-[#2563EB] group-hover:text-blue-300 transition-all duration-500">
                  <div className="w-2 h-2 rounded-full bg-[#2563EB] group-hover:bg-blue-400 animate-pulse" />
                  <span>{selectedVersion === 'v1' ? 'GEM v1 Standard' : 'GEM v2 Biometric'}</span>
                </div>
              </div>

              {/* Main Photo Viewport */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center p-6 shadow-inner relative z-10">
                <Image
                  src="/gem/gem_device_mockup.jpg"
                  alt="GEM Buddy Hardware Mockup"
                  fill
                  className="object-contain p-6 transition-all duration-700 group-hover:scale-105"
                  priority
                />

                {/* Ambient White LEDs Glow Simulation Overlay */}
                {ledBrightness > 0 && (
                  <div 
                    className="absolute inset-0 bg-white/10 pointer-events-none mix-blend-screen transition-opacity duration-500 rounded-2xl"
                    style={{ opacity: ledBrightness === 100 ? 0.9 : 0.45 }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Title, Narrative & Launch Registration */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>OFFICIAL OWN-MADE HARDWARE LAUNCH</span>
            </div>

            {/* Model Designation */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
                {selectedVersion === 'v1' ? (
                  <>GEM <span className="text-[#2563EB]">v1</span> Standard</>
                ) : (
                  <>GEM <span className="text-[#2563EB]">v2</span> Biometric</>
                )}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                {selectedVersion === 'v1'
                  ? 'The intelligent autonomous desktop companion engineered with high-contrast OLED expressions, piezo audio chimes, 4 pure white LEDs, and a rechargeable 2500mAh Li-ion core.'
                  : 'The next-generation biometric companion integrated with a MAX30102 optical PPG pulse sensor for live heart monitoring, IR motion radar sentinel, and full smart companion features.'}
              </p>
            </div>

            {/* Launch Notice Box */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center gap-4 shadow-sm">
              <div className="p-2.5 rounded-xl bg-[#2563EB] text-white shrink-0 shadow-md shadow-[#2563EB]/20">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-slate-900 block text-sm">PRE-BOOKING OPENING SOON</span>
                <span className="text-slate-600 font-medium">
                  Register your priority spot for GEM {selectedVersion === 'v1' ? 'v1 Standard' : 'v2 Biometric'}. Limited initial production run batch.
                </span>
              </div>
            </div>

            {/* Key Feature Highlight Badges with Dark Blue Gradient Hover */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-sm hover:shadow-xl hover:shadow-[#2563EB]/20 transition-all duration-500 ease-out group relative overflow-hidden flex items-start gap-3">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none rounded-2xl" />
                <Tv className="w-4 h-4 text-[#2563EB] group-hover:text-blue-400 shrink-0 mt-0.5 relative z-10 transition-colors duration-300" />
                <div className="relative z-10">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-white block transition-colors duration-300">Animated OLED Eyes</span>
                  <span className="text-[11px] text-slate-500 group-hover:text-slate-300 font-medium transition-colors duration-300">0.96" 128×64 contrast face</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-sm hover:shadow-xl hover:shadow-[#2563EB]/20 transition-all duration-500 ease-out group relative overflow-hidden flex items-start gap-3">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none rounded-2xl" />
                <Volume2 className="w-4 h-4 text-[#2563EB] group-hover:text-blue-400 shrink-0 mt-0.5 relative z-10 transition-colors duration-300" />
                <div className="relative z-10">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-white block transition-colors duration-300">Acoustic Audio Buzzer</span>
                  <span className="text-[11px] text-slate-500 group-hover:text-slate-300 font-medium transition-colors duration-300">Chimes & touch reactions</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-sm hover:shadow-xl hover:shadow-[#2563EB]/20 transition-all duration-500 ease-out group relative overflow-hidden flex items-start gap-3">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none rounded-2xl" />
                <Sun className="w-4 h-4 text-[#2563EB] group-hover:text-blue-400 shrink-0 mt-0.5 relative z-10 transition-colors duration-300" />
                <div className="relative z-10">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-white block transition-colors duration-300">4 White LEDs</span>
                  <span className="text-[11px] text-slate-500 group-hover:text-slate-300 font-medium transition-colors duration-300">Crisp pure white glow</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-sm hover:shadow-xl hover:shadow-[#2563EB]/20 transition-all duration-500 ease-out group relative overflow-hidden flex items-start gap-3">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none rounded-2xl" />
                {selectedVersion === 'v1' ? (
                  <>
                    <BatteryCharging className="w-4 h-4 text-[#2563EB] group-hover:text-blue-400 shrink-0 mt-0.5 relative z-10 transition-colors duration-300" />
                    <div className="relative z-10">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-white block transition-colors duration-300">2500mAh Li-ion</span>
                      <span className="text-[11px] text-slate-500 group-hover:text-slate-300 font-medium transition-colors duration-300">Type-C rechargeable power</span>
                    </div>
                  </>
                ) : (
                  <>
                    <HeartPulse className="w-4 h-4 text-rose-500 group-hover:text-rose-400 shrink-0 mt-0.5 relative z-10 transition-colors duration-300" />
                    <div className="relative z-10">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-white block transition-colors duration-300">MAX30102 PPG Pulse</span>
                      <span className="text-[11px] text-slate-500 group-hover:text-slate-300 font-medium transition-colors duration-300">Real-time BPM & SpO2 health</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/contact?interest=GEM+${selectedVersion === 'v1' ? 'v1+Standard' : 'v2+Biometric'}+PreBooking`}
                className="flex-1 inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-sm transition-all shadow-lg shadow-[#2563EB]/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Pre-Book GEM {selectedVersion === 'v1' ? 'v1' : 'v2'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#simulator"
                className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-sm transition-all"
              >
                <Sliders className="w-4 h-4 text-[#2563EB]" />
                <span>Live Simulator</span>
              </a>
            </div>

          </div>

        </div>

        {/* Bento Capabilities Grid with Signature Dark Blue Gradient Hover */}
        <div className="space-y-6 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
              <Layers className="w-3.5 h-3.5" />
              <span>CORE ARCHITECTURE & ENGINEERING</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Engineered for Your Workspace</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Every detail in GEM is crafted with custom PCB layout, firmware logic, and reactive micro-interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Dual-Core ESP32 Brain */}
            <div className="p-6 rounded-3xl bg-slate-50/70 hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-sm hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-700 ease-out hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between space-y-4">
              {/* Smooth Dark Blue Gradient Overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none rounded-3xl" />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              
              <div className="w-10 h-10 rounded-2xl bg-blue-50 group-hover:bg-blue-950 group-hover:border-blue-700/60 border border-blue-200 flex items-center justify-center text-[#2563EB] group-hover:text-blue-300 transition-all duration-500 relative z-10">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-1 relative z-10">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-500">Dual-Core 240MHz Brain</h3>
                <p className="text-xs text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-500">
                  Powered by the ESP32 micro-architecture with concurrent thread management for smooth 60fps OLED face rendering and instantaneous touch sensor triggers.
                </p>
              </div>
            </div>

            {/* Card 2: Monochromatic OLED Expression Display */}
            <div className="p-6 rounded-3xl bg-slate-50/70 hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-sm hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-700 ease-out hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between space-y-4">
              {/* Smooth Dark Blue Gradient Overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none rounded-3xl" />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              
              <div className="w-10 h-10 rounded-2xl bg-blue-50 group-hover:bg-blue-950 group-hover:border-blue-700/60 border border-blue-200 flex items-center justify-center text-[#2563EB] group-hover:text-blue-300 transition-all duration-500 relative z-10">
                <Tv className="w-5 h-5" />
              </div>
              <div className="space-y-1 relative z-10">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-500">0.96" Monochromatic OLED</h3>
                <p className="text-xs text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-500">
                  High-contrast 128×64 pixel display projecting procedural ocular animations, blink routines, idle glances, and security sentry status alerts.
                </p>
              </div>
            </div>

            {/* Card 3: 4 Pure-White LEDs */}
            <div className="p-6 rounded-3xl bg-slate-50/70 hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-sm hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-700 ease-out hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between space-y-4">
              {/* Smooth Dark Blue Gradient Overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none rounded-3xl" />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              
              <div className="w-10 h-10 rounded-2xl bg-blue-50 group-hover:bg-blue-950 group-hover:border-blue-700/60 border border-blue-200 flex items-center justify-center text-[#2563EB] group-hover:text-blue-300 transition-all duration-500 relative z-10">
                <Sun className="w-5 h-5" />
              </div>
              <div className="space-y-1 relative z-10">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-500">4 Pure White Ambient LEDs</h3>
                <p className="text-xs text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-500">
                  Quad dedicated white LED emitters casting soft ambient desktop luminescence, breathing in sleep mode and pulsing in rhythm with heart readings.
                </p>
              </div>
            </div>

            {/* Card 4: Acoustic Piezo Buzzer */}
            <div className="p-6 rounded-3xl bg-slate-50/70 hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-sm hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-700 ease-out hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between space-y-4">
              {/* Smooth Dark Blue Gradient Overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none rounded-3xl" />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              
              <div className="w-10 h-10 rounded-2xl bg-blue-50 group-hover:bg-blue-950 group-hover:border-blue-700/60 border border-blue-200 flex items-center justify-center text-[#2563EB] group-hover:text-blue-300 transition-all duration-500 relative z-10">
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="space-y-1 relative z-10">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-500">Piezo Acoustic Tone Engine</h3>
                <p className="text-xs text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-500">
                  Tactile audio feedback generating playful chimes, wake-up beeps, motion alarm chirps, and heartbeat synchronic acoustic pulses.
                </p>
              </div>
            </div>

            {/* Card 5: Capacitive Touch Shell */}
            <div className="p-6 rounded-3xl bg-slate-50/70 hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-sm hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-700 ease-out hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between space-y-4">
              {/* Smooth Dark Blue Gradient Overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none rounded-3xl" />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              
              <div className="w-10 h-10 rounded-2xl bg-blue-50 group-hover:bg-blue-950 group-hover:border-blue-700/60 border border-blue-200 flex items-center justify-center text-[#2563EB] group-hover:text-blue-300 transition-all duration-500 relative z-10">
                <Hand className="w-5 h-5" />
              </div>
              <div className="space-y-1 relative z-10">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-500">Capacitive Touch Top Shell</h3>
                <p className="text-xs text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-500">
                  Embedded capacitive copper sensor pads along the head casing sense petting, taps, and long-presses to toggle expressions and modes.
                </p>
              </div>
            </div>

            {/* Card 6: 2500mAh Li-ion Battery & Biometrics */}
            <div className="p-6 rounded-3xl bg-slate-50/70 hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-sm hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-700 ease-out hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between space-y-4">
              {/* Smooth Dark Blue Gradient Overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none rounded-3xl" />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              
              <div className="w-10 h-10 rounded-2xl bg-blue-50 group-hover:bg-blue-950 group-hover:border-blue-700/60 border border-blue-200 flex items-center justify-center text-[#2563EB] group-hover:text-blue-300 transition-all duration-500 relative z-10">
                {selectedVersion === 'v1' ? <BatteryCharging className="w-5 h-5" /> : <HeartPulse className="w-5 h-5 text-rose-500 group-hover:text-rose-400" />}
              </div>
              <div className="space-y-1 relative z-10">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-500">
                  {selectedVersion === 'v1' ? '2500mAh Long-Life Battery' : 'MAX30102 PPG + IR Motion'}
                </h3>
                <p className="text-xs text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-500">
                  {selectedVersion === 'v1'
                    ? 'High-capacity rechargeable lithium-ion cell with intelligent power-saving sleep modes and USB Type-C charging.'
                    : 'Medical-grade optical biometric sensor reads pulse rate (BPM) & SpO2 blood oxygen, paired with IR distance motion radar.'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Firmware Simulator Section */}
        <div id="simulator" className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xl space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
              <Sliders className="w-3.5 h-3.5" />
              <span>INTERACTIVE FIRMWARE SIMULATOR</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Experience GEM in Action</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Interact with GEM's face expressions, top touch sensors, and ambient lighting in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto relative z-10">
            
            {/* Left Column: Cyber-Physical Hardware Simulator Console */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-sm p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
                
                {/* Virtual Touch Guard (Top Button) */}
                <div className="flex justify-center">
                  <button
                    onClick={triggerPet}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all border flex items-center gap-2 ${
                      isPetting
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 scale-105 shadow-md shadow-rose-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    <Hand className="w-3.5 h-3.5" />
                    <span>{isPetting ? 'Petting GEM! ❤️' : 'Tap Top to Pet'}</span>
                  </button>
                </div>

                {/* Round Screen Bezel */}
                <div className="w-48 h-48 mx-auto rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center relative shadow-inner p-3">
                  
                  {/* Glowing Pure White LED Bulbs on Bezel */}
                  <div 
                    className="absolute top-2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] transition-opacity"
                    style={{ opacity: ledBrightness / 100 }}
                  />
                  <div 
                    className="absolute bottom-2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] transition-opacity"
                    style={{ opacity: ledBrightness / 100 }}
                  />
                  <div 
                    className="absolute left-2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] transition-opacity"
                    style={{ opacity: ledBrightness / 100 }}
                  />
                  <div 
                    className="absolute right-2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] transition-opacity"
                    style={{ opacity: ledBrightness / 100 }}
                  />

                  {/* OLED Face Display Frame */}
                  <div className="w-36 h-28 rounded-2xl bg-black border border-slate-800 overflow-hidden relative shadow-2xl flex items-center justify-center">
                    
                    {/* Simulated OLED Scanline Texture */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-30" />

                    {simMode === 'happy' && (
                      <Image src="/gem/gem_happy.jpg" alt="GEM Happy Expression" fill className="object-cover" />
                    )}
                    {simMode === 'sleep' && (
                      <Image src="/gem/gem_sleep.jpg" alt="GEM Sleep Expression" fill className="object-cover" />
                    )}
                    {simMode === 'guard' && (
                      <Image src="/gem/gem_angry.jpg" alt="GEM Guard Expression" fill className="object-cover" />
                    )}
                    {simMode === 'pulse' && (
                      <div className="w-full h-full bg-black flex flex-col items-center justify-center space-y-1 z-0">
                        <HeartPulse className="w-8 h-8 text-rose-500 animate-bounce" />
                        <span className="text-[11px] font-mono text-rose-400 font-bold tracking-tight">76 BPM • 99% SpO2</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Telemetry Status Readout Bar */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-400">STATE:</span>
                    <span className="text-white font-bold uppercase">{simMode}</span>
                  </div>
                  <span className="text-[#60A5FA] font-bold">2500mAh [98%]</span>
                </div>

              </div>
            </div>

            {/* Right Column: Interactive Hardware Control Switcher */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Select Simulated State</h3>
                <p className="text-xs text-slate-600 font-medium">Trigger onboard expressions and hardware response modes</p>
              </div>

              {/* Expression Mode Pads */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSimMode('happy')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2.5 relative overflow-hidden group ${
                    simMode === 'happy'
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/25'
                      : 'bg-white hover:bg-[#0B1528] text-slate-700 hover:text-white border-slate-200 hover:border-[#2563EB] shadow-sm'
                  }`}
                >
                  <Eye className={`w-4 h-4 ${simMode === 'happy' ? 'text-white' : 'text-[#2563EB] group-hover:text-blue-400'}`} />
                  <span>Happy Face</span>
                </button>

                <button
                  onClick={() => setSimMode('sleep')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2.5 relative overflow-hidden group ${
                    simMode === 'sleep'
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/25'
                      : 'bg-white hover:bg-[#0B1528] text-slate-700 hover:text-white border-slate-200 hover:border-[#2563EB] shadow-sm'
                  }`}
                >
                  <Clock className={`w-4 h-4 ${simMode === 'sleep' ? 'text-white' : 'text-[#2563EB] group-hover:text-blue-400'}`} />
                  <span>Sleep Idle</span>
                </button>

                <button
                  onClick={() => setSimMode('guard')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2.5 relative overflow-hidden group ${
                    simMode === 'guard'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/25'
                      : 'bg-white hover:bg-[#0B1528] text-slate-700 hover:text-white border-slate-200 hover:border-rose-500 shadow-sm'
                  }`}
                >
                  <Shield className={`w-4 h-4 ${simMode === 'guard' ? 'text-white' : 'text-rose-500 group-hover:text-rose-400'}`} />
                  <span>Desk Guard</span>
                </button>

                <button
                  onClick={() => {
                    if (selectedVersion === 'v1') {
                      handleVersionChange('v2');
                    }
                    setSimMode('pulse');
                  }}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2.5 relative overflow-hidden group ${
                    simMode === 'pulse'
                      ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white border-rose-500 shadow-md shadow-rose-600/25'
                      : 'bg-white hover:bg-[#0B1528] text-slate-700 hover:text-white border-slate-200 hover:border-rose-500 shadow-sm'
                  }`}
                >
                  <HeartPulse className={`w-4 h-4 ${simMode === 'pulse' ? 'text-white' : 'text-rose-500 group-hover:text-rose-400'}`} />
                  <span>Pulse Telemetry</span>
                </button>
              </div>

              {/* Ambient LED Brightness Controller */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>4 White LEDs Illumination</span>
                  </span>
                  <span className="font-mono text-xs text-slate-500 font-bold">{ledBrightness}%</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLedBrightness(100)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      ledBrightness === 100 ? 'bg-[#2563EB] text-white shadow-sm' : 'bg-slate-100 hover:bg-[#0B1528] text-slate-600 hover:text-white'
                    }`}
                  >
                    100% (High)
                  </button>
                  <button
                    onClick={() => setLedBrightness(50)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      ledBrightness === 50 ? 'bg-[#2563EB] text-white shadow-sm' : 'bg-slate-100 hover:bg-[#0B1528] text-slate-600 hover:text-white'
                    }`}
                  >
                    50% (Soft)
                  </button>
                  <button
                    onClick={() => setLedBrightness(0)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      ledBrightness === 0 ? 'bg-slate-800 text-white shadow-sm' : 'bg-slate-100 hover:bg-[#0B1528] text-slate-600 hover:text-white'
                    }`}
                  >
                    Off
                  </button>
                </div>
              </div>

              {/* Live Status Description */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1.5 text-xs">
                <span className="font-bold text-slate-900 block">Firmware Behavior Log:</span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {simMode === 'happy' && 'GEM is responsive and active. Capacitive top touches trigger happy expressions and cheerful audio chimes.'}
                  {simMode === 'sleep' && 'GEM enters power-saving idle state. Monochromatic OLED display plays subtle eye-closing routines.'}
                  {simMode === 'guard' && 'Desk Sentinel Mode Armed! Motion detection or light changes trigger alert audio beeps and angry sentry eyes.'}
                  {simMode === 'pulse' && 'GEM v2 MAX30102 PPG optical sensor actively reads human pulse and transmits real-time BPM telemetry.'}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Mobile Companion App Carousel Section - Horizontal Layout (Demo Left, Details Right) */}
        <div
          onMouseEnter={() => setIsAppCarouselPaused(true)}
          onMouseLeave={() => setIsAppCarouselPaused(false)}
          className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-white hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-xl hover:shadow-2xl hover:shadow-[#2563EB]/20 transition-all duration-700 ease-out group relative overflow-hidden select-none"
        >
          {/* Smooth Dark Blue Gradient Overlay */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none rounded-3xl" />
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
            
            {/* Left Column: Phone Demo */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              {/* Tap Left / Right of phone area to navigate */}
              <div
                onClick={prevAppSlide}
                className="absolute inset-y-0 left-0 w-1/2 cursor-pointer z-20"
                title="Tap left side to view previous screen"
                aria-label="Previous screen"
              />
              <div
                onClick={nextAppSlide}
                className="absolute inset-y-0 right-0 w-1/2 cursor-pointer z-20"
                title="Tap right side to view next screen"
                aria-label="Next screen"
              />

              {/* Enhanced Phone Mockup Frame */}
              <div className="relative w-[190px] sm:w-[220px] aspect-[9/18.5] rounded-[36px] p-3 bg-slate-950 border-[5px] border-slate-900 shadow-2xl ring-1 ring-slate-800/80 group-hover:border-slate-800 transition-all duration-500 overflow-hidden pointer-events-none">
                {/* Phone Speaker Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-slate-950 rounded-full z-20" />
                
                {/* Screen Area with Smooth Hardware Horizontal Sliding */}
                <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-slate-900">
                  <div
                    className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
                    style={{ transform: `translateX(-${appCarouselIndex * 100}%)` }}
                  >
                    {appScreenshots.map((screen, idx) => (
                      <div key={idx} className="relative w-full h-full shrink-0">
                        <Image
                          src={screen.src}
                          alt={screen.title}
                          fill
                          className="object-contain select-none"
                          priority={idx <= 1}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone navigation tap hint below mockup */}
              <span className="text-[11px] text-slate-400 group-hover:text-slate-400 font-mono mt-3 tracking-wide pointer-events-none">
                Tap phone to navigate
              </span>
            </div>

            {/* Right Column: Details & Module Info */}
            <div className="md:col-span-7 flex flex-col justify-center text-left space-y-5">
              
              {/* Badge & Title */}
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 group-hover:bg-blue-950/80 border border-blue-200 group-hover:border-blue-700/60 text-xs font-bold text-[#2563EB] group-hover:text-blue-300 transition-all duration-500">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>GEM MOBILE COMPANION APP</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-white tracking-tight transition-colors duration-500">
                  Total Control on Your Phone
                </h2>
                <p className="text-sm sm:text-base text-slate-600 group-hover:text-slate-300 font-medium leading-relaxed transition-colors duration-500">
                  Configure face expressions, audio buzzer chimes, security guard mode, and firmware updates.
                </p>
              </div>

              {/* Active Screen Detail Box */}
              <div className="p-5 rounded-2xl bg-slate-50 group-hover:bg-[#0F1B33]/80 border border-slate-200/80 group-hover:border-blue-900/60 transition-all duration-500 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-blue-400">
                  <span>SCREEN {appCarouselIndex + 1} OF {appScreenshots.length}</span>
                  <span className="text-[#2563EB] group-hover:text-blue-300 font-semibold">Active Module</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-white transition-colors duration-500">
                  {appScreenshots[appCarouselIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 group-hover:text-slate-300 font-medium leading-relaxed transition-colors duration-500">
                  {appScreenshots[appCarouselIndex].desc}
                </p>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2 pt-1 relative z-30">
                {appScreenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setAppCarouselIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      appCarouselIndex === i
                        ? 'w-8 bg-[#2563EB]'
                        : 'w-2 bg-slate-300 group-hover:bg-slate-700 hover:bg-blue-400'
                    }`}
                    aria-label={`Jump to screenshot ${i + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Technical Specifications Grid with Signature Dark Blue Gradient Hover */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {selectedVersion === 'v1' ? 'GEM v1 Standard Specifications' : 'GEM v2 Biometric Technical Specifications'}
              </h2>
              <p className="text-xs text-slate-600 font-medium">Full hardware component and micro-architecture breakdown</p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
              <span>MODEL: {selectedVersion === 'v1' ? 'AWIE-GEM-V1-2500' : 'AWIE-GEM-V2-2500'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(selectedVersion === 'v1' ? specsV1 : specsV2).map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white hover:bg-[#0B1528] border border-slate-200/90 hover:border-[#2563EB] shadow-sm hover:shadow-xl hover:shadow-[#2563EB]/20 flex justify-between items-center text-xs transition-all duration-500 ease-out group relative overflow-hidden"
              >
                {/* Dark Blue Gradient Overlay */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none rounded-2xl" />
                
                <div className="relative z-10">
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-400 font-mono block uppercase transition-colors duration-300">{item.category}</span>
                  <span className="text-slate-800 group-hover:text-white font-semibold transition-colors duration-300">{item.label}</span>
                </div>
                <span className="relative z-10 text-slate-900 group-hover:text-blue-200 font-mono font-bold bg-slate-100 group-hover:bg-[#0F1B33] px-3 py-1.5 rounded-lg border border-slate-200 group-hover:border-blue-800 text-right transition-all duration-300">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final Pre-Booking Registration CTA Banner with Signature Dark Blue Gradient Hover */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-50/90 via-white to-blue-50/70 hover:bg-[#0B1528] border border-blue-200 hover:border-[#2563EB] shadow-xl hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-700 ease-out group relative overflow-hidden text-center space-y-6">
          {/* Smooth Dark Blue Gradient Overlay */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#081022] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none rounded-3xl" />
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100/70 group-hover:bg-blue-950 group-hover:border-blue-700/60 border border-blue-200 text-xs font-bold text-[#2563EB] group-hover:text-blue-300 transition-all duration-500">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400 transition-colors duration-500" />
              <span>LIMITED PRODUCTION BATCH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 group-hover:text-white tracking-tight transition-colors duration-500">
              Bring GEM to Your Desk
            </h2>
            <p className="text-sm text-slate-600 group-hover:text-slate-300 font-medium leading-relaxed transition-colors duration-500">
              Reserve your spot for GEM {selectedVersion === 'v1' ? 'v1 Standard' : 'v2 Biometric'}. Be among the first to receive this in-house manufactured companion device.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              href={`/contact?interest=GEM+${selectedVersion === 'v1' ? 'v1+Standard' : 'v2+Biometric'}+PreBooking`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-sm transition-all shadow-lg shadow-[#2563EB]/25 hover:scale-105 active:scale-95"
            >
              <span>Register Pre-Booking for GEM {selectedVersion === 'v1' ? 'v1' : 'v2'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white group-hover:bg-[#0F1B33] border border-slate-200 group-hover:border-blue-900/60 text-slate-700 group-hover:text-slate-200 hover:text-slate-900 font-bold text-sm transition-all duration-500 shadow-sm"
            >
              <span>View All AWIE Products</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function GemBuddyPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-24 bg-white text-slate-800 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-500">Loading GEM Companion...</p>
        </div>
      </div>
    }>
      <GemBuddyContent />
    </Suspense>
  );
}
