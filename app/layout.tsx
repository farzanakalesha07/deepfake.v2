import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToastProvider } from '@/components/Toast';

export const metadata: Metadata = {
  title: 'CampusSafe – Campus Safety & Repeated Harassment Reporting System',
  description: 'Report safely. Protect your privacy. Escalate when it matters. An encrypted, automated reporting platform for college student safety.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
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
      <body className="min-h-screen bg-navy-950 text-slate-100 flex flex-col antialiased selection:bg-purple-600 selection:text-white">
        <ToastProvider>
          <div className="relative min-h-screen flex flex-col bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
            <Navbar />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
