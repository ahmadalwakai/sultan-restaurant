"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { Card } from "@chakra-ui/react";
import { CategoryForm } from "@/components/forms/CategoryForm";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/categories/${params.id}`).then(() => {
      // Categories don't have individual GET, fetch all and find
      fetch("/api/admin/categories").then((r) => r.json()).then((d) => {
        const found = d.data?.find((c: { id: string }) => c.id === params.id);
        setCategory(found ?? null);
      });
    });
  }, [params.id]);

  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    await fetch(`/api/admin/categories/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/admin/categories");
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title="Edit Category" description="Update category details" />
        <Card.Root shadow="sm" borderRadius="xl" maxW="42rem">
          <Card.Body p={6}>
            {category ? <CategoryForm defaultValues={category} onSubmit={handleSubmit} /> : <AdminLoadingState rows={3} height="2.5rem" />}
          </Card.Body>
        </Card.Root>
      </AdminPageShell>
    </AdminShell>
  );
}
