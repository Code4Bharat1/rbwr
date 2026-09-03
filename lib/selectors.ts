import {
  applications,
  attempts,
  certificates,
  cities,
  countries,
  getClub,
  getCountry,
  getDistrict,
  getUser,
  records,
} from "@/lib/data";
import { Application, Attempt, WorldRecord } from "@/lib/types";

export function getApplicationForAttempt(attempt: Attempt): Application | undefined {
  return applications.find((a) => a.id === attempt.applicationId);
}

export function getRecordForApplication(app?: Application): WorldRecord | undefined {
  if (!app?.recordId) return undefined;
  return records.find((r) => r.id === app.recordId);
}

export function getAttemptTitle(attempt: Attempt): string {
  const app = getApplicationForAttempt(attempt);
  const record = getRecordForApplication(app);
  return record?.title ?? app?.proposedTitle ?? "Untitled Attempt";
}

export function getLiveAttempts() {
  return attempts.filter((a) => a.status === "live");
}

export function getUpcomingAttempts() {
  return attempts
    .filter((a) => a.status === "scheduled")
    .sort((a, b) => (a.date < b.date ? -1 : 1));
}

export function getCompletedAttempts() {
  return attempts
    .filter((a) => a.status === "completed")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedRecords(): WorldRecord[] {
  const featuredIds = [
    "RBWR-IND-MH-MUM-2026-00427",
    "RBWR-USA-NY-NYC-2025-00118",
    "RBWR-AUS-NSW-SYD-2025-00204",
    "RBWR-KEN-NBO-NBO-2023-00051",
    "RBWR-BRA-SP-SAO-2024-00077",
    "RBWR-IND-KA-BLR-2025-00199",
  ];
  return featuredIds
    .map((id) => records.find((r) => r.id === id))
    .filter((r): r is WorldRecord => Boolean(r));
}

export function getRecordsForUser(userId: string) {
  return records.filter((r) => r.holderUserId === userId);
}

export function getCertificatesForUser(userId: string) {
  return certificates.filter((c) => c.holderUserId === userId);
}

export function getApplicationsForUser(userId: string) {
  return applications.filter((a) => a.applicantUserId === userId);
}

export function getAttemptsForAdjudicator(userId: string) {
  return attempts.filter((a) => a.adjudicatorId === userId);
}

export function getAttemptsForApplicant(userId: string) {
  const myAppIds = new Set(applications.filter((a) => a.applicantUserId === userId).map((a) => a.id));
  return attempts.filter((a) => myAppIds.has(a.applicationId));
}

export function getRecordsForClub(clubId: string) {
  return records.filter((r) => r.holderClubId === clubId);
}

export function getRecordsForDistrict(districtId: string) {
  return records.filter((r) => districtIdForRecord(r) === districtId);
}

export type LeaderboardEntry = {
  id: string;
  name: string;
  subtitle: string;
  recordCount: number;
  points: number;
};

/**
 * Leaderboards are computed from verified records only (SRS §13: "Leaderboard
 * calculations must be configurable and based on verified records only").
 * A record's `verified` flag — not just its display `status` — is the source
 * of truth, so a pending/unverified attempt never contributes points.
 */
const verifiedRecords = records.filter((r) => r.verified);

/** Points model: 100 per current record held, 20 per historical/broken record once held. */
function pointsFor(recordsHeld: WorldRecord[]) {
  return recordsHeld.reduce((sum, r) => sum + (r.status === "current" ? 100 : 20), 0);
}

export function getIndividualLeaderboard(): LeaderboardEntry[] {
  const byUser = new Map<string, WorldRecord[]>();
  for (const r of verifiedRecords) {
    if (!r.holderUserId) continue;
    byUser.set(r.holderUserId, [...(byUser.get(r.holderUserId) ?? []), r]);
  }
  return [...byUser.entries()]
    .map(([userId, recs]) => {
      const user = getUser(userId);
      const country = user ? getCountry(user.countryId) : undefined;
      return {
        id: userId,
        name: user?.name ?? "Unknown",
        subtitle: country ? `${country.flag} ${country.name}` : "",
        recordCount: recs.length,
        points: pointsFor(recs),
      };
    })
    .sort((a, b) => b.points - a.points);
}

export function getClubLeaderboard(): LeaderboardEntry[] {
  const byClub = new Map<string, WorldRecord[]>();
  for (const r of verifiedRecords) {
    if (!r.holderClubId) continue;
    byClub.set(r.holderClubId, [...(byClub.get(r.holderClubId) ?? []), r]);
  }
  return [...byClub.entries()]
    .map(([clubId, recs]) => {
      const club = getClub(clubId);
      const country = getCountry(recs[0].countryId);
      return {
        id: clubId,
        name: club?.name ?? "Unknown Club",
        subtitle: country ? `${country.flag} ${country.name}` : "",
        recordCount: recs.length,
        points: pointsFor(recs),
      };
    })
    .sort((a, b) => b.points - a.points);
}

export function getCityLeaderboard(): LeaderboardEntry[] {
  const byCity = new Map<string, WorldRecord[]>();
  for (const r of verifiedRecords) {
    byCity.set(r.cityId, [...(byCity.get(r.cityId) ?? []), r]);
  }
  return [...byCity.entries()]
    .map(([cityId, recs]) => {
      const country = getCountry(recs[0].countryId);
      return {
        id: cityId,
        name: cityId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        subtitle: country ? `${country.flag} ${country.name}` : "",
        recordCount: recs.length,
        points: pointsFor(recs),
      };
    })
    .sort((a, b) => b.points - a.points);
}

export function getCountryLeaderboard(): LeaderboardEntry[] {
  const byCountry = new Map<string, WorldRecord[]>();
  for (const r of verifiedRecords) {
    byCountry.set(r.countryId, [...(byCountry.get(r.countryId) ?? []), r]);
  }
  return [...byCountry.entries()]
    .map(([countryId, recs]) => {
      const country = getCountry(countryId);
      return {
        id: countryId,
        name: country ? `${country.flag} ${country.name}` : countryId,
        subtitle: `${recs.length} records`,
        recordCount: recs.length,
        points: pointsFor(recs),
      };
    })
    .sort((a, b) => b.points - a.points);
}

export function districtIdForRecord(r: WorldRecord): string | undefined {
  if (r.holderClubId) return getClub(r.holderClubId)?.districtId;
  return cities.find((c) => c.id === r.cityId)?.districtId;
}

export function getDistrictLeaderboard(): LeaderboardEntry[] {
  const byDistrict = new Map<string, WorldRecord[]>();
  for (const r of verifiedRecords) {
    const districtId = districtIdForRecord(r);
    if (!districtId) continue;
    byDistrict.set(districtId, [...(byDistrict.get(districtId) ?? []), r]);
  }
  return [...byDistrict.entries()]
    .map(([districtId, recs]) => {
      const district = getDistrict(districtId);
      return {
        id: districtId,
        name: district ? `District ${district.number} — ${district.name}` : districtId,
        subtitle: `${recs.length} records`,
        recordCount: recs.length,
        points: pointsFor(recs),
      };
    })
    .sort((a, b) => b.points - a.points);
}

export function getCategoryLeaderboard(): LeaderboardEntry[] {
  const byCategory = new Map<string, WorldRecord[]>();
  for (const r of verifiedRecords) {
    byCategory.set(r.categoryId, [...(byCategory.get(r.categoryId) ?? []), r]);
  }
  return [...byCategory.entries()]
    .map(([categoryId, recs]) => ({
      id: categoryId,
      name: categoryId,
      subtitle: `${recs.length} records`,
      recordCount: recs.length,
      points: pointsFor(recs),
    }))
    .sort((a, b) => b.points - a.points);
}

export const allCountriesSorted = () => [...countries].sort((a, b) => a.name.localeCompare(b.name));
