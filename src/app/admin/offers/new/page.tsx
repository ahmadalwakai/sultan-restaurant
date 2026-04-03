"use client";

import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { Card } from "@chakra-ui/react";
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
        <Card.Root shadow="sm" borderRadius="xl" maxW="42rem">
          <Card.Body p={6}>
            <OfferForm onSubmit={handleSubmit} />
          </Card.Body>
        </Card.Root>
      </AdminPageShell>
    </AdminShell>
  );
}
