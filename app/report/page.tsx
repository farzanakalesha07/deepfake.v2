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
  Info
} from 'lucide-react';
import { ComplaintCategory, OfflineSubcategory, OnlineSubcategory, IncidentFrequency, EvidenceItem, Complaint } from '@/lib/types';
import { ComplaintStore } from '@/lib/store';
import { useToast } from '@/components/Toast';
import confetti from 'canvas-confetti';

function ReportContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  // Step state: 1 (Type) -> 2 (Details) -> 3 (Victim) -> 4 (Suspect) -> 5 (Review) -> 6 (Success)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [complaintType, setComplaintType] = useState<ComplaintCategory>('OFFLINE_RAGGING');
  const [subcategory, setSubcategory] = useState<string>('Following / Stalking');
  
  // Step 2: Incident Details
  const [incidentDate, setIncidentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [incidentTime, setIncidentTime] = useState<string>('16:00');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [frequency, setFrequency] = useState<IncidentFrequency>('First time');
  const [isOngoing, setIsOngoing] = useState<boolean>(false);
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [uploadingEvidence, setUploadingEvidence] = useState<boolean>(false);

  // Step 3: Victim Details
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [victimName, setVictimName] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [victimDept, setVictimDept] = useState<string>('Computer Science & Engineering');
  const [classYear, setClassYear] = useState<string>('1st Year');
  const [victimPhone, setVictimPhone] = useState<string>('');
  const [victimEmail, setVictimEmail] = useState<string>('');

  // Step 4: Suspect Details
  const [suspectName, setSuspectName] = useState<string>('');
  const [suspectDept, setSuspectDept] = useState<string>('');
  const [suspectClass, setSuspectClass] = useState<string>('');
  const [suspectPhone, setSuspectPhone] = useState<string>('');
  const [suspectInfo, setSuspectInfo] = useState<string>('');

  // Step 5: Affirmation & Submission
  const [confirmedAccuracy, setConfirmedAccuracy] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Step 6: Post-submission outcome
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

  // Handle Mock/Base64 File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingEvidence(true);
    const newItems: EvidenceItem[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        newItems.push({
          id: `ev-${Date.now()}-${Math.random()}`,
          file_name: file.name,
          file_url: (uploadEvent.target?.result as string) || '',
          file_type: file.type || 'file',
          file_size: file.size,
          uploaded_at: new Date().toISOString(),
        });

        if (newItems.length === files.length) {
          setEvidenceList((prev) => [...prev, ...newItems]);
          setUploadingEvidence(false);
          showToast('Evidence Uploaded', `${files.length} file(s) attached securely.`, 'success');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeEvidence = (id: string) => {
    setEvidenceList((prev) => prev.filter((item) => item.id !== id));
  };

  // Validation before proceeding
  const handleNextFromStep1 = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextFromStep2 = () => {
    if (!location.trim()) {
      showToast('Location Required', 'Please specify where the incident took place.', 'warning');
      return;
    }
    if (!description.trim() || description.trim().length < 15) {
      showToast('Description Needed', 'Please provide a clear description (at least 15 characters).', 'warning');
      return;
    }
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextFromStep3 = () => {
    if (!isAnonymous && !victimName.trim()) {
      showToast('Name Required', 'Please enter your name or switch to Anonymous Report mode.', 'warning');
      return;
    }
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextFromStep4 = () => {
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submission
  const handleSubmitComplaint = async () => {
    if (!confirmedAccuracy) {
      showToast('Confirmation Required', 'Please confirm the accuracy checkbox before submitting.', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = ComplaintStore.submitComplaint({
        type: complaintType,
        subcategory: subcategory as any,
        description,
        incident_date: incidentDate,
        incident_time: incidentTime,
        location,
        frequency,
        is_ongoing: isOngoing,
        victim: {
          anonymous: isAnonymous,
          name: isAnonymous ? '' : victimName,
          student_id: isAnonymous ? '' : studentId,
          department: isAnonymous ? victimDept : victimDept,
          class_year: isAnonymous ? classYear : classYear,
          phone: victimPhone,
          email: isAnonymous ? '' : victimEmail,
        },
        suspect: {
          name: suspectName,
          department: suspectDept,
          class_year: suspectClass,
          phone: suspectPhone,
          additional_info: suspectInfo,
        },
        evidence: evidenceList,
      });

      setSubmittedComplaint(created);
      setCurrentStep(6);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Trigger celebratory confetti for student courage
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // canvas-confetti fallback
      }

      showToast(
        'Complaint Submitted!',
        `Your unique ID is ${created.complaint_id}. Please save it.`,
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('Submission Error', 'Failed to register complaint. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyComplaintId = () => {
    if (!submittedComplaint) return;
    navigator.clipboard.writeText(submittedComplaint.complaint_id);
    setCopiedId(true);
    showToast('Copied to Clipboard', submittedComplaint.complaint_id, 'info');
    setTimeout(() => setCopiedId(false), 2500);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Multi-step Progress Header */}
      {currentStep < 6 && (
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL INCIDENT INTAKE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Report an Incident
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Take a few moments to provide details. Your report will be encrypted and routed according to campus safety protocols.
          </p>

          {/* Stepper Dots & Labels */}
          <div className="mt-8 flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 -z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 -translate-y-1/2 -z-0 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />

            {[
              { num: 1, label: 'Type' },
              { num: 2, label: 'Incident' },
              { num: 3, label: 'Victim' },
              { num: 4, label: 'Suspect' },
              { num: 5, label: 'Submit' },
            ].map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div key={step.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isPast
                        ? 'bg-cyan-500 text-navy-950 ring-4 ring-cyan-500/20'
                        : isCurrent
                        ? 'bg-purple-600 text-white ring-4 ring-purple-600/30 scale-110'
                        : 'bg-navy-900 border border-white/20 text-slate-400'
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
                  </div>
                  <span className={`text-[11px] font-medium mt-2 hidden sm:block ${
                    isCurrent ? 'text-white font-bold' : 'text-slate-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Multi-Step Container Card */}
      <div className="bg-navy-900/90 border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative">

        {/* =========================================================
            STEP 1: COMPLAINT TYPE
            ========================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Step 1: Select Incident Category
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Choose whether this incident occurred physically on campus or virtually online.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Option A: Offline Ragging */}
              <div
                onClick={() => {
                  setComplaintType('OFFLINE_RAGGING');
                  setSubcategory('Following / Stalking');
                }}
                className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-200 flex flex-col justify-between ${
                  complaintType === 'OFFLINE_RAGGING'
                    ? 'bg-purple-950/40 border-purple-500 shadow-glow-purple ring-1 ring-purple-500'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
                      <ShieldAlert className="w-6 h-6 text-purple-400" />
                    </div>
                    {complaintType === 'OFFLINE_RAGGING' && (
                      <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    OFFLINE RAGGING
                  </h3>
                  <div className="text-xs font-semibold text-purple-300 mb-3">
                    Physical / In-Person Harassment
                  </div>
                  <p className="text-xs text-slate-300 mb-4">
                    Examples include:
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                    <li>Following / stalking on campus paths</li>
                    <li>Unwanted behaviour or forced tasks</li>
                    <li>Threats, intimidation &amp; hostel bullying</li>
                    <li>Physical assault or restraint</li>
                    <li>Other offline campus incidents</li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-xs font-medium text-purple-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Classrooms, Hostels, Canteen &amp; Grounds</span>
                </div>
              </div>

              {/* Option B: Online Ragging */}
              <div
                onClick={() => {
                  setComplaintType('ONLINE_RAGGING');
                  setSubcategory('Fake Accounts & Impersonation');
                }}
                className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-200 flex flex-col justify-between ${
                  complaintType === 'ONLINE_RAGGING'
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-glow-cyan ring-1 ring-cyan-500'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-cyan-400" />
                    </div>
                    {complaintType === 'ONLINE_RAGGING' && (
                      <span className="w-6 h-6 rounded-full bg-cyan-500 text-navy-950 flex items-center justify-center font-bold">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    ONLINE RAGGING
                  </h3>
                  <div className="text-xs font-semibold text-cyan-300 mb-3">
                    Digital / Cyber Harassment
                  </div>
                  <p className="text-xs text-slate-300 mb-4">
                    Examples include:
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                    <li>Fake accounts &amp; impersonation</li>
                    <li>Threatening messages &amp; extortion</li>
                    <li>Obscene, abusive or non-consensual content</li>
                    <li>Social media doxxing &amp; cyber harassment</li>
                    <li>Other digital/online incidents</li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-xs font-medium text-cyan-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>WhatsApp, Instagram, Discord &amp; Forums</span>
                </div>
              </div>

            </div>

            {/* Subcategory dropdown */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Specify Primary Incident Subcategory
              </label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                {complaintType === 'OFFLINE_RAGGING' ? (
                  <>
                    <option value="Following / Stalking">Following / Stalking</option>
                    <option value="Unwanted Behaviour">Unwanted Behaviour</option>
                    <option value="Threats / Intimidation">Threats / Intimidation</option>
                    <option value="Physical Harassment">Physical Harassment</option>
                    <option value="Hostel Bullying">Hostel Bullying</option>
                    <option value="Other Offline Incidents">Other Offline Incidents</option>
                  </>
                ) : (
                  <>
                    <option value="Fake Accounts & Impersonation">Fake Accounts & Impersonation</option>
                    <option value="Threatening Messages">Threatening Messages</option>
                    <option value="Obscene or Abusive Content">Obscene or Abusive Content</option>
                    <option value="Cyber Harassment">Cyber Harassment</option>
                    <option value="Social Media Doxxing">Social Media Doxxing</option>
                    <option value="Other Online Incidents">Other Online Incidents</option>
                  </>
                )}
              </select>
            </div>

            {/* Step 1 Actions */}
            <div className="pt-6 flex justify-end">
              <button
                type="button"
                onClick={handleNextFromStep1}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm flex items-center gap-2 hover:opacity-95 shadow-glow-purple transition-all"
              >
                <span>Continue to Incident Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            STEP 2: INCIDENT DETAILS & EVIDENCE
            ========================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Step 2: Incident Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Provide accurate situational context to assist the inquiry authority.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Date of Incident *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Approximate Time
                </label>
                <input
                  type="time"
                  value={incidentTime}
                  onChange={(e) => setIncidentTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Exact Location or Digital Platform *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. North Cafeteria Walkway, Boys Hostel Room 302, Instagram @username"
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Detailed Incident Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe what occurred clearly. Include what was said, any actions taken, who was present, and immediate consequences..."
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed"
              />
            </div>

            {/* Frequency & Ongoing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  How often has this happened? *
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as IncidentFrequency)}
                  className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="First time">First time</option>
                  <option value="Happened before">Happened before</option>
                  <option value="Repeated frequently">Repeated frequently</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Repeated reports automatically escalate higher in the authority chain.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Is the situation currently ongoing? *
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOngoing(true)}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all ${
                      isOngoing
                        ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                        : 'bg-navy-950 border-white/15 text-slate-400'
                    }`}
                  >
                    Yes (Active Danger)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOngoing(false)}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all ${
                      !isOngoing
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                        : 'bg-navy-950 border-white/15 text-slate-400'
                    }`}
                  >
                    No (Past Event)
                  </button>
                </div>
              </div>
            </div>

            {/* Optional Evidence Upload */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-cyan-400" />
                  Optional Evidence Upload
                </label>
                <span className="text-[11px] text-slate-400">
                  Screenshots, Photos, PDFs, Audio
                </span>
              </div>

              <div className="border-2 border-dashed border-white/20 hover:border-cyan-400/50 rounded-2xl p-6 text-center transition-colors">
                <input
                  type="file"
                  id="evidence-upload"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="evidence-upload"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <UploadCloud className="w-8 h-8 text-cyan-400" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    Click to select files or drag &amp; drop
                  </span>
                  <span className="text-[11px] text-slate-400">
                    PNG, JPG, PDF up to 25MB. Files are encrypted on transmission.
                  </span>
                </label>
              </div>

              {/* Uploaded Files Previews */}
              {evidenceList.length > 0 && (
                <div className="mt-4 space-y-2">
                  {evidenceList.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-navy-950 border border-white/10 text-xs text-slate-200"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="truncate">{item.file_name}</span>
                        {item.file_size && (
                          <span className="text-[10px] text-slate-500">
                            ({(item.file_size / 1024).toFixed(1)} KB)
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEvidence(item.id)}
                        className="text-slate-400 hover:text-rose-400 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Privacy notice banner */}
            <div className="p-4 rounded-xl bg-navy-950 border border-cyan-500/20 flex items-center gap-3 text-xs text-cyan-300">
              <Lock className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>Only authorized personnel can access sensitive complaint information.</span>
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-3 rounded-xl bg-white/10 text-slate-300 font-semibold text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNextFromStep2}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm flex items-center gap-2 hover:opacity-95 shadow-glow-purple transition-all"
              >
                <span>Continue to Victim Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            STEP 3: VICTIM DETAILS (ANONYMOUS VS CONFIDENTIAL)
            ========================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Step 3: Victim Identity Options
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Choose between complete anonymity or confidential contact for proactive support.
              </p>
            </div>

            {/* Mode Selector Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setIsAnonymous(false)}
                className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                  !isAnonymous
                    ? 'bg-purple-950/40 border-purple-500 shadow-glow-purple'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Confidential Report</h4>
                    <span className="text-[11px] text-purple-300">Recommended for follow-up</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Your identity is protected under college privacy bylaws and only accessed by the investigating authority.
                </p>
              </div>

              <div
                onClick={() => setIsAnonymous(true)}
                className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                  isAnonymous
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-glow-cyan'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                    <EyeOff className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Anonymous Report</h4>
                    <span className="text-[11px] text-cyan-300">100% Identity Shielded</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  No name or student ID is recorded. You will rely solely on your Complaint ID for updates.
                </p>
              </div>
            </div>

            {/* Explanation Quote */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 italic">
              &ldquo;You may skip optional personal information. Providing contact details can help authorities follow up with you.&rdquo;
            </div>

            {/* Form Fields for Confidential Mode */}
            {!isAnonymous ? (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={victimName}
                      onChange={(e) => setVictimName(e.target.value)}
                      placeholder="e.g. Aditi Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Student Roll / ID
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. STU-2024-CSE-091"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Department
                    </label>
                    <select
                      value={victimDept}
                      onChange={(e) => setVictimDept(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Electronics & Communication">Electronics & Communication</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Biotechnology">Biotechnology</option>
                      <option value="Management Studies (MBA/BBA)">Management Studies</option>
                      <option value="Applied Sciences">Applied Sciences</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Class / Year
                    </label>
                    <select
                      value={classYear}
                      onChange={(e) => setClassYear(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="1st Year (Fresher)">1st Year (Fresher)</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="Final Year">Final Year</option>
                      <option value="Postgraduate / PhD">Postgraduate / PhD</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={victimPhone}
                      onChange={(e) => setVictimPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={victimEmail}
                      onChange={(e) => setVictimEmail(e.target.value)}
                      placeholder="student@campus.edu"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Anonymous Mode Fields */
              <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-4">
                <div className="flex items-center gap-3 text-cyan-300 text-xs font-semibold">
                  <EyeOff className="w-5 h-5" />
                  <span>Anonymous Mode Enabled: Identifying fields have been removed.</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Optional Secure Callback Phone / Signal (Purely for emergency follow-up)
                  </label>
                  <input
                    type="tel"
                    value={victimPhone}
                    onChange={(e) => setVictimPhone(e.target.value)}
                    placeholder="Optional phone number (leave blank if preferred)"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-3 rounded-xl bg-white/10 text-slate-300 font-semibold text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNextFromStep3}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm flex items-center gap-2 hover:opacity-95 shadow-glow-purple transition-all"
              >
                <span>Continue to Suspect Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            STEP 4: SUSPECT DETAILS (ALL OPTIONAL)
            ========================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Step 4: Suspect / Accused Details
                </h2>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10 font-semibold">
                  All Fields Optional
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Provide whatever information is known. This helps the automatic escalation engine detect repeat offenders.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/80 border border-white/10 text-xs text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>&ldquo;Ignore any field if you do not know the information.&rdquo;</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Suspect Name or Handle
                  </label>
                  <input
                    type="text"
                    value={suspectName}
                    onChange={(e) => setSuspectName(e.target.value)}
                    placeholder="e.g. Vikas R. or @campus_threat"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Department
                  </label>
                  <input
                    type="text"
                    value={suspectDept}
                    onChange={(e) => setSuspectDept(e.target.value)}
                    placeholder="e.g. Mechanical Engineering"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Class / Year
                  </label>
                  <input
                    type="text"
                    value={suspectClass}
                    onChange={(e) => setSuspectClass(e.target.value)}
                    placeholder="e.g. Final Year / 3rd Year"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number / Social Profile
                  </label>
                  <input
                    type="text"
                    value={suspectPhone}
                    onChange={(e) => setSuspectPhone(e.target.value)}
                    placeholder="e.g. Phone number, Instagram link, or Discord ID"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Additional Identifying Information
                </label>
                <textarea
                  value={suspectInfo}
                  onChange={(e) => setSuspectInfo(e.target.value)}
                  rows={3}
                  placeholder="Physical descriptions, vehicle license number, associates, hostel room number, or specific mannerisms..."
                  className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-3 rounded-xl bg-white/10 text-slate-300 font-semibold text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNextFromStep4}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm flex items-center gap-2 hover:opacity-95 shadow-glow-purple transition-all"
              >
                <span>Review &amp; Confirm Submission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            STEP 5: REVIEW & CONFIRMATION
            ========================================================= */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Step 5: Review &amp; Submit Complaint
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Verify the summarized details before submitting to the encrypted intake vault.
              </p>
            </div>

            {/* Summary Cards */}
            <div className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <span className="text-xs text-slate-400">Category &amp; Type</span>
                  <div className="text-sm font-bold text-white">
                    {complaintType === 'OFFLINE_RAGGING' ? 'Offline Ragging' : 'Online Ragging'} — {subcategory}
                  </div>
                </div>
                <div className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {frequency}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-xs text-slate-400">Incident Details</div>
                <div className="text-xs text-slate-300">
                  <strong>Date &amp; Time:</strong> {incidentDate} at {incidentTime} • <strong>Location:</strong> {location}
                </div>
                <div className="text-xs text-slate-300 pt-2 border-t border-white/5">
                  <strong>Description:</strong> {description}
                </div>
                {evidenceList.length > 0 && (
                  <div className="text-xs text-cyan-300 font-semibold pt-1">
                    ✓ {evidenceList.length} evidence attachment(s) ready for upload
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400 mb-1">Reporting Mode</div>
                  <div className="text-sm font-bold text-white">
                    {isAnonymous ? 'Anonymous Report' : `Confidential (${victimName})`}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {isAnonymous ? 'Identity omitted' : `${victimDept} • ${classYear}`}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400 mb-1">Suspect Profile</div>
                  <div className="text-sm font-bold text-white">
                    {suspectName || 'Not specified'}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {suspectDept || 'Unknown department'}
                  </div>
                </div>
              </div>

            </div>

            {/* Mandatory Checkbox Affirmation */}
            <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmedAccuracy}
                  onChange={(e) => setConfirmedAccuracy(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-purple-500 text-purple-600 focus:ring-purple-500 focus:ring-offset-navy-950"
                />
                <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  &ldquo;I confirm that the information provided is accurate to the best of my knowledge.&rdquo;
                </span>
              </label>
              <div className="text-[11px] text-slate-400 pl-7">
                CampusSafe guarantees zero retaliation. Intentionally fraudulent complaints are subject to disciplinary review.
              </div>
            </div>

            {/* Navigation & Submit Button */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-5 py-3 rounded-xl bg-white/10 text-slate-300 font-semibold text-sm hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              
              <button
                type="button"
                disabled={!confirmedAccuracy || isSubmitting}
                onClick={handleSubmitComplaint}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-brand-violet to-cyan-500 disabled:opacity-50 text-white font-bold text-base flex items-center gap-2.5 hover:opacity-95 shadow-glow-purple transition-all"
              >
                {isSubmitting ? (
                  <span>Encrypting &amp; Submitting...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Submit Confidential Complaint</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            STEP 6: SUCCESS & UNIQUE COMPLAINT ID GENERATION
            ========================================================= */}
        {currentStep === 6 && submittedComplaint && (
          <div className="text-center py-6 space-y-8 animate-in zoom-in-95 duration-300">
            
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
                REPORT FILED SECURELY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Your complaint has been submitted successfully.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
                Our automatic intake engine has verified the submission and initiated dispatch to the appointed campus authority.
              </p>
            </div>

            {/* Unique Complaint ID Box */}
            <div className="max-w-md mx-auto p-6 rounded-3xl bg-navy-950 border border-cyan-500/30 shadow-glow-cyan text-left space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Unique Complaint ID
                </span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-mono">
                  Keep Secret
                </span>
              </div>

              <div className="flex items-center justify-between bg-navy-900 p-3.5 rounded-2xl border border-white/10">
                <span className="text-2xl font-black font-mono tracking-wider text-cyan-300">
                  {submittedComplaint.complaint_id}
                </span>
                <button
                  type="button"
                  onClick={copyComplaintId}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-slate-400">Submission Date:</span>
                  <span>{new Date(submittedComplaint.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Complaint Category:</span>
                  <span className="font-semibold text-white">{submittedComplaint.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Initial Status:</span>
                  <span className="text-amber-400 font-bold">{submittedComplaint.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Authority:</span>
                  <span className="text-purple-300 font-bold">
                    Level {submittedComplaint.escalation_level} ({submittedComplaint.assigned_authority})
                  </span>
                </div>
              </div>

              {/* Automatic Escalation Note if triggered */}
              {submittedComplaint.repeat_count > 1 && (
                <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-500/30 text-xs text-purple-200">
                  <strong className="block text-white mb-0.5">⚡ Automatic Escalation Triggered</strong>
                  Repeated incident pattern detected (Report #{submittedComplaint.repeat_count}). Escalated to {submittedComplaint.assigned_authority}.
                </div>
              )}

            </div>

            {/* Instruction Warning */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3 text-left">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Important:</strong> Save your Complaint ID. You will need it to track your complaint and view updates.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href={`/track?id=${encodeURIComponent(submittedComplaint.complaint_id)}`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm shadow-glow-purple hover:opacity-95 transition-all"
              >
                Track Complaint
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-sm transition-colors"
              >
                Return Home
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
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading secure intake form...</span>
        </div>
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
}
