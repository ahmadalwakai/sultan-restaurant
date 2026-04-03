"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTablePagination } from "@/components/admin/tables";
import { adminSpacing } from "@/lib/admin-ui";
import { adminHeadings } from "@/lib/admin-content";
import { brandColors } from "@/theme/branding";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Array<{ id: string; name: string; email: string; subject: string; message: string; status: string; createdAt: string }>>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/messages?page=${page}&limit=20`);
    const data = await res.json();
    setMessages(data.data);
    setTotalPages(data.meta?.totalPages ?? 1);
    setLoading(false);
  }, [page]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  async function markRead(id: string) {
    await fetch(`/api/admin/messages/${id}/read`, { method: "PATCH" });
    fetchMessages();
  }

  async function deleteMessage(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    fetchMessages();
  }

  const selectedMsg = messages.find((m) => m.id === selected);

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.messages.title} description={adminHeadings.messages.description} />

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: adminSpacing.grid }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {loading ? (
              <AdminLoadingState rows={5} height="4rem" />
            ) : messages.map((m) => (
              <button
                key={m.id}
                onClick={() => { setSelected(m.id); markRead(m.id); }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  border: selected === m.id ? `2px solid ${brandColors.gold[500]}` : "1px solid #E5E7EB",
                  background: m.status === "UNREAD" ? brandColors.gold[50] : "#FFFFFF",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#111827" }}>{m.name}</span>
                  <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.subject}</p>
              </button>
            ))}
            <AdminTablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
          <div>
            {selectedMsg ? (
              <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card }}>
                <h3 style={{ fontWeight: 600, color: "#111827" }}>{selectedMsg.subject}</h3>
                <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>{selectedMsg.name} &lt;{selectedMsg.email}&gt;</p>
                <p style={{ marginTop: "1rem", fontSize: "0.875rem", whiteSpace: "pre-wrap", color: "#374151" }}>{selectedMsg.message}</p>
                <button onClick={() => deleteMessage(selectedMsg.id)} style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#DC2626", background: "none", border: "none", cursor: "pointer" }}>Delete</button>
              </div>
            ) : (
              <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card, textAlign: "center", color: "#9CA3AF", fontSize: "0.875rem" }}>
                Select a message to view
              </div>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .admin-messages-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </AdminPageShell>
    </AdminShell>
  );
}
