"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { Card } from "@chakra-ui/react";
import { MenuItemForm } from "@/components/forms/MenuItemForm";

export default function EditMenuItemPage() {
  const router = useRouter();
  const params = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/menu/${params.id}`).then((r) => r.json()).then((d) => setItem(d.data));
  }, [params.id]);

  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    await fetch(`/api/admin/menu/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/admin/menu");
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title="Edit Menu Item" description="Update menu item details" />
        <Card.Root shadow="sm" borderRadius="xl" maxW="42rem">
          <Card.Body p={6}>
            {item ? <MenuItemForm defaultValues={item} onSubmit={handleSubmit} /> : <AdminLoadingState rows={4} height="3rem" />}
          </Card.Body>
        </Card.Root>
      </AdminPageShell>
    </AdminShell>
  );
}
