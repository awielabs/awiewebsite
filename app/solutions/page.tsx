'use client';

import Link from 'next/link';
import { 
  Globe, 
  Smartphone, 
  Building2, 
  Cpu, 
  CircuitBoard, 
  Bot, 
  Server, 
  Layers, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function SolutionsPage() {
  const solutions = [
    {
      id: 'web',
      title: 'Web Applications',
      icon: Globe,
      tagline: 'Modern, fast, and scalable web software',
      description: 'High-performance web apps built with Next.js, React, and TypeScript. From SaaS products to enterprise web portals.',
      deliverables: ['Responsive Web Apps', 'SaaS Architectures', 'Custom Dashboards', 'API Integrations']
    },
    {
      id: 'mobile',
      title: 'Mobile Applications',
      icon: Smartphone,
      tagline: 'iOS & Android native-grade apps',
      description: 'Cross-platform mobile applications crafted with React Native / Flutter. Bluetooth device sync, push notifications, and offline caching.',
      deliverables: ['iOS & Android Apps', 'Bluetooth/BLE Sync', 'Real-time Push Alerts', 'App Store Deployment']
    },
    {
      id: 'business',
      title: 'Business Management Systems',
      icon: Building2,
      tagline: 'Tailored internal tools & operational automation',
      description: 'Custom management systems tailored to your business workflow: inventory tracking, CRM tools, order management, and operational analytics.',
      deliverables: ['Custom ERP/CRM Systems', 'Role-Based Access', 'Automated Workflows', 'PDF & Reporting Engines']
    },
    {
      id: 'iot',
      title: 'IoT & Automation',
      icon: Cpu,
      tagline: 'Connected hardware & sensor intelligence',
      description: 'End-to-end IoT solutions connecting physical microcontrollers with cloud analytics, real-time alerts, and remote device command.',
      deliverables: ['ESP32/Raspberry Pi Gateways', 'MQTT / WebSocket Pipelines', 'Remote Device Dashboards', 'Environmental Monitoring']
    },
    {
      id: 'embedded',
      title: 'Embedded Systems',
      icon: CircuitBoard,
      tagline: 'Firmware design & microcontroller logic',
      description: 'Bare-metal C/C++ and FreeRTOS firmware design for microcontrollers, sensor integration, low-power optimization, and bus protocols (I2C, SPI, UART).',
      deliverables: ['C/C++ & FreeRTOS Firmware', 'Sensor & Display Drivers', 'Low-Power Sleep Modes', 'Custom Protocol Stacks']
    },
    {
      id: 'ai',
      title: 'AI Integration',
      icon: Bot,
      tagline: 'Smart intelligent capabilities inside apps & hardware',
      description: 'Integrating LLM APIs, computer vision, voice interaction, and machine learning models directly into your web applications or embedded hardware.',
      deliverables: ['LLM & Chatbot APIs', 'Computer Vision Pipelines', 'Voice & Audio Triggers', 'Edge AI Micro-models']
    },
    {
      id: 'electronics',
      title: 'Custom Electronics',
      icon: Layers,
      tagline: 'Schematics, PCB layout, and physical prototypes',
      description: 'Turning circuit concepts into manufactured electronics. Component sourcing, schematic design, 2-layer to multi-layer PCB design, and hand soldering.',
      deliverables: ['Schematic Capture', 'PCB Layout & Gerber Files', 'BOM Sourcing', 'Working Prototype Assembly']
    },
    {
      id: 'backend',
      title: 'API & Backend Development',
      icon: Server,
      tagline: 'Robust database systems & microservices',
      description: 'Scalable backend architectures built on Supabase PostgreSQL, Node.js API routes, and cloud storage. Secure authentication and data integrity.',
      deliverables: ['PostgreSQL Relational DBs', 'REST & GraphQL APIs', 'Cookie/JWT Auth', 'Serverless Functions']
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-[#06B6D4]">
            <span>AWIE CUSTOM SOLUTIONS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
            Have an idea? <span className="text-[#3B82F6]">Let's build it.</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            From initial hardware schematics to deployed full-stack web and mobile systems, AWIE engineers practical solutions designed to scale.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-[#3B82F6]/50 transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-[#3B82F6]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                      <span className="text-xs text-[#06B6D4] font-medium">{item.tagline}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800/80">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Deliverables</span>
                  <div className="grid grid-cols-2 gap-2">
                    {item.deliverables.map((deliv) => (
                      <div key={deliv} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 border border-[#3B82F6]/40 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Ready to start your project?</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Share your requirements, budget, and timeline with our engineering team for a customized proposal.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2563EB] text-white font-semibold text-sm hover:bg-[#1D4ED8] transition-all shadow-lg shadow-[#2563EB]/30 hover:scale-[1.02]"
            >
              <span>Tell us what you're building →</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
