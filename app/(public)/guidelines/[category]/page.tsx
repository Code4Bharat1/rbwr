"use client";

import { use, useState } from "react";
import { toast } from "sonner";
import { Download, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getGuidelineByCategory } from "@/lib/data/guidelines";
import { getCategory } from "@/lib/data/categories";
import { formatDate } from "@/lib/format";

const sectionLabels: Record<string, string> = {
  definition: "Record Definition",
  eligibility: "Eligibility",
  measurementMethod: "Measurement Method",
  equipment: "Required Equipment",
  timingRules: "Timing Rules",
  participantRules: "Participant Rules",
  countingMethod: "Counting Method",
  safety: "Safety Requirements",
  witnessRequirements: "Witness Requirements",
  photographyRequirements: "Photography Requirements",
  videoRequirements: "Video Requirements",
  adjudicatorRequirements: "Adjudicator Requirements",
};

export default function GuidelinesPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = use(params);
  const guideline = getGuidelineByCategory(categoryId);
  const category = getCategory(categoryId);
  const [acknowledged, setAcknowledged] = useState(false);

  if (!guideline || !category) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-semibold text-navy">Guidelines not found</h1>
        <p className="mt-2 text-muted-foreground">No published guidelines exist for this category yet.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-deep">
            {category.group} Category Guidelines
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-navy">{category.name}</h1>
          <p className="mt-2 text-muted-foreground">{category.description}</p>

          <Accordion type="single" collapsible defaultValue="definition" className="mt-8">
            {Object.entries(sectionLabels).map(([key, label]) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger className="font-display text-base">{label}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {guideline.sections[key as keyof typeof guideline.sections]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-royal">
              <ScrollText className="h-5 w-5" />
              <p className="font-display text-sm font-semibold">Official Guidelines</p>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Version {guideline.version}</p>
            <p className="text-sm text-muted-foreground">Issued {formatDate(guideline.issuedDate)}</p>
            <p className="text-sm text-muted-foreground">Issued by RBWR Records Office</p>
            <Button
              className="mt-4 w-full gap-2 bg-navy-gradient text-white hover:opacity-90"
              onClick={() => toast.success(`Downloading guidelines v${guideline.version}.pdf`)}
            >
              <Download className="h-4 w-4" /> Download Official Guidelines
            </Button>
          </div>

          <div className="rounded-2xl border border-dashed border-gold/40 bg-gold/5 p-5">
            <div className="flex items-start gap-2.5">
              <Checkbox id="ack" checked={acknowledged} onCheckedChange={(v) => setAcknowledged(Boolean(v))} />
              <Label htmlFor="ack" className="text-sm leading-snug text-foreground/80">
                I have read and understood the guidelines
              </Label>
            </div>
            {acknowledged && (
              <p className="mt-3 text-xs font-medium text-verified">
                Acknowledged. You may now proceed to schedule your attempt.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
