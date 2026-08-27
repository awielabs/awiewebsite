'use client';

import { useEffect, useRef, useState } from 'react';

// Frame filenames in sorted order (034–109, with gaps)
const FRAME_NAMES = [
  'frame_034','frame_035','frame_039','frame_040','frame_041','frame_042','frame_043',
  'frame_044','frame_045','frame_046','frame_047','frame_048','frame_049','frame_050',
  'frame_051','frame_052','frame_053','frame_054','frame_055','frame_056','frame_057',
  'frame_058','frame_059','frame_060','frame_061','frame_062','frame_063','frame_064',
  'frame_065','frame_066','frame_067','frame_068','frame_069','frame_070','frame_071',
  'frame_072','frame_073','frame_074','frame_075','frame_076','frame_077','frame_078',
  'frame_079','frame_080','frame_081','frame_082','frame_083','frame_084','frame_085',
  'frame_086','frame_087','frame_088','frame_089','frame_090','frame_091','frame_092',
  'frame_093','frame_094','frame_095','frame_096','frame_097','frame_098','frame_099',
  'frame_100','frame_101','frame_103','frame_105','frame_106','frame_108','frame_109',
];
const TOTAL_FRAMES = FRAME_NAMES.length; // 70

interface ContactScrollBackgroundProps {
  /** Called by the page so form inputs/textareas can pause the animation */
  isTyping?: boolean;
}

export default function ContactScrollBackground({ isTyping = false }: ContactScrollBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Refs used inside rAF loop (avoid stale closures)
  const scrollFrameRef = useRef(0);   // frame driven by scroll
  const displayFrameRef = useRef(0);  // frame currently shown (can be frozen)
  const rafRef = useRef<number>(0);
  const isTypingRef = useRef(isTyping);

  useEffect(() => { isTypingRef.current = isTyping; }, [isTyping]);

  // Preload all frames
  useEffect(() => {
    const imgs: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    let count = 0;
    FRAME_NAMES.forEach((name, idx) => {
      const img = document.createElement('img');
      img.src = `/contact-frames/${name}.jpg`;
      img.onload = () => {
        imgs[idx] = img;
        count++;
        setLoadedCount(count);
      };
      img.onerror = () => { count++; setLoadedCount(count); };
    });
    imagesRef.current = imgs;
  }, []);

  // Draw a single frame on canvas (fill right half on desktop, centered on mobile)
  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[idx];
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    const isMobile = cw < 768;
    const imgRatio = img.width / img.height;

    // Size: ~52% of screen width on desktop, 78% on mobile
    let tW = isMobile ? Math.min(cw * 0.78, 360) : Math.min(cw * 0.52, 780);
    let tH = tW / imgRatio;
    const maxH = isMobile ? ch * 0.42 : ch * 0.72;
    if (tH > maxH) { tH = maxH; tW = tH * imgRatio; }

    // Position: right-aligned desktop, centered mobile
    const marginX = Math.max(cw * 0.025, 20);
    const tX = isMobile ? (cw - tW) / 2 : cw - tW - marginX;
    const tY = (ch - tH) / 2;

    const r = isMobile ? 18 : 26;
    const alpha = isMobile ? 0.72 : 0.90;

    ctx.save();
    ctx.globalAlpha = alpha;

    // Subtle drop-shadow
    ctx.shadowColor = 'rgba(37,99,235,0.18)';
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 10;

    // Rounded-rect clip path
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(tX, tY, tW, tH, r);
    } else {
      ctx.moveTo(tX + r, tY);
      ctx.arcTo(tX + tW, tY, tX + tW, tY + tH, r);
      ctx.arcTo(tX + tW, tY + tH, tX, tY + tH, r);
      ctx.arcTo(tX, tY + tH, tX, tY, r);
      ctx.arcTo(tX, tY, tX + tW, tY, r);
      ctx.closePath();
    }
    ctx.clip();
    ctx.drawImage(img, tX, tY, tW, tH);

    ctx.restore();

    // Thin blue border ring
    ctx.save();
    ctx.globalAlpha = 0.30;
    ctx.strokeStyle = 'rgba(37,99,235,0.45)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(tX, tY, tW, tH, r);
    } else {
      ctx.moveTo(tX + r, tY);
      ctx.arcTo(tX + tW, tY, tX + tW, tY + tH, r);
      ctx.arcTo(tX + tW, tY + tH, tX, tY + tH, r);
      ctx.arcTo(tX, tY + tH, tX, tY, r);
      ctx.arcTo(tX, tY, tX + tW, tY, r);
      ctx.closePath();
    }
    ctx.stroke();
    ctx.restore();
  };

  // Resize canvas on mount and window resize
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(displayFrameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loadedCount]);

  // Scroll listener — maps scroll progress → frame index
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(scrollTop / maxScroll, 1);
      scrollFrameRef.current = Math.floor(progress * (TOTAL_FRAMES - 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // rAF animation loop: advance display frame toward scroll frame (unless typing)
  useEffect(() => {
    if (loadedCount < TOTAL_FRAMES * 0.5) return; // start when half loaded

    let lastTime = 0;
    const FPS = 24;
    const interval = 1000 / FPS;

    const tick = (now: number) => {
      if (now - lastTime >= interval) {
        lastTime = now;

        if (!isTypingRef.current) {
          // Smoothly chase the scroll target frame
          const target = scrollFrameRef.current;
          const current = displayFrameRef.current;
          if (current !== target) {
            // Step 1 frame toward target per tick for smooth chase
            displayFrameRef.current = current + (target > current ? 1 : -1);
            drawFrame(displayFrameRef.current);
          }
        }
        // While typing: frame is frozen — no draw call needed
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loadedCount]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Very light white overlay for text legibility */}
      <div className="absolute inset-0 bg-white/18" />
    </div>
  );
}
