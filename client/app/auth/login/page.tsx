"use client";

import LoginPage from "@/components/ui/login-form";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();



    if (!isPending && data?.user) {
      router.replace("/");
    }
  

  if (isPending || data?.user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="flex w-full items-center justify-center px-4 py-8">
      <LoginPage />
    </main>
  );
}