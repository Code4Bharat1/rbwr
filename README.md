# RBWR — Rotary Book of World Records

An interactive, high-fidelity Next.js prototype of a global record-verification
platform — built for stakeholder and investor presentations. Every screen uses
real, relationally-consistent mock data and genuine client-side interactivity
(wizards, status simulation, live timers, checklists, conflict-of-interest
checks) — there is no backend, no database, and no real authentication.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to explore it

- **Sign In** (`/sign-in`) is a dummy login — click any of the 8 role panels to
  instantly view the platform as that persona. Switch roles anytime from the
  **Demo Control Center** (floating button, bottom-right).
- **Explore Prototype** (header button) opens the full clickable journey map;
  **Platform Flow** (`/platform-flow`) shows it as one connected diagram.
- **Presentation Mode** (`/presentation`) is a 17-slide, full-bleed walkthrough
  for live demos — arrow keys to navigate, Esc to exit.
- Any application's **Switch Demo Status** control lets you preview every
  stage of its lifecycle on demand (Submitted → ... → Verified/Rejected/Appeal).

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Lucide icons ·
Framer Motion · Recharts · Zustand (persisted demo state).

## Structure

- `app/` — routes, grouped by portal: public site (`(public)`), participant
  (`dashboard`), adjudicator, club, district, reviewer, and admin.
- `components/` — shared UI, plus feature folders (records, applications,
  adjudication, certificates, charts, wizard, flow, layout).
- `lib/data/` — the mock data graph (users, records, applications, attempts,
  evidence, certificates, etc.), all cross-referenced by id.
- `lib/store/use-demo-store.ts` — the client-side demo state engine (current
  role, application status overrides, journey progress).
