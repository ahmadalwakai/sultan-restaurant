import { testDb } from "./test-db";

const TABLES = [
  "OrderItem",
  "Order",
  "Booking",
  "ComboItem",
  "Combo",
  "DishOfDay",
  "MenuItem",
  "Category",
  "Review",
  "Coupon",
  "Offer",
  "ContactMessage",
  "EmailLog",
  "GalleryImage",
  "SiteSetting",
  "OpeningHours",
  "SeoSettings",
  "Session",
  "Account",
  "User",
  "Admin",
] as const;

export async function cleanTestData() {
  for (const table of TABLES) {
    try {
      await (testDb[table as keyof typeof testDb] as any).deleteMany();
    } catch {
      // Table may not exist in test schema — skip
    }
  }
}
