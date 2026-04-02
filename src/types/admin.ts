export type DashboardStats = {
  totalOrders: number;
  totalRevenue: number;
  totalBookings: number;
  totalCustomers: number;
  pendingOrders: number;
  pendingBookings: number;
  todayOrders: number;
  todayRevenue: number;
};

export type RevenueData = {
  date: string;
  revenue: number;
  orders: number;
};

export type RecentActivity = {
  id: string;
  type: "order" | "booking" | "review" | "message";
  title: string;
  description: string;
  createdAt: string;
};
