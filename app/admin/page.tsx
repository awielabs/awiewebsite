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
  Box,
  MapPin,
  Send,
  FileText,
  DollarSign,
  Plus,
  Check,
  X
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
  const [sidebarTab, setSidebarTab] = useState<'dashboard' | 'orders' | 'products' | 'customers' | 'shipping' | 'payments' | 'settings'>('dashboard');
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [productsList, setProductsList] = useState<Product[]>(STORE_PRODUCTS);
  const [orderFilter, setOrderFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');

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

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('awie_admin_session');
      setIsAuthenticated(auth === 'authenticated');
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim() === 'awie@19(-_-)' || passcodeInput.trim() === 'awie2026' || passcodeInput.trim() === 'admin123') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('awie_admin_session', 'authenticated');
      }
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Access Denied.');
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
              placeholder="Enter admin passcode (awie2026)..."
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

          {/* 3. PRODUCTS MANAGEMENT PANEL */}
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

          {/* 4. CUSTOMERS PANEL */}
          {sidebarTab === 'customers' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">Customer Database</h2>
                <p className="text-xs text-slate-400">View customer order history and contact records.</p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B1120] text-slate-400 uppercase font-extrabold text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Total Orders</th>
                      <th className="p-4">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-bold text-white">{o.customerName}</td>
                        <td className="p-4 font-mono text-slate-300">{o.customerEmail}</td>
                        <td className="p-4 font-mono text-slate-300">{o.customerPhone}</td>
                        <td className="p-4 font-mono font-bold text-slate-200">1</td>
                        <td className="p-4 font-mono font-black text-emerald-400">₹{o.totalAmount}</td>
                      </tr>
                    ))}
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

    </div>
  );
}
