'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 85;

export default function ComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Preload all frames
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let count = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = document.createElement('img');
      img.src = `/cs-frames/csf_${String(i).padStart(3, '0')}.webp`;
      img.onload = () => { count++; setLoadedCount(count); };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img?.complete) return;
    const cw = canvas.width, ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);
    const ir = img.width / img.height, cr = cw / ch;
    let dw = cw, dh = ch, ox = 0, oy = 0;
    if (cr > ir) { dh = cw / ir; oy = (ch - dh) / 2; }
    else { dw = ch * ir; ox = (cw - dw) / 2; }
    ctx.drawImage(img, ox, oy, dw, dh);
  };

  // Auto-play at 30fps
  useEffect(() => {
    if (loadedCount < TOTAL_FRAMES) return;
    const FPS = 30;
    const interval = 1000 / FPS;
    let last = 0;
    const tick = (now: number) => {
      if (now - last >= interval) {
        last = now;
        currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
        drawFrame(currentFrameRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loadedCount]);

  // Resize canvas
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loadedCount]);

  return (
    <>
      <style>{`
        /* ── Staggered pop-in on load ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Continuous gentle floating ── */
        @keyframes floatY {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-8px); }
        }
        .float-1 {
          opacity: 0;
          animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s forwards,
                     floatY 5s ease-in-out 1.2s infinite;
        }
        .float-2 {
          opacity: 0;
          animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.6s forwards,
                     floatY 6s ease-in-out 1.6s infinite;
        }
        .float-3 {
          opacity: 0;
          animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 1.0s forwards,
                     floatY 5.5s ease-in-out 2.0s infinite;
        }
        .float-4 {
          opacity: 0;
          animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 1.4s forwards,
                     floatY 4.5s ease-in-out 2.4s infinite;
        }

        /* ── Hover: clean scale pop only, no glow ── */
        .hover-pop {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
          cursor: default;
        }
        .hover-pop:hover {
          transform: scale(1.05) translateY(-4px);
        }

        /* ── Dashed loading line ── */
        @keyframes dashSweep {
          0%   { width: 0%;   opacity: 1; }
          80%  { width: 100%; opacity: 1; }
          90%  { width: 100%; opacity: 0.3; }
          100% { width: 0%;   opacity: 1; }
        }
        .dash-track {
          position: relative;
          width: 220px;
          height: 3px;
          background: rgba(37,99,235,0.15);
          border-radius: 999px;
          overflow: hidden;
        }
        .dash-fill {
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #1D4ED8, #3B82F6, #93C5FD);
          animation: dashSweep 2.4s ease-in-out infinite;
        }
      `}</style>

      <div className="relative min-h-screen flex flex-col justify-center overflow-hidden">

        {/* Full-screen animated frame background — fully vivid, no heavy overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <canvas ref={canvasRef} className="w-full h-full" />
          {/* Very light white tint — keeps frames crystal clear */}
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">

          <div className="space-y-8">
            <div className="space-y-6">

              {/* Logo */}
              <div className="float-1 inline-block hover-pop">
                <Image
                  src="/logobg.png"
                  alt="AWIE Logo"
                  width={500}
                  height={200}
                  className="h-32 sm:h-40 w-auto object-contain"
                  priority
                />
              </div>

              {/* Heading — dark navy for max visibility on light bg */}
              <h1 className="float-2 hover-pop text-4xl sm:text-6xl font-black text-[#0F172A] tracking-tight leading-tight">
                We are building <br />
                something <span className="text-[#2563EB]">amazing.</span>
              </h1>

              {/* Sub text */}
              <div className="float-3 hover-pop pt-2 space-y-1">
                <p className="text-xl sm:text-2xl text-[#334155] font-medium">
                  Our website is under construction.
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-[#2563EB]">
                  We&apos;ll be live soon!
                </p>
              </div>

              {/* Animated dashed loading line */}
              <div className="float-4 dash-track">
                <div className="dash-fill" />
              </div>

            </div>
          </div>

          <div className="hidden lg:block" />

        </div>
      </div>
    </>
  );
}
