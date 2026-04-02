"use client";

interface EmailLogDetailProps {
  log: { id: string; to: string; subject: string; body: string; status: string; sentAt: string; error?: string | null };
  onResend: (id: string) => void;
}

export function EmailLogDetail({ log, onResend }: EmailLogDetailProps) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{log.subject}</h3>
          <p className="text-sm text-gray-500">To: {log.to}</p>
          <p className="text-xs text-gray-400">{new Date(log.sentAt).toLocaleString()}</p>
        </div>
        <div className="flex gap-2 items-center">
          <span className={`text-xs px-2 py-1 rounded font-medium ${log.status === "SENT" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{log.status}</span>
          <button onClick={() => onResend(log.id)} className="text-sm text-amber-600 hover:underline">Resend</button>
        </div>
      </div>
      {log.error && <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">{log.error}</div>}
      <div className="border-t pt-4 text-sm text-gray-700 whitespace-pre-wrap">{log.body}</div>
    </div>
  );
}
