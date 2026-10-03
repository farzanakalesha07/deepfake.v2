'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  FileText, 
  Map, 
  LifeBuoy, 
  Lock, 
  User,
  ChevronRight,
  Bell,
  Server,
  AlertTriangle,
  Home
} from 'lucide-react';
import { ComplaintStore } from '@/lib/store';
import { AuthorityRole } from '@/lib/types';
import { ServerControlModal } from './ServerControlModal';
import { EmergencySOSModal } from './EmergencySOSModal';
import { NotificationCenter } from './NotificationCenter';
import { MobileBottomNav } from './MobileBottomNav';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serverModalOpen, setServerModalOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeRole, setActiveRole] = useState<AuthorityRole>('HOD');
  const pathname = usePathname();

  useEffect(() => {
    setActiveRole(ComplaintStore.getActiveRole());
    const handleRoleUpdate = () => {
      setActiveRole(ComplaintStore.getActiveRole());
    };
    window.addEventListener('campussafe_role_updated', handleRoleUpdate);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('campussafe_role_updated', handleRoleUpdate);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Map', href: '/map' },
    { name: 'Report', href: '/report' },
    { name: 'Track', href: '/track' },
    { name: 'Help', href: '/help' },
    { name: 'Profile', href: '/profile' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-navy-950/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-2.5' 
            : 'bg-navy-950/60 backdrop-blur-md border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Left: Brand Logo + Shield Icon */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-violet to-brand-cyan p-0.5 shadow-glow-purple group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-brand-cyan" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-cyan rounded-full animate-ping opacity-75" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-white group-hover:text-brand-cyan transition-colors">
                    Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-brand-cyan">Safe</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 tracking-wider">
                    2026 EDITION
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden lg:block">
                  Next-Gen Campus Safety & Harassment Response Platform
                </p>
              </div>
            </Link>

            {/* Center: Main Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-navy-900/60 px-3 py-1.5 rounded-2xl border border-white/5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
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

            {/* Right: Live Status, Alerts, Server Control & SOS Trigger */}
            <div className="hidden md:flex items-center gap-2.5">
              
              {/* Live Status Indicator (As Requested) */}
              <div 
                className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-300"
                title="Campus safety telemetry is nominal"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>All systems operational</span>
              </div>

              {/* Notification Bell */}
              <button
                onClick={() => setNotifOpen(true)}
                className="relative p-2 rounded-xl text-slate-300 hover:text-white bg-navy-900/80 hover:bg-navy-800 border border-white/10 transition-colors"
                title="Safety Alert Feed"
                aria-label="Alerts"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 shadow-glow-cyan" />
              </button>

              {/* One-Click Server Diagnostics & Control */}
              <button
                onClick={() => setServerModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-navy-900/80 hover:bg-navy-800 border border-white/10 hover:border-cyan-500/40 transition-all shadow-sm"
                title="Server Diagnostics & Control"
              >
                <Server className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px] font-mono text-cyan-300">Server</span>
              </button>

              {/* Authority Portal Link */}
              <Link
                href="/authority"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-navy-900/80 hover:bg-navy-800 border border-white/10 hover:border-purple-500/40 transition-all"
                title="Faculty & Authority Portal"
              >
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span>Authority</span>
              </Link>

              {/* Primary Emergency SOS Button */}
              <button
                onClick={() => setSosModalOpen(true)}
                className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:opacity-95 shadow-glow-red transition-all duration-200 transform hover:scale-105 active:scale-95 border border-rose-400/40"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>SOS</span>
              </button>
            </div>

            {/* Mobile Header Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setNotifOpen(true)}
                className="p-2 rounded-xl text-slate-300 bg-navy-900 border border-white/10 relative"
                aria-label="Alerts"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </button>

              <button
                onClick={() => setSosModalOpen(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-600 shadow-glow-red"
              >
                SOS
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-in Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-navy-950/98 backdrop-blur-3xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'bg-purple-600/20 text-cyan-300 border border-purple-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}

            <div className="pt-3 border-t border-white/10 space-y-2">
              <button
                onClick={() => { setServerModalOpen(true); setMobileMenuOpen(false); }}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-navy-900 border border-white/10"
              >
                <span className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  Server Diagnostics & Live API
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Port 5000</span>
              </button>

              <Link
                href="/authority"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-navy-900 border border-white/10"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-400" />
                  Faculty Authority Portal
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>

              <button
                onClick={() => { setSosModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-2xl bg-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-glow-red flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                Trigger Emergency Mode
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <EmergencySOSModal 
        isOpen={sosModalOpen} 
        onClose={() => setSosModalOpen(false)} 
      />

      <ServerControlModal 
        isOpen={serverModalOpen} 
        onClose={() => setServerModalOpen(false)} 
      />

      <NotificationCenter 
        isOpen={notifOpen} 
        onClose={() => setNotifOpen(false)} 
      />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav onOpenSOS={() => setSosModalOpen(true)} />
    </>
  );
};
