import Link from 'next/link';
import { Terminal, ShieldCheck } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-4 py-8 relative">
      {/* Minimal Top Brand Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/50 transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-semibold tracking-tight text-white flex items-center gap-1.5">
            Orbiter <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">CLI v0.9.4</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          All agent networks operational
        </div>
      </header>

      {/* Centered Auth Card Area */}
      <div className="w-full max-w-md my-auto">
        {children}
      </div>

      {/* Footer disclaimer & trust badge */}
      <footer className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 pt-8 border-t border-zinc-900 gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-zinc-400" />
          <span>Zero context retention • End-to-end token encryption</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
          <Link href="/docs" className="hover:text-zinc-300 transition-colors">Documentation</Link>
        </div>
      </footer>
    </div>
  );
}