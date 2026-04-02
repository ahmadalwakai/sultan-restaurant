export type DishOfDayPublic = {
  id: string;
  menuItemId: string;
  menuItemName: string;
  menuItemSlug: string;
  menuItemDescription: string | null;
  menuItemImage: string | null;
  menuItemPrice: number;
  discountPrice: number | null;
  reason: string | null;
  date: string;
};

export type DishOfDayAdmin = DishOfDayPublic & {
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateDishOfDayInput = {
  menuItemId: string;
  discountPrice?: number;
  reason?: string;
  date: string;
};

export type UpdateDishOfDayInput = Partial<CreateDishOfDayInput>;
