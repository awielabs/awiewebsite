'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  ShieldCheck,
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  ArrowRight,
  AlertCircle,
  Loader2,
  Check,
} from 'lucide-react';
import { useAuthSession } from '@/lib/useAuthSession';
import { GEM_PRODUCTS, GemVersion } from '@/lib/gemPricing';
import GemTicketCard from './GemTicketCard';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface GemBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVersion?: GemVersion;
}

export default function GemBookingModal({
  isOpen,
  onClose,
  defaultVersion = 'v1',
}: GemBookingModalProps) {
  const { user } = useAuthSession();

  const [selectedVersion, setSelectedVersion] = useState<GemVersion>(defaultVersion);
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pincode, setPincode] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedTicket, setConfirmedTicket] = useState<any | null>(null);

  // Sync default version when modal opens or prop changes
  useEffect(() => {
    setSelectedVersion(defaultVersion);
  }, [defaultVersion, isOpen]);

  // Pre-populate if user is logged in
  useEffect(() => {
    if (user) {
      if (!customerName && user.name) setCustomerName(user.name);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const config = GEM_PRODUCTS[selectedVersion];

  const handleStartBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please provide a valid 10-digit mobile number.');
      return;
    }
    if (!addressLine.trim() || !city.trim() || !stateName.trim() || !pincode.trim()) {
      setErrorMessage('Please fill in complete delivery address, city, state, and pincode.');
      return;
    }

    // Ensure Razorpay SDK is loaded
    if (typeof window === 'undefined' || !window.Razorpay) {
      setErrorMessage('Payment gateway is loading. Please check your internet connection and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create order on server (server dictates exact amount)
      const res = await fetch('/api/gem-booking/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productVersion: selectedVersion,
          customerName: customerName.trim(),
          email: email.trim(),
          phone: cleanPhone,
          addressLine: addressLine.trim(),
          city: city.trim(),
          state: stateName.trim(),
          pincode: pincode.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create pre-booking order.');
      }

      const { orderId, keyId, bookingId } = data;

      // 2. Open Razorpay Checkout
      const options = {
        key: keyId,
        amount: data.amountPaise,
        currency: data.currency || 'INR',
        name: 'AWIE Labs',
        description: `Pre-Booking for ${config.name}`,
        order_id: orderId,
        image: 'https://awie.in/logo.jpeg',
        prefill: {
          name: customerName,
          email: email,
          contact: cleanPhone,
        },
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
            const verifyRes = await fetch('/api/gem-booking/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                bookingId,
                customerDetails: {
                  customerName,
                  email,
                  phone: cleanPhone,
                  productVersion: selectedVersion,
                  addressLine,
                  city,
                  state: stateName,
                  pincode,
                },
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Payment verification failed on server.');
            }

            // Success: show ticket
            setConfirmedTicket(verifyData.ticket);
          } catch (verifyErr: any) {
            console.error('Verification error:', verifyErr);
            setErrorMessage(
              verifyErr?.message || 'Payment completed, but verification had a delay. Please check your email for the ticket.'
            );
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setIsSubmitting(false);
        setErrorMessage(resp.error?.description || 'Payment failed or was cancelled. Please try again.');
      });
      rzp.open();
    } catch (err: any) {
      console.error('Pre-booking error:', err);
      setErrorMessage(err?.message || 'An unexpected error occurred while initiating pre-booking.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-200" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight leading-tight">
                {confirmedTicket ? 'Pre-Booking Confirmed!' : 'Reserve Your GEM Companion'}
              </h2>
              <span className="text-[11px] text-blue-200 font-medium">
                Official AWIE Labs In-House Hardware Batch
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {confirmedTicket ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Your pre-booking has been confirmed! A confirmation email with this ticket pass has been sent to <strong>{confirmedTicket.email}</strong>.
                </span>
              </div>

              <GemTicketCard
                ticket={confirmedTicket}
                onClose={onClose}
              />
            </div>
          ) : (
            <form onSubmit={handleStartBooking} className="space-y-6">
              
              {/* Version Selector Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select GEM Version:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* GEM v1 Option */}
                  <button
                    type="button"
                    onClick={() => setSelectedVersion('v1')}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                      selectedVersion === 'v1'
                        ? 'border-[#2563EB] bg-blue-50/70 shadow-md shadow-blue-500/10'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-slate-900 text-sm">GEM v1 Standard</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-black text-[10px]">
                        ₹199
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Launch price: ₹1,200
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-1">
                      ₹1,001 remaining balance
                    </div>
                  </button>

                  {/* GEM v2 Option */}
                  <button
                    type="button"
                    onClick={() => setSelectedVersion('v2')}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                      selectedVersion === 'v2'
                        ? 'border-[#2563EB] bg-blue-50/70 shadow-md shadow-blue-500/10'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-slate-900 text-sm">GEM v2 Biometric</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-black text-[10px]">
                        ₹299
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Launch price: ₹1,650
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-1">
                      ₹1,351 remaining balance
                    </div>
                  </button>

                </div>
              </div>

              {/* Price Transparency Callout */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Pre-Booking Policy & Price Guarantee</span>
                </div>
                <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
                  • <strong>Pre-booking amount is adjusted against the final product price.</strong><br />
                  • You pay only <strong>₹{config.bookingAmount}</strong> now to reserve your slot.<br />
                  • Remaining balance of <strong>₹{config.remainingAmount}</strong> is payable when your device is ready for dispatch.<br />
                  • Delivery charges are additional.
                </p>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Customer Information:
                  </span>
                  {user && (
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Auto-filled from account
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Phone Number (10 digits) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Delivery Address:
                </span>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Street Address / Flat / Floor *</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      placeholder="Flat 402, Building A, Street 5"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Navi Mumbai"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      placeholder="Maharashtra"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="400706"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Error Box */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Action Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-blue-600 disabled:opacity-60 text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Razorpay Checkout...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Pay ₹{config.bookingAmount} Pre-Booking via Razorpay</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-500 mt-2 font-medium">
                  🔒 Secured with 256-bit Razorpay PCI-DSS encryption. UPI, Cards &amp; NetBanking accepted.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
