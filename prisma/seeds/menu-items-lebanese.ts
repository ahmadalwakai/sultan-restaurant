import type { MenuItemSeed } from "./menu-items";

// Wraps
export const wrapsItems: MenuItemSeed[] = [
  { name: "Lamb Shawarma Wrap", description: "Sliced lamb in fresh wrap with salad", price: 8.99, isPopular: true, allergens: ["gluten"] },
  { name: "Chicken Shawarma Wrap", description: "Sliced chicken in fresh wrap with salad", price: 7.99, isPopular: true, allergens: ["gluten"] },
  { name: "Halloumi Wrap", description: "Grilled halloumi with salad in wrap", price: 7.49, isVegetarian: true, allergens: ["gluten", "dairy"] },
  { name: "Chicken Tikka Wrap", description: "Chicken tikka with salad in wrap", price: 7.99, allergens: ["gluten"] },
  { name: "Falafel Wrap", description: "Crispy falafel with hummus and salad", price: 6.99, isVegetarian: true, isVegan: true, allergens: ["gluten", "sesame"] },
  { name: "Kebab Mince Wrap", description: "Minced meat kebab in fresh wrap", price: 7.99, allergens: ["gluten"] },
];

// Hoagies & Calzones
export const hoagiesItems: MenuItemSeed[] = [
  { name: "Lamb Shawarma Hoagie", description: "Lamb shawarma in hoagie bread", price: 8.99, allergens: ["gluten"] },
  { name: "Lamb Shawarma Calzone", description: "Lamb shawarma in folded pizza dough", price: 8.99, allergens: ["gluten", "dairy"] },
  { name: "Chicken Shawarma Hoagie", description: "Chicken shawarma in hoagie bread", price: 8.49, allergens: ["gluten"] },
  { name: "Chicken Shawarma Calzone", description: "Chicken shawarma in folded pizza dough", price: 8.49, allergens: ["gluten", "dairy"] },
  { name: "Chicken Tikka Hoagie", description: "Chicken tikka in hoagie bread", price: 8.99, allergens: ["gluten"] },
  { name: "Chicken Tikka Calzone", description: "Chicken tikka in folded pizza dough", price: 8.99, allergens: ["gluten", "dairy"] },
  { name: "Chicken Shashlik Hoagie", description: "Chicken shashlik in hoagie bread", price: 8.99, allergens: ["gluten"] },
  { name: "Chicken Shashlik Calzone", description: "Chicken shashlik in folded pizza dough", price: 8.99, allergens: ["gluten", "dairy"] },
];

// Keep backward compatibility - map to wraps
export const lebaneseItems: MenuItemSeed[] = [...wrapsItems, ...hoagiesItems];
