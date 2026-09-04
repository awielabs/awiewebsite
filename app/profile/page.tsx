'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Home, 
  Building, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Save, 
  Package, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useAuthSession } from '@/lib/useAuthSession';
import { encryptSession } from '@/lib/authCrypto';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Chandigarh', 'Puducherry', 'Jammu & Kashmir'
];

function UserProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNewUser = searchParams.get('new_user') === 'true';
  const { user } = useAuthSession();

  // Profile Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [dob, setDob] = useState('');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('India');
  const [addressType, setAddressType] = useState<'Home' | 'Work' | 'Other'>('Home');

  // UI state
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [phoneValidationStatus, setPhoneValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  // Load existing profile details
  useEffect(() => {
    const fetchProfile = async () => {
      let targetEmail = user?.email;
      if (!targetEmail && typeof window !== 'undefined') {
        const stored = localStorage.getItem('awie_user_session');
        if (stored) {
          try {
            const { decryptSession } = await import('@/lib/authCrypto');
            const parsed = decryptSession(stored);
            if (parsed?.email) targetEmail = parsed.email;
          } catch {
            // Ignore
          }
        }
      }

      if (!targetEmail) {
        setLoading(false);
        return;
      }

      setEmail(targetEmail);
      if (user?.name) setName(user.name);

      try {
        const res = await fetch(`/api/user/profile?email=${encodeURIComponent(targetEmail)}`);
        const data = await res.json();

        if (res.ok && data.success && data.profile) {
          const p = data.profile;
          if (p.name) setName(p.name);
          if (p.phone) {
            setPhone(p.phone);
            validatePhoneRealtime(p.phone);
          }
          if (p.alternatePhone) setAlternatePhone(p.alternatePhone);
          if (p.dob) setDob(p.dob);
          if (p.address) {
            if (p.address.street) setStreet(p.address.street);
            if (p.address.apartment) setApartment(p.address.apartment);
            if (p.address.city) setCity(p.address.city);
            if (p.address.state) setState(p.address.state);
            if (p.address.pincode) setPincode(p.address.pincode);
            if (p.address.country) setCountry(p.address.country);
            if (p.address.addressType) setAddressType(p.address.addressType);
          }

          if (p.phone || (p.address && (p.address.street || p.address.pincode))) {
            setIsSaved(true);
          }
        }
      } catch {
        // Continue with local session details
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Real-time phone number format validation
  const validatePhoneRealtime = (val: string) => {
    const digits = val.replace(/\D/g, '');
    if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
      setPhoneValidationStatus('valid');
    } else if (digits.length > 0) {
      setPhoneValidationStatus('invalid');
    } else {
      setPhoneValidationStatus('idle');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
    setPhone(val);
    validatePhoneRealtime(val);
  };

  const handleAlternatePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
    setAlternatePhone(val);
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
    setPincode(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSaving(true);

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMessage('Please enter a valid 10-digit mobile number for delivery verification.');
      setIsSaving(false);
      return;
    }

    if (pincode && pincode.replace(/\D/g, '').length !== 6) {
      setErrorMessage('Please enter a valid 6-digit postal PIN code.');
      setIsSaving(false);
      return;
    }

    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          phone: cleanPhone,
          alternatePhone,
          dob,
          street,
          apartment,
          city,
          state,
          pincode,
          country,
          addressType,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to save profile details.');
        setIsSaving(false);
        return;
      }

      setSuccessMessage('Profile and delivery details saved successfully!');
      setIsSaved(true);

      // Update local storage session cache with updated details
      if (typeof window !== 'undefined' && user) {
        const updated = {
          ...user,
          name: name || user.name,
          phone: cleanPhone,
          dob,
          lastActive: Date.now(),
        };
        localStorage.setItem('awie_user_session', encryptSession(updated));
      }

      setIsSaving(false);
    } catch {
      setErrorMessage('A network error occurred while saving. Please try again.');
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Breadcrumb & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#2563EB] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">User Profile &amp; Delivery Details</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/store"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#2563EB] hover:border-blue-300 shadow-sm transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>AWIE Store</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-bold text-[#2563EB] hover:bg-blue-100 shadow-sm transition-all"
            >
              <Package className="w-3.5 h-3.5" />
              <span>AWIE Products</span>
            </Link>
          </div>
        </div>

        {/* New User Welcome Banner */}
        {isNewUser && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/15 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
                Welcome to AWIE! Your Account is Verified
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed font-medium">
                Please complete your basic contact and delivery address below. This ensures fast shipping and accurate SMS dispatch notifications for your orders on the AWIE Store and AWIE Products portal.
              </p>
            </div>
          </div>
        )}

        {/* Unified Profile Card Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shrink-0 relative overflow-hidden">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={name || user?.name || 'User'}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span>{(name || user?.name || email || 'A').charAt(0).toUpperCase()}</span>
                )}
                <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {name || user?.name || 'AWIE Member'}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{email || user?.email || 'Loading account...'}</span>
                </p>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-[#2563EB] border border-blue-100">
                    <ShieldCheck className="w-3 h-3 text-[#2563EB]" />
                    Single Unified Account (Store &amp; Products)
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                    30-Min Encrypted Session
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right sm:self-center">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Status</div>
              <div className="text-xs font-extrabold text-emerald-600 mt-0.5">Active &amp; Ready for Delivery</div>
            </div>
          </div>
        </div>

        {/* Main Profile & Delivery Details Forum Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* SECTION 1: Contact Details & Validation */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#2563EB]" />
                  <span>Contact Details &amp; Verification</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Crucial for delivery courier dispatch, tracking alerts, and delivery confirmation
                </p>
              </div>
              <span className="text-[11px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                Required
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Primary Mobile Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Primary Mobile Number *</span>
                  {phoneValidationStatus === 'valid' && (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Valid 10-Digit Mobile
                    </span>
                  )}
                  {phoneValidationStatus === 'invalid' && (
                    <span className="text-[11px] font-bold text-rose-500">
                      Must be 10 digits
                    </span>
                  )}
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-xs font-extrabold text-slate-700 select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`w-full px-4 py-3 rounded-r-xl border text-xs text-slate-900 placeholder-slate-400 font-medium transition-all focus:outline-none ${
                      phoneValidationStatus === 'valid'
                        ? 'border-emerald-300 bg-emerald-50/20 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10'
                        : phoneValidationStatus === 'invalid'
                        ? 'border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10'
                        : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Enter 10-digit Indian phone number starting with 6, 7, 8, or 9.
                </p>
              </div>

              {/* Alternate Contact Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Alternate Contact Number (Optional)
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-xs font-extrabold text-slate-700 select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={alternatePhone}
                    onChange={handleAlternatePhoneChange}
                    placeholder="Optional backup number"
                    maxLength={10}
                    className="w-full px-4 py-3 rounded-r-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Fallback contact in case primary number is unreachable.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2: Basic Personal Details (Name & DOB) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-[#2563EB]" />
                <span>Basic Personal Information</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Used for account verification and recipient identification
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Date of Birth (DOB) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Date of Birth (DOB)</span>
                  <span className="text-[10px] text-slate-400">Age &amp; Identity Verification</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Delivery / Shipping Address */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#2563EB]" />
                  <span>Delivery Address</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Shipment destination for AWIE hardware products, developer kits, and store merchandise
                </p>
              </div>

              {/* Address Type Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                {(['Home', 'Work', 'Other'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAddressType(type)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      addressType === type
                        ? 'bg-white text-[#2563EB] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type === 'Home' && <Home className="w-3 h-3 inline mr-1" />}
                    {type === 'Work' && <Building className="w-3 h-3 inline mr-1" />}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Street Address / Flat No */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Flat / House No. / Street Address *</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="e.g. Flat 402, Green Valley Apartments, 5th Cross Road"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                />
              </div>

              {/* Landmark / Area */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Landmark / Locality (Optional)</label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  placeholder="e.g. Near Metro Station / Behind Central Mall"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                />
              </div>

              {/* City, State, Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">City / District *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai, Pune, Bengaluru"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">State *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>PIN Code *</span>
                    {pincode.length === 6 && (
                      <span className="text-[10px] font-bold text-emerald-600">6-Digit PIN</span>
                    )}
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={pincode}
                    onChange={handlePincodeChange}
                    placeholder="e.g. 400001"
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Country</label>
                <input
                  type="text"
                  disabled
                  value={country}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 font-bold select-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-3 animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
              <Link
                href="/store"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition-all shadow-sm shrink-0"
              >
                <span>Continue to Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Action Button Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto flex-1 py-4 px-8 rounded-2xl bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving Details to Supabase...' : isSaved ? 'Update Profile & Delivery Details' : 'Save Profile & Delivery Details'}</span>
            </button>

            {/* Skip button is only available initially on blank new user setup before filing details or saving */}
            {isNewUser && !isSaved && !phone.trim() && !street.trim() && !pincode.trim() && !dob.trim() && !successMessage && (
              <Link
                href="/products"
                className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-extrabold text-xs uppercase tracking-wider text-center transition-colors"
              >
                Skip for Now →
              </Link>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}

export default function UserProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-24 text-slate-500 text-xs font-semibold">
        Loading User Profile...
      </div>
    }>
      <UserProfileContent />
    </Suspense>
  );
}
