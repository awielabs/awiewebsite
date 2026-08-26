'use client';

import Image from 'next/image';

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen bg-white text-slate-800 flex flex-col justify-center overflow-hidden">
      
      {/* Light Circuit Grid Background Pattern */}
      <div className="bg-grid-pattern opacity-60 absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Content & Logo */}
        <div className="space-y-8 py-4">
          
          <div className="space-y-6">
            {/* Logo */}
            <div className="relative h-32 sm:h-40 w-auto flex items-start justify-start">
              <Image
                src="/logobg.png"
                alt="AWIE Logo"
                width={500}
                height={200}
                className="h-32 sm:h-40 w-auto object-contain"
                priority
              />
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              We are building <br />
              something <span className="text-[#2563EB]">amazing.</span>
            </h1>
            
            <div className="pt-2">
              <p className="text-xl sm:text-2xl text-slate-600 font-medium mb-1">Our website is under construction.</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#2563EB]">We'll be live soon!</p>
              <div className="w-16 h-1 bg-[#2563EB] mt-4 rounded-full"></div>
            </div>
          </div>
          
        </div>

        {/* Right Side: Empty Space for User's Video/Image */}
        <div className="w-full h-[500px] rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">
           <div className="text-center p-8">
              <p className="text-slate-400 font-bold mb-2">Right Side Space Reserved</p>
              <p className="text-slate-400 text-sm">Add your background video or image here</p>
           </div>
        </div>

      </div>
    </div>
  );
}
