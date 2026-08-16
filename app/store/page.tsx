'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Lock,
  Headphones,
  Cpu,
  Wifi,
  Layers,
  Monitor,
  Cog,
  BatteryCharging,
  Package,
  MoreHorizontal,
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '@/components/store/CartContext';

export default function StorePage() {
  const { addToCart, setIsCartOpen } = useCart();

  const storeCategories = [
    { name: 'Microcontrollers', icon: Cpu, slug: 'development-boards' },
    { name: 'Sensors', icon: Wifi, slug: 'sensors' },
    { name: 'Modules', icon: Layers, slug: 'electronic-modules-displays' },
    { name: 'Displays', icon: Monitor, slug: 'electronic-modules-displays' },
    { name: 'Motors & Drivers', icon: Cog, slug: 'motors-drivers-actuators' },
    { name: 'Power & Battery', icon: BatteryCharging, slug: 'batteries-power' },
    { name: 'Kits', icon: Package, slug: 'diy-maker-kits' },
    { name: 'Others', icon: MoreHorizontal, slug: 'electronic-components' }
  ];

  const featuredProducts: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    price: number;
    originalPrice: number;
    discountPercent: number;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    image: string;
    specs: Record<string, string>;
  }[] = [
    {
      id: 'prod-esp32-devkit',
      name: 'ESP32 DevKit V1',
      slug: 'esp32-wroom-32u-wifi-ble-board',
      sku: 'SKU-ESP32-V1',
      price: 499,
      originalPrice: 599,
      discountPercent: 16,
      rating: 4.8,
      reviewCount: 28,
      inStock: true,
      image: '/logo.jpeg',
      specs: { 'Processor': 'Dual-Core LX6', 'Connectivity': 'Wi-Fi + BLE' }
    },
    {
      id: 'prod-[#0066FF] Ultrasonic',
      name: 'HC-SR04 Ultrasonic Sensor',
      slug: 'dht22-digital-temperature-humidity-sensor',
      sku: 'SKU-HC-SR04',
      price: 129,
      originalPrice: 169,
      discountPercent: 23,
      rating: 4.7,
      reviewCount: 42,
      inStock: true,
      image: '/logo.jpeg',
      specs: { 'Range': '2cm - 400cm', 'Voltage': '5V DC' }
    },
    {
      id: 'prod-oled-096',
      name: '0.96" OLED Display (I2C)',
      slug: 'electronic-modules-displays',
      sku: 'SKU-OLED-096',
      price: 199,
      originalPrice: 249,
      discountPercent: 20,
      rating: 4.6,
      reviewCount: 35,
      inStock: true,
      image: '/logo.jpeg',
      specs: { 'Resolution': '128x64', 'Interface': 'I2C' }
    },
    {
      id: 'prod-[#0066FF] Servo',
      name: 'Servo Motor SG90',
      slug: 'motors-drivers-actuators',
      sku: 'SKU-SERVO-SG90',
      price: 149,
      originalPrice: 199,
      discountPercent: 25,
      rating: 4.5,
      reviewCount: 19,
      inStock: true,
      image: '/logo.jpeg',
      specs: { 'Torque': '1.8 kg/cm', 'Rotation': '180 Deg' }
    },
    {
      id: 'prod-l298n-driver',
      name: 'L298N Motor Driver Module',
      slug: 'motors-drivers-actuators',
      sku: 'SKU-L298N',
      price: 199,
      originalPrice: 249,
      discountPercent: 20,
      rating: 4.6,
      reviewCount: 22,
      inStock: true,
      image: '/logo.jpeg',
      specs: { 'Max Current': '2A per channel', 'Voltage': '5V - 35V' }
    },
    {
      id: 'prod-18650-battery',
      name: '18650 Li-ion Battery 2500mAh',
      slug: 'batteries-power',
      sku: 'SKU-BAT-18650',
      price: 249,
      originalPrice: 299,
      discountPercent: 17,
      rating: 4.7,
      reviewCount: 31,
      inStock: true,
      image: '/logo.jpeg',
      specs: { 'Capacity': '2500mAh', 'Voltage': '3.7V Nominal' }
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 pb-20">
      
      {/* 1. Dedicated Hero Banner matching user screenshot */}
      <section className="relative bg-gradient-to-r from-blue-50/80 via-white to-slate-50 border-b border-slate-200 overflow-hidden py-16 sm:py-24">
        
        {/* Subtle Circuit Line Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 10 10 L 30 10 L 40 20 L 70 20 L 80 10 L 90 10" fill="none" stroke="#2563EB" strokeWidth="1.5" />
              <path d="M 20 50 L 50 50 L 60 40 L 90 40" fill="none" stroke="#2563EB" strokeWidth="1.5" />
              <circle cx="30" cy="10" r="3" fill="#2563EB" />
              <circle cx="70" cy="20" r="3" fill="#2563EB" />
              <circle cx="50" cy="50" r="3" fill="#2563EB" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column Text & CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="relative inline-block max-w-lg">
              <Image
                src="/store-logo.png"
                alt="AWIE STORE"
                width={420}
                height={140}
                className="w-full max-w-sm sm:max-w-md h-auto object-contain drop-shadow-sm"
                priority
              />
            </div>

            <p className="text-slate-600 text-lg sm:text-xl font-medium leading-relaxed max-w-md">
              Electronics. Modules. Kits.<br />
              Everything you need to build.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-8 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#2563EB]/30 hover:shadow-xl hover:scale-105 flex items-center gap-3"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column Component Showcase Floating Cards */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Electric Blue Geometric Angle Backdrop */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-96 bg-gradient-to-bl from-[#2563EB] to-[#1D4ED8] rounded-3xl rotate-6 shadow-2xl opacity-90 pointer-events-none" />

            {/* Showcase Floating Component Cards Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-4 p-4 max-w-md">
              
              {/* Card 1: ESP32 */}
              <div className="p-4 rounded-2xl bg-white shadow-xl border border-slate-100 flex flex-col items-center justify-center space-y-2 -rotate-3 hover:rotate-0 transition-transform">
                <div className="w-20 h-20 relative p-2 flex items-center justify-center">
                  <Image src="/logo.jpeg" alt="ESP32 Board" width={70} height={70} className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-slate-900">ESP32 DevKit</span>
              </div>

              {/* Card 2: OLED Display */}
              <div className="p-4 rounded-2xl bg-white shadow-xl border border-slate-100 flex flex-col items-center justify-center space-y-2 rotate-6 hover:rotate-0 transition-transform">
                <div className="w-20 h-20 relative p-2 bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden">
                  <Image src="/store-logo.png" alt="AWIE OLED" width={60} height={30} className="object-contain filter brightness-125" />
                </div>
                <span className="text-[11px] font-bold text-slate-900">0.96" OLED I2C</span>
              </div>

              {/* Card 3: Ultrasonic Sensor */}
              <div className="p-4 rounded-2xl bg-white shadow-xl border border-slate-100 flex flex-col items-center justify-center space-y-2 rotate-2 hover:rotate-0 transition-transform">
                <div className="w-20 h-20 relative p-2 flex items-center justify-center">
                  <Image src="/logo.jpeg" alt="Sensor" width={65} height={65} className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-slate-900">HC-SR04 Sensor</span>
              </div>

              {/* Card 4: Servo Motor */}
              <div className="p-4 rounded-2xl bg-white shadow-xl border border-slate-100 flex flex-col items-center justify-center space-y-2 -rotate-6 hover:rotate-0 transition-transform">
                <div className="w-20 h-20 relative p-2 flex items-center justify-center">
                  <Image src="/logo.jpeg" alt="Servo" width={65} height={65} className="object-contain" />
                </div>
                <span className="text-[11px] font-bold text-slate-900">SG90 Servo</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* 2. Trust Badges Strip matching user screenshot */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Quality Products</h4>
              <p className="text-[11px] text-slate-500">Tested & Reliable</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Fast Shipping</h4>
              <p className="text-[11px] text-slate-500">Pan India Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Secure Payments</h4>
              <p className="text-[11px] text-slate-500">100% Secure Checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Support</h4>
              <p className="text-[11px] text-slate-500">We're here to help</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Shop by Category Grid matching user screenshot */}
      <section className="max-w-7xl mx-auto px-6 pt-12 space-y-6">
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Shop by Category</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {storeCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/store/category/${cat.slug}`}
                className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#2563EB] hover:shadow-md transition-all flex flex-col items-center justify-center text-center space-y-3"
              >
                <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-blue-50 text-[#2563EB] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#2563EB] transition-colors line-clamp-1">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>

      </section>

      {/* 4. Featured Products Row matching user screenshot */}
      <section className="max-w-7xl mx-auto px-6 pt-16 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Featured Products</h2>
          <Link
            href="/store/category/development-boards"
            className="px-4 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-extrabold text-slate-700 hover:text-[#2563EB] transition-all shadow-sm"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group rounded-2xl bg-white border border-slate-200 hover:border-[#2563EB] hover:shadow-xl transition-all flex flex-col justify-between p-4 space-y-3"
            >
              
              {/* Image Box */}
              <Link href={`/store/product/${prod.slug}`} className="p-4 bg-slate-50 rounded-xl flex items-center justify-center h-36 group-hover:bg-blue-50/50 transition-colors">
                <Image
                  src={prod.image}
                  alt={prod.name}
                  width={80}
                  height={80}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </Link>

              {/* Title & Price */}
              <div className="space-y-1 flex-1 flex flex-col justify-between">
                <Link href={`/store/product/${prod.slug}`}>
                  <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug">
                    {prod.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-sm font-black text-[#2563EB]">₹{prod.price}</span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{prod.rating}</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart({
                  id: prod.id,
                  name: prod.name,
                  slug: prod.slug,
                  sku: prod.sku,
                  categorySlug: 'development-boards',
                  categoryName: 'Electronics',
                  price: prod.price,
                  originalPrice: prod.originalPrice,
                  discountPercent: prod.discountPercent,
                  inStock: true,
                  stockCount: 10,
                  rating: prod.rating,
                  reviewCount: prod.reviewCount,
                  image: prod.image,
                  description: 'High-performance electronic module.',
                  specs: prod.specs,
                  features: ['Genuine Component']
                })}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-[#2563EB] text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>

            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
