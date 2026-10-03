'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Activity, 
  Radio, 
  Users, 
  FileText, 
  ChevronRight, 
  Sparkles,
  ArrowUpRight,
  Heart
} from 'lucide-react';

export const StudentDashboardSection: React.FC = () => {
  const feedItems = [
    {
      id: 'f-1',
      statusColor: 'bg-emerald-500',
      badge: '🟢 SAFE & VERIFIED',
      location: 'Main Campus Gate',
      update: 'Security squad available & barrier inspection active',
      timestamp: 'Just now',
    },
    {
      id: 'f-2',
      statusColor: 'bg-amber-500',
      badge: '🟡 CAUTION / REPAIR',
      location: 'Block B East Corridor',
      update: 'Solar lighting maintenance reported; use illuminated Path 2',
      timestamp: '14 mins ago',
    },
    {
      id: 'f-3',
      statusColor: 'bg-cyan-500',
      badge: '🔵 HEALTH STATION',
      location: 'First Aid Center (Student Commons)',
      update: 'Paramedic nurse on duty; emergency oxygen kit ready',
      timestamp: '32 mins ago',
    },
  ];

  return (
    <section className="space-y-6">
      
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-900/90 to-purple-950/40 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            Hi, Student 👋
          </h2>
          <p className="text-sm sm:text-base text-cyan-300 font-semibold">
            “Stay safe, stay strong.”
          </p>
          <p className="text-xs text-slate-400">
            Real-time personal safety status & automated proximity monitors are currently armed.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <Link
            href="/profile"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>My Safety Profile</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Metrics Cards with Animated Numbers (As Specified) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Safety Status */}
        <div className="p-5 rounded-3xl bg-navy-900/70 border border-emerald-500/30 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
            <span className="font-bold uppercase tracking-wider">Safety Status</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
              92
            </span>
            <span className="text-xs text-slate-400 font-bold">/ 100</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Optimal Safe Radius</span>
          </div>
        </div>

        {/* Metric 2: Active Alerts */}
        <div className="p-5 rounded-3xl bg-navy-900/70 border border-amber-500/30 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
            <span className="font-bold uppercase tracking-wider">Active Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              2
            </span>
            <span className="text-xs text-slate-400">Campus notices</span>
          </div>
          <div className="mt-3 text-[11px] text-amber-300 font-medium truncate">
            ● Solar repair & night escort
          </div>
        </div>

        {/* Metric 3: Nearby Help */}
        <div className="p-5 rounded-3xl bg-navy-900/70 border border-cyan-500/30 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
            <span className="font-bold uppercase tracking-wider">Nearby Help</span>
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">
              3
            </span>
            <span className="text-xs text-slate-400">Stations within 300m</span>
          </div>
          <div className="mt-3 text-[11px] text-cyan-300 font-medium truncate">
            ● Nearest: Security HQ (180m)
          </div>
        </div>

        {/* Metric 4: Recent Reports */}
        <div className="p-5 rounded-3xl bg-navy-900/70 border border-purple-500/30 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
            <span className="font-bold uppercase tracking-wider">Recent Reports</span>
            <FileText className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">
              1
            </span>
            <span className="text-xs text-slate-400">Active case</span>
          </div>
          <div className="mt-3 text-[11px] text-purple-300 font-medium truncate">
            ● Under Level 1 HOD Review
          </div>
        </div>

      </div>

      {/* Campus Safety Live Feed & Promotional Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Campus Safety Feed */}
        <div className="lg:col-span-2 p-6 sm:p-7 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Live Campus Safety Feed</h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Auto-synced</span>
          </div>

          <div className="space-y-3">
            {feedItems.map((item) => (
              <div 
                key={item.id} 
                className="p-4 rounded-2xl bg-navy-950/70 border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.statusColor} animate-pulse`} />
                    <span className="text-xs font-bold text-white">{item.location}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{item.badge}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {item.update}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              href="/safety"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>View complete safety audit logs</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right 1 Column: Promotional Safety Card (As Specified) */}
        <div className="rounded-3xl bg-gradient-to-br from-purple-900/40 via-navy-900 to-navy-950 border border-purple-500/30 shadow-2xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 relative group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

          <div className="space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
              STUDENT COMMUNITY PLEDGE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              “Together for a safer campus.”
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every anonymous report and hazard alert helps our student security mesh safeguard vulnerable transit corridors.
            </p>
          </div>

          <div className="pt-6 relative z-10 space-y-2">
            <Link
              href="/report"
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-glow-purple flex items-center justify-center gap-2 hover:opacity-95 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Report An Issue Today</span>
            </Link>
            <p className="text-[10px] text-center text-slate-400">
              100% anonymous option available with zero IP tracking.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};
