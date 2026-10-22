"use client";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

import { LogOut, Mail, CheckCircle2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";


export default function Home() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  React.useEffect(() => {
    if (!isPending && !data?.user) {
      router.push("/auth/sign-in");
    }
  }, [isPending, data, router]);
  if (isPending) {
    return (
      <div className=" flex flex-col items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onError: (ctx) => console.log(ctx),
        onSuccess: () => {
          (router.push("/auth/sign-in"), router.refresh());
        },
      },
    });
  };
  return (
    <main className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      {/* Centered Profile Card */}
      <div className="w-full max-w-md bg-[#121215]/95 border border-zinc-800/90 rounded-2xl p-8 backdrop-blur-xl shadow-2xl shadow-black/80 flex flex-col items-center text-center relative overflow-hidden">
        {/* Subtle top indigo accent glow */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-linear-to-r from-transparent via-indigo-500/60 to-transparent" />

        {/* 1. Profile Picture / Avatar */}
        <div className="relative mb-5">
          <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-xl overflow-hidden">
            {data?.user?.image ? (
              <img
                src={data?.user?.image}
                alt={data?.user?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-indigo-400" />
            )}
          </div>
          {/* Active status pulse dot */}
          <span
            className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#121215] shadow-sm"
            title="Active Session"
          />
        </div>

        {/* Name and Handle */}
        <h1 className="text-xl font-semibold tracking-tight text-white">
          {data?.user?.name}
        </h1>

        {/* 2. User Email ID with verification */}
        <div className="mt-5 w-full space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 text-sm font-mono shadow-inner select-all">
            <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
            <span className="font-medium truncate">{data?.user.email}</span>
            {data?.user?.emailVerified && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-emerald-400/90">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Signed in with SSO</span>
          </div>
        </div>

        {/* 3. Prominent Sign Out Button */}
        <div className="w-full pt-6 mt-6 border-t border-zinc-850">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-950/25 hover:bg-rose-950/50 border border-rose-900/40 text-rose-300 hover:text-white transition-all font-medium text-sm flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
