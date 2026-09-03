"use client";

import { useDemoStore } from "@/lib/store/use-demo-store";
import { CURRENT_PARTICIPANT_ID } from "@/lib/demo-config";

/** The signed-in user viewing /dashboard, falling back to the default demo participant. */
export function useCurrentParticipantId() {
  const viewerUserId = useDemoStore((s) => s.viewerUserId);
  const viewerRole = useDemoStore((s) => s.viewerRole);
  if (viewerUserId && (viewerRole === "participant" || viewerRole === "rotarian")) return viewerUserId;
  return CURRENT_PARTICIPANT_ID;
}
