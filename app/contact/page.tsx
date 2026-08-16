'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin } from 'lucide-react';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('interest') || 'Web Development';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    message: '',
    budget_range: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (searchParams.get('interest')) {
      setFormData((prev) => ({ ...prev, service: searchParams.get('interest') || 'Web Development' }));
    }
  }, [searchParams]);

  const serviceOptions = [
    'Web Development',
    'Mobile App',
    'IoT',
    'Electronics',
    'Custom Software',
    'Student Mentoring',
    'Other'
  ];

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
          message: '',
          budget_range: ''
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
    <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative">
      {status === 'success' ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">Message Received</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Thanks for contacting AWIE. We'll get back to you shortly.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors mt-4"
          >
            Submit Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'error' && (
            <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="yourname@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>

          {/* Phone & Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 or +91 phone number"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">I'm interested in *</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              >
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-slate-900 text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget Range */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Budget Range (Optional)</label>
            <select
              value={formData.budget_range}
              onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="">Select budget range (optional)</option>
              <option value="Under $500 / ₹40,000">Under $500 / ₹40,000</option>
              <option value="$500 - $2,000">$500 - $2,000</option>
              <option value="$2,000 - $5,000">$2,000 - $5,000</option>
              <option value="$5,000+">$5,000+</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Project Description *</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your project, goals, key requirements, or questions..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-800 text-white font-semibold text-sm transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2"
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
  return (
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#06B6D4]">
            <Mail className="w-3.5 h-3.5" />
            <span>START A PROJECT WITH AWIE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
            Contact <span className="text-[#3B82F6]">AWIE</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Tell us about what you're building. From web applications to IoT hardware and student project mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
              <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our engineering team responds to all project inquiries within 24 hours. Fill out the form or reach out directly.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <Mail className="w-4 h-4 text-[#06B6D4] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Email Inquiry</span>
                    <span className="text-white font-mono">contact@awie.in</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <Phone className="w-4 h-4 text-[#3B82F6] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Direct Support</span>
                    <span className="text-white font-mono">+91 (AWIE-TECH)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Official Domain Target</span>
                    <span className="text-white font-mono">awie.in</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                <span className="font-semibold text-white block">Project Process:</span>
                <p>Submitted → Reviewed → Discussion → Proposal → Development → Completed</p>
              </div>
            </div>
          </div>

          {/* Right Contact Form in Suspense */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">Loading form...</div>}>
              <ContactFormContent />
            </Suspense>
          </div>

        </div>

      </div>
    </div>
  );
}
