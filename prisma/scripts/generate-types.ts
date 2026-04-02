#!/usr/bin/env npx tsx
/**
 * Type Generation Script
 * Generates additional TypeScript types from database schema
 * Usage: npx tsx prisma/scripts/generate-types.ts
 */

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";

const OUTPUT_PATH = "./src/types/generated";

function generateTypes() {
  console.log(chalk.blue.bold("\n🔧 Type Generation\n"));

  try {
    // 1. Generate Prisma client
    console.log(chalk.gray("Generating Prisma client..."));
    execSync("npx prisma generate", { stdio: "inherit" });

    // 2. Create output directory
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });

    // 3. Generate enum exports
    console.log(chalk.gray("\nGenerating enum exports..."));
    const enumContent = `/**
 * Auto-generated from Prisma schema
 * DO NOT EDIT MANUALLY
 */

export {
  UserRole,
  DiscountType,
  BookingStatus,
  OrderType,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  MessageStatus,
  ReviewStatus,
  EmailStatus,
} from "@prisma/client";

export type {
  User,
  Admin,
  Category,
  MenuItem,
  Order,
  OrderItem,
  Booking,
  Offer,
  Coupon,
  Review,
  ContactMessage,
  GalleryImage,
  SiteSetting,
  OpeningHours,
  SeoSettings,
  EmailLog,
} from "@prisma/client";
`;

    fs.writeFileSync(path.join(OUTPUT_PATH, "prisma.ts"), enumContent);
    console.log(chalk.green("  ✓ prisma.ts"));

    // 4. Generate form input types
    console.log(chalk.gray("\nGenerating form input types..."));
    const inputContent = `/**
 * Form input types derived from Prisma models
 * Auto-generated - DO NOT EDIT MANUALLY
 */

import type { Category, MenuItem, Offer, Coupon, Booking } from "./prisma";

// Create types (omit auto-generated fields)
export type CategoryInput = Omit<Category, "id" | "createdAt" | "updatedAt">;
export type MenuItemInput = Omit<MenuItem, "id" | "createdAt" | "updatedAt">;
export type OfferInput = Omit<Offer, "id" | "createdAt" | "updatedAt">;
export type CouponInput = Omit<Coupon, "id" | "createdAt" | "updatedAt" | "usageCount">;
export type BookingInput = Omit<Booking, "id" | "bookingReference" | "createdAt" | "updatedAt" | "confirmedAt" | "reminderSent">;

// Update types (all fields optional except id)
export type CategoryUpdate = Partial<CategoryInput> & { id: string };
export type MenuItemUpdate = Partial<MenuItemInput> & { id: string };
export type OfferUpdate = Partial<OfferInput> & { id: string };
export type CouponUpdate = Partial<CouponInput> & { id: string };
export type BookingUpdate = Partial<BookingInput> & { id: string };
`;

    fs.writeFileSync(path.join(OUTPUT_PATH, "inputs.ts"), inputContent);
    console.log(chalk.green("  ✓ inputs.ts"));

    // 5. Generate index barrel
    const indexContent = `/**
 * Generated types barrel export
 */
export * from "./prisma";
export * from "./inputs";
`;

    fs.writeFileSync(path.join(OUTPUT_PATH, "index.ts"), indexContent);
    console.log(chalk.green("  ✓ index.ts"));

    console.log(chalk.green.bold(`\n✅ Types generated in ${OUTPUT_PATH}\n`));
  } catch (error) {
    console.error(chalk.red("\n❌ Generation failed:"), error);
    process.exit(1);
  }
}

generateTypes();
