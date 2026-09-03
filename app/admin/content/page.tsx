"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const initialBlocks = [
  { id: "hero-headline", label: "Homepage Hero Headline", value: "Where Extraordinary Achievements Become Permanent Records." },
  { id: "hero-subheadline", label: "Homepage Hero Subheadline", value: "Search, verify, and celebrate world records — from mass Rotary formations to corporate innovation feats — adjudicated by a certified global network." },
  { id: "about-body", label: "About Page Body", value: "RBWR is a global platform for documenting, verifying, and celebrating extraordinary achievements by individuals, Rotary clubs, districts, and organizations worldwide." },
  { id: "adjudicator-cta", label: "Become an Adjudicator CTA", value: "Join a global network of 1,250+ certified adjudicators who bring integrity and rigor to every record attempt." },
];

export default function AdminContentPage() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const editingBlock = blocks.find((b) => b.id === editing);

  return (
    <div>
      <PageHeader title="Content" description="Editable copy blocks used across the public site." />
      <div className="flex flex-col gap-3">
        {blocks.map((b) => (
          <div key={b.id} className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">{b.label}</p>
              <p className="mt-1 text-sm text-foreground/80">{b.value}</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setEditing(b.id);
                setDraft(b.value);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={Boolean(editing)} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editingBlock?.label}</DialogTitle>
          </DialogHeader>
          <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={5} />
          <DialogFooter>
            <Button
              className="bg-navy-gradient text-white hover:opacity-90"
              onClick={() => {
                setBlocks((bs) => bs.map((b) => (b.id === editing ? { ...b, value: draft } : b)));
                toast.success("Content updated");
                setEditing(null);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
