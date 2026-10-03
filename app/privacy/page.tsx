'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Database, 
  UserCheck, 
  FileText, 
  KeyRound,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-4 backdrop-blur-md shadow-glow-cyan">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span className="uppercase tracking-wider">Zero Retaliation Guarantee</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Privacy &amp; Data Protection Charter
        </h1>
        <p className="text-xs sm:text-base text-slate-400 mt-3 leading-relaxed">
          How CampusSafe cryptographically seals student identities, enforces zero-trust role isolation, and protects student reporters from retaliation.
        </p>
      </div>

      {/* Visual Privacy Indicators Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl text-center space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center mx-auto shadow-glow-purple">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-sm">256-Bit Vault Enclave</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Encrypted in transit and segregated from standard campus student records.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl text-center space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto shadow-glow-cyan">
            <EyeOff className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-sm">Blind Tracking Keys</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Status inquiries utilize random alphanumeric hashes without revealing student identities.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl text-center space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-glow-cyan">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-sm">Zero-Trust RBAC</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Suspects and non-proctor faculty are permanently barred from incident files.
          </p>
        </div>
      </div>

      {/* Detailed Q&A Explanations */}
      <div className="space-y-4">
        
        {/* Q1: What information is collected */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2.5">
            <Database className="w-5 h-5 text-violet-400" />
            <span>1. What information is collected?</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We collect the incident timestamp, physical campus location or online platform handle, description, repeat frequency, and optional evidence attachments (screenshots, audio notes, PDFs). If you select <strong>Confidential Reporting</strong>, your student ID and department are recorded to allow verified proctors to follow up directly.
          </p>
        </div>

        {/* Q2: Why it is collected */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <span>2. Why it is collected?</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Data is collected solely to protect student safety, initiate formal disciplinary proceedings, and trigger automated multi-tier escalation when repeated harassment patterns are detected against individual students or specific campus zones.
          </p>
        </div>

        {/* Q3: Who can access it */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-indigo-400" />
            <span>3. Who can access your report?</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Only designated university inquiry officers hold progressive jurisdiction:
          </p>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside pl-2">
            <li><strong>Level 1 (HOD):</strong> Head of Department receives first-time departmental cases.</li>
            <li><strong>Level 2 (Dean):</strong> Dean of Student Welfare oversees repeat complaints, hostel incidents, and disciplinary summons.</li>
            <li><strong>Level 3 (Higher Authority):</strong> The Apex Anti-Ragging Standing Tribunal handles expulsion and statutory police escalation.</li>
            <li><strong>Suspects &amp; Peers:</strong> Have <em>zero access</em> to any portion of your submission or identity.</li>
          </ul>
        </div>

        {/* Q4: How anonymous reports work */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2.5">
            <EyeOff className="w-5 h-5 text-emerald-400" />
            <span>4. How anonymous reports work</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Selecting <strong>Anonymous Report</strong> completely strips all personal identifiers (name, student email, phone). The server generates a random cryptographic tracking token (e.g., <code className="text-cyan-300 font-mono">CS-2026-8F42K</code>). You hold the only key to check case progress.
          </p>
        </div>

        {/* Q5: How complaint tracking works */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 text-amber-400" />
            <span>5. Public tracking page privacy sanitization</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The public tracking portal sanitizes all sensitive context before rendering. It displays only current inquiry stage, active jurisdiction, and non-sensitive status notices (e.g. &ldquo;Summons dispatched to suspect&rdquo;)—never revealing personal testimonies.
          </p>
        </div>

      </div>

      {/* Trust Quote Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-violet-950/40 via-navy-950 to-cyan-950/40 border border-white/10 backdrop-blur-2xl text-center space-y-3 shadow-2xl">
        <h4 className="text-lg sm:text-xl font-black text-white">
          &ldquo;Speak Up. Stay Safe. Your Privacy Is Guaranteed.&rdquo;
        </h4>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Complies strictly with statutory UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions.
        </p>
        <div className="pt-3">
          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-glow-purple transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>File a Protected Report</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
