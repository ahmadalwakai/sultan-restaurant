import { z } from "zod";

export const seoSettingsSchema = z.object({
  pageSlug: z.string().min(1),
  title: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
  ogImage: z.string().url().optional().or(z.literal("")),
  canonicalUrl: z.string().url().optional().or(z.literal("")),
  noIndex: z.boolean().default(false),
});

export type SeoSettingsFormValues = z.infer<typeof seoSettingsSchema>;
