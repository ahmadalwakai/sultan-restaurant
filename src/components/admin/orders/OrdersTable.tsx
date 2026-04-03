"use client";

import Link from "next/link";
import { Text, Badge } from "@chakra-ui/react";
import { AdminTable } from "@/components/admin/shared/AdminTable";

interface Order { id: string; orderNumber: string; customerName: string; total: number; status: string; createdAt: string }

export function OrdersTable({ orders, isLoading }: { orders: Order[]; isLoading?: boolean }) {
  return (
    <AdminTable
      data={orders}
      keyExtractor={(o) => o.id}
      isLoading={isLoading}
      columns={[
        {
          key: "orderNumber",
          header: "Order #",
          render: (o) => <Text fontWeight="medium">#{o.orderNumber}</Text>
        },
        {
          key: "customer",
          header: "Customer",
          render: (o) => <Text>{o.customerName}</Text>
        },
        {
          key: "total",
          header: "Total",
          render: (o) => <Text>£{(Number(o.total) / 100).toFixed(2)}</Text>
        },
        {
          key: "status",
          header: "Status",
          render: (o) => (
            <Badge fontSize="xs" px={2} py={1} borderRadius="md" bg="gray.100" color="gray.700">
              {o.status}
            </Badge>
          )
        },
        {
          key: "date",
          header: "Date",
          render: (o) => <Text>{new Date(o.createdAt).toLocaleDateString()}</Text>
        },
        {
          key: "actions",
          header: "",
          render: (o) => (
            <Link href={`/admin/orders/${o.id}`}>
              <Text fontSize="sm" color="amber.600" _hover={{ textDecoration: "underline" }}>
                View
              </Text>
            </Link>
          )
        },
      ]}
    />
  );
}
