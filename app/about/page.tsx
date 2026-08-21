'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Zap, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Globe, 
  Smartphone, 
  CircuitBoard,
  ChevronRight
} from 'lucide-react';

export default function AboutPage() {
  const corePillars = [
    {
      title: 'Our Engineering Vision',
      desc: 'To bridge the gap between embedded hardware and scalable cloud/mobile software, engineering functional technology that delivers real-world impact.',
      icon: Zap,
      accent: 'text-[#2563EB]',
      badgeBg: 'bg-blue-50 border-blue-100',
      hoverAccent: 'group-hover:bg-blue-950 group-hover:border-blue-700/60 group-hover:text-blue-400'
    },
    {
      title: 'Rigorous Standards',
      desc: 'Every line of code and microcontroller firmware is subjected to signal integrity, thermal stability, and edge-case error testing.',
      icon: ShieldCheck,
      accent: 'text-[#0284C7]',
      badgeBg: 'bg-sky-50 border-sky-100',
      hoverAccent: 'group-hover:bg-sky-950 group-hover:border-sky-700/60 group-hover:text-sky-400'
    },
    {
      title: 'Practical Innovation',
      desc: 'We focus on building functional, reliable systems — avoiding over-hyped vaporware in favor of working physical and digital proof.',
      icon: Award,
      accent: 'text-indigo-600',
      badgeBg: 'bg-indigo-50 border-indigo-100',
      hoverAccent: 'group-hover:bg-indigo-950 group-hover:border-indigo-700/60 group-hover:text-indigo-400'
    }
  ];

  const domains = [
    {
      title: 'Mobile Apps',
      desc: 'Intuitive iOS & Android apps synced with cloud & hardware sensors.',
      icon: Smartphone
    },
    {
      title: 'Web Platforms',
      desc: 'Ultra-fast Next.js portals, IoT telemetry dashboards, and cloud APIs.',
      icon: Globe
    },
    {
      title: 'IoT Networks',
      desc: 'Connected sensor nodes, low-latency MQTT brokers, and telemetry.',
      icon: Cpu
    },
    {
      title: 'Embedded PCB',
      desc: 'Custom schematics, multi-layer circuit boards, and microcontrollers.',
      icon: CircuitBoard
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen relative overflow-hidden">
      {/* Light Circuit Grid Background Pattern */}
      <div className="bg-grid-pattern opacity-80" />

      {/* Subtle Ambient Top Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#2563EB]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-20 sm:space-y-28 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-xs sm:text-sm font-bold text-[#2563EB]">
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <span>ABOUT AWIE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Ideas Engineered <span className="bg-gradient-to-r from-[#2563EB] to-[#0284C7] bg-clip-text text-transparent">Into Reality</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium max-w-3xl mx-auto">
            AWIE stands at the intersection of practical hardware engineering and modern full-stack software intelligence, turning ambitious technical concepts into reliable, production-ready systems.
          </p>
        </div>

        {/* Intro Image Showcase */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl hover:shadow-2xl hover:border-[#2563EB] transition-all duration-300 p-6 sm:p-8 text-center relative group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-b from-[#2563EB]/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-[#2563EB]/20 transition-all duration-300" />
          <Image
            src="/intro.png"
            alt="AWIE Intro - Innovate Build Connect"
            width={700}
            height={550}
            className="w-full h-auto max-w-2xl mx-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            priority
          />
        </div>

        {/* Core Pillars */}
        <div className="space-y-10 pt-4">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">Core Principles</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How We Build & Engineer
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {corePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.title} 
                  className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4 shadow-sm relative overflow-hidden flex flex-col justify-start hover:bg-slate-950 hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/25 hover:translate-y-[-4px] transition-all duration-300 group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-[#2563EB]/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-[#2563EB]/30 transition-all duration-300" />
                  
                  <div className="space-y-3 relative z-10">
                    <div className={`p-3 rounded-xl ${pillar.badgeBg} border ${pillar.accent} ${pillar.hoverAccent} group-hover:scale-110 transition-all duration-300 w-fit`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-white transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-300">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Domains Overview */}
        <div className="space-y-10 pt-8 border-t border-slate-200">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">Multi-Disciplinary Expertise</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Full Spectrum Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((dom) => {
              const Icon = dom.icon;
              return (
                <div
                  key={dom.title}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-start hover:bg-slate-950 hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#2563EB]/20 hover:translate-y-[-3px] transition-all duration-300 group"
                >
                  <div className="space-y-3 relative z-10">
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] group-hover:bg-blue-950 group-hover:border-blue-700/60 group-hover:text-blue-400 transition-all duration-300 w-fit">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-300">
                      {dom.title}
                    </h4>
                    <p className="text-xs text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-300">
                      {dom.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-10 sm:p-14 rounded-3xl bg-white border border-slate-200 text-center space-y-6 shadow-xl hover:bg-[#0B1528] hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="space-y-3.5 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 group-hover:text-white tracking-tight transition-colors duration-300">
              Partner with AWIE
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-200 font-medium max-w-lg mx-auto leading-relaxed transition-colors duration-300">
              Ready to turn your idea into functional software, IoT hardware, or custom electronics? Let's build together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-lg shadow-[#2563EB]/25 hover:scale-[1.02] w-full sm:w-auto"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-slate-100 border border-slate-300 hover:border-[#2563EB] text-slate-800 font-bold text-sm transition-all hover:bg-slate-200 w-full sm:w-auto"
            >
              <span>Explore Products</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
