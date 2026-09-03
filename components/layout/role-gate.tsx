"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { ROLE_LABELS, Role } from "@/lib/types";

export function RoleGate({ portalLabel, requiredRoles }: { portalLabel: string; requiredRoles: Role[] }) {
  const signIn = useDemoStore((s) => s.signIn);

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-gradient px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold-soft">
          <ShieldAlert className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-display text-xl font-semibold text-white">Restricted Area</h1>
        <p className="mt-2 text-sm text-white/70">
          The {portalLabel} is only visible to signed-in {requiredRoles.map((r) => ROLE_LABELS[r]).join(" / ")}{" "}
          accounts. Sign in below to continue.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          {requiredRoles.map((role) => (
            <Button
              key={role}
              className="bg-gold-gradient text-navy-deep hover:opacity-90"
              onClick={() => signIn(role)}
            >
              Sign in as {ROLE_LABELS[role]}
            </Button>
          ))}
          <Button asChild variant="ghost" className="text-white/70 hover:bg-white/10 hover:text-white">
            <Link href="/sign-in">Choose a different role →</Link>
          </Button>
        </div>
        <Link href="/" className="mt-6 inline-block text-xs text-white/50 hover:text-white/80">
          ← Back to public site
        </Link>
      </div>
    </div>
  );
}
