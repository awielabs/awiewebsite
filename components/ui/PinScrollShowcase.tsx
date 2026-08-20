'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Smartphone, Globe, Layers, ArrowRight, Code, ShieldCheck, Activity, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function PinScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate active panel step (0, 1, 2, 3) based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value < 0.25) {
        setActiveStep(0);
      } else if (value < 0.50) {
        setActiveStep(1);
      } else if (value < 0.75) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const showcasePanels = [
    {
      id: '01',
      tag: 'SOFTWARE ARCHITECTURE',
      title: 'We design with purpose.',
      subtitle: 'Custom Web SaaS, enterprise portals, and high-performance cloud backends.',
      icon: Globe,
      color: '#2563EB',
      screenTitle: 'AWIE Web Platform',
      screenDescription: 'Elevate digital experiences with Next.js 16, TypeScript & Supabase pipelines.',
      stats: [
        { label: 'Latency', val: '< 45ms' },
        { label: 'Uptime', val: '99.99%' },
        { label: 'Security', val: 'TLS + Audit' }
      ]
    },
    {
      id: '02',
      tag: 'MOBILE & DIGITAL',
      title: 'Elevate digital experiences.',
      subtitle: 'Intuitive cross-platform Flutter and React Native applications with real-time sync.',
      icon: Smartphone,
      color: '#0284C7',
      screenTitle: 'GEM Companion App',
      screenDescription: 'Real-time telemetry, touch expressions, & wireless control for desktop hardware.',
      stats: [
        { label: 'FPS', val: '60 FPS' },
        { label: 'Sync Rate', val: '100ms' },
        { label: 'Platform', val: 'iOS / Android' }
      ]
    },
    {
      id: '03',
      tag: 'IoT & EMBEDDED PIPELINES',
      title: 'Build interfaces that connect.',
      subtitle: 'ESP32, STM32, and ARM microcontroller firmware streaming live sensor telemetry.',
      icon: Cpu,
      color: '#6366F1',
      screenTitle: 'ESP32 Sensor Gateway',
      screenDescription: 'Real-time WebSocket telemetry, OLED facial expressions, & remote MQTT triggers.',
      stats: [
        { label: 'Baud', val: '115200' },
        { label: 'Wi-Fi', val: '2.4 GHz' },
        { label: 'BLE', val: 'v4.2 Active' }
      ]
    },
    {
      id: '04',
      tag: 'TURNKEY HARDWARE',
      title: 'Driven by ideas. Defined by details.',
      subtitle: 'Custom PCB schematics, component selection, and end-to-end device assembly.',
      icon: Layers,
      color: '#10B981',
      screenTitle: 'AWIE Hardware Lab',
      screenDescription: 'Lab-tested components, 105+ stock items, & custom prototype development.',
      stats: [
        { label: 'PCB Layers', val: '2 to 6 Layer' },
        { label: 'Testing', val: '100% Tested' },
        { label: 'Dispatch', val: 'Express' }
      ]
    }
  ];

  const currentPanel = showcasePanels[activeStep];

  return (
    <section ref={containerRef} className="relative bg-slate-950 text-white min-h-[320vh]">
      
      {/* Sticky Pin Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden px-6 py-10">
        
        {/* Top Header Badge Row */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-20 border-b border-slate-800/80 pb-4">
          
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono uppercase">
              PIN<span className="text-[#2563EB]">.ANIMATION</span>
            </span>
          </div>

          {/* GSAP / Scroll Sequence Indicator matching reference */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-[11px] font-mono">
            <span className="text-slate-400">scroll</span>
            <span className="text-slate-600">→</span>
            <span className="text-amber-400 font-bold">pin</span>
            <span className="text-slate-600">→</span>
            <span className="text-blue-400 font-bold">scrub</span>
            <span className="text-slate-600">→</span>
            <span className="text-emerald-400 font-bold">release</span>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Step <span className="text-[#2563EB] font-bold">0{activeStep + 1}</span> / 04
          </div>

        </div>

        {/* Central Grid: Left Info Panel + Center PINNED Card + Right Step Tracker */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 py-4 z-20">
          
          {/* Left Text / Info Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-xs font-mono font-bold text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>{currentPanel.tag}</span>
            </div>

            <div className="space-y-2">
              <span className="text-3xl font-black text-slate-600 font-mono block">{currentPanel.id} —</span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {currentPanel.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              {currentPanel.subtitle}
            </p>

            <div className="pt-2">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-all shadow-lg shadow-[#2563EB]/25"
              >
                <span>Explore Domain</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Center PINNED Device Frame (Replicating exact card from image) */}
          <div className="lg:col-span-8 flex justify-center">
            <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden relative group">
              
              {/* Window Header Bar */}
              <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-bold text-slate-400 ml-2">AWIE LABS // SCREEN PIN</span>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
                  <span className="hover:text-white cursor-pointer">HOME</span>
                  <span className="hover:text-white cursor-pointer">WORK</span>
                  <span className="hover:text-white cursor-pointer">SERVICES</span>
                  <span className="hover:text-white cursor-pointer">CONTACT</span>
                </div>
              </div>

              {/* Window Content Display */}
              <div className="p-8 sm:p-10 space-y-6 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
                
                {/* Glow Backdrop Accent */}
                <div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500"
                  style={{ backgroundColor: currentPanel.color }}
                />

                <div className="space-y-4 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                    <Activity className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>PIN ACTIVE • SCRUB SCROLLING</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    {currentPanel.screenTitle}
                  </h2>

                  <p className="text-xs sm:text-base text-slate-400 font-medium max-w-lg leading-relaxed">
                    {currentPanel.screenDescription}
                  </p>
                </div>

                {/* Telemetry / Metrics Row inside screen */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 relative z-10">
                  {currentPanel.stats.map((stat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">{stat.label}</span>
                      <span className="text-sm font-extrabold text-white font-mono">{stat.val}</span>
                    </div>
                  ))}
                </div>

                {/* Code Snippet Box matching image GSAP block */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1 relative z-10">
                  <div className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>GSAP + SCROLLTRIGGER</span>
                  </div>
                  <pre className="text-slate-300 text-[10px] leading-snug overflow-x-auto">
{`gsap.to(".awie-panel", {
  scrollTrigger: {
    pin: true,
    scrub: 1,
    end: "+=300%"
  }
});`}
                  </pre>
                </div>

              </div>

              {/* Bottom Screen Bar */}
              <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>PIN: ELEMENT STAYS FIXED</span>
                <span>AWIE DIGITAL EXPERIENCES</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Step Indicator Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-t border-slate-800/80 pt-4 z-20">
          <div className="flex items-center gap-2">
            {showcasePanels.map((p, idx) => (
              <div
                key={p.id}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeStep === idx ? 'w-8 bg-[#2563EB]' : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400">
            Keep it <span className="text-amber-400 font-bold">fixed</span>. Let everything else <span className="text-blue-400 font-bold">move</span>.
          </div>
        </div>

      </div>

    </section>
  );
}
