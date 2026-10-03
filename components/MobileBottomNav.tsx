'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Map, 
  AlertTriangle, 
  FileText, 
  LifeBuoy, 
  User 
} from 'lucide-react';

interface MobileBottomNavProps {
  onOpenSOS: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenSOS }) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/90 backdrop-blur-2xl border-t border-white/10 px-2 py-1.5 shadow-2xl pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
            isActive('/') ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        {/* Map */}
        <Link
          href="/map"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
            isActive('/map') ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Map</span>
        </Link>

        {/* Central Prominent SOS Button */}
        <div className="relative -top-5 flex flex-col items-center">
          <button
            onClick={onOpenSOS}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-rose-500 shadow-glow-red border-2 border-white/40 flex items-center justify-center text-white active:scale-90 transition-transform"
            aria-label="Emergency SOS"
          >
            <span className="font-black text-sm tracking-wider">SOS</span>
          </button>
          <span className="text-[9px] font-bold text-rose-400 mt-1 uppercase tracking-tight">EMERGENCY</span>
        </div>

        {/* Report */}
        <Link
          href="/report"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
            isActive('/report') ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Report</span>
        </Link>

        {/* Profile */}
        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
            isActive('/profile') ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Profile</span>
        </Link>

      </div>
    </div>
  );
};
