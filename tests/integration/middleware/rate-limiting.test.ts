import { describe, it, expect } from "vitest";

describe("Rate Limiting", () => {
  const MAX_REQUESTS = 100;
  const WINDOW_MS = 60 * 1000;

  const rateLimiter = () => {
    const requests = new Map<string, { count: number; resetAt: number }>();

    return {
      check: (ip: string): boolean => {
        const now = Date.now();
        const entry = requests.get(ip);
        if (!entry || now > entry.resetAt) {
          requests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
          return true;
        }
        entry.count++;
        return entry.count <= MAX_REQUESTS;
      },
    };
  };

  it("should allow requests under limit", () => {
    const limiter = rateLimiter();
    expect(limiter.check("1.2.3.4")).toBe(true);
  });

  it("should block after exceeding limit", () => {
    const limiter = rateLimiter();
    for (let i = 0; i < MAX_REQUESTS; i++) {
      limiter.check("1.2.3.4");
    }
    expect(limiter.check("1.2.3.4")).toBe(false);
  });

  it("should track IPs independently", () => {
    const limiter = rateLimiter();
    for (let i = 0; i < MAX_REQUESTS; i++) {
      limiter.check("1.2.3.4");
    }
    expect(limiter.check("5.6.7.8")).toBe(true);
  });
});
