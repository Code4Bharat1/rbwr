import { City, Club, Country, District } from "@/lib/types";

export const countries: Country[] = [
  { id: "in", name: "India", code: "IN", recordCount: 7 },
  { id: "us", name: "United States", code: "US", recordCount: 4 },
  { id: "gb", name: "United Kingdom", code: "GB", recordCount: 2 },
  { id: "au", name: "Australia", code: "AU", recordCount: 2 },
  { id: "ke", name: "Kenya", code: "KE", recordCount: 1 },
  { id: "ph", name: "Philippines", code: "PH", recordCount: 2 },
  { id: "br", name: "Brazil", code: "BR", recordCount: 1 },
  { id: "jp", name: "Japan", code: "JP", recordCount: 1 },
];

export const districts: District[] = [
  {
    id: "d3141",
    number: "3141",
    name: "Mumbai",
    countryIds: ["in"],
    clubIds: ["club-mqn", "club-bandra"],
    memberCount: 3120,
  },
  {
    id: "d3190",
    number: "3190",
    name: "Bengaluru",
    countryIds: ["in"],
    clubIds: ["club-blr-indiranagar", "club-blr-west"],
    memberCount: 2480,
  },
  {
    id: "d7230",
    number: "7230",
    name: "New York & Chicago",
    countryIds: ["us"],
    clubIds: ["club-manhattan", "club-chicago-loop"],
    memberCount: 4210,
  },
  {
    id: "d9800",
    number: "9800",
    name: "Sydney",
    countryIds: ["au"],
    clubIds: ["club-sydney-cove"],
    memberCount: 1860,
  },
  {
    id: "d9212",
    number: "9212",
    name: "Nairobi",
    countryIds: ["ke"],
    clubIds: ["club-nairobi-central"],
    memberCount: 940,
  },
];

export const cities: City[] = [
  { id: "mumbai", name: "Mumbai", countryId: "in", districtId: "d3141" },
  { id: "bengaluru", name: "Bengaluru", countryId: "in", districtId: "d3190" },
  { id: "new-york", name: "New York", countryId: "us", districtId: "d7230" },
  { id: "chicago", name: "Chicago", countryId: "us", districtId: "d7230" },
  { id: "london", name: "London", countryId: "gb" },
  { id: "sydney", name: "Sydney", countryId: "au", districtId: "d9800" },
  { id: "nairobi", name: "Nairobi", countryId: "ke", districtId: "d9212" },
  { id: "manila", name: "Manila", countryId: "ph" },
  { id: "sao-paulo", name: "São Paulo", countryId: "br" },
  { id: "tokyo", name: "Tokyo", countryId: "jp" },
];

export const clubs: Club[] = [
  {
    id: "club-mqn",
    name: "Rotary Club of Mumbai Queens Necklace",
    districtId: "d3141",
    cityId: "mumbai",
    memberCount: 186,
    foundedYear: 1958,
    initials: "MQN",
  },
  {
    id: "club-bandra",
    name: "Rotary Club of Bandra",
    districtId: "d3141",
    cityId: "mumbai",
    memberCount: 124,
    foundedYear: 1971,
    initials: "RCB",
  },
  {
    id: "club-blr-indiranagar",
    name: "Rotary Club of Bengaluru Indiranagar",
    districtId: "d3190",
    cityId: "bengaluru",
    memberCount: 152,
    foundedYear: 1982,
    initials: "BLI",
  },
  {
    id: "club-blr-west",
    name: "Rotary Club of Bengaluru West",
    districtId: "d3190",
    cityId: "bengaluru",
    memberCount: 98,
    foundedYear: 1995,
    initials: "BLW",
  },
  {
    id: "club-manhattan",
    name: "Rotary Club of Manhattan",
    districtId: "d7230",
    cityId: "new-york",
    memberCount: 214,
    foundedYear: 1930,
    initials: "RCM",
  },
  {
    id: "club-chicago-loop",
    name: "Rotary Club of Chicago Loop",
    districtId: "d7230",
    cityId: "chicago",
    memberCount: 175,
    foundedYear: 1915,
    initials: "CHL",
  },
  {
    id: "club-sydney-cove",
    name: "Rotary Club of Sydney Cove",
    districtId: "d9800",
    cityId: "sydney",
    memberCount: 143,
    foundedYear: 1947,
    initials: "SYC",
  },
  {
    id: "club-nairobi-central",
    name: "Rotary Club of Nairobi Central",
    districtId: "d9212",
    cityId: "nairobi",
    memberCount: 88,
    foundedYear: 1966,
    initials: "NBC",
  },
];

export function getCountry(id: string) {
  return countries.find((c) => c.id === id);
}
export function getCity(id: string) {
  return cities.find((c) => c.id === id);
}
export function getDistrict(id: string) {
  return districts.find((d) => d.id === id);
}
export function getClub(id: string) {
  return clubs.find((c) => c.id === id);
}
