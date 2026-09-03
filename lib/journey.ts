export type JourneyNode = {
  id: string;
  step: number;
  title: string;
  description: string;
  href: string;
};

export const journeyNodes: JourneyNode[] = [
  { id: "discovery", step: 1, title: "Public Discovery", description: "Visitors land on the homepage and browse featured records.", href: "/" },
  { id: "explore", step: 2, title: "Explore Record", description: "Search and filter the global record catalog.", href: "/records" },
  { id: "attempt-type", step: 3, title: "Break / Create Record", description: "Start a guided wizard to challenge or propose a record.", href: "/break-a-record" },
  { id: "application", step: 4, title: "Application", description: "Track a submitted application through its full lifecycle.", href: "/applications/app-01" },
  { id: "review", step: 5, title: "RBWR Review", description: "A reviewer triages and approves the incoming application.", href: "/reviewer" },
  { id: "guidelines", step: 6, title: "Guidelines", description: "Official measurement, safety, and evidence guidelines are issued.", href: "/guidelines/cat-mass-formation" },
  { id: "schedule", step: 7, title: "Schedule Attempt", description: "The attempt is scheduled with venue, date, and organizer details.", href: "/reviewer/applications/app-05" },
  { id: "assign", step: 8, title: "Assign Adjudicator", description: "An adjudicator is assigned, with conflict-of-interest checks.", href: "/reviewer/applications/app-08" },
  { id: "live", step: 9, title: "Live Attempt", description: "The adjudicator runs the attempt in Mobile Adjudication Mode.", href: "/adjudicator/attempts/att-04" },
  { id: "evidence", step: 10, title: "Evidence Collection", description: "Photos, video, measurements, and witness statements are captured.", href: "/adjudicator/evidence" },
  { id: "report", step: 11, title: "Adjudication Report", description: "The adjudicator files a final checklist and recommendation.", href: "/adjudicator/attempts/att-01" },
  { id: "verification", step: 12, title: "Verification", description: "RBWR's verification board reviews the full evidence package.", href: "/reviewer/verification/app-11" },
  { id: "certificate", step: 13, title: "Certificate", description: "A verified record generates an official RBWR certificate.", href: "/certificates/cert-01" },
  { id: "public-record", step: 14, title: "Public Record Page", description: "The record goes live on its permanent public page.", href: "/records/RBWR-IND-MH-MUM-2026-00427" },
  { id: "leaderboard", step: 15, title: "Leaderboard / History", description: "Rankings and record history update across the platform.", href: "/leaderboards" },
];
