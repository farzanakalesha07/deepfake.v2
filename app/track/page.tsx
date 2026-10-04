'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  FileText, 
  ArrowRight, 
  Sparkles,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Calendar,
  MapPin,
  UserCheck,
  Check,
  Copy
} from 'lucide-react';
import { Complaint, ComplaintStatus } from '@/lib/types';
import { ComplaintStore } from '@/lib/store';
import { useToast } from '@/components/Toast';

function TrackContent() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [searchId, setSearchId] = useState('');
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Check URL query param e.g. /track?id=CS-2026-8F42K
  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setSearchId(idFromUrl.toUpperCase());
      doSearch(idFromUrl.toUpperCase());
    }
  }, [searchParams]);

  // Listen to local store updates in case an authority updates status in another tab
  useEffect(() => {
    const handleUpdate = () => {
      if (searchId) {
        const fresh = ComplaintStore.getComplaintById(searchId);
        if (fresh) setComplaint(fresh);
      }
    };
    window.addEventListener('campussafe_storage_updated', handleUpdate);
    return () => window.removeEventListener('campussafe_storage_updated', handleUpdate);
  }, [searchId]);

  const doSearch = (idToLook: string) => {
    if (!idToLook.trim()) {
      showToast('Enter ID', 'Please enter a Complaint ID to track.', 'warning');
      return;
    }
    setIsSearching(true);
    setHasSearched(true);

    setTimeout(() => {
      const found = ComplaintStore.getComplaintById(idToLook.trim());
      setComplaint(found || null);
      setIsSearching(false);
      if (!found) {
        showToast('Not Found', `No complaint found with ID: ${idToLook.trim()}`, 'error');
      }
    }, 250);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(searchId);
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    showToast('Copied', `${id} copied to clipboard`, 'success');
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Timeline representation corresponding exactly to the required stages:
  // ✓ Complaint Submitted -> ✓ HOD Notified -> ● Under Review -> ○ Dean Escalation -> ○ Higher Authority
  const getTimelineStages = (c: Complaint) => {
    const stages = [
      {
        id: 'submitted',
        title: 'Complaint Submitted',
        desc: 'Report encrypted & registered into campus safety registry',
        completed: true,
        current: false
      },
      {
        id: 'hod_notified',
        title: 'HOD Notified',
        desc: 'Department Head proctorial alert issued for preliminary inquiry',
        completed: c.status !== 'Submitted' || c.escalation_level >= 1,
        current: c.status === 'Submitted' && c.escalation_level === 1
      },
      {
        id: 'under_review',
        title: 'Under Review',
        desc: 'Evidence verified; disciplinary summons & witness statements active',
        completed: c.status === 'Action Taken' || c.status === 'Resolved' || c.status === 'Closed' || c.escalation_level > 1,
        current: c.status === 'Under Review'
      },
      {
        id: 'dean_escalation',
        title: 'Dean Escalation',
        desc: 'Level 2 Escalation: Repeated suspect incident forwarded to Student Affairs',
        completed: c.escalation_level >= 2 && (c.status === 'Action Taken' || c.status === 'Resolved' || c.status === 'Closed' || c.escalation_level > 2),
        current: c.escalation_level === 2 && (c.status === 'Escalated' || c.status === 'Under Review')
      },
      {
        id: 'higher_authority',
        title: 'Higher Authority Review',
        desc: 'Level 3 Apex Anti-Ragging Committee & Vice-Chancellor tribunal',
        completed: c.escalation_level >= 3 && (c.status === 'Action Taken' || c.status === 'Resolved' || c.status === 'Closed'),
        current: c.escalation_level >= 3 && c.status === 'Escalated'
      }
    ];

    return stages;
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
      
      {/* ========================================================
          VICTIM LOGIN & TRACKING CARD
          ======================================================== */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-3">
          <Search className="w-3.5 h-3.5" />
          <span>ZERO-KNOWLEDGE TRACKING</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Track Your Complaint
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Only for tracking your complaint. You can track the status of your report using your Complaint ID.
        </p>
      </div>

      {/* Glass Search / Login Card */}
      <div className="glass-card p-6 sm:p-8 shadow-2xl relative">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Enter Complaint ID
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                placeholder="e.g. CS-2026-8F42K"
                className="w-full pl-11 pr-4 py-3 rounded-2xl glass-input text-sm font-mono uppercase placeholder-slate-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-glow-purple transition-all"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Searching Registry...</span>
                </>
              ) : (
                <>
                  <span>Login / Track Complaint &rarr;</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-3 h-3 text-emerald-400" />
              Do not expose sensitive victim details unnecessarily.
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Quick Demo IDs:</span>
              {['CS-2026-8F42K', 'CS-2026-91AB2', 'CS-2026-7XY92'].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setSearchId(id);
                    doSearch(id);
                  }}
                  className="font-mono text-cyan-300 hover:underline hover:text-white"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* ========================================================
          COMPLAINT DETAILS & TIMELINE
          ======================================================== */}
      {complaint && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Card: Details */}
          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">OFFICIAL INCIDENT FILE</span>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-2xl font-black font-mono text-cyan-300 tracking-wide">
                    {complaint.complaint_id}
                  </h2>
                  <button
                    onClick={() => handleCopyId(complaint.complaint_id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title="Copy Complaint ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Status & Escalation Badge */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  complaint.status === 'Resolved'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : complaint.status === 'Escalated'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                }`}>
                  {complaint.status}
                </span>

                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                  complaint.escalation_level === 3
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : complaint.escalation_level === 2
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}>
                  Level {complaint.escalation_level}
                </span>
              </div>
            </div>

            {/* Grid of Key Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Complaint Type</span>
                <span className="font-bold text-white block">
                  {complaint.type === 'OFFLINE_RAGGING' ? 'Offline Ragging' : 'Online Ragging'}
                </span>
                <span className="text-[11px] text-slate-400 truncate block">{complaint.subcategory}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Submitted Date</span>
                <span className="font-bold text-white block">
                  {new Date(complaint.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {new Date(complaint.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Assigned Authority</span>
                <span className="font-bold text-purple-300 block">{complaint.assigned_authority}</span>
                <span className="text-[11px] text-slate-400">Investigating Officer</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Victim Privacy</span>
                <span className="font-bold text-emerald-400 block">Protected PII</span>
                <span className="text-[11px] text-slate-400">Zero Public Leakage</span>
              </div>
            </div>

            {/* Incident Summary */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-300 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Incident Statement</span>
              <p className="leading-relaxed">{complaint.description}</p>
            </div>
          </div>

          {/* ========================================================
              FUTURISTIC GLASS TIMELINE
              ======================================================== */}
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Escalation &amp; Investigation Progression</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">Real-time audit chain</span>
            </div>

            {/* Vertical Glass Timeline */}
            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {getTimelineStages(complaint).map((stage, idx) => (
                <div key={stage.id} className="relative">
                  {/* Timeline Node Symbol */}
                  <div className={`absolute -left-6 sm:-left-8 top-0.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                    stage.completed 
                      ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-400 shadow-glow-safe' 
                      : stage.current 
                      ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300 animate-pulse shadow-glow-cyan' 
                      : 'bg-white/5 border border-white/20 text-slate-500'
                  }`}>
                    {stage.completed ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : stage.current ? (
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-sm font-bold ${
                        stage.completed ? 'text-white' : stage.current ? 'text-cyan-300' : 'text-slate-400'
                      }`}>
                        {stage.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                        {stage.completed ? '✓ Completed' : stage.current ? '● In Progress' : '○ Pending'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Official Authority Updates Audit Trail */}
            {complaint.updates && complaint.updates.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Official Authority Logged Updates ({complaint.updates.length})</span>
                </h4>

                <div className="space-y-2.5">
                  {complaint.updates.map((up) => (
                    <div key={up.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-purple-300">{up.authority}</span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {new Date(up.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{up.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* If searched and not found */}
      {hasSearched && !complaint && !isSearching && (
        <div className="glass-card p-10 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No Matching Record Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Please double-check the Complaint ID format. It should follow the convention <code className="text-cyan-300">CS-YYYY-XXXXX</code>.
          </p>
        </div>
      )}

    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <TrackContent />
    </Suspense>
  );
}
