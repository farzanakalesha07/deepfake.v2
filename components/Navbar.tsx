'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  FileText, 
  Search, 
  LifeBuoy, 
  Lock, 
  UserCheck,
  ChevronRight,
  Sparkles,
  Server,
  ArrowRight
} from 'lucide-react';
import { ComplaintStore } from '@/lib/store';
import { AuthorityRole } from '@/lib/types';
import { ServerControlModal } from './ServerControlModal';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serverModalOpen, setServerModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<AuthorityRole>('HOD');
  const pathname = usePathname();

  useEffect(() => {
    setActiveRole(ComplaintStore.getActiveRole());
    const handleRoleUpdate = () => {
      setActiveRole(ComplaintStore.getActiveRole());
    };
    window.addEventListener('campussafe_role_updated', handleRoleUpdate);
    return () => window.removeEventListener('campussafe_role_updated', handleRoleUpdate);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Report Incident', href: '/report' },
    { name: 'Track Complaint', href: '/track' },
    { name: 'Safety Guide', href: '/safety' },
    { name: 'Privacy & Security', href: '/privacy' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-white/[0.04] backdrop-blur-[20px] border border-white/[0.12] shadow-2xl transition-all">
          
          {/* LEFT: Shield Logo, CampusSafe, SECURE & CONFIDENTIAL Badge */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
            <div className="relative flex items-center justify-center w-10 sm:w-11 h-10 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] via-[#6366F1] to-[#06B6D4] p-0.5 shadow-glow-purple group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#05091A] rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-5 sm:w-6 h-5 sm:h-6 text-[#06B6D4]" />
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping opacity-75" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">Safe</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                  SECURE &amp; CONFIDENTIAL
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden lg:block">
                Campus Safety &amp; Repeated Harassment Reporting System
              </p>
            </div>
          </Link>

          {/* CENTER: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'text-white bg-white/10 shadow-glow-purple border border-white/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Server Status, Authority Login, [ Report Incident ] */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Server Online Button */}
            <button
              onClick={() => setServerModalOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 transition-all shadow-sm group"
              title="One-Click Server Control & Diagnostics"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono text-cyan-300">Server Online</span>
            </button>

            {/* Authority Login */}
            <Link
              href="/authority"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-purple-400/40 transition-all shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              <span>Authority Login</span>
            </Link>

            {/* [ Report Incident ] Button with Purple -> Blue -> Cyan Gradient */}
            <Link
              href="/report"
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#06B6D4] hover:opacity-95 shadow-glow-purple transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Report Incident</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setServerModalOpen(true)}
              className="p-2 rounded-xl text-cyan-300 bg-white/5 border border-white/10"
              title="Server Control"
            >
              <Server className="w-4 h-4" />
            </button>
            <Link
              href="/report"
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500"
            >
              Report
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-[#080D24]/95 backdrop-blur-2xl border border-white/15 p-5 shadow-2xl space-y-2 animate-in fade-in duration-150">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? 'bg-purple-600/20 text-cyan-300 border border-purple-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <button
              onClick={() => { setServerModalOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 border border-white/10"
            >
              <span className="flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                Server Online &amp; Diagnostics
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Active
              </span>
            </button>
            <Link
              href="/authority"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 border border-white/10"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />
                Authority Portal Login
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-glow-purple"
            >
              <FileText className="w-4 h-4" />
              <span>Report an Incident Now</span>
            </Link>
          </div>
        </div>
      )}

      {/* In-App One-Click Server Diagnostics & Control Modal */}
      <ServerControlModal 
        isOpen={serverModalOpen} 
        onClose={() => setServerModalOpen(false)} 
      />
    </header>
  );
};
