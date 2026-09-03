"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ApplicationStatus, Role } from "@/lib/types";

/** Which mock user each role "logs in" as from the dummy Sign In screen. */
export const ROLE_DEFAULT_USER: Record<Role, string> = {
  participant: "u2",
  rotarian: "u24",
  adjudicator: "u1",
  "club-admin": "u3",
  "district-admin": "u4",
  reviewer: "u25",
  "record-manager": "u10",
  "super-admin": "u9",
};

type DemoState = {
  viewerRole: Role | null;
  viewerUserId: string | null;
  applicationStatusOverrides: Record<string, ApplicationStatus>;
  visitedJourneyNodes: string[];
  hasHydrated: boolean;

  signIn: (role: Role) => void;
  signOut: () => void;
  setApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  markJourneyNodeVisited: (nodeId: string) => void;
  resetDemoState: () => void;
  setHasHydrated: (v: boolean) => void;
};

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      viewerRole: null,
      viewerUserId: null,
      applicationStatusOverrides: {},
      visitedJourneyNodes: [],
      hasHydrated: false,

      signIn: (role) =>
        set({ viewerRole: role, viewerUserId: ROLE_DEFAULT_USER[role] }),

      signOut: () => set({ viewerRole: null, viewerUserId: null }),

      setApplicationStatus: (appId, status) =>
        set((state) => ({
          applicationStatusOverrides: { ...state.applicationStatusOverrides, [appId]: status },
        })),

      markJourneyNodeVisited: (nodeId) =>
        set((state) =>
          state.visitedJourneyNodes.includes(nodeId)
            ? state
            : { visitedJourneyNodes: [...state.visitedJourneyNodes, nodeId] }
        ),

      resetDemoState: () =>
        set({
          viewerRole: null,
          viewerUserId: null,
          applicationStatusOverrides: {},
          visitedJourneyNodes: [],
        }),

      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "rbwr-demo-state",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
