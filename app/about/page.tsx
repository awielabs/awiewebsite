'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Lightbulb, 
  Wrench, 
  Target, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Globe, 
  Smartphone, 
  CircuitBoard,
  Building2,
  FlaskConical,
  ChevronRight
} from 'lucide-react';

export default function AboutPage() {
  const corePillars = [
    {
      id: 'understand',
      title: 'Understand the Problem',
      desc: 'We start with the actual requirement, whether it is a software platform, electronic product, IoT system, or something completely different.',
      icon: Lightbulb,
      accent: 'text-[#2563EB]',
      badgeBg: 'bg-blue-50 border-blue-100',
      hoverAccent: 'group-hover:bg-blue-950 group-hover:border-blue-700/60 group-hover:text-blue-400',
      imgSrc: '/intro.png',
      imgAlt: 'AWIE Understand the Problem - Analyzing project requirements'
    },
    {
      id: 'purpose',
      title: 'Build With Purpose',
      desc: 'We select the right technologies, components, and architecture based on what the project actually needs — not simply because a technology is available.',
      icon: Wrench,
      accent: 'text-[#0284C7]',
      badgeBg: 'bg-sky-50 border-sky-100',
      hoverAccent: 'group-hover:bg-sky-950 group-hover:border-sky-700/60 group-hover:text-sky-400',
      imgSrc: '/intro.png',
      imgAlt: 'AWIE Build With Purpose - Purposeful engineering architecture'
    },
    {
      id: 'work',
      title: 'Make It Work',
      desc: 'Our focus is on functional, reliable solutions that can be tested, improved, and used in the real world.',
      icon: Target,
      accent: 'text-indigo-600',
      badgeBg: 'bg-indigo-50 border-indigo-100',
      hoverAccent: 'group-hover:bg-indigo-950 group-hover:border-indigo-700/60 group-hover:text-indigo-400',
      imgSrc: '/intro.png',
      imgAlt: 'AWIE Make It Work - Working physical and digital solutions'
    }
  ];

  const domains = [
    {
      id: 'mobile',
      title: 'Mobile Applications',
      desc: 'Modern mobile applications designed for businesses, services, products, and custom ideas.',
      icon: Smartphone,
      imgSrc: '/intro.png'
    },
    {
      id: 'web',
      title: 'Web Platforms',
      desc: 'Websites, dashboards, portals, internal tools, APIs, and full-stack applications built around specific requirements.',
      icon: Globe,
      imgSrc: '/intro.png'
    },
    {
      id: 'iot',
      title: 'IoT & Connected Systems',
      desc: 'Sensor-based systems, monitoring solutions, wireless devices, MQTT systems, and connected hardware for real-world applications.',
      icon: Cpu,
      imgSrc: '/intro.png'
    },
    {
      id: 'embedded',
      title: 'Embedded & Electronics',
      desc: 'Custom PCBs, microcontroller systems, electronic circuits, sensor modules, prototypes, and purpose-built hardware.',
      icon: CircuitBoard,
      imgSrc: '/intro.png'
    },
    {
      id: 'business',
      title: 'Business & Industry Solutions',
      desc: 'Technology solutions for real-world environments such as hotels, businesses, institutions, automation, monitoring, and other specialized applications.',
      icon: Building2,
      imgSrc: '/intro.png'
    },
    {
      id: 'prototyping',
      title: 'Prototyping & Development',
      desc: 'From an early concept or circuit idea to a working prototype that can be tested and refined.',
      icon: FlaskConical,
      imgSrc: '/intro.png'
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

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
            AWIE builds practical technology across software, electronics, IoT, and digital systems — turning ideas into reliable solutions designed around the needs of each project.
          </p>
        </div>

        {/* Intro Visual Showcase */}
        <div className="max-w-md mx-auto rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md hover:shadow-lg hover:border-[#2563EB] transition-all duration-300 p-3 sm:p-4 text-center relative group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-b from-[#2563EB]/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-[#2563EB]/20 transition-all duration-300" />
          <Image
            src="/intro.png"
            alt="AWIE engineering team working across software, electronics and IoT projects"
            width={320}
            height={240}
            className="w-full h-auto max-w-[200px] sm:max-w-[240px] mx-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            priority
          />
        </div>

        {/* Core Principles Section */}
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
                  key={pillar.id} 
                  className="bg-white border border-slate-200 p-8 rounded-3xl space-y-6 shadow-sm relative overflow-hidden flex flex-col justify-between hover:bg-slate-950 hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/25 hover:translate-y-[-4px] transition-all duration-300 group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-[#2563EB]/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-[#2563EB]/30 transition-all duration-300" />
                  
                  <div className="space-y-4 relative z-10">
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

                  {/* Illustration Slot */}
                  <div className="pt-4 relative z-10">
                    <div className="w-full h-32 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:border-slate-800 flex items-center justify-center p-3 overflow-hidden transition-colors duration-300">
                      <Image
                        src={pillar.imgSrc}
                        alt={pillar.imgAlt}
                        width={200}
                        height={140}
                        className="w-auto h-full object-contain max-h-28 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What We Build / Multi-Disciplinary Expertise */}
        <div className="space-y-10 pt-8 border-t border-slate-200">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">What We Build</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Different Technologies. One Engineering Mindset.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {domains.map((dom) => {
              const Icon = dom.icon;
              return (
                <div
                  key={dom.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between hover:bg-slate-950 hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#2563EB]/20 hover:translate-y-[-3px] transition-all duration-300 group"
                >
                  <div className="space-y-4 relative z-10">
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] group-hover:bg-blue-950 group-hover:border-blue-700/60 group-hover:text-blue-400 transition-all duration-300 w-fit">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-white transition-colors duration-300">
                      {dom.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-300">
                      {dom.desc}
                    </p>
                  </div>

                  {/* Scene Image Container */}
                  <div className="pt-6 relative z-10">
                    <div className="w-full h-28 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:border-slate-800 flex items-center justify-center p-2 overflow-hidden transition-colors duration-300">
                      <Image
                        src={dom.imgSrc}
                        alt={`${dom.title} Scene`}
                        width={160}
                        height={100}
                        className="w-auto h-full object-contain max-h-24 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA — Have an Idea? Let's Build It. */}
        <div className="p-10 sm:p-14 rounded-3xl bg-white border border-slate-200 shadow-xl hover:bg-[#0B1528] hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* CTA Text */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-white tracking-tight transition-colors duration-300">
                Have an Idea? Let's Build It.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-200 font-medium max-w-xl leading-relaxed transition-colors duration-300">
                Whether you need a web platform, mobile application, IoT solution, custom electronics, or something entirely different, AWIE can help turn your concept into a working product.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-lg shadow-[#2563EB]/25 hover:scale-[1.02] w-full sm:w-auto"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-slate-100 border border-slate-300 hover:border-[#2563EB] text-slate-800 font-bold text-sm transition-all hover:bg-slate-200 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-700 w-full sm:w-auto"
                >
                  <span>Explore Products</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                </Link>
              </div>
            </div>

            {/* CTA Visual Scene */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="w-full max-w-xs h-40 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:border-slate-800 flex items-center justify-center p-4 overflow-hidden transition-colors duration-300">
                <Image
                  src="/intro.png"
                  alt="AWIE Idea to Engineering to Working Product"
                  width={240}
                  height={160}
                  className="w-auto h-full object-contain max-h-36 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
