import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Shisha seed data with temporary pricing based on Glasgow market research
// Classic Shisha: £20-22, Premium/Frozen: £25, House Special: £28-30
// Espresso: £2.50-3.00, Tea: £2.50-3.50, Fresh Juices: £4-5, Mocktails: £5.95-6.50

async function seedShisha() {
  console.log("🌬️ Seeding Shisha data...");

  // Create 10 shisha tables
  const tables = [];
  for (let i = 1; i <= 10; i++) {
    const table = await prisma.shishaTable.upsert({
      where: { tableNumber: i },
      update: {},
      create: {
        tableNumber: i,
        name: i <= 2 ? `VIP ${i}` : i <= 4 ? `Premium ${i}` : undefined,
        capacity: i <= 2 ? 6 : i <= 4 ? 4 : 4,
        status: "AVAILABLE",
        isActive: true,
        notes: i <= 2 ? "Premium corner seating with privacy" : undefined,
      },
    });
    tables.push(table);
  }
  console.log(`   ✓ Created ${tables.length} shisha tables`);

  // Create categories
  const categories = [
    {
      name: "Classic Shisha",
      slug: "classic-shisha",
      description: "Traditional flavors crafted to perfection",
      sortOrder: 1,
      isActive: true,
    },
    {
      name: "Premium Shisha",
      slug: "premium-shisha",
      description: "Premium blends with exotic flavors",
      sortOrder: 2,
      isActive: true,
    },
    {
      name: "Frozen Shisha",
      slug: "frozen-shisha",
      description: "Ice-cold experience with refreshing flavors",
      sortOrder: 3,
      isActive: true,
    },
    {
      name: "Fruit Head",
      slug: "fruit-head",
      description: "Served in fresh fruit bowls for an authentic experience",
      sortOrder: 4,
      isActive: true,
    },
    {
      name: "Hot Drinks",
      slug: "hot-drinks",
      description: "Premium teas and coffees",
      sortOrder: 5,
      isActive: true,
    },
    {
      name: "Cold Drinks",
      slug: "cold-drinks",
      description: "Refreshing cold beverages",
      sortOrder: 6,
      isActive: true,
    },
    {
      name: "Fresh Juices",
      slug: "fresh-juices",
      description: "Freshly squeezed juices made to order",
      sortOrder: 7,
      isActive: true,
    },
    {
      name: "Mocktails",
      slug: "mocktails",
      description: "Creative non-alcoholic cocktails",
      sortOrder: 8,
      isActive: true,
    },
  ];

  const createdCategories: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.shishaCategory.upsert({
      where: { slug: cat.slug },
      update: { ...cat },
      create: { ...cat },
    });
    createdCategories[cat.slug] = created.id;
  }
  console.log(`   ✓ Created ${categories.length} categories`);

  // Create menu items
  const menuItems = [
    // Classic Shisha - £20-22
    { category: "classic-shisha", name: "Double Apple", description: "The iconic traditional blend with rich anise notes", price: 20, intensity: 3, tags: ["classic", "popular"], isFeatured: true },
    { category: "classic-shisha", name: "Mint", description: "Cool and refreshing pure mint experience", price: 20, intensity: 2, tags: ["refreshing", "cool"] },
    { category: "classic-shisha", name: "Grape", description: "Sweet and aromatic grape flavor", price: 20, intensity: 3, tags: ["sweet", "fruity"] },
    { category: "classic-shisha", name: "Watermelon", description: "Fresh and juicy summer watermelon", price: 20, intensity: 2, tags: ["fruity", "refreshing"] },
    { category: "classic-shisha", name: "Lemon", description: "Zesty citrus burst", price: 20, intensity: 2, tags: ["citrus", "fresh"] },
    { category: "classic-shisha", name: "Blueberry", description: "Sweet wild blueberry", price: 22, intensity: 3, tags: ["sweet", "berry"] },
    { category: "classic-shisha", name: "Peach", description: "Soft and sweet peach flavor", price: 22, intensity: 2, tags: ["sweet", "fruity"] },
    { category: "classic-shisha", name: "Strawberry", description: "Fresh strawberry sweetness", price: 22, intensity: 2, tags: ["sweet", "berry"] },

    // Premium Shisha - £25
    { category: "premium-shisha", name: "Sultan's Mix", description: "Our signature house blend - a secret recipe of exotic fruits and spices", price: 28, intensity: 4, tags: ["signature", "exotic"], isFeatured: true },
    { category: "premium-shisha", name: "Paan Rasna", description: "Traditional Indian paan with aromatic spices", price: 25, intensity: 4, tags: ["exotic", "spicy"] },
    { category: "premium-shisha", name: "Royal Rose", description: "Delicate rose petals with hints of cardamom", price: 25, intensity: 2, tags: ["floral", "elegant"] },
    { category: "premium-shisha", name: "Tropical Paradise", description: "Mango, pineapple and passion fruit blend", price: 25, intensity: 3, tags: ["tropical", "fruity"] },
    { category: "premium-shisha", name: "Arabian Nights", description: "Dates and honey with subtle spices", price: 28, intensity: 4, tags: ["exotic", "traditional"] },
    { category: "premium-shisha", name: "Golden Amber", description: "Rich amber with vanilla undertones", price: 28, intensity: 3, tags: ["rich", "smooth"] },

    // Frozen Shisha - £25
    { category: "frozen-shisha", name: "Frozen Mint", description: "Ice-cold mint for the ultimate cool experience", price: 25, intensity: 2, tags: ["frozen", "refreshing"], isFeatured: true },
    { category: "frozen-shisha", name: "Frozen Grape", description: "Chilled grape with icy freshness", price: 25, intensity: 2, tags: ["frozen", "fruity"] },
    { category: "frozen-shisha", name: "Frozen Double Apple", description: "Classic double apple served frozen", price: 25, intensity: 3, tags: ["frozen", "classic"] },
    { category: "frozen-shisha", name: "Frozen Berry Blast", description: "Mixed berries with an icy twist", price: 25, intensity: 2, tags: ["frozen", "berry"] },
    { category: "frozen-shisha", name: "Frozen Watermelon", description: "Crisp watermelon chilled to perfection", price: 25, intensity: 2, tags: ["frozen", "summer"] },

    // Fruit Head - £30
    { category: "fruit-head", name: "Pineapple Head", description: "Served in a fresh pineapple with tropical flavors", price: 30, intensity: 3, tags: ["fruit-bowl", "tropical"], isFeatured: true },
    { category: "fruit-head", name: "Orange Head", description: "Fresh orange bowl with citrus blend", price: 30, intensity: 2, tags: ["fruit-bowl", "citrus"] },
    { category: "fruit-head", name: "Melon Head", description: "Honeydew melon bowl with fresh melon mix", price: 30, intensity: 2, tags: ["fruit-bowl", "refreshing"] },
    { category: "fruit-head", name: "Apple Head", description: "Green apple bowl with mixed apple flavors", price: 30, intensity: 3, tags: ["fruit-bowl", "classic"] },

    // Hot Drinks - £2.50-3.50
    { category: "hot-drinks", name: "Espresso", description: "Rich single shot espresso", price: 2.50, tags: ["coffee"] },
    { category: "hot-drinks", name: "Double Espresso", description: "Intense double shot", price: 3.00, tags: ["coffee", "strong"] },
    { category: "hot-drinks", name: "Cappuccino", description: "Espresso with steamed milk and foam", price: 3.00, tags: ["coffee", "milk"] },
    { category: "hot-drinks", name: "Latte", description: "Smooth espresso with silky milk", price: 3.00, tags: ["coffee", "milk"] },
    { category: "hot-drinks", name: "Turkish Coffee", description: "Traditional unfiltered coffee", price: 3.50, tags: ["coffee", "traditional"], isFeatured: true },
    { category: "hot-drinks", name: "Moroccan Mint Tea", description: "Fresh mint with green tea", price: 3.50, tags: ["tea", "mint"] },
    { category: "hot-drinks", name: "Black Tea", description: "Classic black tea", price: 2.50, tags: ["tea"] },
    { category: "hot-drinks", name: "Karak Chai", description: "Spiced Indian tea with cardamom", price: 3.50, tags: ["tea", "spiced"] },

    // Cold Drinks - £2.50-4.00
    { category: "cold-drinks", name: "Sparkling Water", description: "San Pellegrino 500ml", price: 2.50, tags: ["water"] },
    { category: "cold-drinks", name: "Still Water", description: "Evian 500ml", price: 2.50, tags: ["water"] },
    { category: "cold-drinks", name: "Coca-Cola", description: "Classic or Zero", price: 2.50, tags: ["soft-drink"] },
    { category: "cold-drinks", name: "Fanta Orange", description: "Refreshing orange soda", price: 2.50, tags: ["soft-drink"] },
    { category: "cold-drinks", name: "Sprite", description: "Lemon-lime soda", price: 2.50, tags: ["soft-drink"] },
    { category: "cold-drinks", name: "Iced Coffee", description: "Cold brew with cream", price: 3.50, tags: ["coffee", "cold"] },
    { category: "cold-drinks", name: "Iced Tea", description: "Refreshing iced tea with lemon", price: 3.50, tags: ["tea", "cold"] },

    // Fresh Juices - £4-5
    { category: "fresh-juices", name: "Fresh Orange Juice", description: "Freshly squeezed oranges", price: 4.00, tags: ["fresh", "citrus"], isFeatured: true },
    { category: "fresh-juices", name: "Fresh Apple Juice", description: "Pressed green apples", price: 4.00, tags: ["fresh", "fruit"] },
    { category: "fresh-juices", name: "Mixed Berry Juice", description: "Strawberry, blueberry, raspberry blend", price: 4.50, tags: ["fresh", "berry"] },
    { category: "fresh-juices", name: "Tropical Juice", description: "Mango, pineapple, passion fruit", price: 4.50, tags: ["fresh", "tropical"] },
    { category: "fresh-juices", name: "Carrot & Ginger", description: "Fresh carrot with a ginger kick", price: 5.00, tags: ["fresh", "healthy"] },
    { category: "fresh-juices", name: "Green Detox", description: "Cucumber, celery, apple, spinach", price: 5.00, tags: ["fresh", "healthy"] },
    { category: "fresh-juices", name: "Watermelon Cooler", description: "Fresh watermelon juice", price: 4.00, tags: ["fresh", "refreshing"] },

    // Mocktails - £5.95-6.50
    { category: "mocktails", name: "Virgin Mojito", description: "Lime, mint, soda - refreshingly cool", price: 5.95, tags: ["mint", "refreshing"], isFeatured: true },
    { category: "mocktails", name: "Passion Fruit Fizz", description: "Passion fruit with sparkling lemonade", price: 5.95, tags: ["fruity", "fizzy"] },
    { category: "mocktails", name: "Mango Lassi", description: "Traditional Indian yogurt drink with mango", price: 5.95, tags: ["creamy", "indian"] },
    { category: "mocktails", name: "Berry Blast", description: "Mixed berries with lemonade", price: 5.95, tags: ["berry", "refreshing"] },
    { category: "mocktails", name: "Piña Colada", description: "Pineapple and coconut cream", price: 6.50, tags: ["tropical", "creamy"] },
    { category: "mocktails", name: "Sultan's Sunset", description: "Orange, grenadine, ginger ale - our signature", price: 6.50, tags: ["signature", "fruity"], isFeatured: true },
    { category: "mocktails", name: "Blue Lagoon", description: "Blue curacao syrup with lemonade and lime", price: 6.50, tags: ["colorful", "refreshing"] },
    { category: "mocktails", name: "Strawberry Daiquiri", description: "Fresh strawberries blended with lime", price: 6.50, tags: ["strawberry", "blended"] },
  ];

  let itemCount = 0;
  for (const item of menuItems) {
    const categoryId = createdCategories[item.category];
    if (!categoryId) continue;

    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    
    await prisma.shishaMenuItem.upsert({
      where: { slug },
      update: {
        categoryId,
        name: item.name,
        description: item.description,
        price: item.price,
        intensity: item.intensity || null,
        tags: item.tags || [],
        isFeatured: item.isFeatured || false,
        isAvailable: true,
      },
      create: {
        categoryId,
        name: item.name,
        slug,
        description: item.description,
        price: item.price,
        intensity: item.intensity || null,
        tags: item.tags || [],
        isFeatured: item.isFeatured || false,
        isAvailable: true,
        sortOrder: itemCount,
      },
    });
    itemCount++;
  }
  console.log(`   ✓ Created ${itemCount} menu items`);

  console.log("✅ Shisha seeding complete!");
}

seedShisha()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
