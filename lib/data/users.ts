import { AvatarColor, User } from "@/lib/types";

const colors: AvatarColor[] = ["navy", "gold", "royal", "orange", "slate"];
function colorFor(i: number): AvatarColor {
  return colors[i % colors.length];
}
function initialsFor(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type Seed = Omit<User, "initials" | "avatarColor" | "badges"> & {
  badges?: User["badges"];
};

const seeds: Seed[] = [
  { id: "u1", name: "Aditi Rao", email: "aditi.rao@rbwr.org", roles: ["adjudicator", "rotarian"], countryId: "in", cityId: "mumbai", clubId: "club-mqn", bio: "International-level adjudicator specializing in mass-participation formations across South Asia.", badges: ["Certified Adjudicator"] },
  { id: "u2", name: "Rohan Mehta", email: "rohan.mehta@gmail.com", roles: ["participant", "rotarian"], countryId: "in", cityId: "mumbai", clubId: "club-bandra", bio: "Event organizer and three-time record applicant from Mumbai.", badges: [] },
  { id: "u3", name: "Simran Kaur", email: "simran.kaur@rcmqn.org", roles: ["club-admin", "rotarian"], countryId: "in", cityId: "mumbai", clubId: "club-mqn", bio: "Club Administrator for RC Mumbai Queens Necklace, overseeing community record initiatives.", badges: ["Community Champion"] },
  { id: "u4", name: "Vikram Shah", email: "vikram.shah@rid3141.org", roles: ["district-admin", "rotarian"], countryId: "in", cityId: "mumbai", clubId: "club-mqn", bio: "District Administrator, Rotary District 3141.", badges: ["Community Champion"] },
  { id: "u5", name: "Ananya Iyer", email: "ananya.iyer@rbwr.org", roles: ["reviewer"], countryId: "in", cityId: "bengaluru", bio: "RBWR Reviewer focused on Rotary and community-impact record categories.", badges: [] },
  { id: "u6", name: "Karthik Subramaniam", email: "karthik.s@rbwr.org", roles: ["adjudicator", "rotarian"], countryId: "in", cityId: "bengaluru", clubId: "club-blr-indiranagar", bio: "National adjudicator with a focus on endurance and large-formation records.", badges: ["Certified Adjudicator"] },
  { id: "u7", name: "Priya Nair", email: "priya.nair@outlook.com", roles: ["participant"], countryId: "in", cityId: "bengaluru", bio: "Independent record holder and STEM educator.", badges: [] },
  { id: "u8", name: "James Whitfield", email: "j.whitfield@rbwr.org", roles: ["adjudicator"], countryId: "us", cityId: "new-york", clubId: "club-manhattan", bio: "Chief Adjudicator for the Americas region, 140+ verified attempts.", badges: ["Certified Adjudicator"] },
  { id: "u9", name: "Olivia Bennett", email: "olivia.bennett@rbwr.org", roles: ["super-admin"], countryId: "us", cityId: "new-york", bio: "Head of Platform Operations at RBWR.", badges: [] },
  { id: "u10", name: "Michael Torres", email: "michael.torres@rbwr.org", roles: ["record-manager"], countryId: "us", cityId: "chicago", bio: "Record Manager overseeing the North American record catalog.", badges: [] },
  { id: "u11", name: "Sarah Kim", email: "sarah.kim@rbwr.org", roles: ["reviewer"], countryId: "us", cityId: "chicago", bio: "RBWR Reviewer, corporate and educational record categories.", badges: [] },
  { id: "u12", name: "David Okafor", email: "david.okafor@rbwr.org", roles: ["adjudicator", "rotarian"], countryId: "ke", cityId: "nairobi", clubId: "club-nairobi-central", bio: "Regional adjudicator covering East Africa community-impact attempts.", badges: ["Certified Adjudicator"] },
  { id: "u13", name: "Grace Wanjiru", email: "grace.wanjiru@rcnairobi.org", roles: ["club-admin", "rotarian"], countryId: "ke", cityId: "nairobi", clubId: "club-nairobi-central", bio: "Club Administrator, RC Nairobi Central.", badges: ["Community Champion"] },
  { id: "u14", name: "Liam O'Connor", email: "liam.oconnor@rbwr.org", roles: ["adjudicator"], countryId: "gb", cityId: "london", bio: "International adjudicator, formerly with the Guinness-style verification circuit.", badges: ["Certified Adjudicator"] },
  { id: "u15", name: "Charlotte Hughes", email: "charlotte.hughes@yahoo.co.uk", roles: ["participant"], countryId: "gb", cityId: "london", bio: "Community organizer and record applicant.", badges: [] },
  { id: "u16", name: "Ethan Walker", email: "ethan.walker@rbwr.org", roles: ["adjudicator", "rotarian"], countryId: "au", cityId: "sydney", clubId: "club-sydney-cove", bio: "National adjudicator for Oceania, specializing in marine and outdoor attempts.", badges: ["Certified Adjudicator"] },
  { id: "u17", name: "Isla Campbell", email: "isla.campbell@rid9800.org", roles: ["district-admin", "rotarian"], countryId: "au", cityId: "sydney", clubId: "club-sydney-cove", bio: "District Administrator, Rotary District 9800.", badges: ["Community Champion"] },
  { id: "u18", name: "Maria Santos", email: "maria.santos@gmail.com", roles: ["participant"], countryId: "ph", cityId: "manila", bio: "Youth program coordinator and record applicant.", badges: [] },
  { id: "u19", name: "Jose Reyes", email: "jose.reyes@rbwr.org", roles: ["adjudicator", "rotarian"], countryId: "ph", cityId: "manila", bio: "Regional adjudicator for Southeast Asia.", badges: ["Certified Adjudicator"] },
  { id: "u20", name: "Camila Silva", email: "camila.silva@gmail.com", roles: ["participant"], countryId: "br", cityId: "sao-paulo", bio: "Corporate wellness lead and record applicant.", badges: [] },
  { id: "u21", name: "Lucas Oliveira", email: "lucas.oliveira@rbwr.org", roles: ["adjudicator"], countryId: "br", cityId: "sao-paulo", bio: "Regional adjudicator for South America.", badges: ["Certified Adjudicator"] },
  { id: "u22", name: "Haruto Sato", email: "haruto.sato@rbwr.org", roles: ["adjudicator"], countryId: "jp", cityId: "tokyo", bio: "National adjudicator, precision-measurement specialist.", badges: ["Certified Adjudicator"] },
  { id: "u23", name: "Yuki Tanaka", email: "yuki.tanaka@gmail.com", roles: ["participant"], countryId: "jp", cityId: "tokyo", bio: "Robotics engineer and record applicant.", badges: [] },
  { id: "u24", name: "Arjun Malhotra", email: "arjun.malhotra@gmail.com", roles: ["participant", "rotarian"], countryId: "in", cityId: "mumbai", clubId: "club-bandra", bio: "Marathon organizer and community record applicant.", badges: [] },
  { id: "u25", name: "Neha Kulkarni", email: "neha.kulkarni@rbwr.org", roles: ["reviewer"], countryId: "in", cityId: "mumbai", bio: "Senior RBWR Reviewer overseeing South Asia applications.", badges: [] },
  { id: "u26", name: "Devika Pillai", email: "devika.pillai@rbwr.org", roles: ["adjudicator", "rotarian"], countryId: "in", cityId: "bengaluru", clubId: "club-blr-west", bio: "Regional adjudicator for South India.", badges: ["Certified Adjudicator"] },
  { id: "u27", name: "Ravi Chandran", email: "ravi.chandran@rbwr.org", roles: ["super-admin"], countryId: "in", cityId: "bengaluru", bio: "Regional Super Administrator, South Asia operations.", badges: [] },
  { id: "u28", name: "Emma Richardson", email: "emma.richardson@rcmanhattan.org", roles: ["club-admin", "rotarian"], countryId: "us", cityId: "new-york", clubId: "club-manhattan", bio: "Club Administrator, RC Manhattan.", badges: ["Community Champion"] },
  { id: "u29", name: "Noah Fischer", email: "noah.fischer@gmail.com", roles: ["participant"], countryId: "us", cityId: "chicago", bio: "Corporate events lead and record applicant.", badges: [] },
  { id: "u30", name: "Wanjiku Kamau", email: "wanjiku.kamau@gmail.com", roles: ["participant", "rotarian"], countryId: "ke", cityId: "nairobi", clubId: "club-nairobi-central", bio: "Community-impact organizer, RC Nairobi Central.", badges: [] },
];

export const users: User[] = seeds.map((s, i) => ({
  ...s,
  initials: initialsFor(s.name),
  avatarColor: colorFor(i),
  badges: s.badges ?? [],
}));

export function getUser(id?: string) {
  return users.find((u) => u.id === id);
}

export const avatarColorClasses: Record<AvatarColor, string> = {
  navy: "bg-navy text-white",
  gold: "bg-gold text-navy-deep",
  royal: "bg-royal text-white",
  orange: "bg-orange-warm text-white",
  slate: "bg-slate-600 text-white",
};
