'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function PagePreloader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(20);
  const isFirstLoad = useRef(true);

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
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0B0F17] text-white transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading AWIE"
    >
      {/* Ambient Radial Glow */}
      <div className="absolute w-[360px] h-[360px] bg-[#2563EB]/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute w-[200px] h-[200px] bg-blue-400/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-xs text-center px-6">
        {/* Glowing Logo Badge */}
        <div className="relative mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl shadow-[#2563EB]/30 group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-30 blur-sm group-hover:opacity-50 transition-opacity" />
          <Image
            src="/icon.png"
            alt="AWIE Logo"
            width={72}
            height={72}
            className="relative w-16 h-16 sm:w-18 sm:h-18 object-contain drop-shadow-[0_0_20px_rgba(37,99,235,0.7)] animate-pulse"
            priority
          />
        </div>

        {/* Brand Title */}
        <h2 className="text-2xl font-black tracking-wider text-white mb-1">
          AWIE<span className="text-[#2563EB]">.</span>
        </h2>
        <p className="text-xs text-slate-400 font-medium tracking-wide mb-6">
          Preparing AWIE Store & Catalog...
        </p>

        {/* Progress Bar Container */}
        <div className="w-56 bg-slate-800/80 rounded-full h-1.5 overflow-hidden p-0.5 border border-white/10 relative shadow-inner">
          <div
            className="bg-gradient-to-r from-[#0066FF] via-[#2563EB] to-blue-400 h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_#2563EB]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="mt-3 flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-ping" />
          <span className="font-semibold text-slate-300">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
