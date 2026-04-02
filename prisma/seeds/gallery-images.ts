import { PrismaClient } from "@prisma/client";
import { seedLogger, getGalleryImage } from "../utils";

const galleryData = [
  { alt: "Mixed Grill Platter", caption: "Our signature mixed grill" },
  { alt: "Restaurant Interior", caption: "Warm, welcoming atmosphere" },
  { alt: "Fresh Shawarma", caption: "Freshly carved shawarma" },
  { alt: "Dessert Selection", caption: "Traditional Middle Eastern sweets" },
  { alt: "Chef at Work", caption: "Crafted with passion" },
  { alt: "Family Dining", caption: "Perfect for family gatherings" },
  { alt: "Mezze Spread", caption: "Authentic mezze selection" },
  { alt: "Outdoor Seating", caption: "Al fresco dining available" },
];

export async function seedGalleryImages(prisma: PrismaClient) {
  seedLogger.info("Seeding gallery images...");

  await prisma.galleryImage.deleteMany({});

  const images = await Promise.all(
    galleryData.map((g, i) =>
      prisma.galleryImage.create({
        data: {
          url: getGalleryImage(i),
          alt: g.alt,
          caption: g.caption,
          sortOrder: i,
          isVisible: true,
        },
      })
    )
  );

  seedLogger.table("GalleryImage", images.length);
  return images;
}
