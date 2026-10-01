'use client';

import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Activity, 
  RefreshCw, 
  Database, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Copy, 
  Check, 
  Terminal,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { ComplaintStore } from '@/lib/store';
import { useToast } from './Toast';

interface ServerControlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ServerHealth {
  status: string;
  uptime_seconds?: number;
  node_version?: string;
  port?: number;
  database?: {
    type: string;
    file: string;
    complaints_count: number;
  };
}

export const ServerControlModal: React.FC<ServerControlModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [backendLatency, setBackendLatency] = useState<number | null>(null);
  const [healthData, setHealthData] = useState<ServerHealth | null>(null);
  const [nextApiOnline, setNextApiOnline] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    const start = Date.now();

    // Check Standalone Express Backend on port 5000
    try {
      const res = await fetch('http://localhost:5000/api/health', { method: 'GET', cache: 'no-store' });
      const latency = Date.now() - start;
      if (res.ok) {
        const data = await res.json();
        setBackendOnline(true);
        setBackendLatency(latency);
        setHealthData(data);
      } else {
        setBackendOnline(false);
        setBackendLatency(null);
      }
    } catch {
      setBackendOnline(false);
      setBackendLatency(null);
    }

    // Check Next.js App Router API Route on current origin
    try {
      const nextRes = await fetch('/api/health', { method: 'GET', cache: 'no-store' });
      setNextApiOnline(nextRes.ok);
    } catch {
      setNextApiOnline(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      checkHealth();
    }
  }, [isOpen]);

  const handleSyncDatabase = async () => {
    setLoading(true);
    try {
      const synced = await ComplaintStore.syncWithServer();
      showToast('Database Synchronized', `Synchronized ${synced.length} complaints with server.`, 'success');
      await checkHealth();
    } catch (e: any) {
      showToast('Sync Failed', e.message || 'Unable to sync with server.', 'error');
    }
    setLoading(false);
  };

  const handleResetData = async () => {
    if (confirm('Reset database back to initial pristine demo dataset?')) {
      setLoading(true);
      ComplaintStore.resetDemoData();
      showToast('Database Reset', 'Reset to initial demo complaints.', 'success');
      await checkHealth();
      setLoading(false);
    }
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText('npm run dev:all');
    setCopied(true);
    showToast('Command Copied', 'Copied "npm run dev:all" to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-navy-900 border border-white/15 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-violet to-brand-cyan p-0.5 shadow-glow-purple">
              <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                <Server className="w-6 h-6 text-brand-cyan" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Server Control & Status
              </h2>
              <p className="text-xs text-slate-400">
                Live diagnostics for Express Backend & Next.js API
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Service Status Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Express Backend Server Card */}
          <div className={`p-4 rounded-2xl border transition-all ${
            backendOnline 
              ? 'bg-emerald-500/10 border-emerald-500/30' 
              : 'bg-rose-500/10 border-rose-500/30'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Express Backend</span>
              <span className={`w-2.5 h-2.5 rounded-full ${
                backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
              }`} />
            </div>
            <div className="mt-2">
              <p className={`text-base font-bold ${backendOnline ? 'text-emerald-300' : 'text-rose-400'}`}>
                {backendOnline ? 'Port 5000 Online' : 'Port 5000 Offline'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {backendLatency ? `Ping: ${backendLatency}ms` : 'Start with npm run server'}
              </p>
            </div>
          </div>

          {/* Next.js Fullstack API Card */}
          <div className={`p-4 rounded-2xl border transition-all ${
            nextApiOnline 
              ? 'bg-cyan-500/10 border-cyan-500/30' 
              : 'bg-slate-800/50 border-white/10'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Next.js API Engine</span>
              <span className={`w-2.5 h-2.5 rounded-full ${
                nextApiOnline ? 'bg-cyan-400 animate-pulse' : 'bg-amber-500'
              }`} />
            </div>
            <div className="mt-2">
              <p className="text-base font-bold text-cyan-300">
                {nextApiOnline ? 'Active (Port 3001)' : 'Standby'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Full-stack App Router API
              </p>
            </div>
          </div>
        </div>

        {/* Database & Diagnostics Info */}
        <div className="p-4 rounded-2xl bg-navy-950/80 border border-white/10 space-y-2 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              Database Engine
            </span>
            <span className="font-semibold text-white">
              JSON File Store (server/data/complaints.json)
            </span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Total Complaints Loaded
            </span>
            <span className="font-semibold text-cyan-300">
              {healthData?.database?.complaints_count || ComplaintStore.getComplaints().length} incidents
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Automated Escalation
            </span>
            <span className="font-semibold text-emerald-300">
              Active (Level 1 ➔ 2 ➔ 3)
            </span>
          </div>
        </div>

        {/* Quick Launch Terminal Command Helper */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-xs font-mono text-slate-300 truncate">
              npm run dev:all
            </span>
          </div>
          <button
            onClick={handleCopyCommand}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs font-semibold border border-purple-500/40 transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* One-Click Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={checkHealth}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-navy-800 hover:bg-navy-700 border border-white/10 text-xs font-semibold text-slate-200 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Ping Server Health</span>
          </button>

          <button
            onClick={handleSyncDatabase}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-glow-purple active:scale-95 disabled:opacity-50"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Sync Database</span>
          </button>

          <button
            onClick={handleResetData}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white text-xs font-medium transition-colors"
          >
            <span>Reset Demo Data</span>
          </button>

          <a
            href="http://localhost:5000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white text-xs font-medium transition-colors"
          >
            <span>Open API Docs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
