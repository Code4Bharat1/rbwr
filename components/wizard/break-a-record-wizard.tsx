"use client";

import { useMemo, useState } from "react";
import { Search, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WizardStepper } from "@/components/wizard/wizard-stepper";
import { WizardSuccess } from "@/components/wizard/wizard-success";
import { RecordImage } from "@/components/shared/record-image";
import { records } from "@/lib/data/records";
import { countries, clubs } from "@/lib/data/geo";
import { categories } from "@/lib/data/categories";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { Application } from "@/lib/types";
import { cn } from "@/lib/utils";

const STEPS = ["Select Record", "Applicant Info", "Attempt Details", "Review", "Submit"];

export function BreakARecordWizard({ initialRecordId }: { initialRecordId?: string }) {
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(initialRecordId ?? "");
  const [applicantId, setApplicantId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [isRotarian, setIsRotarian] = useState(false);
  const [club, setClub] = useState("");
  const [district, setDistrict] = useState("");

  const [proposedDate, setProposedDate] = useState("");
  const [venue, setVenue] = useState("");
  const [expectedResult, setExpectedResult] = useState("");
  const [participantCount, setParticipantCount] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState("");

  const addCreatedApplication = useDemoStore((s) => s.addCreatedApplication);

  const challengeable = useMemo(() => records.filter((r) => r.status === "current"), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return challengeable;
    return challengeable.filter(
      (r) => r.title.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.holderName.toLowerCase().includes(q)
    );
  }, [query, challengeable]);

  const selectedRecord = records.find((r) => r.id === selectedId);

  function canProceed() {
    if (step === 0) return Boolean(selectedRecord);
    if (step === 1) return name.trim() && email.trim() && country && city.trim();
    if (step === 2) return proposedDate && venue.trim() && expectedResult.trim() && participantCount;
    return true;
  }

  function submit() {
    const id = `APP-RBWR-2026-${String(Math.floor(10000 + Math.random() * 89999))}`;
    const category = categories.find((c) => c.id === selectedRecord?.categoryId);
    const newApplication: Application = {
      id,
      type: "break",
      recordId: selectedRecord?.id,
      categoryId: selectedRecord?.categoryId ?? category?.id ?? "cat-mass-formation",
      applicantUserId: "u2",
      status: "submitted",
      createdDate: new Date().toISOString().slice(0, 10),
      venueCity: city,
      venueCountry: countries.find((c) => c.id === country)?.name ?? country,
      proposedDate,
      expectedParticipants: Number(participantCount) || 0,
      description,
      timeline: [
        {
          stage: "Submitted",
          date: new Date().toISOString().slice(0, 10),
          actor: name || "Applicant",
          notes: `Application to break "${selectedRecord?.title}" submitted for RBWR review.`,
          documents: attachment ? [attachment] : undefined,
        },
      ],
    };
    addCreatedApplication(newApplication);
    setApplicantId(id);
    setStep(4);
  }

  if (step === 4 && applicantId) {
    return <WizardSuccess applicationId={applicantId} title={`Your application to break "${selectedRecord?.title}" has been submitted for RBWR review.`} />;
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <WizardStepper steps={STEPS} currentStep={step} />

      <div className="mt-8">
        {step === 0 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-navy">Select the record you want to break</h2>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search current records…" className="pl-9" />
            </div>
            <div className="mt-4 grid max-h-[420px] grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2">
              {filtered.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                    selectedId === r.id ? "border-royal bg-royal/5" : "border-border hover:bg-secondary/50"
                  )}
                >
                  <RecordImage src={r.images[0]} alt={r.title} className="h-14 w-14 shrink-0 rounded-lg" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-navy">{r.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.holderName}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-navy">Applicant Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name"><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" /></Field>
              <Field label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" /></Field>
              <Field label="Phone"><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 000 1234" /></Field>
              <Field label="Country">
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="City"><Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Your city" /></Field>
              <div className="flex items-center gap-2 pt-6">
                <Checkbox checked={isRotarian} onCheckedChange={(v) => setIsRotarian(Boolean(v))} id="rotarian" />
                <Label htmlFor="rotarian">I am a Rotary member</Label>
              </div>
              {isRotarian && (
                <>
                  <Field label="Club">
                    <Select value={club} onValueChange={setClub}>
                      <SelectTrigger className="w-full"><SelectValue placeholder="Select club" /></SelectTrigger>
                      <SelectContent>
                        {clubs.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="District"><Input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="e.g. 3141" /></Field>
                </>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-navy">Attempt Details</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Proposed Date"><Input type="date" value={proposedDate} onChange={(e) => setProposedDate(e.target.value)} /></Field>
              <Field label="Venue"><Input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Venue name" /></Field>
              <Field label="Expected Result"><Input value={expectedResult} onChange={(e) => setExpectedResult(e.target.value)} placeholder={`Beat ${selectedRecord?.achievementValue ?? ""} ${selectedRecord?.achievementUnit ?? ""}`} /></Field>
              <Field label="Participant Count"><Input type="number" value={participantCount} onChange={(e) => setParticipantCount(e.target.value)} placeholder="0" /></Field>
              <div className="sm:col-span-2">
                <Field label="Description">
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your planned attempt…" rows={4} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Supporting Documents">
                  <Button type="button" variant="outline" className="gap-2" onClick={() => setAttachment("attempt-plan.pdf")}>
                    <Paperclip className="h-4 w-4" /> {attachment || "Attach File"}
                  </Button>
                </Field>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-navy">Review Your Application</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl border border-border bg-secondary/40 p-5 sm:grid-cols-2">
              <Review label="Record to Break" value={selectedRecord?.title} />
              <Review label="Applicant" value={`${name} (${email})`} />
              <Review label="Country / City" value={`${countries.find((c) => c.id === country)?.name ?? ""}, ${city}`} />
              <Review label="Rotary Member" value={isRotarian ? "Yes" : "No"} />
              <Review label="Proposed Date" value={proposedDate} />
              <Review label="Venue" value={venue} />
              <Review label="Expected Result" value={expectedResult} />
              <Review label="Participant Count" value={participantCount} />
              <div className="sm:col-span-2"><Review label="Description" value={description || "—"} /></div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </Button>
        {step < 3 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()} className="bg-navy-gradient text-white hover:opacity-90">
            Continue
          </Button>
        ) : (
          <Button onClick={submit} className="bg-gold-gradient text-navy-deep hover:opacity-90">
            Submit Application
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Review({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-navy">{value || "—"}</p>
    </div>
  );
}
