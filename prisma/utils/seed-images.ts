// Pexels free stock photos - https://www.pexels.com/license/
function pexelsUrl(id: number, w = 800, h = 600): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;
}

// Menu item name → Pexels photo ID mapping
const menuItemImages: Record<string, number> = {
  // Cold Starters
  "hummus": 6089614,
  "hummus beiruty": 5125022,
  "spicy hummus": 5191824,
  "baba ghanouj": 6089608,
  "mast-o musirb": 5125022,
  "mast-o khiar": 6089608,
  "olives": 1633572,
  "dolmeh": 6089614,
  "torshi": 5191824,
  "al sultan special": 6089608,

  // Hot Starters
  "hummus shawarma chicken": 5779364,
  "hummus shawarma lamb": 18177325,
  "hummus falafel": 6275189,
  "foul moudomas": 5125022,
  "shakshouka": 5191824,
  "kibbeh": 7462776,
  "grilled kibbeh (3pcs)": 15058850,
  "chicken pakora": 9738981,
  "vegetable pakora": 6522616,
  "onion rings": 1583891,
  "mixed pakora": 5031943,
  "halloumi grilled": 5191825,
  "fresh falafel (5 pieces)": 6275114,
  "chicken wings": 12178045,
  "sambousek lamb": 7462776,
  "sambousek cheese": 6275222,

  // Soups
  "soup of the day": 539451,
  "chicken soup": 34326231,

  // Salads
  "al sultan mixed salad": 5191825,
  "grilled halloumi salad": 7469432,
  "tabbouleh": 15832880,
  "fattoush": 4768991,
  "feta cheese salad": 6271874,
  "chicken salad": 29259135,
  "onion & tomato salad": 6271859,
  "turkish salad": 7469387,

  // Qozi
  "qozi lamb": 18330965,
  "qozi lamb for 4 people": 13443236,
  "qozi lamb for 10 people": 8862759,
  "qozi chicken": 5774006,
  "maycha": 7462776,

  // Shawarma Dishes
  "shawarma lamb": 5779364,
  "chicken shawarma": 18177324,
  "mixed shawarma": 18177325,

  // Vegetarian
  "bamieh (okra)": 5191825,
  "fasolya (white beans)": 5125022,
  "tapsi": 6089608,

  // Traditionals
  "tashreeb lamb": 18330965,
  "tashreeb lamb bamieh": 7462776,

  // Seafood
  "masgouf": 3763847,
  "grilled salmon": 5175626,
  "royal king prawn": 2597565,

  // House Specials
  "lamb mandi": 7353393,
  "chicken mandi": 5410401,
  "lamb kapsa": 9609847,
  "chicken kapsa": 14731625,
  "arayes meat grill": 15058960,
  "shawarma arabic lamb": 5779364,
  "shawarma arabic chicken": 18177324,
  "muqlouba": 28674660,
  "mulukhiyah": 5125022,
  "fasulya": 5191824,
  "okra": 5191825,
  "sheikh al-mahshi (zucchini)": 6089608,
  "mansaf lamb (4 peoples)": 13443236,

  // Charcoal & Grills
  "chicken tikka": 29173114,
  "royal chicken (taouk)": 30749027,
  "chicken shashlik": 10615283,
  "chicken minced (koubideh)": 17794709,
  "whole grilled chicken": 5774006,
  "half grilled chicken": 12178045,
  "lamb chops": 8862759,
  "lamb tikka": 4669214,
  "lamb shashlik": 18330965,
  "lamb mince (koubideh)": 29358856,
  "lamb mince (adana)": 33469325,
  "syrian special kebab": 7340982,
  "half peri peri chicken": 8696558,
  "whole peri peri chicken": 6697493,
  "whole roasted chicken": 13065202,
  "half roasted chicken": 5774006,
  "1 kg lamb chops": 7741798,
  "mixed & bbq grill (3 people)": 15058850,
  "1 kg bbq lamb kebab skewers": 8963961,
  "1 kg shish tawook": 30749027,

  // Mixed Kebabs
  "taccoe chicken": 18177324,
  "mixed taccoe": 18177325,
  "mince delight": 29358856,
  "makhsous": 7340982,
  "maklude": 17794709,
  "mixed grill (for 1)": 15058850,
  "mixed grill (for 2)": 8963961,
  "family feast (for 4)": 18330996,

  // Indian Cuisine
  "chicken curry": 9738981,
  "chicken tikka curry": 6522616,
  "lamb curry": 5031943,
  "prawn curry": 2597565,
  "vegetable curry": 6522616,
  "chicken tikka masala": 29173114,

  // Biryani
  "lamb biryani": 7353393,
  "chicken biryani": 5410401,
  "prawn biryani": 9609847,
  "vegetable biryani": 14731625,

  // Sundries
  "nan": 10337726,
  "garlic nan": 35066813,
  "chips": 1583891,
  "chips & cheese": 31533633,
  "rice (basmati)": 28674660,
  "peri peri chips": 2235832,

  // Pizza
  "margherita": 35068608,
  "spicy chicken pizza": 32605621,
  "pepperoni": 33457994,
  "veg supreme": 12096782,
  "shawarma pizza": 35068608,
  "bbq chicken pizza": 32605621,

  // Wraps
  "lamb shawarma wrap": 5779364,
  "chicken shawarma wrap": 18177324,
  "halloumi wrap": 5191825,
  "chicken tikka wrap": 29173114,
  "falafel wrap": 6275189,
  "kebab mince wrap": 29358856,

  // Hoagies & Calzones
  "lamb shawarma hoagie": 5779364,
  "lamb shawarma calzone": 35068608,
  "chicken shawarma hoagie": 18177324,
  "chicken shawarma calzone": 32605621,
  "chicken tikka hoagie": 29173114,
  "chicken tikka calzone": 33457994,
  "chicken shashlik hoagie": 10615283,
  "chicken shashlik calzone": 12096782,

  // Burgers
  "al sultan special burger": 4315148,
  "classic beef burger": 12031042,
  "classic cheese burger": 11519323,
  "jalapeno burger": 28376181,
  "caribbean burger": 12325001,
  "sweet hot burger": 15901144,
  "chicken/lamb shawarma burger": 4315148,
  "classic chicken burger": 12031042,
  "vegetable burger": 11519323,

  // Southern Fried Chicken
  "fried chicken & chips (4 pcs)": 12118977,
  "chicken strips (4 pcs)": 13065202,
  "half broasted chicken": 5774006,
  "whole broasted chicken": 6697493,

  // Kids Menu
  "1 skewer royal chicken & rice": 30749027,
  "1 skewer koubideh & rice": 17794709,
  "chicken nuggets & chips": 12178045,
  "fish fingers & chips": 1583891,
  "cheese burger & chips": 11519323,

  // Sweets
  "cheese kunafa": 6262158,
  "cream kunafa": 36691304,
  "chocolate cake": 291528,
  "carrot cake": 8696280,
  "baklava (3 pcs)": 15762049,
  "baklava (served with cream)": 20183040,

  // Ice Cream
  "ice cream (2 scoops)": 5796721,
  "ice cream (3 scoops)": 22809600,

  // Hot Drinks
  "arabic tea": 16228396,
  "breakfast tea": 16228432,
  "moroccan tea": 16228425,
  "desi tea": 16228398,
  "green tea": 16228432,
  "ice tea": 16228425,
  "turkish coffee": 28161238,
  "espresso": 302899,
  "double espresso": 302899,
  "latte (caramel/vanilla)": 312418,
  "cappuccino": 302899,
  "americano": 312418,
  "hot chocolate": 5796721,
  "iced coffee": 312418,

  // Soft Drinks
  "cans 330ml": 2983100,
  "still or sparkling water": 327090,

  // Fresh Juices
  "orange juice": 158053,
  "lemon juice": 158053,
  "orange & lemon juice": 158053,
  "apple juice": 161440,
  "special sultan fruit juice": 1132558,
  "minto": 1132558,
  "kiwi juice": 161440,
  "mango juice": 1132558,
  "pineapple juice": 158053,
  "sweet melon juice": 161440,
  "flamengo": 1132558,
  "minto jug": 1132558,
  "mango jug": 1132558,

  // Milkshakes
  "special sultan milkshake": 3727250,
  "fererro milkshake": 3727250,
  "nutella milkshake": 3727250,
  "strawberry milkshake": 3727250,
  "vanilla milkshake": 3727250,
  "banana milkshake": 3727250,
  "chocolate milkshake": 3727250,
  "oreo milkshake": 3727250,
  "biscoff milkshake": 3727250,
  "maltesers milkshake": 3727250,

  // Smoothies
  "sultan special creamy panache": 1132558,
  "strawberry & raspberry": 1132558,
  "mixed berries": 1132558,
  "tooty fruity": 1132558,
  "apple berry": 161440,
  "cranberry & strawberry": 1132558,
  "strawberry & banana": 1132558,

  // Mocktails
  "classic lime mojito": 1132558,
  "strawberry mojito": 1132558,
  "raspberry mojito": 1132558,
  "mixed berries mojito": 1132558,
};

