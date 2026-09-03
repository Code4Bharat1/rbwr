import { Witness } from "@/lib/types";

export const witnesses: Witness[] = [
  { id: "w-01", attemptId: "att-01", name: "Kavita Desai", contact: "+91 98200 11234", role: "Municipal Corporation Liaison", signed: true },
  { id: "w-02", attemptId: "att-01", name: "Farhan Ali", contact: "+91 98330 55621", role: "Independent Observer", signed: true },
  { id: "w-03", attemptId: "att-04", name: "Robert Hale", contact: "+44 7700 900123", role: "Arena Operations Manager", signed: false },
  { id: "w-04", attemptId: "att-05", name: "Bruno Alves", contact: "+55 11 98888-2211", role: "Independent Auditor", signed: true },
  { id: "w-05", attemptId: "att-06", name: "Dr. Lisa Chen", contact: "+1 917 555 0142", role: "Red Cross Liaison", signed: true },
  { id: "w-06", attemptId: "att-07", name: "Peter Mwangi", contact: "+254 722 445 981", role: "County Health Officer", signed: true },
  { id: "w-07", attemptId: "att-08", name: "Kenji Watanabe", contact: "+81 90 1234 5678", role: "Independent Technical Reviewer", signed: true },
  { id: "w-08", attemptId: "att-09", name: "Anil Deshpande", contact: "+91 98200 77654", role: "Independent Observer", signed: true },
  { id: "w-09", attemptId: "att-10", name: "Dr. Amina Hassan", contact: "+254 733 221 004", role: "Clinic Coordinator", signed: true },
  { id: "w-10", attemptId: "att-10", name: "Samuel Otieno", contact: "+254 700 118 822", role: "Community Representative", signed: false },
];

export function getWitnessesForAttempt(attemptId: string) {
  return witnesses.filter((w) => w.attemptId === attemptId);
}
