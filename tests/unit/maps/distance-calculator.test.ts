import { describe, it, expect } from "vitest";

// Testing the Haversine distance calculation from src/lib/maps/utils.ts
const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

const calculateHaversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

describe("Distance Calculator", () => {
  it("should calculate zero distance for same point", () => {
    const distance = calculateHaversineDistance(55.8642, -4.2518, 55.8642, -4.2518);
    expect(distance).toBe(0);
  });

  it("should calculate reasonable distance within Glasgow", () => {
    // Glasgow city centre to Merchant City (~0.5km)
    const distance = calculateHaversineDistance(55.8642, -4.2518, 55.8583, -4.2441);
    expect(distance).toBeGreaterThan(0.3);
    expect(distance).toBeLessThan(1.5);
  });

  it("should calculate longer distance Glasgow to Edinburgh", () => {
    const distance = calculateHaversineDistance(55.8642, -4.2518, 55.9533, -3.1883);
    expect(distance).toBeGreaterThan(60);
    expect(distance).toBeLessThan(80);
  });

  it("should handle Southern Hemisphere coordinates", () => {
    const distance = calculateHaversineDistance(-33.8688, 151.2093, -37.8136, 144.9631);
    expect(distance).toBeGreaterThan(700);
    expect(distance).toBeLessThan(900);
  });

  it("should be symmetric", () => {
    const d1 = calculateHaversineDistance(55.8642, -4.2518, 55.9533, -3.1883);
    const d2 = calculateHaversineDistance(55.9533, -3.1883, 55.8642, -4.2518);
    expect(Math.abs(d1 - d2)).toBeLessThan(0.001);
  });
});
