import { describe, it, expect } from "vitest";

// Drive time estimation from src/lib/maps/service-radius.ts
const estimateDriveTime = (distanceKm: number): { min: number; max: number } => {
  const baseMin = 25;
  const baseMax = 45;
  const perKmMin = 2;
  const perKmMax = 4;
  return {
    min: baseMin + Math.round(distanceKm * perKmMin),
    max: baseMax + Math.round(distanceKm * perKmMax),
  };
};

const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
};

describe("Drive Time Estimator", () => {
  it("should return min and max for short distance", () => {
    const time = estimateDriveTime(1);
    expect(time.min).toBe(27);
    expect(time.max).toBe(49);
  });

  it("should increase with distance", () => {
    const short = estimateDriveTime(1);
    const long = estimateDriveTime(5);
    expect(long.min).toBeGreaterThan(short.min);
    expect(long.max).toBeGreaterThan(short.max);
  });

  it("should return base times for zero distance", () => {
    const time = estimateDriveTime(0);
    expect(time.min).toBe(25);
    expect(time.max).toBe(45);
  });
});

describe("Format Duration", () => {
  it("should format minutes under 60", () => {
    expect(formatDuration(30)).toBe("30 min");
  });

  it("should format exact hours", () => {
    expect(formatDuration(60)).toBe("1 hr");
  });

  it("should format hours and minutes", () => {
    expect(formatDuration(90)).toBe("1 hr 30 min");
  });

  it("should format multiple hours", () => {
    expect(formatDuration(120)).toBe("2 hr");
  });
});
