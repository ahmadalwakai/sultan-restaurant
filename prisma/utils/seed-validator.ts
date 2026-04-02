import { seedLogger } from "./seed-logger";

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateCategory(cat: { name: string; slug: string }): ValidationResult {
  const errors: string[] = [];
  if (!cat.name || cat.name.length < 2) errors.push("Category name too short");
  if (!cat.slug || !/^[a-z0-9-]+$/.test(cat.slug)) errors.push("Invalid slug format");
  return { valid: errors.length === 0, errors };
}

export function validateMenuItem(item: { name: string; price: number; categoryId: string }): ValidationResult {
  const errors: string[] = [];
  if (!item.name || item.name.length < 2) errors.push("Item name too short");
  if (typeof item.price !== "number" || item.price < 0) errors.push("Invalid price");
  if (!item.categoryId) errors.push("Missing categoryId");
  return { valid: errors.length === 0, errors };
}

export function validateOffer(offer: { title: string; discount: number }): ValidationResult {
  const errors: string[] = [];
  if (!offer.title) errors.push("Missing title");
  if (offer.discount < 0 || offer.discount > 100) errors.push("Invalid discount");
  return { valid: errors.length === 0, errors };
}

export function runValidation<T>(items: T[], validator: (item: T) => ValidationResult, label: string): void {
  let hasErrors = false;
  items.forEach((item, i) => {
    const result = validator(item);
    if (!result.valid) {
      hasErrors = true;
      seedLogger.error(`${label}[${i}]: ${result.errors.join(", ")}`);
    }
  });
  if (hasErrors) throw new Error(`Validation failed for ${label}`);
}

export async function validateAllSeeds(prisma: { category: { count: () => Promise<number> }; menuItem: { count: () => Promise<number> }; admin: { count: () => Promise<number> }; siteSetting: { count: () => Promise<number> } }): Promise<boolean> {
  seedLogger.info("Validating seeded data...");
  
  const checks = [
    { name: "Categories", count: await prisma.category.count(), min: 1 },
    { name: "Menu Items", count: await prisma.menuItem.count(), min: 1 },
    { name: "Admin Users", count: await prisma.admin.count(), min: 1 },
    { name: "Site Settings", count: await prisma.siteSetting.count(), min: 1 },
  ];

  let allValid = true;
  for (const check of checks) {
    if (check.count >= check.min) {
      seedLogger.success(`✓ ${check.name}: ${check.count} records`);
    } else {
      seedLogger.error(`✗ ${check.name}: expected at least ${check.min}, got ${check.count}`);
      allValid = false;
    }
  }

  return allValid;
}
