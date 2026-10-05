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
  Activity,
  MapPin,
  Flame,
  Zap,
  Layers,
  Cpu,
  Compass
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
  AreaChart,
  Area
} from 'recharts';

export default function AuthorityDashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [activeRole, setActiveRole] = useState<AuthorityRole>('HOD');
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_DEMO_COMPLAINTS);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Exact Sidebar Tabs requested:
  // Overview, Reports, Priority Cases, Assigned, Resolved, Analytics
  type SidebarTab = 'Overview' | 'Reports' | 'Priority Cases' | 'Assigned' | 'Resolved' | 'Analytics';
  const [activeTab, setActiveTab] = useState<SidebarTab>('Overview');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHotspot, setActiveHotspot] = useState<string>('East Walkway');

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
    window.addEventListener('campussafe_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('campussafe_storage_updated', handleStorageUpdate);
  }, []);

  const handleRoleChange = (newRole: AuthorityRole) => {
    ComplaintStore.setActiveRole(newRole);
    setActiveRole(newRole);
    showToast('Role Switched', `Switched active command jurisdiction to ${newRole}`, 'info');
  };

  const handleResetData = () => {
    if (confirm('Reset demo records?')) {
      ComplaintStore.resetDemoData();
      showToast('Demo Data Reset', 'Reset to pristine demo dataset.', 'success');
      loadData();
    }
  };

  // Analytics Trends Data (Cyan / Blue / Green)
  const trendData = [
    { time: '08:00', reports: 12, resolved: 11 },
    { time: '11:00', reports: 28, resolved: 26 },
    { time: '14:00', reports: 45, resolved: 42 },
    { time: '17:00', reports: 78, resolved: 75 },
    { time: '20:00', reports: 104, resolved: 101 },
    { time: '23:00', reports: 124, resolved: 122 },
  ];

  // Category Distribution
  const categoryData = [
    { name: 'Harassment', value: 42, color: '#00F2FE' },
    { name: 'Unwanted Following', value: 28, color: '#3B82F6' },
    { name: 'Bullying / Hostels', value: 18, color: '#8B5CF6' },
    { name: 'Threats', value: 12, color: '#10B981' }
  ];

  // Campus Hotspots on 3D Map
  const hotspots = [
    { id: 'East Walkway', name: 'East Library Walkway', threat: 'Medium', incidents: 4, coords: 'top-[35%] left-[45%]' },
    { id: 'Hostel Quad', name: 'Hostel Block C Perimeter', threat: 'High', incidents: 6, coords: 'top-[55%] left-[25%]' },
    { id: 'North Cafeteria', name: 'North Cafeteria Plaza', threat: 'Low', incidents: 2, coords: 'top-[25%] left-[65%]' },
    { id: 'Sports Complex', name: 'Sports Grounds South Gate', threat: 'Low', incidents: 1, coords: 'top-[70%] left-[70%]' },
  ];

  return (
    <div className="relative min-h-screen bg-[#050B14] text-slate-100 pb-20 overflow-hidden font-sans">
      
      {/* Background Volumetric Glows */}
      <div className="absolute top-10 left-1/3 w-[800px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/5 to-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#00F2FE 1px, transparent 1px), linear-gradient(90deg, #00F2FE 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Glass Console Header */}
      <div className="border-b border-white/10 bg-[#081522]/90 backdrop-blur-2xl px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-glow-cyan">
              <ShieldAlert className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-white tracking-wide flex items-center gap-2">
                  <span>CAMPUSSAFE COMMAND CENTER</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                    SCREEN 07
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Institutional Authority Telemetry &bull; Jurisdiction: <strong className="text-cyan-300">{activeRole} Command</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Role Switcher */}
            <select
              value={activeRole}
              onChange={(e) => handleRoleChange(e.target.value as AuthorityRole)}
              className="px-3.5 py-1.5 rounded-xl bg-[#0D1C2C] border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300 focus:outline-none cursor-pointer shadow-sm"
            >
              <option value="HOD">Role: HOD (Level 1)</option>
              <option value="Dean">Role: Dean (Level 2)</option>
              <option value="Higher Authority">Role: Apex Committee (Level 3)</option>
              <option value="Admin">Role: Security Chief (Admin)</option>
            </select>

            <button
              onClick={handleResetData}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/15 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Data</span>
            </button>

            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Main Content Layout: Sidebar + Dashboard Panels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ========================================================
              EXACT SIDEBAR REQUESTED:
              Overview, Reports, Priority Cases, Assigned, Resolved, Analytics
              ======================================================== */}
          <div className="lg:col-span-3 space-y-4">
            
            <div className="rounded-2xl bg-[#081522]/90 backdrop-blur-xl border border-white/15 p-4 space-y-1.5 shadow-2xl">
              <span className="text-[10px] font-mono uppercase text-slate-400 px-3 block mb-2 tracking-widest">
                COMMAND MENU
              </span>

              {[
                { name: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
                { name: 'Reports', icon: <FileText className="w-4 h-4" />, count: 124 },
                { name: 'Priority Cases', icon: <AlertTriangle className="w-4 h-4" />, count: 6, urgent: true },
                { name: 'Assigned', icon: <UserCheck className="w-4 h-4" /> },
                { name: 'Resolved', icon: <CheckCircle2 className="w-4 h-4" /> },
                { name: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
              ].map((item) => {
                const active = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name as SidebarTab)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30 text-white border border-cyan-400 shadow-glow-cyan'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={active ? 'text-cyan-300' : 'text-slate-400'}>{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        item.urgent
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Live Telemetry Radar Card */}
            <div className="rounded-2xl bg-[#081522]/80 backdrop-blur-xl border border-cyan-500/20 p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>Campus Radar Scan</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">100% ONLINE</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                48 surveillance nodes, 14 optical checkpoints, and automated repeat-offender AI correlation operational.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-cyan-300">
                <span>Mean Response</span>
                <span className="font-bold text-white">8.4 mins</span>
              </div>
            </div>

          </div>

          {/* ========================================================
              MAIN DASHBOARD CONTENT
              ======================================================== */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* ========================================================
                EXACT MAIN DASHBOARD STATS REQUESTED:
                Total Reports: 124
                Pending: 18
                High Priority: 6
                Resolved: 99%
                ======================================================== */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Total Reports: 124 */}
              <div className="rounded-2xl bg-[#081522]/90 backdrop-blur-xl border border-white/15 p-5 shadow-2xl relative overflow-hidden group hover:border-cyan-400/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400">Total Reports</span>
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">124</div>
                <span className="text-[10px] text-cyan-300 mt-1 font-mono block">+8 new in 24h</span>
              </div>

              {/* Pending: 18 */}
              <div className="rounded-2xl bg-[#081522]/90 backdrop-blur-xl border border-white/15 p-5 shadow-2xl relative overflow-hidden group hover:border-blue-400/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400">Pending</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-blue-300 tracking-tight">18</div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono block">Under active inquiry</span>
              </div>

              {/* High Priority: 6 */}
              <div className="rounded-2xl bg-[#081522]/90 backdrop-blur-xl border border-red-500/40 p-5 shadow-glow-danger relative overflow-hidden group hover:border-red-400 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase text-red-300">High Priority</span>
                  <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 animate-pulse">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-red-400 tracking-tight">6</div>
                <span className="text-[10px] text-red-300/80 mt-1 font-mono block">Requires Dean review</span>
              </div>

              {/* Resolved: 99% */}
              <div className="rounded-2xl bg-[#081522]/90 backdrop-blur-xl border border-emerald-500/40 p-5 shadow-glow-safe relative overflow-hidden group hover:border-emerald-400 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase text-emerald-300">Resolved</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 tracking-tight">99%</div>
                <span className="text-[10px] text-emerald-300/80 mt-1 font-mono block">Action completed</span>
              </div>

            </div>

            {/* ========================================================
                LARGE 3D CAMPUS MAP WITH GLOWING SAFETY HOTSPOTS
                ======================================================== */}
            <div className="rounded-3xl bg-[#081522]/90 backdrop-blur-2xl border border-cyan-500/30 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span>3D Campus Safety Hotspot Matrix</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Volumetric spatial mapping of incident clusters and surveillance checkpoints
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                    HOTSPOTS: {hotspots.length} ACTIVE
                  </span>
                </div>
              </div>

              {/* The 3D Campus Map Showcase Image with Interactive Hotspot Pins */}
              <div className="relative mt-5 rounded-2xl overflow-hidden border border-cyan-500/30 h-72 sm:h-96 group shadow-2xl bg-slate-950">
                <img
                  src="/images/command-map.jpg"
                  alt="3D Campus Safety Hotspot Map"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90"
                />

                {/* Hotspot Glowing Pins Overlay */}
                {hotspots.map((hs) => {
                  const isSelected = activeHotspot === hs.id;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => setActiveHotspot(hs.id)}
                      className={`absolute ${hs.coords} -translate-x-1/2 -translate-y-1/2 group/pin z-20 cursor-pointer transition-all`}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Glowing ping ripple */}
                        <div className={`w-8 h-8 rounded-full absolute animate-ping ${
                          hs.threat === 'High' ? 'bg-red-500/40' : hs.threat === 'Medium' ? 'bg-cyan-500/40' : 'bg-emerald-500/40'
                        }`} />
                        
                        {/* Core pin */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-2xl ${
                          hs.threat === 'High' 
                            ? 'bg-red-500 shadow-glow-danger' 
                            : hs.threat === 'Medium'
                            ? 'bg-cyan-400 shadow-glow-cyan'
                            : 'bg-emerald-400 shadow-glow-safe'
                        }`}>
                          <span className="text-[9px] font-mono font-bold text-slate-950">{hs.incidents}</span>
                        </div>

                        {/* Hover Tooltip Label */}
                        <div className="absolute bottom-full mb-2 hidden group-hover/pin:flex flex-col items-center pointer-events-none whitespace-nowrap z-30">
                          <div className="px-2.5 py-1 rounded-lg bg-[#050B14]/95 border border-cyan-400/50 text-[11px] font-mono text-cyan-200 shadow-2xl">
                            <strong>{hs.name}</strong> ({hs.threat} Risk &bull; {hs.incidents} reports)
                          </div>
                          <div className="w-2 h-2 bg-[#050B14] rotate-45 -mt-1 border-r border-b border-cyan-400/50" />
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Hotspot details bar overlay at bottom */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#050B14]/90 backdrop-blur-xl border border-white/15 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-slate-300">Selected Sector:</span>
                    <strong className="text-white">{activeHotspot}</strong>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300">Night Patrol Stationed: Rover unit 04</span>
                </div>
              </div>
            </div>

            {/* ========================================================
                FLOATING ANALYTICS PANELS:
                1. Complaint Trends
                2. Response Time
                3. Incident Categories
                4. Campus Safety Heatmap
                ======================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Panel 1: Complaint Trends */}
              <div className="rounded-2xl bg-[#081522]/90 backdrop-blur-xl border border-white/15 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span>Complaint Trends</span>
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-300">24-Hour Cycle</span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="cyanArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00F2FE" stopOpacity={0.35}/>
                          <stop offset="95%" stopColor="#00F2FE" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#081522', borderColor: '#00F2FE', borderRadius: '12px' }}
                      />
                      <Area type="monotone" dataKey="reports" stroke="#00F2FE" strokeWidth={2} fillOpacity={1} fill="url(#cyanArea)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Panel 2: Response Time */}
              <div className="rounded-2xl bg-[#081522]/90 backdrop-blur-xl border border-white/15 p-6 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>Response Time Benchmark</span>
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">&bull; OPTIMAL</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-400">Average Proctorial Response</span>
                      <span className="text-2xl font-black font-mono text-emerald-400">8.4 mins</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 w-[78%]" />
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-500">
                      <span>Target: &lt;15 mins</span>
                      <span>SLA Compliance: 96.8%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 block text-[10px] font-mono">Emergency Dispatch</span>
                    <strong className="text-white text-sm">1.5 mins</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 block text-[10px] font-mono">Disciplinary Notice</span>
                    <strong className="text-cyan-300 text-sm">24 hours</strong>
                  </div>
                </div>
              </div>

              {/* Panel 3: Incident Categories */}
              <div className="rounded-2xl bg-[#081522]/90 backdrop-blur-xl border border-white/15 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <PieIcon className="w-4 h-4 text-purple-400" />
                    <span>Incident Categories</span>
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">Classification</span>
                </div>

                <div className="space-y-3 text-xs">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="space-y-1">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-200">{cat.name}</span>
                        <span className="font-mono font-bold" style={{ color: cat.color }}>{cat.value}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ width: `${cat.value}%`, backgroundColor: cat.color }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel 4: Campus Safety Heatmap */}
              <div className="rounded-2xl bg-[#081522]/90 backdrop-blur-xl border border-white/15 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Campus Safety Heatmap</span>
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-300">Live Grid</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">East Library Corridor</div>
                      <span className="text-[11px] text-slate-400">Night blindspot; 4 reports</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      ELEVATED
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Hostel Block C Perimeter</div>
                      <span className="text-[11px] text-slate-400">Senior gathering hotspot; 6 reports</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                      HIGH PATROL
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">North Academic Quad</div>
                      <span className="text-[11px] text-slate-400">Continuous lighting; 2 reports</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      SECURE
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Complaints Registry Table */}
            <div className="rounded-2xl bg-[#081522]/90 backdrop-blur-xl border border-white/15 p-6 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-base font-bold text-white">Active Case Dossiers</h3>
                  <p className="text-xs text-slate-400">Select any case to review evidence or execute escalation</p>
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter by ID or location..."
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-[#050B14] border border-white/15 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 font-mono text-[10px] uppercase">
                      <th className="py-2.5 px-3">Complaint ID</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Location</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Escalation</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {complaints.slice(0, 5).map((c) => (
                      <tr 
                        key={c.id} 
                        onClick={() => setSelectedComplaint(c)}
                        className="hover:bg-white/[0.04] cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-3 font-mono font-bold text-cyan-300">{c.complaint_id}</td>
                        <td className="py-3 px-3 text-white">{c.subcategory}</td>
                        <td className="py-3 px-3 text-slate-400">{c.location}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-purple-300">Level {c.escalation_level}</td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-cyan-400 hover:text-white font-semibold flex items-center justify-end gap-1">
                            <span>Open</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Complaint Detail Modal Drawer */}
      {selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          currentRole={activeRole}
          onClose={() => setSelectedComplaint(null)}
          onComplaintUpdated={(updated) => {
            loadData();
            setSelectedComplaint(null);
          }}
        />
      )}

    </div>
  );
}
