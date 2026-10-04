'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Complaint, 
  AuthorityRole, 
  ComplaintStatus, 
  ComplaintCategory, 
  EscalationLevel 
} from '@/lib/types';
import { ComplaintStore, DEMO_AUTHORITIES, INITIAL_DEMO_COMPLAINTS } from '@/lib/store';
import { ComplaintModal } from '@/components/ComplaintModal';
import { useToast } from '@/components/Toast';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowUpRight, 
  Search, 
  Filter, 
  Lock, 
  UserCheck, 
  Award, 
  ShieldAlert, 
  LogOut, 
  RotateCcw, 
  Eye, 
  Shield, 
  Sparkles,
  BarChart3,
  PieChart as PieIcon,
  ChevronDown,
  LayoutDashboard,
  Bell,
  Sliders,
  Settings,
  ShieldCheck,
  Radio,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export default function AuthorityDashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [activeRole, setActiveRole] = useState<AuthorityRole>('HOD');
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_DEMO_COMPLAINTS);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Active Sidebar Tab: 'Dashboard' | 'Complaints' | 'Escalations' | 'Reports' | 'Notifications' | 'Privacy' | 'Settings'
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'Complaints' | 'Escalations' | 'Reports' | 'Notifications' | 'Privacy' | 'Settings'>('Dashboard');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [roleFilterOnly, setRoleFilterOnly] = useState<boolean>(false);

  // Load initial data
  const loadData = () => {
    const role = ComplaintStore.getActiveRole();
    setActiveRole(role);
    setComplaints(ComplaintStore.getComplaints());
  };

  useEffect(() => {
    loadData();

    const handleStorageUpdate = () => {
      setComplaints(ComplaintStore.getComplaints());
    };
    const handleRoleUpdate = () => {
      setActiveRole(ComplaintStore.getActiveRole());
    };

    window.addEventListener('campussafe_storage_updated', handleStorageUpdate);
    window.addEventListener('campussafe_role_updated', handleRoleUpdate);

    return () => {
      window.removeEventListener('campussafe_storage_updated', handleStorageUpdate);
      window.removeEventListener('campussafe_role_updated', handleRoleUpdate);
    };
  }, []);

  const handleRoleChange = (newRole: AuthorityRole) => {
    ComplaintStore.setActiveRole(newRole);
    setActiveRole(newRole);
    showToast('Role Switched', `Switched view to ${newRole}`, 'info');
  };

  const handleResetData = () => {
    if (confirm('Reset all complaint data back to initial demo dataset?')) {
      ComplaintStore.resetDemoData();
      showToast('Demo Data Reset', 'Reset to pristine demo dataset.', 'success');
      loadData();
    }
  };

  const handleLogout = () => {
    showToast('Logged Out', 'Safely signed out of investigator console.', 'info');
    router.push('/authority');
  };

  // Filter complaints based on search and jurisdiction
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      // Role scope filter
      if (roleFilterOnly) {
        if (activeRole === 'HOD' && c.assigned_authority !== 'HOD') return false;
        if (activeRole === 'Dean' && c.assigned_authority !== 'Dean' && c.escalation_level < 2) return false;
        if (activeRole === 'Higher Authority' && c.escalation_level < 3) return false;
      }

      // Status filter
      if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;

      // Category filter
      if (categoryFilter !== 'ALL' && c.type !== categoryFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = c.complaint_id.toLowerCase().includes(q);
        const matchesLoc = c.location.toLowerCase().includes(q);
        const matchesDesc = c.description.toLowerCase().includes(q);
        const matchesSuspect = c.suspect?.name?.toLowerCase().includes(q);
        if (!matchesId && !matchesLoc && !matchesDesc && !matchesSuspect) return false;
      }

      return true;
    });
  }, [complaints, activeRole, roleFilterOnly, statusFilter, categoryFilter, searchQuery]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'Submitted' || c.status === 'Under Review').length;
    const resolved = complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;
    const escalated = complaints.filter(c => c.status === 'Escalated' || c.escalation_level > 1).length;
    return { total, pending, resolved, escalated };
  }, [complaints]);

  // Notification logs
  const authorityNotifications = useMemo(() => {
    const notifs: { id: string; title: string; time: string; level: number; urgent: boolean }[] = [];
    complaints.forEach((c) => {
      if (c.escalation_level >= 2) {
        notifs.push({
          id: `n-${c.id}-1`,
          title: `[Level ${c.escalation_level} Escalation] Case ${c.complaint_id} assigned to ${c.assigned_authority}`,
          time: new Date(c.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          level: c.escalation_level,
          urgent: c.escalation_level === 3
        });
      }
      if (c.repeat_count >= 2) {
        notifs.push({
          id: `n-${c.id}-2`,
          title: `[Repeat Strike Alert] Suspect "${c.suspect?.name || 'Unknown'}" flagged across ${c.repeat_count} reports`,
          time: new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          level: 2,
          urgent: true
        });
      }
    });
    return notifs.slice(0, 6);
  }, [complaints]);

  // Chart data
  const pieData = [
    { name: 'Pending', value: stats.pending, color: '#06B6D4' },
    { name: 'Escalated', value: stats.escalated, color: '#8B5CF6' },
    { name: 'Resolved', value: stats.resolved, color: '#22C55E' },
  ];

  return (
    <div className="min-h-screen pb-20">
      
      {/* Top Glass Console Header */}
      <div className="border-b border-white/10 bg-[#080D24]/80 backdrop-blur-xl px-4 sm:px-8 py-4 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-white tracking-wide">
                  Authority Disciplinary Console
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {activeRole} Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logged in as <strong className="text-slate-200">{DEMO_AUTHORITIES[activeRole].name}</strong> ({DEMO_AUTHORITIES[activeRole].department})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Switch Role Dropdown */}
            <div className="relative">
              <select
                value={activeRole}
                onChange={(e) => handleRoleChange(e.target.value as AuthorityRole)}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="HOD" className="bg-[#080D24]">Role: HOD (Level 1)</option>
                <option value="Dean" className="bg-[#080D24]">Role: Dean (Level 2)</option>
                <option value="Higher Authority" className="bg-[#080D24]">Role: Higher Authority (Level 3)</option>
                <option value="Admin" className="bg-[#080D24]">Role: Admin (Full Access)</option>
              </select>
            </div>

            {/* Reset Data */}
            <button
              onClick={handleResetData}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-colors"
              title="Reset Demo Records"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Data</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-semibold border border-red-500/30 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Layout: Sidebar + Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ========================================================
              SIDEBAR
              ======================================================== */}
          <div className="lg:col-span-3 space-y-4">
            <div className="glass-card p-4 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 px-3 block mb-2">
                CONSOLE NAVIGATION
              </span>

              {[
                { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
                { name: 'Complaints', icon: <FileText className="w-4 h-4" /> },
                { name: 'Escalations', icon: <TrendingUp className="w-4 h-4" /> },
                { name: 'Reports', icon: <BarChart3 className="w-4 h-4" /> },
                { name: 'Notifications', icon: <Bell className="w-4 h-4" />, count: authorityNotifications.length },
                { name: 'Privacy', icon: <Lock className="w-4 h-4" /> },
                { name: 'Settings', icon: <Settings className="w-4 h-4" /> }
              ].map((item) => {
                const active = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name as any)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-gradient-to-r from-purple-600/30 to-cyan-500/30 text-white border border-cyan-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={active ? 'text-cyan-300' : 'text-slate-400'}>{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Role Jurisdiction Card in Sidebar */}
            <div className="glass-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Authority Jurisdiction</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                You are currently viewing reports under <strong>{activeRole}</strong> purview. Unsanitized victim PII is only revealed when evaluating cases within your lawful purview.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-cyan-300">
                <span>Anti-Ragging Act 2026</span>
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* ========================================================
              MAIN CONTENT
              ======================================================== */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* ========================================================
                DASHBOARD KPI CARDS
                ======================================================== */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Total Reports */}
              <div className="glass-card p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400">Total Reports</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white">{stats.total}</div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">Registered cases</span>
              </div>

              {/* Pending Reports */}
              <div className="glass-card p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400">Pending Reports</span>
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-cyan-300">{stats.pending}</div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">Under inquiry</span>
              </div>

              {/* Resolved Reports */}
              <div className="glass-card p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400">Resolved Reports</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-emerald-400">{stats.resolved}</div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">Actions fulfilled</span>
              </div>

              {/* Escalated Reports */}
              <div className="glass-card p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400">Escalated Reports</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-amber-300">{stats.escalated}</div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">Level 2 / 3 tier</span>
              </div>

            </div>

            {/* ========================================================
                AUTHORITY NOTIFICATION PANEL & ESCALATION TIMELINE
                ======================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Authority Notification Panel */}
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-purple-400" />
                    <h3 className="text-sm font-bold text-white">Authority Notification Panel</h3>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300">Live Telemetry</span>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {authorityNotifications.length > 0 ? (
                    authorityNotifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                          notif.urgent 
                            ? 'bg-red-950/20 border-red-500/30 text-red-200' 
                            : 'bg-white/[0.03] border-white/10 text-slate-200'
                        }`}
                      >
                        <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${notif.urgent ? 'text-red-400' : 'text-amber-400'}`} />
                        <div className="flex-1">
                          <p className="leading-snug">{notif.title}</p>
                          <span className="text-[10px] text-slate-500 font-mono block mt-1">{notif.time}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 py-4 text-center">No active urgent alerts</p>
                  )}
                </div>
              </div>

              {/* Escalation Hierarchy Status */}
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white">Escalation Jurisdiction Status</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">3-Tier Hierarchy</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-blue-300 block">Level 1 • Head of Department (HOD)</span>
                      <span className="text-[11px] text-slate-400">Handles 1st reports, summons &amp; local inquiry</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">
                      {complaints.filter(c => c.escalation_level === 1).length} active
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-purple-300 block">Level 2 • Dean of Student Affairs</span>
                      <span className="text-[11px] text-slate-400">Repeat suspects &amp; inter-hostel disputes</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-200">
                      {complaints.filter(c => c.escalation_level === 2).length} active
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-amber-300 block">Level 3 • Anti-Ragging Apex Committee</span>
                      <span className="text-[11px] text-slate-400">Vice-Chancellor tribunal &amp; police handoff</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-200">
                      {complaints.filter(c => c.escalation_level === 3).length} active
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* ========================================================
                MAIN SECTION: RECENT COMPLAINTS TABLE
                ======================================================== */}
            <div className="glass-card p-6 sm:p-8 space-y-6">
              
              {/* Table Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">Recent Complaints</h3>
                  <p className="text-xs text-slate-400">
                    Showing {filteredComplaints.length} of {complaints.length} registered reports
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search ID, location, suspect..."
                      className="pl-9 pr-3 py-1.5 rounded-xl glass-input text-xs placeholder-slate-500 w-48 sm:w-56"
                    />
                  </div>

                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-xs text-slate-200"
                  >
                    <option value="ALL" className="bg-[#080D24]">All Statuses</option>
                    <option value="Submitted" className="bg-[#080D24]">Submitted</option>
                    <option value="Under Review" className="bg-[#080D24]">Under Review</option>
                    <option value="Escalated" className="bg-[#080D24]">Escalated</option>
                    <option value="Action Taken" className="bg-[#080D24]">Action Taken</option>
                    <option value="Resolved" className="bg-[#080D24]">Resolved</option>
                  </select>

                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-xs text-slate-200"
                  >
                    <option value="ALL" className="bg-[#080D24]">All Domains</option>
                    <option value="OFFLINE_RAGGING" className="bg-[#080D24]">Offline Ragging</option>
                    <option value="ONLINE_RAGGING" className="bg-[#080D24]">Online Ragging</option>
                  </select>
                </div>
              </div>

              {/* Table with specified columns: Complaint ID | Type | Date | Status | Priority | Action */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[10px]">
                      <th className="py-3 px-3">Complaint ID</th>
                      <th className="py-3 px-3">Type</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Priority</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredComplaints.length > 0 ? (
                      filteredComplaints.map((c) => (
                        <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                          
                          {/* 1. Complaint ID */}
                          <td className="py-3.5 px-3 font-mono font-bold text-cyan-300">
                            {c.complaint_id}
                          </td>

                          {/* 2. Type */}
                          <td className="py-3.5 px-3">
                            <span className="font-semibold text-white block">
                              {c.type === 'OFFLINE_RAGGING' ? 'Offline' : 'Online'}
                            </span>
                            <span className="text-[11px] text-slate-400 truncate block max-w-[140px]">
                              {c.subcategory}
                            </span>
                          </td>

                          {/* 3. Date */}
                          <td className="py-3.5 px-3 font-mono text-slate-300">
                            {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </td>

                          {/* 4. Status */}
                          <td className="py-3.5 px-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              c.status === 'Resolved'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : c.status === 'Escalated'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : c.status === 'Under Review'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : 'bg-slate-700/50 text-slate-300'
                            }`}>
                              {c.status}
                            </span>
                          </td>

                          {/* 5. Priority / Escalation Level */}
                          <td className="py-3.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              c.escalation_level === 3
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : c.escalation_level === 2
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}>
                              Level {c.escalation_level} ({c.assigned_authority})
                            </span>
                          </td>

                          {/* 6. Action */}
                          <td className="py-3.5 px-3 text-right">
                            <button
                              onClick={() => setSelectedComplaint(c)}
                              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
                            >
                              View &amp; Manage
                            </button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No matching complaints found in registry.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Complaint Details Modal */}
      {selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          currentRole={activeRole}
          onClose={() => setSelectedComplaint(null)}
          onComplaintUpdated={(updated) => {
            setSelectedComplaint(updated);
            loadData();
          }}
        />
      )}

    </div>
  );
}
