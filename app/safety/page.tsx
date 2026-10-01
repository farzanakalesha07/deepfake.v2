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
  HeartHandshake
} from 'lucide-react';

export default function SafetyGuidePage() {
  return (
    <div className="min-h-screen py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3">
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>STUDENT SAFETY PROTOCOL</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Campus Safety Guide &amp; Checklist
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
          Actionable steps to protect yourself, preserve critical evidence, and access rapid campus support whenever you feel threatened.
        </p>
      </div>

      {/* =========================================
          EMERGENCY ASSISTANCE SECTION (Prompt requirement: Prominent, verified)
          ========================================= */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-rose-950/60 via-navy-900 to-purple-950/60 border border-rose-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-7 h-7 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Immediate Emergency Assistance
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  24/7 ACTIVE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                If you are in immediate physical danger, do not wait for online intake. Use these direct verified helplines immediately.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="tel:18001805522"
              className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>National Anti-Ragging: 1800-180-5522</span>
            </a>
            <a
              href="tel:112"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs sm:text-sm font-bold flex items-center gap-2 border border-white/20 transition-all"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
              <span>National Emergency: 112</span>
            </a>
          </div>
        </div>

        {/* Directory cards */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-navy-950/60 border border-white/5">
            <div className="font-semibold text-slate-200">Campus Security Control Room</div>
            <div className="text-cyan-400 font-mono mt-1 font-bold">+91 (020) 2590-8000</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Main Gate Post (24 Hours)</div>
          </div>
          <div className="p-3.5 rounded-xl bg-navy-950/60 border border-white/5">
            <div className="font-semibold text-slate-200">Women&apos;s Safety Helpline</div>
            <div className="text-purple-300 font-mono mt-1 font-bold">1091 / +91 (020) 2590-8111</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Confidential female proctors</div>
          </div>
          <div className="p-3.5 rounded-xl bg-navy-950/60 border border-white/5">
            <div className="font-semibold text-slate-200">Student Counseling Cell</div>
            <div className="text-emerald-300 font-mono mt-1 font-bold">+91 (020) 2590-8444</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Health Centre, 2nd Floor</div>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 1: "IF YOU FEEL UNSAFE"
          ========================================= */}
      <div className="rounded-3xl p-6 sm:p-10 bg-navy-900/90 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Physical / On-Campus Incidents
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            If You Feel Unsafe
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Immediate steps to defuse physical harassment and reach safety.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-300 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-white text-sm">Move to a Safe / Public Location</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If someone is following, staring, or intimidating you, immediately head toward well-lit, populated areas: the Central Library, Cafeteria, Administrative Block, or Security Booth.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-300 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-white text-sm">Contact Trusted Staff or Security</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Alert campus security officers stationed near gates or contact your hostel warden. Do not confront an aggressive group alone.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-300 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-white text-sm">Preserve Relevant Evidence</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Note down timestamps, precise location spots, clothing details, license numbers of two-wheelers, or names of witnesses present.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-300 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h3 className="font-bold text-white text-sm">Report the Incident on CampusSafe</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              File a confidential or anonymous report through this portal. Repeated offenses trigger automatic high-authority escalation.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 2: "ONLINE SAFETY"
          ========================================= */}
      <div className="rounded-3xl p-6 sm:p-10 bg-navy-900/90 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Digital / Cyber Defense
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            Online Safety Guidelines
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            How to handle cyber harassment, fake accounts, blackmail, and unwanted digital outreach.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-300 flex items-center justify-center font-bold text-sm">
              A
            </div>
            <h3 className="font-bold text-white text-sm">Do Not Share Sensitive Information</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never share OTPs, hostel room numbers, class schedules, or private media with unfamiliar social handles claiming to be senior batches or college clubs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-300 flex items-center justify-center font-bold text-sm">
              B
            </div>
            <h3 className="font-bold text-white text-sm">Save Screenshots of Concerning Messages</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Capture full screen context including timestamps, sender handles, phone numbers, and profile URL links before blocking or before messages are deleted.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-300 flex items-center justify-center font-bold text-sm">
              C
            </div>
            <h3 className="font-bold text-white text-sm">Report Suspicious Accounts</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Report the profile directly through the hosting platform (Instagram, WhatsApp, Discord) and upload the report receipt to our CampusSafe portal.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-300 flex items-center justify-center font-bold text-sm">
              D
            </div>
            <h3 className="font-bold text-white text-sm">Use Privacy Settings</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Keep social profiles private, restrict direct messages from non-followers, and remove college batch tags from public bios.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-white/10 space-y-4">
        <h3 className="text-xl font-bold text-white">Need to report an incident now?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Your report will be reviewed by trained faculty proctors in strict confidence.
        </p>
        <Link
          href="/report"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm shadow-glow-purple hover:opacity-95 transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>Launch Secure Complaint Wizard</span>
        </Link>
      </div>

    </div>
  );
}
