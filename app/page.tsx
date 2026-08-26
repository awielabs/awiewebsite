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
  const mouseRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });

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

  // Track mouse position (right half of screen only → parallax)
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;   // -1 to 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;  // -1 to 1
      mouseRef.current = { x: nx, y: ny };
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Draw a frame on canvas with parallax offset
  const drawFrame = (index: number, ox: number, oy: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img?.complete) return;

    const cw = canvas.width, ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    // Cover fit with parallax padding
    const PADDING = 40; // extra px each side for parallax movement
    const ir = img.width / img.height;
    const cr = cw / ch;
    let dw = cw + PADDING * 2;
    let dh = ch + PADDING * 2;
    if (cr > ir) {
      dh = dw / ir;
    } else {
      dw = dh * ir;
    }
    const basex = (cw - dw) / 2;
    const basey = (ch - dh) / 2;

    ctx.drawImage(img, basex + ox, basey + oy, dw, dh);
  };

  // Auto-play at 30fps + smooth parallax interpolation
  useEffect(() => {
    if (loadedCount < TOTAL_FRAMES) return;
    const FPS = 30;
    const interval = 1000 / FPS;
    let last = 0;

    const tick = (now: number) => {
      // Advance frame at 30fps
      if (now - last >= interval) {
        last = now;
        currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
      }

      // Smoothly interpolate parallax offset
      const targetX = mouseRef.current.x * 30;
      const targetY = mouseRef.current.y * 20;
      offsetRef.current.x += (targetX - offsetRef.current.x) * 0.05;
      offsetRef.current.y += (targetY - offsetRef.current.y) * 0.05;

      drawFrame(currentFrameRef.current, offsetRef.current.x, offsetRef.current.y);
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
      drawFrame(currentFrameRef.current, offsetRef.current.x, offsetRef.current.y);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loadedCount]);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .pop-1 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s forwards; }
        .pop-2 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.6s forwards; }
        .pop-3 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 1.0s forwards; }
        .pop-4 { opacity: 0; animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) 1.4s forwards; }
      `}</style>

      <div className="relative min-h-screen text-white flex flex-col justify-center overflow-hidden">

        {/* Full-screen animated frame background with parallax */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <canvas ref={canvasRef} className="w-full h-full" />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
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

              {/* Heading — pop 2 */}
              <h1 className="pop-2 text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                We are building <br />
                something <span className="text-[#60A5FA]">amazing.</span>
              </h1>

              {/* Sub text — pop 3 */}
              <div className="pop-3 pt-2">
                <p className="text-xl sm:text-2xl text-white/80 font-medium mb-1">Our website is under construction.</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#60A5FA]">We&apos;ll be live soon!</p>
              </div>

              {/* Blue line — pop 4 */}
              <div className="pop-4 w-16 h-1 bg-[#60A5FA] rounded-full" />

            </div>
          </div>

          {/* Right Side: empty — mouse movement drives background parallax */}
          <div className="hidden lg:block" />

        </div>
      </div>
    </>
  );
}
