export const ALLERGENS = [
  { id: "gluten", name: "Gluten", icon: "\uD83C\uDF3E" },
  { id: "dairy", name: "Dairy", icon: "\uD83E\uDD5B" },
  { id: "nuts", name: "Nuts", icon: "\uD83E\uDD5C" },
  { id: "eggs", name: "Eggs", icon: "\uD83E\uDD5A" },
  { id: "soy", name: "Soy", icon: "\uD83C\uDF31" },
  { id: "fish", name: "Fish", icon: "\uD83D\uDC1F" },
  { id: "shellfish", name: "Shellfish", icon: "\uD83E\uDD90" },
  { id: "sesame", name: "Sesame", icon: "\u2728" },
] as const;

export type AllergenId = typeof ALLERGENS[number]["id"];
