'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  KeyRound,
  Package,
  Truck,
  Heart,
  Gift,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Send,
  FileText,
  Plus,
  Trash2,
  X
} from 'lucide-react';

interface OrderData {
  id: string;
  trackingCode: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  note?: string;
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

const STATUS_OPTIONS: Array<{
  key: OrderData['status'];
  label: string;
  shortLabel: string;
  icon: any;
  color: string;
  defaultNote: string;
}> = [
  {
    key: 'order_placed',
    label: 'Order Confirmed ✨',
    shortLabel: 'Confirmed',
    icon: Sparkles,
    color: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    defaultNote: 'Surprise gift details recorded and queued for preparation.'
  },
  {
    key: 'packed',
    label: 'Gift is Packed 🎁',
    shortLabel: 'Packed',
    icon: Gift,
    color: 'border-pink-500/30 text-pink-300 bg-pink-500/10',
    defaultNote: 'Gift framed portrait is packed with luxury wrapping & sealed with love.'
  },
  {
    key: 'in_transit',
    label: 'In Transit 🚚',
    shortLabel: 'In Transit',
    icon: Truck,
    color: 'border-blue-500/30 text-blue-300 bg-blue-500/10',
    defaultNote: 'Package is in transit via express dispatch hub.'
  },
  {
    key: 'out_for_delivery',
    label: 'Out for Delivery (Reaching Today) 🛵',
    shortLabel: 'Reaching Today',
    icon: Package,
    color: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
    defaultNote: 'Package is out with the delivery agent and will reach your doorstep today!'
  },
  {
    key: 'delivered',
    label: 'Received by Larissa 💖',
    shortLabel: 'Delivered',
    icon: Heart,
    color: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
    defaultNote: 'Gift package safely delivered and received with love! Happy 21st Birthday!'
  }
];

export default function LarissaAdminPortal() {
  const [passcode, setPasscode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  // Editing state for an order
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<OrderData['status']>('order_placed');
  const [editCustomNote, setEditCustomNote] = useState('');
  const [editCourierPartner, setEditCourierPartner] = useState('');
  const [editCourierAwb, setEditCourierAwb] = useState('');
  const [editEstimatedDelivery, setEditEstimatedDelivery] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateFeedback, setUpdateFeedback] = useState<{ code: string; msg: string; type: 'success' | 'error' } | null>(null);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // New Order Creation Modal State
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({
    name: 'Larissa',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    note: '',
    trackingCode: '',
    status: 'order_placed' as OrderData['status'],
    courierPartner: 'Dedicated Express Dispatch',
    courierAwb: '',
    estimatedDelivery: 'Preparing for courier dispatch'
  });
  const [isSubmittingNewOrder, setIsSubmittingNewOrder] = useState(false);

  // Check existing session
  useEffect(() => {
    const saved = sessionStorage.getItem('larissa_admin_auth');
    if (saved === 'shovin1219') {
      setPasscode('shovin1219');
      setIsAuthenticated(true);
      fetchOrders('shovin1219');
    }
  }, []);

  // Background Live Sync: auto-refresh orders list every 10 seconds
  useEffect(() => {
    if (!isAuthenticated || !passcode) return;
    const interval = setInterval(() => {
      fetchOrders(passcode);
    }, 10000);
    return () => clearInterval(interval);
  }, [isAuthenticated, passcode]);

  const handleGenerateCode = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setNewOrderForm((prev) => ({ ...prev, trackingCode: `AWIE-LARISSA-${randomSuffix}` }));
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderForm.name.trim() || !newOrderForm.phone.trim() || !newOrderForm.address.trim()) {
      alert('Please fill recipient name, phone, and delivery address.');
      return;
    }
    setIsSubmittingNewOrder(true);
    try {
      const code =
        newOrderForm.trackingCode.trim() ||
        `AWIE-LARISSA-${Math.floor(1000 + Math.random() * 9000)}`;

      const res = await fetch('/api/larissa-gift/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode,
          action: 'create_order',
          ...newOrderForm,
          trackingCode: code
        })
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) => [
          data.order,
          ...prev.filter((o) => o.trackingCode !== data.order.trackingCode)
        ]);
        setUpdateFeedback({
          code: data.order.trackingCode,
          msg: `New order created & live synced! Code: ${data.order.trackingCode}`,
          type: 'success'
        });
        setIsCreatingOrder(false);
        // Reset form
        setNewOrderForm({
          name: 'Larissa',
          phone: '',
          email: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          note: '',
          trackingCode: '',
          status: 'order_placed',
          courierPartner: 'Dedicated Express Dispatch',
          courierAwb: '',
          estimatedDelivery: 'Preparing for courier dispatch'
        });
      } else {
        alert(data.error || 'Failed to create order.');
      }
    } catch {
      alert('Network error while creating order.');
    } finally {
      setIsSubmittingNewOrder(false);
    }
  };

  const handleDeleteOrder = async (trackingCodeToDelete: string) => {
    if (!window.confirm(`Are you sure you want to delete order "${trackingCodeToDelete}"?`)) {
      return;
    }
    try {
      const res = await fetch('/api/larissa-gift/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode,
          action: 'delete_order',
          trackingCode: trackingCodeToDelete
        })
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o.trackingCode !== trackingCodeToDelete));
        setUpdateFeedback({
          code: trackingCodeToDelete,
          msg: `Order deleted successfully.`,
          type: 'success'
        });
      }
    } catch {
      alert('Failed to delete order.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsVerifying(true);

    try {
      const res = await fetch('/api/larissa-gift/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim(), action: 'verify' })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('larissa_admin_auth', passcode.trim());
        fetchOrders(passcode.trim());
      } else {
        setLoginError('Incorrect gift admin passcode.');
      }
    } catch {
      setLoginError('Network error while authenticating.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    sessionStorage.removeItem('larissa_admin_auth');
  };

  const fetchOrders = async (authPass: string) => {
    setIsLoadingOrders(true);
    setOrdersError('');
    try {
      const res = await fetch('/api/larissa-gift/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: authPass, action: 'list' })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setOrdersError(data.error || 'Failed to load gift orders.');
      }
    } catch {
      setOrdersError('Failed to fetch orders from server.');
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const startEditing = (order: OrderData) => {
    setEditingCode(order.trackingCode);
    setEditStatus(order.status);
    setEditCustomNote(order.statusMessage || '');
    setEditCourierPartner(order.courierPartner || 'Dedicated Express Dispatch');
    setEditCourierAwb(order.courierAwb || '');
    setEditEstimatedDelivery(order.estimatedDelivery || '');
  };

  const handleUpdateStatus = async (trackingCode: string, targetStatus?: OrderData['status']) => {
    setIsUpdating(true);
    setUpdateFeedback(null);

    const finalStatus = targetStatus || editStatus;
    const meta = STATUS_OPTIONS.find((s) => s.key === finalStatus);
    const finalNote = editCustomNote.trim() || meta?.defaultNote || '';

    try {
      const res = await fetch('/api/larissa-gift/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode,
          action: 'update_status',
          trackingCode,
          status: finalStatus,
          customNote: finalNote,
          courierPartner: editCourierPartner.trim(),
          courierAwb: editCourierAwb.trim(),
          estimatedDelivery: editEstimatedDelivery.trim()
        })
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.trackingCode === trackingCode ? data.order : o))
        );
        setUpdateFeedback({
          code: trackingCode,
          msg: `Status updated to: "${data.order.statusTitle}"!`,
          type: 'success'
        });
        setEditingCode(null);
      } else {
        setUpdateFeedback({
          code: trackingCode,
          msg: data.error || 'Failed to update status.',
          type: 'error'
        });
      }
    } catch {
      setUpdateFeedback({
        code: trackingCode,
        msg: 'Network error while updating status.',
        type: 'error'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const copyToClipboard = (text: string, code: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Passcode gate view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070B14] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-pink-600/15 via-amber-500/10 to-transparent rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-2xl relative z-10 space-y-6"
        >
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-amber-500 flex items-center justify-center mx-auto text-slate-950 shadow-xl shadow-pink-500/20">
              <KeyRound className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white">Gift Admin Portal</h1>
            <p className="text-xs text-slate-400">
              Manage gift packaging, courier dispatch &amp; delivery statuses for Larissa.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white placeholder-slate-600 font-mono text-sm tracking-wider outline-none transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isVerifying || !passcode.trim()}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:via-rose-400 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Unlock className="w-4 h-4" />
              <span>{isVerifying ? 'Authenticating...' : 'Unlock Gift Admin'}</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/larissa"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              ← Back to Larissa Birthday Surprise
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Stats calculation
  const totalOrders = orders.length;
  const packedCount = orders.filter((o) => o.status === 'packed').length;
  const inTransitCount = orders.filter((o) => o.status === 'in_transit').length;
  const outForDeliveryCount = orders.filter((o) => o.status === 'out_for_delivery').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 p-4 sm:p-8 font-sans relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-pink-600/10 via-amber-500/5 to-transparent rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Top Admin Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                Admin Mode: Shovin
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Dispatch Sync
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Larissa Gift Delivery Admin 🎁
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                handleGenerateCode();
                setIsCreatingOrder(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-pink-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Create / Sync Order</span>
            </button>
            <button
              onClick={() => fetchOrders(passcode)}
              disabled={isLoadingOrders}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-slate-700 flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingOrders ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition-all border border-rose-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Portal</span>
            </button>
          </div>
        </header>

        {/* Create / Sync Order Modal */}
        <AnimatePresence>
          {isCreatingOrder && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-pink-500/30 shadow-2xl space-y-6 relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Gift className="w-5 h-5 text-pink-400" />
                    <span>Create &amp; Sync Gift Order</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Directly create an order in the database and make it immediately trackable on /larissa/track.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreatingOrder(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 uppercase font-mono">
                      Tracking Code *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newOrderForm.trackingCode}
                        onChange={(e) =>
                          setNewOrderForm({ ...newOrderForm, trackingCode: e.target.value.toUpperCase() })
                        }
                        placeholder="AWIE-LARISSA-XXXX"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs uppercase outline-none focus:border-pink-500"
                      />
                      <button
                        type="button"
                        onClick={handleGenerateCode}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
                        title="Auto Generate"
                      >
                        🎲
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 uppercase font-mono">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newOrderForm.name}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 uppercase font-mono">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newOrderForm.phone}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, phone: e.target.value })}
                      placeholder="+91..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 uppercase font-mono">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newOrderForm.email}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, email: e.target.value })}
                      placeholder="larissa@example.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] text-slate-400 uppercase font-mono">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={newOrderForm.address}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, address: e.target.value })}
                      placeholder="House / Flat / Area"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 uppercase font-mono">
                      City
                    </label>
                    <input
                      type="text"
                      value={newOrderForm.city}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 uppercase font-mono">
                      State
                    </label>
                    <input
                      type="text"
                      value={newOrderForm.state}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, state: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 uppercase font-mono">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={newOrderForm.pincode}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, pincode: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 uppercase font-mono">
                      Initial Status
                    </label>
                    <select
                      value={newOrderForm.status}
                      onChange={(e) =>
                        setNewOrderForm({ ...newOrderForm, status: e.target.value as OrderData['status'] })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-pink-500"
                    >
                      <option value="order_placed">Order Confirmed ✨</option>
                      <option value="packed">Gift is Packed 🎁</option>
                      <option value="in_transit">In Transit 🚚</option>
                      <option value="out_for_delivery">Out for Delivery (Reaching Today) 🛵</option>
                      <option value="delivered">Received by Larissa 💖</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 uppercase font-mono">
                      Courier Service
                    </label>
                    <input
                      type="text"
                      value={newOrderForm.courierPartner}
                      onChange={(e) =>
                        setNewOrderForm({ ...newOrderForm, courierPartner: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 uppercase font-mono">
                      Waybill / AWB #
                    </label>
                    <input
                      type="text"
                      value={newOrderForm.courierAwb}
                      onChange={(e) =>
                        setNewOrderForm({ ...newOrderForm, courierAwb: e.target.value })
                      }
                      placeholder="e.g. BD-781920"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsCreatingOrder(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingNewOrder}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmittingNewOrder ? 'Creating...' : 'Save & Publish Live Order'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Feedback Banner */}
        {updateFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm ${
              updateFeedback.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>
                <strong>[{updateFeedback.code}]</strong> {updateFeedback.msg}
              </span>
            </div>
            <button
              onClick={() => setUpdateFeedback(null)}
              className="text-slate-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-mono block">
              Total Submissions
            </span>
            <span className="text-xl sm:text-2xl font-black text-white mt-1 block">
              {totalOrders}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-pink-500/5 border border-pink-500/20 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs text-pink-400 uppercase font-mono block flex items-center gap-1">
              <Gift className="w-3 h-3" /> Packed
            </span>
            <span className="text-xl sm:text-2xl font-black text-pink-300 mt-1 block">
              {packedCount}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs text-blue-400 uppercase font-mono block flex items-center gap-1">
              <Truck className="w-3 h-3" /> In Transit
            </span>
            <span className="text-xl sm:text-2xl font-black text-blue-300 mt-1 block">
              {inTransitCount}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-purple-500/5 border border-purple-500/20 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs text-purple-400 uppercase font-mono block flex items-center gap-1">
              <Package className="w-3 h-3" /> Reaching Today
            </span>
            <span className="text-xl sm:text-2xl font-black text-purple-300 mt-1 block">
              {outForDeliveryCount}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-md col-span-2 sm:col-span-1">
            <span className="text-[10px] sm:text-xs text-emerald-400 uppercase font-mono block flex items-center gap-1">
              <Heart className="w-3 h-3" /> Delivered
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-300 mt-1 block">
              {deliveredCount}
            </span>
          </div>
        </div>

        {/* Orders Listing */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-pink-400" />
              <span>Gift Orders &amp; Dispatch Statuses</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
            </span>
          </div>

          {isLoadingOrders && orders.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs font-mono">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-dashed border-slate-800 space-y-2">
              <Gift className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-300">No Gift Submissions Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                When Larissa reaches Step 3 and submits her delivery address, her order and gift tracking code will appear here instantly.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const currentStatusMeta = STATUS_OPTIONS.find((s) => s.key === order.status);
                const isEditingThis = editingCode === order.trackingCode;

                return (
                  <div
                    key={order.trackingCode}
                    className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6 transition-all hover:border-slate-700"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-wider">
                            {order.trackingCode}
                          </span>
                          <button
                            onClick={() => copyToClipboard(order.trackingCode, order.trackingCode)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs"
                            title="Copy code"
                          >
                            {copiedCode === order.trackingCode ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                              currentStatusMeta?.color || 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                          >
                            {order.statusTitle}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Submitted on {new Date(order.createdAt).toLocaleDateString()} at{' '}
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/larissa/track?code=${order.trackingCode}`}
                          target="_blank"
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-slate-700 flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Live Tracking</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteOrder(order.trackingCode)}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-all border border-rose-500/20 text-xs cursor-pointer"
                          title="Delete Order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Recipient Details & Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                          Recipient Information
                        </span>
                        <div className="space-y-1.5 text-xs sm:text-sm">
                          <p className="text-white font-bold text-base flex items-center gap-2">
                            <span>{order.name}</span>
                          </p>
                          <p className="text-slate-300 flex items-center gap-2 font-mono">
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <a
                              href={`tel:${order.phone}`}
                              className="hover:underline text-slate-200"
                            >
                              {order.phone}
                            </a>
                            <a
                              href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/30"
                            >
                              WhatsApp
                            </a>
                          </p>
                          {order.email && (
                            <p className="text-slate-300 flex items-center gap-2 font-mono text-xs">
                              <Mail className="w-3.5 h-3.5 text-pink-400" />
                              <a href={`mailto:${order.email}`} className="hover:underline text-slate-300">
                                {order.email}
                              </a>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                          Delivery Address
                        </span>
                        <div className="text-xs sm:text-sm text-slate-300 space-y-1 leading-relaxed">
                          <p className="text-white flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span>{order.address}</span>
                          </p>
                          <p className="pl-6 text-slate-400">
                            {order.city}{order.city && order.state ? ', ' : ''}{order.state} -{' '}
                            <strong className="text-amber-300 font-mono">{order.pincode}</strong>
                          </p>
                          {order.note && (
                            <p className="pl-6 text-[11px] text-pink-300 italic pt-1">
                              &ldquo;{order.note}&rdquo;
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Status Buttons */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          One-Click Status Update:
                        </span>
                        <button
                          onClick={() => (isEditingThis ? setEditingCode(null) : startEditing(order))}
                          className="text-xs text-pink-400 hover:text-pink-300 font-bold cursor-pointer"
                        >
                          {isEditingThis ? 'Close Details Editor ✕' : 'Edit Courier & Delivery Note ✏️'}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {STATUS_OPTIONS.filter((s) => s.key !== 'order_placed').map((s) => {
                          const Icon = s.icon;
                          const isCurrent = order.status === s.key;
                          return (
                            <button
                              key={s.key}
                              disabled={isUpdating}
                              onClick={() => {
                                setEditStatus(s.key);
                                setEditCustomNote(s.defaultNote);
                                handleUpdateStatus(order.trackingCode, s.key);
                              }}
                              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-gradient-to-r from-pink-500 to-amber-500 text-slate-950 border-transparent shadow-lg shadow-pink-500/20'
                                  : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              <Icon className="w-4 h-4 flex-shrink-0" />
                              <span>{s.shortLabel}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Detailed Editor Panel (Expandable) */}
                    <AnimatePresence>
                      {isEditingThis && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-4 border-t border-slate-800/80 space-y-4"
                        >
                          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold">
                              Update Courier &amp; Status Message for {order.trackingCode}
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="space-y-1">
                                <label className="text-[11px] text-slate-400 uppercase font-mono">
                                  Courier Name
                                </label>
                                <input
                                  type="text"
                                  value={editCourierPartner}
                                  onChange={(e) => setEditCourierPartner(e.target.value)}
                                  placeholder="e.g. BlueDart / Hand Delivery"
                                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:border-pink-500"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] text-slate-400 uppercase font-mono">
                                  Tracking / AWB #
                                </label>
                                <input
                                  type="text"
                                  value={editCourierAwb}
                                  onChange={(e) => setEditCourierAwb(e.target.value)}
                                  placeholder="e.g. BD-8932014"
                                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs outline-none focus:border-pink-500"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] text-slate-400 uppercase font-mono">
                                  Estimated Delivery
                                </label>
                                <input
                                  type="text"
                                  value={editEstimatedDelivery}
                                  onChange={(e) => setEditEstimatedDelivery(e.target.value)}
                                  placeholder="e.g. Today before 6:00 PM"
                                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:border-pink-500"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] text-slate-400 uppercase font-mono">
                                Live Status Note (Visible to Larissa on Tracking Page)
                              </label>
                              <textarea
                                rows={2}
                                value={editCustomNote}
                                onChange={(e) => setEditCustomNote(e.target.value)}
                                placeholder="Custom message shown to Larissa..."
                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:border-pink-500"
                              />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                              <button
                                type="button"
                                onClick={() => setEditingCode(null)}
                                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => handleUpdateStatus(order.trackingCode)}
                                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>{isUpdating ? 'Saving...' : 'Save & Publish Live Status'}</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
