import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

export async function seedDishOfDay(prisma: PrismaClient) {
  seedLogger.info("Seeding dish of the day...");

  const menuItems = await prisma.menuItem.findMany({
    where: { isAvailable: true },
    take: 7,
    orderBy: { sortOrder: "asc" },
  });

  if (menuItems.length === 0) {
    seedLogger.warn("No menu items available, skipping dish of the day...");
    return [];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reasons = [
    "Chef's special recommendation",
    "Fresh seasonal ingredients",
    "Customer favourite",
    "New recipe debut",
    "Weekend special",
    "Limited time offer",
    "Popular choice",
  ];

  const entries = [];
  for (let i = 0; i < Math.min(7, menuItems.length); i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const menuItem = menuItems[i];
    const originalPrice = Number(menuItem.price);
    const discountPrice = Math.round(originalPrice * 0.8 * 100) / 100; // 20% off

    const entry = await prisma.dishOfDay.upsert({
      where: { date },
      update: {
        menuItemId: menuItem.id,
        discountPrice,
        reason: reasons[i],
      },
      create: {
        menuItemId: menuItem.id,
        discountPrice,
        reason: reasons[i],
        date,
      },
    });
    entries.push(entry);
  }

  seedLogger.table("DishOfDay", entries.length);
  return entries;
}
