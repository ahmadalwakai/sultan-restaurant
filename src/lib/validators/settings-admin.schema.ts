import { z } from "zod";

export const generalSettingsSchema = z.object({
  siteName: z.string().min(1).max(100),
  siteDescription: z.string().max(500).optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
});

export const contactSettingsSchema = z.object({
  phone: z.string().min(1).max(20),
  email: z.string().email(),
  address: z.string().min(1).max(500),
});

export const socialLinksSchema = z.object({
  facebook: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  tiktok: z.string().url().optional().or(z.literal("")),
});

export const openingHoursSchema = z.object({
  hours: z.array(
    z.object({
      dayOfWeek: z.number().int().min(0).max(6),
      openTime: z.string(),
      closeTime: z.string(),
      isClosed: z.boolean(),
    })
  ),
});

export type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;
export type ContactSettingsValues = z.infer<typeof contactSettingsSchema>;
export type OpeningHoursValues = z.infer<typeof openingHoursSchema>;
