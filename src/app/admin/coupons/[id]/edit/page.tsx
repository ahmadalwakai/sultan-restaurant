"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { adminFormStyles, adminSpacing, adminLayout } from "@/lib/admin-ui";

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
    try {
      const fd = new FormData(e.currentTarget);
      const data = {
        code: fd.get("code"),
        discountType: fd.get("discountType"),
        discountValue: Number(fd.get("discountValue")),
        minOrderAmount: fd.get("minOrderAmount") ? Number(fd.get("minOrderAmount")) : undefined,
        maxUses: fd.get("maxUses") ? Number(fd.get("maxUses")) : undefined,
      };
      const res = await fetch(`/api/admin/coupons/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Coupon updated successfully");
        router.push("/admin/coupons");
      } else {
        toast.error(result.error || "Failed to update coupon");
      }
    } catch {
      toast.error("Failed to update coupon");
    }
  }

  if (!coupon) return <AdminShell><AdminPageShell><AdminLoadingState rows={5} height="2.5rem" /></AdminPageShell></AdminShell>;

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title="Edit Coupon" description="Update coupon details" />
        <form onSubmit={handleSubmit} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card, maxWidth: "42rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div><label style={adminFormStyles.label}>Code</label><input name="code" defaultValue={coupon.code as string} required style={adminFormStyles.input} /></div>
          <div><label style={adminFormStyles.label}>Discount Type</label>
            <select name="discountType" defaultValue={coupon.discountType as string} style={adminFormStyles.select}>
              <option value="PERCENTAGE">Percentage</option>
              <option value="FIXED">Fixed Amount</option>
            </select>
          </div>
          <div><label style={adminFormStyles.label}>Discount Value</label><input name="discountValue" type="number" defaultValue={coupon.discountValue as number} required style={adminFormStyles.input} /></div>
          <div><label style={adminFormStyles.label}>Min Order (pence, optional)</label><input name="minOrderAmount" type="number" defaultValue={(coupon.minOrderAmount as number) ?? ""} style={adminFormStyles.input} /></div>
          <div><label style={adminFormStyles.label}>Max Uses (optional)</label><input name="maxUses" type="number" defaultValue={(coupon.maxUses as number) ?? ""} style={adminFormStyles.input} /></div>
          <button type="submit" style={{ ...adminLayout.primaryBtn, padding: "0.5rem 1.5rem", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, alignSelf: "flex-start" }}>Update Coupon</button>
        </form>
      </AdminPageShell>
    </AdminShell>
  );
}
