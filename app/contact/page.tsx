'use client';

import { useState, useCallback, Suspense } from 'react';
import { Mail, Clock } from 'lucide-react';
import ContactScrollBackground from '@/components/ui/ContactScrollBackground';
import ServiceProposalWizard from '@/components/contact/ServiceProposalWizard';

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.96 0-1.74.78-1.74 1.74 0 .96.78 1.74 1.74 1.74.96 0 1.74-.78 1.74-1.74 0-.96-.78-1.74-1.74-1.74Z" />
    </svg>
  );
}

export default function ContactPage() {
  const [isTyping, setIsTyping] = useState(false);
  const [keystrokeCount, setKeystrokeCount] = useState(0);

  const handleKeystroke = useCallback(() => {
    setKeystrokeCount((c) => c + 1);
  }, []);

  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen relative overflow-hidden">
      {/* Scroll-driven call animation background */}
      <ContactScrollBackground isTyping={isTyping} keystrokeCount={keystrokeCount} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5 pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs sm:text-sm font-extrabold text-[#2563EB]">
            <Mail className="w-4 h-4 text-[#2563EB]" />
            <span>START A PROJECT WITH AWIE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight select-none py-1">
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">C</span>
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">o</span>
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">n</span>
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">t</span>
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">a</span>
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">c</span>
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">t</span>
            {' '}
            <span className="tracking-wider inline-flex">
              <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 bg-gradient-to-b from-blue-600 via-[#1D4ED8] to-indigo-950 bg-clip-text text-transparent cursor-default">
                A
              </span>
              <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:text-[#2563EB] cursor-default">
                W
              </span>
              <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 bg-gradient-to-b from-blue-600 via-[#1D4ED8] to-indigo-950 bg-clip-text text-transparent cursor-default">
                I
              </span>
              <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:text-[#2563EB] cursor-default">
                E
              </span>
            </span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
            Configure your technical requirements below. We engineer software platforms, mobile applications, IoT systems, and custom electronics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Inquiries Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-[#2563EB]/15 hover:bg-[#0B1528] hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/35 transition-all duration-300 space-y-5 relative overflow-hidden group">
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="space-y-2 relative z-10">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white transition-colors duration-300">Direct Inquiries</h2>
                <p className="text-xs text-slate-500 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-300">
                  Need immediate communication or have a partnership inquiry? Reach our team directly:
                </p>
              </div>

              <div className="space-y-3 text-xs relative z-10">
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-slate-950/80 group-hover:border-slate-800 transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-blue-100/80 text-[#2563EB] group-hover:bg-blue-950 group-hover:border group-hover:border-blue-700/60 group-hover:text-blue-400 transition-all duration-300 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 group-hover:text-slate-400 block text-[10px] font-bold uppercase tracking-wider transition-colors duration-300">Email Support</span>
                    <a href="mailto:awielabs@gmail.com" className="text-slate-900 group-hover:text-white font-mono font-bold text-xs hover:text-[#2563EB] transition-colors">awielabs@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-slate-950/80 group-hover:border-slate-800 transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-sky-100/80 text-[#0284C7] group-hover:bg-sky-950 group-hover:border group-hover:border-sky-700/60 group-hover:text-sky-400 transition-all duration-300 shrink-0">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 group-hover:text-slate-400 block text-[10px] font-bold uppercase tracking-wider transition-colors duration-300">Official LinkedIn</span>
                    <a 
                      href="https://www.linkedin.com/company/awie/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-900 group-hover:text-white font-mono font-bold text-xs hover:text-[#2563EB] transition-colors"
                    >
                      linkedin.com/company/awie
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* What Happens Next? Process Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#2563EB] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#2563EB]" />
                <span>What Happens After Submitting?</span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">Technical Scope Review</div>
                    <div className="text-slate-500 text-[11px] leading-snug">Our engineering team analyzes your requirements, hardware feasibility, and system architecture.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">Proposal & Milestone Quotation</div>
                    <div className="text-slate-500 text-[11px] leading-snug">You receive a breakdown of deliverables, development timeline, and transparent milestone pricing.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">Direct Engineering Kickoff</div>
                    <div className="text-slate-500 text-[11px] leading-snug">Regular progress updates, staging previews, and component delivery per agreed milestones.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Service Proposal Wizard in Suspense */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-10 rounded-3xl bg-white border border-slate-200 shadow-xl text-center text-xs text-slate-500">Loading proposal builder...</div>}>
              <ServiceProposalWizard onTypingChange={setIsTyping} onKeystroke={handleKeystroke} />
            </Suspense>
          </div>

        </div>

      </div>
    </div>
  );
}
