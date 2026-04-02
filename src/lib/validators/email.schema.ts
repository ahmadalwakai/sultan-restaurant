import { z } from "zod";

export const sendTestEmailSchema = z.object({
  to: z.string().email(),
  template: z.string().min(1),
});

export const resendEmailSchema = z.object({
  emailLogId: z.string().min(1),
});

export type SendTestEmailValues = z.infer<typeof sendTestEmailSchema>;
