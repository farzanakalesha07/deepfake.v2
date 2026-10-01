'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  Lock, 
  Send, 
  CheckCircle2, 
  Radio, 
  Building2, 
  ChevronRight,
  Fingerprint,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-violet/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Showcase Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-navy-800/90 via-navy-900/95 to-navy-950 border border-white/10 shadow-2xl shadow-purple-950/40 backdrop-blur-2xl overflow-hidden">
        
        {/* Top Header Mockup */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] text-slate-400 font-mono ml-2">campus-safe://secure-portal</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
            <Lock className="w-3 h-3" />
            <span>Encrypted Tunnel</span>
          </div>
        </div>

        {/* Central Student-on-Campus Interaction Graphic */}
        <div className="my-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
          
          {/* Simulated Mobile Device Preview */}
          <div className="sm:col-span-7 bg-navy-950/80 rounded-2xl p-4 border border-purple-500/30 shadow-inner relative group">
            
            {/* Phone Top Notch */}
            <div className="w-16 h-3.5 bg-navy-800 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-600" />
            </div>

            {/* In-app reporting preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  Student Mobile Report
                </span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                  Anonymous Mode
                </span>
              </div>

              {/* Chat / Report snippet */}
              <div className="p-3 rounded-xl bg-navy-900 border border-white/5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-200">Incident Category</span>
                </div>
                <div className="text-xs text-cyan-300 font-semibold bg-cyan-950/50 p-2 rounded-lg border border-cyan-800/40">
                  Online Harassment & Threats
                </div>
                <div className="text-[11px] text-slate-400">
                  &ldquo;Abusive comments and threatening direct messages received...&rdquo;
                </div>
              </div>

              {/* Status pill inside phone */}
              <div className="p-2.5 rounded-xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-between text-[11px]">
                <span className="text-slate-300 font-medium">Generated ID:</span>
                <span className="font-mono text-cyan-300 font-bold tracking-wider">CS-2026-8F42K</span>
              </div>
            </div>

            {/* Glowing signal line */}
            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>Campus Security Mesh Active</span>
            </div>
          </div>

          {/* Right Authority Response Flow Card */}
          <div className="sm:col-span-5 space-y-3">
            
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-900/40 to-navy-900 border border-purple-500/20 shadow-md">
              <div className="flex items-center gap-2 mb-1.5">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-slate-200">Auto Escalation</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                1st Report → HOD<br />
                2nd Report → Dean<br />
                3rd Report → Anti-Ragging Cell
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950/50 to-navy-900 border border-cyan-500/20 shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <Fingerprint className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-200">Zero Identity Leak</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Victim credentials stay locked in cryptographically protected vault.
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Verification Banner */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Approved by Student Welfare & University Safety Board</span>
          </div>
          <div className="text-[11px] text-cyan-400 font-medium">
            24/7 Rapid Intake Engine
          </div>
        </div>

      </div>
    </div>
  );
};
