import {
  Award,
  CalendarDays,
  ClipboardCheck,
  FileStack,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const navSections = [
  {
    items: [
      { href: "/adjudicator", label: "Overview", icon: <LayoutDashboard /> },
      { href: "/adjudicator/attempts", label: "Assigned Attempts", icon: <ClipboardCheck /> },
      { href: "/adjudicator/calendar", label: "Calendar", icon: <CalendarDays /> },
      { href: "/adjudicator/evidence", label: "Evidence", icon: <FileStack /> },
      { href: "/adjudicator/reports", label: "Reports", icon: <FileStack /> },
      { href: "/adjudicator/certification", label: "Certification", icon: <Award /> },
      { href: "/adjudicator/profile", label: "Profile", icon: <UserCircle /> },
    ],
  },
];

export default function AdjudicatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell portalLabel="Adjudicator Portal" navSections={navSections} requiredRoles={["adjudicator"]}>
      {children}
    </DashboardShell>
  );
}
