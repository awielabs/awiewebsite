'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Globe,
  Smartphone,
  Cpu,
  CircuitBoard,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  AlertCircle,
  Clock,
  Coins,
  ShieldCheck,
  Send,
  RotateCcw,
  MessageSquare,
  User,
  Mail,
  Phone,
  Layers,
  Sliders,
  Terminal,
  Bot
} from 'lucide-react';

export interface ServiceProposalWizardProps {
  onTypingChange: (isTyping: boolean) => void;
  onKeystroke: () => void;
}

// 1. Categories aligned with AWIE Website Pillars
export const SERVICE_CATEGORIES = [
  {
    id: 'web',
    title: 'Web Platforms & Systems',
    shortLabel: 'Web Platform',
    badge: 'Full-Stack & SaaS',
    description: 'High-performance websites, SaaS applications, dashboards & REST APIs.',
    icon: Globe,
    accent: '#2563EB',
    tag: 'Web Development',
  },
  {
    id: 'mobile',
    title: 'Mobile Applications',
    shortLabel: 'Mobile App',
    badge: 'iOS & Android',
    description: 'Cross-platform Flutter / React Native apps with offline sync & BLE companion support.',
    icon: Smartphone,
    accent: '#0284C7',
    tag: 'Mobile App',
  },
  {
    id: 'iot',
    title: 'IoT & Connected Hardware',
    shortLabel: 'IoT System',
    badge: 'ESP32 & Sensors',
    description: 'Connected microcontrollers, MQTT telemetry, sensor networks & remote automation.',
    icon: Cpu,
    accent: '#2563EB',
    tag: 'IoT',
  },
  {
    id: 'electronics',
    title: 'Electronics & PCB Design',
    shortLabel: 'PCB & Hardware',
    badge: 'Embedded & KiCad',
    description: 'Custom schematic design, multi-layer PCB layout, STM32/ESP32 firmware & prototyping.',
    icon: CircuitBoard,
    accent: '#6366F1',
    tag: 'Electronics',
  },
  {
    id: 'students',
    title: 'Student Project Guidance',
    shortLabel: 'Student Capstone',
    badge: 'College & Viva Prep',
    description: 'Final-year engineering projects, hardware-software integration, circuit debugging & reports.',
    icon: GraduationCap,
    accent: '#10B981',
    tag: 'Student Project Guidance',
  },
  {
    id: 'ai-software',
    title: 'AI Integration & Custom Software',
    shortLabel: 'AI & Custom',
    badge: 'AI & Automation',
    description: 'AI/LLM workflow integration, cloud APIs, custom business systems & ongoing maintenance.',
    icon: Bot,
    accent: '#8B5CF6',
    tag: 'Custom Software',
  },
];

// Dynamic questions according to selected category
const DYNAMIC_SCOPE_CONFIG: Record<
  string,
  {
    question: string;
    subtitle: string;
    typeTitle: string;
    types: { id: string; label: string; desc: string }[];
    featuresTitle: string;
    features: string[];
    quickPills: string[];
  }
