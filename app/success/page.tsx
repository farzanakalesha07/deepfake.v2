'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  Home, 
  Copy, 
  Check, 
  Lock, 
  Clock, 
  FileCheck2,
  Sparkles,
  ExternalLink,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

function SuccessContent() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const complaintId = idParam || 'CS-20481';
  
  const [copied, setCopied] = useState(false);
  const [submittedTime, setSubmittedTime] = useState('Today, 10:42 AM');

  useEffect(() => {
    // Confetti effect on load
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00F2FE', '#3B82F6', '#8B5CF6', '#10B981']
      });
    } catch (e) {}

    const now = new Date();
    const formatted = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    setSubmittedTime(formatted);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(complaintId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative min-h-screen bg-[#050B14] text-slate-100 flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background Volumetric Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#00F2FE 1px, transparent 1px), linear-gradient(90deg, #00F2FE 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center">

        {/* Floating Holographic 3D Shield */}
        <div className="relative mb-6 group">
          {/* Cyan Glow Pulse */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
          
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl p-1 bg-gradient-to-b from-cyan-400/40 via-blue-500/20 to-transparent backdrop-blur-2xl shadow-glow-cyan">
            <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#081522]/90 border border-cyan-400/30 flex items-center justify-center relative">
              <img 
                src="/images/success-shield.jpg" 
                alt="3D Holographic Verified Shield" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Glowing Overlay Checkmark Badge */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#050B14]/90 border border-cyan-400/50 backdrop-blur-xl flex items-center gap-1.5 shadow-glow-cyan">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-mono font-bold text-cyan-300">SECURE 256-BIT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Screen Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 backdrop-blur-md shadow-glow-cyan">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>SCREEN 03 — SUCCESS STATE</span>
        </div>

        {/* Screen Title & Subtitle */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          Report Received
        </h1>
        <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-md font-normal leading-relaxed">
          Your report has been securely submitted and encrypted into the CampusSafe vault.
        </p>

        {/* Floating Glass Card with Complaint Details */}
        <div className="w-full rounded-2xl bg-[#081522]/80 backdrop-blur-xl border border-white/15 p-6 sm:p-7 mb-8 shadow-2xl relative overflow-hidden text-left">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Complaint ID
              </span>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-cyan-300 tracking-wider">
                  {complaintId}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-400 transition-colors"
                  title="Copy Complaint ID"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Status
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Received
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-1 font-mono">Submitted</span>
              <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{submittedTime}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block mb-1 font-mono">Protection Level</span>
              <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                <Lock className="w-3.5 h-3.5 text-violet-400" />
                <span>Zero-Knowledge Vault</span>
              </div>
            </div>
          </div>

          {/* Notice tip */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-2.5 text-[11px] text-slate-400">
            <FileCheck2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              Save this Complaint ID to track status updates or provide supplementary evidence at any time.
            </p>
          </div>
        </div>

        {/* Buttons / CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Link
            href={`/track?id=${complaintId}`}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center gap-2 shadow-glow-cyan hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Search className="w-4 h-4 text-slate-950" />
            <span>Track Complaint</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Link>

          <Link
            href="/"
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm bg-[#081522]/90 hover:bg-[#0D1C2C] text-slate-200 hover:text-white border border-white/15 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>Return Home</span>
          </Link>
        </div>

        {/* Floating security footer */}
        <div className="mt-10 flex items-center justify-center gap-6 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Audit Log ID: 94A-21
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Authority Dispatched
          </span>
        </div>

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center text-cyan-400 font-mono">
        Loading Report Status...
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
