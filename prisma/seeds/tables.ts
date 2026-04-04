import { PrismaClient } from "@prisma/client";

export async function seedTables(prisma: PrismaClient) {
  console.log("🪑 Seeding restaurant tables...");

  // Create 10 initial tables
  const tables = Array.from({ length: 10 }, (_, i) => ({
    tableNumber: i + 1,
    capacity: i < 4 ? 2 : i < 7 ? 4 : 6, // Tables 1-4: 2 seats, 5-7: 4 seats, 8-10: 6 seats
    isActive: true,
  }));

  for (const table of tables) {
    await prisma.restaurantTable.upsert({
      where: { tableNumber: table.tableNumber },
      update: {},
      create: table,
    });
  }

  console.log(`✅ Created ${tables.length} tables`);
}
