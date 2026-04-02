import { describe, it, expect } from "vitest";

// Service area check from src/lib/maps/service-radius.ts
const SERVICE_RADIUS_KM = 5;
const RESTAURANT_COORDS = { lat: 55.8642, lng: -4.2518 };

const isWithinServiceArea = (
  lat: number,
  lng: number,
  radiusKm: number = SERVICE_RADIUS_KM
): boolean => {
  const R = 6371;
  const dLat = ((lat - RESTAURANT_COORDS.lat) * Math.PI) / 180;
  const dLng = ((lng - RESTAURANT_COORDS.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((RESTAURANT_COORDS.lat * Math.PI) / 180) *
      Math.cos((lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c <= radiusKm;
};

const calculateDeliveryFee = (distanceKm: number, orderTotal: number): number => {
  if (orderTotal >= 25) return 0; // Free delivery over £25
  const baseFee = 2.99;
  const perKm = 0.5;
  return Math.round((baseFee + distanceKm * perKm) * 100) / 100;
};

describe("Service Area Check", () => {
  it("should include restaurant location", () => {
    expect(isWithinServiceArea(55.8642, -4.2518)).toBe(true);
  });

  it("should include nearby locations within 5km", () => {
    // ~1km away
    expect(isWithinServiceArea(55.8700, -4.2500)).toBe(true);
  });

  it("should exclude far locations", () => {
    // Edinburgh ~65km away
    expect(isWithinServiceArea(55.9533, -3.1883)).toBe(false);
  });

  it("should respect custom radius", () => {
    expect(isWithinServiceArea(55.9000, -4.2518, 10)).toBe(true);
    expect(isWithinServiceArea(55.9000, -4.2518, 2)).toBe(false);
  });
});

describe("Delivery Fee", () => {
  it("should calculate base fee plus per-km charge", () => {
    expect(calculateDeliveryFee(2, 15)).toBe(3.99);
  });

  it("should provide free delivery for orders over £25", () => {
    expect(calculateDeliveryFee(3, 30)).toBe(0);
  });

  it("should provide free delivery at exactly £25", () => {
    expect(calculateDeliveryFee(5, 25)).toBe(0);
  });

  it("should increase with distance", () => {
    const shortFee = calculateDeliveryFee(1, 10);
    const longFee = calculateDeliveryFee(4, 10);
    expect(longFee).toBeGreaterThan(shortFee);
  });
});
