'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Globe, 
  MapPin, 
  Calendar, 
  Clock, 
  Paperclip, 
  UploadCloud, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  User, 
  UserX, 
  EyeOff, 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  AlertTriangle,
  Info,
  ChevronRight,
  ShieldCheck,
  FileCheck,
  Search
} from 'lucide-react';
import { ComplaintCategory, OfflineSubcategory, OnlineSubcategory, IncidentFrequency, EvidenceItem, Complaint } from '@/lib/types';
import { ComplaintStore } from '@/lib/store';
import { useToast } from '@/components/Toast';
import confetti from 'canvas-confetti';

function ReportContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  // 5-step wizard state: 1 (Type) -> 2 (Details) -> 3 (Evidence) -> 4 (Suspect) -> 5 (Privacy & Submit) -> 6 (Success)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // STEP 1: Complaint Type
  const [complaintType, setComplaintType] = useState<ComplaintCategory>('OFFLINE_RAGGING');
  const [subcategory, setSubcategory] = useState<string>('Following / Stalking');
  
  // STEP 2: Incident Details
  const [incidentDate, setIncidentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [incidentTime, setIncidentTime] = useState<string>('16:00');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [frequency, setFrequency] = useState<IncidentFrequency>('First time');
  const [isOngoing, setIsOngoing] = useState<boolean>(false);

  // STEP 3: Evidence
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [uploadingEvidence, setUploadingEvidence] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // STEP 4: Suspect Details
  const [suspectName, setSuspectName] = useState<string>('');
  const [suspectDept, setSuspectDept] = useState<string>('');
  const [suspectClass, setSuspectClass] = useState<string>('');
  const [suspectPhone, setSuspectPhone] = useState<string>('');
  const [suspectInfo, setSuspectInfo] = useState<string>('');

  // STEP 5: Privacy Confirmation & Reporter Info
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [victimName, setVictimName] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [victimDept, setVictimDept] = useState<string>('Computer Science & Engineering');
  const [classYear, setClassYear] = useState<string>('1st Year');
  const [victimPhone, setVictimPhone] = useState<string>('');
  const [victimEmail, setVictimEmail] = useState<string>('');
  const [confirmedAccuracy, setConfirmedAccuracy] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Step 6 Outcome
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  // Check URL query param for default type
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam === 'ONLINE_RAGGING') {
      setComplaintType('ONLINE_RAGGING');
      setSubcategory('Fake Accounts & Impersonation');
    } else if (typeParam === 'OFFLINE_RAGGING') {
      setComplaintType('OFFLINE_RAGGING');
      setSubcategory('Following / Stalking');
    }
  }, [searchParams]);

  // Upload handler via real API or local reader
  const uploadFiles = async (files: FileList | File[]) => {
    setUploadingEvidence(true);
    const newItems: EvidenceItem[] = [];

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            newItems.push(json.data);
            continue;
          }
        }
      } catch (err) {
        // Fallback to base64 preview
      }

      // Fallback base64
      const reader = new FileReader();
      const itemPromise = new Promise<EvidenceItem>((resolve) => {
        reader.onload = (uploadEvent) => {
          resolve({
            id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            file_name: file.name,
            file_url: (uploadEvent.target?.result as string) || '',
            file_type: file.type || 'image/jpeg',
            file_size: file.size,
            uploaded_at: new Date().toISOString(),
          });
        };
        reader.readAsDataURL(file);
      });

      const fallbackItem = await itemPromise;
      newItems.push(fallbackItem);
    }

    setEvidenceList(prev => [...prev, ...newItems]);
    setUploadingEvidence(false);
    showToast('Evidence Uploaded', `${newItems.length} file(s) attached to report locker`, 'success');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  const removeEvidence = (id: string) => {
    setEvidenceList(prev => prev.filter(item => item.id !== id));
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return !!complaintType && !!subcategory;
    }
    if (step === 2) {
      if (!location.trim()) {
        showToast('Location Required', 'Please enter where the incident took place', 'warning');
        return false;
      }
      if (!description.trim() || description.trim().length < 15) {
        showToast('Description Needed', 'Please provide at least 15 characters of detail', 'warning');
        return false;
      }
      return true;
    }
    if (step === 3) {
      // Evidence is optional
      return true;
    }
    if (step === 4) {
      // Suspect details are optional
      return true;
    }
    if (step === 5) {
      if (!isAnonymous && !victimName.trim() && !victimPhone.trim()) {
        showToast('Contact Required', 'Please enter your name or phone, or toggle Full Anonymity', 'warning');
        return false;
      }
      if (!confirmedAccuracy) {
        showToast('Affirmation Required', 'Please confirm your statement accuracy', 'warning');
        return false;
      }
      return true;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Complaint
  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);

    try {
      const payload = {
        type: complaintType,
        subcategory: subcategory as any,
        description: description.trim(),
        incident_date: incidentDate,
        incident_time: incidentTime,
        location: location.trim(),
        frequency: frequency,
        is_ongoing: isOngoing,
        victim: {
          anonymous: isAnonymous,
          name: isAnonymous ? '' : victimName.trim(),
          student_id: isAnonymous ? '' : studentId.trim(),
          department: isAnonymous ? '' : victimDept,
          class_year: isAnonymous ? '' : classYear,
          phone: isAnonymous ? '' : victimPhone.trim(),
          email: isAnonymous ? '' : victimEmail.trim(),
        },
        suspect: {
          name: suspectName.trim() || 'Unknown',
          department: suspectDept.trim(),
          class_year: suspectClass.trim(),
          phone: suspectPhone.trim(),
          additional_info: suspectInfo.trim(),
        },
        evidence: evidenceList,
      };

      const result = await ComplaintStore.submitComplaint(payload);

      setSubmittedComplaint(result);
      setCurrentStep(6);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      showToast(
        'Complaint Registered',
        `Generated ID: ${result.complaint_id}`,
        'success'
      );
    } catch (err: any) {
      showToast('Submission Error', err.message || 'Could not submit complaint', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyId = () => {
    if (submittedComplaint) {
      navigator.clipboard.writeText(submittedComplaint.complaint_id);
      setCopiedId(true);
      showToast('Copied', 'Complaint ID copied to clipboard', 'success');
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const offlineOptions: OfflineSubcategory[] = [
    'Following / Stalking',
    'Unwanted Behaviour',
    'Threats / Intimidation',
    'Physical Harassment',
    'Hostel Bullying',
    'Other Offline Incidents'
  ];

  const onlineOptions: OnlineSubcategory[] = [
    'Fake Accounts & Impersonation',
    'Threatening Messages',
    'Obscene or Abusive Content',
    'Cyber Harassment',
    'Social Media Doxxing',
    'Other Online Incidents'
  ];

  return (
    <div className="min-h-screen py-8 sm:py-14 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30 mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>CONFIDENTIAL REPORTING PORTAL</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Submit Confidential Complaint
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Your report is secured with role-restricted access. Follow the 5-step wizard to file an incident.
        </p>
      </div>

      {/* ========================================================
          GLASS PROGRESS INDICATOR: 01 → 02 → 03 → 04 → 05
          ======================================================== */}
      {currentStep <= 5 && (
        <div className="mb-10 p-3 rounded-2xl bg-white/[0.04] border border-white/[0.12] backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono">
            {[
              { num: 1, label: 'Type' },
              { num: 2, label: 'Details' },
              { num: 3, label: 'Evidence' },
              { num: 4, label: 'Suspect' },
              { num: 5, label: 'Privacy' }
            ].map((step, idx) => {
              const active = currentStep === step.num;
              const completed = currentStep > step.num;
              return (
                <React.Fragment key={step.num}>
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                        active 
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-glow-purple scale-105' 
                          : completed 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-white/5 text-slate-400 border border-white/10'
                      }`}
                    >
                      {completed ? <Check className="w-4 h-4" /> : `0${step.num}`}
                    </div>
                    <span className={`hidden sm:inline text-xs font-semibold ${
                      active ? 'text-white' : completed ? 'text-emerald-300' : 'text-slate-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < 4 && (
                    <div className="flex-1 mx-2 sm:mx-4 h-0.5 bg-white/10 relative overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          currentStep > step.num ? 'w-full bg-gradient-to-r from-purple-500 to-cyan-400' : 'w-0'
                        }`} 
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Glass Form Container */}
      <div className="glass-card p-6 sm:p-10 shadow-2xl relative">
        
        {/* ========================================================
            STEP 1: COMPLAINT TYPE
            ======================================================== */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">STEP 01</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Select Complaint Domain</h2>
              <p className="text-xs text-slate-400 mt-1">
                Choose whether the violation took place physically on campus or digitally online.
              </p>
            </div>

            {/* Two Type Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setComplaintType('OFFLINE_RAGGING');
                  setSubcategory('Following / Stalking');
                }}
                className={`p-6 rounded-2xl border text-left transition-all relative ${
                  complaintType === 'OFFLINE_RAGGING'
                    ? 'bg-purple-950/40 border-purple-500 shadow-glow-purple'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl text-purple-300">
                    🛡
                  </div>
                  {complaintType === 'OFFLINE_RAGGING' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500 text-white">
                      SELECTED
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white">Offline Ragging</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Physical harassment, following/stalking, hostel bullying, cafeteria intimidation, verbal abuse.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setComplaintType('ONLINE_RAGGING');
                  setSubcategory('Fake Accounts & Impersonation');
                }}
                className={`p-6 rounded-2xl border text-left transition-all relative ${
                  complaintType === 'ONLINE_RAGGING'
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-glow-cyan'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl text-cyan-300">
                    💻
                  </div>
                  {complaintType === 'ONLINE_RAGGING' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-black">
                      SELECTED
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white">Online Ragging</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Social media doxxing, fake impersonating handles, cyber intimidation, abusive messages, defamatory posts.
                </p>
              </button>
            </div>

            {/* Subcategory Grid */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Primary Category Classification
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(complaintType === 'OFFLINE_RAGGING' ? offlineOptions : onlineOptions).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSubcategory(opt)}
                    className={`p-3.5 rounded-xl text-xs font-medium text-left border transition-all flex items-center justify-between ${
                      subcategory === opt
                        ? 'bg-white/10 border-cyan-400 text-white shadow-sm'
                        : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{opt}</span>
                    {subcategory === opt && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {complaintType === 'ONLINE_RAGGING' && (
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>Tip for Online Harassment:</strong> We recommend attaching screenshots of chat threads, account handles, or URL links in Step 3.
                </span>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-glow-purple transition-all"
              >
                <span>Continue to Incident Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 2: INCIDENT DETAILS
            ======================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">STEP 02</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Incident Specifics</h2>
              <p className="text-xs text-slate-400 mt-1">
                Provide accurate date, time, physical or digital location, and a factual description.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>Date of Incident *</span>
                </label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Approximate Time *</span>
                </label>
                <input
                  type="time"
                  value={incidentTime}
                  onChange={(e) => setIncidentTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Exact Location / Digital Medium *</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={complaintType === 'OFFLINE_RAGGING' ? 'e.g. North Cafeteria Walkway, 2nd Floor Library' : 'e.g. Instagram Handle @xyz, WhatsApp Class Group'}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>Detailed Description of What Happened *</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe the sequence of events clearly. State what was said, actions taken by the perpetrators, and whether other witnesses were present."
                className="w-full p-4 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
                required
              />
              <div className="mt-1 text-[11px] text-slate-400 text-right">
                {description.length} characters (minimum 15 required)
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Frequency of Occurrence
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as IncidentFrequency)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-[#080D24]"
                >
                  <option value="First time">First time</option>
                  <option value="Happened before">Happened before</option>
                  <option value="Repeated frequently">Repeated frequently</option>
                </select>
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isOngoing}
                    onChange={(e) => setIsOngoing(e.target.checked)}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-white/5 border-white/20"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Incident is ongoing / threat persists</span>
                    <span className="text-[11px] text-slate-400">Flags priority investigation</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-glow-purple transition-all"
              >
                <span>Continue to Evidence</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 3: EVIDENCE UPLOAD
            ======================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">STEP 03</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Evidence &amp; Documentation</h2>
              <p className="text-xs text-slate-400 mt-1">
                Optional: Upload photos, screenshots, audio notes, or PDF records. Stored in encrypted proctorial vault.
              </p>
            </div>

            {/* Drag & Drop Box */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`p-8 rounded-2xl border-2 border-dashed text-center transition-all ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-950/30'
                  : 'border-white/15 bg-white/[0.02] hover:border-purple-500/40'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 mx-auto mb-3">
                <UploadCloud className="w-7 h-7 animate-bounce" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                Drag &amp; Drop Evidence
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                or click below to browse files from your device
              </p>

              <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-bold text-white cursor-pointer transition-colors shadow-sm">
                <Paperclip className="w-3.5 h-3.5 text-cyan-400" />
                <span>Browse Files</span>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="mt-3 text-[11px] text-slate-500 font-mono">
                PNG, JPG, PDF, MP3/WAV, MP4 (Max 25MB per file)
              </div>
            </div>

            {/* Uploaded Evidence Grid */}
            {evidenceList.length > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Attached Files ({evidenceList.length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {evidenceList.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-300 shrink-0">
                          <FileCheck className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-white truncate">{item.file_name}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{item.file_type}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEvidence(item.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-glow-purple transition-all"
              >
                <span>Continue to Suspect Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 4: SUSPECT DETAILS
            ======================================================== */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">STEP 04</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Suspect Information</h2>
              <p className="text-xs text-slate-400 mt-1">
                Provide whatever details you know. If unknown, leave blank or state what you observed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Suspect Name (if known)
                </label>
                <input
                  type="text"
                  value={suspectName}
                  onChange={(e) => setSuspectName(e.target.value)}
                  placeholder="e.g. Senior student / Handle / Nickname"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Department / Class
                </label>
                <input
                  type="text"
                  value={suspectDept}
                  onChange={(e) => setSuspectDept(e.target.value)}
                  placeholder="e.g. Mechanical 4th Year, Hostel Wing B"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Phone Number (if known)
              </label>
              <input
                type="text"
                value={suspectPhone}
                onChange={(e) => setSuspectPhone(e.target.value)}
                placeholder="e.g. +91 98765 XXXXX (or social media account)"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Additional Physical or Behavioral Markers
              </label>
              <textarea
                value={suspectInfo}
                onChange={(e) => setSuspectInfo(e.target.value)}
                rows={3}
                placeholder="e.g. Specific clothing, vehicle registration, group companions, recurring hostel gathering spots."
                className="w-full p-4 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Serial Offender Tracking:</strong> Suspect names are algorithmically cross-referenced against historical complaints to trigger automatic escalation if prior strikes exist.
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-glow-purple transition-all"
              >
                <span>Continue to Privacy Confirmation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 5: PRIVACY CONFIRMATION & SUBMIT
            ======================================================== */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">STEP 05</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Privacy Confirmation</h2>
              <p className="text-xs text-slate-400 mt-1">
                Choose your reporting mode and affirm your submission.
              </p>
            </div>

            {/* Prominent Privacy Statement */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-cyan-950/40 border border-cyan-500/30 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 text-sm font-bold">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Strict Confidentiality Guarantee</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                &ldquo;Your information will only be visible to authorized personnel.&rdquo;
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Suspects, classmates, and unauthorized staff have zero access to reporter identities. All records are guarded by strict role-based authorization.
              </p>
            </div>

            {/* Anonymous Toggle */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block">File as 100% Anonymous</span>
                <span className="text-[11px] text-slate-400">
                  No personal name, student ID, or contact number will be stored
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {/* Reporter Contact Info if not Anonymous */}
            {!isAnonymous && (
              <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Confidential Contact Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={victimName}
                      onChange={(e) => setVictimName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2 rounded-xl glass-input text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Student Roll / ID</label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. STU-2024-CSE-084"
                      className="w-full px-4 py-2 rounded-xl glass-input text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={victimPhone}
                      onChange={(e) => setVictimPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-2 rounded-xl glass-input text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Campus Email</label>
                    <input
                      type="email"
                      value={victimEmail}
                      onChange={(e) => setVictimEmail(e.target.value)}
                      placeholder="e.g. student@campus.edu"
                      className="w-full px-4 py-2 rounded-xl glass-input text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Affirmation Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmedAccuracy}
                  onChange={(e) => setConfirmedAccuracy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-white/5 border-white/20"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I affirm that this incident report is filed in good faith and the statements provided are true to the best of my knowledge.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-glow-purple transition-all"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Encrypting &amp; Filing...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Confidential Complaint &rarr;</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* ========================================================
            STEP 6: SUCCESS OUTCOME
            ======================================================== */}
        {currentStep === 6 && submittedComplaint && (
          <div className="text-center space-y-6 py-6 animate-in zoom-in-95 duration-200">
            
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-glow-safe">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                COMPLAINT REGISTERED SUCCESSFULLY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Your Report Has Been Filed
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
                Save your unique Complaint ID below to track real-time investigation progress without creating an account.
              </p>
            </div>

            {/* Unique Complaint ID Box */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-white/[0.05] border border-cyan-500/40 backdrop-blur-xl shadow-glow-cyan flex items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[10px] font-mono uppercase text-slate-400">Tracking Code</span>
                <div className="text-xl sm:text-2xl font-mono font-black text-cyan-300 tracking-wider">
                  {submittedComplaint.complaint_id}
                </div>
              </div>
              <button
                type="button"
                onClick={copyId}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId ? 'Copied!' : 'Copy ID'}</span>
              </button>
            </div>

            {/* Quick Summary Grid */}
            <div className="max-w-md mx-auto grid grid-cols-2 gap-3 text-left text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Category</span>
                <span className="font-bold text-white">{submittedComplaint.type === 'OFFLINE_RAGGING' ? 'Offline Ragging' : 'Online Ragging'}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Assigned To</span>
                <span className="font-bold text-purple-300">{submittedComplaint.assigned_authority} (Level {submittedComplaint.escalation_level})</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/track?id=${encodeURIComponent(submittedComplaint.complaint_id)}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-glow-purple transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Track Complaint Now</span>
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 text-xs sm:text-sm font-semibold transition-colors"
              >
                Return to Home
              </Link>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
}
