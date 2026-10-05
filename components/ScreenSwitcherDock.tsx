'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Monitor, 
  Smartphone, 
  ShieldCheck, 
  FileText, 
  Search, 
  BookOpen, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronUp, 
  ChevronDown,
  Sparkles,
  Layers
} from 'lucide-react';

export const ScreenSwitcherDock: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const screens = [
    { id: '01', name: '01 Home', path: '/', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: '02', name: '02 Report', path: '/report', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: '03', name: '03 Success', path: '/success', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: '04', name: '04 Track', path: '/track', icon: <Search className="w-3.5 h-3.5" /> },
    { id: '05', name: '05 Safety Guide', path: '/safety', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: '06', name: '06 Privacy Vault', path: '/privacy', icon: <Lock className="w-3.5 h-3.5" /> },
    { id: '07', name: '07 Authority', path: '/authority/dashboard', icon: <Monitor className="w-3.5 h-3.5" /> },
    { id: '08', name: '08 Emergency', path: '/emergency', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    { id: '09', name: '09 Mobile 3D', path: '/mobile', icon: <Smartphone className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
      <div className="flex flex-col items-center">
        
        {/* Toggle Bar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-1.5 px-3 py-1 rounded-full bg-[#081522]/90 hover:bg-[#0D1C2C] border border-cyan-500/30 text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1.5 backdrop-blur-xl shadow-glow-cyan transition-all"
        >
          <Layers className="w-3 h-3 text-cyan-400" />
          <span>CAMPUSSAFE 9-SCREEN SUITE</span>
          {collapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {/* Dock Pills */}
        {!collapsed && (
          <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-[#050B14]/90 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-x-auto max-w-[95vw] animate-in fade-in slide-in-from-bottom-2 duration-200">
            {screens.map((s) => {
              const active = pathname === s.path;
              return (
                <Link
                  key={s.id}
                  href={s.path}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 text-white border border-cyan-400 shadow-glow-cyan'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={active ? 'text-cyan-300' : 'text-slate-500'}>{s.icon}</span>
                  <span>{s.name}</span>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
