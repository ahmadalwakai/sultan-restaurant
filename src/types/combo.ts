export type ComboPublic = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  price: number;
  originalPrice: number;
  savings: number;
  servesCount: number;
  isAvailable: boolean;
  items: ComboItemPublic[];
};

export type ComboItemPublic = {
  id: string;
  menuItemId: string;
  menuItemName: string;
  menuItemImage: string | null;
  quantity: number;
};

export type ComboAdmin = ComboPublic & {
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateComboInput = {
  name: string;
  description?: string;
  image?: string;
  price: number;
  servesCount?: number;
  isAvailable?: boolean;
  isActive?: boolean;
  items: { menuItemId: string; quantity: number }[];
};

export type UpdateComboInput = Partial<CreateComboInput>;
