export type UserPublic = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  phone: string | null;
  createdAt: string;
};

export type UserAdmin = UserPublic & {
  role: "CUSTOMER" | "ADMIN";
  googleId: string | null;
  orderCount: number;
  bookingCount: number;
  totalSpent: number;
  updatedAt: string;
};
