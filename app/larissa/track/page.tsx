'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Heart,
  Search,
  ArrowLeft,
  RefreshCw,
  Gift,
  ShieldCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface OrderData {
  id: string;
  trackingCode: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: 'order_placed' | 'packed' | 'in_transit' | 'out_for_delivery' | 'delivered';
  statusTitle: string;
  statusMessage: string;
  courierPartner?: string;
  courierAwb?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
  history: Array<{
    status: string;
    title: string;
    description: string;
    timestamp: string;
  }>;
}

const STEPS = [
  {
    key: 'order_placed',
    title: 'Order Confirmed',
    subtitle: 'Surprise gift details recorded',
    icon: Sparkles
  },
  {
    key: 'packed',
    title: 'Gift is Packed',
    subtitle: 'Custom framed portrait packed in luxury box',
    icon: Gift
  },
  {
    key: 'in_transit',
    title: 'In Transit',
    subtitle: 'Dispatched via express delivery hub',
    icon: Truck
  },
  {
    key: 'out_for_delivery',
    title: 'Out for Delivery (Reaching Today)',
    subtitle: 'With delivery agent — arriving today',
    icon: Package
  },
  {
    key: 'delivered',
    title: 'Received by Larissa',
    subtitle: 'Safely delivered & received with love',
    icon: Heart
  }
];

function getStepIndex(status: string) {
  switch (status) {
    case 'order_placed':
      return 0;
    case 'packed':
      return 1;
    case 'in_transit':
      return 2;
    case 'out_for_delivery':
      return 3;
    case 'delivered':
      return 4;
    default:
      return 0;
  }
}

