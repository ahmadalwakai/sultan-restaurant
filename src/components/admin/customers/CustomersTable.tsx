"use client";

import Link from "next/link";
import { Text } from "@chakra-ui/react";
import { AdminTable } from "@/components/admin/shared/AdminTable";

interface Customer { id: string; name: string; email: string; _count?: { orders: number; bookings: number }; createdAt: string }

export function CustomersTable({ customers, isLoading }: { customers: Customer[]; isLoading?: boolean }) {
  return (
    <AdminTable
      data={customers}
      keyExtractor={(c) => c.id}
      isLoading={isLoading}
      columns={[
        { key: "name", header: "Name", render: (c) => <Link href={`/admin/customers/${c.id}`}><Text color="amber.600" _hover={{ textDecoration: "underline" }} fontWeight="medium">{c.name}</Text></Link> },
        { key: "email", header: "Email", render: (c) => c.email },
        { key: "orders", header: "Orders", render: (c) => c._count?.orders ?? 0 },
        { key: "bookings", header: "Bookings", render: (c) => c._count?.bookings ?? 0 },
        { key: "joined", header: "Joined", render: (c) => new Date(c.createdAt).toLocaleDateString() },
      ]}
    />
  );
}
