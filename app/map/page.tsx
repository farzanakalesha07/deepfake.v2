'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  AlertTriangle, 
  MapPin, 
  PhoneCall, 
  Navigation, 
  Filter, 
  Compass, 
  ShieldAlert, 
  Info, 
  ArrowRight, 
  CheckCircle2, 
  Plus, 
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { EmergencySOSModal } from '@/components/EmergencySOSModal';

interface MapLocation {
  id: string;
  name: string;
  type: 'SAFE_ZONE' | 'CAUTION' | 'REPORTED' | 'SECURITY';
  x: number; // percentage on map
  y: number;
  description: string;
  distance: string;
  walkTime: string;
  amenities: string[];
  status: string;
  phone?: string;
}

const CAMPUS_LOCATIONS: MapLocation[] = [
  {
    id: 'loc-sec-1',
    name: 'Central Campus Security Command',
    type: 'SECURITY',
    x: 48,
    y: 52,
    description: '24/7 Security dispatch center, quick response patrol vehicle station, and CCTV monitoring room.',
    distance: '180 m',
    walkTime: '2 min walk',
    amenities: ['Emergency Phone', 'CCTV 24/7', 'First Aid Station', 'Armed Guard Patrol'],
    status: 'Operational • 4 Guards On Duty',
    phone: '+91 020 2590-8000',
  },
  {
    id: 'loc-safe-1',
    name: 'Central Library Silent Study Area',
    type: 'SAFE_ZONE',
    x: 62,
    y: 28,
    description: 'High-security zone with biometric turnstiles, well-lit corridors, and active faculty supervision.',
    distance: '240 m',
    walkTime: '3 min walk',
    amenities: ['CCTV Coverage', 'Emergency Intercom', 'Well-Lit Sanctuary', 'Staff Presence'],
    status: 'Verified Safe Zone',
  },
  {
    id: 'loc-safe-2',
    name: 'Student Activity Center & Cafe',
    type: 'SAFE_ZONE',
    x: 32,
    y: 38,
    description: 'Active student hub with verified safety personnel, campus Wi-Fi, and crowd density presence.',
    distance: '310 m',
    walkTime: '4 min walk',
    amenities: ['24/7 Concierge', 'Help Desk', 'Automated External Defibrillator (AED)'],
    status: 'Verified Safe Zone',
  },
  {
    id: 'loc-sec-2',
    name: 'North Gate Security Booth',
    type: 'SECURITY',
    x: 82,
    y: 18,
    description: 'Main campus vehicle check-post with barrier control, guard booth, and night escort dispatch.',
    distance: '480 m',
    walkTime: '6 min walk',
    amenities: ['Barrier Gate', 'Night Escort Dispatch', 'Direct Emergency Line'],
    status: 'Operational • 2 Guards On Duty',
    phone: '+91 020 2590-8001',
  },
  {
    id: 'loc-caution-1',
    name: 'East Boundary Walkway (Low Light)',
    type: 'CAUTION',
    x: 80,
    y: 70,
    description: 'Dimly lit pathway undergoing solar lantern installation. Students advised to take illuminated corridor.',
    distance: '390 m',
    walkTime: '5 min walk',
    amenities: ['Solar Lights (Under Repair)', 'Patrol Round Every 20 Mins'],
    status: 'Caution • Use Illuminated Path 2',
  },
  {
    id: 'loc-issue-1',
    name: 'North Cafeteria & Mechanical Walkway',
    type: 'REPORTED',
    x: 24,
    y: 72,
    description: 'Repeated harassment complaint filed regarding group loitering. Level 2 Dean safety inquiry initiated.',
    distance: '420 m',
    walkTime: '5 min walk',
    amenities: ['Increased CCTV Watch', 'Security Round Frequency Doubled'],
    status: 'Active Investigation • Level 2 Escalated',
  },
  {
    id: 'loc-safe-3',
    name: 'Girls Hostel Block A Reception Safe Point',
    type: 'SAFE_ZONE',
    x: 20,
    y: 22,
    description: 'Secure biometric barrier, female warden station, and round-the-clock emergency support.',
    distance: '520 m',
    walkTime: '7 min walk',
    amenities: ['24/7 Warden Desk', 'Panic Alarm Button', 'Restricted Keycard Access'],
    status: 'High Security Sanctuary',
  }
];

