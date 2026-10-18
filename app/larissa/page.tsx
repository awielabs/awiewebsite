'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Unlock, 
  Sparkles, 
  Heart, 
  Gift, 
  Cake, 
  PartyPopper, 
  Volume2, 
  VolumeX, 
  Flame, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Star,
  Award,
  Crown
} from 'lucide-react';

const SECRET_CODE = 'LAR1019';

// Interactive wishes hidden in balloons
const BALLOONS = [
  { id: 1, color: 'from-pink-500 to-rose-600', text: 'Endless Joy & Happiness 🌸' },
  { id: 2, color: 'from-blue-500 to-indigo-600', text: 'Unstoppable Success & Vision 🚀' },
  { id: 3, color: 'from-amber-400 to-yellow-600', text: 'Golden Health & Good Vibes ✨' },
  { id: 4, color: 'from-purple-500 to-violet-700', text: 'Extraordinary Milestones Ahead 🏆' },
  { id: 5, color: 'from-emerald-400 to-teal-600', text: 'Infinite Creative Inspiration 💡' },
];

export default function LarissaBirthdayPage() {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [activeFrame, setActiveFrame] = useState(1);
  const [isPlayingFrames, setIsPlayingFrames] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check sessionStorage on initial load
  useEffect(() => {
    try {
      const auth = sessionStorage.getItem('awie_larissa_verified');
      if (auth === 'true') {
        setIsUnlocked(true);
      }
    } catch {
      // ignore in SSR / restricted storage
    }
    setHasCheckedSession(true);
  }, []);

  // Web Audio celebration synthesizer chime
  const playChime = (type: 'success' | 'error' | 'pop' | 'blow') => {
    if (isMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();

      if (type === 'success') {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.15, ctx.currentTime + index * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.1 + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + index * 0.1);
          osc.stop(ctx.currentTime + index * 0.1 + 0.6);
        });
      } else if (type === 'error') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.26);
      } else if (type === 'pop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.13);
      } else if (type === 'blow') {
        // Wind / swoosh effect
        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      }
    } catch {
      // AudioContext not supported or user didn't interact
    }
  };

  // Canvas confetti animation
  useEffect(() => {
    if (!isUnlocked) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#F59E0B', '#EC4899', '#3B82F6', '#8B5CF6', '#10B981', '#EF4444', '#F43F5E'];
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotSpeed: number;
    }> = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 3,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 6
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isUnlocked]);

  // Handle frame-by-frame player autoplay
  useEffect(() => {
    if (isPlayingFrames) {
      frameIntervalRef.current = setInterval(() => {
        setActiveFrame((prev) => (prev >= 6 ? 1 : prev + 1));
      }, 1400);
    } else {
      if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
    }
    return () => {
      if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
    };
  }, [isPlayingFrames]);

  // Handle verification form submit
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmed = passcode.trim().toUpperCase();

    if (trimmed === SECRET_CODE) {
      playChime('success');
      try {
        sessionStorage.setItem('awie_larissa_verified', 'true');
      } catch {
        // ignore
      }
      setIsUnlocked(true);
    } else {
      playChime('error');
      setIsShaking(true);
      setErrorMessage('Access Denied: Invalid Security Code. Only authorized guests can enter.');
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleLock = () => {
    try {
      sessionStorage.removeItem('awie_larissa_verified');
    } catch {
      // ignore
    }
    setIsUnlocked(false);
    setPasscode('');
    setErrorMessage('');
  };

  const handleBlowCandles = () => {
    if (!candlesBlown) {
      playChime('blow');
      setCandlesBlown(true);
      setTimeout(() => playChime('success'), 600);
    }
  };

  const handlePopBalloon = (id: number) => {
    if (!poppedBalloons.includes(id)) {
      playChime('pop');
      setPoppedBalloons((prev) => [...prev, id]);
    }
  };

  if (!hasCheckedSession) {
    return <div className="min-h-screen bg-[#070B14]" />;
  }

  // Storyboard Frame Mockups ready for the upcoming frame assets
  const frameMoments = [
    {
      num: 1,
      title: 'Chapter 01: The Founder’s Spark',
      subtitle: 'Where bold ideas transformed into engineering brilliance.',
      caption: 'Every great enterprise starts with visionary clarity and unshakable conviction.',
      gradient: 'from-blue-600 to-indigo-900',
      badge: 'Vision & Genesis'
    },
    {
      num: 2,
      title: 'Chapter 02: Building With Heart & Grit',
      subtitle: 'Leading teams, breaking boundaries, and scaling AWIE.',
      caption: 'True leadership is inspiring everyone around you to reach their highest potential.',
      gradient: 'from-purple-600 to-pink-900',
      badge: 'Leadership & Soul'
    },
    {
      num: 3,
      title: 'Chapter 03: Precision & Innovation',
      subtitle: 'Merging cutting-edge tech with purposeful impact.',
      caption: 'Crafting hardware, software, and systems that leave a permanent legacy.',
      gradient: 'from-amber-600 to-rose-950',
      badge: 'Engineering Excellence'
    },
    {
      num: 4,
      title: 'Chapter 04: The Guiding Light',
      subtitle: 'Standing tall as the pillar and soul of AWIE Labs.',
      caption: 'Through every complex challenge, your optimism lights the way forward.',
      gradient: 'from-teal-600 to-blue-950',
      badge: 'Strength & Guidance'
    },
    {
      num: 5,
      title: 'Chapter 05: Celebrating You Today',
      subtitle: 'A day dedicated entirely to honouring your journey.',
      caption: 'May this year shower you with unforgettable victories and endless smiles.',
      gradient: 'from-rose-500 to-purple-900',
      badge: 'Birthday Celebration'
    },
    {
      num: 6,
      title: 'Chapter 06: To Infinite Horizons',
      subtitle: 'The greatest chapters are still to be written.',
      caption: 'Happy Birthday, Founder Larissa! The best is truly yet to come.',
      gradient: 'from-yellow-500 to-amber-900',
      badge: 'Endless Possibilities'
    }
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden font-sans selection:bg-[#F59E0B] selection:text-black">
      {/* Dynamic Background Stars and Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-blue-600/15 via-purple-600/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Confetti Overlay when Unlocked */}
      {isUnlocked && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30 w-full h-full"
        />
      )}

      {/* Ambient Top Controls */}
      <div className="relative z-40 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-blue-600 p-[1.5px] shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-[#0B0F19] rounded-[14px] flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-black block">
              AWIE • SPECIAL EDITION
            </span>
            <span className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              Founder Larissa Tribute
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-md"
            title={isMuted ? 'Unmute celebration audio' : 'Mute celebration audio'}
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {isUnlocked && (
            <button
              onClick={handleLock}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs font-bold text-slate-300 hover:text-rose-400 hover:border-rose-500/50 transition-all shadow-md"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Portal</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* ======================================================== */
            /* 1. VIP PASSCODE GATEKEEPER                               */
            /* ======================================================== */
            <motion.div
              key="locked-screen"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.4 }}
              className="min-h-[75vh] flex items-center justify-center"
            >
              <div 
                className={`w-full max-w-md p-8 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border ${
                  errorMessage ? 'border-rose-500 shadow-2xl shadow-rose-500/20' : 'border-slate-800/90 shadow-2xl shadow-blue-500/10'
                } relative overflow-hidden transition-all duration-300 ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
              >
                {/* Subtle Card Glow */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="text-center space-y-6 relative z-10">
                  {/* Gatekeeper Icon Badge */}
                  <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-blue-500/20 border border-amber-500/30 flex items-center justify-center p-3 shadow-inner">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#0E1526] to-[#0A0D18] flex items-center justify-center shadow-lg">
                      <Lock className="w-8 h-8 text-amber-400 animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-black text-amber-300 uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Founder Access Portal</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Exclusive Birthday Surprise
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                      This page contains a private celebration for Founder Larissa. Please enter your verification passcode to unlock.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleVerify} className="space-y-4 pt-2">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-300 tracking-wider uppercase block">
                        Security Verification Code
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={passcode}
                          onChange={(e) => {
                            setPasscode(e.target.value.toUpperCase());
                            if (errorMessage) setErrorMessage('');
                          }}
                          placeholder="e.g. LAR••••"
                          maxLength={12}
                          autoFocus
                          className={`w-full px-5 py-4 rounded-2xl bg-[#090D1A] border ${
                            errorMessage 
                              ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/50' 
                              : 'border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20'
                          } text-center font-mono text-xl sm:text-2xl tracking-[0.25em] font-black text-amber-300 placeholder:text-slate-600 focus:outline-none transition-all shadow-inner`}
                        />
                      </div>
                    </div>

                    {/* Error display */}
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-blue-600 hover:from-amber-400 hover:via-rose-400 hover:to-blue-500 text-slate-950 font-black text-sm tracking-wide uppercase transition-all shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <ShieldCheck className="w-5 h-5 text-slate-950" />
                      <span>Unlock Birthday Wish</span>
                      <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                    <span>Protected Founder Route • AWIE Labs</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ======================================================== */
            /* 2. UNLOCKED BIRTHDAY EXPERIENCE                          */
            /* ======================================================== */
            <motion.div
              key="unlocked-content"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-16 pt-4"
            >
              {/* Hero Banner */}
              <div className="text-center space-y-6 pt-4 relative">
                {/* Crown & Floating Glow */}
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-black tracking-widest uppercase shadow-xl shadow-amber-500/10 backdrop-blur-md">
                    <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span>AWIE FOUNDER CELEBRATION</span>
                    <Sparkles className="w-4 h-4 text-rose-400" />
                  </div>
                </motion.div>

                {/* Big Birthday Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight">
                    Happy Birthday,{' '}
                    <span className="bg-gradient-to-r from-amber-300 via-rose-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(245,158,11,0.4)]">
                      Larissa!
                    </span>{' '}
                    🎂
                  </h1>
                  <p className="text-slate-300 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    Honouring our extraordinary Co-Founder, brilliant innovator, and the soul driving AWIE forward every single day.
                  </p>
                </motion.div>

                {/* Leader Badges */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center justify-center gap-2.5 pt-2"
                >
                  {[
                    { label: 'Visionary Co-Founder', icon: Crown, color: 'text-amber-400 border-amber-400/30 bg-amber-400/10' },
                    { label: 'Innovator & Leader', icon: Star, color: 'text-blue-400 border-blue-400/30 bg-blue-400/10' },
                    { label: 'Heart & Soul of AWIE', icon: Heart, color: 'text-rose-400 border-rose-400/30 bg-rose-400/10' },
                    { label: 'Dream Builder', icon: Award, color: 'text-purple-400 border-purple-400/30 bg-purple-400/10' }
                  ].map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <span
                        key={badge.label}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md ${badge.color}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{badge.label}</span>
                      </span>
                    );
                  })}
                </motion.div>
              </div>

              {/* Interactive Birthday Cake Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 }}
                className="max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/30 shadow-2xl relative overflow-hidden text-center group"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                    <Cake className="w-4 h-4" />
                    <span>Interactive Celebration Cake</span>
                  </div>

                  {/* Cake Graphic & Candles */}
                  <div className="relative py-4 flex flex-col items-center justify-center">
                    {/* Animated Candles */}
                    <div className="flex items-center gap-4 mb-2">
                      {[1, 2, 3].map((candle) => (
                        <div key={candle} className="flex flex-col items-center">
                          {!candlesBlown ? (
                            <motion.div
                              animate={{ scale: [1, 1.25, 0.95, 1], rotate: [-4, 4, -2, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: candle * 0.2 }}
                              className="text-amber-400 drop-shadow-[0_0_12px_#F59E0B]"
                            >
                              <Flame className="w-6 h-6 fill-amber-400 text-yellow-300" />
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ scale: 0, opacity: 1 }}
                              animate={{ y: -15, opacity: 0 }}
                              transition={{ duration: 1.5 }}
                              className="text-slate-400 text-[10px] font-mono font-bold"
                            >
                              ☁️ wish made!
                            </motion.div>
                          )}
                          <div className="w-2.5 h-8 bg-gradient-to-b from-amber-200 via-rose-300 to-blue-300 rounded-t-sm shadow-sm" />
                        </div>
                      ))}
                    </div>

                    {/* Cake Tiers */}
                    <div className="w-40 h-10 rounded-t-2xl bg-gradient-to-r from-rose-500 via-pink-400 to-rose-500 shadow-md flex items-center justify-center border-t border-rose-300">
                      <span className="text-[10px] font-extrabold text-white tracking-widest uppercase">AWIE</span>
                    </div>
                    <div className="w-52 h-14 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-lg flex items-center justify-center border-t border-amber-200">
                      <span className="text-xs font-black text-slate-900 tracking-wider">FOUNDER LARISSA</span>
                    </div>
                    <div className="w-64 h-8 rounded-b-xl bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 shadow-xl flex items-center justify-center border-t border-blue-400">
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                        <span className="text-[10px] font-mono font-bold text-white tracking-widest">★ 2026 ★</span>
                        <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                      </div>
                    </div>
                  </div>

                  {/* Action / Result */}
                  {!candlesBlown ? (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-400">Make your birthday wish and click to blow out the candles!</p>
                      <button
                        onClick={handleBlowCandles}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 hover:from-amber-300 hover:via-rose-400 hover:to-purple-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                      >
                        <Flame className="w-4 h-4 text-slate-950" />
                        <span>Blow Out Candles &amp; Make a Wish</span>
                      </button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-semibold space-y-1"
                    >
                      <p className="text-base font-black text-amber-300">✨ May All Your Dreams Come True! ✨</p>
                      <p className="text-xs text-slate-300 font-normal">
                        Your wish has been launched into the universe. May this upcoming year bring you unimaginable joy, breakthrough victories, and peak fulfillment!
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Heartfelt Founder Tribute Letter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-400 via-rose-500 to-indigo-500" />
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        <Heart className="w-5 h-5 fill-amber-400/20" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white">To Our Co-Founder, Larissa</h3>
                        <p className="text-xs text-slate-400 font-mono">From the AWIE Family with Love &amp; Respect</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-800 text-slate-400">
                      Private Note
                    </span>
                  </div>

                  <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    <p>
                      Dear <strong className="text-amber-300 font-bold">Larissa</strong>,
                    </p>
                    <p>
                      Today is about celebrating you — your energy, your brilliant leadership, and the relentless passion that has helped shape AWIE from the ground up.
                    </p>
                    <p>
                      Co-founding and building a company requires rare bravery, deep wisdom, and an unwavering belief in what is possible. You bring that spirit into every room, every project, and every vision we chase. You remind us why we build with purpose, why excellence matters, and how to lead with genuine empathy.
                    </p>
                    <p>
                      On your special birthday, we wish you abundant health, unbounded happiness, unstoppable success in every venture, and laughter in every moment.
                    </p>
                    <p className="pt-2 font-semibold text-white">
                      Keep shining, keep leading, and keep inspiring the world! 🌟
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-amber-400 font-bold">#HappyBirthdayLarissa</span>
                    <span className="font-mono text-slate-500">AWIE Labs Leadership</span>
                  </div>
                </div>
              </motion.div>

              {/* Frame-by-Frame Memory Lane Player (Ready for User Frames) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-blue-500/30 shadow-2xl relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono font-bold text-blue-400 uppercase tracking-widest mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>Frame-by-Frame Memory Lane</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Visual Journey &amp; Storyboard
                    </h3>
                  </div>

                  {/* Frame Controls */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => setActiveFrame((prev) => (prev <= 1 ? 6 : prev - 1))}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shadow-sm"
                      title="Previous Frame"
                      aria-label="Previous frame"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsPlayingFrames(!isPlayingFrames)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
                        isPlayingFrames
                          ? 'bg-rose-500 hover:bg-rose-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-500 text-white'
                      }`}
                    >
                      {isPlayingFrames ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlayingFrames ? 'Pause Slides' : 'Auto Play'}</span>
                    </button>

                    <button
                      onClick={() => setActiveFrame((prev) => (prev >= 6 ? 1 : prev + 1))}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shadow-sm"
                      title="Next Frame"
                      aria-label="Next frame"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Active Frame Presentation Screen */}
                <div className="mt-6 relative">
                  <AnimatePresence mode="wait">
                    {frameMoments
                      .filter((f) => f.num === activeFrame)
                      .map((frame) => (
                        <motion.div
                          key={frame.num}
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.35 }}
                          className={`min-h-[340px] sm:min-h-[380px] rounded-2xl bg-gradient-to-br ${frame.gradient} p-8 sm:p-12 flex flex-col justify-between border border-white/10 relative overflow-hidden shadow-2xl`}
                        >
                          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                          <div className="relative z-10 flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white tracking-widest uppercase">
                              {frame.badge}
                            </span>
                            <span className="text-xs font-mono font-black text-white/80 bg-black/30 px-3 py-1 rounded-lg">
                              FRAME {frame.num} OF 6
                            </span>
                          </div>

                          <div className="relative z-10 space-y-3 my-auto py-6 max-w-xl">
                            <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                              {frame.title}
                            </h4>
                            <p className="text-sm sm:text-base text-white/90 font-medium">
                              {frame.subtitle}
                            </p>
                            <p className="text-xs sm:text-sm text-white/70 italic pt-2 border-l-2 border-white/40 pl-3">
                              “{frame.caption}”
                            </p>
                          </div>

                          <div className="relative z-10 flex items-center justify-between text-xs text-white/70 font-mono">
                            <span>Ready for custom sequence assets</span>
                            <span className="text-white font-bold">AWIE Founder Storyboard</span>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>

                  {/* Frame Thumbnails / Dots */}
                  <div className="flex items-center justify-center gap-2 mt-6">
                    {frameMoments.map((frame) => (
                      <button
                        key={frame.num}
                        onClick={() => setActiveFrame(frame.num)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          activeFrame === frame.num
                            ? 'w-8 bg-amber-400 shadow-md shadow-amber-400/50'
                            : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                        }`}
                        title={`Go to Frame ${frame.num}`}
                        aria-label={`Go to Frame ${frame.num}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Interactive Balloon Pop Game */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="max-w-3xl mx-auto p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-6"
              >
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
                    <PartyPopper className="w-3.5 h-3.5" />
                    <span>Pop the Surprise Balloons</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Secret Wishes For You
                  </h3>
                  <p className="text-xs text-slate-400">Click each floating balloon to pop and reveal a birthday wish!</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4">
                  {BALLOONS.map((b) => {
                    const isPopped = poppedBalloons.includes(b.id);
                    return (
                      <motion.div
                        key={b.id}
                        whileHover={!isPopped ? { scale: 1.08, y: -4 } : {}}
                        whileTap={!isPopped ? { scale: 0.92 } : {}}
                        onClick={() => handlePopBalloon(b.id)}
                        className={`min-h-[140px] p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border ${
                          isPopped
                            ? 'bg-slate-950/80 border-slate-800 text-slate-300'
                            : `bg-gradient-to-b ${b.color} border-white/20 text-white shadow-xl hover:shadow-2xl`
                        }`}
                      >
                        {!isPopped ? (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-3xl animate-bounce">🎈</span>
                            <span className="text-[11px] font-black uppercase tracking-wider">Pop Me!</span>
                          </div>
                        ) : (
                          <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center space-y-1"
                          >
                            <Sparkles className="w-4 h-4 text-amber-400 mx-auto" />
                            <p className="text-xs font-bold leading-snug">{b.text}</p>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Bottom Footer Greeting */}
              <div className="text-center pt-8 border-t border-slate-800/80 space-y-2">
                <p className="text-xs font-mono text-slate-500">
                  Crafted with admiration &amp; celebration for Co-Founder Larissa • AWIE 2026
                </p>
                <p className="text-[11px] text-slate-600">
                  Secret Route: <span className="font-mono text-amber-400/80">/larissa</span> (Protected with Passcode LAR1019)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
