"use client";

import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { Card } from "@chakra-ui/react";
import { CategoryForm } from "@/components/forms/CategoryForm";

export default function NewCategoryPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/admin/categories");
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title="Add Category" description="Create a new menu category" />
        <Card.Root shadow="sm" borderRadius="xl" maxW="42rem">
          <Card.Body p={6}>
            <CategoryForm onSubmit={handleSubmit} />
          </Card.Body>
        </Card.Root>
      </AdminPageShell>
    </AdminShell>
  );
}
