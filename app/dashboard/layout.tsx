import {
  Award,
  CalendarClock,
  Crown,
  FileStack,
  FileText,
  Flame,
  LayoutDashboard,
  PlusCircle,
  Radio,
  Swords,
  Trophy,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const navSections = [
  {
    title: "My Account",
    items: [
      { href: "/dashboard", label: "Overview", icon: <LayoutDashboard /> },
      { href: "/dashboard/applications", label: "My Applications", icon: <FileText /> },
      { href: "/dashboard/attempts", label: "My Attempts", icon: <CalendarClock /> },
      { href: "/dashboard/records", label: "My Records", icon: <Trophy /> },
      { href: "/dashboard/evidence", label: "Evidence", icon: <FileStack /> },
      { href: "/dashboard/certificates", label: "Certificates", icon: <Award /> },
    ],
  },
  {
    title: "Discover & Compete",
    items: [
      { href: "/break-a-record", label: "Break a Record", icon: <Swords /> },
      { href: "/create-a-record", label: "Create a Record", icon: <PlusCircle /> },
      { href: "/record-battles", label: "Record Battles", icon: <Flame /> },
      { href: "/leaderboards", label: "Leaderboards", icon: <Crown /> },
      { href: "/live-attempts", label: "Live Attempts", icon: <Radio /> },
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
