'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Zap, Award, Cpu, Globe, Smartphone } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-[#06B6D4]">
            <span>ABOUT AWIE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
            Ideas Engineered <span className="text-[#3B82F6]">Into Reality</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            AWIE stands at the intersection of practical hardware engineering and modern full-stack software intelligence.
          </p>
        </div>

        {/* Intro Image Showcase */}
        <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden border border-slate-800 bg-white shadow-2xl p-6 text-center">
          <Image
            src="/intro.png"
            alt="AWIE Intro - Innovate Build Connect"
            width={600}
            height={500}
            className="w-full h-auto max-w-md mx-auto object-contain"
          />
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-[#3B82F6] flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Our Engineering Vision</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              To bridge the gap between embedded hardware and scalable cloud/mobile software, engineering functional technology that delivers real-world impact.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-[#06B6D4] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Rigorous Standards</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every line of code and microcontroller firmware is subjected to signal integrity, thermal stability, and edge-case error testing.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Practical Innovation</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We focus on building functional, reliable systems — avoiding over-hyped vaporware in favor of working physical and digital proof.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-10 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Partner with AWIE</h2>
          <p className="text-slate-400 text-sm">
            Ready to turn your idea into functional software, IoT hardware, or custom electronics?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-all shadow-lg shadow-[#2563EB]/25"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
