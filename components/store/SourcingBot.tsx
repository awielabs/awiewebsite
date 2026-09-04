'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Send, MessageCircle, RefreshCw, ImageIcon, UserPlus } from 'lucide-react';
import { decryptSession } from '@/lib/authCrypto';

interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
}

interface SourcingDraft {
  productName?: string;
  quantity?: string;
  specifications?: string;
  brandModel?: string;
  image?: File | null;
  email?: string;
  phone?: string;
}

const BOT_NAME = 'AWIE Sourcer Bot';
const TYPING_DELAY = 700;

export default function SourcingBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [sessionName, setSessionName] = useState<string>('');
  const [sessionUserId, setSessionUserId] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<'idle' | 'name' | 'product' | 'quantity' | 'specs' | 'brand' | 'image' | 'contact'>('idle');
  const [draft, setDraft] = useState<SourcingDraft>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetConversation = () => {
    setMessages([]);
    setInputValue('');
    setStep('idle');
    setDraft({});
    setIsDone(false);
    setAgreedToTerms(false);
    setErrorMessage(null);
    setIsTyping(false);
  };

  // Check signup session on mount and on open
  useEffect(() => {
    const checkSession = () => {
      const user = decryptSession(localStorage.getItem('awie_user_session'));
      if (user) {
        setHasSession(true);
        setSessionEmail(user.email || null);
        setSessionName(user.name || '');
        setSessionUserId(user.id || '');
      } else {
        setHasSession(false);
      }
    };
    checkSession();
  }, [isOpen]);

  // Listen for open requests from store search ("Request this product")
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      setIsOpen(true);
      resetConversation();
      // Pre-fill product name from search query and jump to quantity step
      const productName = String(detail.productName || '').trim();
      if (productName) {
        setDraft({ productName });
        setMessages([
          { from: 'bot', text: 'Hi! I am the AWIE Sourcer Bot 🤖' },
          { from: 'bot', text: `Got it — you are looking for "${productName}". Tell us what you need and we will check if we can source it.` },
          { from: 'bot', text: 'How many units do you need? (e.g. 5, 10, 50…)' },
        ]);
        setStep('quantity');
      }
    };
    window.addEventListener('open-sourcing-bot', handler);
    return () => window.removeEventListener('open-sourcing-bot', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const botSay = (texts: string[], then?: () => void) => {
    setIsTyping(true);
    let delay = 0;
    texts.forEach((text, idx) => {
      delay += TYPING_DELAY;
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: 'bot', text }]);
        if (idx === texts.length - 1) {
          setIsTyping(false);
          then?.();
        }
      }, delay);
    });
  };

  const startConversation = () => {
    resetConversation();
    if (hasSession && sessionEmail) {
      botSay([
        'Hi! I am the AWIE Sourcer Bot 🤖',
        `Welcome ${sessionName || 'there'}! Tell us what you need and we will check if we can source it for you.`,
      ], () => {
        setMessages((prev) => [...prev, { from: 'bot', text: 'What product or component are you looking for?' }]);
        setStep('product');
      });
    } else {
      botSay([
        'Hi! I am the AWIE Sourcer Bot 🤖',
        'Please sign in to your AWIE store account first. This keeps requests genuine and lets us reply to you faster.',
      ]);
      setStep('idle');
    }
  };

  const handleUserReply = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInputValue('');

    if (step === 'product') {
      setDraft((d) => ({ ...d, productName: text }));
      botSay(['Great — noted.'], () => {
        setMessages((prev) => [...prev, { from: 'bot', text: 'How many units do you need? (e.g. 5, 10, 50…)' }]);
        setStep('quantity');
      });
    } else if (step === 'quantity') {
      setDraft((d) => ({ ...d, quantity: text }));
      botSay(['Perfect.'], () => {
        setMessages((prev) => [...prev, { from: 'bot', text: 'Any specific specifications? (voltage, size, ratings…) — or type "skip".' }]);
        setStep('specs');
      });
    } else if (step === 'specs') {
      setDraft((d) => ({ ...d, specifications: text.toLowerCase() === 'skip' ? '' : text }));
      botSay(['Noted.'], () => {
        setMessages((prev) => [...prev, { from: 'bot', text: 'Preferred brand or model? (e.g. "generic is fine")' }]);
        setStep('brand');
      });
    } else if (step === 'brand') {
      setDraft((d) => ({ ...d, brandModel: text.toLowerCase() === 'skip' ? '' : text }));
      botSay(['Almost done!'], () => {
        setMessages((prev) => [...prev, { from: 'bot', text: 'You can attach a reference image of the component (optional).' }]);
        setStep('image');
      });
    } else if (step === 'contact') {
      // Expect "email" or "email phone" if not signed in
      const parts = text.split(/\s+/);
      const email = parts.find((p) => p.includes('@')) || '';
      const phone = parts.find((p) => /^\+?\d[\d\s-]{8,}$/.test(p)) || '';
      setDraft((d) => ({ ...d, email: email || d.email, phone: phone || d.phone }));
      submitRequest({ email, phone });
    }
  };

  const handleImageSelected = (file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setMessages((prev) => [...prev, { from: 'bot', text: '⚠️ Image must be under 5 MB. Please choose a smaller file.' }]);
      return;
    }
    setDraft((d) => ({ ...d, image: file }));
    setMessages((prev) => [...prev, { from: 'user', text: `📎 Attached: ${file.name}` }]);
    botSay(['Reference image attached.'], () => {
      if (hasSession && sessionEmail) {
        setMessages((prev) => [...prev, { from: 'bot', text: `We will reply to ${sessionEmail}. Ready to submit your request? Type "yes" to send it.` }]);
        setStep('contact');
        setDraft((d) => ({ ...d, email: sessionEmail || undefined }));
      } else {
        setMessages((prev) => [...prev, { from: 'bot', text: 'Finally — what is the best email (and optionally phone/WhatsApp) to reach you? Example: you@example.com 9876543210' }]);
        setStep('contact');
      }
    });
  };

  const submitRequest = async (contact?: { email?: string; phone?: string }) => {
    if (!agreedToTerms) {
      botSay(['⚠️ Please accept the AWIE Sourcer Bot Terms & Conditions before submitting.']);
      return;
    }
    const finalEmail = contact?.email || draft.email || sessionEmail || '';
    if (!finalEmail) {
      botSay(['Please include a valid email so we can reply to you.']);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('productName', draft.productName || '');
      formData.append('quantity', draft.quantity || '');
      formData.append('specifications', draft.specifications || '');
      formData.append('brandModel', draft.brandModel || '');
      formData.append('email', finalEmail);
      formData.append('phone', contact?.phone || draft.phone || '');
      formData.append('name', sessionName || '');
      formData.append('userId', sessionUserId || '');
      if (draft.image) {
        formData.append('image', draft.image);
      }

      const res = await fetch('/api/store/sourcing-request', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to submit your request. Please try again.');
        setIsSubmitting(false);
        return;
      }

      botSay([
        '✅ Request received!',
        'AWIE Sourcer Bot will check the requested product and let you know whether it can be sourced.',
        'You will be notified by email with one of these statuses: 🟢 Sourceable · 🟡 Checking · 🔴 Not Sourceable.',
        'Note: attached reference images are auto-deleted from our storage within 3 days after review.',
      ]);
      setIsDone(true);
      setStep('idle');
    } catch {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitFromContact = () => {
    submitRequest();
  };

  return (
    <>
      {/* Floating glowing button — bottom right corner of the store */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            if (messages.length === 0) startConversation();
          }}
          className="fixed bottom-6 right-6 z-40 group"
          aria-label="Open AWIE Source Bot"
        >
          <span className="absolute inset-0 rounded-full bg-[#2563EB]/40 animate-ping group-hover:bg-[#2563EB]/60" />
          <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-[#2563EB] shadow-xl shadow-[#2563EB]/40 overflow-hidden hover:scale-105 transition-transform">
            <Image
              src="/awiestorebot.png"
              alt="AWIE Source Bot"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </span>
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-[#2563EB] text-white">
            <MessageCircle className="w-3 h-3" />
          </span>
        </button>
      )}

      {/* Chat Dialog */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/20 overflow-hidden flex flex-col max-h-[70vh] animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#2563EB] flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/95 border border-white/60 overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src="/awiestorebot.png"
                alt={BOT_NAME}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-white text-xs font-black block">{BOT_NAME}</span>
              <span className="text-blue-100 text-[10px] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                {isTyping ? 'typing…' : 'Online — Tell us what you need'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs font-medium leading-relaxed whitespace-pre-line ${
                  msg.from === 'user'
                    ? 'bg-[#2563EB] text-white rounded-br-md'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Not signed in prompt — login / signup on the same panel */}
            {!hasSession && messages.length > 0 && step === 'idle' && !isDone && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 space-y-2.5">
                <p className="text-[11px] text-amber-900 font-semibold leading-relaxed">
                  Sign in to submit a sourcing request — it keeps requests genuine and replies faster.
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="flex-1 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white text-[11px] font-bold text-center transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="flex-1 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-[11px] font-bold text-center inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <UserPlus className="w-3 h-3" />
                    <span>Create Account</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Image attach option */}
            {step === 'image' && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 hover:border-[#2563EB] text-[11px] font-bold text-slate-700 hover:text-[#2563EB] transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Attach Reference Image (optional)</span>
                </button>
              </div>
            )}

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[11px] font-medium">
                {errorMessage}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Terms Consent Checkbox — shown once details are being collected */}
          {(step === 'image' || step === 'contact') && !isDone && (
            <div className="px-3 pt-3 bg-white shrink-0">
              <label htmlFor="sourcer-terms" className="flex items-start gap-2 text-[10px] text-slate-600 font-medium cursor-pointer select-none">
                <input
                  id="sourcer-terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-3.5 h-3.5 rounded bg-slate-100 border-slate-300 text-[#2563EB] focus:ring-[#2563EB] shrink-0"
                />
                <span>
                  I agree to the{' '}
                  <Link
                    href="/sourcer-terms"
                    target="_blank"
                    className="text-[#2563EB] font-bold hover:underline"
                  >
                    AWIE Sourcer Bot Terms &amp; Conditions
                  </Link>{' '}
                  and understand that submitting a request does not guarantee availability, pricing, or purchase.
                </span>
              </label>
            </div>
          )}

          {/* Input Row */}
          <div className="p-3 border-t border-slate-200 bg-white shrink-0">
            {isDone ? (
              <button
                type="button"
                onClick={resetConversation}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 border border-slate-200 text-xs font-bold text-[#2563EB] transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Start New Sourcing Request</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    handleImageSelected(e.target.files?.[0] || null);
                    e.target.value = '';
                  }}
                />
                {step === 'image' && (
                  <button
                    type="button"
                    onClick={() => {
                      setDraft((d) => ({ ...d, image: null }));
                      setMessages((prev) => [...prev, { from: 'user', text: 'Skip image' }]);
                      botSay(['No problem.'], () => {
                        if (hasSession && sessionEmail) {
                          setMessages((prev) => [...prev, { from: 'bot', text: `We will reply to ${sessionEmail}. Ready to submit your request? Type "yes" to send it.` }]);
                          setStep('contact');
                          setDraft((d) => ({ ...d, email: sessionEmail || undefined }));
                        } else {
                          setMessages((prev) => [...prev, { from: 'bot', text: 'Finally — what is the best email (and optionally phone/WhatsApp) to reach you? Example: you@example.com 9876543210' }]);
                          setStep('contact');
                        }
                      });
                    }}
                    className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-600 transition-colors shrink-0"
                  >
                    Skip
                  </button>
                )}
                <input
                  type="text"
                  value={inputValue}
                  disabled={isTyping || isSubmitting || step === 'idle'}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (step === 'contact' && hasSession && sessionEmail) {
                        if (inputValue.trim().toLowerCase() === 'yes') {
                          handleSubmitFromContact();
                        } else if (inputValue.trim()) {
                          handleUserReply(inputValue);
                        }
                      } else {
                        handleUserReply(inputValue);
                      }
                    }
                  }}
                  placeholder={
                    step === 'idle'
                      ? '…'
                      : step === 'contact' && hasSession && sessionEmail
                      ? 'Type "yes" to submit'
                      : 'Type your reply…'
                  }
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#2563EB] transition-colors font-medium disabled:opacity-60"
                />
                <button
                  type="button"
                  disabled={isTyping || isSubmitting || step === 'idle' || !inputValue.trim()}
                  onClick={() => {
                    if (step === 'contact' && hasSession && sessionEmail) {
                      if (inputValue.trim().toLowerCase() === 'yes') {
                        handleSubmitFromContact();
                      } else if (inputValue.trim()) {
                        handleUserReply(inputValue);
                      }
                    } else {
                      handleUserReply(inputValue);
                    }
                  }}
                  className="p-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 disabled:opacity-50 text-white transition-colors shrink-0 cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Send"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
