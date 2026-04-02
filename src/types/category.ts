export type CategoryPublic = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  itemCount: number;
};

export type CategoryAdmin = CategoryPublic & {
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateCategoryInput = {
  name: string;
  description?: string;
  image?: string;
  isActive?: boolean;
};

export type UpdateCategoryInput = Partial<CreateCategoryInput>;