> = {
  web: {
    question: 'What kind of web platform are you planning?',
    subtitle: 'Select the architecture that closest matches your goals.',
    typeTitle: 'Platform Architecture',
    types: [
      { id: 'saas', label: 'SaaS Platform', desc: 'Subscription web product with user tiers' },
      { id: 'portal', label: 'Customer / Business Portal', desc: 'Client account management & internal workflows' },
      { id: 'store', label: 'E-Commerce Platform', desc: 'Product catalog, carts, inventory & payment checkout' },
      { id: 'dashboard', label: 'Admin & Analytics Dashboard', desc: 'Real-time telemetry, charts & data visualization' },
      { id: 'corporate', label: 'Corporate / Showcase Site', desc: 'High-conversion interactive marketing platform' },
      { id: 'custom-web', label: 'Custom Web System', desc: 'Bespoke full-stack web engineering' },
    ],
    featuresTitle: 'Key System Requirements',
    features: [
      'User Authentication & Roles',
      'PostgreSQL / Supabase Database',
      'Razorpay / Stripe Payments',
      'Real-time WebSockets / Telemetry',
      'Admin Content Management (CMS)',
      'AI / LLM Integration',
      'REST / GraphQL API Endpoints',
    ],
    quickPills: [
      '+ Needs Admin Dashboard',
      '+ Supabase Backend',
      '+ User Role Management',
      '+ Payment Gateway Integration',
      '+ Mobile-Responsive UI',
    ],
  },
  mobile: {
    question: 'What type of mobile application do you need?',
    subtitle: 'Choose your target operating systems and primary architecture.',
    typeTitle: 'Target Platforms',
    types: [
      { id: 'cross', label: 'Cross-Platform (iOS & Android)', desc: 'Single unified codebase via Flutter / React Native' },
      { id: 'ios-only', label: 'iOS Exclusive', desc: 'Optimized specifically for Apple iPhones & iPads' },
      { id: 'android-only', label: 'Android Exclusive', desc: 'Optimized for Android smartphones & custom tablets' },
      { id: 'companion', label: 'Hardware Companion App', desc: 'App designed to control an IoT device via BLE or Wi-Fi' },
    ],
    featuresTitle: 'Mobile Capabilities Needed',
    features: [
      'Bluetooth BLE Device Pairing',
      'Push Notifications (FCM / APNs)',
      'Offline-First Local Storage',
      'Realtime Cloud Sync',
      'GPS & Location Tracking',
      'In-App Payments / Subscriptions',
      'Biometric / Fingerprint Login',
    ],
    quickPills: [
      '+ Bluetooth BLE Pairing',
      '+ Flutter Cross-Platform',
      '+ Push Notifications',
      '+ Offline Sync Mode',
      '+ Modern Gesture Animations',
    ],
  },
  iot: {
    question: 'What is the focus of your connected IoT system?',
    subtitle: 'Select the primary telemetry and automation framework.',
    typeTitle: 'Application Domain',
    types: [
      { id: 'monitoring', label: 'Environmental & Sensor Telemetry', desc: 'Continuous logging of temperature, gas, moisture, power' },
      { id: 'automation', label: 'Smart Automation & Relays', desc: 'Remote actuator control, timers & automatic triggers' },
      { id: 'tracking', label: 'Asset & GPS Fleet Tracking', desc: 'Real-time location, motion & boundary alarms' },
      { id: 'industrial', label: 'Industrial Machine Monitoring', desc: 'Vibration, current sensing & predictive telemetry' },
      { id: 'custom-iot', label: 'Custom Embedded IoT', desc: 'Custom hardware-software connected solution' },
    ],
    featuresTitle: 'Connectivity & Protocols',
    features: [
      'Wi-Fi (HTTP / WebSockets)',
      'MQTT Broker Cloud Integration',
      'Bluetooth Low Energy (BLE)',
      'ESP-NOW Local Mesh',
      'LoRa Long-Range Wireless',
      'Cellular 4G / LTE-M Telemetry',
      'Battery / Solar Power Circuit',
    ],
    quickPills: [
      '+ ESP32 Architecture',
      '+ MQTT Cloud Broker',
      '+ Live Dashboard Telemetry',
      '+ Battery Powered / Low Sleep',
      '+ LoRa Long-Range',
    ],
  },
  electronics: {
    question: 'What electronic engineering deliverables do you require?',
    subtitle: 'From KiCad schematic design to physical prototype PCB assembly.',
    typeTitle: 'Primary Focus',
    types: [
      { id: 'turnkey-pcb', label: 'Complete Turnkey PCB', desc: 'Schematic + Multi-layer layout + Component assembly' },
      { id: 'schematic-only', label: 'Schematic & Architecture', desc: 'Component selection, power calculations & pinout design' },
      { id: 'firmware', label: 'Embedded Firmware (C/C++)', desc: 'Bare-metal or FreeRTOS drivers & hardware control' },
      { id: 'revamp', label: 'Circuit Debugging & Redesign', desc: 'Fixing noise, trace routing, power drops or heat issues' },
    ],
    featuresTitle: 'Technical Scope',
    features: [
      'Multi-Layer SMD Layout (KiCad)',
      'Microcontroller (STM32 / ESP32)',
      'Motor & Power Drive Circuitry',
      'Precision Sensor Interfacing (I2C/SPI)',
      'Li-ion BMS & Battery Charging',
      'Firmware in C/C++ / MicroPython',
      'BOM Component Optimization',
    ],
    quickPills: [
      '+ KiCad PCB Design',
      '+ STM32 / ARM Cortex',
      '+ Compact SMD Layout',
      '+ Power Management & BMS',
      '+ Prototype Testing & Debugging',
    ],
  },
  students: {
    question: 'What is your college project domain and requirement?',
    subtitle: 'Tailored guidance for engineering students (B.Tech, Diploma, MCA).',
    typeTitle: 'Project Scope',
    types: [
      { id: 'full-project', label: 'Full Hardware + Software Prototype', desc: 'Complete working model with app/web telemetry & circuit' },
      { id: 'circuit-guidance', label: 'Circuit & Hardware Guidance', desc: 'Component selection, breadboarding & PCB soldering guidance' },
      { id: 'software-guidance', label: 'Coding & Firmware Mentoring', desc: 'Arduino/ESP32 code, Web dashboard or Mobile app assistance' },
      { id: 'debugging-troubleshoot', label: 'Debugging & Issue Resolution', desc: 'Fixing non-working circuits, sensor noise, or code errors' },
      { id: 'documentation-viva', label: 'Report & Viva Defense Coaching', desc: 'Block diagrams, circuit explanation, flowchart & mock questions' },
    ],
    featuresTitle: 'Academic Level',
    features: [
      'Final Year B.Tech / B.E.',
      'Diploma / Polytechnic Project',
      'M.Tech / Research Prototype',
      'BCA / MCA Project',
      'Mini Project (Semester 5/6)',
    ],
    quickPills: [
      '+ Final Year B.Tech Project',
      '+ Hardware + Web Dashboard',
      '+ IoT Cloud Integration',
      '+ Need Circuit Debugging',
      '+ Need Viva & Report Mentoring',
    ],
  },
  'ai-software': {
    question: 'What type of software or AI integration do you require?',
    subtitle: 'Custom APIs, automation pipelines, and intelligent workflows.',
    typeTitle: 'Service Domain',
    types: [
      { id: 'ai-llm', label: 'Generative AI & LLM Integration', desc: 'Custom OpenAI, Anthropic, or Gemini automated workflows' },
      { id: 'automation-api', label: 'API Integration & Workflow Automation', desc: 'Connecting databases, third-party services & webhooks' },
      { id: 'internal-tools', label: 'Custom Business Software', desc: 'Tailored management system, inventory, or workflow engine' },
      { id: 'code-modernization', label: 'Code Refactoring & Optimization', desc: 'Upgrading legacy codebases, fixing bottlenecks, performance tuning' },
    ],
    featuresTitle: 'Key Architecture Goals',
    features: [
      'LLM API Integration (Gemini/OpenAI)',
      'Cloud Serverless / Containerized',
      'Secure Token Auth & Rate Limiting',
      'Automated Background Workers',
      'PostgreSQL / Supabase Optimization',
      'Data Migration & Pipeline Setup',
    ],
    quickPills: [
      '+ Gemini / LLM API Integration',
      '+ Automated Workflow Pipeline',
      '+ Cloud Backend Architecture',
      '+ Code Performance Optimization',
      '+ Ongoing Technical Maintenance',
    ],
  },
};

const STAGE_OPTIONS = [
  {
    id: 'scratch',
    title: 'Idea & Concept Stage',
    desc: 'Starting from scratch; need architecture, planning, and end-to-end development.',
    icon: Sparkles,
  },
  {
    id: 'designs',
    title: 'Designs / Wireframes Ready',
    desc: 'Have UI/UX in Figma, sketches, pinout diagrams, or clear specifications.',
    icon: Layers,
  },
  {
    id: 'prototype',
    title: 'Working Prototype / MVP Built',
    desc: 'Have a preliminary prototype or breadboard that needs a professional production build.',
    icon: Terminal,
  },
  {
    id: 'refine',
    title: 'Existing Codebase / Device',
    desc: 'Have an existing app or hardware unit that needs debugging, refinement, or scaling.',
    icon: Sliders,
  },
];

