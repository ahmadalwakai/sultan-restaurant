"use client";

import { useRouter } from "next/navigation";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function NewCouponPage() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      code: fd.get("code"),
      discountType: fd.get("discountType"),
      discountValue: Number(fd.get("discountValue")),
      minOrderAmount: fd.get("minOrderAmount") ? Number(fd.get("minOrderAmount")) : undefined,
      maxUses: fd.get("maxUses") ? Number(fd.get("maxUses")) : undefined,
      expiresAt: fd.get("expiresAt") || undefined,
    };
    await fetch("/api/admin/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/admin/coupons");
  }

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Coupon</h1>
            <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 max-w-2xl space-y-4">
              <div><label className="block text-sm font-medium mb-1">Code</label><input name="code" required className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Discount Type</label>
                <select name="discountType" className="w-full px-3 py-2 border rounded-lg">
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="FIXED">Fixed Amount</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Discount Value</label><input name="discountValue" type="number" required className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Min Order (pence, optional)</label><input name="minOrderAmount" type="number" className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Max Uses (optional)</label><input name="maxUses" type="number" className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Expires At (optional)</label><input name="expiresAt" type="datetime-local" className="w-full px-3 py-2 border rounded-lg" /></div>
              <button type="submit" className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">Create Coupon</button>
            </form>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
