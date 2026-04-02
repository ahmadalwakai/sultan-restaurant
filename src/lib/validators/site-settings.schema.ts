import { z } from "zod";

export const siteSettingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  group: z.string().default("general"),
});

export type SiteSettingValues = z.infer<typeof siteSettingSchema>;
