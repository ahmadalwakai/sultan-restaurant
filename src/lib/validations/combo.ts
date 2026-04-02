import { z } from "zod";

export const comboItemSchema = z.object({
  menuItemId: z.string().min(1, "Menu item is required"),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
});

export const comboSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().max(500).optional(),
  image: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive"),
  servesCount: z.coerce.number().int().min(1).optional(),
  isAvailable: z.boolean().optional(),
  isActive: z.boolean().optional(),
  items: z.array(comboItemSchema).min(1, "At least one item is required"),
});

export type ComboFormData = z.infer<typeof comboSchema>;
