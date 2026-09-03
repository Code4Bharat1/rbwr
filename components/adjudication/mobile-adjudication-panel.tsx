"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Camera,
  CheckCircle2,
  FileUp,
  MapPin,
  Pause,
  PenLine,
  Play,
  Square,
  UserPlus,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Attempt, ChecklistState, Witness } from "@/lib/types";

function formatElapsed(seconds: number) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

const checklistLabels: { key: keyof ChecklistState; label: string }[] = [
  { key: "safetyRequirementsMet", label: "Safety requirements met" },
  { key: "timingVerified", label: "Timing verified" },
  { key: "participantCountVerified", label: "Participant count verified" },
  { key: "evidenceCaptured", label: "Evidence captured" },
  { key: "witnessSignaturesCollected", label: "Witness signatures collected" },
];

export function MobileAdjudicationPanel({
  attempt,
  initialChecklist,
  initialWitnesses,
}: {
  attempt: Attempt;
  initialChecklist: ChecklistState;
  initialWitnesses: Witness[];
}) {
  const isCompleted = attempt.status === "completed";
  const isLive = attempt.status === "live";

  const [running, setRunning] = useState(isLive);
  const [seconds, setSeconds] = useState(isCompleted ? 0 : isLive ? 6 * 3600 + 12 * 60 + 40 : 0);
  const [ended, setEnded] = useState(isCompleted);

  const [participantCount, setParticipantCount] = useState(
    String(attempt.actualParticipants ?? attempt.expectedParticipants)
  );
  const [measurementValue, setMeasurementValue] = useState(attempt.measurement?.value ?? "");
  const [measurementUnit, setMeasurementUnit] = useState(attempt.measurement?.unit ?? "");
  const [measurementMethod, setMeasurementMethod] = useState(attempt.measurement?.method ?? "");

  const [checklist, setChecklist] = useState<ChecklistState>(initialChecklist);
  const [witnesses, setWitnesses] = useState<Witness[]>(initialWitnesses);
  const [newWitness, setNewWitness] = useState({ name: "", role: "" });
  const [evidenceLog, setEvidenceLog] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(isCompleted);
  const [location, setLocation] = useState<string | null>(isCompleted ? "Captured at attempt start" : null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const locked = ended || submitted;

  function capture(kind: string) {
    const stamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setEvidenceLog((log) => [`${kind} captured at ${stamp}`, ...log]);
    toast.success(`${kind} uploaded`);
  }

  function addWitness() {
    if (!newWitness.name.trim()) return;
    setWitnesses((w) => [
      ...w,
      { id: `w-live-${w.length}`, attemptId: attempt.id, name: newWitness.name, contact: "", role: newWitness.role || "Witness", signed: false },
    ]);
    setNewWitness({ name: "", role: "" });
  }

  function collectSignature(id: string) {
    setWitnesses((w) => w.map((wit) => (wit.id === id ? { ...wit, signed: true } : wit)));
    toast.success("Witness signature collected");
  }

  function captureLocation() {
    setLocating(true);
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)} (±${Math.round(pos.coords.accuracy)}m)`);
          setLocating(false);
          toast.success("GPS location captured");
        },
        () => {
          setLocation(`${attempt.venue} — GPS unavailable, location logged manually`);
          setLocating(false);
          toast("Location permission denied — logged venue name instead");
        },
        { timeout: 6000 }
      );
    } else {
      setLocation(`${attempt.venue} — GPS unavailable, location logged manually`);
      setLocating(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm rounded-[2.5rem] border-8 border-navy-deep bg-navy-deep p-2 shadow-2xl">
      <div className="max-h-[720px] overflow-y-auto rounded-[1.75rem] bg-background p-4">
        {/* Attempt Control */}
        <section className="rounded-2xl bg-navy-gradient p-5 text-center text-white">
          <p className="text-xs uppercase tracking-widest text-white/60">Attempt Control</p>
          <p className="mt-2 font-mono text-4xl font-semibold tabular-nums">{formatElapsed(seconds)}</p>
          <div className="mt-4 flex justify-center gap-2">
            {!running && !ended && (
              <Button
                size="sm"
                className="gap-1.5 bg-gold-gradient text-navy-deep hover:opacity-90"
                onClick={() => setRunning(true)}
              >
                <Play className="h-3.5 w-3.5" /> Start
              </Button>
            )}
            {running && (
              <Button size="sm" variant="secondary" className="gap-1.5" onClick={() => setRunning(false)}>
                <Pause className="h-3.5 w-3.5" /> Pause
              </Button>
            )}
            {!ended && (running || seconds > 0) && (
              <Button
                size="sm"
                variant="destructive"
                className="gap-1.5"
                onClick={() => {
                  setRunning(false);
                  setEnded(true);
                  toast("Attempt ended");
                }}
              >
                <Square className="h-3.5 w-3.5" /> End
              </Button>
            )}
          </div>
          {ended && <p className="mt-3 text-xs text-gold-soft">Attempt ended — finalize your report below.</p>}
        </section>

        {/* Evidence Capture */}
        <section className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Evidence Capture</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" className="flex-col gap-1 py-3 h-auto" disabled={locked} onClick={() => capture("Photo")}>
              <Camera className="h-4 w-4" /> Photo
            </Button>
            <Button variant="outline" size="sm" className="flex-col gap-1 py-3 h-auto" disabled={locked} onClick={() => capture("Video")}>
              <Video className="h-4 w-4" /> Video
            </Button>
            <Button variant="outline" size="sm" className="flex-col gap-1 py-3 h-auto" disabled={locked} onClick={() => capture("Document")}>
              <FileUp className="h-4 w-4" /> Doc
            </Button>
          </div>
          {evidenceLog.length > 0 && (
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {evidenceLog.map((e, i) => <li key={i}>• {e}</li>)}
            </ul>
          )}
        </section>

        {/* GPS / Location */}
        <section className="mt-4 rounded-xl border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Location</p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="min-w-0 flex-1 truncate text-sm text-foreground/80">
              {location ?? "No location captured yet"}
            </p>
            <Button size="sm" variant="outline" className="shrink-0 gap-1.5" disabled={locked || locating} onClick={captureLocation}>
              <MapPin className="h-3.5 w-3.5" /> {locating ? "Locating…" : "Capture GPS"}
            </Button>
          </div>
        </section>

        {/* Participant Count */}
        <section className="mt-5 rounded-xl border border-border p-4 text-center">
          <Input
            value={participantCount}
            onChange={(e) => setParticipantCount(e.target.value)}
            disabled={locked}
            className="border-0 text-center font-display text-3xl font-semibold shadow-none focus-visible:ring-0"
          />
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Participants Verified</p>
        </section>

        {/* Measurement */}
        <section className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Measurement</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Input placeholder="Value" value={measurementValue} onChange={(e) => setMeasurementValue(e.target.value)} disabled={locked} />
            <Input placeholder="Unit" value={measurementUnit} onChange={(e) => setMeasurementUnit(e.target.value)} disabled={locked} />
          </div>
          <Input
            className="mt-2"
            placeholder="Method"
            value={measurementMethod}
            onChange={(e) => setMeasurementMethod(e.target.value)}
            disabled={locked}
          />
        </section>

        {/* Witnesses */}
        <section className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Witnesses</p>
          <ul className="mt-2 space-y-1.5">
            {witnesses.map((w) => (
              <li key={w.id} className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2 text-sm">
                <span>{w.name} <span className="text-xs text-muted-foreground">— {w.role}</span></span>
                {w.signed ? (
                  <span className="text-xs text-verified">Signed</span>
                ) : locked ? (
                  <span className="text-xs text-pending">Pending</span>
                ) : (
                  <button
                    onClick={() => collectSignature(w.id)}
                    className="flex items-center gap-1 text-xs font-medium text-royal hover:underline"
                  >
                    <PenLine className="h-3 w-3" /> Collect Signature
                  </button>
                )}
              </li>
            ))}
          </ul>
          {!locked && (
            <div className="mt-2 flex gap-2">
              <Input placeholder="Name" value={newWitness.name} onChange={(e) => setNewWitness((v) => ({ ...v, name: e.target.value }))} />
              <Input placeholder="Role" value={newWitness.role} onChange={(e) => setNewWitness((v) => ({ ...v, role: e.target.value }))} />
              <Button size="icon" variant="outline" onClick={addWitness}><UserPlus className="h-4 w-4" /></Button>
            </div>
          )}
        </section>

        {/* Checklist */}
        <section className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Checklist</p>
          <div className="mt-2 flex flex-col gap-2">
            {checklistLabels.map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={checklist[key]}
                  disabled={locked}
                  onCheckedChange={(v) => setChecklist((c) => ({ ...c, [key]: Boolean(v) }))}
                />
                {label}
              </label>
            ))}
          </div>
        </section>

        {/* Final Decision */}
        <section className="mt-6 flex flex-col gap-2 border-t border-border pt-5">
          <Button
            variant="outline"
            disabled={submitted}
            onClick={() => {
              setEnded(true);
              setRunning(false);
              toast.success("Attempt marked complete");
            }}
          >
            Complete Attempt
          </Button>
          <Button
            className="gap-1.5 bg-navy-gradient text-white hover:opacity-90"
            disabled={submitted}
            onClick={() => {
              setSubmitted(true);
              toast.success("Adjudication report submitted for RBWR verification");
            }}
          >
            <CheckCircle2 className="h-4 w-4" /> Submit Report
          </Button>
          {submitted && (
            <p className="text-center text-xs text-verified">Report submitted — awaiting RBWR verification.</p>
          )}
        </section>
      </div>
    </div>
  );
}
