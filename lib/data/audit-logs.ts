import { AuditLog } from "@/lib/types";

export const auditLogs: AuditLog[] = [
  { id: "log-01", timestamp: "2026-09-03T09:14:22", userId: "u9", action: "Changed Record Status", resource: "RBWR-JPN-TKY-TKY-2026-00033", ip: "203.0.113.14", status: "SUCCESS" },
  { id: "log-02", timestamp: "2026-09-03T08:52:10", userId: "u25", action: "Approved Application", resource: "app-03", ip: "203.0.113.62", status: "SUCCESS" },
  { id: "log-03", timestamp: "2026-09-02T19:40:05", userId: "u27", action: "Updated User Role", resource: "u26", ip: "198.51.100.21", status: "SUCCESS" },
  { id: "log-04", timestamp: "2026-09-02T16:05:47", userId: "u5", action: "Assigned Adjudicator", resource: "att-03", ip: "203.0.113.90", status: "FAILED" },
  { id: "log-05", timestamp: "2026-09-02T11:22:31", userId: "u10", action: "Published Record", resource: "RBWR-JPN-TKY-TKY-2024-00051", ip: "192.0.2.44", status: "SUCCESS" },
  { id: "log-06", timestamp: "2026-09-01T22:18:09", userId: "u9", action: "Exported Report", resource: "verification-rate-q3.csv", ip: "203.0.113.14", status: "SUCCESS" },
  { id: "log-07", timestamp: "2026-09-01T14:03:55", userId: "u11", action: "Requested More Evidence", resource: "app-11", ip: "192.0.2.108", status: "SUCCESS" },
  { id: "log-08", timestamp: "2026-08-31T20:47:12", userId: "u27", action: "Login", resource: "Admin Panel", ip: "198.51.100.21", status: "SUCCESS" },
  { id: "log-09", timestamp: "2026-08-31T13:29:44", userId: "u10", action: "Archived Record", resource: "RBWR-IND-MH-MUM-2019-00012", ip: "192.0.2.44", status: "SUCCESS" },
  { id: "log-10", timestamp: "2026-08-30T18:11:02", userId: "u25", action: "Issued Guidelines", resource: "gl-mass-formation", ip: "203.0.113.62", status: "SUCCESS" },
  { id: "log-11", timestamp: "2026-08-30T10:05:39", userId: "u9", action: "Login", resource: "Admin Panel", ip: "203.0.113.14", status: "FAILED" },
  { id: "log-12", timestamp: "2026-08-29T21:34:18", userId: "u11", action: "Rejected Application", resource: "app-14", ip: "192.0.2.108", status: "SUCCESS" },
  { id: "log-13", timestamp: "2026-08-29T09:47:56", userId: "u5", action: "Approved Application", resource: "app-08", ip: "203.0.113.90", status: "SUCCESS" },
  { id: "log-14", timestamp: "2026-08-28T17:22:40", userId: "u27", action: "Updated Category", resource: "cat-tech-innovation", ip: "198.51.100.21", status: "SUCCESS" },
  { id: "log-15", timestamp: "2026-08-27T12:10:15", userId: "u9", action: "Issued Certificate", resource: "cert-14", ip: "203.0.113.14", status: "SUCCESS" },
  { id: "log-16", timestamp: "2026-08-26T15:38:29", userId: "u10", action: "Edited Record", resource: "RBWR-USA-NY-NYC-2025-00118", ip: "192.0.2.44", status: "SUCCESS" },
  { id: "log-17", timestamp: "2026-08-25T08:59:03", userId: "u25", action: "Verified Record", resource: "app-01", ip: "203.0.113.62", status: "SUCCESS" },
  { id: "log-18", timestamp: "2026-08-24T20:16:51", userId: "u9", action: "Suspended User", resource: "u2", ip: "203.0.113.14", status: "FAILED" },
  { id: "log-19", timestamp: "2026-08-24T11:03:27", userId: "u11", action: "Scheduled Attempt", resource: "att-05", ip: "192.0.2.108", status: "SUCCESS" },
  { id: "log-20", timestamp: "2026-08-23T09:41:33", userId: "u27", action: "Login", resource: "Admin Panel", ip: "198.51.100.21", status: "SUCCESS" },
];

export function auditLogsSorted() {
  return [...auditLogs].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
}
