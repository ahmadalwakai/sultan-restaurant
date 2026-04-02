"use client";

import { AdminTable } from "@/components/admin/shared/AdminTable";

interface Message { id: string; name: string; email: string; subject: string; isRead: boolean; createdAt: string }

export function MessagesTable({ messages, isLoading, onSelect }: { messages: Message[]; isLoading?: boolean; onSelect: (id: string) => void }) {
  return (
    <AdminTable
      data={messages}
      keyExtractor={(m) => m.id}
      isLoading={isLoading}
      columns={[
        { key: "status", header: "", className: "w-4", render: (m) => <span className={`w-2 h-2 rounded-full inline-block ${m.isRead ? "bg-gray-300" : "bg-amber-500"}`} /> },
        { key: "from", header: "From", render: (m) => <button onClick={() => onSelect(m.id)} className={`text-left hover:text-amber-600 ${m.isRead ? "" : "font-semibold"}`}>{m.name}</button> },
        { key: "subject", header: "Subject", render: (m) => <span className={m.isRead ? "text-gray-500" : ""}>{m.subject}</span> },
        { key: "date", header: "Date", render: (m) => new Date(m.createdAt).toLocaleDateString() },
      ]}
    />
  );
}
