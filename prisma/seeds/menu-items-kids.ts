import type { MenuItemSeed } from "./menu-items";

export const kidsItems: MenuItemSeed[] = [
  { name: "1 Skewer Royal Chicken & Rice", description: "Kids portion of royal chicken with rice", price: 6.99 },
  { name: "1 Skewer Koubideh & Rice", description: "Kids portion of minced meat kebab with rice", price: 6.99 },
  { name: "Chicken Nuggets & Chips", description: "Golden chicken nuggets with chips", price: 6.99, allergens: ["gluten"] },
  { name: "Fish Fingers & Chips", description: "Crispy fish fingers with chips", price: 6.99, allergens: ["gluten", "fish"] },
  { name: "Cheese Burger & Chips", description: "Kids cheese burger with chips", price: 6.99, allergens: ["gluten", "dairy"] },
];
