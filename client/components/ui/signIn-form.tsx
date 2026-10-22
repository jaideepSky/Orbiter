'use client';

import * as React from 'react';
import Link from 'next/link';
import { SiGithub } from "@icons-pack/react-simple-icons";
import { 
  
  Terminal, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Mail, 
  Lock, 
  Sparkles,
  ShieldAlert,
  Laptop
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function SignInForm() {
  const [copied, setCopied] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const cliCommand = 'orbiter auth login --device';

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(cliCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy CLI command:', err);
    }
  };

  const handleGitHubAuth = () => {
    setIsLoading('github');
    // Trigger OAuth redirect (e.g., signIn('github', { callbackUrl: '/dashboard' }))
    window.location.href = '/api/auth/signin/github';
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading('credentials');
    // Handle credentials or magic link auth logic
    setTimeout(() => {
      setIsLoading(null);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Auth Card */}
      <Card className="bg-[#121215]/90 border-zinc-800/80 backdrop-blur-xl shadow-2xl shadow-black/60 relative overflow-hidden">
        {/* Subtle top card glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />

        <CardHeader className="space-y-2 pb-4 text-center sm:text-left">
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-mono text-[11px] gap-1.5 py-0.5"
            >
              <Terminal className="w-3 h-3" />
              CLI Fast-Sync
            </Badge>
            <span className="text-[11px] text-zinc-500 font-mono">v0.9.4</span>
          </div>
          <CardTitle className="text-xl font-semibold tracking-tight text-white pt-1">
            Authenticate Agent
          </CardTitle>
          <CardDescription className="text-zinc-400 text-xs leading-relaxed">
            Sign in to bind runtime permissions and export cryptographic session keys directly to your local machine.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Primary GitHub OAuth Provider */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGitHubAuth}
            disabled={isLoading !== null}
            className="w-full h-11 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border-zinc-750 hover:border-zinc-600 transition-all flex items-center justify-between px-4 group shadow-sm"
          >
            <div className="flex items-center gap-2.5">
             <SiGithub className="w-4 h-4 text-white group-hover:scale-105 transition-transform" />
              <span className="font-medium text-sm">Continue with GitHub</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-indigo-400 bg-indigo-950/70 border border-indigo-800/50 px-1.5 py-0.5 rounded font-mono font-medium">
                Recommended
              </span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">
                G
              </kbd>
            </div>
          </Button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-mono">
              <span className="bg-[#121215] px-2 text-zinc-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form Tabs: Password vs Magic Link */}
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid grid-cols-2 w-full bg-zinc-900/80 border border-zinc-800/80 p-0.5 h-9">
              <TabsTrigger 
                value="password" 
                className="text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400"
              >
                Password
              </TabsTrigger>
              <TabsTrigger 
                value="magic-link" 
                className="text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400"
              >
                Magic Link
              </TabsTrigger>
            </TabsList>

            {/* Password Login Tab */}
            <TabsContent value="password" className="pt-4 space-y-3.5 focus-visible:outline-none">
              <form onSubmit={handleCredentialsSubmit} className="space-y-3.5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email" className="text-xs font-medium text-zinc-300">
                      Work Email
                    </Label>
                    <span className="text-[10px] text-zinc-500 font-mono">SSO ready</span>
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.internal"
                      required
                      className="pl-9 h-10 bg-zinc-900/60 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-medium text-zinc-300">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="pl-9 pr-9 h-10 bg-zinc-900/60 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading !== null}
                  className="w-full h-10 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-md shadow-indigo-600/20 gap-1.5"
                >
                  {isLoading === 'credentials' ? (
                    <span className="font-mono text-xs animate-pulse">Authenticating...</span>
                  ) : (
                    <>
                      Sign In to Workspace
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Magic Link Tab */}
            <TabsContent value="magic-link" className="pt-4 space-y-3.5 focus-visible:outline-none">
              <form onSubmit={handleCredentialsSubmit} className="space-y-3.5">
                <div className="space-y-1.5">
                  <Label htmlFor="magic-email" className="text-xs font-medium text-zinc-300">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                      id="magic-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      required
                      className="pl-9 h-10 bg-zinc-900/60 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 text-sm"
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading !== null}
                  className="w-full h-10 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  Send Instant Login Link
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Fast-Pair Terminal Bridge Box */}
          <div className="rounded-lg border border-zinc-800/90 bg-zinc-950/70 p-3.5 space-y-2 mt-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-zinc-300 font-mono text-[11px]">
                <Laptop className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">Fast-Pair Via CLI</span>
              </div>
              <button
                type="button"
                onClick={handleCopyCommand}
                className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors font-mono"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-black/60 border border-zinc-850 px-2.5 py-1.5 rounded font-mono text-xs text-zinc-300 flex items-center justify-between select-all">
              <span><span className="text-indigo-400 select-none">&gt; </span>{cliCommand}</span>
            </div>

            <p className="text-[11px] text-zinc-500 leading-normal">
              Transfers authenticated session tokens directly to your local terminal daemon without browser redirects.
            </p>
          </div>
        </CardContent>

        <CardFooter className="pt-2 pb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 border-t border-zinc-900/80">
          <div>
            New deployment?{' '}
            <Link href="/register" className="text-zinc-300 hover:text-white underline underline-offset-4">
              Provision node
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/docs/security" className="hover:text-zinc-400 transition-colors">Security Docs</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}



