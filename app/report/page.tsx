'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldAlert, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  User, 
  UserX, 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  AlertTriangle,
  Ambulance,
  Wrench,
  HelpCircle,
  UploadCloud,
  X,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { ComplaintStore } from '@/lib/store';
import { Complaint, EvidenceItem, IncidentFrequency, ComplaintCategory } from '@/lib/types';
import { useToast } from '@/components/Toast';
import confetti from 'canvas-confetti';

type IssueCategory = 'Harassment' | 'Unsafe Area' | 'Medical' | 'Infrastructure' | 'Other';

interface CategoryOption {
  id: IssueCategory;
  title: string;
  desc: string;
  icon: any;
  gradient: string;
  borderHover: string;
  badge: string;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'Harassment',
    title: 'Harassment & Bullying',
    desc: 'Ragging, stalking, verbal intimidation, extortion, cyber abuse, or offensive content.',
    icon: ShieldAlert,
    gradient: 'from-purple-900/40 via-purple-600/10 to-transparent',
    borderHover: 'hover:border-purple-500/60',
    badge: 'HIGH PRIORITY ESCALATION',
  },
  {
    id: 'Unsafe Area',
    title: 'Unsafe Campus Zone',
    desc: 'Poorly lit paths, broken perimeter fences, isolated corridors, or unmonitored gates.',
    icon: AlertTriangle,
    gradient: 'from-amber-900/40 via-amber-600/10 to-transparent',
    borderHover: 'hover:border-amber-500/60',
    badge: 'PATROL DISPATCH',
  },
  {
    id: 'Medical',
    title: 'Medical Assistance',
    desc: 'Medical emergency, student injury, heat exhaustion, or mental health distress.',
    icon: Ambulance,
    gradient: 'from-rose-900/40 via-rose-600/10 to-transparent',
    borderHover: 'hover:border-rose-500/60',
    badge: 'HEALTH SQUAD',
  },
  {
    id: 'Infrastructure',
    title: 'Infrastructure Defect',
    desc: 'Broken street lamps, malfunctioning emergency call boxes, water leaks, or elevator faults.',
    icon: Wrench,
    gradient: 'from-cyan-900/40 via-cyan-600/10 to-transparent',
    borderHover: 'hover:border-cyan-500/60',
    badge: 'FACILITY REPAIR',
  },
  {
    id: 'Other',
    title: 'Other Safety Concern',
    desc: 'Suspicious vehicle loitering, unofficial fresher gatherings, or general welfare inquiry.',
    icon: HelpCircle,
    gradient: 'from-blue-900/40 via-blue-600/10 to-transparent',
    borderHover: 'hover:border-blue-500/60',
    badge: 'SAFETY INTAKE',
  },
];

const PRESET_LOCATIONS = [
  'Main Academic Quadrangle (Block A)',
  'Block B - East Corridor (Near Lab 4)',
  'Central Library North Walkway',
  'North Cafeteria & Mechanical Walkway',
  'Girls Hostel Block C Entrance',
  'Boys Hostel Wing B Corridors',
  'Sports Complex & Gymnasium Lawn',
  'West Campus Perimeter Boundary',
  'Online / Department Batch WhatsApp & Discord',
];

function ReportWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  // 3-Step reporting process: 1 (What happened?) -> 2 (Where?) -> 3 (Submit) -> 4 (Success state)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Category
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory>('Harassment');
  const [subcategory, setSubcategory] = useState<string>('Following / Stalking');

  // Step 2: Where & Details
  const [location, setLocation] = useState<string>('North Cafeteria & Mechanical Walkway');
  const [customLocation, setCustomLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [frequency, setFrequency] = useState<IncidentFrequency>('First time');
  const [incidentDate, setIncidentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [incidentTime, setIncidentTime] = useState<string>('16:30');
  const [isOngoing, setIsOngoing] = useState<boolean>(true);

  // Step 3: Victim & Suspect details
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [victimName, setVictimName] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [victimDept, setVictimDept] = useState<string>('Computer Science & Engineering');
  const [victimPhone, setVictimPhone] = useState<string>('');

  const [suspectName, setSuspectName] = useState<string>('');
  const [suspectDept, setSuspectDept] = useState<string>('');
  const [suspectNotes, setSuspectNotes] = useState<string>('');

  const [evidenceFiles, setEvidenceFiles] = useState<{ name: string; size: number }[]>([]);
  const [confirmedAccuracy, setConfirmedAccuracy] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Success state
  const [createdComplaint, setCreatedComplaint] = useState<Complaint | null>(null);
  const [idCopied, setIdCopied] = useState<boolean>(false);

  // Pre-fill location from query param if passed
  useEffect(() => {
    const locParam = searchParams.get('location');
    if (locParam) {
      setLocation(locParam);
    }
  }, [searchParams]);

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      const activeLoc = location === 'Other (Specify Below)' ? customLocation.trim() : location;
      if (!activeLoc) {
        showToast('Missing Location', 'Please specify where this incident occurred.', 'error');
        return;
      }
      if (!description.trim() || description.trim().length < 10) {
        showToast('Description Needed', 'Please provide at least a brief description (10+ characters).', 'error');
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep <= 3) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(f => ({ name: f.name, size: f.size }));
      setEvidenceFiles(prev => [...prev, ...newFiles]);
      showToast('Evidence Attached', `${newFiles.length} file(s) ready to encrypt.`, 'info');
    }
  };

  const handleRemoveFile = (index: number) => {
    setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmedAccuracy) {
      showToast('Confirmation Required', 'Please check the confirmation box to submit.', 'error');
      return;
    }

    setSubmitting(true);
    const finalLocation = location === 'Other (Specify Below)' ? customLocation.trim() : location;

    // Map into core complaint category for backend compatibility
    const mappedType: ComplaintCategory = selectedCategory === 'Harassment' ? 'OFFLINE_RAGGING' : 'OFFLINE_RAGGING';

    try {
      const newReport = ComplaintStore.submitComplaint({
        type: mappedType,
        subcategory: `${selectedCategory}: ${subcategory || 'General Incident'}`,
        description: description.trim(),
        incident_date: incidentDate,
        incident_time: incidentTime,
        location: finalLocation,
        frequency: frequency,
        is_ongoing: isOngoing,
        victim: {
          anonymous: isAnonymous,
          name: isAnonymous ? '' : victimName.trim(),
          student_id: isAnonymous ? '' : studentId.trim(),
          department: victimDept,
          phone: isAnonymous ? '' : victimPhone.trim(),
        },
        suspect: {
          name: suspectName.trim(),
          department: suspectDept.trim(),
          additional_info: suspectNotes.trim(),
        },
        evidence: evidenceFiles.map((f, i) => ({
          id: `ev-${Date.now()}-${i}`,
          file_name: f.name,
          file_url: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=600&q=80',
          file_type: 'application/octet-stream',
          uploaded_at: new Date().toISOString(),
        })),
      });

      setCreatedComplaint(newReport);
      setCurrentStep(4);

      // Celebration effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06B6D4', '#8B5CF6', '#10B981']
        });
      } catch (err) {}

      showToast('Report Submitted Securely', `Complaint ID: ${newReport.complaint_id}`, 'success');
    } catch (err: any) {
      showToast('Submission Error', err.message || 'Failed to submit complaint', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const copyComplaintId = () => {
    if (!createdComplaint) return;
    navigator.clipboard.writeText(createdComplaint.complaint_id);
    setIdCopied(true);
    showToast('Copied to Clipboard', createdComplaint.complaint_id, 'info');
    setTimeout(() => setIdCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Step Indicator Header (01 What happened? | 02 Where? | 03 Submit) */}
      {currentStep <= 3 && (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-600/15 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>CONFIDENTIAL SAFETY REPORTING</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Report an Incident
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Your report is encrypted and protected. Choose between 100% Anonymous Mode or Confidential Staff Follow-Up.
            </p>
          </div>

          {/* 3-Step Visual Progress Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto pt-2">
            {[
              { num: '01', title: 'What happened?', step: 1 },
              { num: '02', title: 'Where & When?', step: 2 },
              { num: '03', title: 'Submit Securely', step: 3 },
            ].map((s) => {
              const isCurrent = currentStep === s.step;
              const isDone = currentStep > s.step;
              return (
                <div 
                  key={s.step} 
                  className={`p-3 rounded-2xl border transition-all text-center ${
                    isCurrent 
                      ? 'bg-purple-600/20 border-cyan-400 text-white shadow-glow-cyan' 
                      : isDone
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-white/5 border-white/10 text-slate-500'
                  }`}
                >
                  <p className="text-[10px] font-mono font-bold tracking-wider opacity-80">{s.num}</p>
                  <p className="text-xs font-bold truncate mt-0.5">{s.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= STEP 01: WHAT HAPPENED? ================= */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Select Incident Category</h2>
              <p className="text-xs text-slate-400 mt-1">
                Choose the primary nature of the event so our automated escalation engine assigns appropriate jurisdictional priority.
              </p>
            </div>

            {/* Large Interactive Category Cards (As Specified) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                      isSelected
                        ? 'bg-gradient-to-br from-purple-900/50 via-navy-900 to-navy-950 border-cyan-400 shadow-glow-cyan scale-[1.02]'
                        : `bg-navy-900/50 border-white/10 ${cat.borderHover} hover:scale-[1.01]`
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isSelected 
                          ? 'bg-cyan-500 text-navy-950 shadow-glow-cyan' 
                          : 'bg-white/10 text-slate-300'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mt-4">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {cat.desc}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                      <span className={isSelected ? 'text-cyan-400' : 'text-slate-500'}>
                        {isSelected ? 'Selected Category' : 'Click to select'}
                      </span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'bg-cyan-400 border-cyan-300 text-navy-950' : 'border-white/20'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sub-specification pills based on category */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <label className="text-xs font-semibold text-slate-300">Specific Form / Type</label>
              <div className="flex flex-wrap gap-2 text-xs">
                {(selectedCategory === 'Harassment' 
                  ? ['Following / Stalking', 'Verbal Abuse & Humiliation', 'Hostel Extortion', 'Fake Accounts & Online Impersonation', 'Obscene Messages'] 
                  : selectedCategory === 'Unsafe Area' 
                  ? ['Broken Streetlight / Pitch Dark Walkway', 'Hostel Boundary Trespass', 'Unattended Security Gate', 'Isolated Study Wing']
                  : selectedCategory === 'Medical'
                  ? ['Physical Injury', 'Acute Panic / Distress', 'Heat Exhaustion', 'First Aid Needed']
                  : ['Electrical Hazard', 'Broken Door / Lock', 'Elevator Malfunction', 'Suspicious Activity']
                ).map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-xl transition-all ${
                      subcategory === sub
                        ? 'bg-purple-600 text-white font-bold shadow-sm'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-brand-violet to-cyan-500 text-white font-bold text-sm shadow-glow-purple flex items-center gap-2 hover:opacity-95 active:scale-95 transition-all"
            >
              <span>Continue to Step 02 (Where?)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 02: WHERE & WHEN? ================= */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Location & Incident Details</h2>
              <p className="text-xs text-slate-400 mt-1">
                Provide clear location information so response squads can map and investigate the area.
              </p>
            </div>

            {/* Location Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Campus Location / Building</span>
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                {PRESET_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} className="bg-navy-950 text-white">
                    {loc}
                  </option>
                ))}
                <option value="Other (Specify Below)" className="bg-navy-950 text-white">
                  Other (Specify custom location below...)
                </option>
              </select>

              {location === 'Other (Specify Below)' && (
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="Enter exact room, building, floor, or landmark..."
                  className="w-full mt-2 px-4 py-3 rounded-2xl bg-black/40 border border-cyan-400/40 text-sm text-white focus:outline-none"
                />
              )}
            </div>

            {/* Date & Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>Date of Incident</span>
                </label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Approximate Time</span>
                </label>
                <input
                  type="time"
                  value={incidentTime}
                  onChange={(e) => setIncidentTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            {/* Frequency & Escalation Trigger */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Frequency (Automated Escalation Criterion)</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['First time', 'Happened before', 'Repeated frequently'] as IncidentFrequency[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    className={`py-3 px-2 rounded-2xl border text-center transition-all text-xs font-bold ${
                      frequency === f
                        ? 'bg-purple-600/30 border-purple-500 text-purple-300 shadow-sm'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              {frequency === 'Repeated frequently' && (
                <p className="text-[11px] text-amber-400 flex items-center gap-1 mt-1">
                  <AlertTriangle className="w-3 h-3 shrink-0" />
                  Chronic harassment detected. This will trigger immediate promotion to Level 2 (Dean of Student Affairs).
                </p>
              )}
            </div>

            {/* Incident Description Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Detailed Incident Description <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what occurred, words spoken, threats made, vehicle license plate or account usernames..."
                className="w-full px-4 py-3 rounded-2xl bg-navy-950 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm shadow-glow-purple flex items-center gap-2 hover:opacity-95 active:scale-95 transition-all"
            >
              <span>Continue to Step 03 (Submit)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 03: SUBMIT SECURELY ================= */}
      {currentStep === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
            
            {/* Anonymity Toggle Card (As Specified: "Report Anonymously with a toggle") */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-950 to-navy-900 border border-cyan-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isAnonymous ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-600/20 text-purple-300'}`}>
                  {isAnonymous ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {isAnonymous ? '100% Anonymous Mode' : 'Confidential Mode (Staff Follow-Up)'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isAnonymous 
                      ? 'No name, student ID, or contact number will be stored.' 
                      : 'Identity is encrypted and only accessible by Standing Committee faculty.'}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`w-14 h-7 rounded-full transition-colors relative shrink-0 ${isAnonymous ? 'bg-cyan-500' : 'bg-purple-600'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${isAnonymous ? 'left-8' : 'left-1'}`} />
              </button>
            </div>

            {/* Confidential details if anonymous toggle is OFF */}
            {!isAnonymous && (
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 animate-in slide-in-from-top-2">
                <p className="text-xs font-semibold text-purple-300">Confidential Victim Contact Details:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={victimName}
                    onChange={(e) => setVictimName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Student ID (e.g. STU-2024-CSE-092) *"
                    className="px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Suspect Information (Optional) */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Suspect Information (Leave blank if unknown)</span>
                <span className="text-[10px] text-slate-500">OPTIONAL</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={suspectName}
                  onChange={(e) => setSuspectName(e.target.value)}
                  placeholder="Suspect Name / Social Media Handle"
                  className="px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={suspectDept}
                  onChange={(e) => setSuspectDept(e.target.value)}
                  placeholder="Suspect Department / Year (If known)"
                  className="px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Drag & Drop Evidence Upload */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <label className="text-xs font-semibold text-slate-300">Evidence Attachments (Screenshots, PDFs, Photos)</label>
              
              <div className="border-2 border-dashed border-white/15 hover:border-cyan-400/50 rounded-2xl p-6 text-center transition-all bg-white/2 cursor-pointer relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileDrop}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <UploadCloud className="w-8 h-8 text-cyan-400 mx-auto mb-2 opacity-80" />
                <p className="text-xs font-semibold text-slate-200">
                  Click or drag files here to attach evidence
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  Supported formats: PNG, JPG, PDF, MP4, MP3 (Up to 25MB)
                </p>
              </div>

              {/* Uploaded File Chips */}
              {evidenceFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {evidenceFiles.map((file, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2">
                      <span className="truncate max-w-[180px]">{file.name}</span>
                      <button type="button" onClick={() => handleRemoveFile(i)} className="text-slate-400 hover:text-white">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Confirmation Checkbox */}
            <div className="pt-2 border-t border-white/5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmedAccuracy}
                  onChange={(e) => setConfirmedAccuracy(e.target.checked)}
                  className="mt-1 rounded border-white/20 text-purple-600 focus:ring-0"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I confirm that the information provided is accurate to the best of my knowledge. I understand false reports are subject to campus student conduct guidelines.
                </span>
              </label>
            </div>
          </div>

          {/* Submit Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-brand-violet to-cyan-500 text-white font-bold text-sm shadow-glow-purple flex items-center gap-2 hover:opacity-95 active:scale-95 transition-all disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{submitting ? 'Encrypting & Transmitting...' : 'Submit Report'}</span>
            </button>
          </div>
        </form>
      )}

      {/* ================= STEP 04: SUCCESS STATE (As Specified) ================= */}
      {currentStep === 4 && createdComplaint && (
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900/90 border border-emerald-500/40 backdrop-blur-2xl shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-glow-emerald">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ✓ Report Submitted
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
              “Thank you for helping make the campus safer.”
            </p>
          </div>

          {/* Cryptographic ID Display Box */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/15 max-w-md mx-auto space-y-2">
            <p className="text-xs text-slate-400 font-medium">Your Confidential Tracking Key</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-mono font-black text-cyan-300 tracking-wider">
                {createdComplaint.complaint_id}
              </span>
              <button
                onClick={copyComplaintId}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Copy ID"
              >
                {idCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Save this ID. You can track investigation milestones publicly without logging in.
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`/track?id=${createdComplaint.complaint_id}`}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-glow-cyan transition-all flex items-center justify-center gap-2"
            >
              <span>Track Investigation Status</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/map"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
            >
              Explore Safe Zones Map
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading Report Wizard...</div>}>
      <ReportWizardContent />
    </Suspense>
  );
}
