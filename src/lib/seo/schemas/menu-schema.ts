// Menu schema types
interface Menu {
  '@context': string;
  '@type': 'Menu';
  name: string;
  description: string;
  url: string;
  image?: string;
  hasMenuSection: Array<{
    '@type': 'MenuSection';
    name: string;
    description?: string;
    image?: string;
    hasMenuItem: Array<{
      '@type': 'MenuItem';
      name: string;
      description: string;
      image?: string;
      offers: {
        '@type': 'Offer';
        price: number;
        priceCurrency: string;
        availability: string;
        validFrom?: string;
        validThrough?: string;
      };
      nutrition?: {
        '@type': 'NutritionInformation';
        calories?: string;
        proteinContent?: string;
        fatContent?: string;
        carbohydrateContent?: string;
      };
      recipeIngredient?: string[];
      additionalProperty?: Array<{
        '@type': 'PropertyValue';
        name: string;
        value: string;
      }>;
      suitableForDiet?: string[];
    }>;
  }>;
  provider: {
    '@type': 'Restaurant';
    name: string;
    url: string;
  };
}

export interface MenuItemData {
  name: string;
  description: string;
  image?: string;
  offers: {
    price: number;
    priceCurrency: string;
    availability: string;
    validFrom?: string;
    validThrough?: string;
  };
  nutrition?: {
    calories?: number;
    proteinContent?: string;
    fatContent?: string;
    carbohydrateContent?: string;
  };
  ingredients?: string[];
  allergens?: string[];
  dietaryRestrictions?: string[];
}

export interface MenuSectionData {
  name: string;
  description?: string;
  image?: string;
  menuItems: MenuItemData[];
}

export interface MenuData {
  name: string;
  description: string;
  url: string;
  image?: string;
  menuSections: MenuSectionData[];
  restaurant: {
    name: string;
    url: string;
  };
}

export function generateMenuSchema(data: MenuData): Menu {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: data.name,
    description: data.description,
    url: data.url,
    ...(data.image && { image: data.image }),
    hasMenuSection: data.menuSections.map(section => ({
      '@type': 'MenuSection',
      name: section.name,
      ...(section.description && { description: section.description }),
      ...(section.image && { image: section.image }),
      hasMenuItem: section.menuItems.map(item => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        ...(item.image && { image: item.image }),
        offers: {
          '@type': 'Offer',
          price: item.offers.price,
          priceCurrency: item.offers.priceCurrency,
          availability: item.offers.availability,
          ...(item.offers.validFrom && { validFrom: item.offers.validFrom }),
          ...(item.offers.validThrough && { validThrough: item.offers.validThrough }),
        },
        ...(item.nutrition && {
          nutrition: {
            '@type': 'NutritionInformation',
            ...(item.nutrition.calories && { calories: `${item.nutrition.calories} calories` }),
            ...(item.nutrition.proteinContent && { proteinContent: item.nutrition.proteinContent }),
            ...(item.nutrition.fatContent && { fatContent: item.nutrition.fatContent }),
            ...(item.nutrition.carbohydrateContent && { carbohydrateContent: item.nutrition.carbohydrateContent }),
          },
        }),
        ...(item.ingredients && { recipeIngredient: item.ingredients }),
        ...(item.allergens && { additionalProperty: item.allergens.map(allergen => ({
          '@type': 'PropertyValue',
          name: 'Allergen',
          value: allergen,
        })) }),
        ...(item.dietaryRestrictions && { suitableForDiet: item.dietaryRestrictions }),
      })),
    })),
    provider: {
      '@type': 'Restaurant',
      name: data.restaurant.name,
      url: data.restaurant.url,
    },
  };
}