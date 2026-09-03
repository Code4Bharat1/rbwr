import { CalendarClock, LayoutDashboard, Trophy, Users, Wallpaper } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const navSections = [
  {
    items: [
      { href: "/club", label: "Overview", icon: <LayoutDashboard /> },
      { href: "/club/members", label: "Members", icon: <Users /> },
      { href: "/club/records", label: "Records", icon: <Trophy /> },
      { href: "/club/attempts", label: "Attempts", icon: <CalendarClock /> },
      { href: "/club/record-wall", label: "Record Wall", icon: <Wallpaper /> },
    ],
  },
];

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell portalLabel="Club Portal" navSections={navSections}>
      {children}
    </DashboardShell>
  );
}
