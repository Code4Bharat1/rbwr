"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
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
import { countries, clubs, districts } from "@/lib/data/geo";

const pipeline = [
  { label: "Application", icon: ClipboardCheck },
  { label: "Training", icon: GraduationCap },
  { label: "Assessment", icon: BadgeCheck },
  { label: "Approval", icon: ShieldCheck },
  { label: "Certification", icon: CheckCircle2 },
];

export default function AdjudicatorApplicationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [isRotarian, setIsRotarian] = useState(true);
  const [declared, setDeclared] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setApplicationId(`RBWR-ADJ-2026-${String(Math.floor(1000 + Math.random() * 8999))}`);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-verified/10 text-verified">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-2xl font-semibold text-navy">Application Received</h1>
        <p className="mt-2 text-muted-foreground">
          Your adjudicator application has entered the certification pipeline.
        </p>
        <p className="mt-4 font-mono text-lg font-semibold text-navy">{applicationId}</p>

        <div className="mt-10 flex items-center justify-center">
          {pipeline.map((stage, i) => (
            <div key={stage.label} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    i === 0 ? "bg-royal text-white" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <stage.icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium text-navy">{stage.label}</span>
              </div>
              {i < pipeline.length - 1 && <span className="mx-2 mb-6 h-0.5 w-8 bg-border sm:w-14" />}
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          RBWR will contact you to schedule training. You can track this application the same way you track a
          record application.
        </p>
        <Button asChild className="mt-6 bg-navy-gradient text-white hover:opacity-90">
          <Link href="/adjudicators">Back to Adjudicators</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Become a Certified Adjudicator"
        title="Adjudicator Application"
        description="Rotary members and qualified non-Rotarian professionals may apply. Every applicant passes through training, assessment, and approval before certification."
      />

      <form onSubmit={submit} className="mt-8 flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name"><Input required placeholder="Your full name" /></Field>
          <Field label="Email"><Input required type="email" placeholder="you@example.com" /></Field>
          <Field label="Phone"><Input required placeholder="+1 555 000 1234" /></Field>
          <Field label="Country">
            <Select required defaultValue="">
              <SelectTrigger className="w-full"><SelectValue placeholder="Select country" /></SelectTrigger>
              <SelectContent>
                {countries.map((c) => <SelectItem key={c.id} value={c.id}>{c.flag} {c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="City"><Input required placeholder="Your city" /></Field>
          <div className="flex items-center gap-2 pt-6">
            <Checkbox checked={isRotarian} onCheckedChange={(v) => setIsRotarian(Boolean(v))} id="is-rotarian" />
            <Label htmlFor="is-rotarian">I am a Rotary member</Label>
          </div>
          {isRotarian && (
            <>
              <Field label="Rotary Club">
                <Select defaultValue="">
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select club" /></SelectTrigger>
                  <SelectContent>
                    {clubs.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="District">
                <Select defaultValue="">
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select district" /></SelectTrigger>
                  <SelectContent>
                    {districts.map((d) => <SelectItem key={d.id} value={d.id}>District {d.number} — {d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
            </>
          )}
          <Field label="Languages Spoken"><Input placeholder="e.g. English, Hindi, Marathi" /></Field>
          <Field label="Availability">
            <Select defaultValue="available">
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="limited">Limited</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field label="Relevant Experience">
          <Textarea rows={4} placeholder="Describe any experience relevant to adjudicating record attempts (event management, officiating, auditing, safety oversight, etc.)" />
        </Field>

        <div className="rounded-xl border border-dashed border-gold/40 bg-gold/5 p-4">
          <p className="text-sm font-semibold text-gold-deep">Declarations</p>
          <div className="mt-2 flex items-start gap-2.5">
            <Checkbox required checked={declared} onCheckedChange={(v) => setDeclared(Boolean(v))} id="declaration" />
            <Label htmlFor="declaration" className="text-sm font-normal leading-snug text-foreground/80">
              I understand and agree that as a Certified Adjudicator I must not adjudicate my own attempt, an
              attempt involving immediate family, an event I organized, or any attempt in which I have a financial
              interest — and that I must declare any such conflict of interest immediately upon assignment.
            </Label>
          </div>
        </div>

        <Button type="submit" disabled={!declared} className="w-fit bg-navy-gradient text-white hover:opacity-90">
          Submit Application
        </Button>
      </form>
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
