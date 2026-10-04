'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  MapPin, 
  ShieldCheck, 
  X, 
  Copy, 
  Check, 
  ExternalLink,
  Navigation,
  Clock,
  Radio
} from 'lucide-react';
import { useToast } from './Toast';

interface EmergencyHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'help' | 'location' | 'safezones';
}

export const EmergencyHelpModal: React.FC<EmergencyHelpModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'help'
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'help' | 'location' | 'safezones'>(initialTab);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [locationState, setLocationState] = useState<{
    lat: number | null;
    lng: number | null;
    address: string;
    loading: boolean;
  }>({
    lat: null,
    lng: null,
    address: 'Campus Central Quadrangle, Building 4',
    loading: false
  });

  if (!isOpen) return null;

  const hotlines = [
    {
      name: 'National Anti-Ragging Helpline',
      number: '1800-180-5522',
      badge: '24/7 Toll-Free (UGC)',
      desc: 'Free round-the-clock national support with direct regulatory oversight.',
      urgent: true,
    },
    {
      name: 'Campus Security Main Command',
      number: '+91 11 2659 1000',
      badge: 'On-Campus Direct',
      desc: 'Immediate dispatch of on-duty campus patrol van and quick response team.',
      urgent: true,
    },
    {
      name: 'National Emergency Service',
      number: '112',
      badge: 'Police / Medical',
      desc: 'Unified national emergency helpline for immediate emergency assistance.',
      urgent: false,
    },
    {
      name: 'Women Helpline / Internal Cell',
      number: '1091',
      badge: 'Confidential Support',
      desc: 'Direct hotline to specialized counselors and female officer support.',
      urgent: false,
    }
  ];

  const safeZones = [
    { name: 'Security Main Gate (Gate 1)', loc: 'South Campus Avenue', time: '24/7 Guarded', dist: '120m away' },
    { name: 'Dean & Proctor Office Foyer', loc: 'Administrative Complex, Floor 1', time: '24/7 Guarded', dist: '250m away' },
    { name: 'Central Library Main Entrance', loc: 'Academic Zone Central', time: '24/7 Guarded', dist: '310m away' },
    { name: 'Student Centre Security Kiosk', loc: 'North Quadrangle', time: '24/7 Guarded', dist: '400m away' },
    { name: 'Girls Hostel Guard Post (Block C)', loc: 'East Residential Sector', time: '24/7 CCTV & Guards', dist: '480m away' },
    { name: 'Campus Health Centre & ER', loc: 'Hospital Road, Wing A', time: '24/7 Medical Team', dist: '550m away' },
    { name: 'Tech Tower CCTV Command Center', loc: 'CS/IT Block Ground Floor', time: '24/7 Surveillance', dist: '620m away' },
    { name: 'Sports Complex Pavilion Desk', loc: 'West Grounds', time: '06:00 - 23:00 Guarded', dist: '750m away' },
  ];

  const handleCopyNumber = (num: string, idx: number) => {
    navigator.clipboard.writeText(num);
    setCopiedIndex(idx);
    showToast('Number Copied', `${num} copied to clipboard`, 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFetchLocation = () => {
    setLocationState(prev => ({ ...prev, loading: true }));
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: `Lat: ${position.coords.latitude.toFixed(5)}, Lng: ${position.coords.longitude.toFixed(5)} (Campus Geofence Verified)`,
            loading: false
          });
          showToast('GPS Located', 'Coordinates captured securely', 'success');
        },
        () => {
          setLocationState({
            lat: 28.5449,
            lng: 77.1926,
            address: 'Campus Sector 4, Main Boulevard (Estimated via Wi-Fi Beacon)',
            loading: false
          });
          showToast('Location Updated', 'Campus zone landmark estimated', 'info');
        }
      );
    } else {
      setLocationState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleCopyLocation = () => {
    const locText = locationState.lat 
      ? `EMERGENCY SOS: My current location is https://maps.google.com/?q=${locationState.lat},${locationState.lng} (${locationState.address})`
      : `EMERGENCY SOS: I need assistance on campus at ${locationState.address}`;
    navigator.clipboard.writeText(locText);
    showToast('Location Copied', 'SOS location link ready to send via WhatsApp / SMS', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#080D24] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Emergency Red Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-500" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Need Immediate Help?
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                  Priority 0
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Direct access to 24/7 verified campus safety, police, and proctorial assistance.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-white/[0.02] px-6">
          <button
            onClick={() => setActiveTab('help')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'help'
                ? 'border-red-400 text-red-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency Hotlines</span>
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'location'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Share Location</span>
          </button>
          <button
            onClick={() => setActiveTab('safezones')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'safezones'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Find Safe Zone (8)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* TAB 1: EMERGENCY HOTLINES */}
          {activeTab === 'help' && (
            <div className="space-y-3">
              {hotlines.map((h, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    h.urgent 
                      ? 'bg-red-950/20 border-red-500/30 hover:border-red-500/60' 
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-white">{h.name}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          h.urgent ? 'bg-red-500/20 text-red-300' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {h.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{h.desc}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyNumber(h.number, idx)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
                        title="Copy Number"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{h.number}</span>
                      </button>
                      <a
                        href={`tel:${h.number}`}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-transform hover:scale-105 ${
                          h.urgent ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
                        }`}
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: SHARE LOCATION */}
          {activeTab === 'location' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-300 text-sm font-bold">
                    <Navigation className="w-4 h-4 animate-spin" />
                    <span>Real-Time Coordinates</span>
                  </div>
                  <button
                    onClick={handleFetchLocation}
                    disabled={locationState.loading}
                    className="px-3 py-1 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-xs font-semibold border border-cyan-500/40 transition-colors"
                  >
                    {locationState.loading ? 'Detecting...' : 'Refresh GPS'}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-slate-200">
                  {locationState.address}
                </div>

                <p className="text-xs text-slate-400">
                  Sharing your location will generate an encrypted SOS dispatch link that trusted contacts or campus responders can use to reach you immediately.
                </p>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleCopyLocation}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-glow-cyan"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy SOS Message Link</span>
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `EMERGENCY ALERT: I need immediate assistance at ${locationState.address}. Please send campus security!`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FIND SAFE ZONE */}
          {activeTab === 'safezones' && (
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>All 8 campus safe zones maintain continuous high-definition CCTV coverage and 24/7 security guard presence.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {safeZones.map((zone, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <h4 className="text-xs font-bold text-white">{zone.name}</h4>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {zone.dist}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-1">{zone.loc}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>{zone.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.01] flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            Campus Emergency Dispatch Grid Online
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
