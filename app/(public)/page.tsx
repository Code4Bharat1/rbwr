import Link from "next/link";
import { ArrowRight, ClipboardCheck, PlusCircle, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatCounter } from "@/components/shared/stat-counter";
import { RecordCard } from "@/components/records/record-card";
import { AttemptCard } from "@/components/attempts/attempt-card";
import { HeroSearch } from "@/components/home/hero-search";
import { HowItWorks } from "@/components/home/how-it-works";
import { ExploreByType } from "@/components/home/explore-by-type";
import { LeaderboardPreview } from "@/components/home/leaderboard-preview";
import { PLATFORM_STATS } from "@/lib/stats";
import { getFeaturedRecords, getLiveAttempts, getUpcomingAttempts } from "@/lib/selectors";

export default function HomePage() {
  const featured = getFeaturedRecords();
  const live = getLiveAttempts();
  const upcoming = getUpcomingAttempts().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-gradient px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-soft">
            The Global Record Verification Ecosystem
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Where Extraordinary Achievements Become Permanent Records.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
            Search, verify, and celebrate world records, from mass Rotary formations to corporate
            innovation feats, adjudicated by a certified global network.
          </p>
          <div className="mt-8 flex justify-center">
            <HeroSearch />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gap-2 bg-gold-gradient text-navy-deep hover:opacity-90">
              <Link href="/break-a-record">
                <Swords className="h-4 w-4" /> Break a Record
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-white/30 bg-white/5 text-white hover:bg-white/15"
            >
              <Link href="/create-a-record">
                <PlusCircle className="h-4 w-4" /> Create a Record
              </Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 rounded-3xl bg-white/95 p-8 shadow-2xl sm:grid-cols-4">
          <StatCounter value={PLATFORM_STATS.verifiedRecords} label="Verified Records" />
          <StatCounter value={PLATFORM_STATS.countries} label="Countries" />
          <StatCounter value={PLATFORM_STATS.certifiedAdjudicators} label="Certified Adjudicators" />
          <StatCounter value={PLATFORM_STATS.participants} label="Participants" />
        </div>
      </section>

      {/* Featured Records */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured"
            title="Records Making Headlines"
            description="A sample of verified achievements from across the RBWR catalog."
          />
          <Button asChild variant="ghost" className="gap-1 text-royal">
            <Link href="/records">
              View all records <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <RecordCard key={r.id} record={r} />
          ))}
        </div>
      </section>

      {/* Live & Upcoming Attempts */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Live & Upcoming Attempts"
            description="Follow record attempts as they're adjudicated in real time, or see what's scheduled next."
          />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((a) => (
              <AttemptCard key={a.id} attempt={a} />
            ))}
            {upcoming.map((a) => (
              <AttemptCard key={a.id} attempt={a} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/live-attempts">View all live attempts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Explore by Record Type */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Explore by Record Type"
          description="Every record on RBWR belongs to one of ten record families."
        />
        <div className="mt-8">
          <ExploreByType />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Process"
            title="How It Works"
            description="From concept to certificate: six stages, fully verified. Click any step for details."
            align="center"
          />
          <div className="mt-10">
            <HowItWorks />
          </div>
        </div>
      </section>

      {/* Leaderboard preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title="Global Leaderboard" align="center" />
        <div className="mt-8">
          <LeaderboardPreview />
        </div>
      </section>

      {/* Become an Adjudicator CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-navy-gradient px-6 py-14 text-center sm:px-16">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-soft">
            <ClipboardCheck className="h-6 w-6" />
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-white">
            Become a Certified RBWR Adjudicator
          </h2>
          <p className="max-w-xl text-white/70">
            Join a global network of 1,250+ certified adjudicators who bring integrity and rigor to
            every record attempt.
          </p>
          <Button asChild size="lg" className="bg-gold-gradient text-navy-deep hover:opacity-90">
            <Link href="/adjudicators">Explore Adjudication</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
