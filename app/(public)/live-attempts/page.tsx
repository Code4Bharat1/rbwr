import { SectionHeading } from "@/components/shared/section-heading";
import { AttemptCard } from "@/components/attempts/attempt-card";
import { getCompletedAttempts, getLiveAttempts, getUpcomingAttempts } from "@/lib/selectors";

export default function LiveAttemptsPage() {
  const live = getLiveAttempts();
  const upcoming = getUpcomingAttempts();
  const completed = getCompletedAttempts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Happening Now"
        title="Live & Upcoming Attempts"
        description="Follow record attempts as they're adjudicated in real time, or see what's scheduled next."
      />

      {live.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-navy">Live Now</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((a) => <AttemptCard key={a.id} attempt={a} />)}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-display text-lg font-semibold text-navy">Upcoming</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((a) => <AttemptCard key={a.id} attempt={a} />)}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-lg font-semibold text-navy">Recently Completed</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {completed.slice(0, 6).map((a) => <AttemptCard key={a.id} attempt={a} />)}
        </div>
      </section>
    </div>
  );
}
