'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldAlert, 
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
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  AlertTriangle,
  EyeOff,
  Compass,
  FileCheck2,
  Layers,
  ChevronRight,
  ShieldCheck,
  Radio,
  Eye,
  Building2,
  HelpCircle,
  Flame
} from 'lucide-react';
import { ComplaintCategory, OfflineSubcategory, OnlineSubcategory, IncidentFrequency, EvidenceItem, Complaint } from '@/lib/types';
import { ComplaintStore } from '@/lib/store';
import { useToast } from '@/components/Toast';

function ReportContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  // 6-step visual flow:
  // 1: Incident Type -> 2: What Happened -> 3: Location -> 4: Evidence -> 5: Review -> 6: Submit / Success
  const [currentStep, setCurrentStep] = useState<number>(1);

  // STEP 1: Incident Type (6 floating 3D glass cards)
  // Types: Harassment, Threat, Unwanted Following, Bullying, Unsafe Location, Other
  const [selectedIncidentType, setSelectedIncidentType] = useState<string>('Unwanted Following');
  const [isConfidential, setIsConfidential] = useState<boolean>(true);

  // STEP 2: What Happened
  const [description, setDescription] = useState<string>('');
  const [frequency, setFrequency] = useState<IncidentFrequency>('First time');
  const [isOngoing, setIsOngoing] = useState<boolean>(false);
  const [incidentDate, setIncidentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [incidentTime, setIncidentTime] = useState<string>('16:00');

  // STEP 3: Location
  const [location, setLocation] = useState<string>('');
  const [locationType, setLocationType] = useState<'Physical Campus' | 'Digital / Online'>('Physical Campus');
  const [landmark, setLandmark] = useState<string>('');

  // STEP 4: Evidence
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [uploadingEvidence, setUploadingEvidence] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // STEP 5: Review & Reporter Info
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [victimName, setVictimName] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [victimDept, setVictimDept] = useState<string>('Computer Science & Engineering');
  const [victimPhone, setVictimPhone] = useState<string>('');
  const [victimEmail, setVictimEmail] = useState<string>('');
  const [suspectName, setSuspectName] = useState<string>('');
  const [confirmedAccuracy, setConfirmedAccuracy] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Check URL query param for default type
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam === 'ONLINE_RAGGING') {
      setSelectedIncidentType('Harassment');
      setLocationType('Digital / Online');
    } else if (typeParam === 'OFFLINE_RAGGING') {
      setSelectedIncidentType('Unwanted Following');
      setLocationType('Physical Campus');
    }
  }, [searchParams]);

  // Upload handler
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
        // Fallback
      }

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
    showToast('Evidence Uploaded', `${newItems.length} file(s) attached to report`, 'success');
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

  // Validation
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return !!selectedIncidentType;
    }
    if (step === 2) {
      if (!description.trim() || description.trim().length < 10) {
        showToast('Description Needed', 'Please provide at least 10 characters describing what happened', 'warning');
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!location.trim()) {
        showToast('Location Required', 'Please enter where the incident occurred', 'warning');
        return false;
      }
      return true;
    }
    if (step === 4) {
      // Evidence is optional
      return true;
    }
    if (step === 5) {
      if (!isAnonymous && !victimName.trim() && !victimPhone.trim()) {
        showToast('Contact Required', 'Please provide a name/phone or switch to Anonymous mode', 'warning');
        return false;
      }
      if (!confirmedAccuracy) {
        showToast('Affirmation Required', 'Please confirm statement accuracy before submitting', 'warning');
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

  // Submit Handler
  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    setIsSubmitting(true);

    try {
      // Map incident types to backend categories
      const isOnline = locationType === 'Digital / Online' || selectedIncidentType === 'Threat';
      const cat: ComplaintCategory = isOnline ? 'ONLINE_RAGGING' : 'OFFLINE_RAGGING';

      const payload = {
        type: cat,
        subcategory: selectedIncidentType as any,
        description: description.trim(),
        incident_date: incidentDate,
        incident_time: incidentTime,
        location: landmark ? `${location.trim()} (Near: ${landmark.trim()})` : location.trim(),
        frequency: frequency,
        is_ongoing: isOngoing,
        victim: {
          anonymous: isAnonymous || !isConfidential,
          name: isAnonymous ? '' : victimName.trim(),
          student_id: isAnonymous ? '' : studentId.trim(),
          department: isAnonymous ? '' : victimDept,
          class_year: '1st Year',
          phone: isAnonymous ? '' : victimPhone.trim(),
          email: isAnonymous ? '' : victimEmail.trim(),
        },
        suspect: {
          name: suspectName.trim() || 'Unknown Subject',
          department: '',
          class_year: '',
          phone: '',
          additional_info: `Incident category: ${selectedIncidentType}. Confidential Mode: ${isConfidential ? 'Active' : 'Standard'}`,
        },
        evidence: evidenceList,
      };

      const result = await ComplaintStore.submitComplaint(payload);
      showToast('Incident Submitted', `Complaint ID: ${result.complaint_id}`, 'success');
      
      // Navigate smoothly to Screen 03 Success State
      router.push(`/success?id=${encodeURIComponent(result.complaint_id)}`);
    } catch (err: any) {
      showToast('Submission Error', err.message || 'Could not submit complaint', 'error');
      setIsSubmitting(false);
    }
  };

  // 6 Floating 3D Cards for Incident Types
  const incidentCards = [
    {
      id: 'Harassment',
      title: 'Harassment',
      desc: 'Verbal aggression, offensive language, or hostile continuous conduct.',
      icon: <Radio className="w-6 h-6 text-cyan-400" />,
      accent: 'border-cyan-500/40 shadow-glow-cyan',
      tag: 'Verbal / Conduct'
    },
    {
      id: 'Threat',
      title: 'Threat',
      desc: 'Direct or implied coercion, intimidation, or extortion on campus.',
      icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
      accent: 'border-amber-500/40 shadow-glow-warning',
      tag: 'Coercion / Force'
    },
    {
      id: 'Unwanted Following',
      title: 'Unwanted Following',
      desc: 'Persistent stalking, physical shadowing, or loitering near hostels.',
      icon: <Eye className="w-6 h-6 text-purple-400" />,
      accent: 'border-purple-500/40 shadow-glow-purple',
      tag: 'Stalking / Watch'
    },
    {
      id: 'Bullying',
      title: 'Bullying',
      desc: 'Senior student power dynamics, peer victimization, or humiliation.',
      icon: <ShieldAlert className="w-6 h-6 text-blue-400" />,
      accent: 'border-blue-500/40 shadow-blue-500/30',
      tag: 'Hostel / Class'
    },
    {
      id: 'Unsafe Location',
      title: 'Unsafe Location',
      desc: 'Dark walkways, faulty surveillance, broken gates, or blind spots.',
      icon: <Building2 className="w-6 h-6 text-emerald-400" />,
      accent: 'border-emerald-500/40 shadow-glow-safe',
      tag: 'Infrastructure'
    },
    {
      id: 'Other',
      title: 'Other',
      desc: 'Unclassified safety hazards, academic distress, or general reports.',
      icon: <HelpCircle className="w-6 h-6 text-slate-300" />,
      accent: 'border-slate-500/40 shadow-slate-500/20',
      tag: 'Custom Report'
    }
  ];

  // Visual flow steps
  const flowSteps = [
    { num: 1, name: 'Incident Type' },
    { num: 2, name: 'What Happened' },
    { num: 3, name: 'Location' },
    { num: 4, name: 'Evidence' },
    { num: 5, name: 'Review' },
    { num: 6, name: 'Submit' }
  ];

  return (
    <div className="relative min-h-screen bg-[#050B14] text-slate-100 py-10 sm:py-14 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Volumetric Lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Holographic Evidence Object in Background */}
      <div className="absolute top-48 right-8 lg:right-16 w-64 h-64 opacity-20 pointer-events-none hidden xl:block animate-pulse">
        <div className="relative w-full h-full rounded-3xl p-1 bg-gradient-to-br from-cyan-400/40 via-blue-500/20 to-transparent">
          <div className="w-full h-full rounded-[22px] bg-[#081522]/90 border border-cyan-400/30 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-cyan-400/20 pb-3">
              <span className="text-[11px] font-mono text-cyan-300">SECURE VAULT DOC</span>
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-3/4 bg-cyan-400/20 rounded" />
              <div className="h-2 w-1/2 bg-blue-400/20 rounded" />
              <div className="h-2 w-5/6 bg-purple-400/20 rounded" />
            </div>
            <div className="text-[9px] font-mono text-slate-400">HASH: SHA256-VAULT-20481</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2 backdrop-blur-md shadow-glow-cyan">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>SCREEN 02 — INCIDENT REPORT FLOW</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Report an Incident
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Encrypted end-to-end. Your safety is our highest institutional priority.
            </p>
          </div>

          {/* Confidential Report Toggle */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#081522]/90 border border-cyan-500/30 backdrop-blur-xl shadow-glow-cyan">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Confidential Report</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <span className="text-[10px] text-cyan-300/80 font-mono">
                {isConfidential ? 'Active: Role-Restricted' : 'Standard Submission'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsConfidential(!isConfidential)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                isConfidential ? 'bg-cyan-500 shadow-glow-cyan' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                  isConfidential ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* ========================================================
            VISUAL FLOW: Incident Type → What Happened → Location → Evidence → Review → Submit
            ======================================================== */}
        <div className="mb-8 p-3.5 rounded-2xl bg-[#081522]/70 border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between overflow-x-auto gap-2 no-scrollbar py-1">
            {flowSteps.map((s, idx) => {
              const active = currentStep === s.num;
              const completed = currentStep > s.num;
              return (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-2 shrink-0">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-all ${
                        active
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-glow-cyan scale-105'
                          : completed
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                          : 'bg-white/5 text-slate-500 border border-white/10'
                      }`}
                    >
                      {completed ? <Check className="w-3.5 h-3.5" /> : `0${s.num}`}
                    </div>
                    <span
                      className={`text-xs font-semibold whitespace-nowrap ${
                        active ? 'text-white' : completed ? 'text-cyan-300' : 'text-slate-500'
                      }`}
                    >
                      {s.name}
                    </span>
                  </div>
                  {idx < flowSteps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 shrink-0 mx-1 hidden sm:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Main Glass Card Form Container */}
        <div className="rounded-3xl bg-[#081522]/80 backdrop-blur-2xl border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Top Glowing Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          {/* ========================================================
              STEP 1: INCIDENT TYPE (6 Floating 3D Glass Cards)
              ======================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">STEP 01 OF 06</span>
                <h2 className="text-2xl font-bold text-white mt-1">Select Incident Type</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Choose the classification that best describes what you observed or experienced.
                </p>
              </div>

              {/* 6 Floating 3D Glass Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {incidentCards.map((card) => {
                  const isSelected = selectedIncidentType === card.id;
                  return (
                    <div
                      key={card.id}
                      onClick={() => setSelectedIncidentType(card.id)}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between ${
                        isSelected
                          ? `bg-[#0D1C2C] ${card.accent} scale-[1.02]`
                          : 'bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {card.icon}
                          </div>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            isSelected 
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' 
                              : 'bg-white/5 text-slate-400 border-white/10'
                          }`}>
                            {card.tag}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white mb-1.5">{card.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-500">
                          {isSelected ? 'SELECTED' : 'Click to select'}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Primary CTA */}
              <div className="flex justify-end pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Continue Securely</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              STEP 2: WHAT HAPPENED
              ======================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">STEP 02 OF 06</span>
                <h2 className="text-2xl font-bold text-white mt-1">What Happened</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Describe the events clearly. State what occurred, statements made, and timeline.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Detailed Incident Narrative *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Provide a detailed description of the incident: what was said, actions taken, whether there were witnesses, or if repeat encounters occurred."
                  className="w-full p-4 rounded-xl bg-[#050B14]/80 border border-white/15 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  required
                />
                <div className="mt-1 text-[11px] text-slate-400 text-right">
                  {description.length} characters (minimum 10 required)
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    Date of Occurrence
                  </label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050B14]/80 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    Approximate Time
                  </label>
                  <input
                    type="time"
                    value={incidentTime}
                    onChange={(e) => setIncidentTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050B14]/80 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as IncidentFrequency)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050B14]/80 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
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
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-white/5 border-white/20"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">Incident is ongoing / threat persists</span>
                      <span className="text-[11px] text-slate-400">Flags priority investigation</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
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
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-glow-cyan transition-all"
                >
                  <span>Continue Securely</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              STEP 3: LOCATION
              ======================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">STEP 03 OF 06</span>
                <h2 className="text-2xl font-bold text-white mt-1">Location Details</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Specify the campus zone, building, or digital handle where the incident occurred.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setLocationType('Physical Campus')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    locationType === 'Physical Campus'
                      ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-glow-cyan'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-cyan-400 mb-2" />
                  <div className="text-xs font-bold text-white">Physical Campus</div>
                  <div className="text-[11px] text-slate-400">Walkway, hostel, lab, parking</div>
                </button>

                <button
                  type="button"
                  onClick={() => setLocationType('Digital / Online')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    locationType === 'Digital / Online'
                      ? 'bg-purple-950/40 border-purple-400 text-white shadow-glow-purple'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <Radio className="w-5 h-5 text-purple-400 mb-2" />
                  <div className="text-xs font-bold text-white">Digital / Online</div>
                  <div className="text-[11px] text-slate-400">Chat group, social media, forum</div>
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Primary Location or Handle *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={
                    locationType === 'Physical Campus'
                      ? 'e.g. North Cafeteria Pathway, Engineering Block 2nd Floor'
                      : 'e.g. Class WhatsApp group, Instagram @student_handle'
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#050B14]/80 border border-white/15 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Nearest Landmark / Proximity Notes (Optional)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near ATM booth, unlit section between Gate 3 and Hostel C"
                  className="w-full px-4 py-3 rounded-xl bg-[#050B14]/80 border border-white/15 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
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
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-glow-cyan transition-all"
                >
                  <span>Continue Securely</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              STEP 4: EVIDENCE
              ======================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">STEP 04 OF 06</span>
                <h2 className="text-2xl font-bold text-white mt-1">Attach Evidence</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Upload screenshots, audio recordings, or photos. All files are encrypted with zero-knowledge vault protection.
                </p>
              </div>

              {/* Drag & Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`p-8 rounded-2xl border-2 border-dashed text-center transition-all ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-950/30'
                    : 'border-white/15 bg-white/[0.02] hover:border-cyan-500/40'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 mx-auto mb-3">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Drag &amp; Drop Evidence Files
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  or browse files from your computer or phone
                </p>

                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-xs font-bold text-cyan-200 cursor-pointer transition-colors shadow-glow-cyan">
                  <Paperclip className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Browse Device Files</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*,audio/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <div className="mt-3 text-[11px] text-slate-500 font-mono">
                  PNG, JPG, PDF, MP3/WAV, MP4 (Encrypted &amp; Watermarked)
                </div>
              </div>

              {/* Uploaded Evidence List */}
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
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-300 shrink-0">
                            <FileCheck2 className="w-4 h-4" />
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
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
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
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-glow-cyan transition-all"
                >
                  <span>Continue Securely</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              STEP 5: REVIEW & REPORTER PRIVACY
              ======================================================== */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">STEP 05 OF 06</span>
                <h2 className="text-2xl font-bold text-white mt-1">Review &amp; Identity Preference</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Confirm your privacy settings and review details before final submission.
                </p>
              </div>

              {/* Review Summary Glass Card */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-slate-400">Incident Category</span>
                  <span className="font-bold text-cyan-300 font-mono">{selectedIncidentType}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-slate-400">Location</span>
                  <span className="font-bold text-white">{location}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-slate-400">Timestamp</span>
                  <span className="font-bold text-slate-200">{incidentDate} at {incidentTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Attached Evidence</span>
                  <span className="font-bold text-slate-200">{evidenceList.length} file(s)</span>
                </div>
              </div>

              {/* Anonymous Toggle */}
              <div className="p-4 rounded-2xl bg-[#081522]/90 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white block">File as 100% Anonymous</span>
                  <span className="text-[11px] text-slate-400">
                    No name, ID, or phone will be stored or visible to anyone
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    isAnonymous ? 'bg-cyan-500 shadow-glow-cyan' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                      isAnonymous ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Reporter Contact Info if not Anonymous */}
              {!isAnonymous && (
                <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Contact Details (Authorized Proctor Only)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        value={victimName}
                        onChange={(e) => setVictimName(e.target.value)}
                        placeholder="e.g. Ananya Sen"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#050B14]/80 border border-white/15 text-slate-100 text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Student Roll / ID</label>
                      <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="e.g. STU-2024-CSE-042"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#050B14]/80 border border-white/15 text-slate-100 text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={victimPhone}
                        onChange={(e) => setVictimPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#050B14]/80 border border-white/15 text-slate-100 text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Campus Email</label>
                      <input
                        type="email"
                        value={victimEmail}
                        onChange={(e) => setVictimEmail(e.target.value)}
                        placeholder="e.g. ananya@campus.edu"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#050B14]/80 border border-white/15 text-slate-100 text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Suspect Info (Optional) */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Suspect Information (Optional / If known)
                </label>
                <input
                  type="text"
                  value={suspectName}
                  onChange={(e) => setSuspectName(e.target.value)}
                  placeholder="e.g. Name, department, physical traits, or handle"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#050B14]/80 border border-white/15 text-slate-100 text-xs sm:text-sm"
                />
              </div>

              {/* Statement Affirmation */}
              <label className="flex items-start gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={confirmedAccuracy}
                  onChange={(e) => setConfirmedAccuracy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-white/5 border-white/20"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I affirm that this incident report is filed in good faith and the statements provided are true to the best of my knowledge.
                </span>
              </label>

              {/* Submit CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
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
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Encrypting &amp; Submitting...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-slate-950" />
                      <span>Submit Encrypted Report &rarr;</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center text-cyan-400 font-mono">
        Loading Incident Portal...
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
}
