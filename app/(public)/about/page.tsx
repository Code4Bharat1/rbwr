import { Globe2, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatCounter } from "@/components/shared/stat-counter";
import { PLATFORM_STATS } from "@/lib/stats";

const pillars = [
  { icon: ShieldCheck, title: "Rigorous Verification", body: "Every record passes through certified adjudicators, immutable evidence chains, and an independent verification board." },
  { icon: Globe2, title: "Truly Global", body: "Records are set, adjudicated, and celebrated across 84 countries, spanning Rotary clubs, districts, and independent applicants alike." },
  { icon: Sparkles, title: "Built for Recognition", body: "From certificates to public passports, every record holder receives a permanent, shareable record of their achievement." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About RBWR"
        title="A Global Home for Extraordinary Achievement"
        description="The Rotary Book of World Records exists to document, verify, and permanently celebrate extraordinary human achievement — individual and collective, Rotary and beyond."
        align="center"
      />

      <div className="mt-12 grid grid-cols-2 gap-6 rounded-3xl border border-border bg-card p-8 sm:grid-cols-4">
        <StatCounter value={PLATFORM_STATS.verifiedRecords} label="Verified Records" />
        <StatCounter value={PLATFORM_STATS.countries} label="Countries" />
        <StatCounter value={PLATFORM_STATS.certifiedAdjudicators} label="Certified Adjudicators" />
        <StatCounter value={PLATFORM_STATS.participants} label="Participants" />
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-royal/10 text-royal">
              <p.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-navy">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-border bg-card p-8">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-navy">
          <Trophy className="h-5 w-5 text-gold-deep" /> Our Origins
        </h2>
        <p className="mt-3 text-muted-foreground">
          RBWR was founded on the belief that extraordinary community achievement deserves the same rigor of
          documentation as any world record. Born from Rotary&apos;s century-long tradition of service, RBWR
          expanded its scope to welcome corporations, schools, and independent record-breakers worldwide —
          all held to the same certified verification standard.
        </p>
      </div>
    </div>
  );
}
