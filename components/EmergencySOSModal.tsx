'use client';

import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  MapPin, 
  PhoneCall, 
  X, 
  ShieldCheck, 
  Radio, 
  Clock, 
  Heart,
  ChevronRight,
  RotateCcw,
  Volume2,
  Ambulance,
  Users
} from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAssistanceType?: 'security' | 'medical' | 'escalation';
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({ 
  isOpen, 
  onClose,
  initialAssistanceType = 'security' 
}) => {
  const [assistanceType, setAssistanceType] = useState<'security' | 'medical' | 'escalation'>(initialAssistanceType);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [locationName, setLocationName] = useState('Block B, Ground Floor (Near East Corridor)');
  const [isChangingLocation, setIsChangingLocation] = useState(false);
  const [dispatchETA, setDispatchETA] = useState(120); // 2 minutes in seconds
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Synchronize initial prop
  useEffect(() => {
    if (initialAssistanceType) {
      setAssistanceType(initialAssistanceType);
    }
  }, [initialAssistanceType]);

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      setIsEmergencyActive(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Active Emergency ETA countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isEmergencyActive && dispatchETA > 0) {
      timer = setInterval(() => {
        setDispatchETA(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isEmergencyActive, dispatchETA]);

  if (!isOpen) return null;

  const handleStartCountdown = () => {
    setCountdown(3);
  };

  const handleCancelCountdown = () => {
    setCountdown(null);
  };

  const handleDeactivateEmergency = () => {
    setIsEmergencyActive(false);
    setCountdown(null);
    setDispatchETA(120);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-xl rounded-3xl border shadow-2xl transition-all duration-300 overflow-hidden ${
          isEmergencyActive 
            ? 'bg-gradient-to-b from-navy-950 via-[#1c080e] to-navy-950 border-rose-500/50 shadow-glow-red' 
            : 'bg-navy-950/95 border-white/15'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Alert Bar */}
        <div className={`h-1.5 w-full ${isEmergencyActive ? 'bg-rose-500 animate-pulse' : 'bg-gradient-to-r from-brand-violet via-cyan-400 to-rose-500'}`} />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <span className={`flex h-3 w-3 relative ${isEmergencyActive ? 'animate-ping' : ''}`}>
              <span className={`inline-flex rounded-full h-3 w-3 ${isEmergencyActive ? 'bg-rose-500' : 'bg-amber-400'}`} />
            </span>
            <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              {isEmergencyActive ? 'EMERGENCY PROTOCOL ACTIVE' : 'EMERGENCY SOS MODE'}
            </h2>
          </div>
          <button
            onClick={() => {
              if (isEmergencyActive) {
                if (confirm('Are you sure you want to cancel the active SOS beacon?')) {
                  handleDeactivateEmergency();
                  onClose();
                }
              } else {
                onClose();
              }
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Heartbeat ECG Line Visual */}
          <div className="relative w-full h-8 flex items-center justify-center overflow-hidden opacity-80">
            <svg className="w-full h-full" viewBox="0 0 500 50" preserveAspectRatio="none">
              <path
                d="M 0 25 L 140 25 L 160 5 L 175 45 L 190 15 L 205 35 L 220 25 L 340 25 L 360 5 L 375 45 L 390 15 L 405 35 L 420 25 L 500 25"
                fill="none"
                stroke={isEmergencyActive ? '#EF4444' : '#8B5CF6'}
                strokeWidth="2.5"
                className="animate-ecg"
              />
            </svg>
          </div>

          {/* STATE 1: ACTIVE EMERGENCY PROTOCOL */}
          {isEmergencyActive ? (
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center animate-ping absolute" />
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-rose-700 to-rose-500 shadow-glow-red flex flex-col items-center justify-center text-white relative z-10">
                  <Radio className="w-9 h-9 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest uppercase mt-1">DISPATCHED</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-rose-400 tracking-tight">
                  HELP IS ON THE WAY
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-sm mx-auto">
                  Patrol Unit #4 (Campus Response Squad) has been assigned and is heading to your coordinates.
                </p>
              </div>

              {/* Status Tracker Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/30 text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-rose-400" /> Estimated Arrival
                  </span>
                  <span className="font-mono text-base font-bold text-rose-400">
                    {formatTime(dispatchETA)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-cyan-400" /> Transmitted Location
                  </span>
                  <span className="font-medium text-slate-200 truncate max-w-[240px]">
                    {locationName}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Dispatched Team
                  </span>
                  <span className="font-medium text-emerald-300">
                    {assistanceType === 'medical' ? 'Campus Health Center Team' : 'Head Security Guard + 2 Officers'}
                  </span>
                </div>
              </div>

              {/* Quick Actions in Active Mode */}
              <div className="space-y-3 pt-2">
                <a
                  href="tel:18001805522"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-glow-red transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Central Control Room Directly</span>
                </a>

                <button
                  onClick={handleDeactivateEmergency}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
                >
                  I Am Safe (Cancel SOS Alert)
                </button>
              </div>
            </div>
          ) : countdown !== null ? (
            /* STATE 2: 3-SECOND COUNTDOWN STATE */
            <div className="text-center py-6 space-y-6">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border-4 border-rose-500/40 border-t-rose-500 animate-spin absolute" />
                <div className="w-28 h-28 rounded-full bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center text-rose-400 text-5xl font-black">
                  {countdown}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Activating Emergency Signal...
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  GPS coordinates and audio alert will broadcast to campus authorities when timer hits 0.
                </p>
              </div>

              <button
                onClick={handleCancelCountdown}
                className="py-3 px-8 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all shadow-md active:scale-95"
              >
                Cancel Countdown
              </button>
            </div>
          ) : (
            /* STATE 3: READY TO TRIGGER SOS */
            <div className="space-y-6">
              
              {/* Giant Glowing SOS Trigger Button */}
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative flex items-center justify-center">
                  {/* Pulsing concentric rings */}
                  <span className="absolute w-48 h-48 rounded-full bg-rose-600/10 border border-rose-500/20 animate-ripple" />
                  <span className="absolute w-40 h-40 rounded-full bg-rose-600/15 border border-rose-500/30 animate-pulse-slow" />
                  <span className="absolute w-32 h-32 rounded-full bg-rose-600/20 shadow-glow-red animate-ping opacity-40" />

                  {/* Primary SOS Interactive Button */}
                  <button
                    onClick={handleStartCountdown}
                    className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-rose-500 text-white font-black text-3xl tracking-widest shadow-glow-red hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-rose-300/40 flex flex-col items-center justify-center group focus:outline-none"
                    aria-label="Trigger Emergency SOS"
                  >
                    <span className="drop-shadow-md group-hover:scale-110 transition-transform">SOS</span>
                    <span className="text-[9px] font-semibold tracking-normal text-rose-100 uppercase opacity-90">TAP TO ALERT</span>
                  </button>
                </div>

                <p className="text-xs text-slate-400 mt-6 text-center max-w-sm">
                  Your current location and profile will be shared directly with on-duty campus security officers.
                </p>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-navy-900/90 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">📍 Current Location</p>
                    <p className="text-sm font-semibold text-slate-100 truncate">{locationName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChangingLocation(!isChangingLocation)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 shrink-0 transition-colors"
                >
                  {isChangingLocation ? 'Done' : 'Change'}
                </button>
              </div>

              {/* Location Picker simulation if changing */}
              {isChangingLocation && (
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1.5 animate-in slide-in-from-top-2">
                  <p className="text-[11px] text-slate-400 pb-1">Select simulated location:</p>
                  {[
                    'Block B, Ground Floor (Near East Corridor)',
                    'Library North Lawn & Silent Study Zone',
                    'Main Academic Quadrangle (Block A)',
                    'Girls Hostel Block C Main Gate',
                    'Sports Complex & Gymnasium Walkway'
                  ].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { setLocationName(loc); setIsChangingLocation(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                        locationName === loc 
                          ? 'bg-cyan-500/20 text-cyan-300 font-semibold' 
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}

              {/* Emergency Service Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Required Assistance Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAssistanceType('security')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      assistanceType === 'security'
                        ? 'bg-rose-500/20 border-rose-500/50 text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                    <span className="text-xs font-semibold">Security Team</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAssistanceType('medical')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      assistanceType === 'medical'
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Ambulance className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs font-semibold">Medical Help</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAssistanceType('escalation')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      assistanceType === 'escalation'
                        ? 'bg-purple-500/20 border-purple-500/50 text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-5 h-5 text-purple-400" />
                    <span className="text-xs font-semibold">Anti-Ragging Squad</span>
                  </button>
                </div>
              </div>

              {/* Direct Emergency Contacts quick strip */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Direct Dial Hotlines:</span>
                <div className="flex gap-2">
                  <a href="tel:112" className="text-rose-400 hover:underline font-semibold">
                    112 (National)
                  </a>
                  <span>•</span>
                  <a href="tel:18001805522" className="text-cyan-400 hover:underline font-semibold">
                    1800-180-5522 (Anti-Ragging)
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
