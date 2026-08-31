'use client';

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md transition-all duration-300">
      {/* Ambient Pulsing Glow */}
      <div className="absolute w-72 h-72 bg-[#2563EB]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Animated Brand Logo Container */}
        <div className="relative flex items-center justify-center">
          {/* Rotating Blue Spinner Ring */}
          <div className="w-20 h-20 rounded-3xl border-3 border-blue-100 border-t-[#2563EB] animate-spin" />
          
          {/* Logo Card */}
          <div className="absolute w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-lg flex items-center justify-center p-2">
            <Image
              src="/logo.jpeg"
              alt="AWIE Loading"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Text Feedback */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-black text-lg text-slate-900 tracking-tight">AWIE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-ping" />
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}
