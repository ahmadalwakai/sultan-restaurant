import type { MenuItemSeed } from "./menu-items";

export const pizzaItems: MenuItemSeed[] = [
  { name: "Margherita", description: "Classic tomato sauce and mozzarella", price: 7.99, isVegetarian: true, allergens: ["gluten", "dairy"] },
  { name: "Spicy Chicken Pizza", description: "Spicy chicken with peppers and onions", price: 8.99, isSpicy: true, spiceLevel: 2, allergens: ["gluten", "dairy"] },
  { name: "Pepperoni", description: "Classic pepperoni with mozzarella", price: 8.99, isPopular: true, allergens: ["gluten", "dairy"] },
  { name: "Veg Supreme", description: "Loaded with fresh vegetables", price: 7.99, isVegetarian: true, allergens: ["gluten", "dairy"] },
  { name: "Shawarma Pizza", description: "Topped with lamb or chicken shawarma", price: 8.99, isPopular: true, allergens: ["gluten", "dairy"] },
  { name: "BBQ Chicken Pizza", description: "Grilled chicken with BBQ sauce", price: 8.99, allergens: ["gluten", "dairy"] },
];
