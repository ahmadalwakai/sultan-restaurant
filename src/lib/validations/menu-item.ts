import { z } from "zod";

export const menuItemSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  description: z.string().max(1000).optional(),
  price: z.coerce.number().positive("Price must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().optional(),
  isAvailable: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  isVegetarian: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isGlutenFree: z.boolean().optional(),
  isSpicy: z.boolean().optional(),
  spiceLevel: z.coerce.number().int().min(0).max(5).optional(),
  allergens: z.array(z.string()).optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

export type MenuItemFormData = z.infer<typeof menuItemSchema>;
