import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

const socialLinksData = [
  { key: "whatsapp", value: "https://wa.me/message/FCSKZ3PZSJTMI1", group: "social" },
  { key: "instagram", value: "https://www.instagram.com/sultan.restaurants?igsh=MWw3b3YwZmFjcHh6Zg==", group: "social" },
  { key: "facebook", value: "https://www.facebook.com/share/1HDKRSvdoC/", group: "social" },
  { key: "tiktok", value: "https://www.tiktok.com/@sultanrestaurant.glasgow?_r=1&_t=ZN-95F3iqpZPde", group: "social" },
  { key: "tripadvisor", value: "https://tripadvisor.com/Restaurant-Sultan", group: "social" },
  { key: "googleMaps", value: "https://maps.google.com/?q=Sultan+Restaurant+577+Gallowgate+Glasgow", group: "social" },
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
