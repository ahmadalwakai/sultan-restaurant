import type { MenuItemSeed } from "./menu-items";

// House Specials
export const houseSpecialsItems: MenuItemSeed[] = [
  { name: "Lamb Mandi", description: "Slow-cooked lamb on fragrant spiced rice", price: 13.99, isPopular: true },
  { name: "Chicken Mandi", description: "Tender chicken on aromatic mandi rice", price: 10.99, isPopular: true },
  { name: "Lamb Kapsa", description: "Lamb with tomato-spiced Saudi rice", price: 12.99 },
  { name: "Chicken Kapsa", description: "Chicken with traditional kapsa rice", price: 10.99 },
  { name: "Arayes Meat Grill", description: "Grilled stuffed pita with spiced meat", price: 8.99 },
  { name: "Shawarma Arabic Lamb", description: "Traditional Arabic-style lamb shawarma", price: 8.99 },
  { name: "Shawarma Arabic Chicken", description: "Traditional Arabic-style chicken shawarma", price: 8.49 },
  { name: "Muqlouba", description: "Upside-down rice with lamb, aubergine, cauliflower", price: 12.99, isPopular: true },
  { name: "Mulukhiyah", description: "Jute leaves stew with rice", price: 10.99 },
  { name: "Fasulya", description: "White bean stew with rice", price: 10.99 },
  { name: "Okra", description: "Okra stew with rice", price: 10.99 },
  { name: "Sheikh Al-Mahshi (Zucchini)", description: "Stuffed courgettes in yogurt sauce", price: 13.99, allergens: ["dairy"] },
  { name: "Mansaf Lamb (4 peoples)", description: "Jordanian lamb with jameed sauce & rice - serves 4", price: 54.99, allergens: ["dairy"] },
];

// Mixed Kebabs
export const mixedKebabsItems: MenuItemSeed[] = [
  { name: "Taccoe Chicken", description: "Chicken kebab combination platter", price: 11.99 },
  { name: "Mixed Taccoe", description: "Mixed meat kebab combination", price: 13.99 },
  { name: "Mince Delight", description: "Selection of minced meat kebabs", price: 11.99 },
  { name: "Makhsous", description: "Special mixed grill platter", price: 12.99, isPopular: true },
  { name: "Maklude", description: "Chef's special kebab selection", price: 11.99 },
  { name: "Mixed Grill (for 1)", description: "Mixed grill platter for one person", price: 17.99, isPopular: true },
  { name: "Mixed Grill (for 2)", description: "Mixed grill platter for two people", price: 29.99, isPopular: true },
  { name: "Family Feast (for 4)", description: "Large mixed grill platter for four", price: 54.99 },
];

// Keep backward compatibility
export const syrianItems: MenuItemSeed[] = [...houseSpecialsItems];