// Category-level fallback images
const categoryImages: Record<string, number> = {
  "cold-starters": 6089614,
  "hot-starters": 6275189,
  "soups": 539451,
  "salads": 5191825,
  "qozi": 18330965,
  "shawarma": 5779364,
  "vegetarian": 5191825,
  "traditionals": 7462776,
  "seafood": 3763847,
  "house-specials": 7353393,
  "grills": 15058850,
  "kebabs": 29358856,
  "indian": 9738981,
  "biryani": 7353393,
  "sundries": 10337726,
  "pizza": 35068608,
  "wraps": 5779364,
  "hoagies": 18177324,
  "burgers": 4315148,
  "fried-chicken": 12118977,
  "kids": 12178045,
  "sweets": 15762049,
  "ice-cream": 5796721,
  "hot-drinks": 16228396,
  "soft-drinks": 2983100,
  "juices": 158053,
  "milkshakes": 3727250,
  "smoothies": 1132558,
  "mocktails": 1132558,
};

// Menu item name → Local image path (overrides Pexels)
const localMenuImages: Record<string, string> = {
  "tashreeb lamb": "/images/menu/tashreeb-lamb.webp",
  "bamieh (okra)": "/images/menu/bamieh-okra.jpg",
};

export function getCategoryImage(slug: string): string {
  const id = categoryImages[slug];
  if (id) return pexelsUrl(id, 800, 600);
  return pexelsUrl(6089614, 800, 600);
}

export function getMenuItemImage(name: string, category: string): string {
  const key = name.toLowerCase();
  
  // Check for local image override first
  const localPath = localMenuImages[key];
  if (localPath) return localPath;
  
  const id = menuItemImages[key];
  if (id) return pexelsUrl(id);

  // Fallback to category image
  const catId = categoryImages[category];
  if (catId) return pexelsUrl(catId);

  return pexelsUrl(6089614);
}

export function getGalleryImage(index: number): string {
  const galleryIds = [6089614, 5779364, 15058850, 4315148, 15762049];
  const id = galleryIds[index % galleryIds.length];
  return pexelsUrl(id, 1200, 800);
}

export function getOfferImage(title: string): string {
  const offerIds = [5779364, 15058850, 4315148, 35068608, 29173114];
  const hash = title.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const id = offerIds[hash % offerIds.length];
  return pexelsUrl(id, 800, 500);
}
