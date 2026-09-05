'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Truck, CheckCircle2, Clock, MapPin, ExternalLink, ArrowLeft, PackageCheck, Lock } from 'lucide-react';
import { STORE_SALE_LIVE } from '@/lib/storeData';

interface CustomerOrder {
  id: string;
  date: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'In Transit' | 'Delivered';
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  courier?: string;
  awb?: string;
  trackingUrl?: string;
}

const SAMPLE_CUSTOMER_ORDERS: CustomerOrder[] = [
  {
    id: 'AWIE-1001',
    date: '30 Aug 2026',
    status: 'In Transit',
    items: [
      {
        name: 'ESP32-WROOM-32 Microcontroller',
        quantity: 1,
        price: 299,
        image: '/store/esp32.svg'
      }
    ],
    subtotal: 299,
    shipping: 65,
    total: 364,
    courier: 'Delhivery Surface',
    awb: '1438920192',
    trackingUrl: 'https://shiprocket.co/tracking/1438920192'
  }
];

export default function CustomerOrdersPage() {
  const [orders] = useState<CustomerOrder[]>(SAMPLE_CUSTOMER_ORDERS);

  // Store gate — My Orders is only available once the sale goes live
  if (!STORE_SALE_LIVE) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-20 text-slate-900">
        <div className="max-w-md mx-auto px-6">
          <div className="p-10 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-4">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-black text-slate-900">Orders Open Soon</h1>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              My Orders will be available once the AWIE Store sale officially begins. Stay tuned!
            </p>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs transition-all shadow-lg shadow-[#2563EB]/25"
            >
              <span>← Back to Store</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 text-slate-900">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
              <ShoppingBag className="w-4 h-4" />
              <span>AWIE Customer Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Orders</h1>
          </div>

          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
                
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-slate-900 font-mono">{ord.id}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-[#2563EB] border border-blue-200">
                        {ord.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Order placed on {ord.date}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-medium block">Total Paid</span>
                    <span className="text-xl font-black text-slate-900 font-mono">₹{ord.total}</span>
                  </div>
                </div>

                {/* Tracking Stepper */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Order Status</span>
                  
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
                    <div className="space-y-2">
                      <div className="h-2 rounded-full bg-[#2563EB]" />
                      <span className="text-[#2563EB]">Confirmed</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 rounded-full bg-[#2563EB]" />
                      <span className="text-[#2563EB]">Processing</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 rounded-full bg-[#2563EB] animate-pulse" />
                      <span className="text-[#2563EB]">In Transit</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 rounded-full bg-slate-200" />
                      <span className="text-slate-400">Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Ordered Components</span>
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-2 shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                        <span className="text-[11px] text-slate-500 font-mono">Qty: {item.quantity}</span>
                      </div>
                      <span className="text-xs font-black text-slate-900 font-mono">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Courier / Live Track Button */}
                {ord.trackingUrl && (
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-0.5 text-xs">
                      <span className="font-extrabold text-slate-900 block">Shipped via {ord.courier}</span>
                      <span className="text-slate-600 font-mono">AWB Tracking No: {ord.awb}</span>
                    </div>
                    <a
                      href={ord.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <span>Track Package Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-4">
            <PackageCheck className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No orders found</h3>
            <Link
              href="/store"
              className="inline-block px-6 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs"
            >
              Browse Store Catalogue
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
