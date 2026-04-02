"use client";

import { useRouter } from "next/navigation";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
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
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Offer</h1>
            <div className="bg-white border rounded-lg p-6 max-w-2xl">
              <OfferForm onSubmit={handleSubmit} />
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
