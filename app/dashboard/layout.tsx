import { Award, CalendarClock, FileStack, FileText, LayoutDashboard, Trophy } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const navSections = [
  {
    items: [
      { href: "/dashboard", label: "Overview", icon: <LayoutDashboard /> },
      { href: "/dashboard/applications", label: "My Applications", icon: <FileText /> },
      { href: "/dashboard/attempts", label: "My Attempts", icon: <CalendarClock /> },
      { href: "/dashboard/records", label: "My Records", icon: <Trophy /> },
      { href: "/dashboard/evidence", label: "Evidence", icon: <FileStack /> },
      { href: "/dashboard/certificates", label: "Certificates", icon: <Award /> },
    ],
  },
];

export default function ParticipantDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      portalLabel="Participant Dashboard"
      navSections={navSections}
      requiredRoles={["participant", "rotarian"]}
    >
      {children}
    </DashboardShell>
  );
}
