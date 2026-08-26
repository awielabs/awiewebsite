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

  // Draw a frame on canvas (cover fit)
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

  // Auto-play: 30fps looping animation
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
    <div className="relative min-h-screen text-white flex flex-col justify-center overflow-hidden">

      {/* Full-screen animated frame background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">

        {/* Left Side */}
        <div className="space-y-8">
          <div className="space-y-6">
            {/* Logo */}
            <div className="relative h-32 sm:h-40 w-auto flex items-start justify-start">
              <Image
                src="/logobg.png"
                alt="AWIE Logo"
                width={500}
                height={200}
                className="h-32 sm:h-40 w-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
              We are building <br />
              something <span className="text-[#60A5FA]">amazing.</span>
            </h1>

            <div className="pt-2">
              <p className="text-xl sm:text-2xl text-white/80 font-medium mb-1">Our website is under construction.</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#60A5FA]">We&apos;ll be live soon!</p>
              <div className="w-16 h-1 bg-[#60A5FA] mt-4 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side: empty reserved space */}
        <div className="hidden lg:block" />

      </div>
    </div>
  );
}
