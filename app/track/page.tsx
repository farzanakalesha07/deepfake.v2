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
  ShieldAlert
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
    }, 300);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(searchId);
  };

  // Timeline Step calculation
  const timelineSteps = [
    { key: 'Submitted', label: 'Submitted', desc: 'Complaint registered in secure database' },
    { key: 'Under Review', label: 'Under Review', desc: 'Preliminary evaluation by investigating faculty' },
    { key: 'Forwarded to HOD', label: 'Forwarded to HOD', desc: 'Department Head inquiry and mediation' },
    { key: 'Forwarded to Dean', label: 'Forwarded to Dean', desc: 'Level 2 Escalation: Student Welfare & Discipline' },
    { key: 'Higher Authority Review', label: 'Higher Authority Review', desc: 'Level 3: Anti-Ragging Standing Committee' },
    { key: 'Resolved', label: 'Resolved', desc: 'Disciplinary action fulfilled & safety established' },
  ];

  const getStepProgressIndex = (status: ComplaintStatus, level: number): number => {
    if (status === 'Resolved' || status === 'Closed') return 5;
    if (level === 3 || status === 'Escalated' && level === 3) return 4;
    if (level === 2 || status === 'Escalated' && level === 2) return 3;
    if (status === 'Action Taken' || level === 1 && status === 'Under Review') return 2;
    if (status === 'Under Review') return 1;
    return 0; // Submitted
  };

  const currentStepIndex = complaint ? getStepProgressIndex(complaint.status, complaint.escalation_level) : 0;

  return (
    <div className="min-h-screen py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>REAL-TIME STATUS INQUIRY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Track Your Complaint
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Enter your unique alphanumeric Complaint ID to view live investigation progress and sanitized authority notes.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="bg-navy-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value.toUpperCase())}
              placeholder="Enter Complaint ID (e.g. CS-2026-8F42K)"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-navy-950 border border-white/15 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono uppercase tracking-wider"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white font-bold text-sm shadow-glow-purple flex items-center justify-center gap-2 transition-all"
          >
            {isSearching ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Track Status</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Pre-seed Chips for Evaluators */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Try Demo Complaints:</span>
          {[
            { id: 'CS-2026-8F42K', label: 'CS-2026-8F42K (Under Review / HOD)' },
            { id: 'CS-2026-91AB2', label: 'CS-2026-91AB2 (Escalated to Dean)' },
            { id: 'CS-2026-7XY92', label: 'CS-2026-7XY92 (Resolved / Higher Auth)' },
            { id: 'CS-2026-3M87Q', label: 'CS-2026-3M87Q (Action Taken)' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSearchId(item.id);
                doSearch(item.id);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 text-xs font-mono border border-white/10 transition-colors"
            >
              {item.id}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================
          TRACKING RESULTS
          ========================================================= */}
      {complaint && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Main Status Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/90 border border-white/15 backdrop-blur-xl shadow-2xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs text-slate-400">Tracking Complaint:</span>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-cyan-300">
                    {complaint.complaint_id}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    complaint.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                    complaint.status === 'Escalated' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                    complaint.status === 'Under Review' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                    complaint.status === 'Action Taken' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' :
                    'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-xs text-slate-400">Current Authority Jurisdiction:</span>
                <div className="text-sm font-bold text-purple-300 mt-0.5">
                  Level {complaint.escalation_level}: {complaint.assigned_authority}
                </div>
                <div className="text-[11px] text-slate-400">
                  Last updated {new Date(complaint.updated_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* General Info Strip (Strictly privacy protected: NO victim info displayed!) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400">Category</div>
                <div className="text-xs font-bold text-white mt-1">
                  {complaint.type === 'ONLINE_RAGGING' ? 'Online Ragging' : 'Offline Ragging'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400">Date Submitted</div>
                <div className="text-xs font-bold text-white mt-1">
                  {new Date(complaint.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400">Subtype</div>
                <div className="text-xs font-bold text-cyan-400 mt-1 truncate" title={complaint.subcategory}>
                  {complaint.subcategory}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400">Repeat Index</div>
                <div className="text-xs font-bold text-purple-300 mt-1">
                  Report #{complaint.repeat_count}
                </div>
              </div>
            </div>

            {/* Privacy Guarantee Banner */}
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-200 flex items-center gap-2 mb-8">
              <Lock className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                <strong>Confidentiality Shield:</strong> Private victim identity and unredacted sensitive details are restricted to authorized inquiry officers and hidden from public status tracking.
              </span>
            </div>

            {/* =========================================================
                TIMELINE GRAPHIC (Prompt Section 9)
                Submitted ↓ Under Review ↓ Forwarded to HOD ↓ Forwarded to Dean ↓ Higher Authority Review ↓ Resolved
                ========================================================= */}
            <div className="pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Investigation Progression Timeline
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/15">
                {timelineSteps.map((step, idx) => {
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={step.key} className="relative flex items-start gap-4">
                      {/* Step Circle Indicator */}
                      <div
                        className={`absolute -left-6 sm:-left-8 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                          isCompleted
                            ? isCurrent
                              ? 'bg-purple-600 text-white ring-4 ring-purple-500/30'
                              : 'bg-cyan-500 text-navy-950 font-bold'
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
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              CURRENT STAGE
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-1 ${isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sanitized Action Updates Feed */}
            {complaint.updates && complaint.updates.length > 0 && (
              <div className="mt-10 pt-6 border-t border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Official Status &amp; Action Notices
                </h4>
                <div className="space-y-2.5">
                  {complaint.updates.map((update, idx) => (
                    <div
                      key={update.id || idx}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300 leading-relaxed"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="font-semibold text-purple-300">
                          Authority: {update.authority}
                        </span>
                        <span>{new Date(update.created_at).toLocaleString()}</span>
                      </div>
                      <p>{update.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Need help or emergency notice */}
          <div className="p-6 rounded-3xl bg-navy-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">Need to provide additional information?</div>
              <div className="text-xs text-slate-400">
                You can report a follow-up or contact the safety proctor directly.
              </div>
            </div>
            <Link
              href="/safety"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors shrink-0"
            >
              View Campus Safety Desk
            </Link>
          </div>

        </div>
      )}

      {/* Empty Search Result State */}
      {hasSearched && !complaint && !isSearching && (
        <div className="p-12 text-center rounded-3xl bg-navy-900/60 border border-white/10 space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Complaint Found</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            We couldn&apos;t find an incident registered with ID <code className="text-cyan-300 font-mono">{searchId}</code>. Please double check the ID format (e.g. CS-2026-8F42K).
          </p>
          <button
            onClick={() => {
              setSearchId('CS-2026-8F42K');
              doSearch('CS-2026-8F42K');
            }}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors"
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
