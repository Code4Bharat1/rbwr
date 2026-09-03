"use client";

import { useState } from "react";
import {
  ClipboardList,
  FileCheck2,
  FileSignature,
  ScrollText,
  Trophy,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: ClipboardList,
    title: "Choose Record",
    detail:
      "Search the catalog to challenge an existing record, or propose a brand-new one through the Create a Record wizard.",
  },
  {
    icon: FileSignature,
    title: "Apply",
    detail:
      "Submit applicant details, proposed attempt information, and supporting documents through a guided application form.",
  },
  {
    icon: ScrollText,
    title: "Receive Guidelines",
    detail:
      "Once approved, RBWR issues official measurement, safety, evidence, and adjudicator guidelines for your category.",
  },
  {
    icon: Zap,
    title: "Attempt",
    detail:
      "A certified adjudicator oversees your scheduled attempt, capturing live evidence in Mobile Adjudication Mode.",
  },
  {
    icon: FileCheck2,
    title: "Verification",
    detail:
      "RBWR's verification board reviews the adjudicator's report and full evidence package against the guidelines.",
  },
  {
    icon: Trophy,
    title: "Become a Record Holder",
    detail:
      "A verified attempt generates an official certificate, a public record page, and an entry on the global leaderboard.",
  },
];

export function HowItWorks() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {steps.map((step, i) => (
        <button
          key={step.title}
          onClick={() => setOpen(i)}
          className={cn(
            "group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-royal/40 hover:shadow-md"
          )}
        >
          <span className="font-display text-xs font-semibold text-gold-deep">
            0{i + 1}
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-royal/10 text-royal group-hover:bg-royal group-hover:text-white">
            <step.icon className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium text-navy">{step.title}</span>
        </button>
      ))}

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent>
          {open !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-display">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-royal/10 text-royal">
                    {(() => {
                      const Icon = steps[open].icon;
                      return <Icon className="h-4 w-4" />;
                    })()}
                  </span>
                  Step 0{open + 1}: {steps[open].title}
                </DialogTitle>
                <DialogDescription className="pt-2 text-base text-foreground/80">
                  {steps[open].detail}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
