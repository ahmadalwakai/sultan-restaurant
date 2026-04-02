import { z } from "zod";

export const categoryAdminSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  description: z.string().max(500).optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const categoryReorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      sortOrder: z.number().int().min(0),
    })
  ),
});

export type CategoryAdminFormValues = z.infer<typeof categoryAdminSchema>;
