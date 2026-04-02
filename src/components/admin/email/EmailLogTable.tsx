"use client";

import { AdminTable } from "@/components/admin/shared/AdminTable";

interface EmailLog { id: string; to: string; subject: string; status: string; sentAt: string }

export function EmailLogTable({ logs, isLoading, onSelect }: { logs: EmailLog[]; isLoading?: boolean; onSelect: (id: string) => void }) {
  return (
    <AdminTable
      data={logs}
      keyExtractor={(l) => l.id}
      isLoading={isLoading}
      columns={[
        { key: "to", header: "To", render: (l) => <button onClick={() => onSelect(l.id)} className="text-amber-600 hover:underline">{l.to}</button> },
        { key: "subject", header: "Subject", render: (l) => l.subject },
        { key: "status", header: "Status", render: (l) => {
          const color = l.status === "SENT" ? "bg-green-100 text-green-700" : l.status === "FAILED" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700";
          return <span className={`text-xs px-2 py-1 rounded font-medium ${color}`}>{l.status}</span>;
        }},
        { key: "date", header: "Sent At", render: (l) => new Date(l.sentAt).toLocaleString() },
      ]}
    />
  );
}