function TrackingContent() {
  const searchParams = useSearchParams();
  const [codeInput, setCodeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const fetchTracking = async (codeToSearch: string) => {
    const clean = codeToSearch.trim();
    if (!clean) {
      setError('Please enter your gift tracking code.');
      return;
    }

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const res = await fetch(`/api/larissa-gift/track?code=${encodeURIComponent(clean)}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setOrder(null);
        setError(data.error || 'Tracking code not found. Please double check your code.');
      }
    } catch {
      setOrder(null);
      setError('Unable to fetch delivery status. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialCode = searchParams?.get('code');
    if (initialCode) {
      setCodeInput(initialCode);
      fetchTracking(initialCode);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(codeInput);
  };

  const activeStepIdx = order ? getStepIndex(order.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/larissa"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-all backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Birthday Page</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          Private Delivery Tracker
        </span>
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-wider uppercase">
          <Gift className="w-3.5 h-3.5" />
          Larissa&apos;s 21st Birthday Surprise
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-400 to-rose-400 tracking-tight">
          Track Your Framed Gift 🎁
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Enter your unique gift code to view live delivery status, dispatch updates, and arrival timeline.
        </p>
      </div>

      {/* Code Input Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto mb-10 p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row gap-2"
      >
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
            placeholder="e.g. AWIE-LARISSA-XXXX"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl sm:rounded-2xl bg-slate-950/70 border border-slate-800 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white placeholder-slate-600 font-mono text-sm uppercase tracking-wider outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:via-rose-400 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              <span>Tracking...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4 text-slate-950" />
              <span>Track Gift</span>
            </>
          )}
        </button>
      </form>

      {/* Error Feedback */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Live Order Status Display */}
      <AnimatePresence mode="wait">
        {order && (
          <motion.div
            key={order.trackingCode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Main Status Hero Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-wider">
                      {order.trackingCode}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-pink-500/20 text-pink-300 border border-pink-500/30 animate-pulse">
                      Live Status
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Recipient: <strong className="text-white">{order.name}</strong> • Updated:{' '}
                    {new Date(order.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
                    {new Date(order.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </p>
                </div>

                <button
                  onClick={() => fetchTracking(order.trackingCode)}
                  disabled={loading}
                  className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh Status</span>
                </button>
              </div>

              {/* Status Banner */}
              <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-pink-500/15 via-rose-500/10 to-amber-500/10 border border-pink-500/30 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-amber-500 flex items-center justify-center text-slate-950 font-black flex-shrink-0 shadow-lg shadow-pink-500/20">
                  {order.status === 'delivered' ? (
                    <Heart className="w-6 h-6 fill-slate-950" />
                  ) : order.status === 'out_for_delivery' ? (
                    <Package className="w-6 h-6" />
                  ) : order.status === 'in_transit' ? (
                    <Truck className="w-6 h-6" />
                  ) : order.status === 'packed' ? (
                    <Gift className="w-6 h-6" />
                  ) : (
                    <Sparkles className="w-6 h-6" />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {order.statusTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {order.statusMessage}
                  </p>
                  {order.estimatedDelivery && (
                    <div className="pt-2 flex items-center gap-2 text-xs text-amber-300 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Delivery Timing: <strong>{order.estimatedDelivery}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stepper Timeline */}
              <div className="mt-10">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6">
                  Delivery Progress Stages
                </h4>

                <div className="relative">
                  {/* Desktop / Tablet Horizontal Bar */}
                  <div className="hidden md:block absolute top-6 left-8 right-8 h-1 bg-slate-800 -z-0">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 transition-all duration-700"
                      style={{
                        width: `${(activeStepIdx / (STEPS.length - 1)) * 100}%`
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-3 relative z-10">
                    {STEPS.map((step, idx) => {
                      const StepIcon = step.icon;
                      const isCompleted = idx < activeStepIdx;
                      const isCurrent = idx === activeStepIdx;
                      const isUpcoming = idx > activeStepIdx;

                      return (
                        <div
                          key={step.key}
                          className="flex md:flex-col items-center md:text-center gap-4 md:gap-3"
                        >
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                              isCurrent
                                ? 'bg-gradient-to-br from-pink-500 to-amber-400 text-slate-950 ring-4 ring-pink-500/30 scale-110 shadow-lg shadow-pink-500/30'
                                : isCompleted
                                ? 'bg-emerald-500 text-slate-950 font-bold'
                                : 'bg-slate-800 text-slate-500 border border-slate-700'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-6 h-6 text-slate-950" />
                            ) : (
                              <StepIcon className="w-5 h-5" />
                            )}
                          </div>

                          <div className="text-left md:text-center">
                            <span
                              className={`text-xs font-bold block ${
                                isCurrent
                                  ? 'text-pink-400'
                                  : isCompleted
                                  ? 'text-emerald-300'
                                  : 'text-slate-500'
                              }`}
                            >
                              {step.title}
                            </span>
                            <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                              {step.subtitle}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Destination Address Card */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Delivery Destination
                  </h4>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <p>
                    <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Recipient Name</span>
                    <span className="text-white font-bold">{order.name}</span>
                  </p>
                  <p>
                    <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Address</span>
                    <span className="text-slate-200 leading-relaxed block">{order.address}</span>
                  </p>
                  <p>
                    <span className="text-slate-500 block text-[11px] uppercase tracking-wider">City, State & PIN</span>
                    <span className="text-slate-200">
                      {order.city}{order.city && order.state ? ', ' : ''}{order.state} - {order.pincode}
                    </span>
                  </p>
                </div>
              </div>

              {/* Courier & Dispatch Card */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Courier & Dispatch Information
                  </h4>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Courier Service</span>
                    <span className="text-white font-semibold">
                      {order.courierPartner || 'AWIE Dedicated Express Dispatch'}
                    </span>
                  </div>
                  {order.courierAwb && (
                    <div>
                      <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Waybill / AWB #</span>
                      <span className="font-mono text-amber-300 font-bold">{order.courierAwb}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Handcrafted Edition</span>
                    <span className="text-slate-300">Custom 21st Birthday Framed Recreation Portrait</span>
                  </div>
                  <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-pink-400" />
                    <span>Order Created: {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status History Timeline */}
            {order.history && order.history.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-pink-400" />
                  <span>Activity Log</span>
                </h4>

                <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {order.history.map((h, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-pink-500 flex items-center justify-center flex-shrink-0 z-10">
                        <div className="w-2 h-2 rounded-full bg-pink-400" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-white">{h.title}</span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
                            {new Date(h.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{h.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helpful Hint */}
      {!order && !loading && !hasSearched && (
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-center max-w-lg mx-auto space-y-2">
          <p className="text-xs sm:text-sm text-slate-400">
            Lost your code? Check the confirmation email sent to your inbox or reach out to Shovin directly!
          </p>
        </div>
      )}
    </div>
  );
}

export default function LarissaTrackingPage() {
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden font-sans selection:bg-[#F59E0B] selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-pink-600/15 via-purple-600/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500 font-mono text-xs">Loading tracker...</div>}>
        <TrackingContent />
      </Suspense>
    </div>
  );
}
