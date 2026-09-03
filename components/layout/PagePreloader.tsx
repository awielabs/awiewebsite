'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function PagePreloader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(20);
  const [dotCount, setDotCount] = useState(1);
  const isFirstLoad = useRef(true);

  // Animated dots effect for text
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 400);
    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    // Show preloader on route change or initial load
    setIsLoading(true);
    setIsFadingOut(false);
    setProgress(20);

    let progressInterval: NodeJS.Timeout;
    
    // Animate progress percentage smoothly
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev;
        const bump = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + bump, 92);
      });
    }, 100);

    const finishLoading = () => {
      setProgress(100);
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsLoading(false);
          isFirstLoad.current = false;
        }, 500); // match transition duration
      }, 250);
    };

    // Check all image elements on page
    const checkImagesLoaded = () => {
      const images = Array.from(document.querySelectorAll('img'));
      if (images.length === 0) {
        finishLoading();
        return;
      }

      let loaded = 0;
      const total = images.length;

      const handleSingleLoad = () => {
        loaded++;
        const pct = Math.min(95, Math.floor(20 + (loaded / total) * 75));
        setProgress((prev) => Math.max(prev, pct));
        if (loaded >= total) {
          finishLoading();
        }
      };

      images.forEach((img) => {
        if (img.complete && img.naturalHeight !== 0) {
          handleSingleLoad();
        } else {
          img.addEventListener('load', handleSingleLoad, { once: true });
          img.addEventListener('error', handleSingleLoad, { once: true });
        }
      });
    };

    if (document.readyState === 'complete') {
      checkImagesLoaded();
    } else {
      window.addEventListener('load', checkImagesLoaded, { once: true });
    }

    // Safety timeout: Ensure loader closes after max 2.2 seconds even on slow networks
    const maxTimeout = setTimeout(() => {
      finishLoading();
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(maxTimeout);
      window.removeEventListener('load', checkImagesLoaded);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white text-slate-900 transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading AWIE"
    >
      {/* Background Soft Glow */}
      <div className="absolute w-[400px] h-[400px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center max-w-sm text-center px-6">
        {/* Loading Image from Assets */}
        <div className="relative mb-6 p-4 rounded-3xl bg-white shadow-xl shadow-blue-500/10 border border-slate-100 animate-bounce-subtle">
          <Image
            src="/loading.png"
            alt="AWIE Loading"
            width={120}
            height={120}
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>

        {/* Animated Text Loading */}
        <div className="flex items-center justify-center gap-1 mb-2">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Loading AWIE
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#2563EB] inline-block min-w-[24px] text-left">
            {'.'.repeat(dotCount)}
          </span>
        </div>

        <p className="text-xs text-slate-500 font-medium tracking-wide mb-6 animate-pulse">
          Fetching products, hardware & assets
        </p>

        {/* Progress Bar Container */}
        <div className="w-60 bg-slate-100 rounded-full h-2 overflow-hidden p-0.5 border border-slate-200 shadow-inner">
          <div
            className="bg-gradient-to-r from-[#0066FF] via-[#2563EB] to-blue-500 h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(37,99,235,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage Indicator */}
        <div className="mt-3 flex items-center gap-2 text-slate-500 font-mono text-xs font-bold">
          <span className="inline-block w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
