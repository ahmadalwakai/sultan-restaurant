"use client";

import { useState } from "react";

export function EmailResendButton({ emailId }: { emailId: string }) {
  const [resending, setResending] = useState(false);
  const [done, setDone] = useState(false);

  const handleResend = async () => {
    setResending(true);
    await fetch(`/api/admin/email/resend/${emailId}`, { method: "POST" });
    setResending(false);
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <button
      onClick={handleResend}
      disabled={resending || done}
      className="text-sm px-3 py-1 border border-amber-600 text-amber-600 rounded hover:bg-amber-50 disabled:opacity-50"
    >
      {done ? "Resent!" : resending ? "Resending..." : "Resend"}
    </button>
  );
}
