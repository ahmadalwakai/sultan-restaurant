"use client";

import Link from "next/link";
import { AdminTable } from "@/components/admin/shared/AdminTable";

interface Order { id: string; orderNumber: string; customerName: string; total: number; status: string; createdAt: string }

export function OrdersTable({ orders, isLoading }: { orders: Order[]; isLoading?: boolean }) {
  return (
    <AdminTable
      data={orders}
      keyExtractor={(o) => o.id}
      isLoading={isLoading}
      columns={[
        { key: "orderNumber", header: "Order #", render: (o) => <span className="font-medium">#{o.orderNumber}</span> },
        { key: "customer", header: "Customer", render: (o) => o.customerName },
        { key: "total", header: "Total", render: (o) => `£${(Number(o.total) / 100).toFixed(2)}` },
        { key: "status", header: "Status", render: (o) => <span className="text-xs px-2 py-1 rounded bg-gray-100">{o.status}</span> },
        { key: "date", header: "Date", render: (o) => new Date(o.createdAt).toLocaleDateString() },
        { key: "actions", header: "", className: "text-right", render: (o) => <Link href={`/admin/orders/${o.id}`} className="text-sm text-amber-600 hover:underline">View</Link> },
      ]}
    />
  );
}
