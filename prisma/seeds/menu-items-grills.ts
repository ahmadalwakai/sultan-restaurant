import type { MenuItemSeed } from "./menu-items";

// Al Sultan Charcoal and Grills
export const grillsItems: MenuItemSeed[] = [
  { name: "Chicken Tikka", description: "Marinated chicken pieces grilled over charcoal", price: 12.99, isPopular: true },
  { name: "Royal Chicken (Taouk)", description: "Lebanese-style garlic chicken kebab", price: 11.99, isPopular: true },
  { name: "Chicken Shashlik", description: "Chicken skewers with peppers and onions", price: 12.99 },
  { name: "Chicken Minced (Koubideh)", description: "Minced chicken kebab, Persian style", price: 11.99 },
  { name: "Whole Grilled Chicken", description: "Whole chicken marinated and chargrilled", price: 12.99 },
  { name: "Half Grilled Chicken", description: "Half chicken marinated and chargrilled", price: 8.99 },
  { name: "Lamb Chops", description: "Premium lamb chops grilled to perfection", price: 14.49, isPopular: true },
  { name: "Lamb Tikka", description: "Marinated lamb pieces grilled over charcoal", price: 14.50, isPopular: true },
  { name: "Lamb Shashlik", description: "Lamb skewers with peppers and onions", price: 14.99 },
  { name: "Lamb Mince (Koubideh)", description: "Minced lamb kebab, Persian style", price: 11.99 },
  { name: "Lamb Mince (Adana)", description: "Spicy Turkish-style minced lamb kebab", price: 11.99, isSpicy: true, spiceLevel: 2 },
  { name: "Syrian Special Kebab", description: "Chef's special Syrian-style kebab", price: 11.99 },
];

// Additional Charcoal & Grill items (larger portions)
export const charcoalGrillExtras: MenuItemSeed[] = [
  { name: "Half Peri Peri Chicken", description: "Half chicken with peri peri marinade", price: 9.25, isSpicy: true, spiceLevel: 2 },
  { name: "Whole Peri Peri Chicken", description: "Whole chicken with peri peri marinade", price: 13.99, isSpicy: true, spiceLevel: 2 },
  { name: "Whole Roasted Chicken", description: "Slow roasted whole chicken", price: 12.99 },
  { name: "Half Roasted Chicken", description: "Slow roasted half chicken", price: 8.99 },
  { name: "1 Kg Lamb Chops", description: "One kilogram of premium lamb chops", price: 44.99, isPopular: true },
  { name: "Mixed & BBQ Grill (3 people)", description: "Mixed grill platter for sharing", price: 35.99, isPopular: true },
  { name: "1 Kg BBQ Lamb Kebab Skewers", description: "One kilogram of lamb kebab skewers", price: 29.99 },
  { name: "1 Kg Shish Tawook", description: "One kilogram of chicken tawook", price: 29.99 },
];
