'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import SignupFramePlayer from '@/components/auth/SignupFramePlayer';
import { useAuthSession } from '@/lib/useAuthSession';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { signInWithGoogle } = useAuthSession();

  // Trigger animation frame play on typing
  const handleTyping = () => {
    setIsTyping(true);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1500); // Pause 1.5 seconds after user stops typing
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userSession = {
      id: 'usr-' + Date.now(),
      email,
      name,
      provider: 'email',
      lastActive: Date.now()
    };
    localStorage.setItem('awie_user_session', JSON.stringify(userSession));

    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col lg:flex-row relative">

      {/* LEFT COLUMN: Full Height Interactive Frame Player */}
      <div className="w-full lg:w-3/5 min-h-screen order-2 lg:order-1">
        <SignupFramePlayer isTyping={isTyping} />
      </div>

      {/* RIGHT COLUMN: Clean White & Blue Signup Form Container */}
      <div className="w-full lg:w-2/5 min-h-screen flex flex-col justify-between p-6 sm:p-10 xl:p-14 bg-white relative z-10 order-1 lg:order-2">
        
        {/* Top Header & Logo */}
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-block group">
            <Image
              src="/logobg.png"
              alt="AWIE Logo"
              width={180}
              height={60}
              className="h-11 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          <Link
            href="/store"
            className="text-xs font-bold text-[#2563EB] hover:text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 transition-colors"
          >
            ← Back to Store
          </Link>
        </div>

        {/* Signup Card Container */}
        <div className="max-w-sm w-full mx-auto py-10 space-y-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>UNIFIED AWIE ACCOUNT CREATION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Create Your Account
            </h1>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Get full access to <span className="text-[#2563EB] font-bold">AWIE Store</span> catalog, hardware order tracking & developer portal.
            </p>
          </div>

          {/* Navigation Tabs (Sign In / Create Account) */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <Link
              href="/login"
              className="py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-center transition-colors"
            >
              Sign In
            </Link>
            <span className="py-2.5 rounded-xl bg-[#2563EB] text-white text-center shadow-md font-extrabold">
              Create Account
            </span>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs transition-all shadow-sm border border-slate-300 flex items-center justify-center gap-3 hover:border-blue-400"
          >
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
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center text-center">
            <div className="absolute left-0 right-0 top-1/2 border-t border-slate-200" />
            <span className="bg-white px-3 mx-auto text-[10px] uppercase font-bold text-slate-400 tracking-wider relative z-10">
              Or with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onKeyDown={handleTyping}
                  onChange={(e) => {
                    setName(e.target.value);
                    handleTyping();
                  }}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all font-medium"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onKeyDown={handleTyping}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleTyping();
                  }}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all font-medium"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onKeyDown={handleTyping}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleTyping();
                  }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all font-medium"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <label htmlFor="agree" className="text-[11px] text-slate-600 font-medium select-none">
                I agree to the <Link href="/store-terms" className="text-[#2563EB] font-bold hover:underline">Terms of Service</Link> & <Link href="/privacy" className="text-[#2563EB] font-bold hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !agreed}
              className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 disabled:opacity-50 text-white font-extrabold text-xs transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="pt-2 text-center text-xs text-slate-500 space-y-1">
            <p>Already have an AWIE account?</p>
            <Link href="/login" className="text-[#2563EB] font-bold hover:underline inline-flex items-center gap-1">
              <span>Sign In to your account</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

        {/* Bottom Footer Note */}
        <div className="text-center lg:text-left text-[11px] text-slate-400 font-medium">
          © {new Date().getFullYear()} AWIE LABS. Single Sign-On protected by 30-min security session timeout.
        </div>

      </div>

    </div>
  );
}
