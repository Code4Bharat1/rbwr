import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, CalendarClock, FileCheck, Trophy } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { VerificationBadge } from "@/components/shared/verification-badge";
import { RecordCard } from "@/components/records/record-card";
import { getUser } from "@/lib/data/users";
import { getCountry, getCity, getClub } from "@/lib/data/geo";
import { getCategory } from "@/lib/data/categories";
import {
  getRecordsForUser,
  getCertificatesForUser,
  getAttemptsForApplicant,
  getAttemptTitle,
} from "@/lib/selectors";
import { formatDate } from "@/lib/format";

export default async function PassportPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const user = getUser(userId);
  if (!user) notFound();

  const country = getCountry(user.countryId);
  const city = getCity(user.cityId);
  const club = user.clubId ? getClub(user.clubId) : undefined;
  const records = getRecordsForUser(userId);
  const certificates = getCertificatesForUser(userId);
  const attempts = getAttemptsForApplicant(userId);

  const badges = new Set(user.badges);
  if (records.length > 0) badges.add("Record Holder");
  if (records.some((r) => getCategory(r.categoryId)?.group === "World")) badges.add("World Record Holder");
  if (records.some((r) => getCategory(r.categoryId)?.group === "Rotary")) badges.add("Rotary Record Holder");

  return (
    <div>
      <section className="bg-navy-gradient px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
          <UserAvatar initials={user.initials} color={user.avatarColor} size="xl" />
          <h1 className="font-display text-3xl font-semibold text-white">{user.name}</h1>
          <p className="text-white/70">
            {city?.name}, {country?.name} {country?.flag}
            {club && ` · ${club.name}`}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[...badges].map((b) => (
              <span key={b} className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-soft">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-navy">
            <Trophy className="h-5 w-5 text-gold-deep" /> Records
          </h2>
          {records.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {records.map((r) => <RecordCard key={r.id} record={r} />)}
            </div>
          ) : (
            <EmptySection text="No records held yet." />
          )}
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-navy">
            <CalendarClock className="h-5 w-5 text-gold-deep" /> Attempts
          </h2>
          {attempts.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {attempts.map((a) => (
                <div key={a.id} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-medium text-navy">{getAttemptTitle(a)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{formatDate(a.date)} · {a.venue}</p>
                  <span className="mt-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs capitalize text-secondary-foreground">
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptySection text="No attempts on file." />
          )}
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-navy">
            <FileCheck className="h-5 w-5 text-gold-deep" /> Certificates
          </h2>
          {certificates.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {certificates.map((c) => (
                <Link
                  key={c.id}
                  href={`/certificates/${c.id}`}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-4 hover:border-royal/40"
                >
                  <div>
                    <p className="font-medium text-navy">{c.certificateNumber}</p>
                    <p className="text-sm text-muted-foreground">Issued {formatDate(c.issuedDate)}</p>
                  </div>
                  <VerificationBadge status="current" />
                </Link>
              ))}
            </div>
          ) : (
            <EmptySection text="No certificates issued yet." />
          )}
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-navy">
            <Award className="h-5 w-5 text-gold-deep" /> Achievements
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[...badges].map((b) => (
              <div key={b} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                  <Award className="h-5 w-5" />
                </span>
                <p className="text-xs font-medium text-navy">{b}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function EmptySection({ text }: { text: string }) {
  return <p className="mt-4 rounded-xl border border-dashed border-border p-6 text-center text-muted-foreground">{text}</p>;
}
