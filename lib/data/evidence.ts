import { Evidence } from "@/lib/types";

export const evidence: Evidence[] = [
  { id: "ev-001", attemptId: "att-01", type: "photo", fileName: "aerial-formation-wide.jpg", uploadedByUserId: "u1", timestamp: "2026-01-18T10:32:00", verificationStatus: "verified" },
  { id: "ev-002", attemptId: "att-01", type: "video", fileName: "formation-hold-period.mp4", uploadedByUserId: "u1", timestamp: "2026-01-18T10:35:00", verificationStatus: "verified" },
  { id: "ev-003", attemptId: "att-01", type: "measurement", fileName: "participant-count-report.pdf", uploadedByUserId: "u1", timestamp: "2026-01-18T11:02:00", verificationStatus: "verified" },
  { id: "ev-004", attemptId: "att-01", type: "witness", fileName: "witness-statement-civic-official.pdf", uploadedByUserId: "u1", timestamp: "2026-01-18T11:15:00", verificationStatus: "verified" },
  { id: "ev-005", attemptId: "att-01", type: "participant-list", fileName: "checkin-wristband-export.csv", uploadedByUserId: "u1", timestamp: "2026-01-18T09:50:00", verificationStatus: "verified" },

  { id: "ev-006", attemptId: "att-04", type: "photo", fileName: "hour-3-checkpoint.jpg", uploadedByUserId: "u14", timestamp: "2026-09-03T12:10:00", verificationStatus: "pending" },
  { id: "ev-007", attemptId: "att-04", type: "video", fileName: "relay-shift-change-cam2.mp4", uploadedByUserId: "u14", timestamp: "2026-09-03T13:00:00", verificationStatus: "pending" },

  { id: "ev-008", attemptId: "att-05", type: "photo", fileName: "venue-wide-shot.jpg", uploadedByUserId: "u21", timestamp: "2026-08-20T11:05:00", verificationStatus: "verified" },
  { id: "ev-009", attemptId: "att-05", type: "video", fileName: "session-timelapse.mp4", uploadedByUserId: "u21", timestamp: "2026-08-20T11:40:00", verificationStatus: "verified" },
  { id: "ev-010", attemptId: "att-05", type: "participant-list", fileName: "wristband-scan-export.csv", uploadedByUserId: "u21", timestamp: "2026-08-20T09:15:00", verificationStatus: "verified" },

  { id: "ev-011", attemptId: "att-06", type: "document", fileName: "bloodbank-intake-log-site1.pdf", uploadedByUserId: "u8", timestamp: "2026-08-10T14:00:00", verificationStatus: "verified" },
  { id: "ev-012", attemptId: "att-06", type: "photo", fileName: "donation-site-3-photo.jpg", uploadedByUserId: "u8", timestamp: "2026-08-10T10:20:00", verificationStatus: "verified" },
  { id: "ev-013", attemptId: "att-06", type: "witness", fileName: "witness-statement-redcross-liaison.pdf", uploadedByUserId: "u8", timestamp: "2026-08-10T15:10:00", verificationStatus: "verified" },

  { id: "ev-014", attemptId: "att-07", type: "document", fileName: "distribution-log-consolidated.pdf", uploadedByUserId: "u12", timestamp: "2026-07-12T16:00:00", verificationStatus: "verified" },
  { id: "ev-015", attemptId: "att-07", type: "photo", fileName: "distribution-point-12.jpg", uploadedByUserId: "u12", timestamp: "2026-07-12T09:40:00", verificationStatus: "verified" },
  { id: "ev-016", attemptId: "att-07", type: "measurement", fileName: "gps-tag-summary.csv", uploadedByUserId: "u12", timestamp: "2026-07-12T16:20:00", verificationStatus: "verified" },

  { id: "ev-017", attemptId: "att-08", type: "measurement", fileName: "throughput-telemetry-export.csv", uploadedByUserId: "u22", timestamp: "2026-02-02T13:00:00", verificationStatus: "verified" },
  { id: "ev-018", attemptId: "att-08", type: "video", fileName: "assembly-line-6hr-compressed.mp4", uploadedByUserId: "u22", timestamp: "2026-02-02T13:10:00", verificationStatus: "verified" },
  { id: "ev-019", attemptId: "att-08", type: "document", fileName: "sensor-calibration-certificate.pdf", uploadedByUserId: "u22", timestamp: "2026-02-02T06:30:00", verificationStatus: "verified" },

  { id: "ev-020", attemptId: "att-09", type: "photo", fileName: "aerial-count-frame-042.jpg", uploadedByUserId: "u1", timestamp: "2026-06-01T10:00:00", verificationStatus: "flagged" },
  { id: "ev-021", attemptId: "att-09", type: "measurement", fileName: "aerial-count-report.pdf", uploadedByUserId: "u1", timestamp: "2026-06-01T12:00:00", verificationStatus: "flagged" },
  { id: "ev-022", attemptId: "att-09", type: "witness", fileName: "witness-statement-independent-observer.pdf", uploadedByUserId: "u1", timestamp: "2026-06-01T12:30:00", verificationStatus: "verified" },

  { id: "ev-023", attemptId: "att-10", type: "document", fileName: "clinic-signin-sheets-bundle.pdf", uploadedByUserId: "u12", timestamp: "2026-05-15T17:00:00", verificationStatus: "flagged" },
  { id: "ev-024", attemptId: "att-10", type: "photo", fileName: "clinic-7-queue.jpg", uploadedByUserId: "u12", timestamp: "2026-05-15T09:30:00", verificationStatus: "verified" },
  { id: "ev-025", attemptId: "att-10", type: "document", fileName: "clinic-registration-records.pdf", uploadedByUserId: "u13", timestamp: "2026-06-15T10:00:00", verificationStatus: "pending" },
];

export function getEvidenceForAttempt(attemptId: string) {
  return evidence.filter((e) => e.attemptId === attemptId);
}
