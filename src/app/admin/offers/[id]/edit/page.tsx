"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { adminSpacing } from "@/lib/admin-ui";
import { OfferForm } from "@/components/forms/OfferForm";
import type { OfferAdminFormValues } from "@/lib/validators";

export default function EditOfferPage() {
  const router = useRouter();
  const params = useParams();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/offers/${params.id}`).then((r) => r.json()).then((d) => setOffer(d.data));
  }, [params.id]);

  async function handleSubmit(data: OfferAdminFormValues) {
    await fetch(`/api/admin/offers/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/admin/offers");
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title="Edit Offer" description="Update offer details" />
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card, maxWidth: "42rem" }}>
          {offer ? <OfferForm defaultValues={offer} onSubmit={handleSubmit} /> : <AdminLoadingState rows={4} height="3rem" />}
        </div>
      </AdminPageShell>
    </AdminShell>
  );
}
