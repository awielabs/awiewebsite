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
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-16">
        {/* Subtle Ambient Backlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#2563EB]/10 via-[#0284C7]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          
          {/* Official Brand Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 shadow-sm text-xs font-bold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="text-[#2563EB] font-bold">AWIE ENGINEERING</span>
            <span className="text-slate-400">•</span>
            <span>INNOVATE • BUILD • CONNECT</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-tight">
              AWIE
            </h1>
            <p className="text-2xl sm:text-4xl font-black text-[#2563EB] tracking-tight">
              Ideas Engineered Into Reality.
            </p>
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-semibold leading-relaxed pt-2">
              Building practical technology solutions across <span className="text-slate-900 font-extrabold">APPS • WEB • IoT • ELECTRONICS</span>
            </p>
          </div>

          {/* Official Banner Image Display */}
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-200 shadow-xl group transition-all duration-300 hover:border-[#2563EB] bg-white">
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
              <p className="text-[#2563EB] text-lg font-bold">
                Your Smart Buddy • Own-Made Hardware Product
              </p>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
                WE ARE LAUNCHING OUR OWN-MADE PRODUCT! An intelligent physical companion designed for your desk featuring responsive face animations, ambient mood control, hardware touch sensors, and low-latency Wi-Fi app sync.
              </p>

              {/* Feature Tags */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {gemBuddyFeatures.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Link
                  href="/products/gem-buddy"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#2563EB] text-white font-bold text-sm transition-all hover:bg-[#1D4ED8] shadow-md shadow-[#2563EB]/20 hover:scale-[1.02]"
                >
                  <span>Explore GEM v1 Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Product Banner Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-xs rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white group hover:border-[#2563EB] transition-all">
                <Image
                  src="/gem-banner.png"
                  alt="AWIE GEM v1 Launch Banner"
                  width={400}
                  height={700}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Under Banner */}
          <div className="mt-10 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs font-bold text-slate-500 tracking-wide">
              More AWIE products are in active development.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">Custom Engineering Services</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">Have an idea? Let's build it.</p>
          <p className="text-slate-600 text-sm font-medium">Tailored engineering services from concept to production software and hardware.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutionsList.map((sol) => (
            <div
              key={sol.title}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#2563EB] shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors">{sol.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{sol.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm hover:scale-[1.02] transition-all shadow-lg shadow-[#2563EB]/20"
          >
            <span>Tell us what you're building</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">Proven Track Record</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">Our Projects & Proof</p>
          <p className="text-slate-600 text-sm font-medium">Real technical challenges solved across hardware, software, and robotics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectCases.map((proj) => (
            <div
              key={proj.title}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-6 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-extrabold text-slate-900">{proj.title}</h3>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                    {proj.badge}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-bold block mb-0.5">Problem:</span>
                    <p className="text-slate-700 bg-white p-3 rounded-lg border border-slate-200">{proj.problem}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block mb-0.5">Technology:</span>
                    <p className="text-[#2563EB] font-mono font-bold bg-white p-3 rounded-lg border border-slate-200">{proj.tech}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block mb-0.5">What Was Built:</span>
                    <p className="text-slate-700 bg-white p-3 rounded-lg border border-slate-200">{proj.built}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block mb-0.5">Result:</span>
                    <p className="text-emerald-700 font-semibold bg-emerald-50 p-3 rounded-lg border border-emerald-200">{proj.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Mentorship Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 space-y-8 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/20 text-xs font-bold text-[#2563EB]">
              <GraduationCap className="w-4 h-4" />
              <span>STUDENT PROJECT MENTORSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
              Build. Learn. Understand.
            </h2>
            <p className="text-lg text-slate-700 font-semibold">
              Have a college project idea but don't know where to start?
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Important: AWIE provides mentorship, technical guidance, architecture planning, debugging, and prototyping — we help you build, learn, and understand your project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentMentorshipPerks.map((perk) => (
              <div key={perk} className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/students"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2563EB] text-white font-bold text-sm transition-all hover:bg-[#1D4ED8] shadow-md shadow-[#2563EB]/20 hover:scale-[1.02]"
            >
              <span>Get Project Guidance</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
