'use client';

import React, { useState } from 'react';
import { MapPin, Truck, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface PincodeCheckerProps {
  productWeightGrams?: number;
  className?: string;
}

export default function PincodeChecker({ productWeightGrams = 100, className = '' }: PincodeCheckerProps) {
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    shippingCharge: number;
    courierName: string;
    estimatedDays: string;
    deliveryPincode: string;
  } | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!pincode || pincode.trim().length !== 6 || isNaN(Number(pincode))) {
      setError('Please enter a valid 6-digit Indian Pincode.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/shipping/shiprocket?action=rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deliveryPincode: pincode.trim(),
          weightGrams: productWeightGrams
        })
      });

      const data = await res.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Could not fetch shipping rates for this pincode.');
      }
    } catch (err) {
      setError('Failed to calculate shipping rate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
        <MapPin className="w-4 h-4 text-[#2563EB]" />
        <span>Check Delivery &amp; Shipping Charges</span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Pincode (e.g. 400050)"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB]"
        />
        <button
          onClick={handleCheck}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <span>Check</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {error && <p className="text-[11px] font-medium text-rose-600">{error}</p>}

      {result && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-emerald-800 font-bold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Serviceable to {result.deliveryPincode}
            </span>
            <span className="font-mono text-emerald-900 font-black">Shipping: ₹{result.shippingCharge}</span>
          </div>

          <div className="flex justify-between text-[11px] text-emerald-700">
            <span>Estimated Delivery: {result.estimatedDays}</span>
            <span>Courier: {result.courierName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
