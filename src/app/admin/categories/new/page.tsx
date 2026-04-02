"use client";

import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { adminSpacing } from "@/lib/admin-ui";
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
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card, maxWidth: "42rem" }}>
          <CategoryForm onSubmit={handleSubmit} />
        </div>
      </AdminPageShell>
    </AdminShell>
  );
}
