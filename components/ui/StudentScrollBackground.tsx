'use client';

import React, { useEffect, useRef, useState } from 'react';

const PART_CONFIGS = [
  { prefix: 'p1', count: 85, align: 'right' as const },
  { prefix: 'p2', count: 90, align: 'left' as const },
  { prefix: 'p3', count: 90, align: 'left' as const },
  { prefix: 'p4', count: 90, align: 'left' as const },
  { prefix: 'p5', count: 80, align: 'right' as const }
];

interface StudentScrollBackgroundProps {
  onAlignChange?: (align: 'left' | 'right', partIndex: number) => void;
}

export default function StudentScrollBackground({ onAlignChange }: StudentScrollBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesMapRef = useRef<{ [key: string]: HTMLImageElement[] }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const currentPartRef = useRef(0);
  const currentFrameRef = useRef(0);
  const partProgressRef = useRef(0);
  const lastEmittedPartRef = useRef(-1);

  // Smooth position interpolation (0 = fully left, 1 = fully right)
  const alignProgressRef = useRef(1);

  // Preload sequence sets
  useEffect(() => {
    let totalImagesToLoad = 0;
    let loadedImagesCount = 0;

    PART_CONFIGS.forEach((cfg) => {
      totalImagesToLoad += cfg.count;
    });

    const tempMap: { [key: string]: HTMLImageElement[] } = {};

    PART_CONFIGS.forEach((cfg) => {
      tempMap[cfg.prefix] = [];
      for (let i = 1; i <= cfg.count; i++) {
        const img = new Image();
        const frameStr = String(i).padStart(3, '0');
        img.src = `/student-frames/${cfg.prefix}/frame_${frameStr}.webp`;

        img.onload = () => {
          loadedImagesCount++;
          if (loadedImagesCount >= Math.floor(totalImagesToLoad * 0.15)) {
            setIsLoaded(true);
          }
        };

        tempMap[cfg.prefix].push(img);
      }
    });

    imagesMapRef.current = tempMap;
  }, []);

  // Helper to draw current frame onto canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const partIdx = currentPartRef.current;
    const cfg = PART_CONFIGS[partIdx];
    if (!cfg) return;

    const frames = imagesMapRef.current[cfg.prefix];
    if (!frames) return;

    const frameIdx = Math.min(currentFrameRef.current, frames.length - 1);
    const img = frames[frameIdx];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);

    // Frame aspect ratio
    const imgRatio = img.width / img.height;

    // Draw size: compact & sleek (~46% viewport width desktop, ~72% mobile)
    const isMobile = cw < 768;
    let targetWidth = isMobile ? Math.min(cw * 0.72, 340) : Math.min(cw * 0.46, 680);
    let targetHeight = targetWidth / imgRatio;

    const maxMobileH = ch * 0.45;
    const maxDesktopH = ch * 0.68;
    const maxH = isMobile ? maxMobileH : maxDesktopH;

    if (targetHeight > maxH) {
      targetHeight = maxH;
      targetWidth = targetHeight * imgRatio;
    }

    // Interpolate horizontal position based on alignProgressRef (0 = left, 1 = right)
    const marginX = Math.max(cw * 0.03, 24);
    const leftX = isMobile ? (cw - targetWidth) / 2 : marginX;
    const rightX = isMobile ? (cw - targetWidth) / 2 : cw - targetWidth - marginX;
    const targetX = leftX + (rightX - leftX) * alignProgressRef.current;
    const targetY = (ch - targetHeight) / 2;

    const cornerRadius = isMobile ? 20 : 28; // Smooth modern rounded rectangle corners

    // Smooth sequence boundary cross-dissolve fade (fade in at start, fade out near end of part)
    const pProg = partProgressRef.current;
    let fadeAlpha = 1.0;
    if (pProg < 0.10) {
      fadeAlpha = pProg / 0.10;
    } else if (pProg > 0.90) {
      fadeAlpha = (1.0 - pProg) / 0.10;
    }
    const maxAlpha = isMobile ? 0.75 : 1.0;
    fadeAlpha = Math.min(Math.max(fadeAlpha, 0.25), maxAlpha);

    ctx.save();

    // Subtle drop shadow behind rounded frame card
    ctx.shadowColor = `rgba(37, 99, 235, ${0.22 * fadeAlpha})`;
    ctx.shadowBlur = 32;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 12;

    // Create Rounded Rect Path
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(targetX, targetY, targetWidth, targetHeight, cornerRadius);
    } else {
      ctx.moveTo(targetX + cornerRadius, targetY);
      ctx.arcTo(targetX + targetWidth, targetY, targetX + targetWidth, targetY + targetHeight, cornerRadius);
      ctx.arcTo(targetX + targetWidth, targetY + targetHeight, targetX, targetY + targetHeight, cornerRadius);
      ctx.arcTo(targetX, targetY + targetHeight, targetX, targetY, cornerRadius);
      ctx.arcTo(targetX, targetY, targetX + targetWidth, targetY, cornerRadius);
      ctx.closePath();
    }

    // Fill shadow base
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Clip image inside rounded rectangle
    ctx.clip();
    ctx.globalAlpha = fadeAlpha;
    ctx.drawImage(img, targetX, targetY, targetWidth, targetHeight);

    ctx.restore();

    // Draw thin elegant border ring over rounded corners
    ctx.save();
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(targetX, targetY, targetWidth, targetHeight, cornerRadius);
    } else {
      ctx.moveTo(targetX + cornerRadius, targetY);
      ctx.arcTo(targetX + targetWidth, targetY, targetX + targetWidth, targetY + targetHeight, cornerRadius);
      ctx.arcTo(targetX + targetWidth, targetY + targetHeight, targetX, targetY + targetHeight, cornerRadius);
      ctx.arcTo(targetX, targetY + targetHeight, targetX, targetY, cornerRadius);
      ctx.arcTo(targetX, targetY, targetX + targetWidth, targetY, cornerRadius);
      ctx.closePath();
    }
    ctx.strokeStyle = `rgba(37, 99, 235, ${0.35 * fadeAlpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  };

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawCanvas();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  // Scroll listener
  useEffect(() => {
    let animationFrameId: number;

    const updateOnScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );

      const overallProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Map overall scroll across 5 parts
      const partCount = PART_CONFIGS.length;
      const scaledVal = overallProgress * partCount;
      let partIdx = Math.floor(scaledVal);
      if (partIdx >= partCount) partIdx = partCount - 1;

      const partProgress = scaledVal - partIdx;
      partProgressRef.current = partProgress;
      const cfg = PART_CONFIGS[partIdx];

      const frameIdx = Math.min(
        Math.floor(partProgress * cfg.count),
        cfg.count - 1
      );

      currentPartRef.current = partIdx;
      currentFrameRef.current = frameIdx;

      if (lastEmittedPartRef.current !== partIdx) {
        lastEmittedPartRef.current = partIdx;
        if (onAlignChange) {
          onAlignChange(cfg.align, partIdx);
        }
      }

      const targetAlign = cfg.align === 'right' ? 1 : 0;
      alignProgressRef.current += (targetAlign - alignProgressRef.current) * 0.10;

      drawCanvas();
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(updateOnScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateOnScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, onAlignChange]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}
