"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminStatusBadge } from "@/components/admin/tables";
import { VStack, HStack, Button } from "@chakra-ui/react";
import { adminHeadings, adminActions } from "@/lib/admin-content";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Array<{ id: string; title: string; discountType: string; discountValue: number; isActive: boolean }>>([]);
  const [loading, setLoading] = useState(true);

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/offers");
    const data = await res.json();
    setOffers(data.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchOffers(); }, [fetchOffers]);

  async function toggleOffer(id: string) {
    await fetch(`/api/admin/offers/${id}/toggle`, { method: "PATCH" });
    fetchOffers();
  }

  async function deleteOffer(id: string) {
    if (!confirm("Delete this offer?")) return;
    await fetch(`/api/admin/offers/${id}`, { method: "DELETE" });
    fetchOffers();
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <VStack gap={0} align="stretch">
          <AdminSectionTitle title={adminHeadings.offers.title} description={adminHeadings.offers.description} actionLabel={adminActions.addOffer} actionHref="/admin/offers/new" />

          {loading ? (
            <AdminLoadingState rows={3} height="3.5rem" />
          ) : (
            <AdminTableShell>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F9FAFB" }}>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Title</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Discount</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Status</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((o) => (
                    <tr key={o.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", fontWeight: 500 }}>{o.title}</td>
                      <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>{o.discountType === "PERCENTAGE" ? `${o.discountValue}%` : `£${(o.discountValue / 100).toFixed(2)}`}</td>
                      <td style={{ padding: "0.75rem 1rem" }}>
                        <Button size="xs" variant="plain" p={0} onClick={() => toggleOffer(o.id)}>
                          <AdminStatusBadge status={o.isActive ? "Active" : "Inactive"} />
                        </Button>
                      </td>
                      <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                        <HStack gap={3} justify="flex-end">
                          <Link href={`/admin/offers/${o.id}/edit`} style={{ fontSize: "0.875rem", color: "#D97706", textDecoration: "none" }}>{adminActions.edit}</Link>
                          <Button size="xs" variant="plain" color="red.600" onClick={() => deleteOffer(o.id)}>{adminActions.delete}</Button>
                        </HStack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AdminTableShell>
          )}
        </VStack>
      </AdminPageShell>
    </AdminShell>
  );
}
