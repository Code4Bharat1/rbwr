"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Get in Touch" title="Contact RBWR" align="center" />

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <ContactRow icon={Mail} label="records@rbwr.org" />
          <ContactRow icon={Phone} label="+1 (800) 555-0199" />
          <ContactRow icon={MapPin} label="RBWR Global Headquarters, Chicago, IL" />
        </div>

        <form
          className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 lg:col-span-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Message sent — our team will respond within 2 business days.");
          }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Name"><Input required placeholder="Your name" /></Field>
            <Field label="Email"><Input required type="email" placeholder="you@example.com" /></Field>
          </div>
          <Field label="Inquiry Type">
            <Select defaultValue="general">
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="adjudicator">Become an Adjudicator</SelectItem>
                <SelectItem value="record">Record Application Support</SelectItem>
                <SelectItem value="press">Press & Media</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Message"><Textarea required rows={5} placeholder="How can we help?" /></Field>
          <Button type="submit" className="w-fit bg-navy-gradient text-white hover:opacity-90">
            {sent ? "Message Sent ✓" : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label }: { icon: typeof Mail; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-royal/10 text-royal">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm text-foreground/80">{label}</span>
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
