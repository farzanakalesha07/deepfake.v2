'use client';

import React, { useState } from 'react';
import { 
  Complaint, 
  AuthorityRole, 
  ComplaintStatus, 
  EscalationLevel 
} from '@/lib/types';
import { ComplaintStore } from '@/lib/store';
import { useToast } from './Toast';
import { 
  X, 
  ShieldAlert, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  AlertCircle, 
  FileText, 
  CheckCircle2, 
  ArrowUpRight, 
  MessageSquare, 
  Lock, 
  Download, 
  Paperclip,
  TrendingUp,
  UserX,
  Send
} from 'lucide-react';

interface ComplaintModalProps {
  complaint: Complaint | null;
  currentRole: AuthorityRole;
  onClose: () => void;
  onComplaintUpdated: (updated: Complaint) => void;
}

export const ComplaintModal: React.FC<ComplaintModalProps> = ({
  complaint,
  currentRole,
  onClose,
  onComplaintUpdated,
}) => {
  const { showToast } = useToast();
  const [newNote, setNewNote] = useState('');
  const [submittingAction, setSubmittingAction] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    action: string;
    targetStatus?: ComplaintStatus;
    targetEscalation?: EscalationLevel;
    message: string;
  }>({ isOpen: false, action: '', message: '' });

  if (!complaint) return null;

  const handleExecuteAction = (actionType: string) => {
    if (actionType === 'under_review') {
      setConfirmDialog({
        isOpen: true,
        action: 'under_review',
        targetStatus: 'Under Review',
        message: 'Are you sure you want to mark this complaint as "Under Review"? This logs an official inquiry stamp.',
      });
    } else if (actionType === 'action_taken') {
      setConfirmDialog({
        isOpen: true,
        action: 'action_taken',
        targetStatus: 'Action Taken',
        message: 'Are you sure you want to mark "Action Taken"? This indicates initial disciplinary or preventive intervention occurred.',
      });
    } else if (actionType === 'forward_dean') {
      setConfirmDialog({
        isOpen: true,
        action: 'forward_dean',
        targetStatus: 'Escalated',
        targetEscalation: 2,
        message: 'Escalate this case to the Dean of Student Affairs (Level 2)? The Dean will receive immediate jurisdiction.',
      });
    } else if (actionType === 'escalate_higher') {
      setConfirmDialog({
        isOpen: true,
        action: 'escalate_higher',
        targetStatus: 'Escalated',
        targetEscalation: 3,
        message: 'Escalate to Higher Authority / Anti-Ragging Committee (Level 3)? This triggers full university-level standing disciplinary procedures.',
      });
    } else if (actionType === 'resolve') {
      setConfirmDialog({
        isOpen: true,
        action: 'resolve',
        targetStatus: 'Resolved',
        message: 'Mark complaint as Resolved? Ensure disciplinary decisions and safety protective steps are formally fulfilled.',
      });
    }
  };

  const handleConfirmAction = () => {
    if (!complaint) return;
    setSubmittingAction(true);

    const defaultNote = 
      confirmDialog.action === 'under_review' ? `Complaint marked under preliminary evaluation by ${currentRole}.` :
      confirmDialog.action === 'action_taken' ? `Action taken and protective intervention logged by ${currentRole}.` :
      confirmDialog.action === 'forward_dean' ? `Case formally forwarded by ${currentRole} to Dean of Student Affairs.` :
      confirmDialog.action === 'escalate_higher' ? `Critical escalation invoked by ${currentRole} to Higher Anti-Ragging Authority.` :
      `Case concluded and closed as Resolved by ${currentRole}.`;

    const noteToSave = newNote.trim() ? newNote.trim() : defaultNote;

    const updated = ComplaintStore.updateComplaintStatus(
      complaint.complaint_id,
      confirmDialog.targetStatus || complaint.status,
      noteToSave,
      currentRole,
      confirmDialog.targetEscalation
    );

    if (updated) {
      onComplaintUpdated(updated);
      showToast(
        'Complaint Updated',
        `Status set to ${confirmDialog.targetStatus} by ${currentRole}`,
        'success'
      );
      setNewNote('');
    }

    setSubmittingAction(false);
    setConfirmDialog({ isOpen: false, action: '', message: '' });
  };

  const handleAddNoteOnly = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const updated = ComplaintStore.updateComplaintStatus(
      complaint.complaint_id,
      complaint.status,
      newNote.trim(),
      currentRole
    );

    if (updated) {
      onComplaintUpdated(updated);
      showToast('Internal Note Saved', 'Note visible to authorized officials only.', 'info');
      setNewNote('');
    }
  };

  // Determine permissions based on role
  const canEscalateToDean = currentRole === 'HOD' || currentRole === 'Admin';
  const canEscalateToHigher = currentRole === 'Dean' || currentRole === 'HOD' || currentRole === 'Admin';
  const canResolve = currentRole === 'Higher Authority' || currentRole === 'Dean' || currentRole === 'Admin';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-navy-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header Bar */}
        <div className="px-6 py-5 bg-navy-950 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-bold text-white font-mono">
                  {complaint.complaint_id}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  complaint.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                  complaint.status === 'Escalated' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                  complaint.status === 'Under Review' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                  'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                }`}>
                  {complaint.status}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-900/40 text-purple-300 border border-purple-700/50">
                  Level {complaint.escalation_level}: {complaint.assigned_authority}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Submitted on {new Date(complaint.created_at).toLocaleDateString()} at {complaint.incident_time || 'N/A'} • Repeat Count: {complaint.repeat_count}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body: Two column grid */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Top Quick Details Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-purple-400" />
                Category & Subtype
              </div>
              <div className="text-sm font-bold text-white">
                {complaint.type === 'ONLINE_RAGGING' ? 'Online Ragging' : 'Offline Ragging'}
              </div>
              <div className="text-xs text-cyan-400 mt-0.5">
                {complaint.subcategory}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Incident Location
              </div>
              <div className="text-sm font-bold text-white truncate" title={complaint.location}>
                {complaint.location}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Date: {complaint.incident_date}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                Frequency & Threat
              </div>
              <div className="text-sm font-bold text-white">
                {complaint.frequency}
              </div>
              <div className={`text-xs mt-0.5 font-medium ${complaint.is_ongoing ? 'text-rose-400' : 'text-slate-400'}`}>
                {complaint.is_ongoing ? '● Situation Currently Ongoing' : '○ Situation Not Ongoing'}
              </div>
            </div>
          </div>

          {/* Incident Description */}
          <div className="p-5 rounded-2xl bg-navy-950/60 border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Incident Description
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {complaint.description}
            </p>
          </div>

          {/* Evidence Section */}
          {complaint.evidence && complaint.evidence.length > 0 && (
            <div className="p-5 rounded-2xl bg-navy-950/60 border border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-cyan-400" />
                Attached Evidence ({complaint.evidence.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {complaint.evidence.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-purple-900/40 border border-purple-500/30 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-purple-300" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-semibold text-white truncate">{item.file_name}</div>
                        <div className="text-[10px] text-slate-400 uppercase">{item.file_type}</div>
                      </div>
                    </div>
                    {item.file_url && (
                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 text-xs flex items-center gap-1 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>View</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Parties: Suspect Details & Victim Details (Role-Protected) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Suspect Details */}
            <div className="p-5 rounded-2xl bg-navy-950/60 border border-rose-500/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                  <UserX className="w-4 h-4 text-rose-400" />
                  Accused / Suspect Details
                </h4>
                <span className="text-[10px] bg-rose-500/10 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30">
                  Target Profile
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400">Name / Handle: </span>
                  <span className="text-white font-semibold">
                    {complaint.suspect?.name || 'Not provided / Unknown'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Department: </span>
                  <span className="text-slate-200">
                    {complaint.suspect?.department || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Class / Year: </span>
                  <span className="text-slate-200">
                    {complaint.suspect?.class_year || 'N/A'}
                  </span>
                </div>
                {complaint.suspect?.phone && (
                  <div>
                    <span className="text-slate-400">Phone: </span>
                    <span className="text-slate-200">{complaint.suspect.phone}</span>
                  </div>
                )}
                {complaint.suspect?.additional_info && (
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-slate-400 block mb-0.5">Additional Intel:</span>
                    <span className="text-slate-300 italic">{complaint.suspect.additional_info}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Victim Details (Role Protected) */}
            <div className="p-5 rounded-2xl bg-navy-950/60 border border-purple-500/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-purple-400" />
                  Reporting Student (Confidential)
                </h4>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                  RBAC Encrypted
                </span>
              </div>

              {complaint.victim?.anonymous ? (
                <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/10 text-center">
                  <UserX className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <div className="text-xs font-semibold text-slate-300">
                    Anonymous Report Submitted
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Student chose not to disclose identifying credentials.
                  </div>
                  {complaint.victim.phone && (
                    <div className="mt-3 text-xs text-cyan-300 font-mono">
                      Emergency Callback: {complaint.victim.phone}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400">Student Name: </span>
                    <span className="text-white font-semibold">
                      {complaint.victim?.name || 'Restricted'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Student ID: </span>
                    <span className="text-cyan-300 font-mono">
                      {complaint.victim?.student_id || 'Restricted'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Department: </span>
                    <span className="text-slate-200">
                      {complaint.victim?.department || 'Restricted'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Class / Year: </span>
                    <span className="text-slate-200">
                      {complaint.victim?.class_year || 'Restricted'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex flex-wrap gap-4">
                    {complaint.victim?.phone && (
                      <div>
                        <span className="text-slate-400">Phone: </span>
                        <span className="text-slate-200 font-mono">{complaint.victim.phone}</span>
                      </div>
                    )}
                    {complaint.victim?.email && (
                      <div>
                        <span className="text-slate-400">Email: </span>
                        <span className="text-slate-200">{complaint.victim.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Audit Trail / Timeline Log */}
          <div className="p-5 rounded-2xl bg-navy-950/60 border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Action History & Internal Audit Trail
            </h4>
            
            <div className="space-y-4">
              {complaint.updates && complaint.updates.map((update, idx) => (
                <div key={update.id || idx} className="relative pl-6 pb-4 border-l border-white/15 last:border-0 last:pb-0">
                  <div className="absolute -left-2 top-0.5 w-4 h-4 rounded-full bg-navy-900 border-2 border-cyan-400" />
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span>{update.authority}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-normal">
                        Status: {update.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {new Date(update.created_at).toLocaleString()}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                    {update.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Add Internal Note Form */}
          <form onSubmit={handleAddNoteOnly} className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              Append Internal Disciplinary Note ({currentRole})
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter confidential case observation or instruction..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </div>
          </form>

        </div>

        {/* Modal Footer: Authority Action Buttons */}
        <div className="px-6 py-4 bg-navy-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Current Role: <strong className="text-cyan-300">{currentRole}</strong>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {complaint.status !== 'Under Review' && complaint.status !== 'Resolved' && (
              <button
                onClick={() => handleExecuteAction('under_review')}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors"
              >
                Mark Under Review
              </button>
            )}

            {complaint.status !== 'Action Taken' && complaint.status !== 'Resolved' && (
              <button
                onClick={() => handleExecuteAction('action_taken')}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 transition-colors"
              >
                Mark Action Taken
              </button>
            )}

            {canEscalateToDean && complaint.escalation_level < 2 && complaint.status !== 'Resolved' && (
              <button
                onClick={() => handleExecuteAction('forward_dean')}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600/40 hover:bg-purple-600/60 text-purple-200 border border-purple-500/50 flex items-center gap-1.5 transition-colors"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Forward to Dean</span>
              </button>
            )}

            {canEscalateToHigher && complaint.escalation_level < 3 && complaint.status !== 'Resolved' && (
              <button
                onClick={() => handleExecuteAction('escalate_higher')}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600/40 hover:bg-rose-600/60 text-rose-200 border border-rose-500/50 flex items-center gap-1.5 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Escalate to Anti-Ragging Apex</span>
              </button>
            )}

            {canResolve && complaint.status !== 'Resolved' && (
              <button
                onClick={() => handleExecuteAction('resolve')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-95 text-white flex items-center gap-1.5 shadow-lg transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Resolve Complaint</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Confirmation Dialog Overlay */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              Confirm Authority Action
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {confirmDialog.message}
            </p>
            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setConfirmDialog({ isOpen: false, action: '', message: '' })}
                className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 text-xs font-semibold hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                disabled={submittingAction}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold hover:opacity-90 shadow-md"
              >
                {submittingAction ? 'Processing...' : 'Confirm & Apply'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
