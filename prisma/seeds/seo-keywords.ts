import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

const keywordsData = [
  {
    key: "seoKeywords_home",
    value: "middle eastern restaurant london, syrian food, lebanese restaurant, indian cuisine, halal restaurant, shawarma near me",
    group: "seo",
  },
  {
    key: "seoKeywords_menu",
    value: "middle eastern menu, halal food menu, grills, shawarma, biryani, kebab, falafel, hummus",
    group: "seo",
  },
  {
    key: "seoKeywords_book",
    value: "book table london, restaurant reservation, middle eastern dining, group booking",
    group: "seo",
  },
  {
    key: "seoKeywords_offers",
    value: "restaurant deals, food offers, discount code, lunch special, family meal deal",
    group: "seo",
  },
];

export async function seedSeoKeywords(prisma: PrismaClient) {
  seedLogger.info("Seeding SEO keywords...");

  const keywords = await Promise.all(
    keywordsData.map((k) =>
      prisma.siteSetting.upsert({
        where: { key: k.key },
        update: { value: k.value },
        create: k,
      })
    )
  );

  seedLogger.table("SeoKeywords", keywords.length);
  return keywords;
}
