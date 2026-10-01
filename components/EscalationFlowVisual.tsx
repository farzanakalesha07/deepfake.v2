'use client';

import React from 'react';
import { 
  User, 
  UserCheck, 
  Award, 
  ShieldAlert, 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2, 
  AlertTriangle,
  Zap
} from 'lucide-react';

export const EscalationFlowVisual = () => {
  const steps = [
    {
      level: 'LEVEL 1',
      reportNum: '1st Report',
      title: 'Head of Department (HOD)',
      roleIcon: <UserCheck className="w-6 h-6 text-purple-400" />,
      trigger: 'First incident logged',
      description: 'Departmental inquiry initiated. Faculty advisor and counselor notified. Internal warnings issued.',
      accent: 'from-purple-900/40 to-navy-900 border-purple-500/30 text-purple-300',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    },
    {
      level: 'LEVEL 2',
      reportNum: '2nd Repeated Report',
      title: 'Dean of Student Affairs',
      roleIcon: <Award className="w-6 h-6 text-indigo-400" />,
      trigger: 'Repeated incident against suspect / location',
      description: 'Case automatically promoted. Campus Proctor & Hostel Wardens activated. Direct suspect summons.',
      accent: 'from-indigo-900/50 to-navy-900 border-indigo-500/40 text-indigo-300',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    },
    {
      level: 'LEVEL 3',
      reportNum: '3rd+ Report / Critical',
      title: 'Higher Authority & Anti-Ragging Cell',
      roleIcon: <ShieldAlert className="w-6 h-6 text-cyan-400" />,
      trigger: 'Habitual or high-severity intimidation',
      description: 'Apex disciplinary tribunal. Suspension, hostel eviction, and official police liaison if warranted.',
      accent: 'from-cyan-950/60 to-navy-900 border-cyan-500/40 text-cyan-300',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    },
  ];

  return (
    <div className="w-full my-8">
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-2">
            <Zap className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Campus Safety Escalation Charter</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Automated Multi-Tier Escalation Hierarchy
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Repeated complaints bypass bureaucratic delays and are automatically pushed to higher university authorities.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-navy-900/80 px-3 py-1.5 rounded-xl border border-white/10 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Real-Time Algorithmic Dispatch</span>
        </div>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => (
          <div
            key={step.level}
            className={`relative rounded-2xl p-6 bg-gradient-to-b ${step.accent} border backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] shadow-xl group`}
          >
            {/* Top Tag & Number */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${step.badgeBg}`}>
                {step.reportNum}
              </span>
              <span className="text-[11px] font-mono tracking-widest text-slate-400 font-semibold">
                {step.level}
              </span>
            </div>

            {/* Icon + Title */}
            <div className="flex items-start gap-3.5 mb-3">
              <div className="p-2.5 rounded-xl bg-navy-950/80 border border-white/10 group-hover:scale-110 transition-transform">
                {step.roleIcon}
              </div>
              <div>
                <h4 className="font-bold text-white text-base leading-snug group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h4>
                <div className="text-[11px] text-cyan-400 font-medium mt-0.5 flex items-center gap-1">
                  <span>Trigger: {step.trigger}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed mt-2 pt-3 border-t border-white/10">
              {step.description}
            </p>

            {/* Desktop Forward Arrow connecting cards */}
            {idx < steps.length - 1 && (
              <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-navy-900 border border-purple-500/40 items-center justify-center text-purple-300 shadow-lg">
                <ArrowRight className="w-4 h-4" />
              </div>
            )}

            {/* Mobile Down Arrow */}
            {idx < steps.length - 1 && (
              <div className="flex md:hidden justify-center my-2 text-purple-400">
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Safety Notice Banner */}
      <div className="mt-6 p-4 rounded-xl bg-navy-900/60 border border-white/10 flex items-center gap-3 text-xs text-slate-300">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong className="text-slate-100">Strict Confidentiality Guard:</strong> Escalating a complaint transfers incident telemetry and suspect profile to higher offices, while student personal identity remains encrypted unless the student explicitly grants authority consent.
        </span>
      </div>
    </div>
  );
};
