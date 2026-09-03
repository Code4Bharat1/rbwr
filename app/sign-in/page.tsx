"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  Building2,
  ClipboardCheck,
  Globe2,
  Landmark,
  ShieldCheck,
  Trophy,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useDemoStore, ROLE_DEFAULT_USER } from "@/lib/store/use-demo-store";
import { getUser } from "@/lib/data/users";
import { ROLE_HOME, ROLE_LABELS, Role } from "@/lib/types";

const rolePanels: { role: Role; icon: typeof Trophy; blurb: string }[] = [
  { role: "participant", icon: UserRound, blurb: "Apply for records, track applications, and manage your certificates." },
  { role: "rotarian", icon: Globe2, blurb: "Everything a participant has, plus your club and district affiliation." },
  { role: "adjudicator", icon: ClipboardCheck, blurb: "Run live attempts, capture evidence, and file adjudication reports." },
  { role: "club-admin", icon: Building2, blurb: "Manage your Rotary club's records, members, and community impact." },
  { role: "district-admin", icon: Landmark, blurb: "Oversee every club, record, and leaderboard position in your district." },
  { role: "reviewer", icon: ShieldCheck, blurb: "Triage applications, issue guidelines, and run the verification pipeline." },
  { role: "record-manager", icon: Award, blurb: "Curate the official record catalog, categories, and publication status." },
  { role: "super-admin", icon: Trophy, blurb: "Full command center — users, roles, payments, audit logs, and reports." },
];

export default function SignInPage() {
  const router = useRouter();
  const signIn = useDemoStore((s) => s.signIn);

  function handleSignIn(role: Role) {
    signIn(role);
    router.push(ROLE_HOME[role]);
  }

  return (
    <div className="min-h-screen bg-navy-gradient px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-gradient text-navy-deep">
              <Trophy className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-semibold text-white">RBWR</span>
          </Link>
          <h1 className="mt-6 font-display text-3xl font-semibold text-white sm:text-4xl">
            Choose how you want to sign in
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            This is a prototype — there are no passwords. Pick any role below to instantly explore
            RBWR from that person&apos;s perspective. Switch anytime from the Demo Control Center.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rolePanels.map(({ role, icon: Icon, blurb }) => {
            const user = getUser(ROLE_DEFAULT_USER[role]);
            return (
              <button
                key={role}
                onClick={() => handleSignIn(role)}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition-all hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.08]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-lg font-semibold text-white">
                  {ROLE_LABELS[role]}
                </span>
                <span className="text-sm text-white/60">{blurb}</span>
                {user && (
                  <span className="mt-auto flex items-center gap-2 border-t border-white/10 pt-3 text-xs text-white/50">
                    <UserAvatar initials={user.initials} color={user.avatarColor} size="sm" />
                    Sign in as {user.name}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="ghost" className="text-white/70 hover:bg-white/10 hover:text-white">
            <Link href="/">Continue browsing as a public visitor →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
