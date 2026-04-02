import { z } from "zod";

export const menuItemSchema = z.object({
  name: z.string().min(2, "Name is required").max(200),
  description: z.string().max(1000).optional(),
  price: z.number().positive("Price must be positive"),
  image: z.string().url().optional().or(z.literal("")),
  categoryId: z.string().min(1, "Category is required"),
  isAvailable: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  isVegetarian: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isGlutenFree: z.boolean().optional(),
  isSpicy: z.boolean().optional(),
  spiceLevel: z.number().int().min(0).max(5).optional(),
  allergens: z.array(z.string()).optional(),
});

export type MenuItemFormValues = z.infer<typeof menuItemSchema>;
