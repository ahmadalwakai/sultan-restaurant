import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.coerce.number().min(1, "At least 1 guest").max(20, "Maximum 20 guests"),
  specialRequests: z.string().max(500).optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
