/**
 * Menu Data Normalizer
 * Cleans and standardizes raw menu data from various sources
 */

export interface RawMenuItem {
  name: string;
  description?: string;
  price: number;
  category: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  spiceLevel?: number;
  allergens?: string[];
}

export interface NormalizedMenuItem {
  name: string;
  description?: string;
  price: number;
  category: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isSpicy: boolean;
  spiceLevel: number;
  allergens: string[];
}

const CATEGORY_MAPPINGS: Record<string, string> = {
  starter: "starters",
  appetizer: "starters",
  appetizers: "starters",
  meze: "starters",
  "hot-starters": "starters",
  "cold-starters": "starters",

  soup: "soups",

  salad: "salads",

  grill: "grills",
  grilled: "grills",
  "charcoal-grill": "grills",
  "mixed-grill": "grills",
  kebab: "grills",
  kebabs: "grills",

  shawarmas: "shawarma",
  wraps: "shawarma",

  "syrian-dishes": "syrian",
  "syrian-specials": "syrian",

  "lebanese-dishes": "lebanese",
  "lebanese-specials": "lebanese",

  "indian-dishes": "indian",
  "indian-curries": "indian",
  curries: "indian",
  biryani: "indian",

  "iraqi-dishes": "iraqi",
  "iraqi-specials": "iraqi",

  pizzas: "pizza",

  burger: "burgers",

  "fried-chicken": "chicken",
  "chicken-dishes": "chicken",

  "kids-menu": "kids",
  children: "kids",
  "kids-meals": "kids",

  dessert: "desserts",
  sweets: "desserts",

  beverages: "drinks",
  "cold-drinks": "drinks",
  "soft-drinks": "drinks",
  juices: "drinks",

  "hot-beverages": "hot-drinks",
  tea: "hot-drinks",
  coffee: "hot-drinks",
};

const ALLERGEN_MAPPINGS: Record<string, string> = {
  wheat: "gluten",
  milk: "dairy",
  lactose: "dairy",
  peanuts: "nuts",
  "tree-nuts": "nuts",
  shellfish: "crustaceans",
  prawn: "crustaceans",
  shrimp: "crustaceans",
};

export function normalizeMenuData(items: RawMenuItem[]): NormalizedMenuItem[] {
  return items
    .map(normalizeItem)
    .filter((item): item is NormalizedMenuItem => item !== null);
}

function normalizeItem(item: RawMenuItem): NormalizedMenuItem | null {
  // Clean name
  const name = cleanName(item.name);
  if (!name || name.length < 2) return null;

  // Validate price
  const price = Math.round(item.price * 100) / 100;
  if (price <= 0 || price > 1000) return null;

  // Normalize category
  const category = normalizeCategory(item.category);

  // Normalize allergens
  const allergens = normalizeAllergens(item.allergens || []);

  // Determine spice level
  let spiceLevel = item.spiceLevel ?? 0;
  if (item.isSpicy && spiceLevel === 0) {
    spiceLevel = 1;
  }

  return {
    name,
    description: item.description?.trim() || undefined,
    price,
    category,
    isVegetarian: item.isVegetarian ?? false,
    isVegan: item.isVegan ?? false,
    isSpicy: item.isSpicy ?? spiceLevel > 0,
    spiceLevel,
    allergens,
  };
}

function cleanName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[\x00-\x1F]/g, "") // Remove control characters
    .replace(/^[\d.\s-]+/, "") // Remove leading numbers
    .trim();
}

function normalizeCategory(category: string): string {
  const cleaned = category.toLowerCase().trim().replace(/\s+/g, "-");
  return CATEGORY_MAPPINGS[cleaned] || cleaned;
}

function normalizeAllergens(allergens: string[]): string[] {
  const normalized = new Set<string>();

  for (const allergen of allergens) {
    const cleaned = allergen.toLowerCase().trim();
    const mapped = ALLERGEN_MAPPINGS[cleaned] || cleaned;
    if (mapped.length > 0) {
      normalized.add(mapped);
    }
  }

  return Array.from(normalized).sort();
}
