"use client";

import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { adminSpacing } from "@/lib/admin-ui";
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
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card, maxWidth: "42rem" }}>
          <MenuItemForm onSubmit={handleSubmit} />
        </div>
      </AdminPageShell>
    </AdminShell>
  );
}
