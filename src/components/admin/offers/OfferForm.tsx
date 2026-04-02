"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface OfferFormProps {
  initialData?: { id?: string; title: string; description: string; discountType: string; discountValue: number; minOrder?: number; expiresAt?: string; imageUrl?: string };
}

export function OfferForm({ initialData }: OfferFormProps) {
  const router = useRouter();
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    discountType: initialData?.discountType ?? "PERCENTAGE",
    discountValue: initialData?.discountValue ?? 10,
    minOrder: initialData?.minOrder ?? 0,
    expiresAt: initialData?.expiresAt?.slice(0, 10) ?? "",
    imageUrl: initialData?.imageUrl ?? "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = isEdit ? `/api/admin/offers/${initialData!.id}` : "/api/admin/offers";
    const method = isEdit ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    router.push("/admin/offers");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <div><label className="block text-sm font-medium mb-1">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border rounded-lg px-3 py-2" required /></div>
      <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={3} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium mb-1">Discount Type</label><select value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })} className="w-full border rounded-lg px-3 py-2"><option value="PERCENTAGE">Percentage</option><option value="FIXED">Fixed Amount</option></select></div>
        <div><label className="block text-sm font-medium mb-1">Value</label><input type="number" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })} className="w-full border rounded-lg px-3 py-2" /></div>
      </div>
      <div><label className="block text-sm font-medium mb-1">Min Order (£)</label><input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })} className="w-full border rounded-lg px-3 py-2" /></div>
      <div><label className="block text-sm font-medium mb-1">Expires At</label><input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></div>
      <button type="submit" disabled={saving} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">{saving ? "Saving..." : isEdit ? "Update Offer" : "Create Offer"}</button>
    </form>
  );
}
