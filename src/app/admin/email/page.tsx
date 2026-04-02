"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";

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
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <AdminPageHeader title="Email" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Send Test Email</h3>
                <form onSubmit={sendTest} className="space-y-3">
                  <input value={testEmail} onChange={(e) => setTestEmail(e.target.value)} placeholder="Recipient email" required type="email" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  <input value={testSubject} onChange={(e) => setTestSubject(e.target.value)} placeholder="Subject" required className="w-full px-3 py-2 border rounded-lg text-sm" />
                  <button type="submit" disabled={sending} className="w-full py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 text-sm">
                    {sending ? "Sending..." : "Send Test"}
                  </button>
                </form>
              </div>
            </div>
            <h3 className="font-semibold mb-4">Email Log</h3>
            {loading ? (
              <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />)}</div>
            ) : (
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{log.to}</td>
                        <td className="px-4 py-3 text-sm">{log.subject}</td>
                        <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded ${log.status === "SENT" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{log.status}</span></td>
                        <td className="px-4 py-3 text-sm text-gray-500">{new Date(log.sentAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
