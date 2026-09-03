"use client";

import { useDemoStore } from "@/lib/store/use-demo-store";
import { getApplication } from "@/lib/data/applications";

/** Looks up an application from the static dataset first, then demo-created applications. */
export function useApplicationById(id: string) {
  const created = useDemoStore((s) => s.createdApplications.find((a) => a.id === id));
  return getApplication(id) ?? created;
}
