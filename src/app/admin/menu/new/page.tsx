"use client";

import { useRouter } from "next/navigation";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
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
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Menu Item</h1>
            <div className="bg-white border rounded-lg p-6 max-w-2xl">
              <MenuItemForm onSubmit={handleSubmit} />
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
