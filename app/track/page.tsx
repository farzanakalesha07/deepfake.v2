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
  Lock, 
  Sparkles,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Fingerprint,
  ChevronRight,
  Radio,
  Share2,
  Copy,
  Check
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
  const [copied, setCopied] = useState(false);

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
        showToast('Not Found', `No report found with ID: ${idToLook.trim()}`, 'error');
      }
    }, 300);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(searchId);
  };

  const copyIdToClipboard = () => {
    if (complaint) {
      navigator.clipboard.writeText(complaint.complaint_id);
      setCopied(true);
      showToast('Copied', 'Tracking ID copied to clipboard.', 'info');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Timeline Step calculation
  const timelineSteps = [
    { key: 'Submitted', label: 'Registered', desc: 'Secure cryptographic entry recorded' },
    { key: 'Under Review', label: 'Proctor Evaluation', desc: 'Faculty inquiry and evidence review' },
    { key: 'Forwarded to HOD', label: 'Department Action', desc: 'HOD mediation & preliminary hearing' },
    { key: 'Forwarded to Dean', label: 'Level 2 Escalation', desc: 'Disciplinary hearing & security patrol' },
    { key: 'Higher Authority Review', label: 'Apex Tribunal', desc: 'Anti-Ragging Standing Cell review' },
    { key: 'Resolved', label: 'Protective Closure', desc: 'Corrective action fulfilled & case archived' },
  ];

  const getStepProgressIndex = (status: ComplaintStatus, level: number): number => {
    if (status === 'Resolved' || status === 'Closed') return 5;
    if (level === 3 || (status === 'Escalated' && level === 3)) return 4;
    if (level === 2 || (status === 'Escalated' && level === 2)) return 3;
    if (status === 'Action Taken' || (level === 1 && status === 'Under Review')) return 2;
    if (status === 'Under Review') return 1;
    return 0; // Submitted
  };

  const currentStepIndex = complaint ? getStepProgressIndex(complaint.status, complaint.escalation_level) : 0;
  const progressPercent = Math.round(((currentStepIndex + 1) / timelineSteps.length) * 100);

  return (
    <div className="relative min-h-screen py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 backdrop-blur-md mb-4 shadow-glow-cyan">
          <Clock className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span className="tracking-wide uppercase">Real-Time Investigation Tracker</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Track Investigation Status
        </h1>
        <p className="text-xs sm:text-base text-slate-400 mt-3 leading-relaxed">
          Input your private alphanumeric tracking code to inspect real-time proctorial actions, jurisdiction escalations, and resolution timelines.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl mb-8 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value.toUpperCase())}
              placeholder="Enter Tracking ID (e.g. CS-2026-8F42K)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-navy-950/80 border border-white/15 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 font-mono uppercase tracking-wider transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white font-bold text-sm shadow-glow-purple flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-95"
          >
            {isSearching ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Decrypting Record...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Track Status</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Pre-seed Chips */}
        <div className="mt-5 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Quick Demo Records:</span>
          {[
            { id: 'CS-2026-8F42K', label: 'CS-2026-8F42K (Under Review / HOD)' },
            { id: 'CS-2026-91AB2', label: 'CS-2026-91AB2 (Escalated to Dean)' },
            { id: 'CS-2026-7XY92', label: 'CS-2026-7XY92 (Resolved / Tribunal)' },
            { id: 'CS-2026-3M87Q', label: 'CS-2026-3M87Q (Action Taken)' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSearchId(item.id);
                doSearch(item.id);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 text-cyan-300 text-xs font-mono border border-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-1.5"
            >
              <span>{item.id}</span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                • {item.label.split('(')[1].replace(')', '')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================
          TRACKING RESULTS DISPLAY
          ========================================================= */}
      {complaint && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Main Status Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
            
            {/* Top row with ID and Current Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-medium text-slate-400 tracking-wider uppercase">Official Incident File</span>
                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                  <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-cyan-300">
                    {complaint.complaint_id}
                  </h2>
                  <button
                    onClick={copyIdToClipboard}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title="Copy tracking ID"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                    complaint.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glow-cyan' :
                    complaint.status === 'Escalated' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-glow-pink' :
                    complaint.status === 'Under Review' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                    complaint.status === 'Action Taken' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' :
                    'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    <span>{complaint.status}</span>
                  </span>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-slate-400">Jurisdiction In-Charge</span>
                <div className="text-sm font-bold text-violet-300 mt-0.5">
                  Level {complaint.escalation_level}: {complaint.assigned_authority}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Last verified {new Date(complaint.updated_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
            </div>

            {/* General Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[11px] text-slate-400">Category</div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {complaint.type === 'ONLINE_RAGGING' ? 'Digital Harassment' : 'Physical Incident'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[11px] text-slate-400">Date Logged</div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {new Date(complaint.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[11px] text-slate-400">Incident Subtype</div>
                <div className="text-xs sm:text-sm font-bold text-cyan-400 mt-1 truncate" title={complaint.subcategory}>
                  {complaint.subcategory}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[11px] text-slate-400">Recurrence Index</div>
                <div className="text-xs sm:text-sm font-bold text-violet-300 mt-1">
                  Report #{complaint.repeat_count}
                </div>
              </div>
            </div>

            {/* Privacy Guarantee Banner */}
            <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/20 text-xs text-violet-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
                <Fingerprint className="w-4 h-4 text-violet-300" />
              </div>
              <div className="flex-1">
                <strong className="text-white">Confidentiality Guarantee:</strong> Your real name and contact details are strictly restricted to vetted inquiry proctors and encrypted against public tracking queries.
              </div>
            </div>

            {/* Progress Bar Header */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Investigation Progression ({progressPercent}%)</span>
                </div>
                <span className="text-xs text-cyan-300 font-mono font-bold">
                  Stage {currentStepIndex + 1} of {timelineSteps.length}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-600 via-brand-cyan to-emerald-400 transition-all duration-700 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* 6-Step Vertical Progression Timeline */}
            <div className="relative pl-6 sm:pl-8 space-y-7 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10 pt-2">
              {timelineSteps.map((step, idx) => {
                const isCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step.key} className="relative flex items-start gap-4">
                    {/* Step Circle Indicator */}
                    <div
                      className={`absolute -left-6 sm:-left-8 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                        isCurrent
                          ? 'bg-gradient-to-tr from-violet-600 to-cyan-500 text-white ring-4 ring-cyan-500/30 font-bold scale-110'
                          : isCompleted
                          ? 'bg-cyan-500 text-navy-950 font-bold shadow-glow-cyan'
                          : 'bg-navy-900 border border-white/20 text-slate-500'
                      }`}
                    >
                      {isCompleted && !isCurrent ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className={`text-sm font-bold ${
                          isCurrent ? 'text-cyan-300' : isCompleted ? 'text-white' : 'text-slate-500'
                        }`}>
                          {step.label}
                        </h4>
                        {isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse">
                            ACTIVE STAGE
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-1 leading-relaxed ${isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sanitized Action Updates Feed */}
            {complaint.updates && complaint.updates.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Official Status &amp; Action Log
                </h4>
                <div className="space-y-2.5">
                  {complaint.updates.map((update, idx) => (
                    <div
                      key={update.id || idx}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 leading-relaxed"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                        <span className="font-semibold text-violet-300">
                          Authority: {update.authority}
                        </span>
                        <span>{new Date(update.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-200">{update.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Action Footer */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">Need to provide supplementary evidence?</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Submit an update or speak with the safety proctor on duty.
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/help"
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
              >
                Counseling &amp; Helplines
              </Link>
              <Link
                href="/report"
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all"
              >
                File New Incident
              </Link>
            </div>
          </div>

        </div>
      )}

      {/* Empty Search Result State */}
      {hasSearched && !complaint && !isSearching && (
        <div className="p-12 text-center rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Incident Record Found</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            We couldn&apos;t find an incident registered with ID <code className="text-cyan-300 font-mono">{searchId}</code>. Please double check the ID format (e.g. CS-2026-8F42K).
          </p>
          <button
            onClick={() => {
              setSearchId('CS-2026-8F42K');
              doSearch('CS-2026-8F42K');
            }}
            className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-glow-purple"
          >
            Load Sample Complaint (CS-2026-8F42K)
          </button>
        </div>
      )}

    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading tracking portal...</span>
        </div>
      </div>
    }>
      <TrackContent />
    </Suspense>
  );
}
