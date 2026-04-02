"use client";

import { useState } from "react";

export function EmailTestSender() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("Test Email from Sultan");
  const [body, setBody] = useState("This is a test email sent from the Sultan admin panel.");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/email/test", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to, subject, body }) });
      const data = await res.json();
      setResult({ success: res.ok, message: res.ok ? "Test email sent successfully!" : data.error ?? "Failed to send" });
    } catch {
      setResult({ success: false, message: "Network error" });
    }
    setSending(false);
  };

  return (
    <form onSubmit={handleSend} className="space-y-4 max-w-xl">
      <div><label className="block text-sm font-medium mb-1">To</label><input type="email" value={to} onChange={(e) => setTo(e.target.value)} className="w-full border rounded-lg px-3 py-2" required /></div>
      <div><label className="block text-sm font-medium mb-1">Subject</label><input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border rounded-lg px-3 py-2" required /></div>
      <div><label className="block text-sm font-medium mb-1">Body</label><textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full border rounded-lg px-3 py-2" rows={4} /></div>
      {result && <div className={`p-3 rounded text-sm ${result.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{result.message}</div>}
      <button type="submit" disabled={sending} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50">{sending ? "Sending..." : "Send Test Email"}</button>
    </form>
  );
}
