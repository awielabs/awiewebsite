'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Flame } from 'lucide-react';

interface LiveViewersCounterProps {
  productId?: string;
  className?: string;
}

export default function LiveViewersCounter({ productId, className = '' }: LiveViewersCounterProps) {
  // Generate a consistent pseudo-random initial count based on productId or default range
  const getInitialCount = () => {
    if (!productId) return Math.floor(Math.random() * 12) + 8; // 8 - 20
    let hash = 0;
    for (let i = 0; i < productId.length; i++) {
      hash = (hash << 5) - hash + productId.charCodeAt(i);
      hash |= 0;
    }
    return (Math.abs(hash) % 18) + 9; // 9 - 27 viewers
  };

  const [viewers, setViewers] = useState<number>(14);

  useEffect(() => {
    setViewers(getInitialCount());

    // Fluctuate count dynamically every 4-8 seconds
    const interval = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + delta;
        return Math.max(6, Math.min(38, next)); // keep between 6 and 38
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [productId]);

  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-bold shadow-sm select-none ${className}`}>
      <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
      <span className="flex items-center gap-1">
        <strong className="font-extrabold text-amber-700 font-mono">{viewers}</strong>
        <span>people watching this live right now</span>
      </span>
    </div>
  );
}
