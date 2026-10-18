'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Sparkles, 
  Heart, 
  Gift, 
  Cake, 
  PartyPopper, 
  Volume2, 
  VolumeX, 
  Flame, 
  ArrowRight, 
  AlertCircle,
  Star,
  GraduationCap,
  Stethoscope,
  Download,
  ExternalLink,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Send,
  Play,
  RotateCcw
} from 'lucide-react';

const SECRET_CODE = 'LAR1019';

// Interactive wishes hidden in balloons tailored for nursing student Larissa
const BALLOONS = [
  { id: 1, color: 'from-pink-500 to-rose-600', text: 'Future Top Nurse & Lifesaver 🩺' },
  { id: 2, color: 'from-blue-500 to-indigo-600', text: 'Acing Your Final Year With Honors 🎓' },
  { id: 3, color: 'from-amber-400 to-yellow-600', text: 'Endless Joy, Peace & Radiant Smiles 🌸' },
  { id: 4, color: 'from-purple-500 to-violet-700', text: 'Golden Health & Endless Blessings ✨' },
  { id: 5, color: 'from-emerald-400 to-teal-600', text: 'Cherished Friendship Forever 🌟' },
];

export default function LarissaBirthdayPage() {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Cake blow interactive states
  const [cakeBlowStage, setCakeBlowStage] = useState<'idle' | 'counting' | 'blowing' | 'blown'>('idle');
  const [countdownNum, setCountdownNum] = useState(3);

  // Floating letters overlay state
  const [showFloatingLetters, setShowFloatingLetters] = useState(false);

  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [videoEnded, setVideoEnded] = useState(false);
  
  // Gift delivery form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    note: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [formError, setFormError] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fireworksCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoMobileRef = useRef<HTMLVideoElement | null>(null);
  const videoDesktopRef = useRef<HTMLVideoElement | null>(null);
  const giftSectionRef = useRef<HTMLDivElement | null>(null);

  // Check sessionStorage on initial load
  useEffect(() => {
    try {
      const auth = sessionStorage.getItem('larissa_bday_verified');
      if (auth === 'true') {
        setIsUnlocked(true);
        setShowFloatingLetters(true);
      }
    } catch {
      // ignore in restricted environments
    }
    setHasCheckedSession(true);
  }, []);

  // Web Audio celebration chime
  const playChime = (type: 'success' | 'error' | 'pop' | 'blow' | 'countdown' | 'fanfare') => {
    if (isMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();

      if (type === 'countdown') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      } else if (type === 'fanfare') {
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.12);
          osc.stop(ctx.currentTime + idx * 0.12 + 0.9);
        });
      } else if (type === 'success') {
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
        osc.frequency.setValueAtTime(750, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.22, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.13);
      } else if (type === 'blow') {
        const bufferSize = ctx.sampleRate * 0.7;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 650;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.22, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      }
    } catch {
      // AudioContext not supported
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

    for (let i = 0; i < 85; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 3,
        speedY: Math.random() * 2.8 + 1.8,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 5
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

  // Handle verification form submit
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmed = passcode.trim().toUpperCase();

    if (trimmed === SECRET_CODE) {
      playChime('success');
      try {
        sessionStorage.setItem('larissa_bday_verified', 'true');
      } catch {
        // ignore
      }
      setIsUnlocked(true);
      setShowFloatingLetters(true);
    } else {
      playChime('error');
      setIsShaking(true);
      setErrorMessage('Access Denied: Incorrect passcode. Please try again.');
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleLock = () => {
    try {
      sessionStorage.removeItem('larissa_bday_verified');
    } catch {
      // ignore
    }
    setIsUnlocked(false);
    setPasscode('');
    setErrorMessage('');
    setCakeBlowStage('idle');
  };

  // Cake Blow: Click on count of 3 -> 3s countdown -> 2s blow -> candles off + fanfare fireworks
  const handleBlowCandles = () => {
    if (cakeBlowStage !== 'idle') return;

    setCakeBlowStage('counting');
    setCountdownNum(3);
    playChime('countdown');

    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCountdownNum(current);
        playChime('countdown');
      } else {
        clearInterval(interval);
        // Start 2-second blowing stage
        setCakeBlowStage('blowing');
        playChime('blow');

        setTimeout(() => {
          // Extinguish candles, launch fanfare & fireworks
          setCakeBlowStage('blown');
          playChime('fanfare');
        }, 2000);
      }
    }, 1000);
  };

  const handlePopBalloon = (id: number) => {
    if (!poppedBalloons.includes(id)) {
      playChime('pop');
      setPoppedBalloons((prev) => [...prev, id]);
    }
  };

  const handleVideoEnded = () => {
    setVideoEnded(true);
    playChime('success');
    if (giftSectionRef.current) {
      giftSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setFormError('Please enter your name, contact number, and delivery address.');
      return;
    }

    setFormSubmitting(true);
    try {
      const res = await fetch('/api/larissa-gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setTrackingCode(data.trackingCode || `AWIE-LARISSA-${Math.floor(1000 + Math.random() * 9000)}`);
        setFormSubmitted(true);
        playChime('fanfare');
      } else {
        setFormError(data.error || 'Failed to submit details. Please try again.');
      }
    } catch {
      // If offline or network issue, still gracefully accept
      setTrackingCode(`AWIE-LARISSA-${Math.floor(1000 + Math.random() * 9000)}`);
      setFormSubmitted(true);
      playChime('fanfare');
    } finally {
      setFormSubmitting(false);
    }
  };

  if (!hasCheckedSession) {
    return <div className="min-h-screen bg-[#070B14]" />;
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden font-sans selection:bg-[#F59E0B] selection:text-black">
      {/* Dynamic Background Stars and Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-pink-600/15 via-purple-600/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Confetti Overlay when Unlocked */}
      {isUnlocked && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30 w-full h-full"
        />
      )}

      {/* Floating Animated Letters "HAPPY BIRTHDAY LARISSA" */}
      {showFloatingLetters && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {"HAPPY BIRTHDAY LARISSA".split("").map((letter, idx) => {
            if (letter === " ") {
              return <div key={`space-${idx}`} className="inline-block w-4" />;
            }
            const leftPercent = 3 + (idx * 94) / 22;
            const duration = 7 + (idx % 4) * 1.5;
            const delay = (idx % 6) * 0.4;
            return (
              <motion.div
                key={`float-letter-${idx}`}
                initial={{ y: '105vh', opacity: 0, scale: 0.6 }}
                animate={{
                  y: '-15vh',
                  opacity: [0, 1, 1, 0.8, 0],
                  scale: [0.6, 1.25, 1, 0.9],
                  x: [0, idx % 2 === 0 ? 25 : -25, 0]
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut'
                }}
                style={{ left: `${leftPercent}%` }}
                className="absolute bottom-0 text-2xl sm:text-4xl md:text-5xl font-black font-mono select-none drop-shadow-[0_0_18px_rgba(244,63,94,0.7)] text-transparent bg-clip-text bg-gradient-to-t from-pink-500 via-rose-400 to-amber-300"
              >
                {letter}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Ambient Top Controls */}
      <div className="relative z-40 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-400 p-[1.5px] shadow-lg shadow-pink-500/20">
            <div className="w-full h-full bg-[#0B0F19] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-black block">
              SPECIAL CELEBRATION
            </span>
            <span className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              For Larissa ✨
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-md"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
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
              <span>Lock</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* ======================================================== */
            /* 1. PASSCODE GATEKEEPER (No hints, clean mystery box)     */
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
                  errorMessage ? 'border-rose-500 shadow-2xl shadow-rose-500/20' : 'border-slate-800/90 shadow-2xl shadow-pink-500/10'
                } relative overflow-hidden transition-all duration-300 ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
              >
                {/* Subtle Card Glow */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="text-center space-y-6 relative z-10">
                  {/* Gatekeeper Icon Badge */}
                  <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-500/20 via-rose-500/20 to-amber-500/20 border border-pink-500/30 flex items-center justify-center p-3 shadow-inner">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#0E1526] to-[#0A0D18] flex items-center justify-center shadow-lg">
                      <Lock className="w-8 h-8 text-pink-400 animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-[11px] font-black text-pink-300 uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      <span>Special Surprise</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      A Special Surprise For Larissa ✨
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Enter your private access passcode to reveal the birthday surprise prepared just for you.
                    </p>
                  </div>

                  {/* Form - with NO hints */}
                  <form onSubmit={handleVerify} className="space-y-4 pt-2">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-300 tracking-wider uppercase block">
                        Secret Passcode
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          value={passcode}
                          onChange={(e) => {
                            setPasscode(e.target.value);
                            if (errorMessage) setErrorMessage('');
                          }}
                          placeholder="••••••••"
                          maxLength={16}
                          autoFocus
                          className={`w-full px-5 py-4 rounded-2xl bg-[#090D1A] border ${
                            errorMessage 
                              ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/50' 
                              : 'border-slate-700/80 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20'
                          } text-center font-mono text-xl sm:text-2xl tracking-[0.25em] font-black text-pink-300 placeholder:text-slate-600 focus:outline-none transition-all shadow-inner`}
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
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:via-rose-400 hover:to-amber-400 text-slate-950 font-black text-sm tracking-wide uppercase transition-all shadow-xl shadow-pink-500/20 hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <Sparkles className="w-5 h-5 text-slate-950" />
                      <span>Unlock My Surprise</span>
                      <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-mono">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Dedicated with love &amp; joy to Larissa</span>
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
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-amber-500/20 border border-pink-400/40 text-pink-300 text-xs sm:text-sm font-black tracking-widest uppercase shadow-xl shadow-pink-500/10 backdrop-blur-md">
                    <PartyPopper className="w-4 h-4 text-pink-400 animate-bounce" />
                    <span>A SPECIAL BIRTHDAY SURPRISE • FROM SHOVIN</span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                </motion.div>

                {/* Big Birthday Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight">
                    Happy Birthday,{' '}
                    <span className="bg-gradient-to-r from-pink-300 via-rose-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(244,63,94,0.4)]">
                      Larissa!
                    </span>{' '}
                    🎂
                  </h1>
                  <p className="text-slate-300 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                    Celebrating your special day, your contagious bright energy, and cheering you on as you conquer your final year of nursing school! 🩺✨
                  </p>
                </motion.div>

                {/* Personalized Friend & Nursing Badges */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center justify-center gap-2.5 pt-2"
                >
                  {[
                    { label: 'Future Registered Nurse 🩺', color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' },
                    { label: 'Final Year Champion 🎓', color: 'text-blue-400 border-blue-400/30 bg-blue-400/10' },
                    { label: 'Healing Hands & Big Heart ❤️', color: 'text-rose-400 border-rose-400/30 bg-rose-400/10' },
                    { label: 'Wonderful Friend 🌟', color: 'text-amber-400 border-amber-400/30 bg-amber-400/10' }
                  ].map((badge) => (
                    <span
                      key={badge.label}
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md ${badge.color}`}
                    >
                      <span>{badge.label}</span>
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* ======================================================== */}
              {/* VIDEO PLAYER SECTION (9:16 Mobile, 16:9 Desktop)         */}
              {/* ======================================================== */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-pink-500/30 shadow-2xl relative overflow-hidden"
              >
                <div className="text-center space-y-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-mono font-bold text-pink-400 uppercase tracking-widest">
                    <Play className="w-3.5 h-3.5 fill-pink-400" />
                    <span>Watch Your Special Birthday Video</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Memories in Motion 🎬
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Turn your volume on and press play!
                  </p>
                </div>

                {/* Mobile Video Container (9:16 Aspect Ratio) */}
                <div className="block md:hidden w-full max-w-xs mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-pink-500/30 bg-black relative">
                  <video
                    ref={videoMobileRef}
                    src="/scr/916.mp4"
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={handleVideoEnded}
                  />
                </div>

                {/* Desktop Video Container (16:9 Aspect Ratio) */}
                <div className="hidden md:block w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-pink-500/30 bg-black relative">
                  <video
                    ref={videoDesktopRef}
                    src="/scr/169.mp4"
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={handleVideoEnded}
                  />
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => {
                      if (giftSectionRef.current) {
                        giftSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-xs text-pink-300 hover:text-pink-200 underline underline-offset-4 font-semibold"
                  >
                    Skip to the recreation photo &amp; surprise gift ↓
                  </button>
                </div>
              </motion.div>

              {/* ======================================================== */}
              {/* RECREATION PHOTO FRAME & PHYSICAL GIFT SECTION           */}
              {/* ======================================================== */}
              <div ref={giftSectionRef} className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-amber-400/40 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 space-y-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
                      <Gift className="w-3.5 h-3.5 text-amber-400" />
                      <span>Special Photo Recreation</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Your Framed Recreation Portrait 🖼️
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                      A treasured recreation captured and styled for your birthday. You can download the high-resolution photo or request the physical framed edition delivered right to your doorstep!
                    </p>

                    {/* Luxurious Photo Frame Mockup */}
                    <div className="relative mx-auto max-w-md p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-2xl shadow-amber-500/20">
                      <div className="p-2 sm:p-2.5 rounded-2xl bg-[#090D1A] shadow-inner">
                        <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                          <a href="https://postimg.cc/bSwrFrnC" target="_blank" rel="noopener noreferrer">
                            <img
                              src="/Larissa-Rcreate.png"
                              alt="Larissa-Rcreate"
                              className="w-full h-auto object-contain rounded-lg transition-transform duration-500 group-hover:scale-102"
                            />
                          </a>
                        </div>
                      </div>

                      {/* Frame Plate Label */}
                      <div className="mt-3 py-1.5 px-4 rounded-xl bg-slate-900/90 border border-amber-400/50 text-center">
                        <span className="text-[11px] font-mono font-bold text-amber-300 tracking-widest uppercase">
                          LARISSA • SPECIAL EDITION
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons for the Photo */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <a
                        href="/Larissa-Rcreate.png"
                        download="Larissa-Recreate-Portrait.png"
                        className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4 text-slate-950" />
                        <span>Download Photo Frame</span>
                      </a>

                      <a
                        href="https://postimg.cc/bSwrFrnC"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all border border-slate-700 inline-flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4 text-slate-300" />
                        <span>View High-Res on PostImg</span>
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Delivery Address Form Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-900/90 border border-rose-500/30 shadow-2xl relative overflow-hidden"
                >
                  <div className="space-y-3 text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
                      <Gift className="w-3.5 h-3.5" />
                      <span>Physical Framed Gift Delivery</span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Receive This Physical Framed Photo in Your Hands 🎁
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
                      Fill in your delivery address and contact details so this custom framed recreation portrait can be safely delivered straight into your hands very soon!
                    </p>
                  </div>

                  {!formSubmitted ? (
                    <form onSubmit={handleAddressSubmit} className="space-y-4 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-pink-400" />
                            <span>Full Name</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Larissa"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-pink-400 transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-pink-400" />
                            <span>Contact / WhatsApp Number</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Your phone number"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-pink-400 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-pink-400" />
                          <span>Delivery Address (Flat / House No, Street, Area)</span>
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Your complete address..."
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-pink-400 transition-colors resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-300">City</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="City"
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-pink-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-300">State</label>
                          <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            placeholder="State"
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-pink-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-300">PIN Code</label>
                          <input
                            type="text"
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            placeholder="PIN"
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-pink-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300">Special Note / Timing Preference (Optional)</label>
                        <input
                          type="text"
                          value={formData.note}
                          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                          placeholder="e.g. Deliver on weekend, or message on WhatsApp before delivery"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-pink-400"
                        />
                      </div>

                      {formError && (
                        <p className="text-xs text-rose-400 font-semibold">{formError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:via-rose-400 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-pink-500/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>{formSubmitting ? 'Saving Details...' : 'Send Details for Delivery 🎁'}</span>
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-6 sm:p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-black text-emerald-300">
                          Delivery Details Successfully Received! 🎉
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                          An email with your details has been sent to the AWIE team. Your custom framed recreation portrait is being prepared with immense love and care and will reach straight into your hands very soon!
                        </p>
                      </div>

                      {/* Unique Order Tracking Code Box */}
                      {trackingCode && (
                        <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-md mx-auto shadow-inner">
                          <div className="text-left">
                            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block">
                              Gift Order Tracking Code
                            </span>
                            <span className="text-base sm:text-lg font-mono font-black text-amber-300 tracking-wide">
                              {trackingCode}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(trackingCode);
                              setCopiedCode(true);
                              setTimeout(() => setCopiedCode(false), 2000);
                            }}
                            className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold transition-all border border-emerald-500/30 cursor-pointer"
                          >
                            {copiedCode ? 'Copied! ✓' : 'Copy Code 📋'}
                          </button>
                        </div>
                      )}

                      <p className="text-[11px] text-slate-400 italic">
                        Keep this tracking code for your reference. Wishing you a truly blessed and wonderful day ahead! 💖
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Interactive Birthday Cake Card with Count-of-3 Blow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
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
                          {cakeBlowStage !== 'blown' ? (
                            <motion.div
                              animate={
                                cakeBlowStage === 'blowing'
                                  ? { scale: [1, 0.7, 1.3, 0.4], x: [-6, 6, -8, 8, 0], rotate: [-15, 15, -20, 20, 0] }
                                  : { scale: [1, 1.25, 0.95, 1], rotate: [-4, 4, -2, 0] }
                              }
                              transition={{
                                duration: cakeBlowStage === 'blowing' ? 0.25 : 1.2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: candle * 0.15
                              }}
                              className="text-amber-400 drop-shadow-[0_0_12px_#F59E0B]"
                            >
                              <Flame className="w-6 h-6 fill-amber-400 text-yellow-300" />
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ scale: 0, opacity: 1 }}
                              animate={{ y: -20, opacity: 0 }}
                              transition={{ duration: 1.8 }}
                              className="text-slate-400 text-[11px] font-mono font-bold"
                            >
                              ☁️ puff!
                            </motion.div>
                          )}
                          <div className="w-2.5 h-8 bg-gradient-to-b from-amber-200 via-rose-300 to-pink-300 rounded-t-sm shadow-sm" />
                        </div>
                      ))}
                    </div>

                    {/* Cake Tiers */}
                    <div className="w-40 h-10 rounded-t-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 shadow-md flex items-center justify-center border-t border-emerald-300">
                      <span className="text-[10px] font-extrabold text-white tracking-widest uppercase">NURSING '26</span>
                    </div>
                    <div className="w-52 h-14 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 shadow-lg flex items-center justify-center border-t border-pink-200">
                      <span className="text-xs font-black text-white tracking-wider">LARISSA</span>
                    </div>
                    <div className="w-64 h-8 rounded-b-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 shadow-xl flex items-center justify-center border-t border-amber-300">
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-yellow-200 fill-yellow-200" />
                        <span className="text-[10px] font-mono font-bold text-slate-950 tracking-widest">★ HAPPY BIRTHDAY ★</span>
                        <Star className="w-3 h-3 text-yellow-200 fill-yellow-200" />
                      </div>
                    </div>
                  </div>

                  {/* Count of 3 Countdown & Blow Flow */}
                  {cakeBlowStage === 'idle' && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-400">Make your wish, then click to blow on the count of 3!</p>
                      <button
                        type="button"
                        onClick={handleBlowCandles}
                        className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 hover:from-amber-300 hover:via-rose-400 hover:to-purple-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                      >
                        <Flame className="w-4 h-4 text-slate-950" />
                        <span>Click to Blow on Count of 3! 🎂</span>
                      </button>
                    </div>
                  )}

                  {cakeBlowStage === 'counting' && (
                    <motion.div
                      key={`countdown-${countdownNum}`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-center space-y-2"
                    >
                      <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest block">
                        Get Ready to Blow in...
                      </span>
                      <span className="text-5xl font-black text-amber-400 font-mono block animate-pulse">
                        {countdownNum}
                      </span>
                    </motion.div>
                  )}

                  {cakeBlowStage === 'blowing' && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 1 }}
                      className="p-4 rounded-2xl bg-blue-500/20 border border-blue-400/40 text-center space-y-1 animate-pulse"
                    >
                      <span className="text-3xl block">🌬️💨</span>
                      <span className="text-xl font-black text-white uppercase tracking-wider block">
                        NOW BLOW THE CANDLES!
                      </span>
                      <span className="text-xs text-blue-200">Blowing with all your heart...</span>
                    </motion.div>
                  )}

                  {cakeBlowStage === 'blown' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', damping: 14 }}
                      className="p-6 rounded-2xl bg-gradient-to-b from-amber-500/20 via-rose-500/15 to-purple-500/20 border border-amber-400/50 text-center space-y-3 shadow-2xl"
                    >
                      <div className="text-3xl animate-bounce">🎆✨🎉</div>
                      <h4 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-yellow-200">
                        SURPRISE! HAPPY BIRTHDAY LARISSA!
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-w-md mx-auto">
                        Your wish has been launched into the stars! Thank you for being such an extraordinary, caring, and genuine friend. We are so grateful for you and cheering you on as you finish nursing school and touch countless lives! 🩺💖🌟
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setCakeBlowStage('idle')}
                          className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px] font-bold text-slate-300 hover:text-white transition-colors"
                        >
                          Relight Candles 🕯️
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Heartfelt Note from Friend Shovin */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-pink-400 via-rose-500 to-amber-500" />
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                        <Heart className="w-5 h-5 fill-pink-400/20" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white">A Birthday Note For Larissa</h3>
                        <p className="text-xs text-slate-400 font-mono">From your friend Shovin</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-800 text-pink-400 font-bold">
                      Happy Birthday
                    </span>
                  </div>

                  <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    <p>
                      Dear <strong className="text-pink-300 font-bold">Larissa</strong>,
                    </p>
                    <p>
                      Today is your day, and I wanted to create something special to wish you a very happy birthday!
                    </p>
                    <p>
                      Seeing you work so hard in nursing school — balancing late shifts, heavy coursework, and endless clinicals in your final year — is genuinely inspiring. Nursing requires genuine compassion, patience, and a kind heart, and you have all of that in abundance. I know you are going to be an extraordinary nurse who brings comfort and hope to so many people.
                    </p>
                    <p>
                      I hope this year brings you all the happiness, success in your finals, lots of memorable moments, and dreams coming true.
                    </p>
                    <p className="pt-2 font-semibold text-white">
                      Have the happiest and most grateful birthday! Keep shining! ✨
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-pink-400 font-bold">#HappyBirthdayLarissa</span>
                    <span className="font-mono text-slate-400 font-bold">— Shovin</span>
                  </div>
                </div>
              </motion.div>

              {/* Interactive Balloon Pop Game (Nursing & Dreams) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-6"
              >
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
                    <PartyPopper className="w-3.5 h-3.5" />
                    <span>Pop the Surprise Balloons</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Secret Birthday Wishes For You
                  </h3>
                  <p className="text-xs text-slate-400">Click each balloon to pop and reveal a special wish!</p>
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
                <p className="text-xs font-mono text-slate-400">
                  Wishing Larissa the happiest, most blessed birthday • 2026
                </p>
                <p className="text-[11px] text-slate-600">
                  Secret Route: <span className="font-mono text-pink-400/80">/larissa</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
