'use client';

import { useEffect, useRef, useState } from 'react';

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
const TOTAL_FRAMES = FRAME_NAMES.length;

interface ContactScrollBackgroundProps {
  isTyping?: boolean;
  /** Increment this by 1 for each keystroke to advance frame by 1 */
  keystrokeCount?: number;
}

export default function ContactScrollBackground({
  isTyping = false,
  keystrokeCount = 0,
}: ContactScrollBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  const scrollFrameRef = useRef(0);   // target frame from scroll
  const displayFrameRef = useRef(0);  // currently rendered frame
  const rafRef = useRef<number>(0);
  const isTypingRef = useRef(isTyping);
  const prevScrollFrameRef = useRef(0); // detect scroll changes

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

  // Draw frame filling ONLY the RIGHT HALF of the screen (full height)
  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[Math.max(0, Math.min(idx, TOTAL_FRAMES - 1))];
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    const isMobile = cw < 768;

    if (isMobile) {
      // On mobile: full screen cover (no split)
      const ir = img.width / img.height;
      const cr = cw / ch;
      let dw: number, dh: number, dx: number, dy: number;
      if (cr > ir) { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
      else { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
      ctx.drawImage(img, dx, dy, dw, dh);
    } else {
      // Desktop: fill RIGHT half only (x = cw/2 → cw), full height
      const halfW = cw / 2;
      const ir = img.width / img.height;
      const halfRatio = halfW / ch;

      let dw: number, dh: number, sx: number, sy: number, sw: number, sh: number;

      if (halfRatio > ir) {
        // Right half is wider than image ratio → fill width, crop top/bottom
        dw = halfW;
        dh = halfW / ir;
        const cropY = (dh - ch) / 2;
        const scaleX = img.width / dw;
        sx = 0;
        sy = cropY * scaleX;
        sw = img.width;
        sh = ch * scaleX;
      } else {
        // Right half is taller than image ratio → fill height, crop sides
        dh = ch;
        dw = ch * ir;
        const cropX = (dw - halfW) / 2;
        const scaleY = img.height / dh;
        sx = cropX * scaleY;
        sy = 0;
        sw = halfW * scaleY;
        sh = img.height;
      }

      // Clip to right half only
      ctx.save();
      ctx.beginPath();
      ctx.rect(halfW, 0, halfW, ch);
      ctx.clip();
      ctx.drawImage(img, sx, sy, sw, sh, halfW, 0, halfW, ch);
      ctx.restore();
    }
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

  // Scroll listener → update target frame
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / maxScroll, 1);
      scrollFrameRef.current = Math.floor(progress * (TOTAL_FRAMES - 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keystroke → advance exactly 1 frame per keystroke (not auto-play)
  useEffect(() => {
    if (keystrokeCount === 0) return;
    displayFrameRef.current = (displayFrameRef.current + 1) % TOTAL_FRAMES;
    drawFrame(displayFrameRef.current);
    // Sync scroll target to current so resuming scroll doesn't jump
    scrollFrameRef.current = displayFrameRef.current;
  }, [keystrokeCount]);

  // rAF loop — only runs when NOT typing
  // Smoothly chases scroll target; freezes when scroll stops
  useEffect(() => {
    if (loadedCount < TOTAL_FRAMES * 0.5) return;

    let lastTime = 0;
    const FPS = 24;
    const interval = 1000 / FPS;

    const tick = (now: number) => {
      if (now - lastTime >= interval) {
        lastTime = now;

        if (!isTypingRef.current) {
          const target = scrollFrameRef.current;
          const current = displayFrameRef.current;
          if (current !== target) {
            displayFrameRef.current = current + (target > current ? 1 : -1);
            drawFrame(displayFrameRef.current);
          }
          // If target === current → freeze, no redraw needed
        }
        // While typing → keystroke effect handles drawing; rAF does nothing
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loadedCount]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Minimal tint for legibility */}
      <div className="absolute inset-0 bg-white/10" />
    </div>
  );
}
