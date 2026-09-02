'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Smartphone,
  Globe,
  Cpu,
  ArrowRight,
  CheckCircle2,
  CircuitBoard,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Search,
  PenTool,
  Hammer,
  CheckCheck,
  RefreshCw,
  Sliders,
  Terminal,
  Zap,
  HeartPulse
} from 'lucide-react';
import ScrollFrameBackground from '@/components/ui/ScrollFrameBackground';

export default function Home() {
  const whatWeDoCards = [
    {
      num: '01',
      title: 'Apps',
      category: 'Mobile Applications & Digital Products',
      description: 'Modern mobile applications designed around usability, performance, and dependable data management.',
      icon: Smartphone,
      gradient: 'from-[#2563EB]/10 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#2563EB]',
      badge: 'MOBILE DEVELOPMENT',
      details: {
        subtitle: 'Mobile Capabilities',
        highlights: [
          'Cross-platform iOS & Android development',
          'Flutter & React Native applications',
          'REST & real-time API integration',
          'Authentication and role-based access',
          'Offline-first data handling',
          'Bluetooth Low Energy (BLE) integration',
          'Push notifications & background services',
          'Modern UI/UX and responsive interaction'
        ],
        techStack: 'Flutter • React Native • Dart • TypeScript • REST APIs • BLE • Supabase'
      }
    },
    {
      num: '02',
      title: 'Web',
      category: 'Websites, Platforms & Business Systems',
      description: 'High-performance websites and full-stack applications engineered for businesses, organizations, and digital products.',
      icon: Globe,
      gradient: 'from-[#0284C7]/10 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#0284C7]',
      badge: 'FULL-STACK DEVELOPMENT',
      details: {
        subtitle: 'Web Capabilities',
        highlights: [
          'Modern responsive websites',
          'Full-stack web applications',
          'Server-side & static rendering',
          'REST APIs & backend services',
          'Database architecture',
          'Authentication & authorization',
          'Admin dashboards & analytics',
          'SEO, accessibility & performance optimization'
        ],
        techStack: 'Next.js • React • TypeScript • Tailwind CSS • Node.js • PostgreSQL • Supabase'
      }
    },
    {
      num: '03',
      title: 'IoT',
      category: 'IoT, Automation & Sensor Systems',
      description: 'Connected devices and monitoring systems that collect, process, and communicate real-world data.',
      icon: Cpu,
      gradient: 'from-[#2563EB]/10 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#2563EB]',
      badge: 'CONNECTED SYSTEMS',
      details: {
        subtitle: 'IoT Capabilities',
        highlights: [
          'Wireless sensor nodes',
          'Environmental monitoring',
          'Device-to-device communication',
          'Wi-Fi, BLE, ESP-NOW & LoRa',
          'MQTT & WebSocket communication',
          'Real-time telemetry',
          'Remote device monitoring',
          'OTA firmware updates',
          'Automated triggers & actuator control'
        ],
        techStack: 'ESP32 • FreeRTOS • MQTT • WebSockets • InfluxDB • Grafana • Wi-Fi • BLE • LoRa'
      }
    },
    {
      num: '04',
      title: 'Electronics',
      category: 'PCB Design & Embedded Systems',
      description: 'From circuit concepts to working prototypes, we develop practical electronics around real hardware requirements.',
      icon: CircuitBoard,
      gradient: 'from-[#6366F1]/10 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#6366F1]',
      badge: 'EMBEDDED ENGINEERING',
      details: {
        subtitle: 'Electronics Capabilities',
        highlights: [
          'Circuit & schematic design',
          'Custom PCB development',
          'Multi-layer PCB layout',
          'Microcontroller-based systems',
          'Sensor & actuator interfacing',
          'Power management & motor control',
          'Embedded firmware (C/C++, MicroPython)',
          'Prototype assembly, testing & debugging'
        ],
        techStack: 'KiCad • ESP32 • STM32 • ARM Cortex • C/C++ • MicroPython • UART • SPI • I²C'
      }
    }
  ];

  const engineeringSteps = [
    {
      num: '01',
      title: 'Understand',
      sub: 'Requirements • Architecture • Constraints',
      desc: 'We first define what needs to be built, how it should behave, and what technical constraints need to be considered.',
      icon: Search
    },
    {
      num: '02',
      title: 'Design',
      sub: 'Architecture • Schematics • UI/UX • System Planning',
      desc: 'We turn the requirements into practical software architecture, hardware designs, interfaces, and implementation plans.',
      icon: PenTool
    },
    {
      num: '03',
      title: 'Build',
      sub: 'Development • PCB • Firmware • Integration',
      desc: 'Software, firmware, electronics, and physical prototypes are developed according to the project\'s actual requirements.',
      icon: Hammer
    },
    {
      num: '04',
      title: 'Test',
      sub: 'Debugging • Validation • Performance',
      desc: 'We test functionality, communication, hardware behavior, edge cases, and system performance before considering the solution complete.',
      icon: CheckCheck
    },
    {
      num: '05',
      title: 'Refine',
      sub: 'Optimization • Reliability • Iteration',
      desc: 'Real-world testing reveals what can be improved. We refine the design until the result is practical and dependable.',
      icon: RefreshCw
    }
  ];


  const studentSupportList = [
    'Project concept development',
    'System architecture',
    'Hardware selection',
    'Circuit & PCB guidance',
    'Embedded firmware support',
    'Web & mobile development',
    'IoT implementation',
    'Debugging & testing',
    'Documentation & technical presentation'
  ];

  return (
    <div className="relative pt-24 bg-white text-slate-800 overflow-hidden">
      {/* Scroll-Driven Interactive 30fps Frame Background */}
      <ScrollFrameBackground />

      {/* Light Circuit Grid Background Pattern */}
      <div className="bg-grid-pattern opacity-80" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-12">
        {/* Subtle Ambient Backlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#2563EB]/10 via-[#0284C7]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">

          {/* Main Hero Header: Official Logobg Brand Logo */}
          <div className="space-y-4 flex flex-col items-center">

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-extrabold text-[#2563EB] tracking-wider uppercase">
              <Sliders className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>ENGINEERING • SOFTWARE • HARDWARE</span>
            </div>

            {/* Prominent Official Logobg Emblem Display */}
            <div className="relative py-1 flex justify-center">
              <Image
                src="/logobg.png"
                alt="AWIE Brand Emblem Logo"
                width={560}
                height={360}
                className="w-auto h-36 sm:h-48 md:h-60 object-contain drop-shadow-md inline-block animate-float hover:scale-105 transition-transform duration-300 select-none cursor-pointer"
                priority
              />
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#2563EB] tracking-tight inline-block animate-float-delayed-1 hover:scale-105 transition-transform duration-300 select-none py-1">
              Ideas Engineered Into Reality.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-700 max-w-4xl mx-auto font-semibold leading-relaxed pt-1 inline-block animate-float-delayed-2 hover:scale-105 transition-transform duration-300 select-none">
              Building practical technology across <span className="text-slate-900 font-extrabold">Apps • Web • IoT • Electronics</span> — from digital products and business systems to connected devices and custom hardware.
            </p>

            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              We design, develop, prototype, and refine technology solutions with a focus on performance, reliability, and real-world usability.
            </p>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2563EB] text-white font-bold text-base transition-all hover:bg-[#1D4ED8] shadow-lg shadow-[#2563EB]/25 hover:scale-[1.02] w-full sm:w-auto"
            >
              <span>Explore AWIE Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/store"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-slate-100 border border-slate-300 hover:border-[#2563EB] text-slate-800 font-bold text-base transition-all hover:bg-slate-200 w-full sm:w-auto"
            >
              <span>Visit Electronics Store</span>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* What AWIE Does Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">CORE ENGINEERING DOMAINS</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">Technology Built Around the Problem</p>
          <p className="text-slate-600 text-sm font-medium leading-relaxed">
            AWIE works across four focused engineering domains. Each solution is developed around its actual requirements — whether it is a standalone application, a business platform, a connected device, or custom electronics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatWeDoCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group h-[400px] w-full perspective-1000 select-none"
              >
                {/* Flippable 3D Card Inner Wrapper that flips on hover */}
                <div className="w-full h-full relative transition-transform duration-700 transform-style-3d group-hover-flip">

                  {/* FRONT FACE (Light Theme) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden p-6 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-[#2563EB]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-[#2563EB] border border-blue-100 uppercase tracking-wider">
                          {card.badge}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs font-mono font-bold text-slate-400 block mb-0.5">{card.num} —</span>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
                          {card.title}
                        </h3>
                        <span className="text-xs text-[#2563EB] font-bold block">
                          {card.category}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563EB] relative z-10">
                      <span>Hover to inspect capabilities</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* BACK FACE (Dark Theme with rich domain details on hover) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-5 rounded-2xl bg-slate-950 border border-[#2563EB]/70 shadow-2xl shadow-blue-500/25 text-white flex flex-col justify-between overflow-hidden">
                    {/* Glowing corner gradient accent */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-[#2563EB]/25 rounded-full blur-2xl pointer-events-none" />

                    <div className="space-y-2.5 relative z-10">
                      {/* Back Header */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-blue-400" />
                          <h4 className="text-sm font-black text-white">{card.details.subtitle}</h4>
                        </div>
                        <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                          {card.badge}
                        </span>
                      </div>

                      {/* Capabilities Highlights */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 block">
                          Technical Capabilities:
                        </span>
                        <ul className="space-y-1 text-[10px] text-slate-300">
                          {card.details.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 leading-tight font-medium">
                              <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack Info */}
                      <div className="pt-1.5 border-t border-slate-800/80">
                        <span className="text-[9px] font-bold text-slate-400 block mb-0.5">
                          Technology:
                        </span>
                        <span className="text-[10px] font-mono text-blue-300 font-semibold leading-tight block">
                          {card.details.techStack}
                        </span>
                      </div>
                    </div>

                    {/* Back Action CTA Button */}
                    <div className="pt-2 border-t border-slate-800 relative z-10">
                      <Link
                        href="/products"
                        className="w-full py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5"
                      >
                        <span>Explore {card.title} →</span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How We Engineer Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">ENGINEERING APPROACH</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">From Concept to Working System</p>
          <p className="text-slate-600 text-sm font-medium leading-relaxed">
            Good engineering is more than making something work once. We design systems that can be tested, improved, maintained, and eventually taken further.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {engineeringSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-sm hover:border-[#2563EB] hover:bg-slate-950 hover:text-white hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-[#2563EB] group-hover:text-blue-400">{step.num} —</span>
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] group-hover:bg-blue-950 group-hover:border-blue-800 group-hover:text-blue-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-400 block mt-0.5 leading-tight">
                      {step.sub}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 group-hover:text-slate-300 font-medium leading-relaxed transition-colors">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section: GEM Lineup */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: GEM v1 Standard */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl hover:border-[#2563EB]/80 hover:shadow-2xl hover:shadow-[#2563EB]/20 transition-all duration-700 ease-out group relative overflow-hidden flex flex-col justify-between space-y-6">
            {/* Smooth Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1528] via-[#0E1E38] to-[#081020] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none" />
            
            {/* Ambient Corner Glows */}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
            <div className="absolute -bottom-12 -left-12 w-60 h-60 bg-blue-600/15 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

            <div className="space-y-4 relative z-10">
              {/* Top Bar */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-bold text-[#2563EB] group-hover:bg-blue-950 group-hover:border-blue-700/60 group-hover:text-blue-300 transition-all duration-500 ease-out">
                  <Zap className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400 transition-colors duration-500" />
                  <span>STANDARD EDITION</span>
                </div>
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-400 transition-colors duration-500">PRE-BOOKING OPEN SOON</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-white tracking-tight transition-colors duration-500">GEM v1</h2>
                <p className="text-[#2563EB] group-hover:text-blue-400 text-sm font-bold transition-colors duration-500">Desktop Companion, Engineered for Interaction</p>
                <p className="text-slate-600 group-hover:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium pt-1 transition-colors duration-500">
                  A compact interactive desktop companion built around an ESP32 architecture, combining expressive OLED interaction, touch input, dynamic lighting, wireless connectivity, and intelligent device control.
                </p>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-4 border-t border-slate-200 group-hover:border-slate-800/80 transition-colors duration-500 relative z-10">
              <Link
                href="/products/gem-buddy?version=v1"
                className="w-full block text-center py-3.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs sm:text-sm hover:bg-[#1D4ED8] transition-all duration-300 shadow-md shadow-[#2563EB]/20 group-hover:shadow-blue-500/25"
              >
                Explore GEM v1 Details →
              </Link>
            </div>
          </div>

          {/* Card 2: GEM v2 Pro Health & Motion */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl hover:border-[#2563EB]/80 hover:shadow-2xl hover:shadow-[#2563EB]/20 transition-all duration-700 ease-out group relative overflow-hidden flex flex-col justify-between space-y-6">
            {/* Smooth Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1528] via-[#0E1E38] to-[#081020] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none" />
            
            {/* Ambient Corner Glows */}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
            <div className="absolute -bottom-12 -left-12 w-60 h-60 bg-blue-600/15 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

            <div className="space-y-4 relative z-10">
              {/* Top Bar */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-bold text-[#2563EB] group-hover:bg-blue-950 group-hover:border-blue-700/60 group-hover:text-blue-300 transition-all duration-500 ease-out">
                  <HeartPulse className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400 transition-colors duration-500" />
                  <span>PRO HEALTH & MOTION EDITION</span>
                </div>
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-400 transition-colors duration-500">PRE-BOOKING OPEN SOON</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-white tracking-tight transition-colors duration-500">GEM v2 Pro</h2>
                <p className="text-[#2563EB] group-hover:text-blue-400 text-sm font-bold transition-colors duration-500">Advanced Biometric & Spatial Companion, Engineered for Vitality</p>
                <p className="text-slate-600 group-hover:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium pt-1 transition-colors duration-500">
                  An elevated desktop companion featuring integrated MAX30102 optical PPG pulse telemetry, infrared proximity sensing, dynamic pulse-synced illumination, and extended 1500mAh LiPo battery longevity.
                </p>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-4 border-t border-slate-200 group-hover:border-slate-800/80 transition-colors duration-500 relative z-10">
              <Link
                href="/products/gem-buddy?version=v2"
                className="w-full block text-center py-3.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs sm:text-sm hover:bg-[#1D4ED8] transition-all duration-300 shadow-md shadow-[#2563EB]/20 group-hover:shadow-blue-500/25"
              >
                Explore GEM v2 Pro Details →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Student Engineering Support Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl hover:bg-[#0B1528] hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-500 group relative overflow-hidden">
          {/* Subtle Ambient Corner Glow on Hover */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 group-hover:bg-blue-950 group-hover:border group-hover:border-blue-700/60 text-xs font-bold text-[#2563EB] group-hover:text-blue-300 transition-all duration-300">
                <GraduationCap className="w-4 h-4 text-[#2563EB] group-hover:text-blue-400 transition-colors" />
                <span>STUDENT ENGINEERING SUPPORT</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 group-hover:text-white tracking-tight transition-colors duration-300">
                Turn Your Project Idea Into a Working Prototype
              </h2>

              <p className="text-slate-600 group-hover:text-slate-300 text-sm sm:text-base leading-relaxed font-medium transition-colors duration-300">
                Technical guidance for computer science, electronics, and engineering students developing academic, final-year, and prototype projects.
              </p>

              {/* Support Includes List */}
              <div className="pt-2">
                <span className="text-xs font-extrabold text-slate-400 group-hover:text-blue-400 block mb-2 uppercase tracking-wider">Support includes:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {studentSupportList.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-700 group-hover:text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
              <Link
                href="/students"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#2563EB]/25 hover:scale-[1.02] w-full sm:w-auto"
              >
                <span>Explore Student Guidance →</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Final Bottom Call-to-Action */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-6 relative z-10 border-t border-slate-200">
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Have a Problem Worth Building?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
          From a digital product or business platform to an embedded system, IoT device, or custom electronics project — we turn technical requirements into practical solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#2563EB]/25 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/products"
            className="px-8 py-3.5 rounded-xl bg-slate-100 border border-slate-300 hover:border-[#2563EB] text-slate-800 font-extrabold text-sm transition-all w-full sm:w-auto justify-center"
          >
            <span>Explore AWIE Products</span>
          </Link>

          <Link
            href="/store"
            className="px-8 py-3.5 rounded-xl bg-slate-100 border border-slate-300 hover:border-[#2563EB] text-slate-800 font-extrabold text-sm transition-all w-full sm:w-auto justify-center"
          >
            <span>Visit Electronics Store</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
