export type MenuItemPublic = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image: string | null;
  categoryId: string;
  categoryName: string;
  isAvailable: boolean;
  isPopular: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  spiceLevel: number;
  allergens: string[];
};

export type MenuItemAdmin = MenuItemPublic & {
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateMenuItemInput = {
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: string;
  isAvailable?: boolean;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  spiceLevel?: number;
  allergens?: string[];
};

export type UpdateMenuItemInput = Partial<CreateMenuItemInput>;
