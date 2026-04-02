import type { MenuItemSeed } from "./menu-items";

// Soft Drinks
export const softDrinksItems: MenuItemSeed[] = [
  { name: "Cans 330ml", description: "Selection of soft drink cans", price: 1.80, isVegetarian: true, isVegan: true },
  { name: "Still or Sparkling Water", description: "Bottled water", price: 1.45, isVegetarian: true, isVegan: true },
];

// Fresh Juices
export const freshJuicesItems: MenuItemSeed[] = [
  { name: "Orange Juice", description: "Freshly squeezed orange juice", price: 4.49, isVegetarian: true, isVegan: true },
  { name: "Lemon Juice", description: "Fresh lemon juice", price: 3.99, isVegetarian: true, isVegan: true },
  { name: "Orange & Lemon Juice", description: "Mixed citrus juice", price: 4.49, isVegetarian: true, isVegan: true },
  { name: "Apple Juice", description: "Fresh apple juice", price: 3.99, isVegetarian: true, isVegan: true },
  { name: "Special Sultan Fruit Juice", description: "Our signature mixed fruit juice", price: 4.99, isPopular: true, isVegetarian: true, isVegan: true },
  { name: "Minto", description: "Refreshing mint drink", price: 3.99, isVegetarian: true, isVegan: true },
  { name: "Kiwi Juice", description: "Fresh kiwi juice", price: 3.99, isVegetarian: true, isVegan: true },
  { name: "Mango Juice", description: "Sweet mango juice", price: 4.49, isVegetarian: true, isVegan: true },
  { name: "Pineapple Juice", description: "Fresh pineapple juice", price: 4.49, isVegetarian: true, isVegan: true },
  { name: "Sweet Melon Juice", description: "Refreshing melon juice", price: 4.49, isVegetarian: true, isVegan: true },
  { name: "Flamengo", description: "Mixed tropical juice", price: 4.49, isVegetarian: true, isVegan: true },
  { name: "Minto Jug", description: "Large jug of mint drink to share", price: 11.99, isVegetarian: true, isVegan: true },
  { name: "Mango Jug", description: "Large jug of mango juice to share", price: 12.99, isVegetarian: true, isVegan: true },
];

// Milkshakes
export const milkshakesItems: MenuItemSeed[] = [
  { name: "Special Sultan Milkshake", description: "Our signature milkshake blend", price: 4.49, isPopular: true, isVegetarian: true, allergens: ["dairy"] },
  { name: "Fererro Milkshake", description: "Ferrero Rocher flavored milkshake", price: 3.99, isVegetarian: true, allergens: ["dairy", "nuts"] },
  { name: "Nutella Milkshake", description: "Rich Nutella milkshake", price: 4.49, isPopular: true, isVegetarian: true, allergens: ["dairy", "nuts"] },
  { name: "Strawberry Milkshake", description: "Fresh strawberry milkshake", price: 3.99, isVegetarian: true, allergens: ["dairy"] },
  { name: "Vanilla Milkshake", description: "Classic vanilla milkshake", price: 4.99, isVegetarian: true, allergens: ["dairy"] },
  { name: "Banana Milkshake", description: "Creamy banana milkshake", price: 4.49, isVegetarian: true, allergens: ["dairy"] },
  { name: "Chocolate Milkshake", description: "Rich chocolate milkshake", price: 4.49, isVegetarian: true, allergens: ["dairy"] },
  { name: "Oreo Milkshake", description: "Cookies and cream milkshake", price: 4.99, isPopular: true, isVegetarian: true, allergens: ["dairy", "gluten"] },
  { name: "Biscoff Milkshake", description: "Biscoff cookie milkshake", price: 4.99, isVegetarian: true, allergens: ["dairy", "gluten"] },
  { name: "Maltesers Milkshake", description: "Maltesers chocolate milkshake", price: 4.49, isVegetarian: true, allergens: ["dairy"] },
];

// Smoothies
export const smoothiesItems: MenuItemSeed[] = [
  { name: "Sultan Special Creamy Panache", description: "Our signature creamy smoothie", price: 4.49, isPopular: true, isVegetarian: true, allergens: ["dairy"] },
  { name: "Strawberry & Raspberry", description: "Berry blend smoothie", price: 3.99, isVegetarian: true, isVegan: true },
  { name: "Mixed Berries", description: "Assorted berry smoothie", price: 4.29, isVegetarian: true, isVegan: true },
  { name: "Tooty Fruity", description: "Mixed fruit smoothie", price: 3.99, isVegetarian: true, isVegan: true },
  { name: "Apple Berry", description: "Apple and berry blend", price: 3.99, isVegetarian: true, isVegan: true },
  { name: "Cranberry & Strawberry", description: "Cranberry and strawberry blend", price: 3.99, isVegetarian: true, isVegan: true },
  { name: "Strawberry & Banana", description: "Classic strawberry banana", price: 3.99, isVegetarian: true, isVegan: true },
];

// Mocktails
export const mocktailsItems: MenuItemSeed[] = [
  { name: "Classic Lime Mojito", description: "Refreshing lime and mint mocktail", price: 4.49, isVegetarian: true, isVegan: true },
  { name: "Strawberry Mojito", description: "Strawberry flavored mojito", price: 4.49, isVegetarian: true, isVegan: true },
  { name: "Raspberry Mojito", description: "Raspberry flavored mojito", price: 4.99, isVegetarian: true, isVegan: true },
  { name: "Mixed Berries Mojito", description: "Berry blend mojito", price: 4.99, isPopular: true, isVegetarian: true, isVegan: true },
];

// Keep backward compatibility
export const drinksItems: MenuItemSeed[] = [...softDrinksItems, ...freshJuicesItems];
