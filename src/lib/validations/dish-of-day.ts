import { z } from "zod";

export const dishOfDaySchema = z.object({
  menuItemId: z.string().min(1, "Menu item is required"),
  discountPrice: z.coerce.number().min(0).optional(),
  reason: z.string().max(300).optional(),
  date: z.string().min(1, "Date is required"),
});

export type DishOfDayFormData = z.infer<typeof dishOfDaySchema>;
