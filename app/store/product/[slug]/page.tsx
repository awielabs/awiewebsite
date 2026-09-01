'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Truck, ShieldCheck, Mail, ArrowLeft, CheckCircle2, AlertCircle, Plus, Minus, Cpu } from 'lucide-react';
import { STORE_PRODUCTS, Product } from '@/lib/storeData';
import { useCart } from '@/components/store/CartContext';
import LiveViewersCounter from '@/components/store/LiveViewersCounter';
import PincodeChecker from '@/components/store/PincodeChecker';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const product: Product = STORE_PRODUCTS.find((p) => p.slug === slug) || STORE_PRODUCTS[0];
  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [selectedImage, setSelectedImage] = useState<string>(galleryImages[0]);

  // Reset selected image if product changes
  React.useEffect(() => {
    setSelectedImage(galleryImages[0]);
  }, [slug]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#2563EB]">Home</Link>
          <span>→</span>
          <Link href="/store" className="hover:text-[#2563EB]">Shop</Link>
          <span>→</span>
          <Link href={`/store/category/${product.categorySlug}`} className="hover:text-[#2563EB]">{product.categoryName}</Link>
          <span>→</span>
          <span className="text-slate-900 font-bold">{product.name}</span>
        </div>

        {/* Main Product Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Product Image Box & Gallery Thumbnails */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-center h-96 relative overflow-hidden group">
              <Image
                src={selectedImage}
                alt={product.name}
                width={320}
                height={320}
                className="object-contain max-h-80 transition-all duration-300 group-hover:scale-105"
                priority
              />
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-20 h-20 rounded-xl bg-white border-2 overflow-hidden shrink-0 transition-all ${
                      selectedImage === imgUrl ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-sm' : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-contain p-1.5"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2563EB] shrink-0" />
              <div>
                <span className="font-extrabold text-slate-900 block">AWIE Hardware Catalog</span>
                <span className="text-slate-600 font-medium">Sourced for robotics, IoT, and embedded system prototyping.</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details Panel */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{product.categoryName} • {product.subCategory || 'Hardware'}</span>
                </div>
                <LiveViewersCounter productId={product.id} />
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 text-xs pt-1 font-mono text-slate-500">
                <span>SKU: {product.sku}</span>
              </div>
            </div>

            {/* Pricing Card — Hidden until store goes live */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-[#2563EB]/30 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping shrink-0" />
              <div>
                <span className="text-sm font-extrabold text-white block">Products will go live soon</span>
                <span className="text-xs text-slate-400 font-medium">Pricing &amp; checkout will be enabled on launch. Stay tuned!</span>
              </div>
            </div>

            {/* Genuine Sourcing & Stock Availability */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="text-slate-500">Availability:</span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Genuine Component • Sourced &amp; Dispatched within 24-48 Hours</span>
                </span>
              </div>

              {/* Live Pincode Delivery & Shipping Estimator */}
              <PincodeChecker productWeightGrams={100} />

              {/* B2B Contact Box */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Mail className="w-4 h-4 text-[#2563EB]" />
                  <span>Bulk Order &amp; Institutional Procurement</span>
                </div>
                <p className="text-slate-600 font-medium">
                  Need bulk quantities for lab setup or institution? Contact us at <strong className="text-slate-900 font-mono">awielabs@gmail.com</strong>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Overview</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Features Bullet List */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Key Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-4 border-t border-slate-200 flex items-center gap-4">
              <div className="flex items-center gap-3 border border-slate-300 rounded-xl bg-white p-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-extrabold text-slate-900 w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Specifications Table */}
            <div className="pt-6 space-y-3 border-t border-slate-200">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Technical Specifications</h3>
              <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex p-3 bg-white hover:bg-slate-50">
                    <span className="w-1/3 font-bold text-slate-700">{key}</span>
                    <span className="w-2/3 text-slate-600 font-mono font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Frequently Viewed / Related Microcontrollers Section */}
        {(() => {
          const relatedProducts = STORE_PRODUCTS.filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug).slice(0, 4);
          if (relatedProducts.length === 0) return null;

          return (
            <div className="pt-12 border-t border-slate-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Frequently Viewed Microcontrollers</h2>
                  <p className="text-xs text-slate-500 font-medium">Explore related development boards and microcontrollers for your lab projects.</p>
                </div>
                <Link
                  href={`/store/category/${product.categorySlug}`}
                  className="text-xs font-extrabold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
                >
                  View All {product.categoryName} →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    className="group rounded-2xl bg-white border border-slate-200 hover:border-[#2563EB] hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <Link href={`/store/product/${rel.slug}`} className="p-6 bg-slate-50 flex items-center justify-center h-44 group-hover:bg-slate-100/80 transition-colors relative">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        width={100}
                        height={100}
                        className="object-contain group-hover:scale-110 transition-transform duration-300 max-h-36"
                      />
                    </Link>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 block">{rel.sku}</span>
                        <Link href={`/store/product/${rel.slug}`}>
                          <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug">
                            {rel.name}
                          </h3>
                        </Link>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Price on Request</span>
                        <button
                          onClick={() => addToCart(rel)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-[#2563EB] text-white transition-all shadow-sm"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
