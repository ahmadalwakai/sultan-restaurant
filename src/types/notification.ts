export type NotificationType = "TABLE_BOOKING" | "WEDDING_BOOKING" | "ORDER" | "SHISHA_BOOKING";

export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  guests?: number;
  orderNumber?: string;
  total?: number;
  status: string;
  createdAt: string;
  read: boolean;
}

export interface NotificationsResponse {
  success: boolean;
  data: AdminNotification[];
  total: number;
  error?: string;
}
