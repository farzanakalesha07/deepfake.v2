'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  MapPin, 
  Phone, 
  Globe, 
  Camera, 
  Lock, 
  AlertOctagon, 
  CheckCircle2, 
  LifeBuoy, 
  FileText, 
  ExternalLink,
  Users,
  HeartHandshake,
  Radio,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function SafetyGuidePage() {
  return (
    <div className="relative min-h-screen py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-4 shadow-glow-cyan">
          <LifeBuoy className="w-3.5 h-3.5 text-cyan-400" />
          <span className="uppercase tracking-wider">Campus Defense Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Safety Protocols &amp; Action Checklist
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
          Field-tested steps to protect your physical well-being, preserve cryptographic evidence, and alert quick-reaction campus security teams.
        </p>
      </div>

      {/* =========================================
          EMERGENCY ASSISTANCE SECTION (High Priority, verified)
          ========================================= */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-rose-950/70 via-navy-950/90 to-purple-950/70 border border-rose-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 shadow-glow-pink">
              <ShieldAlert className="w-7 h-7 text-rose-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Immediate Emergency Hotlines
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  24/7 ACTIVE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                If you are in immediate physical danger, bypass digital forms. Call direct campus response units immediately.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="tel:18001805522"
              className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-glow-pink transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>National Anti-Ragging: 1800-180-5522</span>
            </a>
            <a
              href="tel:112"
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-100 text-xs sm:text-sm font-bold flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
              <span>National Emergency: 112</span>
            </a>
          </div>
        </div>

        {/* Directory cards */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs relative z-10">
          <div className="p-4 rounded-2xl bg-navy-950/60 border border-white/10">
            <div className="font-bold text-white">Campus Security Control Room</div>
            <div className="text-cyan-400 font-mono mt-1 font-bold text-sm">+91 (020) 2590-8000</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Main Gate Command Post (24 Hours)</div>
          </div>
          <div className="p-4 rounded-2xl bg-navy-950/60 border border-white/10">
            <div className="font-bold text-white">Women&apos;s Safety Rapid Helpline</div>
            <div className="text-violet-300 font-mono mt-1 font-bold text-sm">1091 / +91 (020) 2590-8111</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Confidential female proctor officers</div>
          </div>
          <div className="p-4 rounded-2xl bg-navy-950/60 border border-white/10">
            <div className="font-bold text-white">Student Wellness &amp; Counseling</div>
            <div className="text-emerald-300 font-mono mt-1 font-bold text-sm">+91 (020) 2590-8444</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Health Centre, 2nd Floor</div>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 1: "IF YOU FEEL UNSAFE"
          ========================================= */}
      <div className="rounded-3xl p-6 sm:p-10 bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            Physical / On-Campus Defense
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            If You Feel Unsafe On Campus
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Immediate tactics to defuse physical confrontation, evade intimidation, and reach verified safe zones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-violet-500/30 transition-all">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-bold text-white text-sm">Evacuate to a Designated Safe Zone</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If someone is tailing or intimidating you, immediately head toward illuminated, high-traffic zones: Central Library, Cafeteria, or Student Center.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-violet-500/30 transition-all">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-bold text-white text-sm">Contact Campus Security Guards</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Alert campus security officers posted at nearest checkpoints. Do not confront aggressive individuals or unauthorized groups alone.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-violet-500/30 transition-all">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-bold text-white text-sm">Preserve Context &amp; Evidence</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Take note of timestamps, clothing, vehicle registration numbers, or names of surrounding witnesses to accelerate disciplinary action.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-violet-500/30 transition-all">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h3 className="font-bold text-white text-sm">Submit Encrypted Report</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              File through the CampusSafe portal. Repeated patterns automatically trigger Dean of Student Welfare and Standing Anti-Ragging escalation.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 2: "ONLINE SAFETY"
          ========================================= */}
      <div className="rounded-3xl p-6 sm:p-10 bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            Cyber &amp; Digital Protection
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            Online Harassment Countermeasures
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            How to respond to cyberbullying, unsolicited messages, impersonation, or unauthorized group invites.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-cyan-500/30 transition-all">
            <div className="w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-300 flex items-center justify-center font-bold text-xs">
              A
            </div>
            <h3 className="font-bold text-white text-sm">Lock Down Sensitive Credentials</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never disclose OTPs, room numbers, class timetables, or private media to unfamiliar online accounts claiming to represent college seniors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-cyan-500/30 transition-all">
            <div className="w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-300 flex items-center justify-center font-bold text-xs">
              B
            </div>
            <h3 className="font-bold text-white text-sm">Preserve Unedited Screenshots</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Capture full screen context including timestamps, sender handles, phone numbers, and profile URL links before blocking or before messages vanish.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-cyan-500/30 transition-all">
            <div className="w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-300 flex items-center justify-center font-bold text-xs">
              C
            </div>
            <h3 className="font-bold text-white text-sm">Platform + Campus Reporting</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Report the perpetrator on the platform (WhatsApp, Telegram, Discord, Instagram) and attach the evidence to your CampusSafe intake.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-cyan-500/30 transition-all">
            <div className="w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-300 flex items-center justify-center font-bold text-xs">
              D
            </div>
            <h3 className="font-bold text-white text-sm">Enforce Strict Privacy Controls</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Keep social profiles private, restrict direct messages from unknown accounts, and scrub hostel/batch details from your public bio.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-violet-950/40 via-navy-950 to-cyan-950/40 border border-white/10 backdrop-blur-2xl space-y-4">
        <h3 className="text-2xl font-black text-white">Need to report an incident right now?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          Your submission is encrypted, sealed, and processed under statutory anti-ragging confidentiality guidelines.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-sm shadow-glow-purple hover:opacity-95 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Launch 3-Step Incident Wizard</span>
          </Link>
          <Link
            href="/map"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 transition-all"
          >
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>View Safe Havens Map</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
