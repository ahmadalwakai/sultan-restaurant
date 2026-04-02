import type { MenuItemSeed } from "./menu-items";

export const saladsItems: MenuItemSeed[] = [
  { name: "Al Sultan Mixed Salad", description: "Fresh mixed greens with house dressing", price: 4.99, isVegetarian: true, isVegan: true },
  { name: "Grilled Halloumi Salad", description: "Grilled halloumi on mixed greens", price: 5.99, isVegetarian: true, isPopular: true, allergens: ["dairy"] },
  { name: "Tabbouleh", description: "Fresh parsley salad with bulgur, tomatoes & mint", price: 5.99, isVegetarian: true, isVegan: true, allergens: ["gluten"] },
  { name: "Fattoush", description: "Lebanese salad with crispy pita & sumac", price: 5.99, isVegetarian: true, allergens: ["gluten"] },
  { name: "Feta Cheese Salad", description: "Mixed greens with crumbled feta cheese", price: 5.49, isVegetarian: true, allergens: ["dairy"] },
  { name: "Chicken Salad", description: "Fresh salad topped with grilled chicken", price: 6.99, isPopular: true },
  { name: "Onion & Tomato Salad", description: "Simple fresh onion and tomato salad", price: 4.99, isVegetarian: true, isVegan: true },
  { name: "Turkish Salad", description: "Traditional Turkish-style salad", price: 5.99, isVegetarian: true, isVegan: true },
];
