export function formatPrice(priceInPence: number): string {
  return `\u00a3${(priceInPence / 100).toFixed(2)}`;
}

export function formatMenuItemBadges(item: { isVegetarian?: boolean; isVegan?: boolean; isGlutenFree?: boolean; isSpicy?: boolean }): string[] {
  const badges: string[] = [];
  if (item.isVegan) badges.push("Vegan");
  else if (item.isVegetarian) badges.push("Vegetarian");
  if (item.isGlutenFree) badges.push("Gluten-Free");
  if (item.isSpicy) badges.push("Spicy");
  return badges;
}

export function formatSpiceLevel(level: number): string {
  return "\uD83C\uDF36\uFE0F".repeat(level);
}
