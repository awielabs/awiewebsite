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
  AlertTriangle,
  HelpCircle
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
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#06B6D4]">
            <GraduationCap className="w-4 h-4" />
            <span>STUDENT MENTORSHIP PROGRAM</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
            Build. Learn. <span className="text-[#3B82F6]">Understand.</span>
          </h1>

          <p className="text-[#06B6D4] text-lg font-semibold">
            Have a college project idea but don't know where to start?
          </p>

          <p className="text-slate-400 text-base leading-relaxed">
            AWIE provides technical mentorship, hardware guidance, architecture planning, and debugging assistance for engineering and computer science students.
          </p>
        </div>

        {/* Core Statement Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-amber-500/30 text-slate-300 space-y-4">
          <div className="flex items-center gap-3 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>OUR MENTORSHIP POLICY & ACADEMIC INTEGRITY DISCLAIMER</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
            AWIE provides technical mentorship, guidance, debugging support, component sourcing, and architecture coaching. We empower students to build, understand, and defend their own engineering work — we do <strong>not</strong> engage in complete academic submission completion.
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-white">What AWIE Mentorship Provides</h2>
            <p className="text-xs text-slate-400">Step-by-step guidance from concept to working prototype</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offerings.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-[#3B82F6] w-fit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
          <h2 className="text-2xl font-bold text-white">Need Mentorship for Your Project?</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Tell us about your project topic, university guidelines, and where you need technical assistance.
          </p>
          <div>
            <Link
              href="/contact?interest=Student+Mentoring"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2563EB] text-white font-semibold text-sm hover:bg-[#1D4ED8] transition-all shadow-lg shadow-[#2563EB]/25"
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
