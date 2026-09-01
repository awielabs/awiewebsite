'use client';

import React, { useState, useEffect } from 'react';
import { Monitor, X, Smartphone } from 'lucide-react';

export default function MobileDesktopBanner() {
  const [dismissed, setDismissed] = useState<boolean>(true);

  useEffect(() => {
    // Check if dismissed previously in this session
    const isDismissed = sessionStorage.getItem('awie_mobile_desktop_dismissed');
    if (!isDismissed) {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('awie_mobile_desktop_dismissed', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 shadow-2xl text-white space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#3B82F6]">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white tracking-wide uppercase">Desktop Mode Recommended</h4>
              <p className="text-[11px] text-slate-300 font-medium leading-tight">
                For the best interactive experience and full website layout, please switch your browser to <strong className="text-white">Desktop View</strong> or use a larger screen.
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close suggestion"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
            <Smartphone className="w-3 h-3 text-slate-500" /> Mobile View Active
          </span>
          <button
            onClick={handleDismiss}
            className="px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-[11px] transition-all shadow-sm"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
