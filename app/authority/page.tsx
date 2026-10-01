'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Sparkles
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
    }, 400);
  };

  const roles = [
    {
      role: 'HOD' as AuthorityRole,
      title: 'Head of Department (HOD)',
      subtitle: 'Level 1 Jurisdiction',
      desc: 'Investigate 1st reports in your department, summon students, issue warnings, or escalate to Dean.',
      icon: <UserCheck className="w-6 h-6 text-purple-400" />,
      color: 'border-purple-500/40 bg-purple-950/30',
      badge: 'Level 1',
    },
    {
      role: 'Dean' as AuthorityRole,
      title: 'Dean of Student Affairs',
      subtitle: 'Level 2 Jurisdiction',
      desc: 'Handles repeated harassment incidents, hostel investigations, campus security patrols, and proctorial inquiries.',
      icon: <Award className="w-6 h-6 text-indigo-400" />,
      color: 'border-indigo-500/40 bg-indigo-950/30',
      badge: 'Level 2',
    },
    {
      role: 'Higher Authority' as AuthorityRole,
      title: 'Anti-Ragging Apex Committee',
      subtitle: 'Level 3 Jurisdiction',
      desc: 'Vice-Chancellor tribunal, expulsion orders, formal police reporting, and state anti-ragging compliance.',
      icon: <ShieldAlert className="w-6 h-6 text-cyan-400" />,
      color: 'border-cyan-500/40 bg-cyan-950/30',
      badge: 'Level 3',
    },
    {
      role: 'Admin' as AuthorityRole,
      title: 'Safety Ops & IT Admin',
      subtitle: 'System Administrator',
      desc: 'Full system oversight, analytics audit, user and authority management, and escalation protocol tuning.',
      icon: <Building2 className="w-6 h-6 text-slate-300" />,
      color: 'border-white/20 bg-white/5',
      badge: 'Superuser',
    },
  ];

  return (
    <div className="min-h-screen py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
          <KeyRound className="w-3.5 h-3.5" />
          <span>CAMPUS INVESTIGATOR GATEWAY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Authority &amp; Faculty Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Select a demo persona to test role-based access, confidentiality segregation, and escalation handling.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Role Selectors (4 cards) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Select Demo Persona:
          </h3>

          <div className="grid grid-cols-1 gap-3.5">
            {roles.map((item) => (
              <div
                key={item.role}
                onClick={() => handleRoleSelect(item.role)}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all duration-200 flex items-start gap-4 ${
                  selectedRole === item.role
                    ? `${item.color} shadow-lg ring-1 ring-purple-500`
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                <div className="p-3 rounded-xl bg-navy-950 border border-white/10 shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-white text-base">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-xs text-purple-300 font-medium mb-1">
                    {item.subtitle} • {DEMO_AUTHORITIES[item.role].name}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Login Box */}
        <div className="lg:col-span-5 bg-navy-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Lock className="w-5 h-5 text-cyan-300" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Secure Sign-In</h3>
              <p className="text-[11px] text-slate-400">Role: <strong className="text-cyan-400">{selectedRole}</strong></p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Official Institutional Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Security Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Demo Mode enabled: Passwords auto-filled for testing.</span>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-brand-violet to-cyan-500 hover:opacity-95 text-white font-bold text-sm shadow-glow-purple flex items-center justify-center gap-2 transition-all"
            >
              {loggingIn ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Enter {selectedRole} Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <span className="text-[11px] text-slate-400">
              CampusSafe RBAC v2.4 • 256-Bit Encrypted Session
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
