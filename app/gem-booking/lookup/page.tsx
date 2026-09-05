'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Sparkles,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  ChevronLeft,
  Copy,
  Check,
  Layers,
  Lock,
  Unlock,
  Bell,
} from 'lucide-react';
import GemTicketCard from '@/components/gem/GemTicketCard';

declare global {
  interface Window {
    Razorpay: any;
  }
}

function GemLookupContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || '';

  const [inputCode, setInputCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [booking, setBooking] = useState<any | null>(null);

  const [payingFinal, setPayingFinal] = useState(false);
  const [finalPayError, setFinalPayError] = useState<string | null>(null);
  const [finalPaidSuccess, setFinalPaidSuccess] = useState(false);

  const fetchBooking = async (codeToFetch: string) => {
    const trimmed = codeToFetch.trim();
    if (!trimmed) return;
    setLoading(true);
    setErrorMessage(null);
    setFinalPayError(null);

    try {
      const res = await fetch(`/api/gem-booking/lookup?code=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to locate booking with that ticket code.');
      }

      setBooking(data.booking);
    } catch (err: any) {
      setBooking(null);
      setErrorMessage(err?.message || 'Error searching for booking.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      fetchBooking(initialCode);
    }
  }, [initialCode]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooking(inputCode);
  };

  const handlePayRemaining = async () => {
    if (!booking) return;
    setFinalPayError(null);
    setPayingFinal(true);

    try {
      if (typeof window === 'undefined' || !window.Razorpay) {
        throw new Error('Razorpay SDK is not ready. Please refresh the page and try again.');
      }

      // 1. Create order for remaining balance
      const res = await fetch('/api/gem-booking/final-payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketCode: booking.ticketCode,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to initiate balance payment order.');
      }

      const { orderId, keyId, amountPaise, currency } = data;

      // 2. Open Razorpay Checkout
      const options = {
        key: keyId,
        amount: amountPaise,
        currency: currency || 'INR',
        name: 'AWIE Labs',
        description: `Remaining Balance for ${booking.productName}`,
        order_id: orderId,
        image: 'https://awie.in/logo.jpeg',
        theme: {
          color: '#2563EB',
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // 3. Verify server-side
            const verifyRes = await fetch('/api/gem-booking/final-payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                ticketCode: booking.ticketCode,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Failed to confirm remaining payment.');
            }

            setFinalPaidSuccess(true);
            // Refresh booking record
            fetchBooking(booking.ticketCode);
          } catch (err: any) {
            setFinalPayError(err?.message || 'Payment recorded, please check email for receipt.');
          } finally {
            setPayingFinal(false);
          }
        },
        modal: {
          ondismiss: function () {
            setPayingFinal(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setPayingFinal(false);
        setFinalPayError(resp.error?.description || 'Payment was unsuccessful.');
      });
      rzp.open();
    } catch (err: any) {
      setPayingFinal(false);
      setFinalPayError(err?.message || 'Error processing payment.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'BOOKING_CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Booking Confirmed</span>
          </span>
        );
      case 'IN_PRODUCTION':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <Package className="w-3.5 h-3.5 text-indigo-600" />
            <span>In Production</span>
          </span>
        );
      case 'READY_FOR_DELIVERY':
      case 'FINAL_PAYMENT_PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Final Payment Pending</span>
          </span>
        );
      case 'FINAL_PAYMENT_RECEIVED':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fully Paid - Ready to Ship</span>
          </span>
        );
      case 'SHIPPED':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold">
            <Truck className="w-3.5 h-3.5 text-sky-600" />
            <span>Shipped</span>
          </span>
        );
      case 'DELIVERED':
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Delivered</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/products/gem-buddy"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to GEM Product Page</span>
          </Link>
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            AWIE Customer Portal
          </span>
        </div>

        {/* Header Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORDER TRACKING &amp; BALANCE PAYMENTS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Track GEM Pre-Booking
          </h1>
          <p className="text-sm text-slate-600 font-medium max-w-lg mx-auto">
            Enter your unique booking ticket code (e.g. <strong>AWIE-G1-XXXXXX</strong>) to check manufacturing status or complete your remaining product balance.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="p-3 sm:p-4 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter Booking Code (e.g. AWIE-G1-9X8K2M)"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 font-mono text-sm font-bold uppercase tracking-wider text-slate-900"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-3 px-6 rounded-2xl bg-[#2563EB] hover:bg-blue-600 disabled:opacity-60 text-white font-extrabold text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>Find Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Final Payment Success Notice */}
        {finalPaidSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Final payment completed successfully! Your order has been marked as fully paid and moved to shipping preparation.
            </span>
          </div>
        )}

        {/* Booking Details Card */}
        {booking && (
          <div className="space-y-6">
            
            {/* Status Overview Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Ticket Code
                  </span>
                  <span className="font-mono text-2xl sm:text-3xl font-black text-[#2563EB] tracking-wider">
                    {booking.ticketCode}
                  </span>
                </div>
                <div>{getStatusBadge(booking.bookingStatus)}</div>
              </div>

              {/* Grid Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium block">Customer</span>
                  <span className="font-bold text-slate-900 text-sm block mt-0.5 truncate">
                    {booking.customerName}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium block">Product</span>
                  <span className="font-bold text-slate-900 text-sm block mt-0.5">
                    {booking.productName}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium block">Pre-Booking Paid</span>
                  <span className="font-extrabold text-emerald-600 text-sm block mt-0.5">
                    ₹{booking.bookingAmount.toLocaleString()}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-medium block">Remaining Balance</span>
                  <span className="font-extrabold text-amber-600 text-sm block mt-0.5">
                    ₹{booking.remainingAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Pricing Breakdown Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-200/80 space-y-3">
                <h3 className="font-black text-slate-900 text-sm">Payment &amp; Price Adjustment Breakdown</h3>
                
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Product Special Launch Price:</span>
                  <span className="font-bold text-slate-900">₹{booking.launchPrice.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-emerald-700">
                  <span>Pre-Booking Deposit Credited:</span>
                  <span className="font-bold">-₹{booking.bookingAmount.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Remaining Product Amount:</span>
                  <span className="font-bold text-slate-900">₹{booking.remainingAmount.toLocaleString()}</span>
                </div>

                {booking.deliveryCharge > 0 && (
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Delivery / Shipping Charge:</span>
                    <span className="font-bold text-slate-900">+₹{booking.deliveryCharge.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-blue-200 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-black text-slate-900 block">Total Payable Now</span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {booking.totalPayableNow === 0
                        ? 'Paid in full! No balance remaining.'
                        : 'Balance due for dispatch'}
                    </span>
                  </div>
                  <span className="text-xl font-black text-[#2563EB]">
                    ₹{booking.totalPayableNow.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Balance Payment Section: Locked until Launch Day (13 Sept), Unlocked on/after Launch Day */}
              {booking.totalPayableNow > 0 && (
                <div className="pt-2 space-y-3">
                  {!booking.isLaunchUnlocked ? (
                    /* LOCKED STATE: Displayed before 13 Sept Launch Day */
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-blue-950 border border-amber-500/30 text-white shadow-xl space-y-3.5">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                            <Lock className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-amber-300 block">
                              Final Balance Payment Locked
                            </span>
                            <span className="text-[11px] text-slate-300 font-medium">
                              Unlocks on Launch Day — {booking.launchDate || '13 September 2026'}
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-extrabold uppercase tracking-wide">
                          Pre-Launch Phase
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 font-medium leading-relaxed">
                        Your pre-booking reservation and deposit of <strong>₹{booking.bookingAmount}</strong> are locked in and credited towards the <strong>₹{booking.launchPrice}</strong> special launch price.
                        The remaining balance of <strong>₹{booking.totalPayableNow.toLocaleString()}</strong> will unlock for payment on Launch Day (<strong>{booking.launchDate || '13 September 2026'}</strong>) when your device is ready for dispatch.
                      </p>

                      <button
                        type="button"
                        disabled
                        className="w-full py-3.5 px-6 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-400 font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed select-none"
                      >
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Payment Locked Until Product Launch Day (13 Sept)</span>
                      </button>

                      <div className="flex items-start gap-2 pt-1 text-[11px] text-blue-300 bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                        <Bell className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Automatic Email Alert:</strong> You will automatically receive an email notification on 13 September with a direct payment link to complete this order.
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* UNLOCKED STATE: Available on or after Launch Day or when triggered by Admin */
                    <>
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                        <Unlock className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>GEM is officially launched! Balance payment is now unlocked.</span>
                      </div>

                      {finalPayError && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                          {finalPayError}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handlePayRemaining}
                        disabled={payingFinal}
                        className="w-full py-4 px-6 rounded-2xl bg-[#2563EB] hover:bg-blue-600 disabled:opacity-60 text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                      >
                        {payingFinal ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Connecting to Razorpay...</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4" />
                            <span>Pay Remaining ₹{booking.totalPayableNow.toLocaleString()} via Razorpay</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                      <p className="text-[11px] text-slate-500 text-center font-medium">
                        Pre-booking credit of ₹{booking.bookingAmount} is locked and automatically applied.
                      </p>
                    </>
                  )}
                </div>
              )}

              {/* Fully Paid Badge */}
              {booking.totalPayableNow === 0 && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Your GEM companion order has been completely paid! Tracking information will be displayed here once in transit.
                  </span>
                </div>
              )}

            </div>

            {/* Render Digital Ticket Card */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider text-center">
                Digital Pre-Booking Confirmation Pass
              </h3>
              <GemTicketCard
                ticket={{
                  ticketCode: booking.ticketCode,
                  bookingId: booking.bookingId,
                  customerName: booking.customerName,
                  productVersion: booking.productVersion,
                  productName: booking.productName,
                  launchPrice: booking.launchPrice,
                  bookingAmount: booking.bookingAmount,
                  amountPaid: booking.amountPaid,
                  remainingAmount: booking.remainingAmount,
                  createdAt: booking.createdAt,
                  paymentStatus: 'paid',
                  bookingStatus: booking.bookingStatus,
                }}
                showLookupLink={false}
              />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function GemBookingLookupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
        </div>
      }
    >
      <GemLookupContent />
    </Suspense>
  );
}
