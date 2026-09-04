import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Award,
  Calendar,
  MapPin,
  QrCode,
  ShieldCheck,
  Swords,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecordImage } from "@/components/shared/record-image";
import { VerificationBadge } from "@/components/shared/verification-badge";
import { SocialShare } from "@/components/shared/social-share";
import { Timeline, TimelineStep } from "@/components/shared/timeline";
import { records } from "@/lib/data/records";
import { getCategory } from "@/lib/data/categories";
import { getCity, getCountry } from "@/lib/data/geo";
import { getUser } from "@/lib/data/users";
import { getApplication } from "@/lib/data/applications";
import { getAttempt } from "@/lib/data/attempts";
import { getEvidenceForAttempt } from "@/lib/data/evidence";
import { getWitnessesForAttempt } from "@/lib/data/witnesses";
import { getCertificateForRecord } from "@/lib/data/certificates";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return records.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const record = records.find((r) => r.id === id);
  if (!record) return { title: "Record Not Found | RBWR" };

  const description = `${record.holderName}, ${record.achievementValue} ${record.achievementUnit}. Verified ${record.status === "current" ? "current" : record.status} RBWR world record, ${record.id}.`;
  return {
    title: `${record.title} | RBWR`,
    description,
    openGraph: {
      title: record.title,
      description,
      images: record.images[0] ? [record.images[0]] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: record.title,
      description,
    },
  };
}

export default async function RecordDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = records.find((r) => r.id === id);
  if (!record) notFound();

  const category = getCategory(record.categoryId);
  const country = getCountry(record.countryId);
  const city = getCity(record.cityId);
  const adjudicator = getUser(record.adjudicatorId);
  const holder = record.holderUserId ? getUser(record.holderUserId) : undefined;
  const application = record.applicationId ? getApplication(record.applicationId) : undefined;
  const attempt = application?.attemptId ? getAttempt(application.attemptId) : undefined;
  const evidenceItems = attempt ? getEvidenceForAttempt(attempt.id) : [];
  const witnessItems = attempt ? getWitnessesForAttempt(attempt.id) : [];
  const certificate = getCertificateForRecord(record.id);

  const historySteps: TimelineStep[] = record.history.map((h) => ({
    label: `${h.holderName}`,
    date: String(h.year),
    notes: h.achievement,
    state: h.status === "current" ? "current" : "done",
  }));

  const photos = evidenceItems.filter((e) => e.type === "photo");
  const videos = evidenceItems.filter((e) => e.type === "video");
  const documents = evidenceItems.filter((e) => e.type === "document" || e.type === "participant-list");
  const measurements = evidenceItems.filter((e) => e.type === "measurement");

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-gradient px-4 pb-14 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-soft">
            {category?.group ?? "World"} Record
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            {record.title}
          </h1>
          <p className="mt-3 font-mono text-sm tracking-wide text-white/60">Record ID: {record.id}</p>
          <div className="mt-5">
            <VerificationBadge status={record.status} />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 text-white sm:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/50">Holder</p>
              <p className="mt-1 font-medium">{record.holderName}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/50">Country</p>
              <p className="mt-1 font-medium">
                {country?.name}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/50">Date</p>
              <p className="mt-1 font-medium">{formatDate(record.date)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/50">Adjudicator</p>
              <p className="mt-1 font-medium">{adjudicator?.name}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Achievement */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <RecordImage
              src={record.images[0]}
              alt={record.title}
              className="aspect-[16/10] w-full rounded-2xl"
              priority
            />
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-deep">Achievement</p>
            <p className="font-display text-4xl font-semibold text-navy">{record.achievementValue}</p>
            <p className="text-sm font-medium text-muted-foreground">{record.achievementUnit}</p>
            <p className="border-t border-border pt-4 text-sm text-foreground/80">{record.description}</p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {city?.name}, {country?.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatDate(record.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4" /> {category?.name}
              </span>
            </div>
          </div>
        </section>

        {/* Evidence Gallery */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-navy">Evidence Gallery</h2>
          <Tabs defaultValue="photos" className="mt-4">
            <TabsList className="flex-wrap">
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="witnesses">Witness Statements</TabsTrigger>
              <TabsTrigger value="measurements">Measurements</TabsTrigger>
            </TabsList>
            <TabsContent value="photos" className="mt-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {record.images.map((src, i) => (
                  <RecordImage key={i} src={src} alt={`${record.title} photo ${i + 1}`} className="aspect-square rounded-xl" />
                ))}
                {photos.map((p) => (
                  <div key={p.id} className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary/40 p-3 text-center text-xs text-muted-foreground">
                    {p.fileName}
                    <span>Uploaded by {getUser(p.uploadedByUserId)?.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="videos" className="mt-4">
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {videos.map((v) => (
                    <div key={v.id} className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-4 text-sm">
                      <span>{v.fileName}</span>
                      <span className="text-xs text-muted-foreground">{v.verificationStatus}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyEvidenceNote />
              )}
            </TabsContent>
            <TabsContent value="documents" className="mt-4">
              {documents.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {documents.map((d) => (
                    <div key={d.id} className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-4 text-sm">
                      <span>{d.fileName}</span>
                      <span className="text-xs text-muted-foreground">{d.verificationStatus}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyEvidenceNote />
              )}
            </TabsContent>
            <TabsContent value="witnesses" className="mt-4">
              {witnessItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {witnessItems.map((w) => (
                    <div key={w.id} className="rounded-xl border border-border bg-secondary/40 p-4 text-sm">
                      <p className="font-medium">{w.name}</p>
                      <p className="text-xs text-muted-foreground">{w.role}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {w.signed ? "Statement signed" : "Signature pending"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyEvidenceNote />
              )}
            </TabsContent>
            <TabsContent value="measurements" className="mt-4">
              {attempt?.measurement || measurements.length > 0 ? (
                <div className="rounded-xl border border-border bg-secondary/40 p-5 text-sm">
                  {attempt?.measurement && (
                    <p>
                      <span className="font-medium">{attempt.measurement.value}</span>{" "}
                      {attempt.measurement.unit} · {attempt.measurement.method}
                    </p>
                  )}
                </div>
              ) : (
                <EmptyEvidenceNote />
              )}
            </TabsContent>
          </Tabs>
        </section>

        {/* Record History */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-navy">Record History</h2>
          <div className="mt-6 max-w-2xl">
            <Timeline steps={historySteps} />
          </div>
        </section>

        {/* Actions */}
        <section className="mt-14 flex flex-wrap gap-3 border-t border-border pt-8">
          <Button asChild className="gap-2 bg-navy-gradient text-white hover:opacity-90">
            <Link href={`/break-a-record?record=${record.id}`}>
              <Swords className="h-4 w-4" /> Challenge This Record
            </Link>
          </Button>
          <SocialShare title={record.title} />
          {certificate && (
            <Button asChild variant="outline" className="gap-2">
              <Link href={`/certificates/${certificate.id}`}>
                <Trophy className="h-4 w-4" /> Download Certificate
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" className="gap-2">
            <Link href={`/verify/${record.id}`}>
              <QrCode className="h-4 w-4" /> Verify QR
            </Link>
          </Button>
          {holder && (
            <Button asChild variant="ghost" className="gap-2">
              <Link href={`/passport/${holder.id}`}>
                <ShieldCheck className="h-4 w-4" /> View Holder Passport
              </Link>
            </Button>
          )}
        </section>
      </div>
    </div>
  );
}

function EmptyEvidenceNote() {
  return (
    <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
      No additional evidence on file for this category of this record.
    </div>
  );
}
