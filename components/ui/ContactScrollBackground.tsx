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
const AUTOPLAY_FPS = 18; // fps while typing

interface ContactScrollBackgroundProps {
  isTyping?: boolean;
}

export default function ContactScrollBackground({ isTyping = false }: ContactScrollBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  const scrollFrameRef = useRef(0);   // target frame from scroll position
  const displayFrameRef = useRef(0);  // currently rendered frame
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
      img.onload = () => { imgs[idx] = img; count++; setLoadedCount(count); };
      img.onerror = () => { count++; setLoadedCount(count); };
    });
    imagesRef.current = imgs;
  }, []);

  // Draw frame as FULL-SCREEN cover (object-fit: cover behaviour)
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

    // Cover: scale image so it fills the entire canvas
    const imgRatio = img.width / img.height;
    const canvasRatio = cw / ch;
    let dw: number, dh: number, dx: number, dy: number;
    if (canvasRatio > imgRatio) {
      // Canvas is wider → fit width, crop height
      dw = cw;
      dh = cw / imgRatio;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      // Canvas is taller → fit height, crop width
      dh = ch;
      dw = ch * imgRatio;
      dx = (cw - dw) / 2;
      dy = 0;
    }

    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // Resize canvas
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

  // Scroll listener — maps scroll progress → target frame
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / maxScroll, 1);
      scrollFrameRef.current = Math.floor(progress * (TOTAL_FRAMES - 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // rAF loop:
  // • Scrolling → smoothly chase scroll-driven target frame (1 step/tick)
  // • Typing   → auto-play forward at AUTOPLAY_FPS
  useEffect(() => {
    if (loadedCount < TOTAL_FRAMES * 0.5) return;

    let lastTime = 0;
    const interval = 1000 / AUTOPLAY_FPS;

    const tick = (now: number) => {
      if (now - lastTime >= interval) {
        lastTime = now;

        if (isTypingRef.current) {
          // Auto-play forward while user is typing (looping)
          displayFrameRef.current = (displayFrameRef.current + 1) % TOTAL_FRAMES;
          drawFrame(displayFrameRef.current);
        } else {
          // Chase scroll target frame
          const target = scrollFrameRef.current;
          const current = displayFrameRef.current;
          if (current !== target) {
            displayFrameRef.current = current + (target > current ? 1 : -1);
            drawFrame(displayFrameRef.current);
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loadedCount]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Subtle white tint for text legibility — keep frames vivid */}
      <div className="absolute inset-0 bg-white/30" />
    </div>
  );
}
