'use client';

import { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, ChevronDown, Check, Code2, Smartphone, Cpu, Zap, Terminal, Sparkles, User, Phone, MessageSquare } from 'lucide-react';
import ContactScrollBackground from '@/components/ui/ContactScrollBackground';

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.96 0-1.74.78-1.74 1.74 0 .96.78 1.74 1.74 1.74.96 0 1.74-.78 1.74-1.74 0-.96-.78-1.74-1.74-1.74Z" />
    </svg>
  );
}

function ContactFormContent({ onTypingChange }: { onTypingChange: (v: boolean) => void }) {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('interest') || 'Web Development';

  const handleFocus = useCallback(() => onTypingChange(true), [onTypingChange]);
  const handleBlur = useCallback(() => onTypingChange(false), [onTypingChange]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    message: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const MAX_WORDS = 300;
  const wordCount = formData.message.trim() ? formData.message.trim().split(/\s+/).length : 0;

  useEffect(() => {
    if (searchParams.get('interest')) {
      setFormData((prev) => ({ ...prev, service: searchParams.get('interest') || 'Web Development' }));
    }
  }, [searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const serviceOptions = [
    { id: 'Web Development', label: 'Web Development', icon: Code2, badge: 'Full-Stack' },
    { id: 'Mobile App', label: 'Mobile App', icon: Smartphone, badge: 'iOS / Android' },
    { id: 'IoT', label: 'IoT', icon: Cpu, badge: 'Hardware' },
    { id: 'Electronics', label: 'Electronics', icon: Zap, badge: 'Circuits & PCB' },
    { id: 'Custom Software', label: 'Custom Software', icon: Terminal, badge: 'Systems' },
    { id: 'Other', label: 'Other', icon: Sparkles, badge: 'General' },
  ];

  const selectedService = serviceOptions.find(opt => opt.id === formData.service) || serviceOptions[0];
  const SelectedIcon = selectedService.icon;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    if (words.length > MAX_WORDS) {
      const truncated = words.slice(0, MAX_WORDS).join(' ');
      setFormData((prev) => ({ ...prev, message: truncated }));
    } else {
      setFormData((prev) => ({ ...prev, message: text }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Web Development',
          message: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error occurred. Please try again later.');
    }
  };

  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-[#2563EB]/15 hover:bg-[#0B1528] hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/35 transition-all duration-300 group relative">
      {/* Subtle Ambient Corner Glow on Hover - Contained in inner overflow-hidden wrapper */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {status === 'success' ? (
        <div className="text-center py-12 space-y-4 relative z-10">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 group-hover:bg-emerald-950 group-hover:border-emerald-500/40 group-hover:text-emerald-400 flex items-center justify-center mx-auto shadow-sm transition-all duration-300">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors duration-300">Message Received</h3>
          <p className="text-sm text-slate-600 group-hover:text-slate-300 max-w-md mx-auto font-medium transition-colors duration-300">
            Thanks for contacting AWIE. We'll get back to you shortly.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-2.5 rounded-xl bg-slate-900 group-hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md mt-4 cursor-pointer"
          >
            Submit Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {status === 'error' && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 group-hover:bg-rose-950/60 group-hover:border-rose-800 group-hover:text-rose-300 text-xs font-medium flex items-center gap-3 transition-colors duration-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 group-hover:text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Your Name</span>
                <span className="text-[#2563EB]">*</span>
              </label>
              <div className="relative group/input">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover/input:text-[#2563EB] group-focus-within/input:text-[#2563EB] transition-colors pointer-events-none">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 group-hover:bg-slate-950 group-hover:border-slate-800 group-hover:text-white group-hover:placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/25 focus:bg-white group-hover:focus:bg-slate-950 transition-all font-medium shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Email Address</span>
                <span className="text-[#2563EB]">*</span>
              </label>
              <div className="relative group/input">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover/input:text-[#2563EB] group-focus-within/input:text-[#2563EB] transition-colors pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="yourname@domain.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 group-hover:bg-slate-950 group-hover:border-slate-800 group-hover:text-white group-hover:placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/25 focus:bg-white group-hover:focus:bg-slate-950 transition-all font-medium shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Phone & Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Phone Number</span>
                <span className="text-slate-400 text-[10px] font-normal">(Optional)</span>
              </label>
              <div className="relative group/input">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover/input:text-[#2563EB] group-focus-within/input:text-[#2563EB] transition-colors pointer-events-none">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="+1 or +91 phone number"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 group-hover:bg-slate-950 group-hover:border-slate-800 group-hover:text-white group-hover:placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/25 focus:bg-white group-hover:focus:bg-slate-950 transition-all font-medium shadow-sm"
                />
              </div>
            </div>

            {/* Custom Interactive Dropdown */}
            <div className="space-y-2 relative" ref={dropdownRef}>
              <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>I'm Interested In</span>
                <span className="text-[#2563EB]">*</span>
              </label>
              
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 group-hover:bg-slate-950 group-hover:border-slate-800 group-hover:text-white focus:outline-none transition-all font-medium flex items-center justify-between cursor-pointer shadow-sm ${
                  isDropdownOpen
                    ? 'border-[#2563EB] ring-2 ring-[#2563EB]/25 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-100/80 text-[#2563EB] group-hover:bg-blue-950 group-hover:text-blue-400">
                    <SelectedIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold">{selectedService.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 group-hover:text-slate-300 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180 text-[#2563EB]' : ''
                  }`}
                />
              </button>

              {/* Floating Glassmorphic Dropdown List */}
              {isDropdownOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 p-1.5 pr-1 rounded-2xl bg-white/98 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-[#2563EB]/25 space-y-0.5 group-hover:bg-[#0B1528] group-hover:border-blue-500/40 transition-all max-h-60 overflow-y-auto custom-scrollbar">
                  {serviceOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = formData.service === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, service: opt.id }));
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl cursor-pointer transition-all duration-200 text-left ${
                          isSelected
                            ? 'bg-blue-50 text-[#2563EB] font-bold group-hover:bg-blue-600/25 group-hover:text-blue-300'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 group-hover:text-slate-300 group-hover:hover:bg-slate-900/90 group-hover:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg transition-colors ${
                            isSelected
                              ? 'bg-blue-100 text-[#2563EB] group-hover:bg-blue-900/60 group-hover:text-blue-400'
                              : 'bg-slate-100 text-slate-500 group-hover:bg-slate-800 group-hover:text-slate-400'
                          }`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-semibold">{opt.label}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 group-hover:bg-slate-800 group-hover:text-slate-400">
                            {opt.badge}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400 shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Description with Word Limit Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Project Description</span>
                <span className="text-[#2563EB]">*</span>
              </label>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-all duration-300 ${
                wordCount >= MAX_WORDS 
                  ? 'bg-amber-50 border-amber-300 text-amber-600 font-bold dark:bg-amber-950/60 dark:border-amber-700 dark:text-amber-400' 
                  : 'bg-slate-100 border-slate-200 text-slate-600 group-hover:bg-slate-900 group-hover:border-slate-800 group-hover:text-slate-400'
              }`}>
                {wordCount} / {MAX_WORDS} words max
              </span>
            </div>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={handleMessageChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Describe your project goals, key requirements, technical challenges, or timeline (Maximum 300 words)..."
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 group-hover:bg-slate-950 group-hover:border-slate-800 group-hover:text-white group-hover:placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/25 focus:bg-white group-hover:focus:bg-slate-950 transition-all resize-none font-medium leading-relaxed shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-300 text-white font-bold text-sm transition-all shadow-lg shadow-[#2563EB]/25 hover:shadow-xl hover:shadow-[#2563EB]/30 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
          >
            {status === 'submitting' ? (
              <span>Sending Enquiry...</span>
            ) : (
              <>
                <span>Submit Project Enquiry</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="pt-28 pb-20 text-slate-800 min-h-screen relative overflow-hidden">
      {/* Scroll-driven call animation background */}
      <ContactScrollBackground isTyping={isTyping} />

      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-xs sm:text-sm font-bold text-[#2563EB]">
            <Mail className="w-4 h-4 text-[#2563EB]" />
            <span>START A PROJECT WITH AWIE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight select-none py-1">
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">C</span>
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">o</span>
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">n</span>
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">t</span>
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">a</span>
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">c</span>
            <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:text-[#2563EB] cursor-default">t</span>
            {' '}
            <span className="tracking-wider inline-flex">
              <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 bg-gradient-to-b from-blue-600 via-[#1D4ED8] to-indigo-950 bg-clip-text text-transparent cursor-default">
                A
              </span>
              <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:text-[#2563EB] cursor-default">
                W
              </span>
              <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 bg-gradient-to-b from-blue-600 via-[#1D4ED8] to-indigo-950 bg-clip-text text-transparent cursor-default">
                I
              </span>
              <span className="inline-block transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-110 hover:text-[#2563EB] cursor-default">
                E
              </span>
            </span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
            Tell us about what you're building. From web applications to IoT hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-[#2563EB]/15 hover:bg-[#0B1528] hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/35 transition-all duration-300 space-y-6 relative overflow-hidden group">
              {/* Subtle Ambient Corner Glow on Hover */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <h2 className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors duration-300 relative z-10">Get in Touch</h2>
              <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-300 relative z-10">
                Our team responds to all project inquiries within 24 hours. Fill out the form or reach out directly.
              </p>

              <div className="space-y-4 text-xs relative z-10">
                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-slate-950/80 group-hover:border-slate-800 transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-blue-100/80 text-[#2563EB] group-hover:bg-blue-950 group-hover:border group-hover:border-blue-700/60 group-hover:text-blue-400 transition-all duration-300 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 group-hover:text-slate-400 block text-[11px] font-semibold transition-colors duration-300">Email Inquiry</span>
                    <a href="mailto:awielabs@gmail.com" className="text-slate-900 group-hover:text-white font-mono font-bold text-xs hover:text-[#2563EB] transition-colors">awielabs@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-slate-950/80 group-hover:border-slate-800 transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-sky-100/80 text-[#0284C7] group-hover:bg-sky-950 group-hover:border group-hover:border-sky-700/60 group-hover:text-sky-400 transition-all duration-300 shrink-0">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 group-hover:text-slate-400 block text-[11px] font-semibold transition-colors duration-300">Official LinkedIn</span>
                    <a 
                      href="https://www.linkedin.com/company/awie/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-900 group-hover:text-white font-mono font-bold text-xs hover:text-[#2563EB] transition-colors"
                    >
                      linkedin.com/company/awie
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-slate-950/80 group-hover:border-slate-800 transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-emerald-100/80 text-emerald-600 group-hover:bg-emerald-950 group-hover:border group-hover:border-emerald-700/60 group-hover:text-emerald-400 transition-all duration-300 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 group-hover:text-slate-400 block text-[11px] font-semibold transition-colors duration-300">Official Domain</span>
                    <a 
                      href="https://awie.in" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-900 group-hover:text-white font-mono font-bold text-xs hover:text-[#2563EB] transition-colors"
                    >
                      awie.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form in Suspense */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-10 rounded-3xl bg-white border border-slate-200 shadow-xl text-center text-xs text-slate-500">Loading form...</div>}>
              <ContactFormContent onTypingChange={setIsTyping} />
            </Suspense>
          </div>

        </div>

      </div>
    </div>
  );
}
