import {
  AlertTriangle,
  FileSearch,
  Inbox,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const navSections = [
  {
    items: [
      { href: "/reviewer", label: "Application Queue", icon: <Inbox /> },
      { href: "/reviewer/guidelines", label: "Guidelines", icon: <ScrollText /> },
      { href: "/reviewer/evidence", label: "Evidence Review", icon: <FileSearch /> },
      { href: "/reviewer/verification", label: "Verification", icon: <ShieldCheck /> },
      { href: "/reviewer/appeals", label: "Appeals", icon: <AlertTriangle /> },
    ],
  },
];

export default function ReviewerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell portalLabel="RBWR Reviewer Portal" navSections={navSections}>
      {children}
    </DashboardShell>
  );
}
