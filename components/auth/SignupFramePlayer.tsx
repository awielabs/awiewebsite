'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface SignupFramePlayerProps {
  isTyping: boolean;
}

// Build array of all 80 frame paths
const FRAME_PATHS: string[] = [];
for (let i = 1; i <= 81; i++) {
  if (i === 75) continue; // 75 was skipped in source
  const paddedIndex = String(i).padStart(3, '0');
  FRAME_PATHS.push(`/assets/signup/Astronauts_climbing_rocket_ladder_202609031421_frames/frame_${paddedIndex}.jpg`);
}

export default function SignupFramePlayer({ isTyping }: SignupFramePlayerProps) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Preload ALL frames fully before enabling playback
  useEffect(() => {
    let loadedCount = 0;
    FRAME_PATHS.forEach((path) => {
      const img = new window.Image();
      img.src = path;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_PATHS.length) {
          setIsPreloaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_PATHS.length) {
          setIsPreloaded(true);
        }
      };
    });
    // Fallback if cached
    setTimeout(() => setIsPreloaded(true), 6000);
  }, []);

  // Play animation ONLY while user is typing; freeze on the last frame when idle
  useEffect(() => {
    if (!isTyping || !isPreloaded) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const frameRateMs = 35; // ~28 fps for smooth playback
    const step = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed > frameRateMs) {
        setCurrentFrameIndex((prev) => (prev + 1) % FRAME_PATHS.length);
        lastTimeRef.current = timestamp;
      }
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isTyping, isPreloaded]);

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Full-bleed background frame image */}
      <Image
        src={FRAME_PATHS[currentFrameIndex]}
        alt={`Astronaut Climbing Rocket Frame ${currentFrameIndex + 1}`}
        fill
        priority
        unoptimized
        className={`object-cover scale-110 transition-opacity duration-75 ${isPreloaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Soft blue theme glows over the background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/10 via-transparent to-[#2563EB]/5 pointer-events-none" />
    </div>
  );
}
