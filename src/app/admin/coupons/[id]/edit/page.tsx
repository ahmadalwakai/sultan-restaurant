"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function EditCouponPage() {
  const router = useRouter();
  const params = useParams();
  const [coupon, setCoupon] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/api/admin/coupons").then((r) => r.json()).then((d) => {
      const found = d.data?.find((c: { id: string }) => c.id === params.id);
      setCoupon(found ?? null);
    });
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      code: fd.get("code"),
      discountType: fd.get("discountType"),
      discountValue: Number(fd.get("discountValue")),
      minOrderAmount: fd.get("minOrderAmount") ? Number(fd.get("minOrderAmount")) : undefined,
      maxUses: fd.get("maxUses") ? Number(fd.get("maxUses")) : undefined,
    };
    await fetch(`/api/admin/coupons/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/admin/coupons");
  }

  if (!coupon) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full" /></div>;

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Coupon</h1>
            <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 max-w-2xl space-y-4">
              <div><label className="block text-sm font-medium mb-1">Code</label><input name="code" defaultValue={coupon.code as string} required className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Discount Type</label>
                <select name="discountType" defaultValue={coupon.discountType as string} className="w-full px-3 py-2 border rounded-lg">
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="FIXED">Fixed Amount</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Discount Value</label><input name="discountValue" type="number" defaultValue={coupon.discountValue as number} required className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Min Order (pence, optional)</label><input name="minOrderAmount" type="number" defaultValue={(coupon.minOrderAmount as number) ?? ""} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Max Uses (optional)</label><input name="maxUses" type="number" defaultValue={(coupon.maxUses as number) ?? ""} className="w-full px-3 py-2 border rounded-lg" /></div>
              <button type="submit" className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">Update Coupon</button>
            </form>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
