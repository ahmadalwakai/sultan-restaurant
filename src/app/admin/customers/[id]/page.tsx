"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminCustomerDetailPage() {
  const params = useParams();
  const [customer, setCustomer] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`/api/admin/customers/${params.id}`).then((r) => r.json()).then((d) => setCustomer(d.data));
  }, [params.id]);

  if (!customer) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full" /></div>;

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <Link href="/admin/customers" className="text-sm text-gray-500 hover:underline">&larr; Back to Customers</Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-6">{customer.name as string ?? "Customer"}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
              <div className="bg-white border rounded-lg p-6">
                <h2 className="font-semibold mb-3">Details</h2>
                <p className="text-sm"><span className="text-gray-500">Email:</span> {customer.email as string}</p>
                <p className="text-sm"><span className="text-gray-500">Phone:</span> {(customer.phone as string) ?? "-"}</p>
                <p className="text-sm"><span className="text-gray-500">Joined:</span> {new Date(customer.createdAt as string).toLocaleDateString()}</p>
              </div>
              <div className="bg-white border rounded-lg p-6">
                <h2 className="font-semibold mb-3">Recent Orders</h2>
                {(customer.orders as Array<{ id: string; orderNumber: string; total: number; status: string }>)?.length ? (
                  <div className="space-y-2">
                    {(customer.orders as Array<{ id: string; orderNumber: string; total: number; status: string }>).map((o) => (
                      <Link key={o.id} href={`/admin/orders/${o.id}`} className="flex justify-between text-sm hover:bg-gray-50 p-2 rounded">
                        <span>#{o.orderNumber}</span>
                        <span>£{(Number(o.total) / 100).toFixed(2)}</span>
                      </Link>
                    ))}
                  </div>
                ) : <p className="text-sm text-gray-400">No orders</p>}
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
