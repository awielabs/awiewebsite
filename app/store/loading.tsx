'use client';

import Image from 'next/image';

export default function StoreLoading() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-6">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="w-24 h-24 rounded-full border-4 border-blue-100 border-t-[#2563EB] animate-spin" />
        
        <div className="absolute p-3 bg-white rounded-2xl border border-slate-200 shadow-md">
          <Image
            src="/store-logo.png"
            alt="AWIE Store Loading"
            width={70}
            height={24}
            className="h-6 w-auto object-contain"
            priority
          />
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-xs font-extrabold text-[#2563EB] tracking-widest uppercase animate-pulse">
          Loading AWIE Hardware Catalog...
        </p>
        <p className="text-[11px] text-slate-400 font-medium">Fetching genuine components & microcontrollers</p>
      </div>
    </div>
  );
}
