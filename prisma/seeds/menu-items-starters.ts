import type { MenuItemSeed } from "./menu-items";

// Cold Starters
export const coldStartersItems: MenuItemSeed[] = [
  { name: "Hummus", description: "Creamy chickpea dip with tahini, lemon & olive oil", price: 5.99, isPopular: true, isVegetarian: true, isVegan: true, allergens: ["sesame"] },
  { name: "Hummus Beiruty", description: "Lebanese-style hummus with extra spices", price: 6.99, isVegetarian: true, isVegan: true, allergens: ["sesame"] },
  { name: "Spicy Hummus", description: "Hummus with chilli flakes and spices", price: 6.99, isVegetarian: true, isVegan: true, isSpicy: true, spiceLevel: 2, allergens: ["sesame"] },
  { name: "Baba Ghanouj", description: "Smoky roasted aubergine dip with tahini", price: 6.99, isVegetarian: true, isVegan: true, allergens: ["sesame"] },
  { name: "Mast-o Musirb", description: "Persian yogurt dip with shallots", price: 3.99, isVegetarian: true, allergens: ["dairy"] },
  { name: "Mast-o Khiar", description: "Persian yogurt with cucumber and herbs", price: 3.99, isVegetarian: true, allergens: ["dairy"] },
  { name: "Olives", description: "Marinated Mediterranean olives", price: 3.45, isVegetarian: true, isVegan: true },
  { name: "Dolmeh", description: "Stuffed vine leaves with rice and herbs", price: 5.49, isVegetarian: true, isVegan: true },
  { name: "Torshi", description: "Traditional Middle Eastern pickles", price: 3.49, isVegetarian: true, isVegan: true },
  { name: "Al Sultan Special", description: "Chef's special mixed mezza platter", price: 10.99, isPopular: true, isVegetarian: true },
];

// Hot Starters
export const hotStartersItems: MenuItemSeed[] = [
  { name: "Hummus Shawarma Chicken", description: "Warm hummus topped with chicken shawarma", price: 7.99, isPopular: true, allergens: ["sesame"] },
  { name: "Hummus Shawarma Lamb", description: "Warm hummus topped with lamb shawarma", price: 8.49, isPopular: true, allergens: ["sesame"] },
  { name: "Hummus Falafel", description: "Warm hummus with falafel and nan bread", price: 7.99, isVegetarian: true, allergens: ["sesame", "gluten"] },
  { name: "Foul Moudomas", description: "Slow-cooked fava beans with spices", price: 5.99, isVegetarian: true, isVegan: true },
  { name: "Shakshouka", description: "Eggs poached in spiced tomato sauce", price: 6.99, isVegetarian: true, allergens: ["eggs"] },
  { name: "Kibbeh", description: "Fried bulgur shells stuffed with spiced lamb", price: 6.49, allergens: ["gluten"] },
  { name: "Grilled Kibbeh (3pcs)", description: "Chargrilled kibbeh served with yogurt", price: 11.99, allergens: ["gluten", "dairy"] },
  { name: "Chicken Pakora", description: "Spiced chicken fritters", price: 6.99, allergens: ["gluten"] },
  { name: "Vegetable Pakora", description: "Mixed vegetable fritters", price: 6.49, isVegetarian: true, allergens: ["gluten"] },
  { name: "Onion Rings", description: "Crispy battered onion rings", price: 3.99, isVegetarian: true, allergens: ["gluten"] },
  { name: "Mixed Pakora", description: "Assortment of chicken and vegetable pakoras", price: 7.99, allergens: ["gluten"] },
  { name: "Halloumi Grilled", description: "Grilled halloumi cheese", price: 5.99, isVegetarian: true, allergens: ["dairy"] },
  { name: "Fresh Falafel (5 pieces)", description: "Crispy chickpea fritters with tahini", price: 5.49, isPopular: true, isVegetarian: true, isVegan: true, allergens: ["sesame"] },
  { name: "Chicken Wings", description: "Crispy fried chicken wings", price: 5.99, isPopular: true },
  { name: "Sambousek Lamb", description: "Crispy pastry filled with spiced lamb", price: 5.49, allergens: ["gluten"] },
  { name: "Sambousek Cheese", description: "Crispy pastry filled with cheese", price: 5.49, isVegetarian: true, allergens: ["gluten", "dairy"] },
];

// Keep backward compatibility
export const startersItems: MenuItemSeed[] = [...coldStartersItems, ...hotStartersItems];
