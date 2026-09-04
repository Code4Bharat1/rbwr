import Link from "next/link";
import { Award, Sparkles, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { UserAvatar } from "@/components/shared/user-avatar";
import { getUser } from "@/lib/data/users";
import { getClub } from "@/lib/data/geo";
import { getRecord } from "@/lib/data/records";

const awards2026 = [
  {
    title: "Record of the Year",
    winnerType: "record" as const,
    id: "RBWR-IND-MH-MUM-2026-00427",
    citation: "For the single largest verified mass-formation attempt in RBWR history.",
  },
  {
    title: "Adjudicator of the Year",
    winnerType: "user" as const,
    id: "u8",
    citation: "141 verified attempts and a perfect 5.0 rating across the Americas region.",
  },
  {
    title: "Club of the Year",
    winnerType: "club" as const,
    id: "club-mqn",
    citation: "For sustained record-setting achievement and community mobilization.",
  },
  {
    title: "Community Impact Award",
    winnerType: "record" as const,
    id: "RBWR-KEN-NBO-NBO-2023-00051",
    citation: "48,120 trees planted in a single coordinated day across greater Nairobi.",
  },
  {
    title: "Rising Star Adjudicator",
    winnerType: "user" as const,
    id: "u26",
    citation: "Fastest-growing certification record among newly certified adjudicators.",
  },
];

const pastWinners = [
  { year: 2025, title: "Record of the Year", winner: "Largest Gathering of Community Volunteers in 24 Hours, RC Manhattan" },
  { year: 2024, title: "Record of the Year", winner: "Largest Simultaneous Beach Clean-Up, RC Sydney Cove" },
  { year: 2023, title: "Record of the Year", winner: "Largest Tree-Planting Attempt in a Single Day, RC Nairobi Central" },
];

export default function AwardsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Annual Recognition"
        title="RBWR Awards 2026"
        description="Celebrating the record holders, clubs, and adjudicators who defined the year."
        align="center"
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {awards2026.map((award) => (
          <AwardCard key={award.title} award={award} />
        ))}
      </div>

      <div className="mt-16">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-navy">
          <Sparkles className="h-5 w-5 text-gold-deep" /> Past Winners
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Award</th>
                <th className="px-4 py-3">Winner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pastWinners.map((w, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 font-medium text-navy">{w.year}</td>
                  <td className="px-4 py-3 text-muted-foreground">{w.title}</td>
                  <td className="px-4 py-3">{w.winner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AwardCard({
  award,
}: {
  award: { title: string; winnerType: "record" | "user" | "club"; id: string; citation: string };
}) {
  let name = "";
  let href = "#";
  let avatar: React.ReactNode = (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
      <Trophy className="h-6 w-6" />
    </span>
  );

  if (award.winnerType === "record") {
    const record = getRecord(award.id);
    name = record?.title ?? "—";
    href = `/records/${award.id}`;
  } else if (award.winnerType === "user") {
    const user = getUser(award.id);
    name = user?.name ?? "—";
    href = `/passport/${award.id}`;
    if (user) avatar = <UserAvatar initials={user.initials} color={user.avatarColor} size="lg" />;
  } else if (award.winnerType === "club") {
    const club = getClub(award.id);
    name = club?.name ?? "—";
    href = "/club";
  }

  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-3 rounded-2xl border border-gold/30 bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-deep">
        <Award className="h-3.5 w-3.5" /> {award.title}
      </span>
      {avatar}
      <p className="font-display text-lg font-semibold text-navy">{name}</p>
      <p className="text-sm text-muted-foreground">{award.citation}</p>
    </Link>
  );
}
