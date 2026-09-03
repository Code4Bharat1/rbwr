import { AdjudicatorProfile } from "@/lib/types";

export const adjudicatorProfiles: AdjudicatorProfile[] = [
  { userId: "u1", certificationLevel: "International", languages: ["English", "Hindi", "Marathi"], availability: "Available", completedAttempts: 62, specialties: ["Mass Formations", "Community Impact"], rating: 4.9 },
  { userId: "u6", certificationLevel: "National", languages: ["English", "Tamil", "Kannada"], availability: "Available", completedAttempts: 38, specialties: ["Endurance", "Large Formation"], rating: 4.7 },
  { userId: "u8", certificationLevel: "Chief Adjudicator", languages: ["English", "Spanish"], availability: "Limited", completedAttempts: 141, specialties: ["Corporate Records", "Speed & Precision"], rating: 5.0 },
  { userId: "u12", certificationLevel: "Regional", languages: ["English", "Swahili"], availability: "Available", completedAttempts: 21, specialties: ["Community Impact", "Youth Records"], rating: 4.6 },
  { userId: "u14", certificationLevel: "International", languages: ["English"], availability: "Limited", completedAttempts: 97, specialties: ["World Records", "Measurement Verification"], rating: 4.8 },
  { userId: "u16", certificationLevel: "National", languages: ["English"], availability: "Available", completedAttempts: 44, specialties: ["Outdoor & Marine", "Endurance"], rating: 4.7 },
  { userId: "u19", certificationLevel: "Regional", languages: ["English", "Filipino"], availability: "Available", completedAttempts: 19, specialties: ["Youth Records", "Educational"], rating: 4.5 },
  { userId: "u21", certificationLevel: "National", languages: ["English", "Portuguese"], availability: "Available", completedAttempts: 33, specialties: ["Corporate Records", "Community Impact"], rating: 4.6 },
  { userId: "u22", certificationLevel: "International", languages: ["English", "Japanese"], availability: "Limited", completedAttempts: 88, specialties: ["Precision Measurement", "Technology Records"], rating: 4.9 },
  { userId: "u26", certificationLevel: "Regional", languages: ["English", "Malayalam", "Kannada"], availability: "Available", completedAttempts: 27, specialties: ["Mass Formations", "Youth Records"], rating: 4.6 },
];

export function getAdjudicatorProfile(userId: string) {
  return adjudicatorProfiles.find((a) => a.userId === userId);
}
