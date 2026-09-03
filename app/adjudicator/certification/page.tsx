import { Award, Globe2, Star, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { getAdjudicatorProfile } from "@/lib/data/adjudicators";
import { CURRENT_ADJUDICATOR_ID } from "@/lib/demo-config";
import { getUser } from "@/lib/data/users";

export default function CertificationPage() {
  const profile = getAdjudicatorProfile(CURRENT_ADJUDICATOR_ID)!;
  const user = getUser(CURRENT_ADJUDICATOR_ID)!;

  return (
    <div>
      <PageHeader title="Certification" description="Your RBWR adjudicator certification status and history." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-navy-gradient p-6 text-white lg:col-span-1">
          <Award className="h-8 w-8 text-gold-soft" />
          <p className="mt-4 text-sm text-white/60">Certification Level</p>
          <p className="font-display text-2xl font-semibold">{profile.certificationLevel}</p>
          <p className="mt-4 text-sm text-white/60">Adjudicator ID</p>
          <p className="font-mono text-sm">{user.id.toUpperCase()}</p>
          <p className="mt-4 text-sm text-white/60">Renewal Due</p>
          <p className="text-sm">31 December 2026</p>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="grid grid-cols-3 gap-4">
            <Stat icon={TrendingUp} label="Completed Attempts" value={profile.completedAttempts} />
            <Stat icon={Star} label="Rating" value={profile.rating.toFixed(1)} />
            <Stat icon={Globe2} label="Languages" value={profile.languages.length} />
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-sm font-semibold text-navy">Specialties</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.specialties.map((s) => (
                <span key={s} className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold-deep">{s}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-sm font-semibold text-navy">Training Modules Completed</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>✓ RBWR Core Adjudication Standards (v3)</li>
              <li>✓ Evidence Chain-of-Custody Procedures</li>
              <li>✓ Conflict of Interest & Ethics</li>
              <li>✓ Mass-Participation Measurement Techniques</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Star; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center">
      <Icon className="mx-auto h-5 w-5 text-royal" />
      <p className="mt-2 font-display text-xl font-semibold text-navy">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
