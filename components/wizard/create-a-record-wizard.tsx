"use client";

import { useMemo, useState } from "react";
import { Paperclip, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WizardStepper } from "@/components/wizard/wizard-stepper";
import { WizardSuccess } from "@/components/wizard/wizard-success";
import { records } from "@/lib/data/records";
import { categories } from "@/lib/data/categories";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { Application } from "@/lib/types";

const STEPS = ["Record Concept", "Category", "Measurement Method", "Evidence Requirements", "Safety", "Submission"];

function significantWords(s: string) {
  return s
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 3);
}

function useUniquenessPreview(title: string) {
  return useMemo(() => {
    if (title.trim().length < 6) return null;
    const words = new Set(significantWords(title));
    let best = { record: records[0], overlap: 0 };
    for (const r of records) {
      const rWords = significantWords(r.title);
      const overlap = rWords.filter((w) => words.has(w)).length;
      if (overlap > best.overlap) best = { record: r, overlap };
    }
    const similarity = Math.min(60, best.overlap * 22);
    const difference = 100 - similarity;
    return { difference, match: similarity > 30 ? best.record : null };
  }, [title]);
}

export function CreateARecordWizard() {
  const [step, setStep] = useState(0);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uniqueness, setUniqueness] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [measurementMethod, setMeasurementMethod] = useState("");
  const [expectedResult, setExpectedResult] = useState("");

  const [equipment, setEquipment] = useState("");
  const [witnessRequirements, setWitnessRequirements] = useState("");
  const [supportingMaterial, setSupportingMaterial] = useState("");

  const [safety, setSafety] = useState("");

  const addCreatedApplication = useDemoStore((s) => s.addCreatedApplication);
  const preview = useUniquenessPreview(title);

  function canProceed() {
    if (step === 0) return title.trim() && description.trim() && uniqueness.trim();
    if (step === 1) return Boolean(categoryId);
    if (step === 2) return measurementMethod.trim() && expectedResult.trim();
    if (step === 3) return equipment.trim() && witnessRequirements.trim();
    if (step === 4) return safety.trim();
    return true;
  }

  function submit() {
    const id = `APP-RBWR-2026-${String(Math.floor(10000 + Math.random() * 89999))}`;
    const newApplication: Application = {
      id,
      type: "create",
      proposedTitle: title,
      categoryId: categoryId || "cat-mass-formation",
      applicantUserId: "u7",
      status: "submitted",
      createdDate: new Date().toISOString().slice(0, 10),
      venueCity: "",
      venueCountry: "",
      proposedDate: "",
      expectedParticipants: 0,
      description: `${description}\n\nUniqueness: ${uniqueness}\n\nMeasurement: ${measurementMethod}. Expected result: ${expectedResult}\n\nEquipment: ${equipment}\nWitnesses: ${witnessRequirements}\nSafety: ${safety}`,
      timeline: [
        {
          stage: "Submitted",
          date: new Date().toISOString().slice(0, 10),
          actor: "Applicant",
          notes: `New record concept "${title}" submitted for RBWR review.`,
          documents: supportingMaterial ? [supportingMaterial] : undefined,
        },
      ],
    };
    addCreatedApplication(newApplication);
    setApplicationId(id);
    setStep(6);
  }

  if (step === 6 && applicationId) {
    return <WizardSuccess applicationId={applicationId} title={`Your new record concept "${title}" has been submitted for RBWR review.`} />;
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <WizardStepper steps={STEPS} currentStep={step} />

      <div className="mt-8">
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-xl font-semibold text-navy">Record Concept</h2>
            <Field label="Proposed Record Title">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Largest Simultaneous Kite-Flying Display" />
            </Field>
            {preview && (
              <div className="flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/5 p-4">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                <div>
                  <p className="text-sm font-semibold text-gold-deep">Record Uniqueness Preview</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-navy">{preview.difference}% Different</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {preview.match
                      ? `Closest existing record: "${preview.match.title}" (${preview.match.id})`
                      : "No direct match found in the current catalog."}
                  </p>
                </div>
              </div>
            )}
            <Field label="Description">
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Describe the record concept…" />
            </Field>
            <Field label="Why is it unique?">
              <Textarea value={uniqueness} onChange={(e) => setUniqueness(e.target.value)} rows={3} placeholder="What makes this record distinct from existing categories?" />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-navy">Category</h2>
            <div className="mt-4">
              <Field label="Record Category">
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select a category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.group}: {c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              {categoryId && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {categories.find((c) => c.id === categoryId)?.description}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-xl font-semibold text-navy">Measurement Method</h2>
            <Field label="Measurement Method">
              <Textarea value={measurementMethod} onChange={(e) => setMeasurementMethod(e.target.value)} rows={3} placeholder="How will the achievement be measured and verified?" />
            </Field>
            <Field label="Expected Result">
              <Input value={expectedResult} onChange={(e) => setExpectedResult(e.target.value)} placeholder="e.g. 5,000 kites simultaneously airborne" />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-xl font-semibold text-navy">Evidence Requirements</h2>
            <Field label="Equipment Required">
              <Textarea value={equipment} onChange={(e) => setEquipment(e.target.value)} rows={2} placeholder="Cameras, GPS trackers, measurement devices…" />
            </Field>
            <Field label="Witness Requirements">
              <Textarea value={witnessRequirements} onChange={(e) => setWitnessRequirements(e.target.value)} rows={2} placeholder="How many witnesses, and what qualifications?" />
            </Field>
            <Field label="Supporting Material">
              <Button type="button" variant="outline" className="w-fit gap-2" onClick={() => setSupportingMaterial("concept-deck.pdf")}>
                <Paperclip className="h-4 w-4" /> {supportingMaterial || "Attach File"}
              </Button>
            </Field>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-navy">Safety</h2>
            <div className="mt-4">
              <Field label="Safety Requirements">
                <Textarea value={safety} onChange={(e) => setSafety(e.target.value)} rows={4} placeholder="Describe risk mitigation, medical provisions, and safety officer plans…" />
              </Field>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-navy">Review & Submit</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl border border-border bg-secondary/40 p-5 sm:grid-cols-2">
              <Review label="Proposed Title" value={title} />
              <Review label="Category" value={categories.find((c) => c.id === categoryId)?.name} />
              <Review label="Measurement Method" value={measurementMethod} />
              <Review label="Expected Result" value={expectedResult} />
              <Review label="Equipment" value={equipment} />
              <Review label="Witnesses" value={witnessRequirements} />
              <div className="sm:col-span-2"><Review label="Safety" value={safety} /></div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </Button>
        {step < 5 ? (
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
