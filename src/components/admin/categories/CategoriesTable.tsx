"use client";

import Link from "next/link";
import { Button, Flex, Text } from "@chakra-ui/react";
import { AdminTable } from "@/components/admin/shared/AdminTable";

interface Category { id: string; name: string; slug: string; sortOrder: number; _count?: { menuItems: number } }

export function CategoriesTable({ categories, isLoading, onDelete }: { categories: Category[]; isLoading?: boolean; onDelete: (id: string) => void }) {
  return (
    <AdminTable
      data={categories}
      keyExtractor={(c) => c.id}
      isLoading={isLoading}
      columns={[
        { key: "name", header: "Name", render: (c) => <Text fontWeight="medium">{c.name}</Text> },
        { key: "slug", header: "Slug", render: (c) => c.slug },
        { key: "items", header: "Items", render: (c) => c._count?.menuItems ?? 0 },
        { key: "order", header: "Order", render: (c) => c.sortOrder },
        { key: "actions", header: "Actions", render: (c) => (
          <Flex gap={2} justify="flex-end">
            <Link href={`/admin/categories/${c.id}/edit`}><Button variant="ghost" size="sm" color="amber.600">Edit</Button></Link>
            <Button variant="ghost" size="sm" color="red.600" onClick={() => onDelete(c.id)}>Delete</Button>
          </Flex>
        )},
      ]}
    />
  );
}
