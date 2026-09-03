export type Role =
  | "participant"
  | "rotarian"
  | "adjudicator"
  | "club-admin"
  | "district-admin"
  | "reviewer"
  | "record-manager"
  | "super-admin";

export const ROLE_LABELS: Record<Role, string> = {
  participant: "Participant",
  rotarian: "Rotarian",
  adjudicator: "Certified Adjudicator",
  "club-admin": "Club Administrator",
  "district-admin": "District Administrator",
  reviewer: "RBWR Reviewer",
  "record-manager": "Record Manager",
  "super-admin": "Super Administrator",
};

/** Where a role lands after "signing in" from the dummy login screen. */
export const ROLE_HOME: Record<Role, string> = {
  participant: "/dashboard",
  rotarian: "/dashboard",
  adjudicator: "/adjudicator",
  "club-admin": "/club",
  "district-admin": "/district",
  reviewer: "/reviewer",
  "record-manager": "/admin/records",
  "super-admin": "/admin",
};

export type Country = {
  id: string;
  name: string;
  code: string;
  flag: string;
  recordCount: number;
};

export type City = {
  id: string;
  name: string;
  countryId: string;
  districtId?: string;
};

export type District = {
  id: string;
  number: string;
  name: string;
  countryIds: string[];
  clubIds: string[];
  memberCount: number;
};

export type Club = {
  id: string;
  name: string;
  districtId: string;
  cityId: string;
  memberCount: number;
  foundedYear: number;
  initials: string;
};

export type Badge =
  | "Record Holder"
  | "World Record Holder"
  | "Rotary Record Holder"
  | "Certified Adjudicator"
  | "Community Champion"
  | "Founding Member";

export type AvatarColor =
  | "navy"
  | "gold"
  | "royal"
  | "orange"
  | "slate";

export type User = {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarColor: AvatarColor;
  roles: Role[];
  countryId: string;
  cityId: string;
  clubId?: string;
  bio: string;
  badges: Badge[];
};

export type AdjudicatorProfile = {
  userId: string;
  certificationLevel: "Regional" | "National" | "International" | "Chief Adjudicator";
  languages: string[];
  availability: "Available" | "Limited" | "Unavailable";
  completedAttempts: number;
  specialties: string[];
  rating: number;
};

export type CategoryGroup =
  | "World"
  | "Rotary"
  | "Club"
  | "District"
  | "City"
  | "Rotarian"
  | "Battle"
  | "Community"
  | "Corporate"
  | "Educational";

export type Category = {
  id: string;
  name: string;
  group: CategoryGroup;
  description: string;
};

export type RecordStatus = "current" | "broken" | "pending" | "historical";

export type RecordHolderType = "individual" | "group" | "club" | "corporate";

export type PriorHolder = {
  year: number;
  holderName: string;
  achievement: string;
  status: "original" | "broken" | "current";
};

export type WorldRecord = {
  id: string;
  title: string;
  categoryId: string;
  status: RecordStatus;
  holderType: RecordHolderType;
  holderUserId?: string;
  holderClubId?: string;
  holderName: string;
  countryId: string;
  cityId: string;
  date: string;
  achievementValue: string;
  achievementUnit: string;
  description: string;
  adjudicatorId: string;
  images: string[];
  verified: boolean;
  history: PriorHolder[];
  applicationId?: string;
};

export type ApplicationType = "break" | "create";

export type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "guidelines_issued"
  | "scheduled"
  | "attempt_live"
  | "evidence_submitted"
  | "under_verification"
  | "verified"
  | "rejected"
  | "appeal";

export const APPLICATION_STAGES: ApplicationStatus[] = [
  "submitted",
  "under_review",
  "approved",
  "guidelines_issued",
  "scheduled",
  "attempt_live",
  "evidence_submitted",
  "under_verification",
  "verified",
];

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  approved: "Approved",
  guidelines_issued: "Guidelines Issued",
  scheduled: "Scheduled",
  attempt_live: "Attempt Live",
  evidence_submitted: "Evidence Submitted",
  under_verification: "Under Verification",
  verified: "Verified",
  rejected: "Rejected",
  appeal: "Under Appeal",
};

export type TimelineEvent = {
  stage: string;
  date: string;
  actor: string;
  notes: string;
  documents?: string[];
};

export type Application = {
  id: string;
  type: ApplicationType;
  recordId?: string;
  proposedTitle?: string;
  categoryId: string;
  applicantUserId: string;
  status: ApplicationStatus;
  createdDate: string;
  venueCity: string;
  venueCountry: string;
  proposedDate: string;
  expectedParticipants: number;
  description: string;
  timeline: TimelineEvent[];
  guidelinesId?: string;
  attemptId?: string;
  reviewerUserId?: string;
};

export type GuidelineSections = {
  definition: string;
  eligibility: string;
  measurementMethod: string;
  equipment: string;
  timingRules: string;
  participantRules: string;
  countingMethod: string;
  safety: string;
  witnessRequirements: string;
  photographyRequirements: string;
  videoRequirements: string;
  adjudicatorRequirements: string;
};

export type Guideline = {
  id: string;
  categoryId: string;
  version: string;
  issuedDate: string;
  sections: GuidelineSections;
};

export type AttemptStatus = "draft" | "scheduled" | "live" | "completed";

export type Measurement = {
  value: string;
  unit: string;
  method: string;
};

export type Attempt = {
  id: string;
  applicationId: string;
  status: AttemptStatus;
  date: string;
  time: string;
  venue: string;
  cityId: string;
  countryId: string;
  organizer: string;
  adjudicatorId: string;
  expectedParticipants: number;
  actualParticipants?: number;
  measurement?: Measurement;
};

export type EvidenceType =
  | "photo"
  | "video"
  | "document"
  | "witness"
  | "measurement"
  | "participant-list";

export type Evidence = {
  id: string;
  attemptId: string;
  type: EvidenceType;
  fileName: string;
  uploadedByUserId: string;
  timestamp: string;
  verificationStatus: "verified" | "pending" | "flagged";
  url?: string;
};

export type Witness = {
  id: string;
  attemptId: string;
  name: string;
  contact: string;
  role: string;
  signed: boolean;
};

export type ChecklistState = {
  safetyRequirementsMet: boolean;
  timingVerified: boolean;
  participantCountVerified: boolean;
  evidenceCaptured: boolean;
  witnessSignaturesCollected: boolean;
};

export type AdjudicationReport = {
  id: string;
  attemptId: string;
  adjudicatorId: string;
  checklist: ChecklistState;
  decision: "pending" | "recommend-verify" | "recommend-reject";
  notes: string;
  submittedDate?: string;
};

export type Certificate = {
  id: string;
  certificateNumber: string;
  recordId: string;
  holderUserId?: string;
  holderName: string;
  issuedDate: string;
  adjudicatorId: string;
};

export type AuditLog = {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  resource: string;
  ip: string;
  status: "SUCCESS" | "FAILED";
};
