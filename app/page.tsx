'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Smartphone, 
  Globe, 
  Cpu, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  CircuitBoard, 
  GraduationCap, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function Home() {
  const whatWeDoCards = [
    {
      title: 'Apps',
      category: 'Mobile & Digital',
      description: 'Mobile applications and digital experiences crafted for performance, scalability, and intuitive UX.',
      icon: Smartphone,
      gradient: 'from-[#2563EB]/10 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#2563EB]',
      badge: 'iOS & Android',
      details: {
        subtitle: 'Full-Stack Mobile Engineering',
        highlights: [
          'Cross-Platform iOS & Android apps (Flutter / React Native)',
          'Hardware sync via Bluetooth Low Energy (BLE)',
          'Real-time cloud sync & offline-first data engines',
          'Modern UI/UX with smooth micro-interactions'
        ],
        techStack: 'Flutter • React Native • BLE • Supabase'
      }
    },
    {
      title: 'Web',
      category: 'Websites & Systems',
      description: 'Websites, web applications, and enterprise business systems engineered for reliability.',
      icon: Globe,
      gradient: 'from-[#0284C7]/10 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#0284C7]',
      badge: 'Full-Stack',
      details: {
        subtitle: 'High-Performance Web Platforms',
        highlights: [
          'Server-rendered & static apps with Next.js 16',
          'Interactive IoT telemetry & analytics portals',
          'Enterprise database design & secure APIs',
          'SEO-engineered, accessible & ultra-fast UX'
        ],
        techStack: 'Next.js 16 • TypeScript • Tailwind • PostgreSQL'
      }
    },
    {
      title: 'IoT',
      category: 'Connected Devices',
      description: 'Connected devices, environmental monitoring, smart automation, and real-time sensor pipelines.',
      icon: Cpu,
      gradient: 'from-[#2563EB]/10 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#2563EB]',
      badge: 'Hardware Sync',
      details: {
        subtitle: 'Real-Time Telemetry & Automation',
        highlights: [
          'Wireless sensor networks (Wi-Fi, BLE, ESP-NOW, LoRa)',
          'Low-latency bidirectional MQTT & WebSockets streaming',
          'Over-the-Air (OTA) remote firmware deployment',
          'Automated trigger rules & smart actuator control'
        ],
        techStack: 'ESP32 • FreeRTOS • MQTT • InfluxDB • Grafana'
      }
    },
    {
      title: 'Electronics',
      category: 'Embedded Engineering',
      description: 'Embedded systems, custom PCB prototypes, hardware kits, and turnkey electronics solutions.',
      icon: CircuitBoard,
      gradient: 'from-[#6366F1]/10 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#6366F1]',
      badge: 'Microcontrollers',
      details: {
        subtitle: 'Custom Schematics & Embedded PCB',
        highlights: [
          'Custom multi-layer schematic & precision PCB routing',
          'Embedded firmware in C/C++, ARM Cortex & STM32',
          'Analog/digital sensor conditioning & motor drivers',
          'Bench prototyping through production assembly'
        ],
        techStack: 'KiCad • STM32 • ESP32 • C/C++ • MicroPython'
      }
    }
  ];

  const gemBuddyFeatures = [
    'OLED Display Face',
    'ESP32 Microcontroller',
    'Touch Interaction',
    'Rechargeable Battery',
    'Wi-Fi Connectivity',
    'Dynamic LED Moods'
  ];

  const studentMentorshipPerks = [
    'Project Guidance & Topic Validation',
    'System Architecture Planning',
    'Hardware Component Selection',
    'Software Coding Assistance & Code Reviews',
    'Circuit Debugging & Hardware Troubleshooting',
    'IoT Prototyping & Sensor Calibration',
    'Project Documentation & Report Guidance',
    'System Testing & Performance Tuning',
    'Viva Preparation & Technical Q&A Coaching'
  ];

  return (
    <div className="relative pt-24 bg-white text-slate-800 overflow-hidden">
      {/* Light Circuit Grid Background Pattern */}
      <div className="bg-grid-pattern opacity-80" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-12">
        {/* Subtle Ambient Backlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#2563EB]/10 via-[#0284C7]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Main Hero Header: Official Logobg Brand Logo */}
          <div className="space-y-4 flex flex-col items-center">
            
            {/* Prominent Official Logobg Emblem Display */}
            <div className="relative py-2 flex justify-center">
              <Image
                src="/logobg.png"
                alt="AWIE Brand Emblem Logo"
                width={560}
                height={360}
                className="w-auto h-40 sm:h-52 md:h-64 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <p className="text-2xl sm:text-4xl font-black text-[#2563EB] tracking-tight">
              Ideas Engineered Into Reality.
            </p>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-5xl mx-auto font-semibold leading-relaxed pt-1 md:whitespace-nowrap">
              Building practical technology solutions across <span className="text-slate-900 font-extrabold whitespace-nowrap">APPS • WEB • IoT • ELECTRONICS</span>
            </p>
          </div>

          {/* Official Banner Image Display */}
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-200 shadow-xl group transition-all duration-300 hover:border-[#2563EB] bg-white mt-4">
            <Image
              src="/banner.png"
              alt="AWIE Banner - Apps, Web, IoT, Electronics"
              width={1200}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
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
          <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">Core Engineering Domains</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">What AWIE Does</p>
          <p className="text-slate-600 text-sm font-medium">Four focused pillars of modern digital and hardware engineering. Hover over any domain to inspect capabilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatWeDoCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group h-[385px] w-full perspective-1000 select-none"
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
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {card.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
                          {card.title}
                        </h3>
                        <span className="text-xs text-[#2563EB] font-bold">
                          {card.category}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563EB]">
                      <span>Hover to inspect</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* BACK FACE (Dark Theme with rich domain details on hover) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-6 rounded-2xl bg-slate-950 border border-[#2563EB]/70 shadow-2xl shadow-blue-500/25 text-white flex flex-col justify-between overflow-hidden">
                    {/* Glowing corner gradient accent */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-[#2563EB]/25 rounded-full blur-2xl pointer-events-none" />

                    <div className="space-y-3 relative z-10">
                      {/* Back Header */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-blue-400" />
                          <h4 className="text-base font-black text-white">{card.title} Architecture</h4>
                        </div>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                          {card.badge}
                        </span>
                      </div>

                      {/* Capabilities Highlights */}
                      <div className="space-y-1.5 pt-0.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 block">
                          Capabilities:
                        </span>
                        <ul className="space-y-1.5 text-[11px] text-slate-300">
                          {card.details.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 leading-tight font-medium">
                              <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack Info */}
                      <div className="pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                          Technologies:
                        </span>
                        <span className="text-[11px] font-mono text-blue-300 font-semibold leading-tight block">
                          {card.details.techStack}
                        </span>
                      </div>
                    </div>

                    {/* Back Action CTA Button */}
                    <div className="pt-2.5 border-t border-slate-800 relative z-10">
                      <Link
                        href="/products"
                        className="w-full py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5"
                      >
                        <span>Explore {card.title} Products</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section: GEM Buddy */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl relative overflow-hidden">
          {/* Glow Backdrop */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-bold text-[#2563EB]">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>LAUNCHING SOON — PRE-BOOKING OPEN SOON</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                GEM v1
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                An autonomous desktop companion built on ESP32 micro-controller architecture. Features touch interactions, OLED expressive faces, smart lamp control, dynamic mood LED sync, and companion mobile app support.
              </p>

              {/* Feature Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {gemBuddyFeatures.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/products/gem-buddy"
                  className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-all shadow-md shadow-[#2563EB]/20 flex items-center gap-2"
                >
                  <span>Explore GEM Buddy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact?interest=Pre-Booking+GEM+Buddy"
                  className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-[#2563EB] text-slate-800 font-bold text-xs transition-all flex items-center gap-2"
                >
                  <span>Register Pre-Booking</span>
                </Link>
              </div>
            </div>

            {/* Right Product Image Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-sm w-full space-y-4 text-center">
                <div className="w-full h-56 rounded-2xl bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
                  <Image
                    src="/logo.jpeg"
                    alt="GEM Buddy Product Visual"
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-[10px] font-mono text-emerald-400 border border-slate-800">
                    ESP32 ACTIVE • OLED READY
                  </div>
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-extrabold text-[#2563EB] tracking-wider uppercase block">PHYSICAL HARDWARE PROTOTYPE</span>
                  <h3 className="text-lg font-black text-slate-900">GEM Desktop Companion</h3>
                  <p className="text-xs text-slate-500 font-medium">Standard Edition & Biometric Pro Edition coming soon.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Mentorship Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-slate-50 border border-slate-200 shadow-xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 text-xs font-bold text-[#2563EB]">
                <GraduationCap className="w-4 h-4" />
                <span>STUDENT MENTORSHIP & TECHNICAL GUIDANCE</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Academic & Final Year Project Guidance
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                We empower computer science, electronics, and engineering students to turn ambitious project concepts into fully functional, high-scoring final year capstones.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
                {studentMentorshipPerks.map((perk) => (
                  <div key={perk} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-extrabold text-[#2563EB] uppercase">Ready for Project Coaching?</span>
              <h3 className="text-lg font-black text-slate-900">Get Expert Guidance</h3>
              <p className="text-xs text-slate-500 font-medium">Submit your project idea or request topic recommendations.</p>
              
              <Link
                href="/students"
                className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs transition-all shadow-md shadow-[#2563EB]/25"
              >
                Explore Student Mentorship
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Final Bottom Call-to-Action */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-6 relative z-10 border-t border-slate-200">
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Ready to Build Your Next Solution?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium">
          Whether you need a custom web platform, a mobile application, IoT micro-controller firmware, or genuine electronics hardware components — AWIE is ready.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#2563EB]/25 flex items-center gap-2"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/store"
            className="px-8 py-3.5 rounded-xl bg-slate-100 border border-slate-300 hover:border-[#2563EB] text-slate-800 font-extrabold text-sm transition-all"
          >
            <span>Visit Electronics Store</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
