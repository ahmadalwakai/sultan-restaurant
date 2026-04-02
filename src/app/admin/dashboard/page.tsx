"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { RecentBookings } from "@/components/admin/dashboard/RecentBookings";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { QuickActions } from "@/components/admin/dashboard/QuickActions";

export default function DashboardPage() {
  const [stats, setStats] = useState<{ totalOrders: number; totalRevenue: number; totalBookings: number; totalCustomers: number } | null>(null);
  const [recent, setRecent] = useState<{ recentOrders: never[]; recentBookings: never[] }>({ recentOrders: [], recentBookings: [] });
  const [revenue, setRevenue] = useState<never[]>([]);

  useEffect(() => {
    fetch("/api/admin/dashboard/stats").then((r) => r.json()).then((d) => setStats(d.data));
    fetch("/api/admin/dashboard/recent").then((r) => r.json()).then((d) => setRecent(d.data));
    fetch("/api/admin/dashboard/revenue").then((r) => r.json()).then((d) => setRevenue(d.data));
  }, []);

  const statCards = stats
    ? [
        { label: "Total Orders", value: stats.totalOrders, icon: "📦" },
        { label: "Revenue", value: `£${(stats.totalRevenue / 100).toFixed(2)}`, icon: "💰" },
        { label: "Bookings", value: stats.totalBookings, icon: "📅" },
        { label: "Customers", value: stats.totalCustomers, icon: "👥" },
      ]
    : [];

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <DashboardStats stats={statCards} isLoading={!stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <RevenueChart data={revenue} />
              <QuickActions />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <RecentOrders orders={recent.recentOrders} />
              <RecentBookings bookings={recent.recentBookings} />
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
