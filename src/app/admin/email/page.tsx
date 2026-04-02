"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle, AdminLoadingState } from "@/components/admin/shared";
import { AdminTableShell, AdminTablePagination, AdminStatusBadge } from "@/components/admin/tables";
import { adminTableStyles, adminFormStyles, adminLayout, adminSpacing } from "@/lib/admin-ui";
import { adminHeadings } from "@/lib/admin-content";

export default function AdminEmailPage() {
  const [logs, setLogs] = useState<Array<{ id: string; to: string; subject: string; status: string; sentAt: string }>>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [testEmail, setTestEmail] = useState("");
  const [testSubject, setTestSubject] = useState("");
  const [sending, setSending] = useState(false);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/email/log?page=${page}&limit=20`);
    const data = await res.json();
    setLogs(data.data ?? []);
    setTotalPages(data.meta?.totalPages ?? 1);
    setLoading(false);
  }, [page]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  async function sendTest(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await fetch("/api/admin/email/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: testEmail, subject: testSubject, body: "Test email from Sultan Restaurant admin" }),
    });
    setSending(false);
    setTestEmail("");
    setTestSubject("");
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.email.title} description={adminHeadings.email.description} />

        {/* Test Email Card */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.5rem", padding: adminSpacing.card, maxWidth: "24rem", marginBottom: adminSpacing.stack }}>
          <h3 style={{ fontWeight: 600, color: "#111827", marginBottom: "1rem" }}>Send Test Email</h3>
          <form onSubmit={sendTest} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input value={testEmail} onChange={(e) => setTestEmail(e.target.value)} placeholder="Recipient email" required type="email" style={adminFormStyles.input} onFocus={(e) => Object.assign(e.currentTarget.style, adminFormStyles.inputFocus)} onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }} />
            <input value={testSubject} onChange={(e) => setTestSubject(e.target.value)} placeholder="Subject" required style={adminFormStyles.input} onFocus={(e) => Object.assign(e.currentTarget.style, adminFormStyles.inputFocus)} onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }} />
            <button type="submit" disabled={sending} style={{ ...adminLayout.primaryBtn, width: "100%", padding: "0.5rem", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, opacity: sending ? 0.5 : 1 }}>
              {sending ? "Sending..." : "Send Test"}
            </button>
          </form>
        </div>

        <h3 style={{ fontWeight: 600, color: "#111827", marginBottom: "1rem" }}>Email Log</h3>

        {loading ? (
          <AdminLoadingState rows={5} height="3rem" />
        ) : (
          <AdminTableShell>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={adminTableStyles.head}>
                  <th style={adminTableStyles.headCell}>To</th>
                  <th style={adminTableStyles.headCell}>Subject</th>
                  <th style={adminTableStyles.headCell}>Status</th>
                  <th style={adminTableStyles.headCell}>Sent</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} onMouseEnter={(e) => (e.currentTarget.style.background = adminTableStyles.rowHover.background!)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={adminTableStyles.cell}>{log.to}</td>
                    <td style={adminTableStyles.cell}>{log.subject}</td>
                    <td style={adminTableStyles.cell}><AdminStatusBadge status={log.status} /></td>
                    <td style={{ ...adminTableStyles.cell, color: "#6B7280" }}>{new Date(log.sentAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AdminTableShell>
        )}

        <AdminTablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </AdminPageShell>
    </AdminShell>
  );
}
