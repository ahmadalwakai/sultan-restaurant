"use client";

import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { Card } from "@chakra-ui/react";
import { MenuItemForm } from "@/components/forms/MenuItemForm";

export default function NewMenuItemPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    await fetch("/api/admin/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/admin/menu");
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title="Add Menu Item" description="Create a new menu item" />
        <Card.Root shadow="sm" borderRadius="xl" maxW="42rem">
          <Card.Body p={6}>
            <MenuItemForm onSubmit={handleSubmit} />
          </Card.Body>
        </Card.Root>
      </AdminPageShell>
    </AdminShell>
  );
}
