import type { MenuItemSeed } from "./menu-items";

// Qozi dishes
export const qoziItems: MenuItemSeed[] = [
  { name: "Qozi Lamb", description: "Traditional slow-roasted lamb on spiced rice", price: 12.99, isPopular: true },
  { name: "Qozi Lamb for 4 People", description: "Family size Qozi lamb platter", price: 54.99 },
  { name: "Qozi Lamb for 10 People", description: "Large party size Qozi lamb", price: 124.99 },
  { name: "Qozi Chicken", description: "Slow-roasted chicken on spiced rice", price: 9.99 },
  { name: "Maycha", description: "Traditional lamb with rice and spices", price: 12.99 },
];

// Traditional dishes
export const traditionalsItems: MenuItemSeed[] = [
  { name: "Tashreeb Lamb", description: "Lamb stew served over crispy bread", price: 13.95, isPopular: true, allergens: ["gluten"] },
  { name: "Tashreeb Lamb Bamieh", description: "Lamb and okra stew over crispy bread", price: 14.49, allergens: ["gluten"] },
];

// Vegetarian mains
export const vegetarianItems: MenuItemSeed[] = [
  { name: "Bamieh (Okra)", description: "Okra stew in tomato sauce", price: 9.99, isVegetarian: true, isVegan: true },
  { name: "Fasolya (White Beans)", description: "White bean stew in tomato sauce", price: 9.99, isVegetarian: true, isVegan: true },
  { name: "Tapsi", description: "Layered vegetable bake", price: 9.99, isVegetarian: true },
];

// Seafood
export const seafoodItems: MenuItemSeed[] = [
  { name: "Masgouf", description: "Traditional Iraqi grilled carp with tomatoes", price: 14.99, isPopular: true, allergens: ["fish"] },
  { name: "Grilled Salmon", description: "Fresh salmon fillet grilled to perfection", price: 12.49, allergens: ["fish"] },
  { name: "Royal King Prawn", description: "Grilled king prawns with garlic butter", price: 14.99, isPopular: true, allergens: ["shellfish"] },
];

// Keep backward compatibility
export const iraqiItems: MenuItemSeed[] = [...qoziItems, ...traditionalsItems];
