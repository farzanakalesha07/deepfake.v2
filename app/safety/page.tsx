'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Lock, 
  Shield, 
  Phone, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  MapPin,
  HeartHandshake,
  BookOpen,
  Eye,
  FileText
} from 'lucide-react';

export default function SafetyGuidePage() {
  const [activeTile, setActiveTile] = useState<string>('Personal Safety');

  // The 5 Floating 3D Glass Tiles specified:
  // Personal Safety (compass), Digital Safety (lock), Harassment Support (shield),
  // Emergency Response (emergency beacon), Campus Resources (phone)
  const tiles = [
    {
      id: 'Personal Safety',
      title: 'Personal Safety',
      objectName: '3D Navigational Compass',
      objectType: 'compass',
      tagline: 'Physical Campus Security & Night Navigation',
      accent: 'from-cyan-500/20 via-blue-500/10 to-transparent border-cyan-400/40 shadow-glow-cyan',
      iconGlow: 'text-cyan-400 shadow-glow-cyan',
      description: 'Tactical guidelines for late-night movement between libraries, labs, hostels, and secluded walkways.',
      checkpoints: [
        'Utilize illuminated campus transit corridors equipped with high-density CCTV coverage.',
        'Request 24/7 Proctorial Security Escort after 21:00 for transit between North and South campuses.',
        'Memorize the 8 Blue Emergency Towers positioned at 150m intervals along main walkways.',
        'Never travel alone through unlit sports complex perimeters or hostel basements.'
      ],
      quickStats: { label: 'Active Safe Corridors', value: '14 Monitored Zones' }
    },
    {
      id: 'Digital Safety',
      title: 'Digital Safety',
      objectName: '3D Encrypted Lock',
      objectType: 'lock',
      tagline: 'Cyber Harassment, Doxxing & Social Defense',
      accent: 'from-purple-500/20 via-indigo-500/10 to-transparent border-purple-400/40 shadow-glow-purple',
      iconGlow: 'text-purple-400 shadow-glow-purple',
      description: 'Preserving digital chain-of-custody, preventing impersonation, and thwarting cyber bullying.',
      checkpoints: [
        'Capture full-screen evidence including sender handle, timestamp, and network link.',
        'Never delete abusive messages or audio notes before exporting cryptographic hashes.',
        'Report impersonator accounts directly to IT Security for instantaneous network-level blocking.',
        'Audit social privacy settings to prevent unauthorized geolocation extraction.'
      ],
      quickStats: { label: 'Cryptographic Integrity', value: 'SHA-256 Vault' }
    },
    {
      id: 'Harassment Support',
      title: 'Harassment Support',
      objectName: '3D Iridescent Shield',
      objectType: 'shield',
      tagline: 'Institutional Rights & Anti-Ragging Mandate',
      accent: 'from-blue-500/20 via-cyan-500/10 to-transparent border-blue-400/40 shadow-blue-500/20',
      iconGlow: 'text-blue-400 shadow-glow-cyan',
      description: 'Statutory protections under UGC Anti-Ragging Regulations and zero-tolerance campus mandates.',
      checkpoints: [
        'Zero Tolerance: Even verbal intimidation or forced senior servitude is punishable by rustication.',
        'Identity Sanctuary: Reporters are legally shielded from retaliation or academic harassment.',
        'Independent Committee: Multi-stakeholder oversight prevents departmental bias or cover-ups.',
        'Free Psychological Counseling available 24/7 through the Student Wellness Division.'
      ],
      quickStats: { label: 'Legal Mandate', value: 'UGC Reg. 2009' }
    },
    {
      id: 'Emergency Response',
      title: 'Emergency Response',
      objectName: '3D Emergency Beacon',
      objectType: 'emergency beacon',
      tagline: 'Immediate Tactical Intervention & Dispatch',
      accent: 'from-rose-500/20 via-red-500/10 to-transparent border-rose-400/40 shadow-glow-danger',
      iconGlow: 'text-rose-400 shadow-glow-danger',
      description: 'Critical protocols for immediate danger, physical stalking, or imminent threats.',
      checkpoints: [
        'Trigger Mobile SOS or Campus Emergency Beacon for instantaneous 90-second guard dispatch.',
        'Immediate evacuation to the nearest 24/7 Guarded Gatehouse or Library Reception.',
        'Automatic GPS beacon broadcast to designated emergency contacts upon SOS confirmation.',
        'On-demand medical ambulance triage stationed at Campus Health Wing A.'
      ],
      quickStats: { label: 'Mean Response Time', value: '< 90 Seconds' }
    },
    {
      id: 'Campus Resources',
      title: 'Campus Resources',
      objectName: '3D Secure Communicator',
      objectType: 'phone',
      tagline: 'Verified Institutional Hotlines & Support Hubs',
      accent: 'from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-400/40 shadow-glow-safe',
      iconGlow: 'text-emerald-400 shadow-glow-safe',
      description: 'Direct phone lines to proctorial deans, gender sensitization cells, and campus ambulances.',
      checkpoints: [
        'Central Security Control: +91 (020) 2590-8000 (Direct Radio Dispatch)',
        'Women\'s Safety Cell: 1091 / +91 (020) 2590-8111 (Confidential Officers)',
        'National Anti-Ragging Toll-Free: 1800-180-5522 (Govt of India 24/7)',
        'Emergency Medical Ambulance: +91 (020) 2590-8999 (Internal Speed Dial 99)'
      ],
      quickStats: { label: 'Hotline Readiness', value: '100% Redundant' }
    }
  ];

  const selectedData = tiles.find(t => t.id === activeTile) || tiles[0];

  return (
    <div className="relative min-h-screen bg-[#050B14] text-slate-100 py-10 sm:py-16 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Volumetric Glows (Cyan + Blue + Violet) */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Cyber Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#00F2FE 1px, transparent 1px), linear-gradient(90deg, #00F2FE 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">

        {/* Screen Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 backdrop-blur-md shadow-glow-cyan">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>SCREEN 05 — 3D SAFETY RESOURCE INTERFACE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Safety Guide
          </h1>
          <p className="text-base sm:text-lg text-cyan-200/90 font-medium mt-2">
            “Know your rights. Stay prepared.”
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto font-normal">
            Essential tactical protocols, evidence preservation checklists, and institutional protections designed for collegiate environments.
          </p>
        </div>

        {/* ========================================================
            THE 5 FLOATING 3D GLASS TILES:
            Personal Safety, Digital Safety, Harassment Support, Emergency Response, Campus Resources
            ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tiles.map((tile) => {
            const isActive = activeTile === tile.id;
            return (
              <div
                key={tile.id}
                onClick={() => setActiveTile(tile.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative group flex flex-col justify-between backdrop-blur-xl ${
                  isActive
                    ? `bg-[#0D1C2C] ${tile.accent} scale-[1.03] z-20`
                    : 'bg-[#081522]/80 border-white/10 hover:border-cyan-500/40 hover:bg-[#0D1C2C]/90'
                }`}
              >
                <div>
                  {/* Realistic 3D Object Representation */}
                  <div className="relative mb-5 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/15 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                      
                      {/* Ambient volumetric cone glow inside */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-violet-500/20 blur-sm pointer-events-none" />

                      {tile.objectType === 'compass' && (
                        <div className="relative flex flex-col items-center justify-center">
                          <Compass className="w-9 h-9 text-cyan-300 transform group-hover:rotate-45 transition-transform duration-700" />
                          <span className="text-[8px] font-mono text-cyan-400 mt-1 uppercase">3D Compass</span>
                        </div>
                      )}

                      {tile.objectType === 'lock' && (
                        <div className="relative flex flex-col items-center justify-center">
                          <Lock className="w-9 h-9 text-purple-300 transform group-hover:-translate-y-1 transition-transform duration-500" />
                          <span className="text-[8px] font-mono text-purple-400 mt-1 uppercase">3D Lock</span>
                        </div>
                      )}

                      {tile.objectType === 'shield' && (
                        <div className="relative flex flex-col items-center justify-center">
                          <Shield className="w-9 h-9 text-blue-300 transform group-hover:scale-110 transition-transform duration-500" />
                          <span className="text-[8px] font-mono text-blue-400 mt-1 uppercase">3D Shield</span>
                        </div>
                      )}

                      {tile.objectType === 'emergency beacon' && (
                        <div className="relative flex flex-col items-center justify-center">
                          <Radio className="w-9 h-9 text-rose-400 animate-pulse" />
                          <span className="text-[8px] font-mono text-rose-400 mt-1 uppercase">3D Beacon</span>
                        </div>
                      )}

                      {tile.objectType === 'phone' && (
                        <div className="relative flex flex-col items-center justify-center">
                          <Phone className="w-9 h-9 text-emerald-300 transform group-hover:rotate-12 transition-transform duration-500" />
                          <span className="text-[8px] font-mono text-emerald-400 mt-1 uppercase">3D Phone</span>
                        </div>
                      )}

                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {tile.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {tile.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className={`text-[10px] font-mono ${isActive ? 'text-cyan-300 font-bold' : 'text-slate-500'}`}>
                    {isActive ? '● VIEWING' : 'EXPLORE'}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'rotate-90 text-cyan-400' : 'text-slate-500'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================
            SELECTED CATEGORY DEEP DIVE GLASS PANEL
            ======================================================== */}
        <div className="rounded-3xl bg-[#081522]/90 backdrop-blur-2xl border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle top light bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Title & Checkpoints */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3D RESOURCE DEEP DIVE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedData.title} Protocol
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {selectedData.description}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Mandatory Safety Checkpoints
                </h4>
                <div className="space-y-2.5">
                  {selectedData.checkpoints.map((pt, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-cyan-500/30 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Col: 3D Hologram Stats & Quick Action */}
            <div className="flex flex-col justify-between rounded-2xl bg-[#050B14]/80 border border-cyan-500/30 p-6 shadow-glow-cyan">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-slate-400">OBJECT MATRIX</span>
                  <span className="text-xs font-mono font-bold text-cyan-300">{selectedData.objectName}</span>
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase block mb-1">
                    {selectedData.quickStats.label}
                  </span>
                  <span className="text-xl font-mono font-bold text-white">
                    {selectedData.quickStats.value}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  CampusSafe resources are continuously updated with collegiate administration, police liaison officers, and anti-ragging committees.
                </p>
              </div>

              <div className="pt-6 space-y-3">
                <Link
                  href="/report"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-glow-cyan transition-all"
                >
                  <span>Report Related Incident</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </Link>

                <Link
                  href="/emergency"
                  className="w-full py-2.5 px-4 rounded-xl bg-red-950/50 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>Immediate Emergency SOS</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
