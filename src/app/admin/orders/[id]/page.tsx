"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

const STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED", "CANCELLED"];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`/api/admin/orders/${params.id}`).then((r) => r.json()).then((d) => setOrder(d.data));
  }, [params.id]);

  async function updateStatus(status: string) {
    await fetch(`/api/admin/orders/${params.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrder((prev) => prev ? { ...prev, status } : prev);
  }

  async function handleRefund() {
    if (!confirm("Are you sure you want to refund this order?")) return;
    await fetch(`/api/admin/orders/${params.id}/refund`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
    router.refresh();
  }

  if (!order) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full" /></div>;

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Link href="/admin/orders" className="text-sm text-gray-500 hover:underline">&larr; Back to Orders</Link>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">Order #{order.orderNumber as string}</h1>
              </div>
              <button onClick={handleRefund} className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50">Refund</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border rounded-lg p-6">
                <h2 className="font-semibold mb-4">Items</h2>
                <div className="space-y-3">
                  {(order.items as Array<{ id: string; menuItem: { name: string }; quantity: number; price: number }>)?.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.menuItem.name} x{item.quantity}</span>
                      <span>£{(Number(item.price) * item.quantity / 100).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t flex justify-between font-semibold">
                    <span>Total</span>
                    <span>£{(Number(order.total) / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white border rounded-lg p-6">
                  <h2 className="font-semibold mb-3">Status</h2>
                  <select
                    value={order.status as string}
                    onChange={(e) => updateStatus(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="bg-white border rounded-lg p-6">
                  <h2 className="font-semibold mb-3">Customer</h2>
                  <p className="text-sm">{order.customerName as string}</p>
                  <p className="text-sm text-gray-500">{order.customerPhone as string}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
