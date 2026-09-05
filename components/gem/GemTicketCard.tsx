'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export interface GemTicketCardProps {
  ticket: {
    ticketCode: string;
    bookingId: string;
    customerName: string;
    productVersion: 'v1' | 'v2';
    productName: string;
    launchPrice: number;
    bookingAmount: number;
    amountPaid: number;
    remainingAmount: number;
    createdAt?: string;
    paymentStatus?: string;
    bookingStatus?: string;
  };
  onClose?: () => void;
  showLookupLink?: boolean;
}

export default function GemTicketCard({
  ticket,
  onClose,
  showLookupLink = true,
}: GemTicketCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!ticket.ticketCode) return;
    navigator.clipboard.writeText(ticket.ticketCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const dateStr = ticket.createdAt
    ? new Date(ticket.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

  return (
    <div className="w-full max-w-lg mx-auto bg-gradient-to-b from-slate-900 via-[#0B132B] to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20 relative overflow-hidden print:border-black print:text-black print:bg-white print:shadow-none">
      
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Band */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-md shadow-blue-500/30">
            A
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-white block text-sm">
              AWIE LABS
            </span>
            <span className="text-[10px] text-blue-300 font-bold tracking-widest uppercase block">
              Official Hardware Pass
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>CONFIRMED</span>
        </div>
      </div>

      {/* Main Ticket Pass Core */}
      <div className="py-6 space-y-6">
        
        {/* Ticket Code Highlight Box */}
        <div className="p-4 rounded-2xl bg-blue-950/40 border-2 border-dashed border-blue-500/40 text-center relative group">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-300 block mb-1">
            Unique Pre-Booking Ticket Code
          </span>
          <div className="font-mono text-2xl sm:text-3xl font-black text-white tracking-widest select-all">
            {ticket.ticketCode}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 text-xs font-bold transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-blue-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Breakdown Spec Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-slate-400 font-medium block">Companion Model</span>
            <span className="font-bold text-white text-sm block mt-0.5">
              {ticket.productName}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-slate-400 font-medium block">Customer</span>
            <span className="font-bold text-white text-sm block mt-0.5 truncate">
              {ticket.customerName}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-slate-400 font-medium block">Date of Booking</span>
            <span className="font-semibold text-slate-200 block mt-0.5">
              {dateStr}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-slate-400 font-medium block">Booking Fee Paid</span>
            <span className="font-extrabold text-emerald-400 text-sm block mt-0.5">
              ₹{ticket.bookingAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Pricing & Adjustments Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950/40 border border-blue-500/20 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Special Launch Price:</span>
            <span className="font-bold text-white">₹{ticket.launchPrice.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-medium">Pre-Booking Amount Credited:</span>
            <span className="font-bold text-emerald-400">-₹{ticket.bookingAmount.toLocaleString()}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-200 block">Remaining Due Before Delivery:</span>
              <span className="text-[10px] text-slate-400">Excludes standard delivery charges</span>
            </div>
            <span className="text-base font-black text-amber-400">
              ₹{ticket.remainingAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Pre-Booking Guarantee Note */}
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-2.5 text-[11px] text-blue-200">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <span>
            <strong>Pre-booking guarantee:</strong> This amount is locked and fully adjusted against your launch price. You will only pay ₹{ticket.remainingAmount} when production is ready.
          </span>
        </div>

      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {showLookupLink && (
          <Link
            href="/gem-booking/lookup"
            className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Track Order Status</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold transition-all"
          >
            Done
          </button>
        )}
      </div>

    </div>
  );
}
