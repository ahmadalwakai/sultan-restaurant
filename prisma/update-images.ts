/**
 * Updates all MenuItem and Category images from placeholder URLs to real Pexels food photos.
 * Run: npx tsx prisma/update-images.ts
 */
import { PrismaClient } from "@prisma/client";
import { getMenuItemImage, getCategoryImage } from "./utils/seed-images";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating menu item images to Pexels photos...\n");

  // Update all menu items
  const items = await prisma.menuItem.findMany({
    include: { category: true },
  });

  let updated = 0;
  for (const item of items) {
    const categorySlug = item.category?.slug || "starters";
    const newImage = getMenuItemImage(item.name, categorySlug);

    if (item.image !== newImage) {
      await prisma.menuItem.update({
        where: { id: item.id },
        data: { image: newImage },
      });
      updated++;
      console.log(`  ✓ ${item.name}`);
    }
  }
  console.log(`\nUpdated ${updated}/${items.length} menu item images.\n`);

  // Update all categories
  const categories = await prisma.category.findMany();
  let catUpdated = 0;
  for (const cat of categories) {
    const newImage = getCategoryImage(cat.slug);
    if (cat.image !== newImage) {
      await prisma.category.update({
        where: { id: cat.id },
        data: { image: newImage },
      });
      catUpdated++;
      console.log(`  ✓ Category: ${cat.name}`);
    }
  }
  console.log(`\nUpdated ${catUpdated}/${categories.length} category images.`);

  // Update offers
  const offers = await prisma.offer.findMany();
  let offerUpdated = 0;
  for (const offer of offers) {
    if (offer.image?.includes("placehold.co")) {
      const { getOfferImage } = await import("./utils/seed-images");
      const newImage = getOfferImage(offer.title);
      await prisma.offer.update({
        where: { id: offer.id },
        data: { image: newImage },
      });
      offerUpdated++;
      console.log(`  ✓ Offer: ${offer.title}`);
    }
  }
  console.log(`\nUpdated ${offerUpdated}/${offers.length} offer images.`);

  console.log("\n✅ All images updated to Pexels photos!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
