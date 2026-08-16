'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Cpu, Globe, Smartphone, ShieldCheck } from 'lucide-react';

export default function ProjectsPage() {
  const projectsList = [
    {
      title: 'GEM Buddy',
      badge: 'Hardware + Embedded',
      problem: 'Desktop companion devices lack personality, physical touch interaction, and ambient lighting mood sync.',
      tech: 'ESP32 • OLED (128x64) • Touch Sensors • RGB LEDs • Custom C++ Firmware',
      built: 'Autonomous desktop companion with expressive face animations, capacitive touch reactions, lamp controls, and smart app sync.',
      result: 'Fully operational physical prototype running custom low-latency firmware with OTA capability.'
    },
    {
      title: 'LAC-R',
      badge: 'Robotics + IoT',
      problem: 'Industrial inspection rovers require robust wireless telemetry and real-time obstacle data in hazardous environments.',
      tech: 'ESP32-CAM • Telemetry Sensors • Motor Drivers • WebSocket Gateway',
      built: 'Rugged robotic platform with low-latency live video streaming, sensor telemetry, and remote control interface.',
      result: 'Real-time telemetry streaming at <100ms latency with multi-sensor feedback.'
    },
    {
      title: 'Arcular+',
      badge: 'Healthcare Application',
      problem: 'Medical practitioners need centralized patient parameter monitoring with instant alerts and audit trails.',
      tech: 'Next.js • TypeScript • Supabase PostgreSQL • WebSockets • Tailwind CSS',
      built: 'Healthcare web platform with real-time patient status dashboards, data visualization, and secure role-based access.',
      result: 'Deployed system handling live patient state tracking with full security compliance.'
    },
    {
      title: 'IoT Rover',
      badge: 'ESP32 + Sensors + Automation',
      problem: 'Autonomous micro-rovers need reliable wireless control, environmental sampling, and collision avoidance.',
      tech: 'ESP32 • Ultrasonic Sensors • DHT22 Sensor • Custom Android App',
      built: 'Micro-rover platform equipped with obstacle mapping, dual Bluetooth/Wi-Fi remote mode, and live app telemetry.',
      result: 'Successfully demonstrated autonomous obstacle navigation and live environmental logging.'
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#06B6D4]">
            <span>AWIE PORTFOLIO & PROOF</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
            Projects <span className="text-[#3B82F6]">& Real Work</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Instead of empty claims, we show actual engineering work. Here is how we turn technical challenges into functional physical and digital systems.
          </p>
        </div>

        {/* Project Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsList.map((proj) => (
            <div
              key={proj.title}
              className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h2 className="text-2xl font-bold text-white">{proj.title}</h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-[#06B6D4] border border-slate-700">
                    {proj.badge}
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">Problem Statement</span>
                    <p className="text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">{proj.problem}</p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">Technology Stack</span>
                    <p className="text-[#3B82F6] font-mono bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">{proj.tech}</p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">What Was Built</span>
                    <p className="text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">{proj.built}</p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">Result & Impact</span>
                    <p className="text-emerald-400 font-medium bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-900/40 leading-relaxed">{proj.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-10 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
          <h2 className="text-2xl font-bold text-white">Have a similar project requirement?</h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Whether you need custom hardware prototyping or full-stack software development, our engineers can help build your solution.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2563EB] text-white font-semibold text-sm hover:bg-[#1D4ED8] transition-all shadow-lg shadow-[#2563EB]/25"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
