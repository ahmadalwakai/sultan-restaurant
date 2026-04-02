"use client";

import Link from "next/link";

interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
}

export function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <div className="bg-white border rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Recent Orders</h3>
        <Link href="/admin/orders" className="text-sm text-amber-600 hover:underline">View all</Link>
      </div>
      <div className="space-y-3">
        {orders.map((order) => (
          <Link key={order.id} href={`/admin/orders/${order.id}`} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">#{order.orderNumber}</p>
              <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-sm">£{(Number(order.total) / 100).toFixed(2)}</p>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-100">{order.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
