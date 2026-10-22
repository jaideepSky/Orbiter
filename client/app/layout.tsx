import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '../components/ui/theme-provider';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Orbiter — Autonomous CLI Agent',
  description: 'Inspect repos, write deterministic code, and automate terminal workflows directly from your command line.',
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans bg-[#09090b] text-zinc-100 min-h-screen antialiased selection:bg-indigo-500/30 selection:text-indigo-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          {/* Ambient subtle background glow */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-200 h-125 bg-indigo-600/10 blur-[140px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-125 h-100 bg-cyan-600/5 blur-[120px] rounded-full" />
          </div>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}