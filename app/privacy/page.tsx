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
  Sparkles
} from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-3">
          <Lock className="w-3.5 h-3.5" />
          <span>ZERO RETALIATION PRIVACY GUARANTEE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Privacy &amp; Data Protection Charter
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          How CampusSafe cryptographically isolates student identities, enforces role-based restrictions, and protects whistleblowers.
        </p>
      </div>

      {/* Visual Privacy Indicators Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-sm">256-Bit Ingestion Vault</h3>
          <p className="text-xs text-slate-400">
            Encrypted in transit and segregated from standard campus SIS records.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto">
            <EyeOff className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-sm">Blind Tracking Keys</h3>
          <p className="text-xs text-slate-400">
            Complaint tracking uses alphanumeric hashes without exposing names.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-sm">Role-Gated Access (RBAC)</h3>
          <p className="text-xs text-slate-400">
            Suspects and unvetted personnel are barred from all complaint records.
          </p>
        </div>
      </div>

      {/* Detailed Q&A Explanations */}
      <div className="space-y-6">
        
        {/* Q1: What information is collected */}
        <div className="p-6 rounded-3xl bg-navy-900/70 border border-white/10 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" />
            1. What information is collected?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We collect the incident timestamp, campus location or online platform handle, description, frequency, and optional evidence attachments (screenshots, PDFs). If you choose <strong>Confidential Reporting</strong>, your name, student ID, department, and phone number are recorded to assist the proctor in follow-up.
          </p>
        </div>

        {/* Q2: Why it is collected */}
        <div className="p-6 rounded-3xl bg-navy-900/70 border border-white/10 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            2. Why it is collected?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Data is collected solely to substantiate disciplinary action, deter campus ragging, and trigger automated multi-tier escalation when repeated harassment patterns are identified against the same individuals or locations.
          </p>
        </div>

        {/* Q3: Who can access it */}
        <div className="p-6 rounded-3xl bg-navy-900/70 border border-white/10 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-400" />
            3. Who can access your information?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Only designated university inquiry officers hold jurisdiction:
          </p>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside pl-2">
            <li><strong>Level 1 (HOD):</strong> Head of Department receives preliminary cases.</li>
            <li><strong>Level 2 (Dean):</strong> Dean of Student Affairs accesses escalated or repeated reports.</li>
            <li><strong>Level 3 (Higher Authority):</strong> The Apex Anti-Ragging Standing Tribunal reviews critical matters.</li>
            <li><strong>Suspects &amp; Peers:</strong> Have <em>zero access</em> to any portion of your submission.</li>
          </ul>
        </div>

        {/* Q4: How anonymous reports work */}
        <div className="p-6 rounded-3xl bg-navy-900/70 border border-white/10 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-emerald-400" />
            4. How anonymous reports work
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Selecting <strong>Anonymous Report</strong> completely drops name and student ID fields. The server generates a random alphanumeric Complaint ID (e.g., <code className="text-cyan-300 font-mono">CS-2026-8F42K</code>). There is no user account or login tie-in. You hold the only cryptographic key to check your case status.
          </p>
        </div>

        {/* Q5: How complaint tracking works */}
        <div className="p-6 rounded-3xl bg-navy-900/70 border border-white/10 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-amber-400" />
            5. How complaint tracking works without exposing identity
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The public tracking page sanitizes all personal data before rendering. It displays only the timeline stage, current authority jurisdiction, and generic action updates (e.g. &ldquo;Summons dispatched to suspect&rdquo;)—never exposing student names or confidential testimonies.
          </p>
        </div>

      </div>

      {/* Trust Quote Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/30 to-navy-900 border border-purple-500/20 text-center space-y-3">
        <h4 className="text-base font-bold text-white">
          &ldquo;Speak Up. Stay Safe. Your Privacy Protected.&rdquo;
        </h4>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Complies with the University Grants Commission (UGC) Regulations on Curbing the Menace of Ragging in Higher Educational Institutions.
        </p>
        <div className="pt-2">
          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>File a Protected Report</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
