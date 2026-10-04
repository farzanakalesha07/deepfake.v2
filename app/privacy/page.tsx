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
  Shield,
  ArrowRight
} from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 mb-3">
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
        <div className="glass-card p-5 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-sm">256-Bit Ingestion Vault</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Encrypted in transit and segregated from standard campus student records.
          </p>
        </div>

        <div className="glass-card p-5 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto">
            <EyeOff className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-sm">Blind Tracking Keys</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Complaint tracking uses alphanumeric token hashes without exposing names.
          </p>
        </div>

        <div className="glass-card p-5 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-sm">Role-Gated Access (RBAC)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Suspects and unvetted personnel are barred from all complaint records.
          </p>
        </div>
      </div>

      {/* Security Pillars Panel */}
      <div className="glass-panel p-8 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Core Privacy Architecture Guarantees</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Strict compliance with National Anti-Ragging regulations and privacy mandates.
          </p>
        </div>

        <div className="space-y-5 text-xs sm:text-sm text-slate-300">
          
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span>🔐 Confidential Reporting</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              When you file an incident report, your personal identifying information (name, student roll number, phone number, email) is stripped from public logs and stored in an isolated, role-restricted vault.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span>👁 Role-Based Visibility</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Student, HOD, Dean, and Higher Authority. Each role sees only the specific evidence and jurisdiction they are authorized to access. Unsanitized student details are never displayed on public feeds.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span>🛡 Protected Personal Information</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Students can choose 100% Anonymous reporting at any time. When anonymous, no identifying metadata is saved in database fields whatsoever.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span>📄 Controlled Evidence Access</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uploaded photo evidence, screenshots, and audio logs are sanitized of EXIF location metadata upon upload and locked in an access-logged evidence locker.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
            <h4 className="font-bold text-white flex items-center gap-2">
              <span>🚫 No Unnecessary Exposure</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accused suspects are strictly forbidden from viewing reporter identities or access logs, eliminating any threat of retaliation or intimidation.
            </p>
          </div>

        </div>

      </div>

      {/* Call to action */}
      <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Ready to file a protected report?</h4>
          <p className="text-xs text-slate-400">Takes less than 2 minutes and preserves your full confidentiality.</p>
        </div>
        <Link
          href="/report"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white text-xs font-bold shadow-glow-purple transition-all shrink-0"
        >
          <span>File Confidential Report &rarr;</span>
        </Link>
      </div>

    </div>
  );
}
