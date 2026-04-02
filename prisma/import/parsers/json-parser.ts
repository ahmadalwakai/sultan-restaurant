/**
 * JSON Menu Parser
 * Parses JSON files with menu data
 *
 * Expected format:
 * [
 *   {
 *     "name": "Item Name",
 *     "description": "Description",
 *     "price": 12.99,
 *     "category": "starters",
 *     "vegetarian": true,
 *     "allergens": ["gluten", "dairy"]
 *   }
 * ]
 *
 * Or nested by category:
 * {
 *   "starters": [
 *     { "name": "Item", "price": 5.99 }
 *   ]
 * }
 */

import * as fs from "fs";
import type { RawMenuItem } from "./normalize";

interface JsonMenuItem {
  name: string;
  description?: string;
  price: number | string;
  category?: string;
  vegetarian?: boolean;
  isVegetarian?: boolean;
  vegan?: boolean;
  isVegan?: boolean;
  spicy?: boolean;
  isSpicy?: boolean;
  allergens?: string[];
}

type JsonData = JsonMenuItem[] | Record<string, JsonMenuItem[]>;

export async function parseJson(filePath: string): Promise<RawMenuItem[]> {
  const content = fs.readFileSync(filePath, "utf-8");
  const data: JsonData = JSON.parse(content);

  const items: RawMenuItem[] = [];

  if (Array.isArray(data)) {
    // Flat array format
    for (const item of data) {
      const parsed = parseJsonItem(item);
      if (parsed) items.push(parsed);
    }
  } else if (typeof data === "object") {
    // Nested by category format
    for (const [category, categoryItems] of Object.entries(data)) {
      if (!Array.isArray(categoryItems)) continue;

      for (const item of categoryItems) {
        const parsed = parseJsonItem(item, category);
        if (parsed) items.push(parsed);
      }
    }
  }

  return items;
}

function parseJsonItem(item: JsonMenuItem, defaultCategory?: string): RawMenuItem | null {
  if (!item.name || item.price === undefined) return null;

  const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
  if (isNaN(price) || price <= 0) return null;

  const category =
    item.category?.toLowerCase().replace(/\s+/g, "-") ||
    defaultCategory?.toLowerCase().replace(/\s+/g, "-") ||
    "uncategorized";

  return {
    name: item.name.trim(),
    description: item.description?.trim() || undefined,
    price,
    category,
    isVegetarian: item.vegetarian ?? item.isVegetarian ?? false,
    isVegan: item.vegan ?? item.isVegan ?? false,
    isSpicy: item.spicy ?? item.isSpicy ?? false,
    allergens: item.allergens ?? [],
  };
}
