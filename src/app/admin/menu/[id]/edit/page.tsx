"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
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
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Menu Item</h1>
            <div className="bg-white border rounded-lg p-6 max-w-2xl">
              {item ? <MenuItemForm defaultValues={item} onSubmit={handleSubmit} /> : <div className="animate-pulse h-64 bg-gray-100 rounded" />}
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
