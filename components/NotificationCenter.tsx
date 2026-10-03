'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  Wrench, 
  CheckCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export interface CampusNotification {
  id: string;
  type: 'Safety Alert' | 'Campus Update' | 'Security Update' | 'Maintenance' | 'Emergency';
  title: string;
  description: string;
  timestamp: string;
  isUnread: boolean;
  actionUrl?: string;
}

const INITIAL_NOTIFICATIONS: CampusNotification[] = [
  {
    id: 'notif-1',
    type: 'Security Update',
    title: 'North Gate Night Escort Service Active',
    description: 'Security escort teams are patrolling North Gate to Hostel Corridor between 20:00 - 04:00.',
    timestamp: '10 mins ago',
    isUnread: true,
    actionUrl: '/map',
  },
  {
    id: 'notif-2',
    type: 'Safety Alert',
    title: 'Automated Escalation: Report #2 Flagged',
    description: 'Repeat incident in Cafeteria corridor automatically escalated to Dean of Student Affairs.',
    timestamp: '45 mins ago',
    isUnread: true,
    actionUrl: '/track',
  },
  {
    id: 'notif-3',
    type: 'Maintenance',
    title: 'West Quadrangle Lighting Inspection',
    description: 'Solar light maintenance scheduled for Path 4 tonight. Please use Illuminated Path 2.',
    timestamp: '2 hours ago',
    isUnread: false,
    actionUrl: '/map',
  },
  {
    id: 'notif-4',
    type: 'Campus Update',
    title: 'Anti-Ragging Tribunal Monthly Session',
    description: 'Standing committee report published with zero-tolerance compliance certifications.',
    timestamp: 'Yesterday',
    isUnread: false,
    actionUrl: '/safety',
  }
];

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<CampusNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => n.isUnread).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const markSingleAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isUnread: false } : n));
  };

  const filtered = activeFilter === 'ALL'
    ? notifications
    : notifications.filter(n => n.type === activeFilter);

  const getBadgeStyle = (type: CampusNotification['type']) => {
    switch (type) {
      case 'Emergency':
        return 'bg-rose-500/15 border-rose-500/40 text-rose-300';
      case 'Safety Alert':
        return 'bg-amber-500/15 border-amber-500/40 text-amber-300';
      case 'Security Update':
        return 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300';
      case 'Maintenance':
        return 'bg-purple-500/15 border-purple-500/40 text-purple-300';
      default:
        return 'bg-blue-500/15 border-blue-500/40 text-blue-300';
    }
  };

  const getIcon = (type: CampusNotification['type']) => {
    switch (type) {
      case 'Emergency':
      case 'Safety Alert':
        return <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />;
      case 'Security Update':
        return <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />;
      case 'Maintenance':
        return <Wrench className="w-4 h-4 text-purple-400 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-blue-400 shrink-0" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md h-full bg-navy-950 border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Live Alert Feed
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {unreadCount} new
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400">Campus-wide safety & security notices</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 text-xs font-medium hover:bg-white/5 transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-3 border-b border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {['ALL', 'Security Update', 'Safety Alert', 'Maintenance'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat === 'ALL' ? 'All Alerts' : cat}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-slate-600 opacity-60" />
              <p className="text-sm font-medium">No alerts in this category</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => markSingleAsRead(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  item.isUnread
                    ? 'bg-navy-900/90 border-cyan-500/30 shadow-lg'
                    : 'bg-navy-900/40 border-white/5 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getIcon(item.type)}
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getBadgeStyle(item.type)}`}>
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">{item.timestamp}</span>
                    {item.isUnread && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-glow-cyan" />
                    )}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-100 mt-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>

                {item.actionUrl && (
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-cyan-400 hover:text-cyan-300 font-semibold">
                    <Link href={item.actionUrl} onClick={onClose} className="inline-flex items-center gap-1">
                      <span>View details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-navy-950/80 text-center text-xs text-slate-400">
          ● Live connected to 24/7 Campus Control Room
        </div>
      </div>
    </div>
  );
};
