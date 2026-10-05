import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToastProvider } from '@/components/Toast';

export const metadata: Metadata = {
  title: 'CampusSafe – Campus Safety & Repeated Harassment Reporting System',
  description: 'Speak Up. Stay Safe. An encrypted, futuristic glassmorphism reporting platform for campus safety, harassment prevention, and automatic multi-tier escalation.',
  icons: {
    icon: '/favicon.ico',
  },
};

import { ScreenSwitcherDock } from '@/components/ScreenSwitcherDock';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var _ci = console.info;
                console.info = function() {
                  if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].indexOf('React DevTools') !== -1) {
                    return;
                  }
                  return _ci.apply(console, arguments);
                };
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-black font-['Plus_Jakarta_Sans',sans-serif]">
        <ToastProvider>
          {/* Deep Futuristic Ambient Background with Ambient Glow Orbs */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            {/* Top Cyan ambient glow */}
            <div className="absolute top-[-10%] left-[20%] w-[650px] h-[650px] rounded-full bg-cyan-500/10 blur-[160px]" />
            {/* Middle Blue ambient glow */}
            <div className="absolute top-[35%] right-[10%] w-[550px] h-[550px] rounded-full bg-blue-600/10 blur-[170px]" />
            {/* Violet light bloom */}
            <div className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[180px]" />
            {/* Very subtle cyber grid texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_70%)]" />
          </div>

          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-full pb-16">
              {children}
            </main>
            <Footer />
            <ScreenSwitcherDock />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
