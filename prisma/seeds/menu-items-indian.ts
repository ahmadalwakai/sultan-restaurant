import type { MenuItemSeed } from "./menu-items";

// Indian Curry options (protein + sauce combinations)
export const indianItems: MenuItemSeed[] = [
  // Proteins for curry
  { name: "Chicken Curry", description: "Tender chicken in your choice of curry sauce", price: 10.99, isPopular: true },
  { name: "Chicken Tikka Curry", description: "Tandoori chicken tikka in curry sauce", price: 11.99, isPopular: true },
  { name: "Lamb Curry", description: "Tender lamb in your choice of curry sauce", price: 12.99, isPopular: true },
  { name: "Prawn Curry", description: "Prawns in your choice of curry sauce", price: 10.99, allergens: ["shellfish"] },
  { name: "Vegetable Curry", description: "Mixed vegetables in curry sauce", price: 9.99, isVegetarian: true, isVegan: true },
  // Standalone
  { name: "Chicken Tikka Masala", description: "Creamy tomato curry with tandoori chicken", price: 13.99, isPopular: true, allergens: ["dairy"] },
];

// Sauce/style note: Classic Curry, Bhoona, Dopiaza, Dhansak, Patia, Korma,
// Kashmiri Korma, Chasni, Balti, Rogan Josh, Tarka Daal, Masala, Garlic Chilli
// Madras (+50p), Vindaloo (+£1.00)

// Biryani items
export const biryaniItems: MenuItemSeed[] = [
  { name: "Lamb Biryani", description: "Fragrant basmati rice with spiced lamb", price: 13.99, isPopular: true, isSpicy: true, spiceLevel: 2 },
  { name: "Chicken Biryani", description: "Aromatic rice with tender chicken", price: 12.99, isSpicy: true, spiceLevel: 1 },
  { name: "Prawn Biryani", description: "Basmati rice with spiced prawns", price: 12.99, allergens: ["shellfish"], isSpicy: true, spiceLevel: 1 },
  { name: "Vegetable Biryani", description: "Mixed vegetables in spiced basmati rice", price: 11.99, isVegetarian: true, isVegan: true, isSpicy: true, spiceLevel: 1 },
];

// Sundries
export const sundriesItems: MenuItemSeed[] = [
  { name: "Nan", description: "Traditional tandoor-baked bread", price: 1.25, isVegetarian: true, allergens: ["gluten", "dairy"] },
  { name: "Garlic Nan", description: "Naan topped with garlic butter", price: 1.99, isVegetarian: true, allergens: ["gluten", "dairy"] },
  { name: "Chips", description: "Crispy golden chips", price: 3.49, isVegetarian: true, isVegan: true },
  { name: "Chips & Cheese", description: "Chips topped with melted cheese", price: 3.99, isVegetarian: true, allergens: ["dairy"] },
  { name: "Rice (Basmati)", description: "Steamed basmati rice", price: 2.99, isVegetarian: true, isVegan: true },
  { name: "Peri Peri Chips", description: "Chips with spicy peri peri seasoning", price: 3.99, isVegetarian: true, isVegan: true, isSpicy: true, spiceLevel: 2 },
];
