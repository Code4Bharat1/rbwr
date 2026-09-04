"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JourneySheet } from "@/components/layout/journey-sheet";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { useMounted } from "@/hooks/use-mounted";
import { getUser } from "@/lib/data/users";
import { ROLE_HOME, ROLE_LABELS } from "@/lib/types";
import { UserAvatar } from "@/components/shared/user-avatar";

const primaryLinks = [{ href: "/records", label: "Explore Records" }];

const moreLinks = [
  { href: "/adjudicators", label: "Adjudicators" },
  { href: "/passport", label: "Record Passport" },
  { href: "/record-wall", label: "Record Wall" },
  { href: "/certificates", label: "Certificates" },
  { href: "/awards", label: "RBWR Awards" },
  { href: "/platform-flow", label: "Platform Flow" },
  { href: "/presentation", label: "Presentation Mode" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useMounted();
  const viewerRole = useDemoStore((s) => s.viewerRole);
  const viewerUserId = useDemoStore((s) => s.viewerUserId);
  const signOut = useDemoStore((s) => s.signOut);
  const user = mounted && viewerUserId ? getUser(viewerUserId) : undefined;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-gradient text-gold-soft">
            <Trophy className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-navy">
            RBWR
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-sm font-medium text-foreground/80">
                More <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {moreLinks.map((l) => (
                <DropdownMenuItem key={l.href} asChild>
                  <Link href={l.href}>{l.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <JourneySheet />
          </div>

          {mounted && viewerRole && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 pl-1.5 pr-2">
                  <UserAvatar initials={user.initials} color={user.avatarColor} size="sm" />
                  <span className="hidden text-left text-sm leading-tight md:block">
                    <span className="block font-medium">{user.name}</span>
                    <span className="block text-xs text-muted-foreground">{ROLE_LABELS[viewerRole]}</span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Signed in as {ROLE_LABELS[viewerRole]}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={ROLE_HOME[viewerRole]}>Go to my portal</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/passport/${viewerUserId}`}>View my passport</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/sign-in">Switch role</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="bg-navy-gradient text-white hover:opacity-90">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-full overflow-y-auto sm:max-w-sm">
          <SheetHeader>
            <SheetTitle className="font-display text-lg">Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-1 px-4 pb-6">
            {[...primaryLinks, ...moreLinks].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-4">
              <JourneySheet />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
