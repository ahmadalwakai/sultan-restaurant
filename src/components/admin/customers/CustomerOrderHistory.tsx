"use client";

import Link from "next/link";

interface Order { id: string; orderNumber: string; total: number; status: string; createdAt: string }

export function CustomerOrderHistory({ orders }: { orders: Order[] }) {
  if (!orders.length) return <p className="text-sm text-gray-400">No orders yet.</p>;

  return (
    <div className="space-y-2">
      {orders.map((o) => (
        <Link key={o.id} href={`/admin/orders/${o.id}`} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
          <div>
            <span className="font-medium text-sm">#{o.orderNumber}</span>
            <span className="text-xs text-gray-400 ml-2">{new Date(o.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100">{o.status}</span>
            <span className="text-sm font-medium">£{(Number(o.total) / 100).toFixed(2)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
