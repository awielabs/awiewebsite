'use client';

import React, { useState } from 'react';
import { CreditCard, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

interface RazorpayCheckoutButtonProps {
  amountInRupees: number; // e.g. 499 for ₹499
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  onSuccess?: (paymentDetails: { paymentId: string; orderId: string }) => void;
  onFailure?: (error: string) => void;
  buttonText?: string;
  className?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayCheckoutButton({
  amountInRupees,
  customerName = 'Valued Customer',
  customerEmail = 'awielabs@gmail.com',
  customerPhone = '',
  onSuccess,
  onFailure,
  buttonText,
  className,
}: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Calculate amount in paise (Min 100 paise = ₹1)
      const amountInPaise = Math.round(amountInRupees * 100);

      if (amountInPaise < 100) {
        throw new Error('Minimum order amount must be at least ₹1 (100 paise).');
      }

      // 2. Call backend /api/create-order
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to create order on server.');
      }

      // 3. Ensure Razorpay script is loaded on window
      if (typeof window === 'undefined' || !window.Razorpay) {
        throw new Error('Razorpay SDK script failed to load. Please check your internet connection.');
      }

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TWNfk2GxuVeJCD';

      // 4. Configure Razorpay Standard Checkout options
      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'AWIE Store',
        description: `Electronics & Hardware Order (₹${amountInRupees.toLocaleString()})`,
        image: '/logo.jpeg',
        order_id: orderData.order_id,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // 5. Send credentials to verify payment backend
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setLoading(false);
              if (onSuccess) {
                onSuccess({
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                });
              }
            } else {
              const err = verifyData.error || 'Payment signature verification failed.';
              setErrorMessage(err);
              setLoading(false);
              if (onFailure) onFailure(err);
            }
          } catch (verifyErr: any) {
            const err = verifyErr?.message || 'Error communicating with verification server.';
            setErrorMessage(err);
            setLoading(false);
            if (onFailure) onFailure(err);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            console.log('Payment modal dismissed by user');
          },
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        notes: {
          platform: 'AWIE Web Platform',
        },
        theme: {
          color: '#2563EB',
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      // Handle payment failure event
      razorpayInstance.on('payment.failed', function (response: any) {
        const failureReason = response.error?.description || 'Payment transaction failed.';
        setErrorMessage(failureReason);
        setLoading(false);
        if (onFailure) onFailure(failureReason);
      });

      razorpayInstance.open();
    } catch (err: any) {
      console.error('Razorpay Checkout Handler Error:', err);
      const msg = err?.message || 'Failed to initiate checkout.';
      setErrorMessage(msg);
      setLoading(false);
      if (onFailure) onFailure(msg);
    }
  };

  return (
    <div className="w-full space-y-2">
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handlePayment}
        disabled={loading || amountInRupees < 1}
        className={
          className ||
          'w-full py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98] text-white font-extrabold text-xs transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
        }
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Initiating Razorpay...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 text-white" />
            <span>{buttonText || `Pay ₹${amountInRupees.toLocaleString()} via Razorpay`}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-blue-200 ml-auto" />
          </>
        )}
      </button>
    </div>
  );
}
