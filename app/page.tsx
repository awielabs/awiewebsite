'use client';

import Image from 'next/image';

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen bg-white text-slate-800 flex flex-col justify-center overflow-hidden pt-20">
      
      {/* Light Circuit Grid Background Pattern */}
      <div className="bg-grid-pattern opacity-60 absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Content & Logo */}
        <div className="space-y-8 py-12">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-[#2563EB] tracking-widest uppercase">
            <span>Website Upgrade in Progress</span>
          </div>

          <div className="space-y-6">
            {/* Logo */}
            <div className="relative h-24 w-auto flex items-start justify-start">
              <Image
                src="/logobg.png"
                alt="AWIE Logo"
                width={300}
                height={100}
                className="h-24 w-auto object-contain"
                priority
              />
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              We are building <br />
              something <span className="text-[#2563EB]">amazing.</span>
            </h1>
            
            <p className="text-lg text-slate-600 font-medium max-w-lg leading-relaxed">
              Our new website is currently under construction. We are preparing a seamless experience for you to explore our Apps, Web systems, IoT platforms, and Electronics hardware.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              AWIE LABS • Innovate • Build • Connect
            </p>
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
