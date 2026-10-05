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
          950: "#050B14",
          900: "#081522",
          850: "#0D1C2C",
          800: "#10283A",
          750: "#143248",
          700: "#1A3F5C",
          600: "#225378",
        },
        brand: {
          purple: "#8B5CF6",
          indigo: "#6366F1",
          blue: "#3B82F6",
          cyan: "#06B6D4",
          aqua: "#00F2FE",
          violet: "#7C3AED",
          safe: "#22C55E",
          warning: "#F59E0B",
          danger: "#EF4444",
          coral: "#FF4D6D",
          white: "#F8FAFC",
          muted: "#94A3B8",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'futuristic-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 35%, #3B82F6 70%, #06B6D4 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'purple-glow': 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.18) 0%, transparent 70%)',
        'cyan-glow': 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.18) 0%, transparent 70%)',
        'blue-glow': 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.18) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-purple': '0 0 25px -4px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.35)',
        'glow-blue': '0 0 25px -4px rgba(59, 130, 246, 0.35)',
        'glow-safe': '0 0 25px -4px rgba(34, 197, 94, 0.35)',
        'glow-danger': '0 0 25px -4px rgba(239, 68, 68, 0.35)',
        'glass-card': '0 16px 40px 0 rgba(0, 0, 0, 0.45)',
        'glass-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
