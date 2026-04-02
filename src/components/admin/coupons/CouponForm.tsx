"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CouponFormProps {
  initialData?: { id?: string; code: string; discountType: string; discountValue: number; minOrder?: number; maxUses?: number | null; expiresAt?: string | null };
}

export function CouponForm({ initialData }: CouponFormProps) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState({
    code: initialData?.code ?? "",
    discountType: initialData?.discountType ?? "PERCENTAGE",
    discountValue: initialData?.discountValue ?? 10,
    minOrder: initialData?.minOrder ?? 0,
    maxUses: initialData?.maxUses ?? "",
    expiresAt: initialData?.expiresAt?.slice(0, 10) ?? "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = isEdit ? `/api/admin/coupons/${initialData!.id}` : "/api/admin/coupons";
    const method = isEdit ? "PUT" : "POST";
    const body = { ...form, maxUses: form.maxUses === "" ? null : Number(form.maxUses) };
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false);
    router.push("/admin/coupons");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <div><label className="block text-sm font-medium mb-1">Code</label><input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} className="w-full border rounded-lg px-3 py-2 font-mono" required /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium mb-1">Type</label><select value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })} className="w-full border rounded-lg px-3 py-2"><option value="PERCENTAGE">Percentage</option><option value="FIXED">Fixed</option></select></div>
        <div><label className="block text-sm font-medium mb-1">Value</label><input type="number" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })} className="w-full border rounded-lg px-3 py-2" required /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium mb-1">Min Order (£)</label><input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })} className="w-full border rounded-lg px-3 py-2" /></div>
        <div><label className="block text-sm font-medium mb-1">Max Uses</label><input type="number" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value })} placeholder="Unlimited" className="w-full border rounded-lg px-3 py-2" /></div>
      </div>
      <div><label className="block text-sm font-medium mb-1">Expires At</label><input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
      <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">{saving ? "Saving..." : isEdit ? "Update Coupon" : "Create Coupon"}</button>
    </form>
  );
}
