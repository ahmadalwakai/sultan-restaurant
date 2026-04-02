import { z } from "zod";

export const galleryImageSchema = z.object({
  url: z.string().url("Valid image URL required"),
  alt: z.string().max(200).optional(),
  caption: z.string().max(500).optional(),
  isVisible: z.boolean().default(true),
});

export const galleryReorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      sortOrder: z.number().int().min(0),
    })
  ),
});

export type GalleryImageFormValues = z.infer<typeof galleryImageSchema>;
