"use client";

import { useDemoStore } from "@/lib/store/use-demo-store";
import { Application } from "@/lib/types";

/** Effective status for an application: demo override if present, else the app's base status. */
export function useApplicationStatus(app: Application) {
  const override = useDemoStore((s) => s.applicationStatusOverrides[app.id]);
  return override ?? app.status;
}
