import type { MenuItemSeed } from "./menu-items";

export const burgersItems: MenuItemSeed[] = [
  { name: "Al Sultan Special Burger", description: "Our signature burger with special sauce", price: 9.49, isPopular: true, allergens: ["gluten", "dairy"] },
  { name: "Classic Beef Burger", description: "Traditional beef burger with lettuce and tomato", price: 7.99, allergens: ["gluten"] },
  { name: "Classic Cheese Burger", description: "Beef burger with melted cheese", price: 8.29, allergens: ["gluten", "dairy"] },
  { name: "Jalapeno Burger", description: "Spicy burger with jalapeño peppers", price: 8.29, isSpicy: true, spiceLevel: 2, allergens: ["gluten", "dairy"] },
  { name: "Caribbean Burger", description: "Tropical flavored burger", price: 8.49, allergens: ["gluten", "dairy"] },
  { name: "Sweet Hot Burger", description: "Sweet and spicy combination", price: 8.49, isSpicy: true, spiceLevel: 1, allergens: ["gluten", "dairy"] },
  { name: "Chicken/Lamb Shawarma Burger", description: "Shawarma meat in a burger bun", price: 7.49, allergens: ["gluten"] },
  { name: "Classic Chicken Burger", description: "Grilled chicken breast burger", price: 8.29, allergens: ["gluten"] },
  { name: "Vegetable Burger", description: "Vegetarian patty with fresh vegetables", price: 6.99, isVegetarian: true, allergens: ["gluten"] },
];

// Note: Add cheese to any burger for 99p
