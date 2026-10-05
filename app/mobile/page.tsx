'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Smartphone, 
  ShieldCheck, 
  Home, 
  FileText, 
  Search, 
  BookOpen, 
  User, 
  Radio, 
  AlertTriangle, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  Bell, 
  MapPin, 
  Clock,
  Wifi,
  Battery,
  ShieldAlert,
  Sliders,
  Compass
} from 'lucide-react';

export default function MobileExperiencePage() {
  // Mobile active tab inside the smartphone
  type MobileTab = 'Home' | 'Report' | 'Track' | 'Safety' | 'Profile';
  const [mobileTab, setMobileTab] = useState<MobileTab>('Home');
  const [mobileTrackId, setMobileTrackId] = useState('');
  const [mobileIncidentType, setMobileIncidentType] = useState('Unwanted Following');

  return (
    <div className="relative min-h-screen bg-[#050B14] text-slate-100 py-10 sm:py-16 px-4 sm:px-6 overflow-hidden flex flex-col items-center">
      
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-violet-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#00F2FE 1px, transparent 1px), linear-gradient(90deg, #00F2FE 1px, transparent 1px)`,
          backgroundSize: '44px 44px'
        }}
      />

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-10">

        {/* Screen Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 backdrop-blur-md shadow-glow-cyan">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span>SCREEN 09 — MOBILE EXPERIENCE &amp; 3D DEVICE SYSTEM</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Mobile Experience
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal leading-relaxed">
            Redesigned specifically for rapid mobile reach. Zero clutter, dark glass aesthetics, and instant 1-thumb thumbzone action.
          </p>
        </div>

        {/* Split Section: Left Specs & Philosophy | Right Interactive 3D Phone Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Mobile Philosophy & Features */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="rounded-3xl bg-[#081522]/90 backdrop-blur-xl border border-white/15 p-6 sm:p-8 space-y-5 shadow-2xl">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                MOBILE-FIRST ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Purpose-Built for Distress Scenarios
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When walking alone on campus at night, students require instant, one-handed operation with high-contrast glowing elements and zero unnecessary form friction.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: 'One-Thumb Ergonomics',
                    desc: 'Primary CTAs (Emergency SOS, Report Incident) situated within the physiological natural thumb sweep zone.',
                    icon: <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  },
                  {
                    title: 'Zero-Latency Status Check',
                    desc: 'Track complaint progress in real time with haptic telemetry confirmations and push notifications.',
                    icon: <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  },
                  {
                    title: 'Offline-Ready Cryptography',
                    desc: 'Locally signs reports with client-side keys even when Wi-Fi connectivity drops in basement corridors.',
                    icon: <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  }
                ].map((item, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                    <span className="shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-white">{item.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions to Try Inside Phone */}
            <div className="p-5 rounded-2xl bg-[#081522]/70 border border-cyan-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Try the Interactive Smartphone</span>
                <span className="text-[11px] text-slate-400">Click any bottom nav tab (Home, Report, Track, Safety, Profile) to explore.</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-400/40">
                ACTIVE: {mobileTab}
              </div>
            </div>

          </div>

          {/* Right Column: The 3D Titanium Smartphone Mockup Frame */}
          <div className="lg:col-span-6 flex justify-center">
            
            {/* Outer Titanium Phone Shell with Realistic 3D Reflections */}
            <div className="relative w-[340px] sm:w-[380px] h-[720px] rounded-[52px] p-[12px] bg-gradient-to-b from-slate-700 via-slate-900 to-black border-4 border-slate-700/60 shadow-[0_25px_60px_-15px_rgba(0,242,254,0.35)] relative overflow-hidden group">
              
              {/* Outer Metallic Bezel Shine */}
              <div className="absolute inset-0 rounded-[48px] border border-cyan-400/30 pointer-events-none" />

              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-end px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
              </div>

              {/* Phone Inner Screen (Dark Glass 3D UI) */}
              <div className="w-full h-full rounded-[40px] bg-[#050B14] overflow-hidden flex flex-col justify-between relative border border-white/10 select-none">
                
                {/* 1. Phone Top Status Bar */}
                <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-mono text-slate-400 z-30">
                  <span className="font-bold text-slate-300">9:41</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-slate-400" />
                    <Battery className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>

                {/* 2. Scrollable Mobile Screen Body */}
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 no-scrollbar">

                  {/* ========================================================
                      MOBILE SCREEN: HOME VIEW
                      ======================================================== */}
                  {mobileTab === 'Home' && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      
                      {/* Top Brand & Notification */}
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                            CAMPUSSAFE MOBILE
                          </div>
                          <h3 className="text-lg font-black text-white">Speak Up. Stay Safe.</h3>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                          <Bell className="w-4 h-4 text-cyan-400" />
                        </div>
                      </div>

                      {/* Safety Status Card */}
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border border-cyan-500/40 shadow-glow-cyan">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono uppercase text-cyan-300 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            SAFETY STATUS
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">ACTIVE</span>
                        </div>
                        <div className="text-xs font-bold text-white">Campus Perimeter Guarded</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">8 Night Patrols Stationed &bull; Zero Incidents in 2h</div>
                      </div>

                      {/* Action 1: Report Incident Card */}
                      <div 
                        onClick={() => setMobileTab('Report')}
                        className="cursor-pointer p-4 rounded-2xl bg-[#081522] border border-white/15 hover:border-cyan-400/50 transition-all flex items-center justify-between group/card"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                            <FileText className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Report Incident</div>
                            <div className="text-[10px] text-slate-400">Encrypted 256-bit submission</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover/card:translate-x-1 transition-transform" />
                      </div>

                      {/* Action 2: Track Complaint Card */}
                      <div 
                        onClick={() => setMobileTab('Track')}
                        className="cursor-pointer p-4 rounded-2xl bg-[#081522] border border-white/15 hover:border-cyan-400/50 transition-all flex items-center justify-between group/card"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                            <Search className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Track Complaint</div>
                            <div className="text-[10px] text-slate-400">Live timeline &amp; authority status</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover/card:translate-x-1 transition-transform" />
                      </div>

                      {/* Action 3: Safety Guide & Privacy Tiles */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div 
                          onClick={() => setMobileTab('Safety')}
                          className="cursor-pointer p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 transition-all"
                        >
                          <BookOpen className="w-4 h-4 text-cyan-400 mb-1.5" />
                          <div className="text-[11px] font-bold text-white">Safety Guide</div>
                          <div className="text-[9px] text-slate-400 mt-0.5">Know rights &amp; checklists</div>
                        </div>

                        <Link 
                          href="/privacy"
                          className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-400/40 transition-all"
                        >
                          <Lock className="w-4 h-4 text-purple-400 mb-1.5" />
                          <div className="text-[11px] font-bold text-white">Privacy Vault</div>
                          <div className="text-[9px] text-slate-400 mt-0.5">Zero-knowledge proof</div>
                        </Link>
                      </div>

                      {/* Emergency SOS Banner */}
                      <Link
                        href="/emergency"
                        className="block p-3 rounded-2xl bg-gradient-to-r from-red-950/80 to-red-900/60 border border-red-500/40 text-center shadow-glow-danger"
                      >
                        <span className="text-[11px] font-bold text-white flex items-center justify-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                          <span>EMERGENCY SOS: 1-TOUCH DISPATCH</span>
                        </span>
                      </Link>

                    </div>
                  )}

                  {/* ========================================================
                      MOBILE SCREEN: REPORT VIEW
                      ======================================================== */}
                  {mobileTab === 'Report' && (
                    <div className="space-y-3.5 animate-in fade-in duration-200">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase">MOBILE REPORT</span>
                        <h3 className="text-base font-bold text-white">Choose Incident Type</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {['Harassment', 'Threat', 'Unwanted Following', 'Bullying'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setMobileIncidentType(type)}
                            className={`p-3 rounded-xl border text-left text-xs transition-all ${
                              mobileIncidentType === type
                                ? 'bg-cyan-950/50 border-cyan-400 text-white font-bold shadow-glow-cyan'
                                : 'bg-white/5 border-white/10 text-slate-300'
                            }`}
                          >
                            <span>{type}</span>
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Location On Campus</label>
                        <input
                          type="text"
                          placeholder="e.g. North Cafeteria Pathway"
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Brief Description</label>
                        <textarea
                          rows={3}
                          placeholder="State what occurred..."
                          className="w-full p-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-500"
                        />
                      </div>

                      <Link
                        href="/report"
                        className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs text-center shadow-glow-cyan"
                      >
                        Continue to Full Locker &rarr;
                      </Link>
                    </div>
                  )}

                  {/* ========================================================
                      MOBILE SCREEN: TRACK VIEW
                      ======================================================== */}
                  {mobileTab === 'Track' && (
                    <div className="space-y-3.5 animate-in fade-in duration-200">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase">MOBILE MONITOR</span>
                        <h3 className="text-base font-bold text-white">Track Complaint</h3>
                      </div>

                      <div className="p-3 rounded-xl bg-[#081522] border border-cyan-500/30">
                        <div className="text-[10px] font-mono text-slate-400">ACTIVE DOSSIER</div>
                        <div className="text-sm font-mono font-bold text-cyan-300">CS-20481</div>
                        <div className="text-[10px] text-emerald-400 mt-1 font-semibold">&bull; Under Review (Level 2)</div>
                      </div>

                      {/* Mini Vertical Pulse Timeline */}
                      <div className="space-y-2 text-xs pl-2 border-l-2 border-cyan-400">
                        <div className="pl-2">
                          <div className="font-bold text-white">01 Received &bull; 10:42 AM</div>
                          <div className="text-[10px] text-slate-400">Cryptographically signed</div>
                        </div>
                        <div className="pl-2">
                          <div className="font-bold text-cyan-300">02 Under Review &bull; Active</div>
                          <div className="text-[10px] text-slate-400">Dr. V. Raman assigned</div>
                        </div>
                        <div className="pl-2 opacity-50">
                          <div className="text-slate-400">03 Investigating</div>
                        </div>
                      </div>

                      <Link
                        href="/track?id=CS-20481"
                        className="block w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-center text-xs font-semibold text-slate-200"
                      >
                        Open Detailed Audit Trail
                      </Link>
                    </div>
                  )}

                  {/* ========================================================
                      MOBILE SCREEN: SAFETY VIEW
                      ======================================================== */}
                  {mobileTab === 'Safety' && (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase">SAFETY DIRECTORY</span>
                        <h3 className="text-base font-bold text-white">Rapid Campus Havens</h3>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex justify-between">
                          <div>
                            <div className="font-bold text-white">Gate 1 Security</div>
                            <div className="text-[10px] text-slate-400">120m away &bull; 24/7 Guarded</div>
                          </div>
                          <span className="text-cyan-400 font-mono font-bold">1.5m</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex justify-between">
                          <div>
                            <div className="font-bold text-white">Library Foyer</div>
                            <div className="text-[10px] text-slate-400">250m away &bull; Staffed</div>
                          </div>
                          <span className="text-cyan-400 font-mono font-bold">3m</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex justify-between">
                          <div>
                            <div className="font-bold text-white">Hostel Block C Desk</div>
                            <div className="text-[10px] text-slate-400">380m away &bull; Female Guards</div>
                          </div>
                          <span className="text-cyan-400 font-mono font-bold">4m</span>
                        </div>
                      </div>

                      <Link
                        href="/safety"
                        className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs text-center"
                      >
                        View Full 3D Safety Guide
                      </Link>
                    </div>
                  )}

                  {/* ========================================================
                      MOBILE SCREEN: PROFILE VIEW
                      ======================================================== */}
                  {mobileTab === 'Profile' && (
                    <div className="space-y-3.5 animate-in fade-in duration-200">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase">USER CREDENTIALS</span>
                        <h3 className="text-base font-bold text-white">Identity Sanctuary</h3>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <span className="text-slate-400">Status</span>
                          <span className="font-bold text-emerald-400 font-mono">ANONYMOUS MODE</span>
                        </div>
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <span className="text-slate-400">Saved Reports</span>
                          <span className="font-bold text-white font-mono">1 active</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Encrypted Token</span>
                          <span className="font-bold text-cyan-300 font-mono">HASH-89B</span>
                        </div>
                      </div>

                      <Link
                        href="/authority"
                        className="block w-full py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 font-bold text-xs text-center"
                      >
                        Switch to Investigator Login
                      </Link>
                    </div>
                  )}

                </div>

                {/* ========================================================
                    3. EXACT BOTTOM NAVIGATION REQUESTED:
                    Home, Report, Track, Safety, Profile
                    ======================================================== */}
                <div className="border-t border-white/10 bg-[#081522]/95 backdrop-blur-xl px-2 py-2 flex items-center justify-around z-30">
                  {[
                    { id: 'Home', icon: <Home className="w-4 h-4" /> },
                    { id: 'Report', icon: <FileText className="w-4 h-4" /> },
                    { id: 'Track', icon: <Search className="w-4 h-4" /> },
                    { id: 'Safety', icon: <BookOpen className="w-4 h-4" /> },
                    { id: 'Profile', icon: <User className="w-4 h-4" /> },
                  ].map((tab) => {
                    const active = mobileTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setMobileTab(tab.id as MobileTab)}
                        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
                          active
                            ? 'text-cyan-400 font-bold scale-105'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <span className={active ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]' : ''}>
                          {tab.icon}
                        </span>
                        <span className="text-[9px] font-mono">{tab.id}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Home Indicator Bar */}
                <div className="pb-1.5 pt-1 flex justify-center bg-[#081522]/95">
                  <div className="w-28 h-1 rounded-full bg-slate-600" />
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
