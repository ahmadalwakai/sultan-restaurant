import type { MenuItemSeed } from "./menu-items";

// Sweets
export const sweetsItems: MenuItemSeed[] = [
  { name: "Cheese Kunafa", description: "Traditional shredded filo with sweet cheese", price: 4.99, isPopular: true, isVegetarian: true, allergens: ["gluten", "dairy"] },
  { name: "Cream Kunafa", description: "Shredded filo with sweet cream", price: 3.99, isVegetarian: true, allergens: ["gluten", "dairy"] },
  { name: "Chocolate Cake", description: "Rich chocolate cake", price: 3.99, isVegetarian: true, allergens: ["gluten", "dairy", "eggs"] },
  { name: "Carrot Cake", description: "Moist carrot cake with frosting", price: 3.99, isVegetarian: true, allergens: ["gluten", "dairy", "eggs", "nuts"] },
  { name: "Baklava (3 pcs)", description: "Flaky filo pastry with pistachios & honey syrup", price: 3.99, isPopular: true, isVegetarian: true, allergens: ["gluten", "nuts"] },
  { name: "Baklava (served with cream)", description: "Baklava with fresh cream", price: 4.29, isVegetarian: true, allergens: ["gluten", "dairy", "nuts"] },
];

// Ice Cream
export const iceCreamItems: MenuItemSeed[] = [
  { name: "Ice Cream (2 Scoops)", description: "Choose from our selection of flavours", price: 2.99, isVegetarian: true, allergens: ["dairy"] },
  { name: "Ice Cream (3 Scoops)", description: "Choose from our selection of flavours", price: 4.49, isVegetarian: true, allergens: ["dairy"] },
  // Flavours: Sultan Special, Pistachio, Mango, Strawberry, Vanilla, Chocolate
];

// Keep backward compatibility
export const dessertsItems: MenuItemSeed[] = [...sweetsItems, ...iceCreamItems];
