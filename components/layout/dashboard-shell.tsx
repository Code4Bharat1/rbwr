"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LogOut, Trophy } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { GlobalSearch } from "@/components/layout/global-search";
import { NotificationsPopover } from "@/components/layout/notifications-popover";
import { RoleGate } from "@/components/layout/role-gate";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { useMounted } from "@/hooks/use-mounted";
import { getUser } from "@/lib/data/users";
import { ROLE_LABELS, Role } from "@/lib/types";

export type NavSection = {
  title?: string;
  items: { href: string; label: string; icon: React.ReactNode }[];
};

export function DashboardShell({
  portalLabel,
  navSections,
  requiredRoles,
  children,
}: {
  portalLabel: string;
  navSections: NavSection[];
  requiredRoles?: Role[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mounted = useMounted();
  const viewerRole = useDemoStore((s) => s.viewerRole);
  const viewerUserId = useDemoStore((s) => s.viewerUserId);
  const signOut = useDemoStore((s) => s.signOut);
  const user = mounted && viewerUserId ? getUser(viewerUserId) : undefined;

  if (mounted && requiredRoles && (!viewerRole || !requiredRoles.includes(viewerRole))) {
    return <RoleGate portalLabel={portalLabel} requiredRoles={requiredRoles} />;
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-sidebar-border">
        <SidebarHeader className="gap-3 px-3 py-4">
          <Link href="/" className="flex items-center gap-2 px-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-gradient text-navy-deep">
              <Trophy className="h-4 w-4" />
            </span>
            <span className="font-display text-base font-semibold text-sidebar-foreground">RBWR</span>
          </Link>
          <p className="px-1 text-xs font-medium uppercase tracking-wide text-sidebar-foreground/50">
            {portalLabel}
          </p>
        </SidebarHeader>
        <SidebarContent>
          {navSections.map((section, i) => (
            <SidebarGroup key={i}>
              {section.title && <SidebarGroupLabel>{section.title}</SidebarGroupLabel>}
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                          <Link href={item.href}>
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter className="gap-2 px-3 pb-4">
          {user && viewerRole && (
            <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent px-2 py-2">
              <UserAvatar initials={user.initials} color={user.avatarColor} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-sidebar-accent-foreground">{user.name}</p>
                <p className="truncate text-xs text-sidebar-foreground/60">{ROLE_LABELS[viewerRole]}</p>
              </div>
              <button
                onClick={signOut}
                title="Sign out"
                className="rounded-md p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-border hover:text-sidebar-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur">
          <SidebarTrigger />
          <nav className="hidden min-w-0 flex-1 items-center gap-1 text-sm text-muted-foreground md:flex">
            <Link href="/" className="hover:text-foreground">
              RBWR
            </Link>
            <span className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{portalLabel}</span>
            </span>
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2 md:flex-none">
            <GlobalSearch />
            <NotificationsPopover />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
