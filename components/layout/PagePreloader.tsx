'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function PagePreloader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Show preloader on route change or initial load
    setIsLoading(true);
    setIsFadingOut(false);

    const finishLoading = () => {
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsLoading(false);
          isFirstLoad.current = false;
        }, 500); // match transition duration
      }, 300);
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
      <div className="relative z-10 flex flex-col items-center max-w-sm text-center px-6">
        {/* Loading Image from Assets */}
        <div className="mb-6 p-2">
          <Image
            src="/loading.png"
            alt="AWIE Loading"
            width={130}
            height={130}
            className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
            priority
          />
        </div>

        {/* Title Text */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
          Almost there...
        </h2>

        {/* Subtitle Text */}
        <p className="text-base text-slate-500 font-medium mb-7">
          Please wait a moment
        </p>

        {/* Animated Bouncing Blue Dots */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full bg-[#2563EB] animate-bounce [animation-delay:-0.3s]" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#3B82F6] animate-bounce [animation-delay:-0.15s]" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#93C5FD] animate-bounce" />
        </div>
      </div>
    </div>
  );
}
