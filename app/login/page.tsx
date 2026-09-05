'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle, UserPlus, Eye, EyeOff, Loader2 } from 'lucide-react';
import SignupFramePlayer from '@/components/auth/SignupFramePlayer';
import { useAuthSession } from '@/lib/useAuthSession';
import OtpVerificationModal from '@/components/auth/OtpVerificationModal';
import { encryptSession, sanitizeConsole } from '@/lib/authCrypto';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [pendingGoogleUser, setPendingGoogleUser] = useState<{
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    provider: 'google';
    lastActive: number;
  } | null>(null);
  const [accountNotFound, setAccountNotFound] = useState(false);
  const [notFoundEmail, setNotFoundEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dailyLimitNotice, setDailyLimitNotice] = useState<string | null>(null);

  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { signInWithGoogle } = useAuthSession();

  // Sanitize web console to prevent user PII leaks
  useEffect(() => {
    sanitizeConsole();
  }, []);

  // Check for Google OAuth callback and validate database account presence
  useEffect(() => {
    const verifyGoogleOAuth = async () => {
      if (typeof window === 'undefined') return;
      const isGoogleAuth = window.location.search.includes('google_auth') || window.location.hash.includes('access_token');
      if (!isGoogleAuth) return;

      setIsSubmitting(true);
      setErrorMessage(null);
      setAccountNotFound(false);

      // Explicitly exchange the PKCE ?code= (or implicit #access_token) for a
      // session — detectSessionInUrl is disabled globally so nothing is
      // auto-consumed on other pages and OTP is always enforced here.
      if (window.location.search.includes('code=') || window.location.hash.includes('access_token=')) {
        try {
          await supabase.auth.exchangeCodeForSession(window.location.href);
        } catch {
          // Legacy implicit flow — try getSession as fallback
        }
        // Clean the address bar: remove code/token but keep google_auth flag
        window.history.replaceState(null, '', `${window.location.pathname}?google_auth=1&mode=login`);
      }

      // Wait briefly for Supabase client to parse the session from redirect URL
      let session = (await supabase.auth.getSession()).data.session;
      if (!session?.user?.email) {
        await new Promise((r) => setTimeout(r, 450));
        session = (await supabase.auth.getSession()).data.session;
      }

      // Strip the token hash / query from the address bar so the token
      // never lingers in the browser history or view-source
      if (window.location.hash.includes('access_token=')) {
        window.history.replaceState(null, '', window.location.pathname);
      }

      if (!session?.user?.email) {
        setIsSubmitting(false);
        return;
      }

      const googleEmail = session.user.email.toLowerCase();

      try {
        const res = await fetch('/api/auth/google-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: googleEmail,
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
            avatarUrl: session.user.user_metadata?.avatar_url,
            googleId: session.user.id,
            mode: 'login',
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          // Reject login & sign out session if account is not registered in database
          await supabase.auth.signOut();
          localStorage.removeItem('awie_user_session');

          setAccountNotFound(true);
          setNotFoundEmail(googleEmail);
          setErrorMessage(null);
          setIsSubmitting(false);
          return;
        }

        // Account exists! Open the OTP dialog immediately in "waiting" mode,
        // then send the code (dialog shows the waiting state while it travels)
        setPendingGoogleUser(data.user);
        setIsOtpOpen(true);

        const otpRes = await fetch('/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: googleEmail,
            name: data.user.name,
            purpose: 'login',
          }),
        });

        if (!otpRes.ok) {
          const otpData = await otpRes.json().catch(() => ({}));
          if (otpData.dailyLimit) {
            setDailyLimitNotice('You have requested the maximum of 5 verification codes today. For security, please try again tomorrow.');
          } else {
            await supabase.auth.signOut();
            localStorage.removeItem('awie_user_session');
            setIsOtpOpen(false);
            setPendingGoogleUser(null);
            setErrorMessage(otpData.error || 'Failed to send verification code to your Gmail. Please try again.');
          }
          setIsSubmitting(false);
          return;
        }

        setIsSubmitting(false);
      } catch {
        setErrorMessage('Failed to verify Google account. Please try again.');
        setIsSubmitting(false);
      }
    };

    verifyGoogleOAuth();
  }, []);

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setAccountNotFound(false);
    const res = await signInWithGoogle('login');
    if (res?.error) {
      setErrorMessage('Unable to connect to Google OAuth. Please check connection or use email code.');
      setIsSubmitting(false);
    }
  };

  // Complete Google login after OTP verification on the Gmail account
  const handleGoogleOtpSuccess = () => {
    if (!pendingGoogleUser) return;
    setIsOtpOpen(false);
    const encrypted = encryptSession(pendingGoogleUser);
    localStorage.setItem('awie_user_session', encrypted);
    setTimeout(() => {
      window.location.href = '/products';
    }, 500);
  };

  // Trigger animation frame play on typing
  const handleTyping = () => {
    setIsTyping(true);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1500); // Pause 1.5 seconds after user stops typing
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setAccountNotFound(false);

    const targetEmail = email.trim().toLowerCase();
    if (!targetEmail) {
      setErrorMessage('Please enter your email address.');
      setIsSubmitting(false);
      return;
    }

    if (!targetEmail.includes('@') || !targetEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          purpose: 'login',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.notFound) {
          setAccountNotFound(true);
          setNotFoundEmail(targetEmail);
          setErrorMessage(null);
        } else {
          setErrorMessage(data.error || 'Failed to dispatch verification code. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      if (data.email) {
        setEmail(data.email);
      }

      // Open the 6-digit OTP verification forum modal
      setIsOtpOpen(true);
    } catch {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSuccess = (verifiedUser: {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    provider: 'email';
    lastActive: number;
  }) => {
    setIsOtpOpen(false);
    // Encrypt user session before storing in client storage
    const encrypted = encryptSession(verifiedUser);
    localStorage.setItem('awie_user_session', encrypted);

    setTimeout(() => {
      window.location.href = '/products';
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col lg:flex-row relative pt-20 lg:pt-24">

      {/* LEFT COLUMN: Full Height Interactive Frame Player */}
      <div className="w-full lg:w-3/5 min-h-[calc(100vh-5rem)] order-2 lg:order-1">
        <SignupFramePlayer isTyping={isTyping} />
      </div>

      {/* RIGHT COLUMN: Clean White & Blue Login Form Container */}
      <div className="w-full lg:w-2/5 min-h-[calc(100vh-5rem)] flex flex-col justify-between p-6 sm:p-10 xl:p-14 bg-white relative z-10 order-1 lg:order-2">

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

        {/* Login Card Container */}
        <div className="max-w-sm w-full mx-auto py-10 space-y-6">

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>SINGLE ACCOUNT ACCESS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Single account access for <span className="text-[#2563EB] font-bold">AWIE Products</span> and <span className="text-[#2563EB] font-bold">AWIE Store</span>, Customer Portal & Order Tracking
            </p>
          </div>

          {/* Navigation Tabs (Login / Signup) */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <span className="py-2.5 rounded-xl bg-[#2563EB] text-white text-center shadow-md font-extrabold">
              Sign In
            </span>
            <Link
              href="/signup"
              className="py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-center transition-colors"
            >
              Create Account
            </Link>
          </div>

          {/* Google / Gmail Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
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

          {/* Account Not Found Notification */}
          {accountNotFound && (
            <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-slate-800 shadow-md space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">
                    Account Not Found
                  </h4>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                    No account is registered with <span className="font-bold underline decoration-amber-400">{notFoundEmail || email}</span>. Please create an account to get started.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Link
                  href={`/signup?email=${encodeURIComponent(notFoundEmail || email)}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs text-center shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Create New Account</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setAccountNotFound(false)}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-200 text-amber-800 font-semibold text-xs transition-colors"
                >
                  Try Another
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  required
                  value={email}
                  onKeyDown={handleTyping}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleTyping();
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all font-medium"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <Link href="#" className="text-[11px] text-[#2563EB] hover:underline font-bold">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onKeyDown={handleTyping}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleTyping();
                  }}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pl-10 pr-11 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all font-medium"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 disabled:opacity-50 text-white font-extrabold text-xs transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isSubmitting ? 'Sending Security Code...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="pt-2 text-center text-xs text-slate-500 space-y-1">
            <p>Don&apos;t have an account yet?</p>
            <Link href="/signup" className="text-[#2563EB] font-bold hover:underline inline-flex items-center gap-1">
              <span>Create New Account</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

        {/* Bottom Footer Note */}
        <div className="text-center lg:text-left text-[11px] text-slate-400 font-medium">
          © {new Date().getFullYear()} AWIE LABS. Single Sign-On protected by 30-min security session timeout.
        </div>

      </div>

      {/* Full-screen loading overlay while the OTP is being prepared/sent */}
      {isSubmitting && !isOtpOpen && !errorMessage && !accountNotFound && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
          </div>
          <div className="text-center space-y-1.5">
            <p className="text-sm font-black text-slate-900">Preparing your verification code…</p>
            <p className="text-xs text-slate-500 font-medium">Sending the 6-digit OTP to your email. This takes a few seconds.</p>
          </div>
        </div>
      )}

      {/* 6-Digit Animated OTP Forum Modal */}
      <OtpVerificationModal
        isOpen={isOtpOpen}
        email={pendingGoogleUser?.email || email}
        purpose="login"
        isPreparing={isSubmitting && isOtpOpen}
        dailyLimitNotice={dailyLimitNotice}
        onClose={() => {
          setIsOtpOpen(false);
          setDailyLimitNotice(null);
          if (pendingGoogleUser) {
            setPendingGoogleUser(null);
            supabase.auth.signOut();
          }
        }}
        onSuccess={pendingGoogleUser ? handleGoogleOtpSuccess : handleOtpSuccess}
      />

    </div>
  );
}