export default function SmartCampusMapPage() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation>(CAMPUS_LOCATIONS[0]);
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({
    SAFE_ZONE: true,
    CAUTION: true,
    REPORTED: true,
    SECURITY: true,
  });
  const [routeActive, setRouteActive] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  // Student position (simulated "You are here")
  const userPosition = { x: 42, y: 56, label: 'Block B (Your Current Location)' };

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const getMarkerColor = (type: MapLocation['type']) => {
    switch (type) {
      case 'SAFE_ZONE': return 'bg-emerald-500 border-emerald-400 text-emerald-400 shadow-glow-emerald';
      case 'CAUTION': return 'bg-amber-500 border-amber-400 text-amber-400 shadow-amber-500/50';
      case 'REPORTED': return 'bg-rose-500 border-rose-400 text-rose-400 shadow-glow-red';
      case 'SECURITY': return 'bg-cyan-500 border-cyan-400 text-cyan-400 shadow-glow-cyan';
    }
  };

  const visibleLocations = CAMPUS_LOCATIONS.filter(loc => activeFilters[loc.type]);

  return (
    <div className="min-h-screen py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Top Header & Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 mb-2">
            <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>SMART CAMPUS RADAR v2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Interactive Campus Safety Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time safe corridors, illuminated paths, verified security booths, and active alerts.
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setSosModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-glow-red border border-rose-400/40 transition-all flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>SOS Dispatch</span>
          </button>
          <Link
            href="/report"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Report Issue</span>
          </Link>
          <a
            href="tel:18001805522"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Call Security</span>
          </a>
        </div>
      </div>

      {/* Main Map Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar: Filter Toggles & Nearest Help Card */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* Floating Nearest Security Point Card (As Requested) */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 border border-cyan-500/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
            
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pb-2 border-b border-white/5">
              <span>NEAREST SECURITY POINT</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="mt-3">
              <h3 className="text-base font-bold text-white leading-tight">
                Central Campus Security Command
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-black text-cyan-300">180 m</span>
                <span className="text-xs text-slate-400">~2 min walk</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedLocation(CAMPUS_LOCATIONS[0]);
                setRouteActive(true);
              }}
              className="mt-4 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-glow-cyan transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>{routeActive ? 'Route Illuminated' : 'Get Directions'}</span>
            </button>
          </div>

          {/* Interactive Layer Filters */}
          <div className="p-5 rounded-3xl bg-navy-900/70 border border-white/10 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-purple-400" />
                Map Filters
              </span>
              <span className="text-[11px] text-slate-400">{visibleLocations.length} visible</span>
            </div>

            <div className="space-y-2">
              {[
                { key: 'SAFE_ZONE', label: 'Safe Zones', color: 'bg-emerald-500', desc: 'Verified 24/7 Sanctuaries' },
                { key: 'SECURITY', label: 'Security Points', color: 'bg-cyan-500', desc: 'Guard Posts & Emergency Desks' },
                { key: 'CAUTION', label: 'Caution Areas', color: 'bg-amber-500', desc: 'Low-light or Under Repair' },
                { key: 'REPORTED', label: 'Reported Issues', color: 'bg-rose-500', desc: 'Active Student Incident Reports' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggleFilter(item.key)}
                  className={`w-full p-2.5 rounded-2xl border transition-all text-left flex items-center justify-between ${
                    activeFilters[item.key]
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-white/2 border-white/5 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3 h-3 rounded-full ${item.color} ${activeFilters[item.key] ? 'animate-pulse' : 'opacity-40'}`} />
                    <div>
                      <p className="text-xs font-semibold">{item.label}</p>
                      <p className="text-[10px] text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${activeFilters[item.key] ? 'bg-purple-600 border-purple-500' : 'border-white/10'}`}>
                    {activeFilters[item.key] && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Route Status */}
          {routeActive && (
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 animate-in fade-in space-y-2">
              <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
                <span>Safe Path Guidance Active</span>
                <button onClick={() => setRouteActive(false)} className="text-slate-400 hover:text-white">Clear</button>
              </div>
              <p className="text-xs text-slate-300">
                Following Illuminated Path B through Central Quad. Monitored by 3 security cameras.
              </p>
            </div>
          )}
        </div>

        {/* Center & Right: High-Tech Interactive Campus Blueprint Map */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl bg-[#030612] border border-white/15 shadow-2xl overflow-hidden group">
            
            {/* Architectural Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030612]/70 to-[#030612]" />

            {/* Simulated Campus Layout Architectural Blueprint Vector */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 1000 700">
              {/* Campus Roads & Pathways */}
              <path d="M 100 150 L 900 150" stroke="#38BDF8" strokeWidth="4" strokeDasharray="8 6" opacity="0.4" />
              <path d="M 500 80 L 500 620" stroke="#38BDF8" strokeWidth="4" strokeDasharray="8 6" opacity="0.4" />
              <path d="M 200 400 L 800 400" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6 4" opacity="0.3" />
              <circle cx="500" cy="400" r="140" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.3" />
              
              {/* Highlighted Safe Route Path if active */}
              {routeActive && (
                <path 
                  d="M 420 392 L 480 364" 
                  stroke="#00F5FF" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  className="animate-pulse"
                />
              )}

              {/* Building Blocks Shapes */}
              <rect x="150" y="80" width="180" height="120" rx="12" fill="#0B1535" stroke="#1E293B" strokeWidth="2" />
              <text x="170" y="145" fill="#64748B" fontSize="12" fontWeight="bold">GIRLS HOSTEL A</text>

              <rect x="580" y="80" width="220" height="130" rx="12" fill="#0B1535" stroke="#1E293B" strokeWidth="2" />
              <text x="600" y="150" fill="#64748B" fontSize="12" fontWeight="bold">CENTRAL LIBRARY</text>

              <rect x="220" y="280" width="170" height="110" rx="12" fill="#0B1535" stroke="#1E293B" strokeWidth="2" />
              <text x="240" y="340" fill="#64748B" fontSize="12" fontWeight="bold">STUDENT COMMONS</text>

              <rect x="420" y="470" width="160" height="110" rx="12" fill="#0E1F42" stroke="#06B6D4" strokeWidth="1.5" />
              <text x="440" y="530" fill="#38BDF8" fontSize="12" fontWeight="bold">SECURITY HQ</text>

              <rect x="120" y="480" width="160" height="120" rx="12" fill="#0B1535" stroke="#1E293B" strokeWidth="2" />
              <text x="140" y="545" fill="#64748B" fontSize="12" fontWeight="bold">MECH LAB / CAFE</text>

              <rect x="680" y="460" width="220" height="130" rx="12" fill="#0B1535" stroke="#1E293B" strokeWidth="2" />
              <text x="700" y="530" fill="#64748B" fontSize="12" fontWeight="bold">TECH BLOCK C</text>
            </svg>

            {/* "You Are Here" Marker */}
            <div 
              className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/user"
              style={{ left: `${userPosition.x}%`, top: `${userPosition.y}%` }}
            >
              <div className="relative flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-cyan-400/20 border border-cyan-400 animate-ping absolute" />
                <span className="w-8 h-8 rounded-full bg-cyan-500/40 border border-cyan-300 animate-pulse-slow absolute" />
                <div className="w-5 h-5 rounded-full bg-cyan-400 border-2 border-white shadow-glow-cyan flex items-center justify-center text-[10px] text-navy-950 font-bold">
                  📍
                </div>
              </div>
              <div className="absolute top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-navy-950/90 border border-cyan-400 text-[10px] font-bold text-cyan-300 whitespace-nowrap shadow-md pointer-events-none">
                YOU ARE HERE
              </div>
            </div>

            {/* Interactive Campus Location Markers */}
            {visibleLocations.map((loc) => {
              const isSelected = selectedLocation.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/marker"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring for selected marker */}
                    {isSelected && (
                      <span className="w-10 h-10 rounded-full bg-white/20 border border-white/50 animate-ping absolute" />
                    )}

                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-md ${
                      getMarkerColor(loc.type)
                    } ${isSelected ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-navy-950' : 'hover:scale-110'}`}>
                      {loc.type === 'SAFE_ZONE' && <ShieldCheck className="w-4 h-4 text-white" />}
                      {loc.type === 'SECURITY' && <ShieldAlert className="w-4 h-4 text-white" />}
                      {loc.type === 'CAUTION' && <AlertTriangle className="w-4 h-4 text-white" />}
                      {loc.type === 'REPORTED' && <Info className="w-4 h-4 text-white" />}
                    </div>
                  </div>

                  {/* Marker Label tooltip */}
                  <div className={`absolute top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-lg transition-all ${
                    isSelected 
                      ? 'bg-navy-900 border border-cyan-400 text-cyan-300 scale-105 z-30' 
                      : 'bg-navy-950/80 border border-white/10 text-slate-300 opacity-90 group-hover/marker:opacity-100 group-hover/marker:scale-105'
                  }`}>
                    {loc.name}
                  </div>
                </div>
              );
            })}

            {/* Map Telemetry HUD Overlay (Top-Left) */}
            <div className="absolute top-4 left-4 p-3 rounded-2xl bg-navy-950/85 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 font-mono space-y-1 shadow-lg pointer-events-none">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>RADAR LIVE • ZONE 4-B</span>
              </div>
              <p className="text-slate-400">GPS: 18.5204° N, 73.8567° E</p>
            </div>

            {/* Compass HUD Overlay (Top-Right) */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-navy-950/80 border border-white/10 flex items-center justify-center text-slate-300 text-xs font-mono font-bold shadow-md">
              N ↑
            </div>
          </div>

          {/* Selected Location Full Safety Detail Card */}
          {selectedLocation && (
            <div className="p-6 rounded-3xl bg-navy-900/90 border border-white/15 backdrop-blur-xl shadow-2xl space-y-4 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedLocation.type === 'SAFE_ZONE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      selectedLocation.type === 'SECURITY' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                      selectedLocation.type === 'CAUTION' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {selectedLocation.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400">
                      {selectedLocation.distance} • {selectedLocation.walkTime} from your position
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">
                    {selectedLocation.name}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRouteActive(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-glow-cyan transition-all flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Illuminate Path</span>
                  </button>
                  {selectedLocation.phone && (
                    <a
                      href={`tel:${selectedLocation.phone}`}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Desk</span>
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedLocation.description}
              </p>

              {/* Available Facilities & Safety Guard Badges */}
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Safety Infrastructure & Coverage:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.amenities.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-xl text-xs bg-white/5 border border-white/10 text-slate-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Global SOS Modal */}
      <EmergencySOSModal 
        isOpen={sosModalOpen} 
        onClose={() => setSosModalOpen(false)} 
      />

    </div>
  );
}
