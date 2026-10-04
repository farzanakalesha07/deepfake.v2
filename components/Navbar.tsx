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
  Server
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
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-navy-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Title */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-violet to-brand-cyan p-0.5 shadow-glow-purple group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-brand-cyan" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-cyan rounded-full animate-ping opacity-75" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-brand-cyan transition-colors">
                  Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Safe</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  SECURE & CONFIDENTIAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide hidden md:block">
                Campus Safety & Repeated Harassment Reporting System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-cyan-300 bg-white/10 shadow-sm border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* One-Click Server Status & Control Button */}
            <button
              onClick={() => setServerModalOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-navy-900/90 hover:bg-navy-800 border border-slate-700/80 hover:border-cyan-500/50 transition-all shadow-sm group"
              title="One-Click Server Control & Diagnostics"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Server className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-mono text-cyan-300">Server</span>
            </button>

            <Link
              href="/authority"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-navy-800/80 hover:bg-navy-700/80 border border-slate-700/60 hover:border-purple-500/50 transition-all shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              <span>Authority Login</span>
            </Link>

            <Link
              href="/report"
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-violet via-purple-600 to-brand-cyan hover:opacity-95 shadow-glow-purple transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Report Incident</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setServerModalOpen(true)}
              className="p-1.5 rounded-lg text-cyan-300 bg-navy-900 border border-white/10"
              title="Server Control"
            >
              <Server className="w-4 h-4" />
            </button>
            <Link
              href="/report"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-brand-violet"
            >
              Report
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-navy-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-purple-600/20 text-cyan-300 border border-purple-500/30'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => { setServerModalOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 bg-navy-900 border border-slate-700/60"
            >
              <span className="flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                Server Control & Diagnostics
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Active
              </span>
            </button>
            <Link
              href="/authority"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 bg-navy-800 border border-slate-700"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />
                Authority Portal
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-glow-purple"
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
