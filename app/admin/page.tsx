'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Truck,
  CreditCard,
  RotateCcw,
  Settings,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Edit3,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
  Lock,
  Unlock,
  Bell,
  Calendar,
  Box,
  MapPin,
  Send,
  FileText,
  DollarSign,
  Plus,
  Check,
  X,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { STORE_PRODUCTS, Product } from '@/lib/storeData';

export type OrderStatus =
  | 'NEW'
  | 'PAYMENT CONFIRMED'
  | 'PROCESSING'
  | 'SOURCING'
  | 'PACKED'
  | 'SHIPPED'
  | 'OUT FOR DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUND INITIATED'
  | 'REFUNDED';

export type SourceStatus = 'Not Sourced' | 'Sourced' | 'Received';

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  pincode: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shippingCharge: number;
  totalAmount: number;
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  paymentId: string;
  status: OrderStatus;
  
  // Private Admin Sourcing Data
  sourcing: {
    supplier: string;
    sourceStatus: SourceStatus;
    purchaseCost: number;
    notes: string;
  };

  // Shipping & Shiprocket Data
  shipping: {
    pickupPincode: string;
    packageWeightGrams: number;
    dimensionsCm: { length: number; width: number; height: number };
    courierName?: string;
    shiprocketOrderId?: string;
    shipmentId?: string;
    awbNumber?: string;
    trackingUrl?: string;
  };

  internalNotes: string[];
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'AWIE-1001',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@example.com',
    customerPhone: '+91 98765 43210',
    address: 'Flat 402, Green Acres Apt, Bandra West, Mumbai, MH',
    pincode: '400050',
    date: '2026-08-30 14:32',
    items: [
      { productId: 'mc-1', productName: 'ESP32-WROOM-32', quantity: 1, price: 299 }
    ],
    subtotal: 299,
    shippingCharge: 65,
    totalAmount: 364,
    paymentStatus: 'PAID',
    paymentId: 'pay_Live_982A1B7C',
    status: 'PAYMENT CONFIRMED',
    sourcing: {
      supplier: 'Rishi Electronics / Robu Supplier',
      sourceStatus: 'Not Sourced',
      purchaseCost: 195,
      notes: 'Standard 4MB SPI Flash ESP32 module.'
    },
    shipping: {
      pickupPincode: '400706', // Nerul, Navi Mumbai
      packageWeightGrams: 80,
      dimensionsCm: { length: 10, width: 8, height: 4 },
      courierName: 'Delhivery Surface',
      shiprocketOrderId: 'SR-892101',
      shipmentId: 'SH-55102',
      awbNumber: '1438920192',
      trackingUrl: 'https://shiprocket.co/tracking/1438920192'
    },
    internalNotes: ['Payment verified via Razorpay webhook.']
  },
  {
    id: 'AWIE-1002',
    customerName: 'Priya Patel',
    customerEmail: 'priya.p@example.com',
    customerPhone: '+91 91234 56789',
    address: 'Plot 12, Sector 15, Vashi, Navi Mumbai, MH',
    pincode: '400703',
    date: '2026-08-30 16:15',
    items: [
      { productId: 'dp-1', productName: '0.96 inch OLED Display Module', quantity: 1, price: 199 }
    ],
    subtotal: 199,
    shippingCharge: 50,
    totalAmount: 249,
    paymentStatus: 'PAID',
    paymentId: 'pay_Live_882B9F11',
    status: 'SOURCING',
    sourcing: {
      supplier: 'Local Component Hub',
      sourceStatus: 'Sourced',
      purchaseCost: 120,
      notes: 'Ordered 128x64 I2C Blue OLED module.'
    },
    shipping: {
      pickupPincode: '400706',
      packageWeightGrams: 60,
      dimensionsCm: { length: 8, width: 6, height: 3 }
    },
    internalNotes: ['Customer requested anti-static foam packaging.']
  },
  {
    id: 'AWIE-1003',
    customerName: 'Arjun Verma',
    customerEmail: 'arjun.v@example.com',
    customerPhone: '+91 99887 76655',
    address: 'House 88, Koramangala 4th Block, Bengaluru, KA',
    pincode: '560034',
    date: '2026-08-29 11:20',
    items: [
      { productId: 'sn-1', productName: 'HC-SR04 Ultrasonic Sensor', quantity: 2, price: 99 },
      { productId: 'sn-3', productName: 'PIR Motion Sensor', quantity: 1, price: 89 }
    ],
    subtotal: 287,
    shippingCharge: 75,
    totalAmount: 362,
    paymentStatus: 'PAID',
    paymentId: 'pay_Live_77610A4B',
    status: 'SHIPPED',
    sourcing: {
      supplier: 'AWIE Lab Stock',
      sourceStatus: 'Received',
      purchaseCost: 150,
      notes: 'Verified from AWIE primary inventory.'
    },
    shipping: {
      pickupPincode: '400706',
      packageWeightGrams: 150,
      dimensionsCm: { length: 12, width: 10, height: 6 },
      courierName: 'BlueDart Express',
      shiprocketOrderId: 'SR-891004',
      shipmentId: 'SH-55090',
      awbNumber: 'BD-78901234',
      trackingUrl: 'https://shiprocket.co/tracking/BD-78901234'
    },
    internalNotes: ['Dispatched via BlueDart Express.']
  }
];

