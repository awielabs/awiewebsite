'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Lightbulb, 
  Wrench, 
  Target, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Globe, 
  Smartphone, 
  CircuitBoard,
  Building2,
  FlaskConical,
  ChevronRight,
  Code2,
  Radio,
  Layers,
  Zap,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';

export default function AboutPage() {
  // 3D Card Interactive Tilt State
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const corePillars = [
    {
      id: 'understand',
      step: '01',
      title: 'Understand the Problem',
      desc: 'We start with the actual requirement, whether it is a software platform, electronic product, IoT system, or something completely different.',
      icon: Lightbulb,
      accent: 'text-[#2563EB]',
      badgeBg: 'bg-blue-50 border-blue-100',
      hoverAccent: 'group-hover:bg-blue-950 group-hover:border-blue-700/60 group-hover:text-blue-400',
      glowColor: 'group-hover:from-blue-600/20',
      imgSrc: '/about/Understand.png',
      imgAlt: 'AWIE Understand the Problem - Analyzing project requirements'
    },
    {
      id: 'purpose',
      step: '02',
      title: 'Build With Purpose',
      desc: 'We select the right technologies, components, and architecture based on what the project actually needs — not simply because a technology is available.',
      icon: Wrench,
      accent: 'text-[#0284C7]',
      badgeBg: 'bg-sky-50 border-sky-100',
      hoverAccent: 'group-hover:bg-sky-950 group-hover:border-sky-700/60 group-hover:text-sky-400',
      glowColor: 'group-hover:from-sky-600/20',
      imgSrc: '/about/Build.png',
      imgAlt: 'AWIE Build With Purpose - Purposeful engineering architecture'
    },
    {
      id: 'work',
      step: '03',
      title: 'Make It Work',
      desc: 'Our focus is on functional, reliable solutions that can be tested, improved, and used in the real world.',
      icon: Target,
      accent: 'text-indigo-600',
      badgeBg: 'bg-indigo-50 border-indigo-100',
      hoverAccent: 'group-hover:bg-indigo-950 group-hover:border-indigo-700/60 group-hover:text-indigo-400',
      glowColor: 'group-hover:from-indigo-600/20',
      imgSrc: '/about/mait work.png',
      imgAlt: 'AWIE Make It Work - Working physical and digital solutions'
    }
  ];

  const domains = [
    {
      id: 'mobile',
      title: 'Mobile Applications',
      desc: 'Modern mobile applications designed for businesses, services, products, and custom ideas.',
      icon: Smartphone,
      tag: 'iOS & Android',
      imgSrc: '/about/mobile app.png'
    },
    {
      id: 'web',
      title: 'Web Platforms',
      desc: 'Websites, dashboards, portals, internal tools, APIs, and full-stack applications built around specific requirements.',
      icon: Globe,
      tag: 'Full-Stack & Cloud',
      imgSrc: '/about/website.png'
    },
    {
      id: 'iot',
      title: 'IoT & Connected Systems',
      desc: 'Sensor-based systems, monitoring solutions, wireless devices, MQTT systems, and connected hardware for real-world applications.',
      icon: Cpu,
      tag: 'Telemetry & Wireless',
      imgSrc: '/about/iot.png'
    },
    {
      id: 'embedded',
      title: 'Embedded & Electronics',
      desc: 'Custom PCBs, microcontroller systems, electronic circuits, sensor modules, prototypes, and purpose-built hardware.',
      icon: CircuitBoard,
      tag: 'Circuits & Firmware',
      imgSrc: '/about/embed.png'
    },
    {
      id: 'business',
      title: 'Business & Industry Solutions',
      desc: 'Technology solutions for real-world environments such as hotels, businesses, institutions, automation, monitoring, and other specialized applications.',
      icon: Building2,
      tag: 'Automation & Operations',
      imgSrc: '/about/Business & Industry Solutions.png'
    },
    {
      id: 'prototyping',
      title: 'Prototyping & Development',
      desc: 'From an early concept or circuit idea to a working prototype that can be tested and refined.',
      icon: FlaskConical,
      tag: 'R&D to Production',
      imgSrc: '/about/Prototyping & Development.png'
    }
  ];

  // Helper to render words intact while allowing letter-by-letter hover pop effect
  const renderInteractiveText = (text: string, isHighlighted: boolean = false, prefixKey: string = '') => {
    return text.split(' ').map((word, wIdx) => (
      <span key={`${prefixKey}-w-${wIdx}`} className="inline-block whitespace-nowrap mr-[0.3em] align-bottom">
        {word.split('').map((char, cIdx) => (
          <span
            key={`${prefixKey}-c-${wIdx}-${cIdx}`}
            className={`inline-block transition-all duration-300 ease-out cursor-default select-none hover:-translate-y-2 hover:scale-115 ${
              isHighlighted
                ? 'text-[#2563EB] hover:text-slate-900 hover:drop-shadow-[0_8px_16px_rgba(37,99,235,0.45)]'
                : 'text-slate-900 hover:text-[#2563EB] hover:drop-shadow-[0_8px_16px_rgba(37,99,235,0.5)]'
            }`}
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 18
      }
    }
  };

  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 min-h-screen relative overflow-hidden">
      {/* Light Circuit Grid Background Pattern */}
      <div className="bg-grid-pattern opacity-80" />

      {/* Animated Subtle Ambient Top Glows */}
      <motion.div 
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.35, 0.65, 0.35]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#2563EB]/15 via-sky-400/10 to-transparent rounded-full blur-3xl pointer-events-none" 
      />

      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.35, 0.15],
          x: [-20, 20, -20]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/3 -right-24 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 space-y-20 sm:space-y-28 relative z-10">
        
        {/* Header Hero Section with Interactive Letter & Badge Animations */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto space-y-6 pt-4 sm:pt-8"
        >
          {/* Animated Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50/90 border border-blue-200 text-xs sm:text-sm font-bold text-[#2563EB] shadow-sm hover:shadow-md hover:shadow-blue-500/15 hover:bg-blue-100/80 backdrop-blur-sm cursor-default transition-all duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
              </span>
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
              </motion.span>
              <span className="tracking-wide">ABOUT AWIE</span>
            </motion.div>
          </motion.div>

          {/* Interactive Letter-by-Letter Animated Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight select-none"
          >
            {renderInteractiveText('Ideas Engineered', false, 'hero-p1')}{' '}
            {renderInteractiveText('Into Reality', true, 'hero-p2')}
          </motion.h1>

          {/* Animated Subtitle with Interactive Keyword Highlights */}
          <motion.p 
            variants={itemVariants}
            className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto"
          >
            AWIE builds practical technology across{' '}
            <span className="text-slate-800 font-semibold hover:text-[#2563EB] transition-colors duration-200 cursor-default">software</span>,{' '}
            <span className="text-slate-800 font-semibold hover:text-[#2563EB] transition-colors duration-200 cursor-default">electronics</span>,{' '}
            <span className="text-slate-800 font-semibold hover:text-[#2563EB] transition-colors duration-200 cursor-default">IoT</span>, and{' '}
            <span className="text-slate-800 font-semibold hover:text-[#2563EB] transition-colors duration-200 cursor-default">digital systems</span>{' '}
            — turning ideas into reliable solutions designed around the needs of each project.
          </motion.p>
        </motion.div>

        {/* 3D Interactive Visual Showcase with Orbiting Energy Rings & Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 15, delay: 0.3 }}
          className="max-w-xl mx-auto relative perspective-1000 group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated Background Energy Aura */}
          <motion.div 
            animate={{
              scale: isHovered ? 1.15 : [1, 1.08, 1],
              opacity: isHovered ? 0.8 : [0.4, 0.6, 0.4]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-sky-400/25 to-indigo-500/20 rounded-3xl blur-2xl pointer-events-none transition-all duration-500" 
          />
          
          {/* Rotating Outer Dashed Circuit Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-6 m-auto rounded-full border border-dashed border-blue-400/25 pointer-events-none hidden sm:block"
          />

          {/* Rotating Inner Orbit with Glowing Satellite Node */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-10 m-auto rounded-full border border-blue-500/15 pointer-events-none hidden sm:block"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] shadow-[0_0_12px_#2563EB] absolute -top-1 left-1/2 -translate-x-1/2 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8] absolute -bottom-1 left-1/2 -translate-x-1/2" />
          </motion.div>

          {/* Main 3D Tilted Card with Glass Shimmer & Depth */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            }}
            animate={{
              y: isHovered ? -6 : [0, -6, 0]
            }}
            transition={{
              y: { duration: 4, repeat: isHovered ? 0 : Infinity, ease: 'easeInOut' }
            }}
            className="rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-2xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)] hover:border-[#2563EB]/70 transition-all duration-300 p-6 sm:p-8 text-center relative z-20"
          >
            {/* Dynamic Ambient Gradient Inside Card */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-b from-[#2563EB]/10 via-sky-400/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-[#2563EB]/25 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-t from-indigo-500/10 to-transparent rounded-full blur-xl pointer-events-none group-hover:from-indigo-500/20 transition-all duration-500" />

            {/* Diagonal Light Sheen / Glass Sweep Effect */}
            <motion.div
              initial={{ x: '-200%' }}
              animate={{ x: '200%' }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent skew-x-12 pointer-events-none z-30"
            />

            {/* Inner Graphic Container with Floating Depth */}
            <motion.div
              style={{ transform: 'translateZ(30px)' }}
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
              className="relative py-2"
            >
              {/* Subtle Pulsing Center Ring behind logo */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.25, 0.5, 0.25]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 m-auto w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-blue-400/20 to-sky-300/10 blur-xl pointer-events-none"
              />

              <Image
                src="/introbg.png"
                alt="AWIE engineering team working across software, electronics and IoT projects"
                width={380}
                height={280}
                className="w-full h-auto max-w-[280px] sm:max-w-[340px] mx-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)] group-hover:drop-shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-500"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Core Principles Section */}
        <div className="space-y-12 pt-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">
              <span>Core Principles</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How We Build & Engineer
            </h3>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {corePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div 
                  key={pillar.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="bg-white border border-slate-200 p-8 rounded-3xl space-y-6 shadow-sm relative overflow-hidden flex flex-col justify-between hover:bg-slate-950 hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-300 group cursor-default"
                >
                  {/* Subtle Background Glow on Hover */}
                  <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-b from-[#2563EB]/10 to-transparent ${pillar.glowColor} rounded-full blur-2xl pointer-events-none transition-all duration-300`} />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <motion.div 
                        whileHover={{ scale: 1.15, rotate: 6 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className={`p-3.5 rounded-xl ${pillar.badgeBg} border ${pillar.accent} ${pillar.hoverAccent} shadow-sm transition-all duration-300 w-fit`}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>
                      <span className="text-xs font-black font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-blue-400 group-hover:border group-hover:border-blue-900/60 transition-all duration-300">
                        {pillar.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-white transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-300">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Illustration Slot */}
                  <div className="pt-4 relative z-10">
                    <div className="w-full h-32 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:border-slate-800 flex items-center justify-center p-3 overflow-hidden transition-colors duration-300">
                      <Image
                        src={pillar.imgSrc}
                        alt={pillar.imgAlt}
                        width={200}
                        height={140}
                        className="w-auto h-full object-contain max-h-28 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* What We Build / Multi-Disciplinary Expertise */}
        <div className="space-y-12 pt-8 border-t border-slate-200">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">
              <span>What We Build</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Different Technologies. One Engineering Mindset.
            </h3>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            {domains.map((dom) => {
              const Icon = dom.icon;
              return (
                <motion.div
                  key={dom.id}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center gap-6 hover:bg-slate-950 hover:border-[#2563EB] hover:shadow-xl hover:shadow-[#2563EB]/20 transition-all duration-300 group cursor-default"
                >
                  {/* Scene Image Container on Left */}
                  <div className="w-full sm:w-1/3 relative z-10 shrink-0">
                    <div className="w-full h-32 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:border-slate-800 flex items-center justify-center p-2 overflow-hidden transition-colors duration-300">
                      <Image
                        src={dom.imgSrc}
                        alt={`${dom.title} Scene`}
                        width={160}
                        height={100}
                        className="w-auto h-full object-contain max-h-24 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Details on Right (visible on hover) */}
                  <div className="w-full sm:w-2/3 space-y-3 relative z-10 text-left">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] group-hover:bg-blue-950 group-hover:border-blue-700/60 group-hover:text-blue-400 transition-all duration-300 w-fit"
                      >
                        <Icon className="w-4 h-4" />
                      </motion.div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100/60 group-hover:bg-blue-950/80 group-hover:text-blue-300 group-hover:border-blue-800 transition-all duration-300">
                        {dom.tag}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-300">
                      {dom.title}
                    </h4>
                    
                    <div className="overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100">
                      <p className="text-xs text-slate-600 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-300 mt-2">
                        {dom.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA — Have an Idea? Let's Build It. */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          className="p-10 sm:p-14 rounded-3xl bg-white border border-slate-200 shadow-xl hover:bg-[#0B1528] hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/25 transition-all duration-500 group relative overflow-hidden"
        >
          {/* Animated Background Orbs */}
          <motion.div 
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.2, 0.45, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" 
          />
          <motion.div 
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
            className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-600/15 rounded-full blur-2xl pointer-events-none" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* CTA Text */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-white tracking-tight transition-colors duration-300">
                Have an Idea? Let's Build It.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-200 font-medium max-w-xl leading-relaxed transition-colors duration-300">
                Whether you need a web platform, mobile application, IoT solution, custom electronics, or something entirely different, AWIE can help turn your concept into a working product.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm transition-all shadow-lg shadow-[#2563EB]/25 w-full group/btn"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-slate-100 border border-slate-300 hover:border-[#2563EB] text-slate-800 font-bold text-sm transition-all hover:bg-slate-200 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-700 w-full group/btn2"
                  >
                    <span>Explore Products</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover/btn2:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* CTA Visual Scene */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-full max-w-xs h-40 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:border-slate-800 flex items-center justify-center p-4 overflow-hidden transition-colors duration-300"
              >
                <Image
                  src="/about/Have an Idea.png"
                  alt="AWIE Idea to Engineering to Working Product"
                  width={240}
                  height={160}
                  className="w-auto h-full object-contain max-h-36 group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
