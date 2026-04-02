import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email"),
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
