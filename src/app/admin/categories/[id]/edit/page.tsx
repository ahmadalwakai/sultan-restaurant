"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { CategoryForm } from "@/components/forms/CategoryForm";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/categories/${params.id}`).then(() => {
      // Categories don't have individual GET, fetch all and find
      fetch("/api/admin/categories").then((r) => r.json()).then((d) => {
        const found = d.data?.find((c: { id: string }) => c.id === params.id);
        setCategory(found ?? null);
      });
    });
  }, [params.id]);

  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    await fetch(`/api/admin/categories/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/admin/categories");
  }

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Category</h1>
            <div className="bg-white border rounded-lg p-6 max-w-2xl">
              {category ? <CategoryForm defaultValues={category} onSubmit={handleSubmit} /> : <div className="animate-pulse h-40 bg-gray-100 rounded" />}
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
