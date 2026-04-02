/**
 * CSV Menu Parser
 * Parses CSV files with menu data
 *
 * Expected columns:
 * name, description, price, category, vegetarian, vegan, spicy, allergens
 */

import * as fs from "fs";
import type { RawMenuItem } from "./normalize";

export async function parseCsv(filePath: string): Promise<RawMenuItem[]> {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").filter((line) => line.trim());

  if (lines.length < 2) {
    throw new Error("CSV file must have header row and at least one data row");
  }

  const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().trim());
  const items: RawMenuItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row = Object.fromEntries(headers.map((h, idx) => [h, values[idx] || ""]));

    const item: RawMenuItem = {
      name: row.name?.trim() || "",
      description: row.description?.trim() || undefined,
      price: parseFloat(row.price || "0"),
      category: row.category?.trim().toLowerCase().replace(/\s+/g, "-") || "uncategorized",
      isVegetarian: parseBoolean(row.vegetarian || row.isvegetarian),
      isVegan: parseBoolean(row.vegan || row.isvegan),
      isSpicy: parseBoolean(row.spicy || row.isspicy),
      allergens: parseAllergens(row.allergens),
    };

    if (item.name && item.price > 0) {
      items.push(item);
    }
  }

  return items;
}

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

function parseBoolean(value: string | undefined): boolean {
  if (!value) return false;
  const v = value.toLowerCase().trim();
  return v === "true" || v === "yes" || v === "1" || v === "y";
}

function parseAllergens(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(/[,;|]/)
    .map((a) => a.trim().toLowerCase())
    .filter((a) => a.length > 0);
}
