export type BookingPublic = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string | null;
  status: BookingStatusType;
  createdAt: string;
};

export type BookingAdmin = BookingPublic & {
  userId: string | null;
  userName: string | null;
  reminderSent: boolean;
  updatedAt: string;
};

export type CreateBookingInput = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
};

export type BookingStatusType = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";

export type BookingAvailability = {
  date: string;
  availableSlots: string[];
};
