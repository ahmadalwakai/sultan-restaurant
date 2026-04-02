import { PrismaClient } from "@prisma/client";
import { seedLogger } from "./seed-logger";

const tablesToTruncate = [
  "OrderItem",
  "Order",
  "Booking",
  "Review",
  "ContactMessage",
  "MenuItem",
  "Category",
  "Offer",
  "Coupon",
  "GalleryImage",
  "OpeningHours",
  "SiteSetting",
  "SeoSettings",
  "EmailLog",
  "Admin",
  // Don't truncate User, Account, Session, VerificationToken in production
];

export async function cleanupDatabase(prisma: PrismaClient, force = false): Promise<void> {
  if (process.env.NODE_ENV === "production" && !force) {
    seedLogger.error("Cannot truncate tables in production without force flag");
    throw new Error("Cleanup blocked in production");
  }

  seedLogger.info("Cleaning up database...");

  for (const table of tablesToTruncate) {
    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
      seedLogger.table(table, 0);
    } catch {
      // Table might not exist yet
    }
  }

  seedLogger.success("Database cleanup complete");
}

export default cleanupDatabase;
