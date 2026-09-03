import Link from "next/link";
import { Trophy } from "lucide-react";

const columns = [
  {
    title: "Discover",
    links: [
      { href: "/records", label: "Explore Records" },
      { href: "/record-battles", label: "Record Battles" },
      { href: "/leaderboards", label: "Leaderboards" },
      { href: "/live-attempts", label: "Live Attempts" },
      { href: "/record-wall", label: "Record Wall" },
    ],
  },
  {
    title: "Participate",
    links: [
      { href: "/break-a-record", label: "Break a Record" },
      { href: "/create-a-record", label: "Create a Record" },
      { href: "/adjudicators", label: "Become an Adjudicator" },
      { href: "/sign-in", label: "Sign In" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { href: "/platform-flow", label: "Platform Flow" },
      { href: "/presentation", label: "Presentation Mode" },
      { href: "/about", label: "About RBWR" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-gradient text-navy-deep">
                <Trophy className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-semibold text-white">RBWR</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              Where extraordinary achievements become permanent records. A global platform for
              verifying, celebrating, and preserving world records.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/60 hover:text-gold-soft">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© 2026 Rotary Book of World Records. Interactive prototype for presentation purposes.</p>
          <p>Built as a clickable demo — no data leaves your browser.</p>
        </div>
      </div>
    </footer>
  );
}
