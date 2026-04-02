import { z } from "zod";

export const menuAdminSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  price: z.number().positive(),
  image: z.string().optional(),
  categoryId: z.string().min(1),
  isAvailable: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  isVegetarian: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isGlutenFree: z.boolean().optional(),
  isSpicy: z.boolean().optional(),
  spiceLevel: z.number().int().min(0).max(5).optional(),
  allergens: z.array(z.string()).optional(),
});

export const menuReorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      sortOrder: z.number().int().min(0),
    })
  ),
});

export type MenuAdminFormValues = z.infer<typeof menuAdminSchema>;