const TIMELINE_OPTIONS = [
  { id: 'urgent', label: 'Urgent (< 2 Weeks)', desc: 'Fast-track sprint delivery' },
  { id: 'month', label: 'Within 1 Month', desc: 'Standard development timeline' },
  { id: 'quarter', label: '2 to 3 Months', desc: 'Comprehensive full-scale solution' },
  { id: 'flexible', label: 'Flexible / Research', desc: 'Milestone-based or research phase' },
];

const BUDGET_OPTIONS = [
  { id: 'student', label: 'Academic / Student Tier', desc: 'Budget-conscious student engineering rates' },
  { id: 'mvp', label: 'Small Business / MVP Tier', desc: 'Cost-effective commercial launch build' },
  { id: 'growth', label: 'Full Scale / Enterprise Tier', desc: 'Robust production architecture & maintenance' },
  { id: 'custom', label: 'Open to Discussion', desc: 'Needs technical scope evaluation first' },
];

export default function ServiceProposalWizard({
  onTypingChange,
  onKeystroke,
}: ServiceProposalWizardProps) {
  const searchParams = useSearchParams();

  // Mode: Proposal Wizard vs Quick Message
  const [mode, setMode] = useState<'wizard' | 'quick'>('wizard');

  // Multi-step index (1 to 5)
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [selectedCategory, setSelectedCategory] = useState('web');
  const [scopeType, setScopeType] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedStage, setSelectedStage] = useState('scratch');
  const [timeline, setTimeline] = useState('month');
  const [budgetTier, setBudgetTier] = useState('mvp');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Contact Details
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'email' | 'phone'>('whatsapp');

  // Legal & Consent Checkboxes
  const [dataProcessingConsent, setDataProcessingConsent] = useState(false);
  const [communicationConsent, setCommunicationConsent] = useState(true);

  // Quick Message Form State
  const [quickForm, setQuickForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });

  // Submission Status
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionSummary, setSubmissionSummary] = useState<{
    name: string;
    email: string;
    phone?: string;
    service: string;
    scope?: string;
    timeline?: string;
    stage?: string;
    preferredContact?: string;
    message?: string;
  } | null>(null);

  // Auto-detect incoming ?interest= param from URL
  useEffect(() => {
    const interest = searchParams.get('interest');
    if (!interest) return;

    const lower = interest.toLowerCase();
    if (lower.includes('student')) {
      setSelectedCategory('students');
      setBudgetTier('student');
    } else if (lower.includes('mobile') || lower.includes('app')) {
      setSelectedCategory('mobile');
    } else if (lower.includes('iot')) {
      setSelectedCategory('iot');
    } else if (lower.includes('electron') || lower.includes('pcb') || lower.includes('circuit')) {
      setSelectedCategory('electronics');
    } else if (lower.includes('ai') || lower.includes('software')) {
      setSelectedCategory('ai-software');
    } else if (lower.includes('web')) {
      setSelectedCategory('web');
    }
  }, [searchParams]);

  // Set default scope type whenever category changes
  useEffect(() => {
    const config = DYNAMIC_SCOPE_CONFIG[selectedCategory];
    if (config && config.types.length > 0) {
      setScopeType(config.types[0].id);
      setSelectedFeatures([]);
    }
  }, [selectedCategory]);

  const handleInputFocus = useCallback(() => onTypingChange(true), [onTypingChange]);
  const handleInputBlur = useCallback(() => onTypingChange(false), [onTypingChange]);

  const toggleFeature = (feature: string) => {
    onKeystroke();
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const addQuickPillToNotes = (pill: string) => {
    onKeystroke();
    const cleanTag = pill.replace(/^\+\s*/, '');
    setAdditionalNotes((prev) => {
      if (prev.includes(cleanTag)) return prev;
      return prev ? `${prev}, ${cleanTag}` : cleanTag;
    });
  };

  // Validation before advancing to next step
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const canAdvance = (): boolean => {
    if (currentStep === 1) return Boolean(selectedCategory);
    if (currentStep === 2) return Boolean(scopeType);
    if (currentStep === 3) return Boolean(selectedStage);
    if (currentStep === 4) return Boolean(timeline);
    if (currentStep === 5) {
      const isNameValid = contactName.trim().length >= 2;
      const isEmailValid = EMAIL_REGEX.test(contactEmail.trim());
      const isPhoneValid = contactPhone.replace(/\D/g, '').length >= 10;
      return isNameValid && isEmailValid && isPhoneValid && dataProcessingConsent;
    }
    return true;
  };

  const nextStep = () => {
    if (!canAdvance()) {
      if (currentStep === 5) {
        if (contactName.trim().length < 2) {
          setErrorMessage('Please enter your full name (at least 2 characters).');
          return;
        }
        if (!EMAIL_REGEX.test(contactEmail.trim())) {
          setErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
          return;
        }
        if (contactPhone.replace(/\D/g, '').length < 10) {
          setErrorMessage('Please enter a valid 10-digit phone/WhatsApp number.');
          return;
        }
        if (!dataProcessingConsent) {
          setErrorMessage('Please accept the Privacy Policy & Data Protection agreement.');
          return;
        }
      }
      return;
    }
    setErrorMessage('');
    setCurrentStep((s) => Math.min(s + 1, 5));
  };

  const prevStep = () => {
    setErrorMessage('');
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const resetForm = () => {
    setCurrentStep(1);
    setStatus('idle');
    setErrorMessage('');
    setDataProcessingConsent(false);
  };

  // Submit Proposal Wizard
  const handleWizardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Explicit field validation
    if (!contactName.trim() || contactName.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }

    if (!contactEmail.trim() || !EMAIL_REGEX.test(contactEmail.trim())) {
      setErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    const cleanPhoneDigits = contactPhone.replace(/\D/g, '');
    if (cleanPhoneDigits.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone or WhatsApp number.');
      return;
    }

    if (!dataProcessingConsent) {
      setErrorMessage('Please accept the Privacy Policy & Data Processing terms to submit.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const activeCatObj = SERVICE_CATEGORIES.find((c) => c.id === selectedCategory) || SERVICE_CATEGORIES[0];
    const activeScopeConfig = DYNAMIC_SCOPE_CONFIG[selectedCategory];
    const activeScopeObj = activeScopeConfig?.types.find((t) => t.id === scopeType);
    const activeStageObj = STAGE_OPTIONS.find((s) => s.id === selectedStage);
    const activeTimelineObj = TIMELINE_OPTIONS.find((t) => t.id === timeline);
    const activeBudgetObj = BUDGET_OPTIONS.find((b) => b.id === budgetTier);

    // Format structured project brief for backup / plain text preview
    const formattedMessage = `
[PROJECT SPECIFICATIONS & SERVICE SCOPE]
• Service Domain: ${activeCatObj.title}
• Architecture / Focus: ${activeScopeObj?.label || 'General'} (${activeScopeObj?.desc || ''})
• Key Capabilities / Features: ${selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'Standard architecture'}
• Development Stage: ${activeStageObj?.title || 'Not specified'}
• Target Timeline: ${activeTimelineObj?.label || 'Within 1 Month'}
• Target Budget Tier: ${activeBudgetObj?.label || 'Open to Discussion'}
• Preferred Contact Channel: ${preferredContact.toUpperCase()}

[ADDITIONAL PROJECT DETAILS & NOTES]
${additionalNotes.trim() ? additionalNotes.trim() : 'None provided.'}

[LEGAL CONSENT & AGREEMENT]
• Data Processing & Privacy Policy: Accepted
• Technology Services Terms: Accepted
• Direct Proposal Updates: ${communicationConsent ? 'Opted-In (WhatsApp/Email)' : 'Email Only'}
`.trim();

    try {
      const payload = {
        name: contactName.trim(),
        email: contactEmail.trim(),
        phone: contactPhone.trim(),
        service: activeCatObj.title,
        domain: activeCatObj.title,
        scope_type: activeScopeObj?.label || 'General',
        scope_desc: activeScopeObj?.desc || '',
        features: selectedFeatures,
        stage: activeStageObj?.title || 'Not specified',
        timeline: activeTimelineObj?.label || 'Within 1 Month',
        budget_range: activeBudgetObj?.label || 'Custom',
        preferred_contact: preferredContact,
        additional_notes: additionalNotes.trim(),
        message: formattedMessage,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmissionSummary({
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          service: activeCatObj.title,
          scope: activeScopeObj?.label,
          timeline: activeTimelineObj?.label,
          stage: activeStageObj?.title,
          preferredContact,
        });
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit proposal request. Please check details and try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network connection error. Please try again later or email awielabs@gmail.com directly.');
    }
  };

  // Submit Quick Message Form
  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quickForm.name.trim() || quickForm.name.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }

    if (!quickForm.email.trim() || !EMAIL_REGEX.test(quickForm.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (quickForm.phone.trim() && quickForm.phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number, or leave it blank.');
      return;
    }

    if (!quickForm.message.trim() || quickForm.message.trim().length < 10) {
      setErrorMessage('Please enter a message with at least 10 characters.');
      return;
    }

    if (!quickForm.consent) {
      setErrorMessage('Please accept the Privacy Policy to proceed.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const formattedMessage = `
[QUICK GENERAL INQUIRY]
${quickForm.message.trim()}

[LEGAL CONSENT]
• Privacy Policy Accepted: Yes
`.trim();

    try {
      const payload = {
        name: quickForm.name.trim(),
        email: quickForm.email.trim(),
        phone: quickForm.phone.trim() || undefined,
        service: 'General Enquiry',
        domain: 'General Enquiry',
        message: formattedMessage,
        additional_notes: quickForm.message.trim(),
        preferred_contact: quickForm.phone.trim() ? 'WHATSAPP / EMAIL' : 'EMAIL',
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionSummary({
          name: quickForm.name,
          email: quickForm.email,
          service: 'General Enquiry',
          message: quickForm.message,
        });
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error occurred. Please try again later.');
    }
  };

  // Active Category Meta
  const activeCategory = SERVICE_CATEGORIES.find((c) => c.id === selectedCategory) || SERVICE_CATEGORIES[0];
  const activeScopeConfig = DYNAMIC_SCOPE_CONFIG[selectedCategory] || DYNAMIC_SCOPE_CONFIG['web'];

  return (
    <div className="p-6 sm:p-9 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-[#2563EB]/15 hover:bg-[#0B1528] hover:border-[#2563EB] hover:shadow-2xl hover:shadow-[#2563EB]/35 transition-all duration-300 relative group overflow-hidden">
      
      {/* Subtle Ambient Corner Glow on Hover - Contained in inner overflow-hidden wrapper */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none -z-0">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Top Header & Dual Mode Switcher */}
      <div className="relative z-10 space-y-5 pb-5 border-b border-slate-100 group-hover:border-slate-800/80 transition-colors duration-300">
        
        {/* Mode Toggle Tabs & Prominent Reset Button */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-800 transition-all duration-300">
            <button
              type="button"
              onClick={() => {
                setMode('wizard');
                setStatus('idle');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === 'wizard'
                  ? 'bg-white text-[#2563EB] shadow-sm font-extrabold group-hover:bg-[#0B1528] group-hover:text-blue-400 group-hover:border group-hover:border-blue-500/50'
                  : 'text-slate-600 hover:text-slate-900 group-hover:text-slate-400 group-hover:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400" />
              <span>Project Proposal Wizard</span>
            </button>

            {(mode === 'quick' || currentStep === 1) && (
              <button
                type="button"
                onClick={() => {
                  setMode('quick');
                  setStatus('idle');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  mode === 'quick'
                    ? 'bg-white text-[#2563EB] shadow-sm font-extrabold group-hover:bg-[#0B1528] group-hover:text-blue-400 group-hover:border group-hover:border-blue-500/50'
                    : 'text-slate-600 hover:text-slate-900 group-hover:text-slate-400 group-hover:hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-400" />
                <span>Quick Message</span>
              </button>
            )}
          </div>

          {mode === 'wizard' && status !== 'success' && (
            <button
              type="button"
              onClick={resetForm}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 group-hover:bg-slate-900 group-hover:border-slate-700 group-hover:text-slate-200 group-hover:hover:bg-rose-950/80 group-hover:hover:text-rose-400 border border-slate-200 text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
              title="Reset proposal wizard to Step 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Form</span>
            </button>
          )}
        </div>

        {/* Progress Bar (Visible only in Wizard Mode and when not in Success) */}
        {mode === 'wizard' && status !== 'success' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[#2563EB] group-hover:text-blue-400 uppercase tracking-wider text-[11px] font-black transition-colors duration-300">
                Step {currentStep} of 5
              </span>
              <span className="text-slate-400 group-hover:text-slate-300 font-mono text-[11px] font-semibold transition-colors duration-300">
                {currentStep === 1 && 'Domain Category'}
                {currentStep === 2 && 'Project Scope'}
                {currentStep === 3 && 'Development Stage'}
                {currentStep === 4 && 'Timeline & Notes'}
                {currentStep === 5 && 'Contact & Consent'}
              </span>
            </div>

            {/* Glowing Segmented Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 group-hover:bg-slate-900 overflow-hidden relative transition-colors duration-300">
              <div
                className="h-full bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#0284C7] rounded-full transition-all duration-400 ease-out shadow-sm relative"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              >
                {/* Glowing tip */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/70 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SUCCESS STATE */}
      {status === 'success' ? (
        <div className="py-12 text-center space-y-5 relative z-10">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 group-hover:bg-emerald-950 group-hover:border-emerald-500/40 group-hover:text-emerald-400 flex items-center justify-center mx-auto shadow-md transition-all duration-300">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-white transition-colors duration-300">
              Proposal Request Received!
            </h3>
            <p className="text-sm text-slate-600 group-hover:text-slate-300 max-w-md mx-auto leading-relaxed transition-colors duration-300 font-medium">
              Thank you, <strong className="text-slate-900 group-hover:text-white">{submissionSummary?.name || 'there'}</strong>.
              Our engineering team has received your technical specifications for{' '}
              <strong className="text-[#2563EB] group-hover:text-blue-400">{submissionSummary?.service}</strong>.
            </p>
          </div>

          {submissionSummary?.scope && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-slate-950/80 group-hover:border-slate-800 max-w-md mx-auto text-left text-xs space-y-1.5 shadow-sm transition-all duration-300">
              <div className="font-extrabold text-[#2563EB] group-hover:text-blue-400 uppercase tracking-wider text-[10px] pb-1 border-b border-slate-200 group-hover:border-slate-800">
                Summary of Submitted Scope
              </div>
              <div className="flex justify-between text-slate-700 group-hover:text-slate-300">
                <span className="text-slate-500 group-hover:text-slate-400 font-medium">Domain:</span>
                <span className="font-bold text-slate-900 group-hover:text-white">{submissionSummary.service}</span>
              </div>
              <div className="flex justify-between text-slate-700 group-hover:text-slate-300">
                <span className="text-slate-500 group-hover:text-slate-400 font-medium">Scope:</span>
                <span className="font-bold text-slate-900 group-hover:text-white">{submissionSummary.scope}</span>
              </div>
              <div className="flex justify-between text-slate-700 group-hover:text-slate-300">
                <span className="text-slate-500 group-hover:text-slate-400 font-medium">Timeline:</span>
                <span className="font-bold text-slate-900 group-hover:text-white">{submissionSummary.timeline}</span>
              </div>
              {submissionSummary.preferredContact && (
                <div className="flex justify-between text-slate-700 group-hover:text-slate-300">
                  <span className="text-slate-500 group-hover:text-slate-400 font-medium">Preferred Contact:</span>
                  <span className="font-bold uppercase text-[#2563EB] group-hover:text-blue-400">{submissionSummary.preferredContact}</span>
                </div>
              )}
            </div>
          )}

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 group-hover:bg-blue-950/60 group-hover:border-blue-900/60 max-w-md mx-auto text-xs text-slate-700 group-hover:text-slate-300 flex items-center gap-3 transition-all duration-300">
            <Clock className="w-4 h-4 text-[#2563EB] group-hover:text-blue-400 shrink-0" />
            <p className="text-left text-[11px] leading-snug">
              <strong>24-Hour Review SLA:</strong> We review system architecture and draft preliminary milestone proposals within 24 hours.
            </p>
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 group-hover:bg-blue-600 group-hover:hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            Submit Another Proposal Request
          </button>
        </div>
      ) : mode === 'quick' ? (
        /* QUICK MESSAGE FORM */
        <form onSubmit={handleQuickSubmit} className="pt-6 space-y-5 relative z-10">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900 group-hover:text-white transition-colors duration-300">Send a Quick Message</h3>
            <p className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors duration-300">
              Have a quick question about AWIE's engineering, store products, or direct consultations? Drop us a line.
            </p>
          </div>

          {status === 'error' && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 group-hover:bg-rose-950/60 group-hover:border-rose-800 group-hover:text-rose-300 text-xs font-medium flex items-center gap-2.5 transition-colors duration-300">
              <AlertCircle className="w-4 h-4 text-rose-600 group-hover:text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Your Name</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={quickForm.name}
                onChange={(e) => {
                  onKeystroke();
                  setQuickForm({ ...quickForm, name: e.target.value });
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="Full Name"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 placeholder-slate-400 group-hover:bg-slate-950 group-hover:text-white group-hover:placeholder-slate-500 focus:outline-none focus:ring-2 focus:bg-white group-hover:focus:bg-slate-950 transition-all font-medium shadow-sm ${
                  quickForm.name.length > 0 && quickForm.name.trim().length < 2
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 group-hover:border-slate-800 focus:border-[#2563EB] focus:ring-[#2563EB]/20'
                }`}
              />
              {quickForm.name.length > 0 && quickForm.name.trim().length < 2 && (
                <p className="text-[11px] text-rose-500 font-medium">Name must be at least 2 characters.</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Email Address</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={quickForm.email}
                onChange={(e) => {
                  onKeystroke();
                  setQuickForm({ ...quickForm, email: e.target.value });
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="you@domain.com"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 placeholder-slate-400 group-hover:bg-slate-950 group-hover:text-white group-hover:placeholder-slate-500 focus:outline-none focus:ring-2 focus:bg-white group-hover:focus:bg-slate-950 transition-all font-medium shadow-sm ${
                  quickForm.email.length > 0 && !EMAIL_REGEX.test(quickForm.email.trim())
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                    : 'border-slate-200 group-hover:border-slate-800 focus:border-[#2563EB] focus:ring-[#2563EB]/20'
                }`}
              />
              {quickForm.email.length > 0 && !EMAIL_REGEX.test(quickForm.email.trim()) && (
                <p className="text-[11px] text-rose-500 font-medium">Please enter a valid email address.</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Phone / WhatsApp Number</span>
              <span className="text-slate-400 text-[10px] font-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              value={quickForm.phone}
              onChange={(e) => {
                onKeystroke();
                setQuickForm({ ...quickForm, phone: e.target.value });
              }}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="+91 or international phone"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 placeholder-slate-400 group-hover:bg-slate-950 group-hover:text-white group-hover:placeholder-slate-500 focus:outline-none focus:ring-2 focus:bg-white group-hover:focus:bg-slate-950 transition-all font-medium shadow-sm ${
                quickForm.phone.length > 0 && quickForm.phone.replace(/\D/g, '').length < 10
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200 group-hover:border-slate-800 focus:border-[#2563EB] focus:ring-[#2563EB]/20'
              }`}
            />
            {quickForm.phone.length > 0 && quickForm.phone.replace(/\D/g, '').length < 10 && (
              <p className="text-[11px] text-rose-500 font-medium">Phone number must have at least 10 digits.</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Your Message</span>
              <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={quickForm.message}
              onChange={(e) => {
                onKeystroke();
                setQuickForm({ ...quickForm, message: e.target.value });
              }}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="How can AWIE help you today?"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 placeholder-slate-400 group-hover:bg-slate-950 group-hover:text-white group-hover:placeholder-slate-500 focus:outline-none focus:ring-2 focus:bg-white group-hover:focus:bg-slate-950 transition-all resize-none font-medium shadow-sm ${
                quickForm.message.length > 0 && quickForm.message.trim().length < 10
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200 group-hover:border-slate-800 focus:border-[#2563EB] focus:ring-[#2563EB]/20'
              }`}
            />
            {quickForm.message.length > 0 && quickForm.message.trim().length < 10 && (
              <p className="text-[11px] text-rose-500 font-medium">Message must be at least 10 characters.</p>
            )}
          </div>

          {/* Quick Form Privacy Agreement */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-slate-950/80 group-hover:border-slate-800 space-y-2 text-xs transition-colors duration-300">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={quickForm.consent}
                onChange={(e) => setQuickForm({ ...quickForm, consent: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span className="text-slate-600 group-hover:text-slate-300 text-[11px] leading-relaxed transition-colors duration-300">
                I agree to the collection and processing of my contact info by AWIE in accordance with the{' '}
                <Link href="/privacy" target="_blank" className="text-[#2563EB] group-hover:text-blue-400 underline font-bold">
                  Privacy Policy
                </Link>{' '}
                to respond to my inquiry.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            {status === 'submitting' ? (
              <span>Sending Message...</span>
            ) : (
              <>
                <span>Send Quick Message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      ) : (
        /* PROPOSAL WIZARD FORM */
        <div className="pt-6 relative z-10 space-y-6">
          
          {status === 'error' && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 group-hover:bg-rose-950/60 group-hover:border-rose-800 group-hover:text-rose-300 text-xs font-medium flex items-center gap-2.5 transition-colors duration-300">
              <AlertCircle className="w-4 h-4 text-rose-600 group-hover:text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: SERVICE DOMAIN CATEGORY */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white transition-colors duration-300">
                  What kind of project are we engineering?
                </h3>
                <p className="text-xs text-slate-500 group-hover:text-slate-300 font-medium transition-colors duration-300">
                  Select the core engineering discipline for your proposed solution.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {SERVICE_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        onKeystroke();
                        setSelectedCategory(cat.id);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer relative overflow-hidden group/card ${
                        isSelected
                          ? 'bg-blue-50/80 border-[#2563EB] ring-2 ring-[#2563EB]/25 shadow-md group-hover:bg-blue-950/70 group-hover:border-blue-500'
                          : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white group-hover:bg-slate-950/70 group-hover:border-slate-800 group-hover:hover:bg-slate-900 group-hover:hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-2 relative z-10">
                        <div className="flex items-center justify-between">
                          <div
                            className={`p-2 rounded-xl transition-colors ${
                              isSelected
                                ? 'bg-[#2563EB] text-white shadow-sm'
                                : 'bg-white text-slate-700 group-hover/card:text-[#2563EB] group-hover:bg-slate-900 group-hover:text-blue-400'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                              isSelected
                                ? 'bg-blue-200/70 text-[#1E40AF] group-hover:bg-blue-900 group-hover:text-blue-300'
                                : 'bg-slate-200/80 text-slate-600 group-hover:bg-slate-800 group-hover:text-slate-300'
                            }`}
                          >
                            {cat.badge}
                          </span>
                        </div>

                        <div className="font-extrabold text-sm text-slate-900 group-hover:text-white leading-tight transition-colors duration-300">
                          {cat.title}
                        </div>

                        <p className="text-[11px] text-slate-500 group-hover:text-slate-300 leading-relaxed font-medium transition-colors duration-300">
                          {cat.description}
                        </p>
                      </div>

                      {/* Active Indicator Check */}
                      <div className="pt-2 flex justify-end">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#2563EB] text-white scale-100'
                              : 'border border-slate-300 group-hover:border-slate-700 opacity-40 group-hover/card:opacity-80'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: DYNAMIC SPECIFICS & SCOPE */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] group-hover:bg-blue-950 group-hover:text-blue-300 group-hover:border group-hover:border-blue-800/60 font-bold text-[10px] uppercase tracking-wider transition-colors duration-300">
                  <span>Selected: {activeCategory.title}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white transition-colors duration-300">
                  {activeScopeConfig.question}
                </h3>
                <p className="text-xs text-slate-500 group-hover:text-slate-300 font-medium transition-colors duration-300">
                  {activeScopeConfig.subtitle}
                </p>
              </div>

              {/* Sub-Type Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400" />
                  <span>{activeScopeConfig.typeTitle}</span>
                  <span className="text-rose-500">*</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeScopeConfig.types.map((type) => {
                    const isSelected = scopeType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                          onKeystroke();
                          setScopeType(type.id);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-blue-50/70 border-[#2563EB] ring-1 ring-[#2563EB]/25 shadow-sm font-semibold group-hover:bg-blue-950/70 group-hover:border-blue-500'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700 group-hover:bg-slate-950/70 group-hover:border-slate-800 group-hover:text-slate-300 group-hover:hover:bg-slate-900'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full mt-0.5 shrink-0 flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#2563EB] text-white'
                              : 'border border-slate-300 group-hover:border-slate-700'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-white transition-colors">{type.label}</div>
                          <div className="text-[10px] text-slate-500 group-hover:text-slate-400 leading-tight transition-colors">{type.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multi-Select Capability Chips */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400" />
                    <span>{activeScopeConfig.featuresTitle}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-slate-400 font-normal">Select all that apply</span>
                </label>

                <div className="flex flex-wrap gap-2">
                  {activeScopeConfig.features.map((feat) => {
                    const isSelected = selectedFeatures.includes(feat);
                    return (
                      <button
                        key={feat}
                        type="button"
                        onClick={() => toggleFeature(feat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:border-blue-500'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white group-hover:bg-slate-950 group-hover:border-slate-800 group-hover:text-slate-300 group-hover:hover:bg-slate-900'
                        }`}
                      >
                        <Check className={`w-3 h-3 ${isSelected ? 'opacity-100' : 'opacity-30'}`} />
                        <span>{feat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CURRENT DEVELOPMENT STAGE */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white transition-colors duration-300">
                  What stage of development are you in?
                </h3>
                <p className="text-xs text-slate-500 group-hover:text-slate-300 font-medium transition-colors duration-300">
                  This helps us assess technical readiness and allocate the right engineering resources.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {STAGE_OPTIONS.map((stage) => {
                  const Icon = stage.icon;
                  const isSelected = selectedStage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => {
                        onKeystroke();
                        setSelectedStage(stage.id);
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/70 border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-sm group-hover:bg-blue-950/70 group-hover:border-blue-500'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white group-hover:bg-slate-950/70 group-hover:border-slate-800 group-hover:hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`p-2.5 rounded-xl transition-colors ${
                            isSelected
                              ? 'bg-[#2563EB] text-white shadow-sm'
                              : 'bg-white text-slate-500 border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-800 group-hover:text-blue-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-white transition-colors duration-300">
                            {stage.title}
                          </div>
                          <div className="text-[11px] text-slate-500 group-hover:text-slate-400 leading-snug transition-colors duration-300">
                            {stage.desc}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center transition-all ${
                          isSelected ? 'bg-[#2563EB] text-white' : 'border border-slate-300 group-hover:border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: TIMELINE, BUDGET & PROJECT VISION */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white transition-colors duration-300">
                  Timeline & Project Vision
                </h3>
                <p className="text-xs text-slate-500 group-hover:text-slate-300 font-medium transition-colors duration-300">
                  When do you need this completed by, and what key details should we know?
                </p>
              </div>

              {/* Timeline Radio Pills */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400" />
                  <span>Target Completion Timeframe</span>
                  <span className="text-rose-500">*</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIMELINE_OPTIONS.map((time) => {
                    const isSelected = timeline === time.id;
                    return (
                      <button
                        key={time.id}
                        type="button"
                        onClick={() => {
                          onKeystroke();
                          setTimeline(time.id);
                        }}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2563EB] text-white border-[#2563EB] font-bold shadow-sm group-hover:bg-blue-600'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white group-hover:bg-slate-950 group-hover:border-slate-800 group-hover:text-slate-300 group-hover:hover:bg-slate-900'
                        }`}
                      >
                        <div className="text-xs font-bold leading-tight">{time.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Tier */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400" />
                  <span>Target Budget Bracket</span>
                  <span className="text-slate-400 text-[10px] font-normal">(Optional guidance)</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {BUDGET_OPTIONS.map((budget) => {
                    const isSelected = budgetTier === budget.id;
                    return (
                      <button
                        key={budget.id}
                        type="button"
                        onClick={() => {
                          onKeystroke();
                          setBudgetTier(budget.id);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50/70 border-[#2563EB] ring-1 ring-[#2563EB]/25 font-bold group-hover:bg-blue-950/70 group-hover:border-blue-500'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white group-hover:bg-slate-950 group-hover:border-slate-800 group-hover:text-slate-300 group-hover:hover:bg-slate-900'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900 group-hover:text-white transition-colors">{budget.label}</div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Description with Quick Helper Pills */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#2563EB] group-hover:text-blue-400" />
                    <span>Project Vision / Key Requirements</span>
                    <span className="text-slate-400 text-[10px] font-normal">(Optional)</span>
                  </label>
                  <span className="text-[10px] text-slate-400 group-hover:text-slate-400">Click pills to insert</span>
                </div>

                {/* Suggestion Pills */}
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {activeScopeConfig.quickPills.map((pill) => (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => addQuickPillToNotes(pill)}
                      className="text-[10px] font-bold px-2 py-1 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-200/70 hover:bg-blue-100 group-hover:bg-blue-950 group-hover:border-blue-800 group-hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={4}
                  value={additionalNotes}
                  onChange={(e) => {
                    onKeystroke();
                    setAdditionalNotes(e.target.value);
                  }}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Describe your target application, hardware components, business requirements, or any questions..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 group-hover:bg-slate-950 group-hover:border-slate-800 group-hover:text-white group-hover:placeholder-slate-500 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white group-hover:focus:bg-slate-950 transition-all font-medium shadow-sm resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 5: CONTACT DETAILS & MANDATORY DATA AGREEMENT */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-white transition-colors duration-300">
                  Where should we send your proposal?
                </h3>
                <p className="text-xs text-slate-500 group-hover:text-slate-300 font-medium transition-colors duration-300">
                  We'll prepare a structured architecture overview and milestone timeline.
                </p>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Your Full Name</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => {
                      onKeystroke();
                      setContactName(e.target.value);
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 placeholder-slate-400 group-hover:bg-slate-950 group-hover:text-white group-hover:placeholder-slate-500 focus:outline-none focus:ring-2 focus:bg-white group-hover:focus:bg-slate-950 transition-all font-medium shadow-sm ${
                      contactName.length > 0 && contactName.trim().length < 2
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-200 group-hover:border-slate-800 focus:border-[#2563EB] focus:ring-[#2563EB]/20'
                    }`}
                  />
                  {contactName.length > 0 && contactName.trim().length < 2 && (
                    <p className="text-[11px] text-rose-500 font-medium">Name must be at least 2 characters.</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Email Address</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => {
                      onKeystroke();
                      setContactEmail(e.target.value);
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="name@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 placeholder-slate-400 group-hover:bg-slate-950 group-hover:text-white group-hover:placeholder-slate-500 focus:outline-none focus:ring-2 focus:bg-white group-hover:focus:bg-slate-950 transition-all font-medium shadow-sm ${
                      contactEmail.length > 0 && !EMAIL_REGEX.test(contactEmail.trim())
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-200 group-hover:border-slate-800 focus:border-[#2563EB] focus:ring-[#2563EB]/20'
                    }`}
                  />
                  {contactEmail.length > 0 && !EMAIL_REGEX.test(contactEmail.trim()) && (
                    <p className="text-[11px] text-rose-500 font-medium">Please enter a valid email address (e.g. name@domain.com).</p>
                  )}
                </div>
              </div>

              {/* Phone & Preferred Channel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Phone / WhatsApp Number</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => {
                      onKeystroke();
                      setContactPhone(e.target.value);
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 placeholder-slate-400 group-hover:bg-slate-950 group-hover:text-white group-hover:placeholder-slate-500 focus:outline-none focus:ring-2 focus:bg-white group-hover:focus:bg-slate-950 transition-all font-medium shadow-sm ${
                      contactPhone.length > 0 && contactPhone.replace(/\D/g, '').length < 10
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-200 group-hover:border-slate-800 focus:border-[#2563EB] focus:ring-[#2563EB]/20'
                    }`}
                  />
                  {contactPhone.length > 0 && contactPhone.replace(/\D/g, '').length < 10 && (
                    <p className="text-[11px] text-rose-500 font-medium">Phone number must have at least 10 digits.</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 group-hover:text-slate-200 transition-colors duration-300">Preferred Contact Channel</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['whatsapp', 'email', 'phone'] as const).map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setPreferredContact(ch)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer capitalize text-center ${
                          preferredContact === ch
                            ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm group-hover:bg-blue-600'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white group-hover:bg-slate-950 group-hover:border-slate-800 group-hover:text-slate-300 group-hover:hover:bg-slate-900'
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* MANDATORY LEGAL & DATA PRIVACY AGREEMENT CONTAINER */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-slate-950/80 group-hover:border-slate-800 space-y-3 shadow-inner transition-colors duration-300">
                <div className="flex items-center gap-2 text-slate-800 group-hover:text-slate-200 font-extrabold text-xs transition-colors">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB] group-hover:text-blue-400" />
                  <span>Data Protection & Privacy Consent</span>
                </div>

                {/* 1. Mandatory Data Processing Consent */}
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={dataProcessingConsent}
                    onChange={(e) => setDataProcessingConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-600 group-hover:text-slate-300 leading-relaxed transition-colors">
                    <strong className="text-slate-900 group-hover:text-white">Required:</strong> I agree to the collection and processing of my contact and project details by AWIE in accordance with the{' '}
                    <Link
                      href="/privacy"
                      target="_blank"
                      className="text-[#2563EB] group-hover:text-blue-400 underline font-bold hover:text-blue-700"
                    >
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link
                      href={selectedCategory === 'students' ? '/student-terms' : '/services-terms'}
                      target="_blank"
                      className="text-[#2563EB] group-hover:text-blue-400 underline font-bold hover:text-blue-700"
                    >
                      {selectedCategory === 'students' ? 'Student Project Terms' : 'Technology Services Terms'}
                    </Link>{' '}
                    to prepare, discuss, and deliver my proposal quotation.
                  </span>
                </label>

                {/* 2. Optional Direct Communication Consent */}
                <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1 border-t border-slate-200/70 group-hover:border-slate-800 transition-colors">
                  <input
                    type="checkbox"
                    checked={communicationConsent}
                    onChange={(e) => setCommunicationConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-600 group-hover:text-slate-300 leading-relaxed transition-colors">
                    I consent to receiving my proposal document, system architecture review, and milestone updates directly via WhatsApp or Email.
                  </span>
                </label>

                <div className="text-[10px] text-slate-400 group-hover:text-slate-500 pt-1 flex items-center gap-1.5 transition-colors">
                  <span>🛡️ AWIE strictly respects confidentiality. We never sell personal information to third parties.</span>
                </div>
              </div>
            </div>
          )}

          {/* REAL-TIME SCOPE CAPSULE (Shows active choices so far) */}
          <div className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-slate-950/80 group-hover:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 group-hover:text-slate-300 overflow-x-auto gap-2 transition-colors duration-300">
            <span className="font-extrabold text-[#2563EB] group-hover:text-blue-400 text-[10px] uppercase tracking-wider shrink-0 transition-colors">
              Active Scope:
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-800 font-bold text-slate-800 group-hover:text-slate-200 transition-colors">
                {activeCategory.shortLabel}
              </span>
              {currentStep >= 2 && scopeType && (
                <>
                  <span className="text-slate-300 group-hover:text-slate-700">•</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-800 text-slate-700 group-hover:text-slate-300 transition-colors">
                    {activeScopeConfig.types.find((t) => t.id === scopeType)?.label || scopeType}
                  </span>
                </>
              )}
              {currentStep >= 3 && (
                <>
                  <span className="text-slate-300 group-hover:text-slate-700">•</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-800 text-slate-700 group-hover:text-slate-300 transition-colors">
                    {STAGE_OPTIONS.find((s) => s.id === selectedStage)?.title}
                  </span>
                </>
              )}
              {currentStep >= 4 && (
                <>
                  <span className="text-slate-300 group-hover:text-slate-700">•</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-800 text-[#2563EB] group-hover:text-blue-400 font-bold transition-colors">
                    {TIMELINE_OPTIONS.find((t) => t.id === timeline)?.label}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* BOTTOM NAVIGATION CONTROLS */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 group-hover:border-slate-800/80 transition-colors duration-300">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 group-hover:border-slate-800 group-hover:text-slate-300 group-hover:hover:bg-slate-900 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!canAdvance()}
                className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-200 disabled:text-slate-400 group-hover:disabled:bg-slate-800 group-hover:disabled:text-slate-600 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleWizardSubmit}
                disabled={!canAdvance() || status === 'submitting'}
                className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-300 group-hover:disabled:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#2563EB]/25 hover:scale-[1.01] flex items-center gap-2 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <span>Submitting Proposal Request...</span>
                ) : (
                  <>
                    <span>Submit Proposal Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