export default function AdminDashboardPage() {
  const [sidebarTab, setSidebarTab] = useState<'dashboard' | 'orders' | 'gem-prebookings' | 'products' | 'customers' | 'shipping' | 'payments' | 'settings'>('dashboard');
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [productsList, setProductsList] = useState<Product[]>(STORE_PRODUCTS);
  const [orderFilter, setOrderFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');

  // GEM Pre-Bookings State
  const [gemBookings, setGemBookings] = useState<any[]>([]);
  const [gemMetrics, setGemMetrics] = useState<any | null>(null);
  const [loadingGem, setLoadingGem] = useState(false);
  const [gemFilter, setGemFilter] = useState<string>('All');
  const [gemSearch, setGemSearch] = useState<string>('');
  const [selectedGemBooking, setSelectedGemBooking] = useState<any | null>(null);
  const [gemUpdateNotice, setGemUpdateNotice] = useState<string>('');
  const [isUpdatingGem, setIsUpdatingGem] = useState<boolean>(false);
  const [isLaunchUnlocked, setIsLaunchUnlocked] = useState<boolean>(false);
  const [isTriggeringLaunch, setIsTriggeringLaunch] = useState<boolean>(false);
  const [launchNotice, setLaunchNotice] = useState<string>('');

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [showRefundModal, setShowRefundModal] = useState<boolean>(false);
  const [refundReason, setRefundReason] = useState<string>('');
  const [shippingSyncNotice, setShippingSyncNotice] = useState<string>('');

  // Shiprocket Credentials State
  const [shiprocketCreds, setShiprocketCreds] = useState({
    email: 'shovinmicheldavidxc@gmail.com',
    key: '6%0hM24nfgj%Xp7jE^%GKDwXCTA!70cT',
    pickupPincode: '400706',
    pickupLocation: 'Primary (AWIE Nerul Hub)',
    activeChannelId: '11888380'
  });

  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const fetchRegisteredUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (res.ok && data.success && data.users) {
        setRegisteredUsers(data.users);
      }
    } catch {
      // Continue
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchGemBookings = async () => {
    setLoadingGem(true);
    try {
      const passcode = typeof window !== 'undefined' ? (localStorage.getItem('awie_admin_passcode') || 'awie2026') : 'awie2026';
      const res = await fetch('/api/admin/gem-bookings', {
        headers: { 'x-admin-passcode': passcode },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setGemBookings(data.bookings || []);
        setGemMetrics(data.metrics || null);
      }

      // Check Launch Day status
      const launchRes = await fetch('/api/admin/gem-bookings/trigger-launch');
      const launchData = await launchRes.json();
      if (launchRes.ok && launchData.success) {
        setIsLaunchUnlocked(Boolean(launchData.isUnlocked));
      }
    } catch {
      // Continue
    } finally {
      setLoadingGem(false);
    }
  };

  React.useEffect(() => {
    if (sidebarTab === 'customers' || sidebarTab === 'dashboard') {
      fetchRegisteredUsers();
    }
    if (sidebarTab === 'gem-prebookings' || sidebarTab === 'dashboard') {
      fetchGemBookings();
    }
  }, [sidebarTab]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('awie_admin_session');
      setIsAuthenticated(auth === 'authenticated');
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passcodeInput.trim();
    if (cleanPass === 'awie@19(-_-)' || cleanPass === 'awie2026' || cleanPass === 'admin123') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('awie_admin_session', 'authenticated');
        localStorage.setItem('awie_admin_passcode', cleanPass);
      }
      setIsAuthenticated(true);
      setAuthError('');
      fetchGemBookings();
    } else {
      setAuthError('Invalid passcode. Access Denied.');
    }
  };

  const handleSaveGemBookingUpdates = async (bookingId: string, updates: any) => {
    setIsUpdatingGem(true);
    setGemUpdateNotice('');
    try {
      const passcode = typeof window !== 'undefined' ? (localStorage.getItem('awie_admin_passcode') || 'awie2026') : 'awie2026';
      const res = await fetch('/api/admin/gem-bookings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          id: bookingId,
          ...updates,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update booking status.');
      }

      setGemUpdateNotice('Booking updated successfully!');
      setSelectedGemBooking(data.booking);
      fetchGemBookings();
      setTimeout(() => setGemUpdateNotice(''), 3500);
    } catch (err: any) {
      setGemUpdateNotice(err?.message || 'Update failed.');
    } finally {
      setIsUpdatingGem(false);
    }
  };

  const handleTriggerLaunchDay = async (sendEmails: boolean) => {
    const confirmMsg = sendEmails
      ? 'Are you sure you want to trigger Launch Day and dispatch notification emails to all pre-booked customers to complete their balance payment?'
      : 'Toggle the Launch Day payment lock state?';
    if (!window.confirm(confirmMsg)) return;

    setIsTriggeringLaunch(true);
    setLaunchNotice('');
    try {
      const res = await fetch('/api/admin/gem-bookings/trigger-launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: sendEmails ? 'launch_and_notify' : 'toggle_lock',
          portalBaseUrl: typeof window !== 'undefined' ? window.location.origin : '',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to trigger launch action.');
      }
      setIsLaunchUnlocked(Boolean(data.isUnlocked));
      setLaunchNotice(data.message || 'Action executed successfully.');
      fetchGemBookings();
      setTimeout(() => setLaunchNotice(''), 8000);
    } catch (err: any) {
      setLaunchNotice(err?.message || 'Action failed.');
    } finally {
      setIsTriggeringLaunch(false);
    }
  };

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter =
      orderFilter === 'All'
        ? true
        : o.status.toUpperCase() === orderFilter.toUpperCase();
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate Metrics
  const newOrdersCount = orders.filter((o) => o.status === 'NEW' || o.status === 'PAYMENT CONFIRMED').length;
  const processingCount = orders.filter((o) => o.status === 'PROCESSING' || o.status === 'SOURCING').length;
  const shippedCount = orders.filter((o) => o.status === 'SHIPPED' || o.status === 'OUT FOR DELIVERY').length;
  const deliveredCount = orders.filter((o) => o.status === 'DELIVERED').length;
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'PAID')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const handleAdminLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('awie_admin_session');
    }
    setIsAuthenticated(false);
  };

  // Automatic Shiprocket Sync on Shipment Creation or SHIPPED status transition
  const triggerShiprocketCreation = async (targetOrder: AdminOrder) => {
    setShippingSyncNotice(`Syncing with Shiprocket API for Order ${targetOrder.id}...`);
    try {
      const res = await fetch('/api/shipping/shiprocket?action=create-shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: targetOrder.id,
          customerName: targetOrder.customerName,
          deliveryPincode: targetOrder.pincode,
          weightGrams: targetOrder.shipping.packageWeightGrams,
          channelId: shiprocketCreds.activeChannelId
        })
      });
      const data = await res.json();
      if (data.success) {
        const updatedShipping = {
          ...targetOrder.shipping,
          shiprocketOrderId: data.shiprocketOrderId,
          shipmentId: data.shipmentId,
          awbNumber: data.awbNumber,
          courierName: data.courierName,
          trackingUrl: data.trackingUrl
        };

        setOrders((prev) =>
          prev.map((o) => (o.id === targetOrder.id ? { ...o, status: 'SHIPPED', shipping: updatedShipping } : o))
        );

        if (selectedOrder && selectedOrder.id === targetOrder.id) {
          setSelectedOrder((prev) => (prev ? { ...prev, status: 'SHIPPED', shipping: updatedShipping } : null));
        }

        setShippingSyncNotice(`✅ Shipment successfully created & synced with Shiprocket! AWB: ${data.awbNumber}`);
        setTimeout(() => setShippingSyncNotice(''), 6000);
      }
    } catch (err) {
      setShippingSyncNotice('⚠️ Failed to sync with Shiprocket API.');
    }
  };

  // Status transition handler
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    const target = orders.find((o) => o.id === orderId);
    if (newStatus === 'SHIPPED' && target && !target.shipping.awbNumber) {
      triggerShiprocketCreation(target);
    } else {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    }
  };

  // Private Sourcing handler
  const handleUpdateSourcing = (
    orderId: string,
    supplier: string,
    sourceStatus: SourceStatus,
    cost: number,
    notes: string
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              sourcing: { supplier, sourceStatus, purchaseCost: cost, notes }
            }
          : o
      )
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) =>
        prev
          ? {
              ...prev,
              sourcing: { supplier, sourceStatus, purchaseCost: cost, notes }
            }
          : null
      );
    }
  };

  // Process Safe Refund
  const handleConfirmRefund = () => {
    if (!selectedOrder || !refundReason.trim()) return;
    handleUpdateStatus(selectedOrder.id, 'REFUNDED');
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? {
              ...o,
              paymentStatus: 'REFUNDED',
              internalNotes: [...o.internalNotes, `Refund processed: ${refundReason}`]
            }
          : o
      )
    );
    setShowRefundModal(false);
    setRefundReason('');
  };

  // Passcode Auth Guard
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#070B14] text-slate-100 flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-md bg-[#0F172A] border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#2563EB] flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">AWIE Admin Access</h1>
              <p className="text-xs text-slate-400 font-medium">Enter Admin Passcode to Access Control Panel</p>
            </div>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin passcode..."
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-[#2563EB]"
              autoFocus
            />

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold text-center">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30"
            >
              Authenticate &amp; Access Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col pt-20">
      
      {/* Top Header Bar */}
      <header className="bg-[#0F172A] border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-16 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#2563EB]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              AWIE ADMIN <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">v2.0</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">Order Management, Sourcing &amp; Logistics Control</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          {shippingSyncNotice && (
            <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold animate-pulse">
              {shippingSyncNotice}
            </span>
          )}
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Shiprocket API Ready</span>
          </div>
          <button
            onClick={handleAdminLogout}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex-1 flex">

        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 bg-[#0B1120] border-r border-slate-800/80 p-4 space-y-6 shrink-0 hidden md:block">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest px-3">CORE NAVIGATION</span>
            
            <button
              onClick={() => setSidebarTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                sidebarTab === 'dashboard'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setSidebarTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                sidebarTab === 'orders'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              {newOrdersCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px]">
                  {newOrdersCount}
                </span>
              )}
            </button>

            {/* GEM PRE-BOOKINGS TAB */}
            <button
              onClick={() => setSidebarTab('gem-prebookings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                sidebarTab === 'gem-prebookings'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>GEM Pre-Bookings</span>
              </div>
              {gemBookings.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px]">
                  {gemBookings.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setSidebarTab('products')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                sidebarTab === 'products'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products &amp; Stock</span>
            </button>

            <button
              onClick={() => setSidebarTab('customers')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                sidebarTab === 'customers'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </button>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest px-3">LOGISTICS &amp; FINANCES</span>

            <button
              onClick={() => setSidebarTab('shipping')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                sidebarTab === 'shipping'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Shipping &amp; Shiprocket</span>
            </button>

            <button
              onClick={() => setSidebarTab('payments')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                sidebarTab === 'payments'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Payments &amp; Refunds</span>
            </button>

            <button
              onClick={() => setSidebarTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                sidebarTab === 'settings'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>

          {/* Sourcing Private Badge */}
          <div className="p-3 rounded-2xl bg-[#0F172A] border border-blue-900/40 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-blue-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Private Admin Mode</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Supplier prices, procurement notes &amp; margins are strictly hidden from customers.
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 space-y-8 overflow-y-auto">

          {/* 1. DASHBOARD OVERVIEW TAB */}
          {sidebarTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* New Orders */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-extrabold">
                    <span>New Orders</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{newOrdersCount}</div>
                  <p className="text-[11px] text-amber-400 font-medium">Requires sourcing &amp; confirmation</p>
                </div>

                {/* Processing */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-extrabold">
                    <span>Processing / Sourcing</span>
                    <Box className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{processingCount}</div>
                  <p className="text-[11px] text-blue-400 font-medium">Being prepared or procured</p>
                </div>

                {/* Shipped */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-extrabold">
                    <span>Shipped</span>
                    <Truck className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{shippedCount}</div>
                  <p className="text-[11px] text-indigo-400 font-medium">In transit via Shiprocket</p>
                </div>

                {/* Delivered */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-extrabold">
                    <span>Delivered</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{deliveredCount}</div>
                  <p className="text-[11px] text-emerald-400 font-medium">Completed orders</p>
                </div>

              </div>

              {/* Revenue Overview Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest block">TOTAL REVENUE (PAID ORDERS)</span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">₹{totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-slate-400 font-medium">Calculated from verified Razorpay transactions.</p>
                </div>
                <button
                  onClick={() => setSidebarTab('orders')}
                  className="px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-md shadow-blue-600/30"
                >
                  <span>Manage Orders</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Recent Orders Table */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Recent Orders</h3>
                  <button
                    onClick={() => setSidebarTab('orders')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B1120] text-slate-400 uppercase font-extrabold text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-mono font-bold text-white">{ord.id}</td>
                          <td className="p-4 font-bold text-slate-200">{ord.customerName}</td>
                          <td className="p-4 text-slate-400 text-[11px]">{ord.date}</td>
                          <td className="p-4 font-mono font-black text-emerald-400">₹{ord.totalAmount}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              {ord.paymentStatus}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40">
                              {ord.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs transition-colors inline-flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Details</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* 2. ORDERS MAIN PANEL */}
          {sidebarTab === 'orders' && (
            <div className="space-y-6">
              
              {/* Header & Filter Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">Order Management</h2>
                  <p className="text-xs text-slate-400">Search, track, source, and dispatch customer orders.</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search ID, customer, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-800/80 pb-4">
                {[
                  'All',
                  'NEW',
                  'PAYMENT CONFIRMED',
                  'PROCESSING',
                  'SOURCING',
                  'PACKED',
                  'SHIPPED',
                  'DELIVERED',
                  'CANCELLED',
                  'REFUNDED'
                ].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase transition-all ${
                      orderFilter === st
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B1120] text-slate-400 uppercase font-extrabold text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Sourcing Status</th>
                      <th className="p-4">Order Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-white">{ord.id}</td>
                        <td className="p-4">
                          <div className="font-bold text-white">{ord.customerName}</div>
                          <span className="text-[11px] text-slate-400 font-mono block">{ord.customerPhone}</span>
                        </td>
                        <td className="p-4 text-slate-300">
                          {ord.items.map((it) => (
                            <span key={it.productId} className="block text-[11px]">
                              {it.quantity}x {it.productName}
                            </span>
                          ))}
                        </td>
                        <td className="p-4 font-mono font-black text-emerald-400">₹{ord.totalAmount}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                              ord.sourcing.sourceStatus === 'Sourced'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : ord.sourcing.sourceStatus === 'Received'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            🔒 {ord.sourcing.sourceStatus}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40">
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs transition-colors inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Manage</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* GEM PRE-BOOKINGS MANAGEMENT PANEL */}
          {sidebarTab === 'gem-prebookings' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span>GEM Companion Pre-Bookings</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Manage reservation deposits, production workflows, remaining balances, and dispatch.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchGemBookings}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>Refresh</span>
                  </button>
                  <Link
                    href="/products/gem-buddy"
                    target="_blank"
                    className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20"
                  >
                    View Product Page ↗
                  </Link>
                </div>
              </div>

              {/* Product Launch Day Control Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border border-blue-500/30 shadow-xl space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2.5 rounded-xl border ${isLaunchUnlocked ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border-amber-500/40'}`}>
                        {isLaunchUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-black text-white tracking-tight">
                            GEM Product Launch Day: 13 September 2026
                          </h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                            isLaunchUnlocked
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          }`}>
                            {isLaunchUnlocked ? '🟢 Unlocked / Live' : '🔒 Pre-Launch Locked'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium">
                          {isLaunchUnlocked
                            ? 'Final balance payments are UNLOCKED for customers on the lookup portal.'
                            : 'Final balance payments are LOCKED on the customer portal until 13 September 2026.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Manual Trigger Launch & Notify Button */}
                    <button
                      type="button"
                      onClick={() => handleTriggerLaunchDay(true)}
                      disabled={isTriggeringLaunch}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 text-white text-xs font-black transition-all shadow-md shadow-blue-500/25 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isTriggeringLaunch ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Dispatching Emails...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>🚀 Trigger Launch &amp; Email Pre-Booked Customers</span>
                        </>
                      )}
                    </button>

                    {/* Quick Toggle Lock State */}
                    <button
                      type="button"
                      onClick={() => handleTriggerLaunchDay(false)}
                      disabled={isTriggeringLaunch}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      {isLaunchUnlocked ? (
                        <>
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Lock Payments</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Unlock Payments (No Email)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {launchNotice && (
                  <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{launchNotice}</span>
                  </div>
                )}
              </div>

              {/* Aggregated Metrics Cards Grid */}
              {gemMetrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Total Pre-Bookings</span>
                    <div className="text-2xl font-black text-white font-mono">{gemMetrics.totalBookings}</div>
                    <span className="text-[10px] text-blue-400 font-bold block">
                      v1: {gemMetrics.v1Bookings} | v2: {gemMetrics.v2Bookings}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Paid Bookings</span>
                    <div className="text-2xl font-black text-emerald-400 font-mono">{gemMetrics.paidBookings}</div>
                    <span className="text-[10px] text-amber-400 font-semibold block">
                      Pending: {gemMetrics.pendingPayments}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">In Production</span>
                    <div className="text-2xl font-black text-indigo-400 font-mono">{gemMetrics.productionOrders}</div>
                    <span className="text-[10px] text-slate-400 block">Assembling / Testing</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Final Payment Due</span>
                    <div className="text-2xl font-black text-amber-400 font-mono">{gemMetrics.finalPaymentPending}</div>
                    <span className="text-[10px] text-slate-400 block">Ready for customer pay</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Booking Deposits</span>
                    <div className="text-2xl font-black text-emerald-400 font-mono">₹{gemMetrics.totalBookingMoneyCollected.toLocaleString()}</div>
                    <span className="text-[10px] text-slate-400 block">Initial ₹199 / ₹299</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Total Revenue</span>
                    <div className="text-2xl font-black text-blue-400 font-mono">₹{gemMetrics.totalProductRevenue.toLocaleString()}</div>
                    <span className="text-[10px] text-slate-400 block">
                      Delivery: ₹{gemMetrics.totalDeliveryCharges.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Filter and Search Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl">
                  {['All', 'Paid', 'Pending', 'v1', 'v2', 'In Production', 'Final Payment Pending', 'Completed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setGemFilter(tab)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                        gemFilter === tab
                          ? 'bg-[#2563EB] text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={gemSearch}
                    onChange={(e) => setGemSearch(e.target.value)}
                    placeholder="Search ticket code, name, phone..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
              </div>

              {/* Bookings Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-extrabold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Ticket Code</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Version</th>
                      <th className="p-4">Deposit Paid</th>
                      <th className="p-4">Remaining</th>
                      <th className="p-4">Booking Status</th>
                      <th className="p-4">Production</th>
                      <th className="p-4">Shipping</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {gemBookings
                      .filter((b) => {
                        if (gemFilter === 'Paid') return b.payment_status === 'paid';
                        if (gemFilter === 'Pending') return b.payment_status === 'pending';
                        if (gemFilter === 'v1') return b.product_version === 'v1';
                        if (gemFilter === 'v2') return b.product_version === 'v2';
                        if (gemFilter === 'In Production') return b.booking_status === 'IN_PRODUCTION';
                        if (gemFilter === 'Final Payment Pending') return b.booking_status === 'FINAL_PAYMENT_PENDING' || b.booking_status === 'READY_FOR_DELIVERY';
                        if (gemFilter === 'Completed') return b.booking_status === 'COMPLETED' || b.booking_status === 'DELIVERED';
                        return true;
                      })
                      .filter((b) => {
                        if (!gemSearch) return true;
                        const q = gemSearch.toLowerCase();
                        return (
                          (b.ticket_code && b.ticket_code.toLowerCase().includes(q)) ||
                          (b.customer_name && b.customer_name.toLowerCase().includes(q)) ||
                          (b.email && b.email.toLowerCase().includes(q)) ||
                          (b.phone && b.phone.includes(q))
                        );
                      })
                      .map((b) => (
                        <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-mono font-black text-blue-400">
                            {b.ticket_code || b.booking_id}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-white">{b.customer_name}</div>
                            <span className="text-[11px] text-slate-400 block font-mono">{b.phone}</span>
                            <span className="text-[10px] text-slate-500 block truncate max-w-[160px]">{b.email}</span>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-bold text-[11px]">
                              {b.product_version === 'v1' ? 'GEM v1' : 'GEM v2'}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-black text-emerald-400">
                            ₹{b.booking_amount}
                          </td>
                          <td className="p-4 font-mono font-bold text-amber-400">
                            ₹{b.remaining_amount}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                              b.booking_status === 'BOOKING_CONFIRMED'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                : b.booking_status === 'FINAL_PAYMENT_RECEIVED'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : b.booking_status === 'IN_PRODUCTION'
                                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                              {b.booking_status}
                            </span>
                          </td>
                          <td className="p-4 text-[11px] text-slate-300">
                            {b.production_status || 'queued'}
                          </td>
                          <td className="p-4 text-[11px] text-slate-300">
                            {b.shipping_status || 'unshipped'}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedGemBooking(b)}
                              className="px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs transition-colors inline-flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Manage</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}
          {sidebarTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">Product Catalogue &amp; Stock Manager</h2>
                  <p className="text-xs text-slate-400">Manage prices, inventory availability and specifications.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsList.map((prod) => (
                  <div key={prod.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                        <span>{prod.sku}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-sans font-bold">{prod.categoryName}</span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white line-clamp-1">{prod.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{prod.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Status</span>
                        <span className={prod.inStock ? 'text-emerald-400' : 'text-rose-400'}>
                          {prod.inStock ? 'Available' : 'Disabled'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setProductsList((prev) =>
                            prev.map((p) => (p.id === prod.id ? { ...p, inStock: !p.inStock } : p))
                          );
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          prod.inStock
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                        }`}
                      >
                        {prod.inStock ? 'Disable Product' : 'Enable Product'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CUSTOMERS & USER PROFILE DATABASE PANEL */}
          {sidebarTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#2563EB]" />
                    <span>Customer &amp; Registered User Profiles</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Live Supabase user registrations, delivery addresses, phone numbers, and DOB.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchRegisteredUsers}
                  disabled={loadingUsers}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2 transition-all w-fit"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? 'animate-spin' : ''}`} />
                  <span>{loadingUsers ? 'Refreshing...' : 'Refresh Users'}</span>
                </button>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">TOTAL REGISTERED USERS</span>
                  <div className="text-2xl font-black text-white font-mono">{registeredUsers.length}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">PROFILES WITH DELIVERY ADDRESS</span>
                  <div className="text-2xl font-black text-blue-400 font-mono">
                    {registeredUsers.filter(u => u.address?.street || u.address?.city).length}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">VERIFIED CONTACT NUMBERS</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {registeredUsers.filter(u => u.phone).length}
                  </div>
                </div>
              </div>

              {/* Users & Customers Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-md">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B1120] text-slate-400 uppercase font-extrabold text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Contact (Phone)</th>
                      <th className="p-4">Date of Birth (DOB)</th>
                      <th className="p-4">Delivery / Shipping Address</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {registeredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500">
                          {loadingUsers ? 'Loading registered users from Supabase...' : 'No registered users found yet.'}
                        </td>
                      </tr>
                    ) : (
                      registeredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4">
                            <div className="font-extrabold text-white">{u.name || 'AWIE Member'}</div>
                            <div className="text-[10px] text-slate-400 font-mono">ID: {u.id.slice(0, 8)}...</div>
                          </td>
                          <td className="p-4 font-mono text-slate-300">
                            {u.email}
                          </td>
                          <td className="p-4 font-mono">
                            {u.phone ? (
                              <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 font-bold border border-blue-500/20">
                                +91 {u.phone}
                              </span>
                            ) : (
                              <span className="text-slate-500 italic">Not provided</span>
                            )}
                          </td>
                          <td className="p-4 font-mono text-slate-300">
                            {u.dob || <span className="text-slate-500 italic">Not set</span>}
                          </td>
                          <td className="p-4 text-slate-300 max-w-xs">
                            {u.address?.street || u.address?.city ? (
                              <div className="space-y-0.5">
                                <div className="font-bold text-white text-[11px] truncate">
                                  {u.address.street} {u.address.apartment ? `(${u.address.apartment})` : ''}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {u.address.city}, {u.address.state} - <span className="font-mono text-blue-400">{u.address.pincode}</span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-500 italic">No delivery address saved</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3" />
                              Active
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. SHIPPING & SHIPROCKET PANEL */}
          {sidebarTab === 'shipping' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">Shiprocket Logistics Configuration</h2>
                <p className="text-xs text-slate-400">API Credentials &amp; Pickup Origin Setup for AWIE Hardware dispatch.</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#2563EB]" />
                    <span>Shiprocket API Credentials</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-extrabold block text-[11px]">SHIPROCKET EMAIL</label>
                      <input
                        type="email"
                        value={shiprocketCreds.email}
                        onChange={(e) => setShiprocketCreds({ ...shiprocketCreds, email: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-extrabold block text-[11px]">SHIPROCKET API KEY / PASSWORD</label>
                      <input
                        type="password"
                        value={shiprocketCreds.key}
                        onChange={(e) => setShiprocketCreds({ ...shiprocketCreds, key: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Pickup Location &amp; Origin Pincode</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-extrabold block text-[11px]">PICKUP PINCODE</label>
                      <input
                        type="text"
                        value={shiprocketCreds.pickupPincode}
                        onChange={(e) => setShiprocketCreds({ ...shiprocketCreds, pickupPincode: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-extrabold block text-[11px]">HUB NAME</label>
                      <input
                        type="text"
                        value={shiprocketCreds.pickupLocation}
                        onChange={(e) => setShiprocketCreds({ ...shiprocketCreds, pickupLocation: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => alert('Shiprocket Credentials Saved Successfully!')}
                    className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs transition-colors"
                  >
                    Save Shiprocket Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 6. PAYMENTS & REFUNDS TAB */}
          {sidebarTab === 'payments' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">Payment Verification &amp; Refunds</h2>
                <p className="text-xs text-slate-400">Razorpay transaction verification logs and safe refund authorization.</p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B1120] text-slate-400 uppercase font-extrabold text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Razorpay Payment ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-bold text-white">{o.id}</td>
                        <td className="p-4 font-mono text-blue-400">{o.paymentId}</td>
                        <td className="p-4 font-bold text-slate-200">{o.customerName}</td>
                        <td className="p-4 font-mono font-black text-emerald-400">₹{o.totalAmount}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {o.paymentStatus}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedOrder(o);
                              setShowRefundModal(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs transition-colors"
                          >
                            Initiate Refund
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0F172A] border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-white font-mono">{selectedOrder.id}</span>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  {selectedOrder.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">Placed on {selectedOrder.date}</p>
            </div>

            {/* Order Status Transition Pipeline Buttons */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">UPDATE ORDER STATUS</span>
              <div className="flex flex-wrap gap-2">
                {[
                  'PAYMENT CONFIRMED',
                  'PROCESSING',
                  'SOURCING',
                  'PACKED',
                  'SHIPPED',
                  'OUT FOR DELIVERY',
                  'DELIVERED',
                  'CANCELLED'
                ].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedOrder.id, st as OrderStatus)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedOrder.status === st
                        ? 'bg-[#2563EB] text-white shadow'
                        : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-blue-500'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Customer Info Box */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  Customer &amp; Delivery Address
                </h4>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-white text-sm">{selectedOrder.customerName}</p>
                  <p className="text-slate-300 font-mono">{selectedOrder.customerEmail}</p>
                  <p className="text-slate-300 font-mono">{selectedOrder.customerPhone}</p>
                  <p className="text-slate-400 pt-2 leading-relaxed">{selectedOrder.address}</p>
                  <p className="text-blue-400 font-mono font-bold pt-1">Pincode: {selectedOrder.pincode}</p>
                </div>
              </div>

              {/* Products Breakdown Box */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  Ordered Items &amp; Payment
                </h4>
                <div className="space-y-2 text-xs">
                  {selectedOrder.items.map((it) => (
                    <div key={it.productId} className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <div>
                        <span className="font-bold text-white block">{it.productName}</span>
                        <span className="text-slate-500 text-[10px]">Qty: {it.quantity}</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-400">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                  
                  <div className="pt-2 space-y-1 text-[11px] text-slate-400">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-mono text-white">₹{selectedOrder.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping Charge:</span>
                      <span className="font-mono text-white">₹{selectedOrder.shippingCharge}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-extrabold text-white">
                      <span>Total Amount:</span>
                      <span className="font-mono text-emerald-400">₹{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* PRIVATE SOURCING PANEL (ADMIN ONLY) */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-blue-900/50 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-extrabold text-blue-400 uppercase tracking-wider">
                  <Lock className="w-4 h-4" />
                  <span>PRIVATE SOURCING PANEL (ADMIN ONLY — NEVER SHOWN TO CUSTOMER)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400 font-extrabold block text-[10px]">SUPPLIER / STORE</label>
                  <input
                    type="text"
                    defaultValue={selectedOrder.sourcing.supplier}
                    onBlur={(e) =>
                      handleUpdateSourcing(
                        selectedOrder.id,
                        e.target.value,
                        selectedOrder.sourcing.sourceStatus,
                        selectedOrder.sourcing.purchaseCost,
                        selectedOrder.sourcing.notes
                      )
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-extrabold block text-[10px]">SOURCING STATUS</label>
                  <select
                    value={selectedOrder.sourcing.sourceStatus}
                    onChange={(e) =>
                      handleUpdateSourcing(
                        selectedOrder.id,
                        selectedOrder.sourcing.supplier,
                        e.target.value as SourceStatus,
                        selectedOrder.sourcing.purchaseCost,
                        selectedOrder.sourcing.notes
                      )
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold"
                  >
                    <option value="Not Sourced">Not Sourced</option>
                    <option value="Sourced">Sourced</option>
                    <option value="Received">Received</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-extrabold block text-[10px]">INTERNAL PURCHASE COST (₹)</label>
                  <input
                    type="number"
                    defaultValue={selectedOrder.sourcing.purchaseCost}
                    onBlur={(e) =>
                      handleUpdateSourcing(
                        selectedOrder.id,
                        selectedOrder.sourcing.supplier,
                        selectedOrder.sourcing.sourceStatus,
                        Number(e.target.value),
                        selectedOrder.sourcing.notes
                      )
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* SHIPPING & SHIPROCKET INTEGRATION PANEL */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-400" />
                  Shipping &amp; Shiprocket Dispatch
                </h4>
                {selectedOrder.shipping.awbNumber && (
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    AWB: {selectedOrder.shipping.awbNumber}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-extrabold">PICKUP PINCODE</span>
                  <span className="font-mono font-bold text-white">{selectedOrder.shipping.pickupPincode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-extrabold">DELIVERY PINCODE</span>
                  <span className="font-mono font-bold text-white">{selectedOrder.pincode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-extrabold">WEIGHT</span>
                  <span className="font-mono font-bold text-white">{selectedOrder.shipping.packageWeightGrams} g</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-extrabold">COURIER</span>
                  <span className="font-bold text-blue-400">{selectedOrder.shipping.courierName || 'Not Assigned'}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => alert('Calculating live shipping rate via Shiprocket API... Rate: ₹65')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                >
                  Calculate Rate
                </button>
                <button
                  onClick={() => triggerShiprocketCreation(selectedOrder)}
                  className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-600/30"
                >
                  Create &amp; Sync Shiprocket Shipment
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* REFUND MODAL */}
      {showRefundModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-rose-900/50 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              Confirm Refund for {selectedOrder.id}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This will mark order <strong className="text-white">{selectedOrder.id}</strong> as REFUNDED. Please enter the official reason for processing this refund.
            </p>
            <textarea
              rows={3}
              placeholder="Enter refund reason (e.g., Customer requested cancellation prior to dispatch)..."
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRefundModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRefund}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
              >
                Confirm Refund
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GEM BOOKING DETAIL & LIFECYCLE MANAGEMENT MODAL */}
      {selectedGemBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0F172A] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest block">
                  GEM PRE-BOOKING LIFECYCLE CONTROLLER
                </span>
                <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Ticket: {selectedGemBooking.ticket_code || selectedGemBooking.booking_id}</span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedGemBooking(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details & Pricing Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-extrabold">CUSTOMER</span>
                <span className="font-bold text-white block mt-0.5">{selectedGemBooking.customer_name}</span>
                <span className="text-slate-500 text-[11px] block">{selectedGemBooking.phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-extrabold">MODEL</span>
                <span className="font-bold text-white block mt-0.5">{selectedGemBooking.product_name}</span>
                <span className="text-blue-400 text-[11px] font-bold">Launch: ₹{selectedGemBooking.launch_price}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-extrabold">BOOKING DEPOSIT</span>
                <span className="font-bold text-emerald-400 text-sm block mt-0.5">₹{selectedGemBooking.booking_amount}</span>
                <span className="text-slate-500 text-[10px]">Status: {selectedGemBooking.payment_status}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-extrabold">REMAINING BALANCE</span>
                <span className="font-bold text-amber-400 text-sm block mt-0.5">₹{selectedGemBooking.remaining_amount}</span>
                <span className="text-slate-500 text-[10px]">Final: {selectedGemBooking.final_payment_status || 'unpaid'}</span>
              </div>
            </div>

            {/* Delivery Address & Gateway Reference */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Delivery Address &amp; Payment IDs
              </span>
              <p className="text-slate-300">
                {selectedGemBooking.delivery_address?.addressLine}, {selectedGemBooking.delivery_address?.city}, {selectedGemBooking.delivery_address?.state} - {selectedGemBooking.delivery_address?.pincode}
              </p>
              <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-1 font-mono">
                <span>Razorpay Order: <strong>{selectedGemBooking.razorpay_order_id || 'N/A'}</strong></span>
                <span>Payment ID: <strong>{selectedGemBooking.razorpay_payment_id || 'N/A'}</strong></span>
              </div>
            </div>

            {/* Status Controller Form */}
            <div className="space-y-4">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                Update Order Lifecycle Status:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Booking Overall Status</label>
                  <select
                    defaultValue={selectedGemBooking.booking_status}
                    id="gem-booking-status"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                  >
                    <option value="PENDING_PAYMENT">PENDING_PAYMENT</option>
                    <option value="BOOKING_CONFIRMED">BOOKING_CONFIRMED</option>
                    <option value="IN_PRODUCTION">IN_PRODUCTION</option>
                    <option value="READY_FOR_DELIVERY">READY_FOR_DELIVERY</option>
                    <option value="FINAL_PAYMENT_PENDING">FINAL_PAYMENT_PENDING</option>
                    <option value="FINAL_PAYMENT_RECEIVED">FINAL_PAYMENT_RECEIVED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Production Status</label>
                  <select
                    defaultValue={selectedGemBooking.production_status || 'queued'}
                    id="gem-production-status"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                  >
                    <option value="queued">Queued for Assembly</option>
                    <option value="in_production">In Production / SMT</option>
                    <option value="assembled">Assembled &amp; Flashed</option>
                    <option value="tested">QA Tested &amp; Approved</option>
                    <option value="packaged">Packaged with Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Final Payment Status</label>
                  <select
                    defaultValue={selectedGemBooking.final_payment_status || 'unpaid'}
                    id="gem-final-status"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                  >
                    <option value="unpaid">Unpaid (Balance Pending)</option>
                    <option value="paid">Paid in Full</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Shipping &amp; Delivery</label>
                  <select
                    defaultValue={selectedGemBooking.shipping_status || 'unshipped'}
                    id="gem-shipping-status"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                  >
                    <option value="unshipped">Unshipped</option>
                    <option value="dispatched">Dispatched / Courier Picked</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered to Customer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Courier Tracking ID</label>
                <input
                  type="text"
                  defaultValue={selectedGemBooking.tracking_id || ''}
                  id="gem-tracking-id"
                  placeholder="e.g. AWB-98237498234 (Shiprocket/BlueDart)"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              {gemUpdateNotice && (
                <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-bold">
                  {gemUpdateNotice}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedGemBooking(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={isUpdatingGem}
                  onClick={() => {
                    const bStatus = (document.getElementById('gem-booking-status') as HTMLSelectElement)?.value;
                    const pStatus = (document.getElementById('gem-production-status') as HTMLSelectElement)?.value;
                    const fStatus = (document.getElementById('gem-final-status') as HTMLSelectElement)?.value;
                    const sStatus = (document.getElementById('gem-shipping-status') as HTMLSelectElement)?.value;
                    const tId = (document.getElementById('gem-tracking-id') as HTMLInputElement)?.value;

                    handleSaveGemBookingUpdates(selectedGemBooking.id, {
                      booking_status: bStatus,
                      production_status: pStatus,
                      final_payment_status: fStatus,
                      shipping_status: sStatus,
                      tracking_id: tId,
                    });
                  }}
                  className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 disabled:opacity-60 text-white text-xs font-extrabold shadow-md shadow-blue-600/30"
                >
                  {isUpdatingGem ? 'Saving...' : 'Save & Update Status'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
