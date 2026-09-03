import { Certificate } from "@/lib/types";

export const certificates: Certificate[] = [
  { id: "cert-01", certificateNumber: "RBWR-CERT-2026-00427", recordId: "RBWR-IND-MH-MUM-2026-00427", holderName: "Rotary Club of Mumbai Queens Necklace & District 3141", issuedDate: "2026-01-29", adjudicatorId: "u1" },
  { id: "cert-02", certificateNumber: "RBWR-CERT-2025-00118", recordId: "RBWR-USA-NY-NYC-2025-00118", holderName: "Rotary Club of Manhattan", issuedDate: "2025-11-10", adjudicatorId: "u8" },
  { id: "cert-03", certificateNumber: "RBWR-CERT-2024-00089", recordId: "RBWR-GBR-LDN-LON-2024-00089", holderUserId: "u15", holderName: "Charlotte Hughes", issuedDate: "2024-06-20", adjudicatorId: "u14" },
  { id: "cert-04", certificateNumber: "RBWR-CERT-2025-00204", recordId: "RBWR-AUS-NSW-SYD-2025-00204", holderName: "Rotary Club of Sydney Cove", issuedDate: "2025-03-15", adjudicatorId: "u16" },
  { id: "cert-05", certificateNumber: "RBWR-CERT-2023-00051", recordId: "RBWR-KEN-NBO-NBO-2023-00051", holderName: "Rotary Club of Nairobi Central", issuedDate: "2023-09-28", adjudicatorId: "u12" },
  { id: "cert-06", certificateNumber: "RBWR-CERT-2025-00142", recordId: "RBWR-PHL-MNL-MNL-2025-00142", holderName: "STEM Youth Alliance Manila", issuedDate: "2025-09-05", adjudicatorId: "u19" },
  { id: "cert-07", certificateNumber: "RBWR-CERT-2024-00077", recordId: "RBWR-BRA-SP-SAO-2024-00077", holderName: "Nimbus Health Corp", issuedDate: "2024-05-18", adjudicatorId: "u21" },
  { id: "cert-08", certificateNumber: "RBWR-CERT-2025-00199", recordId: "RBWR-IND-KA-BLR-2025-00199", holderName: "Rotary Club of Bengaluru Indiranagar", issuedDate: "2025-10-09", adjudicatorId: "u6" },
  { id: "cert-09", certificateNumber: "RBWR-CERT-2022-00061", recordId: "RBWR-USA-IL-CHI-2022-00061", holderName: "Rotary Club of Chicago Loop", issuedDate: "2022-07-11", adjudicatorId: "u8" },
  { id: "cert-10", certificateNumber: "RBWR-CERT-2024-00301", recordId: "RBWR-IND-MH-MUM-2024-00301", holderName: "Rotary District 3141", issuedDate: "2024-04-07", adjudicatorId: "u1" },
  { id: "cert-11", certificateNumber: "RBWR-CERT-2023-00145", recordId: "RBWR-USA-NY-NYC-2023-00145", holderName: "Rotary Club of Manhattan", issuedDate: "2023-04-29", adjudicatorId: "u8" },
  { id: "cert-12", certificateNumber: "RBWR-CERT-2025-00210", recordId: "RBWR-IND-KA-BLR-2025-00210", holderName: "Rotary District 3190", issuedDate: "2025-07-07", adjudicatorId: "u6" },
  { id: "cert-13", certificateNumber: "RBWR-CERT-2025-00072", recordId: "RBWR-USA-NY-NYC-2025-00072", holderUserId: "u28", holderName: "Emma Richardson", issuedDate: "2025-12-08", adjudicatorId: "u8" },
  { id: "cert-14", certificateNumber: "RBWR-CERT-2026-00019", recordId: "RBWR-KEN-NBO-NBO-2026-00019", holderName: "Rotary Club of Nairobi Central", issuedDate: "2026-02-06", adjudicatorId: "u12" },
  { id: "cert-15", certificateNumber: "RBWR-CERT-2025-00061", recordId: "RBWR-BRA-SP-SAO-2025-00061", holderName: "Nimbus Health Corp", issuedDate: "2025-06-12", adjudicatorId: "u21" },
];

export function getCertificateForRecord(recordId: string) {
  return certificates.find((c) => c.recordId === recordId);
}
export function getCertificate(id: string) {
  return certificates.find((c) => c.id === id);
}
