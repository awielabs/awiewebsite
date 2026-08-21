'use client';

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

export default function StudentsPage() {
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
      {/* Light Circuit Grid Background Pattern */}
      <div className="bg-grid-pattern opacity-80" />

      {/* Subtle Ambient Top Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#2563EB]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-24 sm:space-y-32 relative z-10">
        
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-8 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-xs sm:text-sm font-bold text-[#2563EB]">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
            <span>STUDENT MENTORSHIP PROGRAM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1.5 select-none py-1">
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

          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="text-[#2563EB] text-xl sm:text-2xl font-extrabold tracking-tight">
              Have a college project idea but don't know where to start?
            </p>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
              AWIE provides technical mentorship, hardware guidance, architecture planning, and debugging assistance for engineering and computer science students.
            </p>
          </div>
        </div>

        {/* Offerings Grid */}
        <div className="space-y-10 pt-8 border-t border-slate-200/80">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">End-to-End Capabilities</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight select-none py-1 animate-pop-in-out">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offerings.map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.title} 
                  href="/contact?interest=Student+Mentoring"
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-start hover:bg-slate-950 hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/25 hover:translate-y-[-4px] transition-all duration-300 group min-h-[190px] cursor-pointer"
                >
                  {/* Glowing corner gradient accent on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-[#2563EB]/10 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-[#2563EB]/30 transition-all duration-300" />

                  <div className="space-y-3 relative z-10">
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] group-hover:bg-blue-950 group-hover:border-blue-700/60 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 w-fit">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-white transition-colors duration-300">{item.title}</h3>
                    <p className="text-xs text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-300">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 sm:p-14 rounded-3xl bg-white border border-slate-200 text-center space-y-6 shadow-xl hover:bg-[#0B1528] hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-300 group relative overflow-hidden">
          {/* Subtle Ambient Corner Glow on Hover */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="space-y-3.5 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 group-hover:text-white tracking-tight transition-colors duration-300">
              Need Mentorship for Your Project?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-200 font-medium max-w-lg mx-auto leading-relaxed transition-colors duration-300">
              Tell us about your project topic, university guidelines, and where you need technical assistance.
            </p>
          </div>
          
          <div className="relative z-10 pt-1">
            <Link
              href="/contact?interest=Student+Mentoring"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-lg shadow-[#2563EB]/25 hover:scale-[1.02]"
            >
              <span>Get Project Guidance</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
