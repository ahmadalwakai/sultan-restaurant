"use client";

import Link from "next/link";
import { Box, Button, Flex, Text, chakra } from "@chakra-ui/react";
import { AdminTable } from "@/components/admin/shared/AdminTable";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category?: { name: string };
}

interface MenuItemsTableProps {
  items: MenuItem[];
  isLoading?: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function MenuItemsTable({ items, isLoading, onToggle, onDelete }: MenuItemsTableProps) {
  return (
    <AdminTable
      data={items}
      keyExtractor={(item) => item.id}
      isLoading={isLoading}
      columns={[
        { key: "name", header: "Name", render: (item) => <Text as="span" fontWeight="medium">{item.name}</Text> },
        { key: "category", header: "Category", render: (item) => item.category?.name ?? "-" },
        { key: "price", header: "Price", render: (item) => `£${(item.price / 100).toFixed(2)}` },
        {
          key: "status",
          header: "Status",
          render: (item) => (
            <chakra.button type="button" onClick={() => onToggle(item.id)} fontSize="xs" px={2} py={1} rounded="md" bg={item.isAvailable ? "green.100" : "red.100"} color={item.isAvailable ? "green.700" : "red.700"}>
              {item.isAvailable ? "Available" : "Unavailable"}
            </chakra.button>
          ),
        },
        {
          key: "actions",
          header: "Actions",
          render: (item) => (
            <Flex gap={2} justify="flex-end">
              <Link href={`/admin/menu/${item.id}/edit`}><Text fontSize="sm" color="amber.600" _hover={{ textDecoration: "underline" }}>Edit</Text></Link>
              <Button variant="ghost" size="sm" color="red.600" onClick={() => onDelete(item.id)}>Delete</Button>
            </Flex>
          ),
        },
      ]}
    />
  );
}
