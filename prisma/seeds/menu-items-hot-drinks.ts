import type { MenuItemSeed } from "./menu-items";

// Tea
export const teaItems: MenuItemSeed[] = [
  { name: "Arabic Tea", description: "Traditional Arabic black tea", price: 3.99, isPopular: true, isVegetarian: true, isVegan: true },
  { name: "Breakfast Tea", description: "Classic English breakfast tea", price: 2.99, isVegetarian: true, isVegan: true },
  { name: "Moroccan Tea", description: "Mint tea Moroccan style", price: 3.99, isVegetarian: true, isVegan: true },
  { name: "Desi Tea", description: "South Asian spiced tea", price: 4.49, isVegetarian: true, allergens: ["dairy"] },
  { name: "Green Tea", description: "Light and refreshing green tea", price: 2.49, isVegetarian: true, isVegan: true },
  { name: "Ice Tea", description: "Cold brewed iced tea", price: 2.29, isVegetarian: true, isVegan: true },
];

// Coffee
export const coffeeItems: MenuItemSeed[] = [
  { name: "Turkish Coffee", description: "Traditional finely ground coffee", price: 2.49, isPopular: true, isVegetarian: true, isVegan: true },
  { name: "Espresso", description: "Single shot espresso", price: 2.25, isVegetarian: true, isVegan: true },
  { name: "Double Espresso", description: "Double shot espresso", price: 2.99, isVegetarian: true, isVegan: true },
  { name: "Latte (Caramel/Vanilla)", description: "Espresso with steamed milk, flavored", price: 3.50, isVegetarian: true, allergens: ["dairy"] },
  { name: "Cappuccino", description: "Espresso with steamed milk foam", price: 3.50, isVegetarian: true, allergens: ["dairy"] },
  { name: "Americano", description: "Espresso with hot water", price: 2.49, isVegetarian: true, isVegan: true },
  { name: "Hot Chocolate", description: "Rich hot chocolate", price: 3.75, isVegetarian: true, allergens: ["dairy"] },
  { name: "Iced Coffee", description: "Cold coffee with ice", price: 3.49, isVegetarian: true, allergens: ["dairy"] },
];

// Keep backward compatibility
export const hotDrinksItems: MenuItemSeed[] = [...teaItems, ...coffeeItems];
