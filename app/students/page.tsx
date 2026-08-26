'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  Cpu, 
  Code2, 
  Bug, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import StudentScrollBackground from '@/components/ui/StudentScrollBackground';

export default function StudentsPage() {
  const [frameAlign, setFrameAlign] = useState<'left' | 'right'>('right');

  const offerings = [
    { title: 'Project Guidance', desc: 'Topic selection, feasibility study, and scope definition tailored to your engineering stream.', icon: BookOpen },
    { title: 'Architecture Planning', desc: 'System block diagrams, database schemas, and hardware-software connection topologies.', icon: Cpu },
    { title: 'Hardware Selection', desc: 'Choosing microcontrollers, sensors, actuators, and power modules suited for your budget.', icon: Cpu },
    { title: 'Coding Assistance', desc: 'Hands-on code reviews, modular firmware structure, and API integration mentoring.', icon: Code2 },
    { title: 'Debugging & Troubleshooting', desc: 'Resolving hardware circuit shorts, sensor noise, and software compilation issues.', icon: Bug },
    { title: 'IoT Prototyping', desc: 'Setting up local/cloud IoT MQTT brokers, sensor dashboards, and wireless links.', icon: Cpu },
    { title: 'Documentation Guidance', desc: 'Formatting project reports, system flowcharts, and technical specification sheets.', icon: FileText },
    { title: 'Testing & Validation', desc: 'Running systematic component tests, sensor calibration, and performance metrics.', icon: CheckCircle2 },
    { title: 'Viva Preparation', desc: 'Mock viva Q&A sessions, architecture defense coaching, and concept explanations.', icon: HelpCircle }
  ];

  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen relative overflow-hidden">
      {/* Scroll-Driven Alternating 5-Part Student Background */}
      <StudentScrollBackground onAlignChange={(align) => setFrameAlign(align)} />

      {/* Light Circuit Grid Background Pattern */}
      <div className="bg-grid-pattern opacity-80" />

      {/* Subtle Ambient Top Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#2563EB]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-20 sm:space-y-28 relative z-10">
        
        {/* Smooth Fade-In & Sliding Content Wrapper: Shifts opposite to animation frame position */}
        <div 
          className={`space-y-16 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
            frameAlign === 'right' 
              ? 'lg:max-w-[48%] lg:mr-auto lg:ml-0 opacity-100 translate-x-0' 
              : 'lg:max-w-[48%] lg:ml-auto lg:mr-0 opacity-100 translate-x-0'
          }`}
        >
          {/* Hero Header */}
          <div className="space-y-8 pt-4 sm:pt-8 text-left transition-all duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-xs sm:text-sm font-bold text-[#2563EB] shadow-sm">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
              <span>STUDENT MENTORSHIP PROGRAM</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 select-none py-1">
              <span className="inline-block animate-float hover:scale-105 transition-transform">
                Build.
              </span>
              <span className="inline-block animate-float-delayed-1 hover:scale-105 transition-transform">
                Learn.
              </span>
              <span className="inline-block animate-float-delayed-2 text-[#2563EB] hover:scale-105 transition-transform drop-shadow-sm">
                Understand.
              </span>
            </h1>

            <div className="space-y-3">
              <p className="text-[#2563EB] text-xl sm:text-2xl font-extrabold tracking-tight">
                Have a college project idea but don't know where to start?
              </p>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
                AWIE provides technical mentorship, hardware guidance, architecture planning, and debugging assistance for engineering and computer science students.
              </p>
            </div>
          </div>

          {/* Offerings Section */}
          <div className="space-y-8 pt-6 border-t border-slate-200/80">
            <div className="space-y-2">
              <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">End-to-End Capabilities</h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight select-none py-1">
                What{' '}
                <span className="tracking-wider">
                  <span className="bg-gradient-to-b from-blue-600 via-[#1D4ED8] to-indigo-950 bg-clip-text text-transparent">A</span>
                  <span>W</span>
                  <span className="bg-gradient-to-b from-blue-600 via-[#1D4ED8] to-indigo-950 bg-clip-text text-transparent">I</span>
                  <span>E</span>
                </span>{' '}
                Mentorship Provides
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offerings.map((item) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.title} 
                    href="/contact?interest=Student+Mentoring"
                    className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md relative overflow-hidden flex flex-col justify-start hover:bg-slate-950/95 hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#2563EB]/20 hover:translate-y-[-3px] transition-all duration-300 group min-h-[170px] cursor-pointer"
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-b from-[#2563EB]/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-[#2563EB]/30 transition-all duration-300" />

                    <div className="space-y-2.5 relative z-10">
                      <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] group-hover:bg-blue-950 group-hover:border-blue-700/60 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 w-fit">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-white transition-colors duration-300">{item.title}</h3>
                      <p className="text-xs text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-300">{item.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 text-left space-y-6 shadow-xl hover:bg-[#0B1528]/95 hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-70 h-70 bg-blue-500/15 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="space-y-3 relative z-10">
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 group-hover:text-white tracking-tight transition-colors duration-300">
                Need Mentorship for Your Project?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-200 font-medium leading-relaxed transition-colors duration-300">
                Tell us about your project topic, university guidelines, and where you need technical assistance.
              </p>
            </div>
            
            <div className="relative z-10 pt-1">
              <Link
                href="/contact?interest=Student+Mentoring"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-lg shadow-[#2563EB]/25 hover:scale-[1.02]"
              >
                <span>Get Project Guidance</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
