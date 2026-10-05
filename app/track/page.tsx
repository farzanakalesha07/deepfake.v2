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
  Copy,
  Radio,
  Activity,
  Layers,
  Cpu
} from 'lucide-react';
import { Complaint, ComplaintStatus } from '@/lib/types';
import { ComplaintStore } from '@/lib/store';
import { useToast } from '@/components/Toast';

function TrackContent() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [searchId, setSearchId] = useState('CS-20481');
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [hasSearched, setHasSearched] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Initialize or check URL query param
  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    const targetId = idFromUrl ? idFromUrl.toUpperCase() : 'CS-20481';
    setSearchId(targetId);
    doSearch(targetId);
  }, [searchParams]);

  // Listen to store updates
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
      let found = ComplaintStore.getComplaintById(idToLook.trim());
      
      // If not in store yet (e.g. initial demo CS-20481), provide realistic futuristic demo record
      if (!found && idToLook.trim().toUpperCase() === 'CS-20481') {
        found = {
          id: 'c-demo-20481',
          complaint_id: 'CS-20481',
          type: 'OFFLINE_RAGGING',
          subcategory: 'Following / Stalking',
          description: 'Repeated unwanted following observed near Library East Annex after evening lab sessions.',
          incident_date: new Date().toISOString().split('T')[0],
          incident_time: '18:45',
          location: 'Library East Annex - Pathway B',
          frequency: 'Happened before',
          is_ongoing: true,
          status: 'Under Review',
          escalation_level: 2,
          assigned_authority: 'Dean',
          repeat_count: 2,
          created_at: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
          updated_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
          victim: {
            anonymous: true,
            name: '',
            student_id: '',
            department: 'Computer Science & Engineering',
            class_year: '2nd Year',
            phone: '',
            email: '',
          },
          suspect: {
            name: 'Senior Group (Unidentified)',
            department: 'Mechanical',
            class_year: '4th Year',
            phone: '',
            additional_info: 'Two individuals with gray jackets',
          },
          evidence: [],
          updates: [
            {
              id: 'up-1',
              complaint_id: 'CS-20481',
              created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
              authority: 'System',
              status: 'Submitted',
              escalation_level: 1,
              note: 'Report verified via hash telemetry. Dispatched for immediate review.'
            },
            {
              id: 'up-2',
              complaint_id: 'CS-20481',
              created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
              authority: 'Dean',
              status: 'Under Review',
              escalation_level: 2,
              note: 'Security camera footage preserved in secure proctorial locker. Night patrol notified.'
            }
          ]
        };
      }

      setComplaint(found || null);
      setIsSearching(false);
      if (!found) {
        showToast('Not Found', `No complaint found with ID: ${idToLook.trim()}`, 'error');
      }
    }, 200);
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

  // 5 exact vertical glowing pulse timeline stages requested:
  // 01 Received
  // 02 Under Review
  // 03 Investigating
  // 04 Action Taken
  // 05 Resolved
  const getPulseStages = (c: Complaint) => {
    // Map current status to stage index
    let activeIndex = 1; // 01 Received default
    if (c.status === 'Submitted') activeIndex = 1;
    else if (c.status === 'Under Review') activeIndex = 2;
    else if (c.status === 'Escalated' || c.escalation_level >= 2) activeIndex = 3;
    else if (c.status === 'Action Taken') activeIndex = 4;
    else if (c.status === 'Resolved' || c.status === 'Closed') activeIndex = 5;

    return [
      {
        num: '01',
        title: 'Received',
        desc: 'Incident report filed and cryptographically signed into the CampusSafe vault.',
        completed: activeIndex > 1,
        active: activeIndex === 1,
        timestamp: '10:42 AM'
      },
      {
        num: '02',
        title: 'Under Review',
        desc: 'Disciplinary proctor and security officers assessing evidence & statements.',
        completed: activeIndex > 2,
        active: activeIndex === 2,
        timestamp: '11:15 AM'
      },
      {
        num: '03',
        title: 'Investigating',
        desc: 'CCTV analysis active; witness interviews scheduled with zero victim exposure.',
        completed: activeIndex > 3,
        active: activeIndex === 3,
        timestamp: 'In Progress'
      },
      {
        num: '04',
        title: 'Action Taken',
        desc: 'Formal warnings issued, safety patrol increased, or disciplinary tribunal summoned.',
        completed: activeIndex > 4,
        active: activeIndex === 4,
        timestamp: 'Pending Phase'
      },
      {
        num: '05',
        title: 'Resolved',
        desc: 'Case closed with verified student safety guarantee and signed institutional sanction.',
        completed: activeIndex >= 5,
        active: activeIndex === 5,
        timestamp: 'Final Stage'
      }
    ];
  };

  return (
    <div className="relative min-h-screen bg-[#050B14] text-slate-100 py-10 sm:py-16 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Volumetric Glows */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#00F2FE 1px, transparent 1px), linear-gradient(90deg, #00F2FE 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">

        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 backdrop-blur-md shadow-glow-cyan">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>SCREEN 04 — FUTURISTIC MONITORING SYSTEM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Track Complaint
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-normal">
            Real-time telemetry and procedural progression of submitted campus safety reports.
          </p>
        </div>

        {/* Input: Enter Complaint ID */}
        <div className="rounded-2xl bg-[#081522]/90 backdrop-blur-2xl border border-cyan-500/30 p-6 sm:p-7 shadow-glow-cyan relative">
          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Enter Complaint ID</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">Zero-Knowledge Verification</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                  placeholder="e.g. CS-20481"
                  className="w-full pl-4 pr-4 py-3 rounded-xl bg-[#050B14] border border-cyan-500/40 text-cyan-200 font-mono text-sm tracking-wider uppercase placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-glow-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Querying Vault...</span>
                  </>
                ) : (
                  <>
                    <span>Query Status</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
              <span className="text-slate-500">Quick Test IDs:</span>
              {['CS-20481', 'CS-2026-8F42K', 'CS-2026-91AB2'].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setSearchId(id);
                    doSearch(id);
                  }}
                  className="font-mono text-cyan-300 hover:text-white underline decoration-cyan-500/40"
                >
                  {id}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Complaint Found Display */}
        {complaint && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* ========================================================
                FLOATING GLASS COMPLAINT CARD:
                Complaint ID, Current Status, Last Updated, Assigned Authority
                ======================================================== */}
            <div className="rounded-2xl bg-[#081522]/80 backdrop-blur-xl border border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Glowing top line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-widest block mb-1">
                    ACTIVE MONITORING FILE
                  </span>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl sm:text-3xl font-mono font-black text-cyan-300 tracking-wider">
                      {complaint.complaint_id}
                    </h2>
                    <button
                      onClick={() => handleCopyId(complaint.complaint_id)}
                      className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-400 transition-colors"
                      title="Copy ID"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 shadow-glow-cyan">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>{complaint.status}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-mono font-semibold">
                    Level {complaint.escalation_level} Authority
                  </span>
                </div>
              </div>

              {/* 4 Required Metric Panels: Complaint ID, Current Status, Last Updated, Assigned Authority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-xs">
                
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Complaint ID</span>
                  <div className="font-mono font-bold text-cyan-300 text-sm">{complaint.complaint_id}</div>
                  <div className="text-[11px] text-slate-400 mt-1">Encrypted Record</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Current Status</span>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>{complaint.status}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Telemetry Active</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Last Updated</span>
                  <div className="font-bold text-slate-200 text-sm">
                    {new Date(complaint.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {new Date(complaint.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Assigned Authority</span>
                  <div className="font-bold text-purple-300 text-sm truncate">{complaint.assigned_authority}</div>
                  <div className="text-[11px] text-slate-400 mt-1">Proctorial Lead</div>
                </div>

              </div>

              {/* Description preview */}
              <div className="mt-5 pt-5 border-t border-white/5 flex items-start gap-3 text-xs text-slate-300">
                <FileText className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-white">Filed Statement: </strong>
                  {complaint.description}
                </p>
              </div>
            </div>

            {/* ========================================================
                VERTICAL GLOWING PULSE TIMELINE:
                01 Received → 02 Under Review → 03 Investigating → 04 Action Taken → 05 Resolved
                ======================================================== */}
            <div className="rounded-2xl bg-[#081522]/80 backdrop-blur-xl border border-white/15 p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <span>Procedural Progression Stream</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Connected through cryptographic verification nodes
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                  SYSTEM ONLINE
                </span>
              </div>

              {/* Vertical Timeline Container with glowing thin cyan line */}
              <div className="relative mt-8 pl-8 sm:pl-10 space-y-8">
                
                {/* Thin glowing cyan line connecting the nodes */}
                <div className="absolute left-[15px] sm:left-[19px] top-4 bottom-6 w-[2px] bg-gradient-to-b from-cyan-400 via-cyan-500/50 to-white/10 shadow-glow-cyan" />

                {getPulseStages(complaint).map((st) => (
                  <div key={st.num} className="relative group">
                    
                    {/* Glowing Node on the thin line */}
                    <div
                      className={`absolute -left-8 sm:-left-10 top-1 w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all ${
                        st.completed
                          ? 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 shadow-glow-cyan'
                          : st.active
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 border-2 border-white shadow-glow-cyan animate-pulse scale-110'
                          : 'bg-[#050B14] border border-white/20 text-slate-500'
                      }`}
                    >
                      {st.completed ? (
                        <Check className="w-4 h-4 text-cyan-300" />
                      ) : (
                        <span>{st.num}</span>
                      )}
                    </div>

                    {/* Node Glass Card */}
                    <div
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        st.active
                          ? 'bg-[#0D1C2C] border-cyan-400/50 shadow-glow-cyan'
                          : st.completed
                          ? 'bg-white/[0.04] border-cyan-500/20 hover:border-cyan-500/40'
                          : 'bg-white/[0.015] border-white/5 opacity-60'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-cyan-400 font-bold">{st.num}</span>
                          <h4 className={`text-sm sm:text-base font-bold ${
                            st.active ? 'text-white' : st.completed ? 'text-cyan-200' : 'text-slate-400'
                          }`}>
                            {st.title}
                          </h4>
                        </div>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                          st.active
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 animate-pulse'
                            : st.completed
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-white/5 text-slate-500 border-white/10'
                        }`}>
                          {st.active ? '● LIVE STAGE' : st.completed ? '✓ VERIFIED' : '○ PENDING'}
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        {st.desc}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

              {/* Updates log if available */}
              {complaint.updates && complaint.updates.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <div className="text-xs font-mono uppercase text-slate-400 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Cryptographic Audit Entries ({complaint.updates.length})</span>
                  </div>
                  <div className="space-y-2">
                    {complaint.updates.map((up) => (
                      <div key={up.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-cyan-300">{up.authority}</span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {new Date(up.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{up.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center text-cyan-400 font-mono">
        Loading Complaint Telemetry...
      </div>
    }>
      <TrackContent />
    </Suspense>
  );
}
