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
  AlertTriangle, 
  CheckCircle2, 
  LifeBuoy, 
  FileText, 
  ExternalLink,
  Users,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function SafetyGuidePage() {
  const safeZones = [
    { name: 'Security Main Gate (Gate 1)', loc: 'South Campus Avenue', time: '24/7 Guarded', dist: 'Immediate response' },
    { name: 'Dean & Proctor Office Foyer', loc: 'Administrative Complex, Floor 1', time: '24/7 Guarded', dist: 'Senior proctors' },
    { name: 'Central Library Main Entrance', loc: 'Academic Zone Central', time: '24/7 Guarded', dist: 'CCTV monitored' },
    { name: 'Student Centre Security Kiosk', loc: 'North Quadrangle', time: '24/7 Guarded', dist: 'Guard station' },
    { name: 'Girls Hostel Guard Post (Block C)', loc: 'East Residential Sector', time: '24/7 CCTV & Guards', dist: 'Female security staff' },
    { name: 'Campus Health Centre & ER', loc: 'Hospital Road, Wing A', time: '24/7 Medical Team', dist: 'Immediate triage' },
    { name: 'Tech Tower CCTV Command Center', loc: 'CS/IT Block Ground Floor', time: '24/7 Surveillance', dist: 'Direct radio link' },
    { name: 'Sports Complex Pavilion Desk', loc: 'West Grounds', time: '06:00 - 23:00 Guarded', dist: 'Patrol rover post' },
  ];

  return (
    <div className="min-h-screen py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-3">
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>STUDENT PROTECTION PROTOCOL</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Campus Safety Guide &amp; Checklist
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
          Actionable steps to protect yourself, preserve critical evidence, and access rapid campus support whenever you feel threatened.
        </p>
      </div>

      {/* ========================================================
          EMERGENCY ASSISTANCE SECTION
          ======================================================== */}
      <div className="rounded-[28px] p-6 sm:p-8 bg-gradient-to-r from-red-950/30 via-[#080D24] to-purple-950/30 border border-red-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-7 h-7 text-red-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Immediate Emergency Assistance
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                  24/7 ACTIVE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                If you are in immediate physical danger, do not wait. Use these direct verified emergency hotlines immediately.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="tel:18001805522"
              className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-glow-danger transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>National Anti-Ragging: 1800-180-5522</span>
            </a>
            <a
              href="tel:112"
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs sm:text-sm font-bold flex items-center gap-2 border border-white/20 transition-all"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
              <span>National Emergency: 112</span>
            </a>
          </div>
        </div>

        {/* Directory cards */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="font-semibold text-slate-200">Campus Security Control Room</div>
            <div className="text-cyan-400 font-mono mt-1 font-bold">+91 (020) 2590-8000</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Main Gate Post (24 Hours)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="font-semibold text-slate-200">Women&apos;s Safety Helpline</div>
            <div className="text-purple-300 font-mono mt-1 font-bold">1091 / +91 (020) 2590-8111</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Confidential female proctors</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="font-semibold text-slate-200">Student Counseling Cell</div>
            <div className="text-emerald-300 font-mono mt-1 font-bold">+91 (020) 2590-8444</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Health Centre, 2nd Floor</div>
          </div>
        </div>
      </div>

      {/* ========================================================
          EVIDENCE PRESERVATION CHECKLIST
          ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Offline Checklist */}
        <div className="glass-card p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Offline Incident Checklist</h3>
              <p className="text-xs text-slate-400">Physical stalking, cafeteria or hostel bullying</p>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-slate-300 pt-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>Note exact time and landmark location immediately on your phone.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>Remember clothing, vehicle registration numbers, or recognizable senior names.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>Identify bystander witnesses or cameras covering the corridor.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>Head directly to any of the 8 campus safe zones staffed by 24/7 guards.</span>
            </li>
          </ul>
        </div>

        {/* Online Checklist */}
        <div className="glass-card p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Online Cyber Harassment Checklist</h3>
              <p className="text-xs text-slate-400">Fake profiles, abusive WhatsApp or Instagram DMs</p>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-slate-300 pt-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Take full-screen screenshots showing user handles, URLs, and date-time stamps.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Export WhatsApp chat logs (.txt) including media before accounts are deleted.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Do not delete abusive messages or alter timestamps.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Attach screenshots to Step 3 of the CampusSafe confidential report form.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* ========================================================
          CAMPUS SAFE ZONES (8 Locations)
          ======================================================== */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>Campus Safe Zones Directory (8 Guarded Locations)</span>
            </h3>
            <p className="text-xs text-slate-400">
              These verified safe points maintain direct intercom lines to security and proctorial staff.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            24/7 CCTV &amp; Security Guard Presence
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {safeZones.map((z, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors">
              <div className="text-[10px] font-mono text-emerald-400 mb-1">{z.time}</div>
              <h4 className="text-xs font-bold text-white mb-1">{z.name}</h4>
              <p className="text-[11px] text-slate-400 mb-2">{z.loc}</p>
              <span className="text-[10px] text-cyan-300 font-mono">{z.dist}</span>
            </div>
          ))}
        </div>
      </div>

      {/* UGC Regulations Callout */}
      <div className="p-6 rounded-[28px] bg-white/[0.04] border border-white/12 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Supreme Court &amp; UGC Mandate</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Ragging in any form is a non-bailable cognizable criminal offense punishable under Indian Penal Code and University Regulations.
            </p>
          </div>
        </div>

        <Link
          href="/report"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white text-xs font-bold flex items-center gap-2 shadow-glow-purple transition-all shrink-0"
        >
          <span>Report an Incident &rarr;</span>
        </Link>
      </div>

    </div>
  );
}
