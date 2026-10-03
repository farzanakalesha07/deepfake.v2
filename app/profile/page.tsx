'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  ShieldCheck, 
  FileText, 
  Bell, 
  Lock, 
  LogOut, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ChevronRight, 
  MapPin, 
  Sliders, 
  Key, 
  Moon, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { ComplaintStore } from '@/lib/store';
import { Complaint } from '@/lib/types';

export default function StudentProfilePage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [activeTab, setActiveTab] = useState<'reports' | 'preferences' | 'notifications' | 'privacy'>('reports');

  // Safety Preferences state
  const [nightEscortAlerts, setNightEscortAlerts] = useState(true);
  const [proximityAlerts, setProximityAlerts] = useState(true);
  const [anonymousByDefault, setAnonymousByDefault] = useState(false);
  const [biometricVerification, setBiometricVerification] = useState(true);

  useEffect(() => {
    setComplaints(ComplaintStore.getComplaints());
    const handleUpdate = () => {
      setComplaints(ComplaintStore.getComplaints());
    };
    window.addEventListener('campussafe_storage_updated', handleUpdate);
    return () => window.removeEventListener('campussafe_storage_updated', handleUpdate);
  }, []);

  const studentData = {
    name: 'Aarav Patel',
    id: 'STU-2024-CSE-092',
    department: 'Computer Science & Engineering',
    year: '3rd Year (Semester 5)',
    email: 'aarav.patel@campus.edu',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    safetyScore: 94,
    status: 'Verified Student • Safe',
  };

  const getStatusBadge = (status: Complaint['status']) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-500/15 border-blue-500/30 text-blue-300';
      case 'Under Review':
        return 'bg-purple-500/15 border-purple-500/30 text-purple-300';
      case 'Escalated':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-300';
      case 'Action Taken':
        return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
      case 'Resolved':
        return 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300';
      default:
        return 'bg-slate-500/15 border-slate-500/30 text-slate-300';
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Profile Header Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/90 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 relative z-10 text-center sm:text-left">
          <div className="relative">
            <img
              src={studentData.avatar}
              alt={studentData.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-cyan-400/50 shadow-glow-cyan"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-navy-950 flex items-center justify-center text-[10px] text-white font-bold" title="Identity Verified">
              ✓
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {studentData.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {studentData.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {studentData.department} • <span className="text-cyan-400 font-semibold">{studentData.year}</span>
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Student ID: {studentData.id} • {studentData.email}
            </p>
          </div>
        </div>

        {/* Safety Score Meter Card */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-4 relative z-10 sm:self-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-lg shadow-glow-emerald">
            {studentData.safetyScore}
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Campus Safety Score</p>
            <p className="text-xs text-emerald-300 font-semibold mt-0.5">Safe Zone Protected</p>
          </div>
        </div>
      </div>

      {/* Profile Section Tabs */}
      <div className="flex border-b border-white/10 space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar pb-1 text-sm font-semibold">
        {[
          { key: 'reports', label: 'My Reports', icon: FileText },
          { key: 'preferences', label: 'Safety Preferences', icon: Sliders },
          { key: 'notifications', label: 'Alert Settings', icon: Bell },
          { key: 'privacy', label: 'Privacy & Encryption', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 py-3 px-4 rounded-2xl transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-purple-600 text-white shadow-glow-purple'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.key === 'reports' && (
                <span className="ml-1 px-2 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
                  {complaints.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: My Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              Incident Reports & Escalation History
            </h2>
            <Link
              href="/report"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-glow-cyan transition-all"
            >
              + File New Report
            </Link>
          </div>

          <div className="grid gap-3">
            {complaints.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-300">
                      {item.complaint_id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-400">
                      Level {item.escalation_level}: {item.assigned_authority}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.subcategory}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Link
                    href={`/track?id=${item.complaint_id}`}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 transition-colors flex items-center gap-1.5"
                  >
                    <span>Track Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Safety Preferences */}
      {activeTab === 'preferences' && (
        <div className="p-6 rounded-3xl bg-navy-900/80 border border-white/10 space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-bold text-white">Student Safety Automation</h2>
            <p className="text-xs text-slate-400">Configure how Campus Safe protects your movements on campus.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
              <div>
                <p className="text-sm font-semibold text-white">Night-Walk Companion Alerts</p>
                <p className="text-xs text-slate-400">Receive automatic patrol check-ins when walking past 20:00.</p>
              </div>
              <button
                onClick={() => setNightEscortAlerts(!nightEscortAlerts)}
                className={`w-12 h-6 rounded-full transition-colors relative ${nightEscortAlerts ? 'bg-cyan-500' : 'bg-slate-700'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${nightEscortAlerts ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
              <div>
                <p className="text-sm font-semibold text-white">Caution Zone Proximity Notifications</p>
                <p className="text-xs text-slate-400">Vibrate when approaching reported incident or low-light zones.</p>
              </div>
              <button
                onClick={() => setProximityAlerts(!proximityAlerts)}
                className={`w-12 h-6 rounded-full transition-colors relative ${proximityAlerts ? 'bg-cyan-500' : 'bg-slate-700'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${proximityAlerts ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
              <div>
                <p className="text-sm font-semibold text-white">Default to 100% Anonymous Mode</p>
                <p className="text-xs text-slate-400">Never pre-fill student ID or phone number when filing reports.</p>
              </div>
              <button
                onClick={() => setAnonymousByDefault(!anonymousByDefault)}
                className={`w-12 h-6 rounded-full transition-colors relative ${anonymousByDefault ? 'bg-cyan-500' : 'bg-slate-700'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${anonymousByDefault ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Notification Alerts */}
      {activeTab === 'notifications' && (
        <div className="p-6 rounded-3xl bg-navy-900/80 border border-white/10 space-y-4 animate-in fade-in duration-200">
          <h2 className="text-lg font-bold text-white">Push & SMS Alert Preferences</h2>
          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-white/20 text-purple-600 focus:ring-0" />
              <div>
                <p className="font-semibold text-slate-200">Critical Emergency Broadcasts (112 / Security Sirens)</p>
                <p className="text-slate-400">Mandatory campus safety alarms (Cannot be disabled)</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-white/20 text-purple-600 focus:ring-0" />
              <div>
                <p className="font-semibold text-slate-200">Incident Investigation Status Updates</p>
                <p className="text-slate-400">SMS when authority moves report from HOD ➔ Dean ➔ Higher Tribunal</p>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Tab 4: Privacy & Cryptography */}
      {activeTab === 'privacy' && (
        <div className="p-6 rounded-3xl bg-navy-900/80 border border-white/10 space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-bold text-white">Cryptographic Privacy Guarantee</h2>
            <p className="text-xs text-slate-400">How your sensitive identity is isolated from tracking screens.</p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Key className="w-4 h-4" />
              <span>Public Tracking Zero-Leakage Policy</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              When public users view complaints via Complaint IDs (e.g. on `/track`), the API strictly strips student names, phone numbers, and victim departments. Only verified faculty authorities holding active credentials in the Standing Committee can access confidential records.
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => alert('Demo Session cleared. Reloading platform...')}
              className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout / Switch Student Profile</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
