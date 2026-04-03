"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { Card } from "@chakra-ui/react";
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
        <Card.Root shadow="sm" borderRadius="xl" maxW="42rem">
          <Card.Body p={6}>
            {offer ? <OfferForm defaultValues={offer} onSubmit={handleSubmit} /> : <AdminLoadingState rows={4} height="3rem" />}
          </Card.Body>
        </Card.Root>
      </AdminPageShell>
    </AdminShell>
  );
}
