'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Phone, Mail, Lock, ExternalLink, HeartHandshake } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Top Emergency Strip */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-navy-900/80 to-cyan-950/60 border border-purple-500/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <div className="text-white font-semibold text-base">In Immediate Physical Danger?</div>
              <div className="text-xs text-slate-300">
                Contact campus security guards immediately or reach out to the National Anti-Ragging Cell.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:18001805522"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>National Helpline: 1800-180-5522</span>
            </a>
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Police / Emergency: 112</span>
            </a>
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                Campus<span className="text-cyan-400">Safe</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Campus Safety & Repeated Harassment Reporting System. An encrypted, automated platform empowering students to speak up safely with zero fear of retaliation.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit Encrypted Data & Anonymous Channels</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/map" className="hover:text-cyan-300 transition-colors">
                  Interactive Campus Safe Map
                </Link>
              </li>
              <li>
                <Link href="/report" className="hover:text-cyan-300 transition-colors">
                  Report Incident (3-Step Wizard)
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-cyan-300 transition-colors">
                  Track Complaint by Secure ID
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-cyan-300 transition-colors">
                  Emergency Support &amp; Counseling
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-cyan-300 transition-colors">
                  Safety Protocols &amp; Checklist
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-300 transition-colors">
                  Privacy Charter &amp; Protection
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Escalation Charter</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-slate-200 font-semibold">Level 1:</span> Head of Department (HOD)
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-purple-300 font-semibold">Level 2:</span> Dean of Student Affairs
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-cyan-300 font-semibold">Level 3:</span> Higher Authority / Anti-Ragging Committee
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Support & Trust</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Every complaint is treated with utmost discretion. Student details remain strictly confidential and are shielded from peer or suspect view.
            </p>
            <div className="p-3 rounded-xl bg-purple-900/20 border border-purple-500/20 text-xs text-purple-200 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Zero Tolerance for Campus Bullying & Ragging</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} CampusSafe. College Safety & Repeated Harassment Reporting System.
          </div>
          <div className="flex items-center gap-6">
            <span>Speak Up. Stay Safe.</span>
            <span>•</span>
            <span>Your Privacy Protected.</span>
            <span>•</span>
            <span>Stronger Together.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
