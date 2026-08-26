'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 85;
const TARGET_DATE = new Date('2026-09-05T00:00:00').getTime();

export default function ComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Live Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, TARGET_DATE - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

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

        @keyframes popInGlow {
          0%   { opacity: 0; transform: translateX(-50%) scale(0.85) translateY(-20px); }
          60%  { opacity: 1; transform: translateX(-50%) scale(1.05) translateY(0); }
          100% { opacity: 1; transform: translateX(-50%) scale(1) translateY(0); }
        }

        /* ── Continuous gentle floating ── */
        @keyframes floatY {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-8px); }
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 12px 35px -5px rgba(37, 99, 235, 0.25), 0 0 25px rgba(37, 99, 235, 0.15); }
          50%      { box-shadow: 0 18px 45px -5px rgba(37, 99, 235, 0.40), 0 0 35px rgba(37, 99, 235, 0.30); }
        }

        .countdown-card {
          animation: popInGlow 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s forwards,
                     glowPulse 3.5s ease-in-out 1.0s infinite;
        }

        .float-1 {
          opacity: 0;
          animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s forwards,
                     floatY 5s ease-in-out 1.3s infinite;
        }
        .float-2 {
          opacity: 0;
          animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.7s forwards,
                     floatY 6s ease-in-out 1.7s infinite;
        }
        .float-3 {
          opacity: 0;
          animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 1.1s forwards,
                     floatY 5.5s ease-in-out 2.1s infinite;
        }
        .float-4 {
          opacity: 0;
          animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 1.5s forwards,
                     floatY 4.5s ease-in-out 2.5s infinite;
        }

        /* ── Hover: clean scale pop ── */
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

      <div className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12">

        {/* TOP CENTER LIVE GLOWING GLASS COUNTDOWN TIMER */}
        <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-20 countdown-card hover-pop">
          {/* Ambient subtle glow ring */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-blue-400/20 rounded-[28px] blur-md opacity-80" />
          
          <div className="relative bg-white/45 backdrop-blur-xl border border-white/80 rounded-3xl px-6 sm:px-9 py-3.5 sm:py-4.5 shadow-2xl flex flex-col items-center gap-1.5 min-w-[280px] sm:min-w-[430px]">
            {/* Header Badge */}
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black tracking-widest text-[#2563EB] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>LAUNCH COUNTDOWN • SEPT 5, 2026</span>
            </div>

            {/* Metric Blocks */}
            <div className="flex items-center gap-3.5 sm:gap-6 text-slate-900 font-extrabold pt-0.5">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl text-[#1D4ED8] font-black tracking-tight drop-shadow-sm">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-extrabold text-slate-600 tracking-wider">Days</span>
              </div>
              <span className="text-xl sm:text-2xl text-blue-400 font-light -mt-2.5">:</span>

              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl text-[#1D4ED8] font-black tracking-tight drop-shadow-sm">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-extrabold text-slate-600 tracking-wider">Hours</span>
              </div>
              <span className="text-xl sm:text-2xl text-blue-400 font-light -mt-2.5">:</span>

              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl text-[#1D4ED8] font-black tracking-tight drop-shadow-sm">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-extrabold text-slate-600 tracking-wider">Mins</span>
              </div>
              <span className="text-xl sm:text-2xl text-blue-400 font-light -mt-2.5">:</span>

              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl text-[#1D4ED8] font-black tracking-tight drop-shadow-sm">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-extrabold text-slate-600 tracking-wider">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-screen animated frame background — fully vivid */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {/* Main Content */}
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

              {/* Heading */}
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
