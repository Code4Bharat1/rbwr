import { Building2, LayoutDashboard, Trophy, Users } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const navSections = [
  {
    items: [
      { href: "/district", label: "Overview", icon: <LayoutDashboard /> },
      { href: "/district/clubs", label: "Clubs", icon: <Building2 /> },
      { href: "/district/records", label: "Records", icon: <Trophy /> },
      { href: "/district/leaderboard", label: "Leaderboard", icon: <Users /> },
    ],
  },
];

export default function DistrictLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell portalLabel="District Portal" navSections={navSections}>
      {children}
    </DashboardShell>
  );
}
