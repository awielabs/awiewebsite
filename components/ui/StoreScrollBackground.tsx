'use client';

import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 107;

export default function StoreScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const currentFrameRef = useRef(0);

  // Preload frames into memory
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/store-frames/frame_${frameNum}.jpg`;

      img.onload = () => {
        count++;
        setLoadedCount(count);
      };

      img.onerror = () => {
        // Handle skipped frame numbers gracefully
        count++;
        setLoadedCount(count);
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;
  }, []);

  // Canvas render helper
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Object-fit: cover implementation
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loadedCount]);

  // Scroll listener mapped to frame index
  useEffect(() => {
    let animationFrameId: number;

    const updateFrameOnScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.5;

      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      const frameIndex = Math.min(
        Math.floor(progress * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(updateFrameOnScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateFrameOnScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loadedCount]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-85 transition-opacity duration-700">
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-slate-50/40 to-slate-50/95" />
    </div>
  );
}
