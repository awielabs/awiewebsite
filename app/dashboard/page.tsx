'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FolderKanban, 
  Plus, 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  FileText, 
  Code, 
  TestTube, 
  CheckCheck,
  ChevronRight
} from 'lucide-react';

export default function CustomerDashboard() {
  const pipelineSteps = [
    'Submitted',
    'Reviewed',
    'Discussion',
    'Proposal',
    'In Development',
    'Testing',
    'Completed'
  ];

  const sampleRequests = [
    {
      id: 'REQ-802',
      title: 'Smart Office IoT Environmental Sensor Web App',
      service: 'IoT & Web Platform',
      currentStep: 4, // 'In Development'
      updatedAt: '2026-08-14',
      budget: '$2,000 - $5,000'
    },
    {
      id: 'REQ-791',
      title: 'BLE Microcontroller Companion Mobile Application',
      service: 'Mobile App',
      currentStep: 1, // 'Reviewed'
      updatedAt: '2026-08-10',
      budget: '$500 - $2,000'
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider block">Customer Portal</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Project Dashboard</h1>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-all shadow-md shadow-[#2563EB]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Submit New Project Request</span>
          </Link>
        </div>

        {/* Active Project Requests */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-[#3B82F6]" />
            My Requests
          </h2>

          <div className="space-y-6">
            {sampleRequests.map((req) => (
              <div
                key={req.id}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6"
              >
                {/* Top Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-800 text-[#06B6D4] border border-slate-700">
                        {req.id}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{req.service}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1">{req.title}</h3>
                  </div>

                  <div className="text-xs text-slate-400">
                    <span>Updated: {req.updatedAt}</span>
                  </div>
                </div>

                {/* Status Pipeline Timeline */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Project Status Tracker</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                    {pipelineSteps.map((step, idx) => {
                      const isCompleted = idx < req.currentStep;
                      const isCurrent = idx === req.currentStep;

                      return (
                        <div
                          key={step}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isCurrent
                              ? 'bg-[#2563EB]/20 border-[#2563EB] text-white font-bold shadow-lg shadow-[#2563EB]/20'
                              : isCompleted
                              ? 'bg-slate-950 border-slate-700 text-slate-300'
                              : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
                          }`}
                        >
                          <div className="flex justify-center mb-1">
                            {isCompleted ? (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            ) : isCurrent ? (
                              <Clock className="w-3.5 h-3.5 text-[#06B6D4] animate-spin" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-slate-700 mt-1" />
                            )}
                          </div>
                          <span className="text-[10px] block leading-tight">{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
