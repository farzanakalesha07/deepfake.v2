'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  AlertTriangle, 
  MapPin, 
  Navigation, 
  FileText, 
  Search, 
  Sparkles, 
  Shield, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  TrendingUp, 
  ArrowRight,
  Radio,
  Lock,
  Activity,
  PhoneCall
} from 'lucide-react';
import { EscalationFlowVisual } from '@/components/EscalationFlowVisual';
import { EmergencySOSModal } from '@/components/EmergencySOSModal';
import { StudentDashboardSection } from '@/components/StudentDashboardSection';
import { SafeZonesSection } from '@/components/SafeZonesSection';

export default function HomePage() {
  const router = useRouter();
  const [quickTrackId, setQuickTrackId] = useState('');
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      router.push(`/track?id=${encodeURIComponent(quickTrackId.trim().toUpperCase())}`);
    }
  };

  return (
    <div className="relative overflow-hidden space-y-16 sm:space-y-24 pb-16">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-purple-700/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[600px] right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-[1200px] left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* ========================================================
          HERO SECTION (Cinematic 2026 Platform Showcase)
          ======================================================== */}
      <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Background Image with Dark Blue Overlay & Glowing Grid */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80"
            alt="Campus at dusk"
            className="w-full h-full object-cover scale-105 opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/95 to-navy-950" />
          
          {/* Subtle animated safety mesh connecting lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <line x1="200" y1="200" x2="600" y2="400" stroke="#06B6D4" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="600" y1="400" x2="1000" y2="250" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="600" y1="400" x2="500" y2="700" stroke="#10B981" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="200" cy="200" r="4" fill="#06B6D4" />
            <circle cx="600" cy="400" r="6" fill="#8B5CF6" />
            <circle cx="1000" cy="250" r="4" fill="#10B981" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call-To-Actions (Col 7) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Animated Badge: All systems operational */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-glow-emerald backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All systems operational</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-normal">Active Safety Mesh 2026</span>
            </div>

            {/* Main Headline (Exact Copy Specified) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Your Campus.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-brand-cyan to-purple-400">
                Your Safety.
              </span><br />
              One Connected Platform.
            </h1>

            {/* Supporting Text (Exact Copy Specified) */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Campus Safe helps students stay secure with real-time alerts, quick emergency assistance, safe zones and simple reporting.
            </p>

            {/* Three Primary CTAs (As Specified: Emergency SOS, Explore Safe Zones, Report an Issue) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              
              {/* Primary CTA: Emergency SOS */}
              <button
                onClick={() => setSosModalOpen(true)}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base shadow-glow-red hover:shadow-red-500/60 hover:scale-105 active:scale-95 transition-all duration-200 border border-rose-400/50 flex items-center gap-2.5"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                <span>Emergency SOS</span>
              </button>

              {/* Secondary CTA: Explore Safe Zones */}
              <Link
                href="/map"
                className="px-6 py-4 rounded-2xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 hover:text-white font-bold text-sm sm:text-base border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center gap-2 active:scale-95"
              >
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>Explore Safe Zones</span>
              </Link>

              {/* Third CTA: Report an Issue */}
              <Link
                href="/report"
                className="px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-sm border border-white/10 transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Report an Issue</span>
              </Link>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Anonymous Mode Available
              </span>
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                Automated Level 1-3 Escalation
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-purple-400" />
                Zero-Knowledge Privacy
              </span>
            </div>
          </div>

          {/* Right Column: Floating Glass Telemetry Card (Col 5) */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-cyan-500/20 rounded-3xl blur-2xl -z-10" />

            {/* Floating Glass Card (As Specified) */}
            <div className="w-full max-w-md p-6 sm:p-7 rounded-3xl bg-navy-900/80 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-6 hover:scale-[1.01] transition-transform">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Campus Telemetry HUD</h3>
                    <p className="text-[10px] text-slate-400">Real-time status check</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  LIVE
                </span>
              </div>

              {/* Status Items Specified in Prompt */}
              <div className="space-y-4">
                
                {/* 1. Campus Status: SAFE */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Campus Status</p>
                    <p className="text-lg font-black text-emerald-400 mt-0.5">🟢 SAFE</p>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-glow-emerald" />
                </div>

                {/* 2. Security Team: ONLINE */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-cyan-500/30 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Security Team</p>
                    <p className="text-lg font-black text-cyan-300 mt-0.5">ONLINE</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
                    4 Patrols Active
                  </span>
                </div>

                {/* 3. Last Updated: Just now */}
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Last Updated
                  </span>
                  <span className="font-semibold text-slate-200">Just now</span>
                </div>

              </div>

              {/* Quick Incident Tracking Search Box */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Track Existing Complaint</span>
                </label>
                <form onSubmit={handleQuickTrack} className="flex gap-2">
                  <input
                    type="text"
                    value={quickTrackId}
                    onChange={(e) => setQuickTrackId(e.target.value)}
                    placeholder="e.g. CS-2026-8F42K"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-glow-purple transition-all shrink-0"
                  >
                    Track
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================
          STUDENT DASHBOARD SECTION (Live Greeting & Metrics)
          ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StudentDashboardSection />
      </div>

      {/* ========================================================
          DESIGNATED SAFE ZONES SHOWCASE
          ======================================================== */}
      <div id="safe-zones" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SafeZonesSection />
      </div>

      {/* ========================================================
          AUTOMATED ESCALATION HIERARCHY FLOWCHART
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>OBJECTIVE SAFETY CHARTER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Automated 3-Level Escalation Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Campus Safe eliminates bureaucratic delays. Repeated harassment reports against any suspect or zone bypass junior faculty and promote directly to apex authorities.
            </p>
          </div>

          {/* Interactive Flowchart Visual */}
          <EscalationFlowVisual />
        </div>
      </section>

      {/* ========================================================
          EMERGENCY SOS CALLOUT BANNER
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-rose-950/40 via-navy-900 to-navy-950 border border-rose-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <AlertTriangle className="w-3 h-3 text-rose-400" />
              <span>RAPID DISPATCH AVAILABLE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Feeling Unsafe On Campus Right Now?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Tap Emergency SOS to broadcast your live GPS coordinates to on-duty security officers within 180 meters. No paperwork or verification required in an active emergency.
            </p>
          </div>

          <button
            onClick={() => setSosModalOpen(true)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-black text-base shadow-glow-red hover:scale-105 active:scale-95 transition-all shrink-0 border border-rose-400/50"
          >
            Launch Emergency SOS
          </button>
        </div>
      </section>

      {/* Global SOS Modal */}
      <EmergencySOSModal 
        isOpen={sosModalOpen} 
        onClose={() => setSosModalOpen(false)} 
      />

    </div>
  );
}
