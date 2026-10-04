'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Eye, 
  Users, 
  ArrowRight, 
  Lock, 
  FileText, 
  Search, 
  Sparkles, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Zap,
  Globe,
  Radio,
  MapPin,
  Paperclip,
  UserCheck,
  Award,
  ShieldAlert,
  Bot,
  PhoneCall,
  Activity,
  Layers,
  HelpCircle,
  Copy
} from 'lucide-react';
import { EmergencyHelpModal } from '@/components/EmergencyHelpModal';
import { AiSafetyAssistantModal } from '@/components/AiSafetyAssistantModal';
import { ComplaintStore } from '@/lib/store';

export default function HomePage() {
  const router = useRouter();
  const [quickTrackId, setQuickTrackId] = useState('');
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [emergencyModalTab, setEmergencyModalTab] = useState<'help' | 'location' | 'safezones'>('help');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 3,
    pending: 2,
    resolved: 1,
    escalated: 1,
    safeScore: 92
  });

  useEffect(() => {
    try {
      const list = ComplaintStore.getComplaints();
      if (Array.isArray(list) && list.length > 0) {
        const total = list.length;
        const pending = list.filter(c => c.status === 'Submitted' || c.status === 'Under Review').length;
        const resolved = list.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;
        const escalated = list.filter(c => c.status === 'Escalated' || c.escalation_level > 1).length;
        setStats({
          total,
          pending,
          resolved,
          escalated,
          safeScore: 92
        });
      }
    } catch (e) {
      // Fallback to default
    }
  }, []);

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      router.push(`/track?id=${encodeURIComponent(quickTrackId.trim().toUpperCase())}`);
    }
  };

  const openEmergency = (tab: 'help' | 'location' | 'safezones') => {
    setEmergencyModalTab(tab);
    setEmergencyModalOpen(true);
  };

  return (
    <div className="relative overflow-hidden space-y-20 sm:space-y-28 pb-20">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-purple-700/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[650px] right-0 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-[1350px] left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[170px] pointer-events-none" />

      {/* ========================================================
          1. HERO SECTION & HERO VISUAL
          ======================================================== */}
      <section className="relative pt-8 sm:pt-14 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.12] backdrop-blur-xl text-purple-200 text-xs sm:text-sm font-semibold shadow-glow-purple">
            <span className="text-base">🛡</span>
            <span className="tracking-wider uppercase font-bold text-white">YOUR SAFETY MATTERS</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-300 font-normal">Confidential Campus Protection</span>
          </div>
        </div>

        {/* Hero Content & Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading, Subtitle, CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Speak Up.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] via-[#3B82F6] to-[#06B6D4]">
                Stay Safe.
              </span>
            </h1>

            <h2 className="text-lg sm:text-2xl font-bold text-slate-200">
              Campus Safety &amp; Repeated Harassment Reporting System
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Students can confidentially report unwanted following, harassment, threats, intimidation, offline ragging and online abuse.
            </p>

            <p className="text-xs sm:text-sm text-cyan-300 font-mono font-medium tracking-wide">
              &ldquo;Report safely. Protect your privacy. Escalate when it matters.&rdquo;
            </p>

            {/* Hero CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/report"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#06B6D4] hover:opacity-95 shadow-glow-purple transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <FileText className="w-5 h-5" />
                <span>Report an Incident &rarr;</span>
              </Link>

              <Link
                href="/track"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm sm:text-base font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] hover:border-cyan-400/50 shadow-sm transition-all duration-300 backdrop-blur-xl"
              >
                <Search className="w-5 h-5 text-cyan-400" />
                <span>Track My Complaint</span>
              </Link>
            </div>

            {/* Quick Track Inline Input */}
            <div className="pt-2 max-w-md mx-auto lg:mx-0">
              <form onSubmit={handleQuickTrack} className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.12] backdrop-blur-xl">
                <input
                  type="text"
                  value={quickTrackId}
                  onChange={(e) => setQuickTrackId(e.target.value)}
                  placeholder="Enter Complaint ID (e.g. CS-2026-8F42K)"
                  className="flex-1 px-4 py-2.5 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <span>Track</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: CAMPUS SAFETY STATUS (Futuristic Glass Dashboard) */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-[28px] bg-white/[0.05] backdrop-blur-[20px] border border-white/[0.12] shadow-2xl space-y-6">
              
              {/* Header: CAMPUS SAFETY STATUS */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">TELEMETRY GRID</span>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-wide">
                    CAMPUS SAFETY STATUS
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>CAMPUS SAFE</span>
                </div>
              </div>

              {/* Circular Animated Safety Score */}
              <div className="flex items-center justify-center py-2">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  
                  {/* Glowing SVG Ring Animation */}
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="stroke-white/10"
                      strokeWidth="7"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="stroke-emerald-400 animate-ring-glow transition-all duration-1000"
                      strokeWidth="7"
                      strokeDasharray="264"
                      strokeDashoffset={264 - (264 * stats.safeScore) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>

                  {/* Inner Score Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Safety Score</span>
                    <span className="text-4xl font-black text-white tracking-tight">
                      {stats.safeScore}%
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400">Optimal Grid</span>
                  </div>

                </div>
              </div>

              {/* Status Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="block text-[10px] font-mono text-slate-400 uppercase">Threat Level</span>
                  <span className="text-sm font-bold text-cyan-300">LOW</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="block text-[10px] font-mono text-slate-400 uppercase">Active Reports</span>
                  <span className="text-sm font-bold text-amber-300">
                    {stats.pending < 10 ? `0${stats.pending}` : stats.pending}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="block text-[10px] font-mono text-slate-400 uppercase">Safe Zones</span>
                  <span className="text-sm font-bold text-emerald-400">08</span>
                </div>

              </div>

              {/* Quick Assistant Callout inside Dashboard */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  Live proctorial watchdog online
                </span>
                <button
                  onClick={() => setAiAssistantOpen(true)}
                  className="text-cyan-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Ask AI</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ========================================================
          2. EMERGENCY ACTIONS CARD (Need Immediate Help?)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-6 sm:p-8 rounded-[28px] bg-gradient-to-r from-red-950/30 via-[#080D24] to-rose-950/20 border border-red-500/30 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Need Immediate Help?</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                If you are in immediate danger or facing aggressive intimidation right now, access urgent campus support.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => openEmergency('help')}
              className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold shadow-glow-danger flex items-center gap-2 transition-transform hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" />
              <span>🚨 Emergency Help</span>
            </button>
            <button
              onClick={() => openEmergency('location')}
              className="px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-cyan-300 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>📍 Share Location</span>
            </button>
            <button
              onClick={() => openEmergency('safezones')}
              className="px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>🛡 Find Safe Zone</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          3. CORE FEATURES: "Everything You Need to Stay Safe"
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30 uppercase tracking-widest mb-3">
            PROTECTION ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need to Stay Safe
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Seven core security pillars engineered to safeguard students from offline intimidation, hostel bullying, and cyber harassment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* CARD 1: Confidential Complaint */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 text-xl">
                📝
              </div>
              <h3 className="text-base font-bold text-white mb-2">Confidential Complaint</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Report safely without unnecessary exposure of personal information. Complete isolation of reporter identity.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-purple-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero-exposure guarantee</span>
            </div>
          </div>

          {/* CARD 2: Incident Details */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 text-xl">
                📍
              </div>
              <h3 className="text-base font-bold text-white mb-2">Incident Details</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Precise logging of Date, Time, Location, and detailed description to establish indisputable factual timelines.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-cyan-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Geotag &amp; Time verified</span>
            </div>
          </div>

          {/* CARD 3: Evidence Upload */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 text-xl">
                📎
              </div>
              <h3 className="text-base font-bold text-white mb-2">Evidence Upload</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Optional: Upload photos, screenshots, audio clips, or supporting documents to corroborate your report.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-indigo-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Metadata-scrubbed locker</span>
            </div>
          </div>

          {/* CARD 4: Suspect Details */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 text-xl">
                👤
              </div>
              <h3 className="text-base font-bold text-white mb-2">Suspect Details</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Provide name if known, department, class, and phone number. Used to detect repeated serial harassment patterns.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-blue-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Pattern detection linkage</span>
            </div>
          </div>

          {/* CARD 5: Complaint Tracking */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 text-xl">
                🔎
              </div>
              <h3 className="text-base font-bold text-white mb-2">Complaint Tracking</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Track complaint status in real-time using your unique Complaint ID without requiring student login or passwords.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Anonymous token tracking</span>
            </div>
          </div>

          {/* CARD 6: Automatic Escalation */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 text-xl">
                🚀
              </div>
              <h3 className="text-base font-bold text-white mb-2">Automatic Escalation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                1st Report &rarr; HOD. 2nd Report &rarr; Dean. 3rd Report &rarr; Higher Authority. Zero tolerance for repeat offenders.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-amber-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Algorithmic escalation</span>
            </div>
          </div>

          {/* CARD 7: Role-Based Privacy */}
          <div className="glass-card p-6 flex flex-col justify-between sm:col-span-2 lg:col-span-1 xl:col-span-2">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 text-xl">
                🔐
              </div>
              <h3 className="text-base font-bold text-white mb-2">Role-Based Privacy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Student, HOD, Dean, and Higher Authority. Each authority role strictly sees only the specific evidence and jurisdictions they are legally authorized to review.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-rose-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cryptographic jurisdiction isolation</span>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================
          4. TWO TYPES OF COMPLAINTS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest mb-3">
            CLASSIFICATION PROTOCOL
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            TWO TYPES OF COMPLAINTS
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Select the domain of the incident to trigger the specialized proctorial response protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CARD 1: OFFLINE RAGGING */}
          <div className="relative p-8 rounded-[28px] bg-gradient-to-br from-purple-950/30 via-[#080D24] to-pink-950/20 border border-purple-500/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between group hover:border-purple-500/60 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-300 text-2xl group-hover:scale-110 transition-transform">
                  🛡
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-pink-500/15 text-pink-300 border border-pink-500/30">
                  PHYSICAL HARASSMENT
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                OFFLINE RAGGING
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Physical / In-Person Harassment occurring on campus premises, hostels, cafeteria zones, or bus transit routes.
              </p>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Examples of violations:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>Following / Stalking</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>Unwanted Behaviour</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>Threats / Intimidation</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>Other Offline Incidents</span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/report?type=OFFLINE_RAGGING"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-glow-purple transition-all"
            >
              <span>File Offline Incident Report</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* CARD 2: ONLINE RAGGING */}
          <div className="relative p-8 rounded-[28px] bg-gradient-to-br from-cyan-950/30 via-[#080D24] to-blue-950/20 border border-cyan-500/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between group hover:border-cyan-500/60 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-2xl group-hover:scale-110 transition-transform">
                  💻
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  DIGITAL / CYBER HARASSMENT
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                ONLINE RAGGING
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Digital intimidation through social media handles, WhatsApp batches, spoofed accounts, or group doxxing.
              </p>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Examples of violations:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Fake Accounts &amp; Impersonation</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Obscene / Abusive Content</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Online Threats &amp; Doxxing</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Cyber Harassment Incidents</span>
                  </div>
                </div>

                {/* Important Screenshot Proof Note */}
                <div className="mt-4 p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-2.5 text-xs text-cyan-200">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-medium">
                    <strong>Important:</strong> Screenshot proof recommended if available (chat logs, handles, or message URLs).
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/report?type=ONLINE_RAGGING"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-glow-cyan transition-all"
            >
              <span>File Online Incident Report</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </section>

      {/* ========================================================
          5. ESCALATION WORKFLOW (Horizontal connected workflow)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase tracking-widest mb-3">
            ZERO TOLERANCE ENGINE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Automatic Escalation System
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Repeated complaints trigger higher disciplinary tiers automatically, preventing local suppression or bias.
          </p>
        </div>

        {/* Horizontal Workflow with Connected Glowing Lines */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* STAGE 1: Blue = First Level (HOD) */}
          <div className="relative glass-card p-6 border-blue-500/30 hover:border-blue-500/60 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                1st Report
              </span>
              <UserCheck className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">HOD (Department Head)</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Immediate departmental investigation, student counseling, and formal written warning logged in institutional register.
            </p>
            <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-[11px] font-mono text-blue-300">
              Level 1 Jurisdiction • 24hr Notice
            </div>
          </div>

          {/* STAGE 2: Purple = Second Level (Dean) */}
          <div className="relative glass-card p-6 border-purple-500/30 hover:border-purple-500/60 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                2nd Report
              </span>
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Dean of Student Affairs</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Triggered automatically when a second report identifies the same suspect. Hostel de-allocation and campus security patrol orders.
            </p>
            <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-[11px] font-mono text-purple-300">
              Level 2 Jurisdiction • Proctorial Inquiry
            </div>
          </div>

          {/* STAGE 3: Orange = Higher Authority */}
          <div className="relative glass-card p-6 border-amber-500/30 hover:border-amber-500/60 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                3rd Report
              </span>
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Higher Authority / Vice Chancellor</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Apex Anti-Ragging Committee convene: academic suspension, formal FIR police handoff, and UGC regulatory compliance action.
            </p>
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/20 text-[11px] font-mono text-amber-300">
              Level 3 Jurisdiction • Apex Tribunal
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================
          6. PRIVACY SECTION: "Your Privacy Comes First"
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-[28px] bg-gradient-to-r from-purple-950/30 via-[#080D24] to-cyan-950/30 border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest mb-3">
              ZERO LEAKAGE POLICY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Your Privacy Comes First
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Sensitive victim information is only available to authorized roles according to the application&apos;s existing access-control logic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center flex flex-col items-center">
              <span className="text-2xl mb-2">🔐</span>
              <h4 className="text-xs font-bold text-white mb-1">Confidential Reporting</h4>
              <p className="text-[11px] text-slate-400">Reporter PII is isolated from public view</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center flex flex-col items-center">
              <span className="text-2xl mb-2">👁</span>
              <h4 className="text-xs font-bold text-white mb-1">Role-Based Visibility</h4>
              <p className="text-[11px] text-slate-400">Only assigned officers can decrypt data</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center flex flex-col items-center">
              <span className="text-2xl mb-2">🛡</span>
              <h4 className="text-xs font-bold text-white mb-1">Protected PII</h4>
              <p className="text-[11px] text-slate-400">Student ID and contact details locked</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center flex flex-col items-center">
              <span className="text-2xl mb-2">📄</span>
              <h4 className="text-xs font-bold text-white mb-1">Controlled Evidence</h4>
              <p className="text-[11px] text-slate-400">Strictly encrypted vault access</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center flex flex-col items-center sm:col-span-2 lg:col-span-1">
              <span className="text-2xl mb-2">🚫</span>
              <h4 className="text-xs font-bold text-white mb-1">No Public Exposure</h4>
              <p className="text-[11px] text-slate-400">Suspects never know who filed</p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          7. AI SAFETY ASSISTANT SECTION
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-[28px] bg-white/[0.04] border border-white/[0.12] backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Glowing AI Orb Breathing Animation */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 flex items-center justify-center animate-ai-orb shrink-0">
              <Bot className="w-9 h-9 text-white" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>● AI MONITORING ACTIVE</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">AI Safety Assistant</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Your intelligent campus safety companion. Get instant guidance on reporting confidential incidents, UGC anti-ragging rights, and evidence collection.
              </p>
              
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <span>Campus Status: <strong className="text-emerald-400">SAFE</strong></span>
                <span>•</span>
                <span>Threat Level: <strong className="text-cyan-300">LOW</strong></span>
                <span>•</span>
                <span className="hidden sm:inline">Action: <em>Stay aware &amp; report early</em></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setAiAssistantOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-glow-purple transition-all shrink-0"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>Ask Safety Assistant &rarr;</span>
          </button>

        </div>
      </section>

      {/* Emergency Modal & AI Assistant Modal */}
      <EmergencyHelpModal 
        isOpen={emergencyModalOpen} 
        onClose={() => setEmergencyModalOpen(false)} 
        initialTab={emergencyModalTab}
      />

      <AiSafetyAssistantModal 
        isOpen={aiAssistantOpen} 
        onClose={() => setAiAssistantOpen(false)} 
      />

    </div>
  );
}
