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
  ChevronDown
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
  CartesianGrid,
  Legend
} from 'recharts';

export default function AuthorityDashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [activeRole, setActiveRole] = useState<AuthorityRole>('HOD');
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_DEMO_COMPLAINTS);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

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

  // Filter complaints based on Role, Search, Status, Category
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      // Role jurisdiction filter
      if (roleFilterOnly && activeRole !== 'Admin') {
        if (activeRole === 'HOD' && c.assigned_authority !== 'HOD') return false;
        if (activeRole === 'Dean' && c.assigned_authority !== 'Dean' && c.escalation_level < 2) return false;
        if (activeRole === 'Higher Authority' && c.assigned_authority !== 'Higher Authority' && c.escalation_level < 3) return false;
      }

      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesId = c.complaint_id.toLowerCase().includes(query);
        const matchesLoc = c.location.toLowerCase().includes(query);
        const matchesSuspect = c.suspect?.name?.toLowerCase().includes(query) || false;
        const matchesSubcat = c.subcategory.toLowerCase().includes(query);
        if (!matchesId && !matchesLoc && !matchesSuspect && !matchesSubcat) return false;
      }

      // Status
      if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;

      // Category
      if (categoryFilter !== 'ALL' && c.type !== categoryFilter) return false;

      return true;
    });
  }, [complaints, activeRole, roleFilterOnly, searchQuery, statusFilter, categoryFilter]);

  // Statistics KPIs
  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'Submitted').length;
    const underReview = complaints.filter(c => c.status === 'Under Review').length;
    const escalated = complaints.filter(c => c.status === 'Escalated' || c.escalation_level > 1).length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;

    return { total, pending, underReview, escalated, resolved };
  }, [complaints]);

  // Recharts Data preparation
  const categoryData = useMemo(() => {
    const online = complaints.filter(c => c.type === 'ONLINE_RAGGING').length;
    const offline = complaints.filter(c => c.type === 'OFFLINE_RAGGING').length;
    return [
      { name: 'Online Ragging', value: online, color: '#06B6D4' },
      { name: 'Offline Ragging', value: offline, color: '#8B5CF6' },
    ];
  }, [complaints]);

  const escalationData = useMemo(() => {
    const l1 = complaints.filter(c => c.escalation_level === 1).length;
    const l2 = complaints.filter(c => c.escalation_level === 2).length;
    const l3 = complaints.filter(c => c.escalation_level === 3).length;
    return [
      { level: 'Level 1 (HOD)', count: l1, fill: '#8B5CF6' },
      { level: 'Level 2 (Dean)', count: l2, fill: '#6366F1' },
      { level: 'Level 3 (Higher Auth)', count: l3, fill: '#06B6D4' },
    ];
  }, [complaints]);

  const statusTrendData = useMemo(() => {
    return [
      { status: 'Submitted', count: stats.pending },
      { status: 'Under Review', count: stats.underReview },
      { status: 'Escalated', count: stats.escalated },
      { status: 'Resolved', count: stats.resolved },
    ];
  }, [stats]);

  const activeUser = DEMO_AUTHORITIES[activeRole];

  return (
    <div className="min-h-screen py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner / Role Switcher Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/90 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={activeUser.avatar_url}
              alt={activeUser.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/50 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-navy-900" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {activeUser.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {activeRole}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeUser.department} • <span className="text-cyan-400">Jurisdiction Active</span>
            </p>
          </div>
        </div>

        {/* Demo Role Switcher Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-navy-950 p-1.5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 pl-2 hidden sm:inline">Role View:</span>
            {(['HOD', 'Dean', 'Higher Authority', 'Admin'] as AuthorityRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleChange(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeRole === r
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={handleResetData}
            title="Reset to initial demo data"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <Link
            href="/authority"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 border border-white/10 text-xs font-medium transition-colors"
            title="Switch User / Logout"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* =========================================================
          KEY STATS CARDS (Prompt Section 11 & 13)
          ========================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Total */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total Reports</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {stats.total}
          </div>
          <div className="text-[11px] text-cyan-400 mt-1">All logged incidents</div>
        </div>

        {/* Pending */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Pending Intake</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-300">
            {stats.pending}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Awaiting review</div>
        </div>

        {/* Under Review */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Under Review</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-300">
            {stats.underReview}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Active inquiries</div>
        </div>

        {/* Escalated */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-purple-500/30 shadow-lg">
          <div className="flex items-center justify-between text-xs text-purple-300 mb-2">
            <span>Escalated</span>
            <ArrowUpRight className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-purple-300">
            {stats.escalated}
          </div>
          <div className="text-[11px] text-purple-400 mt-1">Level 2 / Level 3</div>
        </div>

        {/* Resolved */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-emerald-500/30 shadow-lg col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-xs text-emerald-300 mb-2">
            <span>Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-300">
            {stats.resolved}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">Protective closure</div>
        </div>

      </div>

      {/* =========================================================
          ANALYTICS CHARTS (Prompt Section 13)
          ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Breakdown Donut */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-navy-900/80 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-cyan-400" />
              Complaints by Category
            </h3>
            <span className="text-[11px] text-slate-400">Online vs Offline</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#071B45', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-slate-300">Online: {categoryData[0].value}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-slate-300">Offline: {categoryData[1].value}</span>
            </div>
          </div>
        </div>

        {/* Escalation Hierarchy Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-navy-900/80 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              Escalation Distribution by Authority
            </h3>
            <span className="text-[11px] text-slate-400">Level 1 → Level 3</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={escalationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="level" stroke="#94A3B8" fontSize={11} />
                <YAxis allowDecimals={false} stroke="#94A3B8" fontSize={11} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#071B45', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {escalationData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 text-center">
            Higher repetition count automatically shifts incidents to Dean and Anti-Ragging Standing Cell.
          </div>
        </div>

      </div>

      {/* =========================================================
          FILTERABLE COMPLAINT TABLE (Prompt Section 11 & 14)
          ========================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/90 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6">
        
        {/* Table Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              Campus Incident Register
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Showing {filteredComplaints.length} of {complaints.length} registered reports
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ID, suspect, location..."
                className="pl-9 pr-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-48 sm:w-60"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Escalated">Escalated</option>
              <option value="Action Taken">Action Taken</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">All Categories</option>
              <option value="OFFLINE_RAGGING">Offline Ragging</option>
              <option value="ONLINE_RAGGING">Online Ragging</option>
            </select>

            {/* Jurisdiction Toggle */}
            <button
              onClick={() => setRoleFilterOnly(!roleFilterOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                roleFilterOnly
                  ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                  : 'bg-navy-950 border-white/10 text-slate-400'
              }`}
            >
              {roleFilterOnly ? `My Jurisdiction (${activeRole})` : 'All Campus Reports'}
            </button>

          </div>
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Complaint ID</th>
                <th className="py-3.5 px-4">Category &amp; Subtype</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Frequency / Repeat</th>
                <th className="py-3.5 px-4">Current Status</th>
                <th className="py-3.5 px-4">Assigned Authority</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-navy-900/40">
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No complaints match current filters or jurisdiction.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((item) => (
                  <tr
                    key={item.complaint_id}
                    className="hover:bg-white/[0.04] transition-colors"
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                      {item.complaint_id}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">
                        {item.type === 'ONLINE_RAGGING' ? 'Online Ragging' : 'Offline Ragging'}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[200px]" title={item.subcategory}>
                        {item.subcategory}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-300">
                      {item.incident_date}
                    </td>

                    {/* Frequency */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.repeat_count > 1
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-white/10 text-slate-300'
                      }`}>
                        #{item.repeat_count} • {item.frequency}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        item.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                        item.status === 'Escalated' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                        item.status === 'Under Review' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                        'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Assigned */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-purple-300">
                        Level {item.escalation_level}: {item.assigned_authority}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedComplaint(item)}
                        className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 font-semibold transition-all"
                      >
                        Inspect &amp; Act
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Complaint Detail Inspection Modal */}
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
