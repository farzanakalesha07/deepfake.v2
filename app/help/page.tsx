'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PhoneCall, 
  LifeBuoy, 
  ShieldAlert, 
  HeartHandshake, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ExternalLink,
  ShieldCheck,
  Send,
  X
} from 'lucide-react';
import { EmergencySOSModal } from '@/components/EmergencySOSModal';

export default function HelpAndSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [counselorModalOpen, setCounselorModalOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'counselor'; text: string; time: string }[]>([
    {
      sender: 'counselor',
      text: 'Hello, welcome to Campus Safe Mental Health & Well-being Support. Conversations are 100% confidential. How can I help you today?',
      time: 'Just now'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text: chatMessage,
      time: 'Just now'
    };

    setChatLog(prev => [...prev, newMsg]);
    setChatMessage('');

    setTimeout(() => {
      setChatLog(prev => [
        ...prev,
        {
          sender: 'counselor',
          text: 'Thank you for reaching out. We have logged your request securely. A licensed campus wellness advisor is reviewing your message and can schedule an in-person or anonymous virtual session.',
          time: 'Just now'
        }
      ]);
    }, 1000);
  };

  const emergencyContacts = [
    {
      title: 'National Anti-Ragging Helpline',
      number: '1800-180-5522',
      desc: 'Toll-free 24/7 UGC Standing Tribunal helpline',
      badge: '24/7 TOLL-FREE',
      color: 'border-rose-500/40 text-rose-400 bg-rose-500/10'
    },
    {
      title: 'Campus Emergency Control Room',
      number: '+91 020 2590-8000',
      desc: 'Central security dispatch & rapid patrol vehicle desk',
      badge: 'ON CAMPUS',
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
    },
    {
      title: 'National Emergency Response System',
      number: '112',
      desc: 'Police, fire, and emergency medical ambulance',
      badge: 'NATIONAL',
      color: 'border-amber-500/40 text-amber-400 bg-amber-500/10'
    },
    {
      title: 'Women Safety & Anti-Harassment Cell',
      number: '1091',
      desc: 'Dedicated female student safety and advisory helpline',
      badge: 'CONFIDENTIAL',
      color: 'border-purple-500/40 text-purple-400 bg-purple-500/10'
    }
  ];

  const faqs = [
    {
      q: 'Will my identity be revealed to seniors or suspects if I file a report?',
      a: 'Absolutely not. Campus Safe provides a 100% Anonymous Mode where no student ID, name, or phone number is ever logged. Even in Confidential mode, your identity is strictly encrypted and only accessible by authorized Standing Committee faculty.'
    },
    {
      q: 'How does the Automated Escalation Engine work?',
      a: 'The platform automatically analyzes suspect identity and incident frequency. A 1st report is assigned to your Department Head (Level 1). If a 2nd repeat complaint is flagged against the same individual, it automatically escalates to the Dean of Student Welfare (Level 2). Three or more repeated violations immediately escalate to the Apex Anti-Ragging Standing Tribunal (Level 3).'
    },
    {
      q: 'What should I do if I am experiencing an active emergency right now?',
      a: 'Immediately trigger the red "Emergency SOS" button. This notifies security guards within 180 meters with your location coordinates and starts immediate dispatch.'
    },
    {
      q: 'Can I submit evidence such as screenshots, audio recordings, or photos?',
      a: 'Yes. In Step 2 of the reporting wizard, you can upload evidence files (PNG, JPG, PDF, MP4, MP3). Evidence is encrypted and attached to the official investigation audit trail.'
    }
  ];

  return (
    <div className="min-h-screen py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-600/15 text-purple-300 border border-purple-500/30">
          <LifeBuoy className="w-3.5 h-3.5 text-purple-400" />
          <span>HELP & EMERGENCY RESOURCES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          We Are Here For You. 24/7.
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Access verified emergency numbers, anti-ragging escalation protocols, talk to a counselor in complete privacy, or review safety guidelines.
        </p>
      </div>

      {/* Prominent Emergency Contacts Grid (As Specified) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyContacts.map((contact, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-navy-900/90 border border-white/10 hover:border-white/20 backdrop-blur-xl shadow-xl transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider border ${contact.color}`}>
                  {contact.badge}
                </span>
                <PhoneCall className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-white pt-2">
                {contact.title}
              </h3>
              <p className="text-xs text-slate-400">
                {contact.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-xl font-mono font-black text-white tracking-tight">
                {contact.number}
              </span>
              <a
                href={`tel:${contact.number.replace(/[^0-9+]/g, '')}`}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 shadow-glow-purple transition-all flex items-center gap-1.5"
              >
                <span>Call Now</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Two Pillars: Talk to Counselor & Campus Security Patrol Desk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Talk to Counselor */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-navy-900 to-[#120a28] border border-purple-500/30 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-glow-purple">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Confidential Student Counseling
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Experiencing stress, bullying, anxiety, or trauma? Speak directly with licensed campus psychologists under strict confidentiality without recording student IDs.
            </p>
          </div>

          <button
            onClick={() => setCounselorModalOpen(true)}
            className="w-full py-3 px-4 rounded-2xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-glow-purple transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open Confidential Support Chat</span>
          </button>
        </div>

        {/* Card 2: Campus Security Command Post */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-navy-900 to-[#071935] border border-cyan-500/30 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Campus Security Patrol Squad
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Need a physical security escort across campus at night? Request a designated campus officer to accompany you from study halls to hostel blocks.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/map"
              className="flex-1 py-3 px-4 rounded-2xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-glow-cyan transition-all flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>View On Map</span>
            </Link>
            <button
              onClick={() => setSosModalOpen(true)}
              className="py-3 px-4 rounded-2xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-glow-red transition-all"
            >
              Emergency SOS
            </button>
          </div>
        </div>

      </div>

      {/* Safety Guidelines Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Campus Safety Guidelines</h2>
            <p className="text-xs text-slate-400">Essential actions to protect yourself and peers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <span className="text-xl font-black text-cyan-400">01</span>
            <h3 className="text-sm font-bold text-white">Safe Night Transit</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Always use illuminated corridors highlighted on the Smart Map. Never walk along unfenced boundary lines after 21:00.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <span className="text-xl font-black text-purple-400">02</span>
            <h3 className="text-sm font-bold text-white">Preserve Digital Evidence</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Take complete screenshots showing timestamps, usernames, and group names before blocking abusers on social platforms.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <span className="text-xl font-black text-emerald-400">03</span>
            <h3 className="text-sm font-bold text-white">Zero Tolerance Mandate</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ragging in any form (verbal, physical, financial extortion) is a non-bailable offense under Supreme Court guidelines.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive FAQs Accordion */}
      <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/80 border border-white/10 backdrop-blur-xl shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400">Clear answers on anonymity, investigation timelines, and support</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-white hover:text-cyan-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0 ml-2" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 border-t border-white/5 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Confidential Support Chat Modal */}
      {counselorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-navy-950 border border-purple-500/40 shadow-2xl overflow-hidden flex flex-col h-[520px]">
            {/* Chat Header */}
            <div className="p-4 bg-navy-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Confidential Campus Wellness</h3>
                  <p className="text-[10px] text-emerald-400">● Counselor Online • End-to-End Encrypted</p>
                </div>
              </div>
              <button onClick={() => setCounselorModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatLog.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-white/10 text-slate-200 border border-white/10 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] opacity-70 block mt-1 text-right">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-navy-900 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type confidential message..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Global SOS Modal */}
      <EmergencySOSModal 
        isOpen={sosModalOpen} 
        onClose={() => setSosModalOpen(false)} 
      />

    </div>
  );
}
