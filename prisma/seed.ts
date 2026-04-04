import { PrismaClient } from "@prisma/client";
import { seedLogger, cleanupDatabase, validateAllSeeds } from "./utils";
import { seedCategories } from "./seeds/categories";
import { seedAdminUser } from "./seeds/admin-user";
import { seedOpeningHours } from "./seeds/opening-hours";
import { seedSiteSettings } from "./seeds/site-settings";
import { seedOffers } from "./seeds/offers";
import { seedCoupons } from "./seeds/coupons";
import { seedSocialLinks } from "./seeds/social-links";
import { seedDeliveryPartners } from "./seeds/delivery-partners";
import { seedSeoSettings } from "./seeds/seo-settings";
import { seedMenuItems } from "./seeds/menu-items";
import { seedReviews } from "./seeds/reviews";
import { seedGalleryImages } from "./seeds/gallery-images";
import { seedSampleCustomers } from "./seeds/sample-customers";
import { seedSampleBookings } from "./seeds/sample-bookings";
import { seedSampleOrders } from "./seeds/sample-orders";
import { seedSampleMessages } from "./seeds/sample-messages";
import { seedCombos } from "./seeds/combos";
import { seedDishOfDay } from "./seeds/dish-of-day";
import { seedTables } from "./seeds/tables";

const prisma = new PrismaClient();

type SeedMode = "minimal" | "full" | "dev";

async function main() {
  const args = process.argv.slice(2);
  const mode: SeedMode = (args[0] as SeedMode) || "full";
  const shouldClean = args.includes("--clean") || args.includes("-c");
  const skipValidation = args.includes("--no-validate");

  seedLogger.header("Sultan Restaurant Database Seeder");
  seedLogger.info(`Mode: ${mode.toUpperCase()}`);

  try {
    if (shouldClean) {
      seedLogger.info("Cleaning existing data...");
      await cleanupDatabase(prisma);
    }

    // Core seeds (always run)
    seedLogger.section("Core Data");
    await seedCategories(prisma);
    await seedAdminUser(prisma);
    await seedOpeningHours(prisma);
    await seedSiteSettings(prisma);
    await seedTables(prisma);

    // Full mode: add offers, coupons, etc.
    if (mode === "full" || mode === "dev") {
      seedLogger.section("Business Data");
      await seedOffers(prisma);
      await seedCoupons(prisma);
      await seedSocialLinks(prisma);
      await seedDeliveryPartners(prisma);
      await seedSeoSettings(prisma);

      seedLogger.section("Menu Items");
      await seedMenuItems(prisma);

      seedLogger.section("Content");
      await seedReviews(prisma);
      await seedGalleryImages(prisma);

      seedLogger.section("Combos & Specials");
      await seedCombos(prisma);
      await seedDishOfDay(prisma);
    }

    // Dev mode: add sample data for testing
    if (mode === "dev") {
      seedLogger.section("Development Sample Data");
      seedLogger.warn("Adding sample data - DO NOT use in production!");
      await seedSampleCustomers(prisma);
      await seedSampleBookings(prisma);
      await seedSampleOrders(prisma);
      await seedSampleMessages(prisma);
    }

    // Validate seeds
    if (!skipValidation) {
      seedLogger.section("Validation");
      const isValid = await validateAllSeeds(prisma);
      if (!isValid) {
        seedLogger.error("Seed validation failed!");
        process.exit(1);
      }
    }

    seedLogger.success("\nDatabase seeding completed successfully!");
  } catch (error) {
    seedLogger.error(`Seeding failed: ${error}`);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
