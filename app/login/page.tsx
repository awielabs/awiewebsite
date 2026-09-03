'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    // Trigger Google OAuth sign-in flow (Supabase Auth / Google OAuth)
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 600);
  };

  return (
    <div className="pt-28 pb-20 bg-[#0B0F17] text-slate-200 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full blur-[140px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -bottom-20 -right-20" />

      <div className="w-full max-w-md px-6 relative z-10">
        
        {/* Card Container */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* Header & Logo */}
          <div className="text-center space-y-3">
            <Link href="/" className="inline-block group">
              <Image
                src="/logobg.png"
                alt="AWIE Logo"
                width={180}
                height={60}
                className="h-12 w-auto object-contain mx-auto transition-transform group-hover:scale-105"
                priority
              />
            </Link>

            <h1 className="text-2xl font-black text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Single account access for <span className="text-[#2563EB] font-bold">AWIE Store</span>, Hardware Products & Customer Portal
            </p>
          </div>

          {/* Navigation Tabs (Login / Signup) */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold">
            <span className="py-2.5 rounded-lg bg-[#2563EB] text-white text-center shadow-md">
              Sign In
            </span>
            <Link href="/signup" className="py-2.5 rounded-lg text-slate-400 hover:text-white text-center transition-colors">
              Create Account
            </Link>
          </div>

          {/* Google / Gmail Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-3 border border-slate-200"
          >
            {/* Google Colored Logo SVG */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google / Gmail</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-800" />
            <span className="bg-slate-900 px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider relative z-10">
              Or with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition-colors"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <Link href="#" className="text-[11px] text-[#2563EB] hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 text-center text-xs text-slate-400 space-y-2">
            <p>Don't have an account yet?</p>
            <Link href="/signup" className="text-[#2563EB] font-bold hover:underline inline-flex items-center gap-1">
              <span>Create New Account</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
