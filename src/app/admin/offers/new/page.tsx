"use client";

import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { adminSpacing } from "@/lib/admin-ui";
import { OfferForm } from "@/components/forms/OfferForm";
import type { OfferAdminFormValues } from "@/lib/validators";

export default function NewOfferPage() {
  const router = useRouter();

  async function handleSubmit(data: OfferAdminFormValues) {
    await fetch("/api/admin/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/admin/offers");
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title="Add Offer" description="Create a new special offer" />
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card, maxWidth: "42rem" }}>
          <OfferForm onSubmit={handleSubmit} />
        </div>
      </AdminPageShell>
    </AdminShell>
  );
}
