export type BookingType = "TABLE" | "WEDDING";

export type BookingPublic = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  bookingType: BookingType;
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
  bookingType?: BookingType;
  specialRequests?: string;
};

export type BookingStatusType = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";

export type BookingAvailability = {
  date: string;
  availableSlots: string[];
};
