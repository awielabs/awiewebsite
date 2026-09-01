'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, ArrowRight, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Default admin passcode for AWIE operations
    if (passcode.trim() === 'awie@19(-_-)' || passcode.trim() === 'awie2026' || passcode.trim() === 'admin123') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('awie_admin_session', 'authenticated');
      }
      setTimeout(() => {
        router.push('/admin');
      }, 400);
    } else {
      setTimeout(() => {
        setError('Invalid Admin Passcode. Access Denied.');
        setLoading(false);
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex items-center justify-center p-6 pt-24">
      <div className="w-full max-w-md bg-[#0F172A] border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Ambient Backlight */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#2563EB] flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">AWIE Admin Portal</h1>
            <p className="text-xs text-slate-400 font-medium">Order Management &amp; Sourcing Control System</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Admin Access Passcode</span>
            </label>
            <input
              type="password"
              placeholder="Enter passcode..."
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-[#2563EB]"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Enter Admin Panel'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-500 font-medium">
          Protected Area • AWIE Engineering Enterprise System
        </div>

      </div>
    </div>
  );
}
