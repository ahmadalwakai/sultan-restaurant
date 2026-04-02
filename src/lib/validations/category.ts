import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  description: z.string().max(500).optional(),
  image: z.string().url().optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
