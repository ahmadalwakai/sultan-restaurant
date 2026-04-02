import { prisma } from "./prisma";

export interface SeedVerificationResult {
  valid: boolean;
  tables: Record<string, { count: number; status: "ok" | "empty" | "error" }>;
  errors: string[];
}

const REQUIRED_SEEDS = {
  category: { min: 1, label: "Categories" },
  menuItem: { min: 1, label: "Menu Items" },
  admin: { min: 1, label: "Admins" },
  siteSetting: { min: 1, label: "Site Settings" },
  openingHours: { min: 1, label: "Opening Hours" },
} as const;

export async function verifySeedData(): Promise<SeedVerificationResult> {
  const errors: string[] = [];
  const tables: Record<string, { count: number; status: "ok" | "empty" | "error" }> = {};

  for (const [model, config] of Object.entries(REQUIRED_SEEDS)) {
    try {
      // @ts-expect-error - dynamic model access
      const count = await prisma[model].count();
      tables[config.label] = {
        count,
        status: count >= config.min ? "ok" : "empty",
      };
      if (count < config.min) {
        errors.push(`${config.label}: expected at least ${config.min}, got ${count}`);
      }
    } catch (error) {
      tables[config.label] = { count: 0, status: "error" };
      errors.push(`${config.label}: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  return {
    valid: errors.length === 0,
    tables,
    errors,
  };
}

export async function getSeededCounts() {
  const [categories, menuItems, offers, coupons, reviews] = await Promise.all([
    prisma.category.count(),
    prisma.menuItem.count(),
    prisma.offer.count(),
    prisma.coupon.count(),
    prisma.review.count({ where: { status: "APPROVED" } }),
  ]);

  return { categories, menuItems, offers, coupons, reviews };
}
