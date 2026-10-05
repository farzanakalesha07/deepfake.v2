'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  PhoneCall, 
  HeartPulse, 
  Users, 
  MapPin, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  Clock, 
  Lock,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function EmergencyPage() {
  const { showToast } = useToast();
  const [sosSent, setSosSent] = useState(false);
  const [selectedSafeZone, setSelectedSafeZone] = useState<string | null>(null);

  const triggerTrustedContactAlert = () => {
    setSosSent(true);
    showToast(
      'Alert Transmitted',
      'Encrypted GPS coordinates dispatched to your 3 designated trusted contacts & security control.',
      'success'
    );
  };

  const safeZones = [
    { name: 'Gate 1 Central Security Post', dist: '120 meters', time: '1.5 min walk', status: '24/7 Guarded' },
    { name: 'Central Library Main Foyer', dist: '250 meters', time: '3 min walk', status: '24/7 Staffed & Monitored' },
    { name: 'Hostel Block C Guard Station', dist: '380 meters', time: '4.5 min walk', status: '24/7 Female Proctors' },
    { name: 'Campus ER & Medical Wing A', dist: '400 meters', time: '5 min walk', status: '24/7 Doctor & Ambulance' },
  ];

  return (
    <div className="relative min-h-screen bg-[#050B14] text-slate-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Volumetric Glows (Controlled Coral/Red + Deep Cyan) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-tr from-red-600/15 via-[#FF4D6D]/10 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-red-900/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#FF4D6D 1px, transparent 1px), linear-gradient(90deg, #FF4D6D 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-8 text-center">

        {/* Screen Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-red-300 text-xs font-mono backdrop-blur-md shadow-glow-danger animate-pulse">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          <span>SCREEN 08 — EMERGENCY ASSISTANCE INTERFACE</span>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Need Immediate Help?
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-md mx-auto font-normal leading-relaxed">
            One-touch emergency connection. Direct radio dispatch to campus security and emergency medical triage.
          </p>
        </div>

        {/* ========================================================
            LARGE 3D FLOATING BUTTONS (Controlled Coral/Red Glow):
            1. CAMPUS SECURITY
            2. MEDICAL SUPPORT
            ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          
          {/* Button 1: CAMPUS SECURITY */}
          <a
            href="tel:+9102025908000"
            className="group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#1C0D15] to-[#0A0508] border-2 border-[#FF4D6D]/60 hover:border-[#FF4D6D] shadow-glow-danger transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex flex-col items-center justify-between text-center overflow-hidden"
          >
            {/* Ambient Coral/Red Volumetric Glow Pulse */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D6D]/15 via-transparent to-red-500/10 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-glow-danger">
                <ShieldAlert className="w-10 h-10 animate-bounce" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-red-300/90 block mb-1">
                RAPID 90-SEC DISPATCH
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                CAMPUS SECURITY
              </h2>
              <p className="text-xs text-slate-300 mt-2 font-normal leading-relaxed">
                Connects directly to 24/7 Central Control Room &amp; Rover Patrols
              </p>
            </div>

            <div className="relative z-10 mt-6 w-full py-3 rounded-xl bg-[#FF4D6D] hover:bg-[#FF3355] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-glow-danger">
              <PhoneCall className="w-4 h-4 text-slate-950" />
              <span>CALL SECURITY NOW</span>
            </div>
          </a>

          {/* Button 2: MEDICAL SUPPORT */}
          <a
            href="tel:+9102025908999"
            className="group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#1C0D15] to-[#0A0508] border-2 border-[#FF4D6D]/60 hover:border-[#FF4D6D] shadow-glow-danger transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex flex-col items-center justify-between text-center overflow-hidden"
          >
            {/* Ambient Coral/Red Volumetric Glow Pulse */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D6D]/15 via-transparent to-red-500/10 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-glow-danger">
                <HeartPulse className="w-10 h-10 animate-pulse" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-red-300/90 block mb-1">
                24/7 ER &amp; AMBULANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                MEDICAL SUPPORT
              </h2>
              <p className="text-xs text-slate-300 mt-2 font-normal leading-relaxed">
                Campus Health Wing A, Emergency Trauma, &amp; On-Call Doctors
              </p>
            </div>

            <div className="relative z-10 mt-6 w-full py-3 rounded-xl bg-[#FF4D6D] hover:bg-[#FF3355] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-glow-danger">
              <PhoneCall className="w-4 h-4 text-slate-950" />
              <span>CALL AMBULANCE NOW</span>
            </div>
          </a>

        </div>

        {/* ========================================================
            ADDITIONAL OPTIONS:
            1. Trusted Contact
            2. Emergency Contact
            3. Safe Location
            ======================================================== */}
        <div className="pt-4 space-y-3">
          <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block">
            ADDITIONAL EMERGENCY OPTIONS
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            
            {/* Option 1: Trusted Contact */}
            <button
              onClick={triggerTrustedContactAlert}
              className="p-4 rounded-2xl bg-[#081522]/90 hover:bg-[#0D1C2C] border border-white/15 hover:border-cyan-400/40 transition-all flex flex-col justify-between group text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    GPS SOS
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Trusted Contact
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Ping 3 pre-configured friends or parents with your live coordinates.
                </p>
              </div>

              <div className="mt-3 text-[11px] font-semibold text-cyan-400 flex items-center gap-1">
                <span>{sosSent ? '✓ Alert Sent' : 'Transmit SOS'}</span>
                <Send className="w-3 h-3" />
              </div>
            </button>

            {/* Option 2: Emergency Contact */}
            <a
              href="tel:112"
              className="p-4 rounded-2xl bg-[#081522]/90 hover:bg-[#0D1C2C] border border-white/15 hover:border-red-400/40 transition-all flex flex-col justify-between group text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-300">
                    <Radio className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/30">
                    NATIONAL 112
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                  Emergency Contact
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Dial National Police / Emergency Hotline (112) or Anti-Ragging (1800-180-5522).
                </p>
              </div>

              <div className="mt-3 text-[11px] font-semibold text-red-400 flex items-center gap-1">
                <span>Dial 112 Direct</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </a>

            {/* Option 3: Safe Location */}
            <div className="p-4 rounded-2xl bg-[#081522]/90 hover:bg-[#0D1C2C] border border-white/15 hover:border-emerald-400/40 transition-all flex flex-col justify-between group text-left">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    SANCTUARY
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Safe Location
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Navigate to nearest 24/7 guarded security sanctuary post on campus.
                </p>
              </div>

              <div className="mt-3 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <span>Gate 1 (120m away)</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

          </div>
        </div>

        {/* Nearby Safe Havens Quick List */}
        <div className="rounded-2xl bg-[#081522]/80 backdrop-blur-xl border border-white/10 p-5 text-left text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Closest 24/7 Guarded Sanctuaries</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">GPS ACCURACY: &plusmn;3M</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {safeZones.map((sz) => (
              <div
                key={sz.name}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-200">{sz.name}</div>
                  <span className="text-[10px] text-slate-400 font-mono">{sz.status}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-cyan-300 block">{sz.dist}</span>
                  <span className="text-[10px] text-slate-500">{sz.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Urgent Return to Standard Portal */}
        <div className="pt-2">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors underline font-mono"
          >
            &larr; Non-urgent situation? Return to standard CampusSafe portal
          </Link>
        </div>

      </div>
    </div>
  );
}
