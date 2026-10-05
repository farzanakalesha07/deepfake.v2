'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lock, 
  ShieldCheck, 
  EyeOff, 
  FileCheck2, 
  KeyRound, 
  History, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Fingerprint,
  Cpu,
  Layers,
  Check
} from 'lucide-react';

export default function PrivacyPage() {
  const features = [
    {
      id: 'Encrypted Reports',
      title: 'Encrypted Reports',
      desc: 'All submitted narratives, dates, and communications are encrypted with AES-GCM 256-bit cryptography at ingestion.',
      icon: <Lock className="w-5 h-5 text-cyan-400" />,
      tag: 'Zero-Leakage'
    },
    {
      id: 'Anonymous Reporting',
      title: 'Anonymous Reporting',
      desc: 'Students can file without providing names, student IDs, or contact info. Zero trace telemetry is preserved in public tables.',
      icon: <EyeOff className="w-5 h-5 text-purple-400" />,
      tag: 'Untraceable PII'
    },
    {
      id: 'Secure Evidence',
      title: 'Secure Evidence',
      desc: 'Photos, chat screenshots, and audio logs are stripped of EXIF GPS metadata and stored in an isolated, immutable proctor locker.',
      icon: <FileCheck2 className="w-5 h-5 text-blue-400" />,
      tag: 'Sanitized Media'
    },
    {
      id: 'Controlled Access',
      title: 'Controlled Access',
      desc: 'Strict Role-Based Access Control (RBAC) ensures only designated proctorial authorities can view details. Suspects have zero access.',
      icon: <KeyRound className="w-5 h-5 text-emerald-400" />,
      tag: 'Role-Gated'
    },
    {
      id: 'Audit Trail',
      title: 'Audit Trail',
      desc: 'Every access, status transition, and notes escalation creates an unalterable chronological audit entry signed by the viewing official.',
      icon: <History className="w-5 h-5 text-amber-400" />,
      tag: 'Immutable Log'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#050B14] text-slate-100 py-10 sm:py-16 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Volumetric Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#00F2FE 1px, transparent 1px), linear-gradient(90deg, #00F2FE 1px, transparent 1px)`,
          backgroundSize: '44px 44px'
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">

        {/* Screen Header Badge & Title */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 backdrop-blur-md shadow-glow-cyan">
            <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
            <span>SCREEN 06 — CRYPTOGRAPHIC SECURITY VAULT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Privacy Vault
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-cyan-300 mt-2">
            “Your information stays protected.”
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Zero retaliation architecture designed to protect students, witnesses, and whistleblowers.
          </p>
        </div>

        {/* ========================================================
            MAIN 3D OBJECT SHOWCASE:
            Large transparent metallic glass padlock floating above circular encrypted data platform
            with animated encrypted data rings
            ======================================================== */}
        <div className="relative mx-auto max-w-2xl flex flex-col items-center">
          
          {/* Animated Encrypted Data Rings (Concentric Pulsing Circles) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full border border-cyan-500/20 animate-spin-slow pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full border border-purple-500/25 border-dashed animate-reverse-spin pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[280px] h-[220px] sm:h-[280px] rounded-full border border-cyan-400/30 pointer-events-none animate-pulse" />

          {/* 3D Glass Padlock Container */}
          <div className="relative group z-10">
            {/* Ambient Shadow & Volumetric Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-700" />
            
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl p-1 bg-gradient-to-b from-cyan-400/40 via-blue-500/20 to-purple-500/30 backdrop-blur-2xl shadow-glow-cyan">
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#081522]/90 border border-cyan-400/30 flex items-center justify-center relative">
                <img 
                  src="/images/vault-padlock.jpg" 
                  alt="3D Metallic Glass Padlock Floating on Encrypted Platform" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Hash Telemetry Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#050B14]/90 border border-cyan-400/40 backdrop-blur-xl flex items-center gap-1.5 shadow-glow-cyan">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-mono text-cyan-300">AES-256 GCM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Status Indicator: Protection Status: ACTIVE */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#081522]/90 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold backdrop-blur-xl shadow-glow-safe z-10">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Protection Status: ACTIVE</span>
          </div>

        </div>

        {/* ========================================================
            THE 5 PRIVACY VAULT FEATURES:
            Encrypted Reports, Anonymous Reporting, Secure Evidence, Controlled Access, Audit Trail
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {features.map((feat) => (
            <div
              key={feat.id}
              className="p-6 rounded-2xl bg-[#081522]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 hover:bg-[#0D1C2C] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero Trust Architecture</span>
              </div>
            </div>
          ))}

          {/* Quick Action Card filling the 6th spot */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-[#081522] to-purple-950/40 border border-cyan-500/30 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider block mb-1">
                INSTITUTIONAL PLEDGE
              </span>
              <h3 className="text-base font-bold text-white mb-2">
                Anti-Retaliation Immunity
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Under UGC Anti-Ragging Mandates, any attempt by accused parties to harass, intimidate, or compromise a reporter results in immediate expulsion.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/report"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-glow-cyan transition-all"
              >
                <span>File Encrypted Report</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
