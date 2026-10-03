import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050816", // 2026 Core background
          900: "#080E24",
          850: "#0B1535",
          800: "#0F1E47",
          750: "#13275A",
          700: "#183272",
          600: "#1E4195",
        },
        brand: {
          purple: "#8B5CF6",
          violet: "#7C3AED",
          cyan: "#06B6D4",
          sky: "#38BDF8",
          accent: "#22D3EE",
          electric: "#00E5FF",
        },
        status: {
          safe: "#10B981",
          warning: "#F59E0B",
          emergency: "#EF4444",
          info: "#3B82F6",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'poster-gradient': 'linear-gradient(135deg, #050816 0%, #0F1E47 50%, #080E24 100%)',
        'purple-glow': 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        'cyan-glow': 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        'emergency-glow': 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.25) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'glow-red': '0 0 35px 2px rgba(239, 68, 68, 0.5)',
        'card-dark': '0 12px 40px 0 rgba(0, 0, 0, 0.5)',
        'glass-highlight': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      },
      animation: {
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'radar': 'radar 4s linear infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '14%': { transform: 'scale(1.08)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(1)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
