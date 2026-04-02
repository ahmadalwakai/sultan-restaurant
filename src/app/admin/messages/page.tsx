"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPagination } from "@/components/admin/shared/AdminPagination";

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
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <AdminPageHeader title="Messages" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-2">
                {loading ? (
                  <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />)}</div>
                ) : messages.map((m) => (
                  <button key={m.id} onClick={() => { setSelected(m.id); markRead(m.id); }} className={`w-full text-left p-4 rounded-lg border hover:bg-gray-50 ${m.status === "UNREAD" ? "bg-amber-50 border-amber-200" : "bg-white"} ${selected === m.id ? "ring-2 ring-amber-500" : ""}`}>
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">{m.name}</span>
                      <span className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{m.subject}</p>
                  </button>
                ))}
                <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
              <div>
                {selectedMsg ? (
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="font-semibold">{selectedMsg.subject}</h3>
                    <p className="text-sm text-gray-500">{selectedMsg.name} &lt;{selectedMsg.email}&gt;</p>
                    <p className="mt-4 text-sm whitespace-pre-wrap">{selectedMsg.message}</p>
                    <button onClick={() => deleteMessage(selectedMsg.id)} className="mt-4 text-sm text-red-600 hover:underline">Delete</button>
                  </div>
                ) : (
                  <div className="bg-white border rounded-lg p-6 text-center text-gray-400 text-sm">Select a message to view</div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
