'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mail, ArrowRight, ShieldCheck, RefreshCw, AlertCircle, CheckCircle2, X } from 'lucide-react';

interface OtpVerificationModalProps {
  isOpen: boolean;
  email: string;
  name?: string;
  purpose: 'signup' | 'login';
  /** True while the code is still being generated/sent — dialog shows a waiting state */
  isPreparing?: boolean;
  /** Pre-set lockout/error notice (e.g. daily limit reached) shown inside the dialog */
  dailyLimitNotice?: string | null;
  onClose: () => void;
  onSuccess: (user: {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    provider: 'email';
    lastActive: number;
  }) => void;
}

export default function OtpVerificationModal({
  isOpen,
  email,
  name,
  purpose,
  isPreparing = false,
  dailyLimitNotice = null,
  onClose,
  onSuccess,
}: OtpVerificationModalProps) {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [isDailyLimited, setIsDailyLimited] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset digits when modal opens
  useEffect(() => {
    if (!isOpen) return;
    // Defer state sync to avoid cascading-render lint error
    const id = requestAnimationFrame(() => {
      setDigits(['', '', '', '', '', '']);
      setError(null);
      setResendSuccess(false);
      setCooldown(60);
      setIsDailyLimited(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    });
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  // Resend cooldown timer
  useEffect(() => {
    if (!isOpen || cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, cooldown]);

  // Handle single digit input
  const handleChange = (index: number, value: string) => {
    // Sanitize to only numeric characters
    const numericChar = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = numericChar;
    setDigits(newDigits);
    setError(null);

    // Auto-advance to next box if filled
    if (numericChar && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle paste for full 6-digit code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim().replace(/\D/g, '').slice(0, 6);
    if (!pasteData) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasteData[i] || '';
    }
    setDigits(newDigits);

    // Focus last filled index
    const focusIdx = Math.min(pasteData.length, 5);
    inputRefs.current[focusIdx]?.focus();
  };

  // Submit and verify OTP
  const handleVerify = useCallback(async () => {
    const otp = digits.join('');
    if (otp.length < 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          name,
          purpose,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid verification code. Please check and try again.');
        setIsVerifying(false);
        return;
      }

      onSuccess(data.user);
    } catch {
      setError('Unable to verify code due to a network issue. Please try again.');
      setIsVerifying(false);
    }
  }, [digits, email, name, purpose, onSuccess]);

  // Auto-submit when all 6 digits are typed (deferred to avoid cascading render)
  useEffect(() => {
    if (!digits.every((d) => d.length === 1)) return;
    const id = requestAnimationFrame(() => {
      handleVerify();
    });
    return () => cancelAnimationFrame(id);
  }, [digits, handleVerify]);

  // Resend OTP action
  const handleResend = async () => {
    if (cooldown > 0 || isResending || isDailyLimited) return;
    setIsResending(true);
    setError(null);
    setResendSuccess(false);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, purpose }),
      });
      const data = await res.json();

      if (data.success) {
        setResendSuccess(true);
        setCooldown(60);
      } else if (data.dailyLimit) {
        setIsDailyLimited(true);
        setError(data.error || 'Daily limit reached. Please try again tomorrow.');
      } else {
        setError(data.error || 'Failed to resend code.');
      }
    } catch {
      setError('Failed to resend verification code.');
    } finally {
      setIsResending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header & Icon */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] shadow-inner">
            <Mail className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Enter 6-Digit Code
          </h2>

          <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs mx-auto">
            We sent a verification code to <span className="font-bold text-slate-900">{email}</span>. Please enter it below to proceed.
          </p>
        </div>

        {/* Waiting / Lockout / Inputs states */}
        {isPreparing ? (
          <div className="py-8 flex flex-col items-center justify-center gap-4">
            <RefreshCw className="w-10 h-10 text-[#2563EB] animate-spin" />
            <div className="text-center space-y-1">
              <p className="text-sm font-black text-slate-900">Waiting for your code…</p>
              <p className="text-xs text-slate-500 font-medium">Sending the 6-digit verification code to your email.</p>
            </div>
          </div>
        ) : isDailyLimited || dailyLimitNotice ? (
          <div className="py-4">
            <div className="p-5 rounded-2xl bg-red-50 border-2 border-red-200 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
              <p className="text-sm font-black text-red-800">OTP Request Limit Reached</p>
              <p className="text-xs text-red-700 font-medium leading-relaxed">
                {dailyLimitNotice || 'You have requested the maximum of 5 verification codes today. For security, please try again tomorrow.'} Need urgent help? Reach us at <span className="font-bold">awieclient@gmail.com</span>.
              </p>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <div className="flex justify-center items-center gap-2 sm:gap-2.5">
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-black rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15 outline-none transition-all shadow-sm"
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Resend Success Message */}
            {resendSuccess && !error && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>A fresh 6-digit code has been sent to your email.</span>
              </div>
            )}
          </div>
        )}

        {/* Required Note about Spam Folder */}
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
          <p className="font-semibold flex items-center gap-1.5 text-amber-800 mb-0.5">
            <span>⚠️ Important Notice</span>
          </p>
          <p>
            If you didn&apos;t receive the OTP in your inbox, please <strong>check your spam or junk folder</strong> before you click Resend OTP.
          </p>
        </div>

        {/* Action Button: Verify — hidden while preparing or when the daily limit is hit */}
        {!isPreparing && !isDailyLimited && !dailyLimitNotice && (
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying || digits.join('').length < 6}
              className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 disabled:opacity-50 text-white font-extrabold text-xs transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Resend Row & Cooldown */}
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={onClose}
                className="text-slate-500 hover:text-slate-800 font-semibold transition-colors"
              >
                ← Change Email
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || isResending}
                className={`font-bold transition-colors ${
                  cooldown > 0 || isResending
                    ? 'text-slate-400 cursor-not-allowed'
                    : 'text-[#2563EB] hover:text-blue-700 hover:underline cursor-pointer'
                }`}
              >
                {isResending ? (
                  'Resending...'
                ) : cooldown > 0 ? (
                  `Resend OTP in ${cooldown}s`
                ) : (
                  'Resend OTP'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Back row when daily-limited */}
        {(isDailyLimited || dailyLimitNotice) && !isPreparing && (
          <div className="mt-5">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold text-slate-700 transition-colors"
            >
              ← Back and try again tomorrow
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
