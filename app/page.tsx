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

  // Draw a frame on canvas — no parallax, just cover fit
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

  // Resize canvas to fill screen
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
        /* Staggered pop-in animations */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pop-1 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s forwards; }
        .pop-2 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.6s forwards; }
        .pop-3 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 1.0s forwards; }
        .pop-4 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 1.4s forwards; }

        /* Gradient text: white → blue */
        .gradient-text {
          background: linear-gradient(90deg, #ffffff 0%, #93C5FD 50%, #3B82F6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-text-sub {
          background: linear-gradient(90deg, #e2e8f0 0%, #60A5FA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Dashed loading line animation */
        @keyframes dashSweep {
          0%   { width: 0%; opacity: 1; }
          80%  { width: 100%; opacity: 1; }
          90%  { width: 100%; opacity: 0.3; }
          100% { width: 0%;  opacity: 1; }
        }
        .dash-line-track {
          position: relative;
          width: 220px;
          height: 3px;
          background: rgba(255,255,255,0.15);
          border-radius: 999px;
          overflow: hidden;
        }
        .dash-line-fill {
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #3B82F6, #93C5FD, #3B82F6);
          animation: dashSweep 2.4s ease-in-out infinite;
        }
      `}</style>

      <div className="relative min-h-screen text-white flex flex-col justify-center overflow-hidden">

        {/* Full-screen animated frame background — clearly visible */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <canvas ref={canvasRef} className="w-full h-full" />
          {/* Very thin overlay — just enough to make text readable */}
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">

          {/* Left Side */}
          <div className="space-y-8">
            <div className="space-y-6">

              {/* Logo — pop 1 */}
              <div className="pop-1 relative h-32 sm:h-40 w-auto flex items-start justify-start">
                <Image
                  src="/logobg.png"
                  alt="AWIE Logo"
                  width={500}
                  height={200}
                  className="h-32 sm:h-40 w-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Heading — pop 2 — white to blue gradient */}
              <h1 className="pop-2 text-4xl sm:text-6xl font-black tracking-tight leading-tight drop-shadow-lg gradient-text">
                We are building <br />
                something amazing.
              </h1>

              {/* Sub text — pop 3 — gradient text */}
              <div className="pop-3 pt-2 space-y-1">
                <p className="text-xl sm:text-2xl font-medium gradient-text-sub">
                  Our website is under construction.
                </p>
                <p className="text-2xl sm:text-3xl font-bold gradient-text-sub">
                  We&apos;ll be live soon!
                </p>
              </div>

              {/* Animated dashed loading line — pop 4 */}
              <div className="pop-4 dash-line-track">
                <div className="dash-line-fill" />
              </div>

            </div>
          </div>

          {/* Right Side: empty */}
          <div className="hidden lg:block" />

        </div>
      </div>
    </>
  );
}
