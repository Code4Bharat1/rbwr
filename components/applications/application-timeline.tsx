import {
  Application,
  APPLICATION_STAGES,
  APPLICATION_STATUS_LABELS,
  ApplicationStatus,
} from "@/lib/types";
import { Timeline, TimelineStep } from "@/components/shared/timeline";
import { formatDateShort } from "@/lib/format";

function buildSteps(app: Application, effectiveStatus: ApplicationStatus): TimelineStep[] {
  const isOverridden = effectiveStatus !== app.status;

  if (!isOverridden) {
    const steps: TimelineStep[] = app.timeline.map((t, i) => ({
      label: t.stage,
      date: formatDateShort(t.date),
      actor: t.actor,
      notes: t.notes,
      documents: t.documents,
      state: i === app.timeline.length - 1 ? "current" : "done",
    }));
    const isTerminal = app.status === "verified" || app.status === "rejected" || app.status === "appeal";
    if (!isTerminal) {
      const lastStageIndex = APPLICATION_STAGES.indexOf(app.status);
      APPLICATION_STAGES.slice(lastStageIndex + 1).forEach((stage) => {
        steps.push({ label: APPLICATION_STATUS_LABELS[stage], state: "upcoming" });
      });
    }
    // Mark the true "current" stage (last one) distinctly, rest already done above.
    if (steps.length > 0 && !isTerminal) {
      const lastRealIndex = app.timeline.length - 1;
      steps[lastRealIndex].state = "current";
    } else if (steps.length > 0 && app.status === "rejected") {
      steps[steps.length - 1].state = "rejected";
    }
    return steps;
  }

  // Demo override: synthesize a simulated progression.
  const effIndex = APPLICATION_STAGES.indexOf(effectiveStatus);
  const steps: TimelineStep[] = [];

  if (effIndex === -1) {
    // rejected or appeal: show full normal flow as done, then branch.
    APPLICATION_STAGES.forEach((stage) => {
      steps.push({ label: APPLICATION_STATUS_LABELS[stage], state: "done", actor: "Demo Simulation" });
    });
    if (effectiveStatus === "rejected" || effectiveStatus === "appeal") {
      steps.push({
        label: "Rejected",
        state: "rejected",
        actor: "Demo Simulation",
        notes: "(Demo) Status set via Switch Demo Status control.",
      });
    }
    if (effectiveStatus === "appeal") {
      steps.push({
        label: "Under Appeal",
        state: "current",
        actor: "Demo Simulation",
        notes: "(Demo) Applicant has requested a re-review.",
      });
    }
  } else {
    APPLICATION_STAGES.forEach((stage, i) => {
      steps.push({
        label: APPLICATION_STATUS_LABELS[stage],
        state: i < effIndex ? "done" : i === effIndex ? "current" : "upcoming",
        actor: i <= effIndex ? "Demo Simulation" : undefined,
        notes: i === effIndex ? "(Demo) Status advanced via Switch Demo Status control." : undefined,
      });
    });
  }

  return steps;
}

export function ApplicationTimeline({
  application,
  effectiveStatus,
}: {
  application: Application;
  effectiveStatus: ApplicationStatus;
}) {
  const steps = buildSteps(application, effectiveStatus);
  return <Timeline steps={steps} />;
}
