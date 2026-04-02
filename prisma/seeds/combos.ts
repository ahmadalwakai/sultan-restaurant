import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

export async function seedCombos(prisma: PrismaClient) {
  seedLogger.info("Seeding combo meals...");

  // Get some menu items to use in combos
  const menuItems = await prisma.menuItem.findMany({ take: 10, orderBy: { sortOrder: "asc" } });
  if (menuItems.length < 4) {
    seedLogger.warn("Not enough menu items to create combos, skipping...");
    return [];
  }

  const combosData = [
    {
      name: "Family Feast Combo",
      slug: "family-feast-combo",
      description: "A generous spread for the whole family. Includes mixed grill platter, hummus, rice, and drinks.",
      price: 39.99,
      servesCount: 4,
      isActive: true,
      items: [
        { menuItemId: menuItems[0].id, quantity: 2 },
        { menuItemId: menuItems[1].id, quantity: 1 },
        { menuItemId: menuItems[2].id, quantity: 1 },
      ],
    },
    {
      name: "Couple's Dinner",
      slug: "couples-dinner",
      description: "Perfect romantic dinner for two with starter, mains, and dessert.",
      price: 29.99,
      servesCount: 2,
      isActive: true,
      items: [
        { menuItemId: menuItems[0].id, quantity: 1 },
        { menuItemId: menuItems[1].id, quantity: 1 },
      ],
    },
    {
      name: "Lunch Box Special",
      slug: "lunch-box-special",
      description: "Quick and tasty lunch combo with a main and side dish.",
      price: 12.99,
      servesCount: 1,
      isActive: true,
      items: [
        { menuItemId: menuItems[0].id, quantity: 1 },
        { menuItemId: menuItems[3]?.id || menuItems[1].id, quantity: 1 },
      ],
    },
  ];

  const combos = [];
  for (const combo of combosData) {
    const { items, ...data } = combo;

    // Calculate original price
    const itemPrices = await Promise.all(
      items.map(async (i) => {
        const mi = await prisma.menuItem.findUnique({ where: { id: i.menuItemId } });
        return mi ? Number(mi.price) * i.quantity : 0;
      })
    );
    const originalPrice = itemPrices.reduce((sum, p) => sum + p, 0);
    const savings = Math.max(0, originalPrice - data.price);

    const created = await prisma.combo.upsert({
      where: { slug: data.slug },
      update: { name: data.name, description: data.description, price: data.price },
      create: {
        ...data,
        originalPrice,
        savings,
        items: { create: items },
      },
    });
    combos.push(created);
  }

  seedLogger.table("Combo", combos.length);
  return combos;
}
