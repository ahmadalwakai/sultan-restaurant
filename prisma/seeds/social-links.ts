import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

const socialLinksData = [
  { key: "whatsapp", value: "https://wa.me/442012345678", group: "social" },
  { key: "instagram", value: "https://instagram.com/sultanrestaurant", group: "social" },
  { key: "facebook", value: "https://facebook.com/sultanrestaurant", group: "social" },
  { key: "twitter", value: "https://twitter.com/sultanrest", group: "social" },
  { key: "tripadvisor", value: "https://tripadvisor.com/Restaurant-Sultan", group: "social" },
  { key: "googleMaps", value: "https://maps.google.com/?q=Sultan+Restaurant+London", group: "social" },
];

export async function seedSocialLinks(prisma: PrismaClient) {
  seedLogger.info("Seeding social links...");

  const links = await Promise.all(
    socialLinksData.map((s) =>
      prisma.siteSetting.upsert({
        where: { key: s.key },
        update: { value: s.value },
        create: s,
      })
    )
  );

  seedLogger.table("SocialLinks", links.length);
  return links;
}
