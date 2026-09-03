"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Application, ApplicationStatus, Role } from "@/lib/types";
import { ROLE_DEFAULT_USER } from "@/lib/demo-config";

export { ROLE_DEFAULT_USER };

type DemoState = {
  viewerRole: Role | null;
  viewerUserId: string | null;
  applicationStatusOverrides: Record<string, ApplicationStatus>;
  visitedJourneyNodes: string[];
  createdApplications: Application[];
  hasHydrated: boolean;

  signIn: (role: Role) => void;
  signOut: () => void;
  setApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  markJourneyNodeVisited: (nodeId: string) => void;
  addCreatedApplication: (app: Application) => void;
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
      createdApplications: [],
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

      addCreatedApplication: (app) =>
        set((state) => ({ createdApplications: [...state.createdApplications, app] })),

      resetDemoState: () =>
        set({
          viewerRole: null,
          viewerUserId: null,
          applicationStatusOverrides: {},
          visitedJourneyNodes: [],
          createdApplications: [],
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
