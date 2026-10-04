'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Phone, Mail, Lock, ExternalLink, HeartHandshake, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#05091A]/90 backdrop-blur-xl text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Top Emergency Strip */}
        <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-red-950/30 via-[#080D24] to-purple-950/30 border border-red-500/25 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-red-400 animate-pulse" />
            </div>
            <div>
              <div className="text-white font-bold text-base">In Immediate Physical Danger?</div>
              <div className="text-xs text-slate-300">
                Contact campus security guards immediately or reach out to the National Anti-Ragging Cell.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:18001805522"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-glow-danger transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>National Helpline: 1800-180-5522</span>
            </a>
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-100 border border-white/20 text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-300" />
              <span>Police / Emergency: 112</span>
            </a>
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Safe</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Campus Safety &amp; Repeated Harassment Reporting System. An encrypted, automated platform empowering students to speak up safely with zero fear of retaliation.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit Encrypted Data &amp; Anonymous Channels</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/report" className="hover:text-cyan-300 transition-colors">
                  Report Offline / Online Ragging
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-cyan-300 transition-colors">
                  Track Complaint by Secure ID
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-cyan-300 transition-colors">
                  Student Safety Guide &amp; Checklist
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-300 transition-colors">
                  Privacy Policy &amp; Protection Model
                </Link>
              </li>
              <li>
                <Link href="/authority" className="hover:text-cyan-300 transition-colors">
                  Authority Management Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">Escalation Engine</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-blue-300 font-bold">Level 1:</span> Head of Department (HOD)
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-purple-300 font-bold">Level 2:</span> Dean of Student Affairs
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-amber-300 font-bold">Level 3:</span> Anti-Ragging Apex Committee
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">Support &amp; Trust</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Every complaint is treated with utmost discretion. Student details remain strictly confidential and are shielded from peer or suspect view.
            </p>
            <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Zero Tolerance for Campus Harassment &amp; Bullying</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} CampusSafe. Campus Safety &amp; Repeated Harassment Reporting System.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Speak Up. Stay Safe.</span>
            <span>•</span>
            <span className="text-slate-400">UGC Anti-Ragging Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
