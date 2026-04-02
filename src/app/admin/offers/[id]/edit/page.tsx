"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
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
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Offer</h1>
            <div className="bg-white border rounded-lg p-6 max-w-2xl">
              {offer ? <OfferForm defaultValues={offer} onSubmit={handleSubmit} /> : <div className="animate-pulse h-48 bg-gray-100 rounded" />}
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
