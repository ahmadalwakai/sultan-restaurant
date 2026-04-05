import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const settings = [
    { key: "pickupEnabled", value: "true", group: "ordering" },
    { key: "deliveryEnabled", value: "true", group: "ordering" },
    { key: "pickupPauseMessage", value: "Pickup is temporarily unavailable. Please try again later.", group: "ordering" },
    { key: "deliveryPauseMessage", value: "Delivery is temporarily unavailable. Please try again later.", group: "ordering" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, group: s.group },
      create: s,
    });
    console.log(`✓ ${s.key}`);
  }

  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
