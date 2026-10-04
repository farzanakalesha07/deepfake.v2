'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Lock, 
  ShieldCheck, 
  UserCheck, 
  Award, 
  ShieldAlert, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Building2,
  Sparkles,
  Search,
  ChevronRight
} from 'lucide-react';
import { AuthorityRole } from '@/lib/types';
import { DEMO_AUTHORITIES, ComplaintStore } from '@/lib/store';
import { useToast } from '@/components/Toast';

export default function AuthorityLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [selectedRole, setSelectedRole] = useState<AuthorityRole>('HOD');
  const [email, setEmail] = useState('hod.cse@campus.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [loggingIn, setLoggingIn] = useState(false);

  const handleRoleSelect = (role: AuthorityRole) => {
    setSelectedRole(role);
    setEmail(DEMO_AUTHORITIES[role].email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);

    setTimeout(() => {
      ComplaintStore.setActiveRole(selectedRole);
      setLoggingIn(false);
      showToast(
        `Welcome, ${DEMO_AUTHORITIES[selectedRole].name}`,
        `Logged in with role: ${selectedRole}`,
        'success'
      );
      router.push('/authority/dashboard');
    }, 350);
  };

  const roles = [
    {
      role: 'HOD' as AuthorityRole,
      title: 'Head of Department (HOD)',
      subtitle: 'Level 1 Jurisdiction',
      desc: 'Investigate 1st reports in your department, summon students, issue warnings, or escalate to Dean.',
      icon: <UserCheck className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/30 bg-purple-950/20',
      badge: 'Level 1',
    },
    {
      role: 'Dean' as AuthorityRole,
      title: 'Dean of Student Affairs',
      subtitle: 'Level 2 Jurisdiction',
      desc: 'Handles repeated harassment incidents, hostel investigations, campus security patrols, and proctorial inquiries.',
      icon: <Award className="w-5 h-5 text-indigo-400" />,
      color: 'border-indigo-500/30 bg-indigo-950/20',
      badge: 'Level 2',
    },
    {
      role: 'Higher Authority' as AuthorityRole,
      title: 'Anti-Ragging Apex Committee',
      subtitle: 'Level 3 Jurisdiction',
      desc: 'Vice-Chancellor tribunal, expulsion orders, formal police reporting, and UGC anti-ragging compliance.',
      icon: <ShieldAlert className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/30 bg-cyan-950/20',
      badge: 'Level 3',
    },
    {
      role: 'Admin' as AuthorityRole,
      title: 'Safety Ops & IT Admin',
      subtitle: 'System Administrator',
      desc: 'Full system telemetry oversight, analytics audit, user and authority management, and escalation rules.',
      icon: <Building2 className="w-5 h-5 text-slate-300" />,
      color: 'border-white/10 bg-white/5',
      badge: 'Superuser',
    },
  ];

  return (
    <div className="min-h-screen py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30 mb-3">
          <KeyRound className="w-3.5 h-3.5" />
          <span>AUTHORITY GATEWAY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Authority &amp; Faculty Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Strict role-based access for designated campus investigators, proctors, and committee heads.
        </p>
      </div>

      {/* Main Glass Login Card */}
      <div className="glass-card p-6 sm:p-10 shadow-2xl relative">
        
        {/* Role Selector Tabs */}
        <div className="space-y-3 mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Select Investigator Jurisdiction
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roles.map((r) => {
              const active = selectedRole === r.role;
              return (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => handleRoleSelect(r.role)}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    active
                      ? `${r.color} border-cyan-400 shadow-glow-cyan`
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {r.icon}
                      <span className="text-xs font-bold text-white">{r.title}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                      {r.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {r.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Official Campus Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Security Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              Institutional 2FA &amp; Audit Logging Enabled
            </span>
            <span className="text-[11px] text-cyan-300 font-mono">Demo Mode: Any password accepted</span>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-glow-purple transition-all"
            >
              {loggingIn ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Authenticating Role Certificate...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Enter {selectedRole} Disciplinary Console &rarr;</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>

      {/* Alternative Option: Victim Login / Tracking */}
      <div className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="text-xs sm:text-sm font-bold text-white">Looking to track your own complaint?</h4>
          <p className="text-[11px] text-slate-400">Students do not need an authority account. Simply enter your Complaint ID.</p>
        </div>
        <Link
          href="/track"
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 text-xs font-bold border border-white/10 flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Go to Victim Tracking &rarr;</span>
        </Link>
      </div>

    </div>
  );
}
