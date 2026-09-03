import {
  Award,
  BadgeCheck,
  Bell,
  Building2,
  ClipboardList,
  CreditCard,
  FileStack,
  FileText,
  Flag,
  Globe2,
  LayoutDashboard,
  MapPin,
  Newspaper,
  ScrollText,
  ShieldAlert,
  Tags,
  Trophy,
  UserCog,
  Users,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const navSections = [
  { items: [{ href: "/admin", label: "Overview", icon: <LayoutDashboard /> }] },
  {
    title: "Records",
    items: [
      { href: "/admin/records", label: "Records", icon: <Trophy /> },
      { href: "/admin/applications", label: "Applications", icon: <FileText /> },
      { href: "/admin/categories", label: "Categories", icon: <Tags /> },
      { href: "/admin/guidelines", label: "Guidelines", icon: <ScrollText /> },
      { href: "/admin/attempts", label: "Attempts", icon: <ClipboardList /> },
      { href: "/admin/adjudicators", label: "Adjudicators", icon: <BadgeCheck /> },
      { href: "/admin/evidence", label: "Evidence Vault", icon: <FileStack /> },
      { href: "/admin/certificates", label: "Certificates", icon: <Award /> },
    ],
  },
  {
    title: "Directory",
    items: [
      { href: "/admin/users", label: "Users", icon: <Users /> },
      { href: "/admin/roles", label: "Roles", icon: <UserCog /> },
      { href: "/admin/clubs", label: "Clubs", icon: <Building2 /> },
      { href: "/admin/districts", label: "Districts", icon: <Flag /> },
      { href: "/admin/cities", label: "Cities", icon: <MapPin /> },
      { href: "/admin/countries", label: "Countries", icon: <Globe2 /> },
    ],
  },
  {
    title: "Growth",
    items: [
      { href: "/admin/leaderboards", label: "Leaderboards", icon: <Trophy /> },
      { href: "/admin/payments", label: "Payments", icon: <CreditCard /> },
      { href: "/admin/content", label: "Content", icon: <Newspaper /> },
      { href: "/admin/reports", label: "Reports", icon: <FileStack /> },
    ],
  },
  {
    items: [
      { href: "/admin/notifications", label: "Notifications", icon: <Bell /> },
      { href: "/admin/audit", label: "Audit Logs", icon: <ShieldAlert /> },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell portalLabel="Super Admin" navSections={navSections}>
      {children}
    </DashboardShell>
  );
}
