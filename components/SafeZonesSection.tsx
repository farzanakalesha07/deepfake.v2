'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Sparkles,
  Wifi,
  PhoneCall,
  Video,
  Heart
} from 'lucide-react';

export interface SafeZoneCard {
  id: string;
  name: string;
  image: string;
  status: string;
  distance: string;
  walkTime: string;
  facilities: string[];
  description: string;
}

const SAFE_ZONES_DATA: SafeZoneCard[] = [
  {
    id: 'sz-1',
    name: 'Central Library Sanctuary',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    status: '🟢 SAFE • High Supervision',
    distance: '240 m',
    walkTime: '3 min walk',
    facilities: ['24/7 CCTV', 'Biometric Turnstiles', 'Emergency Phone', 'Security Guard Station'],
    description: 'Quiet, well-illuminated academic wing with direct internal access to campus security dispatch.',
  },
  {
    id: 'sz-2',
    name: 'Central Garden & Promenade',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    status: '🟢 SAFE • Patrol Active',
    distance: '150 m',
    walkTime: '2 min walk',
    facilities: ['Solar Illumination', 'Emergency Call Pillar', 'Patrol Route Every 15m'],
    description: 'Broad open-air landscaped quadrangle monitored by high-definition 360° pan-tilt cameras.',
  },
  {
    id: 'sz-3',
    name: 'Student Activity Center',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    status: '🟢 SAFE • Crowd Verified',
    distance: '310 m',
    walkTime: '4 min walk',
    facilities: ['AED Defibrillator', 'First Aid Station', 'Information Desk', 'Wi-Fi Mesh'],
    description: 'Vibrant student commons with round-the-clock staff, cafeteria access, and verified safe transit hub.',
  },
  {
    id: 'sz-4',
    name: 'Main Campus Gate Security Station',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
    status: '🟢 SAFE • Armed Command',
    distance: '480 m',
    walkTime: '6 min walk',
    facilities: ['Vehicle Checkpoint', 'Night Escort Dispatch', 'Immediate Police Liaison'],
    description: 'Primary campus perimeter access checkpoint with 24/7 armed personnel and CCTV vehicle scans.',
  },
  {
    id: 'sz-5',
    name: 'Security Command Room',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    status: '🟢 SAFE • Headquarters',
    distance: '180 m',
    walkTime: '2 min walk',
    facilities: ['Command Dispatch', 'Rapid Response Squad', 'Direct 112 Trunk'],
    description: 'Central campus emergency management bunker with live monitoring of all 320 campus cameras.',
  },
];

export const SafeZonesSection: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>VERIFIED SAFE HAVENS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Designated Campus Safe Zones
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Pre-audited physical areas equipped with emergency call boxes, continuous illumination, and immediate staff supervision.
          </p>
        </div>

        <Link
          href="/map"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors shrink-0"
        >
          <span>Open Full Interactive Map</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Horizontal Scrolling Card Deck on Mobile / Responsive Grid on Desktop */}
      <div className="flex overflow-x-auto gap-5 pb-4 pt-1 no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
        {SAFE_ZONES_DATA.map((zone) => (
          <div
            key={zone.id}
            className="w-[85vw] sm:w-auto shrink-0 snap-center rounded-3xl bg-navy-900/80 border border-white/10 hover:border-emerald-500/40 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
          >
            {/* Image Header with Badge Overlay */}
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={zone.image}
                alt={zone.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              
              {/* Status Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-navy-950/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-md">
                {zone.status}
              </div>

              {/* Distance Pill */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold bg-black/75 text-cyan-300 border border-white/10 backdrop-blur-md">
                📍 {zone.distance} (~{zone.walkTime})
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {zone.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {zone.description}
                </p>
              </div>

              {/* Facilities Chips */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Available Infrastructure:</p>
                <div className="flex flex-wrap gap-1.5">
                  {zone.facilities.map((fac, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-lg text-[10px] bg-white/5 border border-white/5 text-slate-300">
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* Get Directions Button */}
              <Link
                href={`/map?zone=${encodeURIComponent(zone.name)}`}
                className="mt-3 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-navy-800 hover:bg-emerald-600/80 border border-white/10 hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2 group-hover:shadow-glow-emerald"
              >
                <Navigation className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white transition-colors" />
                <span>Get Directions</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
