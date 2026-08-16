'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Inbox, 
  FolderKanban, 
  Package, 
  Users, 
  MessageSquare,
  Search,
  Filter,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'enquiries' | 'projects' | 'products' | 'requests'>('enquiries');

  const sampleEnquiries = [
    { id: '1', name: 'Dr. Sarah Jenkins', email: 'sarah@medtech.org', service: 'Web Applications', date: '2026-08-15', status: 'Unread', message: 'Looking for a custom patient dashboard integration.' },
    { id: '2', name: 'Rahul Sharma', email: 'rahul@student.edu', service: 'Student Mentoring', date: '2026-08-14', status: 'Read', message: 'Need guidance for final year ESP32 IoT project.' }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#0A0E17] text-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        {/* Admin Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-950 border border-rose-800 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AWIE Admin Dashboard</h1>
              <span className="text-xs text-slate-400">System & Database Management Portal</span>
            </div>
          </div>

          <div className="flex gap-2">
            {(['enquiries', 'projects', 'products', 'requests'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase transition-all ${
                  activeTab === tab
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#06B6D4]" />
                Recent Contact Enquiries
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {sampleEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-950/60">
                      <td className="p-4 text-slate-400">{enq.date}</td>
                      <td className="p-4 font-bold text-white">{enq.name}</td>
                      <td className="p-4 font-mono text-slate-300">{enq.email}</td>
                      <td className="p-4 text-[#3B82F6]">{enq.service}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          enq.status === 'Unread' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-semibold">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== 'enquiries' && (
          <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
            <h3 className="text-lg font-bold text-white uppercase">{activeTab} Management Panel</h3>
            <p className="text-xs text-slate-400">Database connected via Supabase PostgreSQL tables.</p>
          </div>
        )}

      </div>
    </div>
  );
}
