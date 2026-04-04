import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required").max(20),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.number().int().min(1, "At least 1 guest").max(200, "Maximum 200 guests"),
  bookingType: z.enum(["TABLE", "WEDDING"]),
  specialRequests: z.string().max(1000).optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
