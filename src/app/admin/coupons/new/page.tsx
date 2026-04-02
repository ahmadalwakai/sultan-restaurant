"use client";

import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { adminFormStyles, adminSpacing, adminLayout } from "@/lib/admin-ui";

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
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title="Add Coupon" description="Create a new discount coupon" />
        <form onSubmit={handleSubmit} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card, maxWidth: "42rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div><label style={adminFormStyles.label}>Code</label><input name="code" required style={adminFormStyles.input} /></div>
          <div><label style={adminFormStyles.label}>Discount Type</label>
            <select name="discountType" style={adminFormStyles.select}>
              <option value="PERCENTAGE">Percentage</option>
              <option value="FIXED">Fixed Amount</option>
            </select>
          </div>
          <div><label style={adminFormStyles.label}>Discount Value</label><input name="discountValue" type="number" required style={adminFormStyles.input} /></div>
          <div><label style={adminFormStyles.label}>Min Order (pence, optional)</label><input name="minOrderAmount" type="number" style={adminFormStyles.input} /></div>
          <div><label style={adminFormStyles.label}>Max Uses (optional)</label><input name="maxUses" type="number" style={adminFormStyles.input} /></div>
          <div><label style={adminFormStyles.label}>Expires At (optional)</label><input name="expiresAt" type="datetime-local" style={adminFormStyles.input} /></div>
          <button type="submit" style={{ ...adminLayout.primaryBtn, padding: "0.5rem 1.5rem", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, alignSelf: "flex-start" }}>Create Coupon</button>
        </form>
      </AdminPageShell>
    </AdminShell>
  );
}
