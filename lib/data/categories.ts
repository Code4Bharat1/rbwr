import { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "cat-mass-formation", name: "Mass Human Formation", group: "World", description: "Records set by large coordinated groups forming a shape, symbol, or pattern." },
  { id: "cat-endurance", name: "Endurance & Physical Feats", group: "World", description: "Individual or group records of sustained physical achievement." },
  { id: "cat-tech-innovation", name: "Technology & Innovation Feat", group: "World", description: "Records demonstrating breakthrough speed, scale, or precision using technology." },
  { id: "cat-rotary-service", name: "Rotary Service Project Scale", group: "Rotary", description: "The largest single-day or single-project Rotary service initiatives." },
  { id: "cat-rotary-membership", name: "Rotary Membership Milestones", group: "Rotary", description: "Records tracking extraordinary membership growth within Rotary." },
  { id: "cat-club-fundraising", name: "Club Fundraising Achievement", group: "Club", description: "Largest funds raised by a single Rotary club in one event." },
  { id: "cat-district-growth", name: "District Participation Growth", group: "District", description: "Fastest year-over-year participation growth across a Rotary district." },
  { id: "cat-city-landmark", name: "City Landmark Achievement", group: "City", description: "Civic records tied to a specific city's public spaces or landmarks." },
  { id: "cat-rotarian-individual", name: "Individual Rotarian Achievement", group: "Rotarian", description: "Personal achievement records set by an individual Rotary member." },
  { id: "cat-battle", name: "Head-to-Head Record Battle", group: "Battle", description: "Competitive records actively being challenged by a rival attempt." },
  { id: "cat-community-impact", name: "Community Impact Project", group: "Community", description: "Large-scale community projects measured by participation or outcome." },
  { id: "cat-corporate-team", name: "Corporate Team Achievement", group: "Corporate", description: "Records set by companies or corporate teams." },
  { id: "cat-corporate-csr", name: "Corporate CSR Milestone", group: "Corporate", description: "Corporate social-responsibility initiatives measured at scale." },
  { id: "cat-educational", name: "Educational Institution Record", group: "Educational", description: "Records set by schools, universities, or student organizations." },
];

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}
