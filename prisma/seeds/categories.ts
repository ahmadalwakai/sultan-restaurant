import { PrismaClient } from "@prisma/client";
import { seedLogger, getCategoryImage, generateSlug } from "../utils";

export const categoriesData = [
  { name: "Popular", slug: "popular", description: "Customer favourites", sortOrder: 0 },
  { name: "Cold Starters", slug: "cold-starters", description: "Mezza & cold appetizers", sortOrder: 1 },
  { name: "Hot Starters", slug: "hot-starters", description: "Warm appetizers", sortOrder: 2 },
  { name: "Soups", slug: "soups", description: "Traditional soups", sortOrder: 3 },
  { name: "Salads", slug: "salads", description: "Fresh salads", sortOrder: 4 },
  { name: "Qozi", slug: "qozi", description: "Traditional Qozi dishes", sortOrder: 5 },
  { name: "Shawarma Dishes", slug: "shawarma", description: "Shawarma plates", sortOrder: 6 },
  { name: "Vegetarian", slug: "vegetarian", description: "Meat-free mains", sortOrder: 7 },
  { name: "Traditionals", slug: "traditionals", description: "Traditional dishes", sortOrder: 8 },
  { name: "Seafood", slug: "seafood", description: "Fresh seafood", sortOrder: 9 },
  { name: "House Specials", slug: "house-specials", description: "Chef recommendations", sortOrder: 10 },
  { name: "Charcoal & Grills", slug: "grills", description: "Mashawi & grilled meats", sortOrder: 11 },
  { name: "Mixed Kebabs", slug: "kebabs", description: "Kebab platters", sortOrder: 12 },
  { name: "Indian Cuisine", slug: "indian", description: "Indian curries", sortOrder: 13 },
  { name: "Biryani", slug: "biryani", description: "Aromatic rice dishes", sortOrder: 14 },
  { name: "Sundries", slug: "sundries", description: "Sides & extras", sortOrder: 15 },
  { name: "Pizza", slug: "pizza", description: "Fresh pizzas", sortOrder: 16 },
  { name: "Wraps", slug: "wraps", description: "Filled wraps", sortOrder: 17 },
  { name: "Hoagies & Calzones", slug: "hoagies", description: "Stuffed breads", sortOrder: 18 },
  { name: "Burgers", slug: "burgers", description: "Gourmet burgers", sortOrder: 19 },
  { name: "Southern Fried Chicken", slug: "fried-chicken", description: "Crispy fried chicken", sortOrder: 20 },
  { name: "Kids Menu", slug: "kids", description: "For the little ones", sortOrder: 21 },
  { name: "Sweets", slug: "sweets", description: "Middle Eastern sweets", sortOrder: 22 },
  { name: "Ice Cream", slug: "ice-cream", description: "Ice cream & sorbets", sortOrder: 23 },
  { name: "Hot Drinks", slug: "hot-drinks", description: "Tea & coffee", sortOrder: 24 },
  { name: "Soft Drinks", slug: "soft-drinks", description: "Cold beverages", sortOrder: 25 },
  { name: "Fresh Juices", slug: "juices", description: "Freshly squeezed", sortOrder: 26 },
  { name: "Milkshakes", slug: "milkshakes", description: "Creamy shakes", sortOrder: 27 },
  { name: "Smoothies", slug: "smoothies", description: "Fruit smoothies", sortOrder: 28 },
  { name: "Mocktails", slug: "mocktails", description: "Non-alcoholic cocktails", sortOrder: 29 },
];

export async function seedCategories(prisma: PrismaClient) {
  seedLogger.info("Seeding categories...");

  const categories = await Promise.all(
    categoriesData.map((cat) =>
      prisma.category.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name, description: cat.description, sortOrder: cat.sortOrder },
        create: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          image: getCategoryImage(cat.slug),
          sortOrder: cat.sortOrder,
          isActive: true,
        },
      })
    )
  );

  seedLogger.table("Category", categories.length);
  return categories;
}
