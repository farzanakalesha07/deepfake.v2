'use client';

import React, { useState } from 'react';
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
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Globe,
  Radio
} from 'lucide-react';
import { HeroIllustration } from '@/components/HeroIllustration';
import { EscalationFlowVisual } from '@/components/EscalationFlowVisual';

export default function HomePage() {
  const router = useRouter();
  const [quickTrackId, setQuickTrackId] = useState('');

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      router.push(`/track?id=${encodeURIComponent(quickTrackId.trim().toUpperCase())}`);
    }
  };

  return (
    <div className="relative overflow-hidden">
      
      {/* Background radial glow orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[600px] right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badge: YOUR SAFETY MATTERS */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/15 via-indigo-500/15 to-cyan-500/15 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-semibold shadow-glow-purple backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="tracking-wide">YOUR SAFETY MATTERS</span>
            <span className="text-purple-400">•</span>
            <span className="text-slate-300 font-normal">Confidential Campus Protection</span>
          </div>
        </div>

        {/* Hero Headings */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Speak Up. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400">Stay Safe.</span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-200 mb-4">
            Campus Safety & Repeated Harassment Reporting System
          </h2>
          <p className="text-base sm:text-lg text-purple-300 font-medium mb-3">
            Report safely. Protect your privacy. Escalate when it matters.
          </p>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Students can confidentially report unwanted following, harassment, threats, intimidation and online abuse. Repeated complaints are automatically escalated to the appropriate authority.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/report"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-violet via-purple-600 to-brand-cyan hover:opacity-95 shadow-glow-purple transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <FileText className="w-5 h-5" />
              <span>Report an Incident</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/track"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-400/50 shadow-sm transition-all duration-300 backdrop-blur-md"
            >
              <Search className="w-5 h-5 text-cyan-400" />
              <span>Track My Complaint</span>
            </Link>
          </div>

          {/* Quick inline complaint track box */}
          <form onSubmit={handleQuickTrack} className="mt-6 max-w-md mx-auto flex items-center gap-2 p-1.5 rounded-2xl bg-navy-900/80 border border-white/10 backdrop-blur-md">
            <input
              type="text"
              value={quickTrackId}
              onChange={(e) => setQuickTrackId(e.target.value)}
              placeholder="Have an ID? e.g. CS-2026-8F42K"
              className="flex-1 px-4 py-2.5 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none uppercase font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Track</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Hero Visual Illustration & Device Mockup */}
        <div className="mt-8">
          <HeroIllustration />
        </div>

      </section>

      {/* =========================================
          THREE FEATURE CARDS
          ========================================= */}
      <section className="py-16 bg-navy-950/60 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Engineered for Student Protection
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every feature is built ground-up to eliminate fear, ensure zero leakage, and deliver swift campus justice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Confidential Reporting */}
            <div className="relative rounded-3xl p-8 bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-xl hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                Confidential Reporting
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Your personal information is protected and only shared with authorized personnel when necessary.
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-purple-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Encrypted Vault Storage</span>
              </div>
            </div>

            {/* Card 2: Privacy Protected */}
            <div className="relative rounded-3xl p-8 bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-xl hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                Privacy Protected
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Control what information you provide and keep sensitive details restricted. Choose full anonymity or confidential contact.
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-cyan-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Public Exposure</span>
              </div>
            </div>

            {/* Card 3: Stronger Together */}
            <div className="relative rounded-3xl p-8 bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-xl hover:border-indigo-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                Stronger Together
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Help create a safer campus by reporting incidents early. Repeat complaints expose patterns and trigger high-level intervention.
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-indigo-300 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pattern Detection Mesh</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================
          HOW IT WORKS (4 STEPS)
          ========================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>TRANSPARENT 4-STEP WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            From the moment you submit to full resolution, you maintain complete tracking transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* STEP 1 */}
          <div className="relative p-6 rounded-3xl bg-navy-900/60 border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full text-xs font-extrabold bg-purple-600 text-white shadow-md">
              STEP 1
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white mb-2">Submit a complaint</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select Offline or Online ragging. Provide incident details, optional evidence, and choose Anonymous or Confidential reporting.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/10 text-[11px] text-purple-300 font-mono">
              ~2 mins to complete
            </div>
          </div>

          {/* STEP 2 */}
          <div className="relative p-6 rounded-3xl bg-navy-900/60 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full text-xs font-extrabold bg-cyan-500 text-navy-950 font-bold shadow-md">
              STEP 2
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white mb-2">Receive a unique Complaint ID</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instantly receive an encrypted alphanumeric code (e.g., <code className="text-cyan-300">CS-2026-8F42K</code>) to track updates without login.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/10 text-[11px] text-cyan-300 font-mono">
              Unique & Non-traceable
            </div>
          </div>

          {/* STEP 3 */}
          <div className="relative p-6 rounded-3xl bg-navy-900/60 border border-white/10 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full text-xs font-extrabold bg-indigo-600 text-white shadow-md">
              STEP 3
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white mb-2">Track your complaint</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Follow real-time status progression from Under Review to Action Taken, with sanitized status messages.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/10 text-[11px] text-indigo-300 font-mono">
              Real-time audit log
            </div>
          </div>

          {/* STEP 4 */}
          <div className="relative p-6 rounded-3xl bg-navy-900/60 border border-white/10 hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full text-xs font-extrabold bg-rose-500 text-white shadow-md">
              STEP 4
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white mb-2">Repeated reports trigger escalation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If the suspect has multiple reports or the incident repeats, our engine automatically escalates the case to the Dean or Higher Authorities.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/10 text-[11px] text-rose-300 font-mono">
              Zero tolerance policy
            </div>
          </div>

        </div>

      </section>

      {/* =========================================
          ESCALATION HIERARCHY SECTION
          ========================================= */}
      <section className="py-16 bg-navy-950/80 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EscalationFlowVisual />
        </div>
      </section>

      {/* =========================================
          TWO REPORT TYPES PREVIEW CALLOUT
          ========================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900/40 via-navy-900 to-cyan-950/40 border border-white/15 relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-cyan-300 border border-white/10 mb-4">
                CHOOSE YOUR INCIDENT CATEGORY
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to make our campus safer?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Whether you experienced in-person intimidation on college grounds or digital harassment through messaging apps, we have dedicated fast-track investigation units.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/report?type=OFFLINE_RAGGING"
                  className="px-5 py-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-bold transition-all flex items-center gap-2"
                >
                  <span>Report Offline Ragging</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/report?type=ONLINE_RAGGING"
                  className="px-5 py-3 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-200 text-xs sm:text-sm font-bold transition-all flex items-center gap-2"
                >
                  <span>Report Online Cyber Harassment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-navy-950/80 p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                Safety Guarantee
              </div>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>No login or account creation required for students</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Suspects never know who filed the complaint</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Direct disciplinary committee oversight</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
