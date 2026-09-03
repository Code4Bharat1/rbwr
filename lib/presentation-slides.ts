export type Slide = {
  number: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

export const slides: Slide[] = [
  { number: "01", title: "The Vision", description: "RBWR is a global platform for documenting, verifying, and celebrating extraordinary achievements — from mass Rotary formations to corporate innovation feats.", href: "/", cta: "View Homepage" },
  { number: "02", title: "Public Experience", description: "A premium, editorial homepage built to feel authoritative and trustworthy — live stats, featured records, live attempts, and a clear path into the ecosystem.", href: "/", cta: "Explore Homepage" },
  { number: "03", title: "Explore Records", description: "A powerful discovery experience — search by title, holder, club, or country, with advanced filters across status and category.", href: "/records", cta: "Browse Records" },
  { number: "04", title: "Break a Record", description: "A guided, five-step wizard: select a record, provide applicant details, describe the attempt, review, and submit.", href: "/break-a-record", cta: "Start the Wizard" },
  { number: "05", title: "Application Journey", description: "Every application is tracked through a full nine-stage lifecycle, with a demo control to preview any stage instantly.", href: "/applications/app-01", cta: "Track an Application" },
  { number: "06", title: "Guidelines", description: "Once approved, RBWR issues official measurement, safety, and evidence guidelines — versioned, and requiring applicant acknowledgment.", href: "/guidelines/cat-mass-formation", cta: "View Guidelines" },
  { number: "07", title: "Scheduling", description: "Reviewers coordinate venue, date, and organizer details as part of the application review workflow.", href: "/reviewer/applications/app-05", cta: "See Scheduling" },
  { number: "08", title: "Adjudication", description: "A dedicated Mobile Adjudication Mode — live timer, evidence capture, participant count, measurement, witnesses, and a real-time checklist.", href: "/adjudicator/attempts/att-04", cta: "Enter Mobile Mode" },
  { number: "09", title: "Evidence Management", description: "An immutable evidence vault with a full audit timeline — photos, videos, documents, witness statements, and measurements.", href: "/adjudicator/evidence", cta: "Open Evidence Vault" },
  { number: "10", title: "Verification", description: "RBWR's verification board reviews the full decision pipeline — application, attempt, evidence, and adjudicator report — before a final ruling.", href: "/reviewer/verification/app-11", cta: "See Verification" },
  { number: "11", title: "Certificate", description: "A verified record triggers a celebratory reveal and generates an official, QR-verified RBWR certificate.", href: "/certificates/cert-01", cta: "View Certificate" },
  { number: "12", title: "Public Verification", description: "Anyone can scan a certificate's QR code to instantly confirm a record's authenticity on a public verification page.", href: "/verify/RBWR-IND-MH-MUM-2026-00427", cta: "Verify a Record" },
  { number: "13", title: "Record Passport", description: "A premium achievement profile — badges, records, attempts, and certificates, all in one shareable passport.", href: "/passport/u28", cta: "View a Passport" },
  { number: "14", title: "Leaderboards", description: "Global rankings across individuals, clubs, districts, cities, countries, and categories, with a podium visualization.", href: "/leaderboards", cta: "View Leaderboards" },
  { number: "15", title: "Rotary Ecosystem", description: "Dedicated portals for Clubs and Districts — records, members, community impact, and leaderboard position.", href: "/club", cta: "Enter Club Portal" },
  { number: "16", title: "Admin Command Center", description: "A powerful super-admin panel — users, roles, records, applications, audit logs, reports, and platform-wide analytics.", href: "/admin", cta: "Enter Admin Panel" },
  { number: "17", title: "Complete Platform Flow", description: "Every stage of the ecosystem, visualized as one connected, clickable diagram.", href: "/platform-flow", cta: "View Platform Flow" },
];
