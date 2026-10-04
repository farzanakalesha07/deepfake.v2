'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  ShieldCheck, 
  Bot, 
  Lock, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  CornerDownLeft,
  ChevronRight,
  Info
} from 'lucide-react';

interface AiSafetyAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickTips?: string[];
}

export const AiSafetyAssistantModal: React.FC<AiSafetyAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: 'Hello, I am the CampusSafe AI Assistant. I can assist you with confidential complaint guidance, evidence verification tips, escalation criteria, and student privacy rights.',
      timestamp: 'Just now',
      quickTips: [
        'How is my complaint kept confidential?',
        'What is the difference between offline & online ragging?',
        'How does automatic 3-tier escalation work?',
        'What evidence should I attach for cyber harassment?'
      ]
    }
  ]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate context-aware intelligent response
    setTimeout(() => {
      let reply = '';
      const lower = q.toLowerCase();

      if (lower.includes('confidential') || lower.includes('anonymous') || lower.includes('privacy')) {
        reply = 'Under CampusSafe, your personal details (name, student ID, contact) are encrypted and isolated in role-restricted vault storage. When you submit a report, you can choose Full Anonymous (no identifying data saved) or Confidential (visible only to higher-tier disciplinary authorities investigating the case). Suspects are NEVER shown who reported them.';
      } else if (lower.includes('offline') || lower.includes('online') || lower.includes('difference')) {
        reply = 'Offline Ragging covers in-person physical harassment, following, unwanted stalking, cafeteria or hostel bullying, and physical intimidation. Online Ragging covers digital harassment: fake impersonation accounts, abusive DMs, circulating unauthorized photos, blackmail, or group cyberbullying. For online cases, screenshot proof with timestamps is highly recommended.';
      } else if (lower.includes('escalat') || lower.includes('tier') || lower.includes('hod') || lower.includes('dean')) {
        reply = 'CampusSafe features an automated escalation engine: 1st Report is assigned to the department HOD (Level 1). If a second report is detected involving the same suspect or repeating location, it automatically escalates to the Dean of Student Affairs (Level 2). A 3rd report immediately triggers Level 3 escalation to the Apex Anti-Ragging Committee and Vice-Chancellor tribunal.';
      } else if (lower.includes('evidence') || lower.includes('upload') || lower.includes('proof')) {
        reply = 'You can upload screenshots, photos, audio clips, or PDF documents up to 25MB. For cyber incidents, please include timestamps, URL/handle, and full message context if possible. Uploads are scrubbed of personal location metadata and stored in an encrypted evidence locker accessible only to authorized proctors.';
      } else if (lower.includes('track') || lower.includes('id')) {
        reply = 'When you finish submitting a complaint, you receive an alphanumeric Complaint ID (such as CS-2026-8F42K). You can track live investigation progress on the "Track Complaint" page without logging in or entering any password. This protects your identity while providing full audit transparency.';
      } else {
        reply = `I have logged your query regarding "${q}". For safety emergencies, please use the Emergency Hotlines (1800-180-5522). If this is an incident you experienced or witnessed, we encourage submitting a confidential complaint through the 5-step reporting wizard.`;
      }

      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, aiReply]);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#080D24] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Gradient Banner */}
        <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-glow-purple">
              <div className="w-full h-full bg-[#080D24] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">AI Safety Assistant</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  ● ACTIVE MONITORING
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Intelligent campus safety companion &amp; confidential reporting guidance.
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

        {/* Live Safety Status Banner */}
        <div className="px-6 py-2.5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Campus Status: <strong className="text-emerald-400">SAFE</strong></span>
          </div>
          <div className="text-slate-400">
            Threat Level: <span className="text-cyan-300 font-bold">LOW</span>
          </div>
          <div className="text-slate-400 hidden sm:block">
            Safety Score: <span className="text-purple-300 font-bold">92%</span>
          </div>
        </div>

        {/* Chat Stream */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {messages.map((m) => (
            <div 
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400 font-mono">
                {m.sender === 'ai' ? (
                  <>
                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CampusSafe AI</span>
                  </>
                ) : (
                  <span>You (Confidential)</span>
                )}
                <span>• {m.timestamp}</span>
              </div>

              <div 
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none shadow-glow-purple'
                    : 'bg-white/[0.05] border border-white/10 text-slate-200 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>

              {m.quickTips && (
                <div className="mt-3 flex flex-wrap gap-2 max-w-lg">
                  {m.quickTips.map((tip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(tip)}
                      className="px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-xs text-purple-200 hover:text-white transition-all text-left flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{tip}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02]">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about confidential reporting, safety rules, or escalation..."
              className="flex-1 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-glow-purple transition-all"
            >
              <span>Ask</span>
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              Direct zero-retention chat session
            </span>
            <span>UGC Anti-Ragging Regulatory AI v2.4</span>
          </div>
        </div>

      </div>
    </div>
  );
};
