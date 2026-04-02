import { PrismaClient } from "@prisma/client";
import { seedLogger, generateSlug, getMenuItemImage } from "../utils";
import { coldStartersItems, hotStartersItems } from "./menu-items-starters";
import { soupsItems } from "./menu-items-soups";
import { saladsItems } from "./menu-items-salads";
import { grillsItems, charcoalGrillExtras } from "./menu-items-grills";
import { shawarmaItems } from "./menu-items-shawarma";
import { houseSpecialsItems, mixedKebabsItems } from "./menu-items-syrian";
import { wrapsItems, hoagiesItems } from "./menu-items-lebanese";
import { indianItems, biryaniItems, sundriesItems } from "./menu-items-indian";
import { qoziItems, traditionalsItems, vegetarianItems, seafoodItems } from "./menu-items-iraqi";
import { pizzaItems } from "./menu-items-pizza";
import { burgersItems } from "./menu-items-burgers";
import { chickenItems } from "./menu-items-chicken";
import { kidsItems } from "./menu-items-kids";
import { sweetsItems, iceCreamItems } from "./menu-items-desserts";
import { softDrinksItems, freshJuicesItems, milkshakesItems, smoothiesItems, mocktailsItems } from "./menu-items-drinks";
import { teaItems, coffeeItems } from "./menu-items-hot-drinks";

export interface MenuItemSeed {
  name: string;
  description?: string;
  price: number;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  spiceLevel?: number;
  allergens?: string[];
}

const categoryItems: Record<string, MenuItemSeed[]> = {
  "cold-starters": coldStartersItems,
  "hot-starters": hotStartersItems,
  soups: soupsItems,
  salads: saladsItems,
  qozi: qoziItems,
  shawarma: shawarmaItems,
  vegetarian: vegetarianItems,
  traditionals: traditionalsItems,
  seafood: seafoodItems,
  "house-specials": houseSpecialsItems,
  grills: [...grillsItems, ...charcoalGrillExtras],
  kebabs: mixedKebabsItems,
  indian: indianItems,
  biryani: biryaniItems,
  sundries: sundriesItems,
  pizza: pizzaItems,
  wraps: wrapsItems,
  hoagies: hoagiesItems,
  burgers: burgersItems,
  "fried-chicken": chickenItems,
  kids: kidsItems,
  sweets: sweetsItems,
  "ice-cream": iceCreamItems,
  "hot-drinks": [...teaItems, ...coffeeItems],
  "soft-drinks": softDrinksItems,
  juices: freshJuicesItems,
  milkshakes: milkshakesItems,
  smoothies: smoothiesItems,
  mocktails: mocktailsItems,
};

export async function seedMenuItems(prisma: PrismaClient) {
  seedLogger.info("Seeding menu items...");

  const categories = await prisma.category.findMany();
  const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));
  const existingSlugs = new Set<string>();

  let totalCount = 0;

  for (const [categorySlug, items] of Object.entries(categoryItems)) {
    const categoryId = categoryMap.get(categorySlug);
    if (!categoryId) {
      seedLogger.warn(`Category not found: ${categorySlug}`);
      continue;
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let slug = generateSlug(item.name);
      let suffix = 1;
      while (existingSlugs.has(slug)) {
        slug = `${generateSlug(item.name)}-${suffix++}`;
      }
      existingSlugs.add(slug);

      await prisma.menuItem.upsert({
        where: { slug },
        update: { price: item.price, description: item.description },
        create: {
          name: item.name,
          slug,
          description: item.description,
          price: item.price,
          categoryId,
          image: getMenuItemImage(item.name, categorySlug),
          isPopular: item.isPopular ?? false,
          isVegetarian: item.isVegetarian ?? false,
          isVegan: item.isVegan ?? false,
          isSpicy: item.isSpicy ?? false,
          spiceLevel: item.spiceLevel ?? 0,
          allergens: item.allergens ?? [],
          sortOrder: i,
          isAvailable: true,
        },
      });
      totalCount++;
    }
  }

  seedLogger.table("MenuItem", totalCount);
}
