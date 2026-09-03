import { Role } from "@/lib/types";

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

/** Convenience constants for server components that need "the current demo X" without the client store. */
export const CURRENT_PARTICIPANT_ID = ROLE_DEFAULT_USER.participant;
export const CURRENT_ADJUDICATOR_ID = ROLE_DEFAULT_USER.adjudicator;
export const CURRENT_CLUB_ADMIN_ID = ROLE_DEFAULT_USER["club-admin"];
export const CURRENT_DISTRICT_ADMIN_ID = ROLE_DEFAULT_USER["district-admin"];
export const CURRENT_REVIEWER_ID = ROLE_DEFAULT_USER.reviewer;
export const CURRENT_RECORD_MANAGER_ID = ROLE_DEFAULT_USER["record-manager"];
export const CURRENT_SUPER_ADMIN_ID = ROLE_DEFAULT_USER["super-admin"];
