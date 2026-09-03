"use client";

import { useDemoStore } from "@/lib/store/use-demo-store";
import { Application } from "@/lib/types";

/** Effective status for an application: demo override if present, else the app's base status. */
export function useApplicationStatus(app: Application | undefined) {
  const override = useDemoStore((s) => (app ? s.applicationStatusOverrides[app.id] : undefined));
  return override ?? app?.status;
}
