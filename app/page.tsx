'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Smartphone, 
  Globe, 
  Cpu, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  CircuitBoard, 
  GraduationCap, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function Home() {
  const whatWeDoCards = [
    {
      title: 'Apps',
      category: 'Mobile & Digital',
      description: 'Mobile applications and digital experiences crafted for performance, scalability, and intuitive UX.',
      icon: Smartphone,
      gradient: 'from-[#2563EB]/10 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#2563EB]',
      badge: 'iOS & Android'
    },
    {
      title: 'Web',
      category: 'Websites & Systems',
      description: 'Websites, web applications, and enterprise business systems engineered for reliability.',
      icon: Globe,
      gradient: 'from-[#0284C7]/10 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#0284C7]',
      badge: 'Full-Stack'
    },
    {
      title: 'IoT',
      category: 'Connected Devices',
      description: 'Connected devices, environmental monitoring, smart automation, and real-time sensor pipelines.',
      icon: Cpu,
      gradient: 'from-[#2563EB]/10 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#2563EB]',
      badge: 'Hardware Sync'
    },
    {
      title: 'Electronics',
      category: 'Embedded Engineering',
      description: 'Embedded systems, custom PCB prototypes, hardware kits, and turnkey electronics solutions.',
      icon: CircuitBoard,
      gradient: 'from-[#6366F1]/10 to-transparent',
      borderColor: 'border-slate-200 hover:border-[#6366F1]',
      badge: 'Microcontrollers'
    }
  ];

  const gemBuddyFeatures = [
    'OLED Display Face',
    'ESP32 Microcontroller',
    'Touch Interaction',
    'Rechargeable Battery',
    'Wi-Fi Connectivity',
    'Dynamic LED Moods'
  ];

  const solutionsList = [
    { title: 'Web Applications', desc: 'Custom SaaS, web portals, and fast responsive web platforms.' },
    { title: 'Mobile Applications', desc: 'Cross-platform mobile apps for iOS and Android built with React Native/Flutter.' },
    { title: 'Business Management Systems', desc: 'Custom internal tools, inventory tracking, dashboards, and automated workflows.' },
    { title: 'IoT & Automation', desc: 'Smart hardware integrations, sensor monitoring, and remote micro-controller control.' },
    { title: 'Embedded Systems', desc: 'ESP32, STM32, ARM firmware architecture, custom sensors, and real-time OS.' },
    { title: 'AI Integration', desc: 'Integrating LLMs, computer vision, and machine learning models into client hardware/web.' },
    { title: 'Custom Electronics', desc: 'Schematic design, PCB layout design, component selection, and prototype assembly.' },
    { title: 'API & Backend Development', desc: 'Secure REST/GraphQL APIs, relational database design, and cloud deployments.' }
  ];

  const projectCases = [
    {
      title: 'GEM Buddy v1',
      badge: 'Hardware + Embedded',
      problem: 'Desktop companion devices lack personality, physical interaction, and ambient mood sync.',
      tech: 'ESP32 • OLED • Touch Sensors • RGB LEDs • Custom Firmware',
      built: 'Autonomous desktop companion with expressive face animations, lamp controls, and smart app sync.',
      result: 'Fully operational physical prototype — Pre-booking open soon.'
    },
    {
      title: 'LAC-R',
      badge: 'Robotics + IoT',
      problem: 'Industrial monitoring rovers require robust wireless telemetry in hostile local environments.',
      tech: 'ESP32-CAM • Telemetry Sensors • Motor Controllers • Web Socket Gateway',
      built: 'Rugged robotic platform with live video stream, sensor telemetry, and obstacle avoidance.',
      result: 'Real-time telemetry streaming at <100ms latency with multi-sensor feedback.'
    },
    {
      title: 'Arcular+',
      badge: 'Healthcare Application',
      problem: 'Medical practitioners need centralized patient parameter monitoring with instant alerts.',
      tech: 'Next.js • TypeScript • Supabase PostgreSQL • WebSockets • Tailwind CSS',
      built: 'Healthcare web platform with real-time patient status dashboards, data visualization, and role access.',
      result: 'Deployed system handling live patient state tracking with audit logging.'
    },
    {
      title: 'IoT Rover',
      badge: 'ESP32 + Sensors + Automation',
      problem: 'Autonomous micro-rovers need reliable wireless control and environmental sampling.',
      tech: 'ESP32 • Ultrasonic • DHT22 Temp/Humidity • Custom Android App',
      built: 'Micro-rover platform equipped with obstacle mapping, Bluetooth/Wi-Fi remote mode, and app control.',
      result: 'Successfully demonstrated autonomous obstacle navigation and telemetry data logging.'
    }
  ];

  const studentMentorshipPerks = [
    'Project Guidance & Topic Validation',
    'System Architecture Planning',
    'Hardware Component Selection',
    'Software Coding Assistance & Code Reviews',
    'Circuit Debugging & Hardware Troubleshooting',
    'IoT Prototyping & Sensor Calibration',
    'Project Documentation & Report Guidance',
    'System Testing & Performance Tuning',
    'Viva Preparation & Technical Q&A Coaching'
  ];

  return (
    <div className="relative pt-24 bg-white text-slate-800 overflow-hidden">
      {/* Light Circuit Grid Background Pattern */}
      <div className="bg-grid-pattern opacity-80" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-12">
        {/* Subtle Ambient Backlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#2563EB]/10 via-[#0284C7]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Main Hero Header: Official Logobg Brand Logo */}
          <div className="space-y-4 flex flex-col items-center">
            
            {/* Prominent Official Logobg Emblem Display */}
            <div className="relative py-2 flex justify-center">
              <Image
                src="/logobg.png"
                alt="AWIE Brand Emblem Logo"
                width={560}
                height={360}
                className="w-auto h-40 sm:h-52 md:h-64 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <p className="text-2xl sm:text-4xl font-black text-[#2563EB] tracking-tight">
              Ideas Engineered Into Reality.
            </p>
            
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-semibold leading-relaxed pt-1">
              Building practical technology solutions across <span className="text-slate-900 font-extrabold">APPS • WEB • IoT • ELECTRONICS</span>
            </p>
          </div>

          {/* Official Banner Image Display */}
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-200 shadow-xl group transition-all duration-300 hover:border-[#2563EB] bg-white mt-4">
            <Image
              src="/banner.png"
              alt="AWIE Banner - Apps, Web, IoT, Electronics"
              width={1200}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2563EB] text-white font-bold text-base transition-all hover:bg-[#1D4ED8] shadow-lg shadow-[#2563EB]/25 hover:scale-[1.02] w-full sm:w-auto"
            >
              <span>Explore Solutions</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-slate-100 border border-slate-300 hover:border-[#2563EB] text-slate-800 font-bold text-base transition-all hover:bg-slate-200 w-full sm:w-auto"
            >
              <span>View Our Work</span>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* What AWIE Does Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">Core Engineering Domains</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">What AWIE Does</p>
          <p className="text-slate-600 text-sm font-medium">Four focused pillars of modern digital and hardware engineering.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatWeDoCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`p-6 rounded-2xl bg-white border ${card.borderColor} shadow-sm relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-b ${card.gradient} rounded-full blur-2xl pointer-events-none`} />
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {card.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-1">{card.title}</h3>
                    <span className="text-xs text-[#2563EB] font-bold">{card.category}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{card.description}</p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors">
                  <span>Learn details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section: GEM Buddy */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl relative overflow-hidden">
          {/* Glow Backdrop */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-bold text-[#2563EB]">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>LAUNCHING SOON — PRE-BOOKING OPEN SOON</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                GEM v1
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                An autonomous desktop companion built on ESP32 micro-controller architecture. Features touch interactions, OLED expressive faces, smart lamp control, dynamic mood LED sync, and companion mobile app support.
              </p>

              {/* Feature Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {gemBuddyFeatures.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/products/gem-buddy"
                  className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-all shadow-md shadow-[#2563EB]/20 flex items-center gap-2"
                >
                  <span>Explore GEM Buddy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact?interest=Pre-Booking+GEM+Buddy"
                  className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-[#2563EB] text-slate-800 font-bold text-xs transition-all flex items-center gap-2"
                >
                  <span>Register Pre-Booking</span>
                </Link>
              </div>
            </div>

            {/* Right Product Image Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-sm w-full space-y-4 text-center">
                <div className="w-full h-56 rounded-2xl bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
                  <Image
                    src="/logo.jpeg"
                    alt="GEM Buddy Product Visual"
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-[10px] font-mono text-emerald-400 border border-slate-800">
                    ESP32 ACTIVE • OLED READY
                  </div>
                </div>
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-extrabold text-[#2563EB] tracking-wider uppercase block">PHYSICAL HARDWARE PROTOTYPE</span>
                  <h3 className="text-lg font-black text-slate-900">GEM Desktop Companion</h3>
                  <p className="text-xs text-slate-500 font-medium">Standard Edition & Biometric Pro Edition coming soon.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Overview Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">End-to-End Capabilities</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">Tailored Digital & Hardware Solutions</p>
          <p className="text-slate-600 text-sm font-medium">From individual custom software applications to complex multi-layered IoT hardware architecture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutionsList.map((item, idx) => (
            <div key={item.title} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#2563EB] shadow-sm hover:shadow-lg transition-all space-y-3 group">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-mono font-bold text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                0{idx + 1}
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-[#2563EB] text-white font-bold text-xs transition-all shadow-md"
          >
            <span>View Complete Solutions Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Projects Proof Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">Proven Track Record</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">Featured Engineering Projects</p>
            <p className="text-slate-600 text-sm font-medium">Real-world case studies demonstrating our technical problem solving across hardware and web.</p>
          </div>
          <Link
            href="/projects"
            className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-300 hover:border-[#2563EB] text-slate-800 text-xs font-bold transition-all shrink-0"
          >
            View All Projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectCases.map((proj) => (
            <div key={proj.title} className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#2563EB] shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    {proj.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">{proj.title}</h3>
                
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-extrabold text-slate-900 block">Problem Addressed:</span>
                    <span className="text-slate-600 font-medium">{proj.problem}</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">Technology Stack:</span>
                    <span className="text-slate-700 font-mono font-bold">{proj.tech}</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">What Was Built:</span>
                    <span className="text-slate-600 font-medium">{proj.built}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Result: {proj.result}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Mentorship Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-slate-50 border border-slate-200 shadow-xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 text-xs font-bold text-[#2563EB]">
                <GraduationCap className="w-4 h-4" />
                <span>STUDENT MENTORSHIP & TECHNICAL GUIDANCE</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Academic & Final Year Project Guidance
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                We empower computer science, electronics, and engineering students to turn ambitious project concepts into fully functional, high-scoring final year capstones.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
                {studentMentorshipPerks.map((perk) => (
                  <div key={perk} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-extrabold text-[#2563EB] uppercase">Ready for Project Coaching?</span>
              <h3 className="text-lg font-black text-slate-900">Get Expert Guidance</h3>
              <p className="text-xs text-slate-500 font-medium">Submit your project idea or request topic recommendations.</p>
              
              <Link
                href="/students"
                className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs transition-all shadow-md shadow-[#2563EB]/25"
              >
                Explore Student Mentorship
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Final Bottom Call-to-Action */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-6 relative z-10 border-t border-slate-200">
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Ready to Build Your Next Solution?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium">
          Whether you need a custom web platform, a mobile application, IoT micro-controller firmware, or genuine electronics hardware components — AWIE is ready.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#2563EB]/25 flex items-center gap-2"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/store"
            className="px-8 py-3.5 rounded-xl bg-slate-100 border border-slate-300 hover:border-[#2563EB] text-slate-800 font-extrabold text-sm transition-all"
          >
            <span>Visit Electronics Store</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
