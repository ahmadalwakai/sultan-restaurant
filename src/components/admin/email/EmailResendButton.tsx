"use client";

import { useState } from "react";
import { Button } from "@chakra-ui/react";

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
    <Button
      onClick={handleResend}
      disabled={resending || done}
      variant="outline"
      size="sm"
      colorPalette="amber"
    >
      {done ? "Resent!" : resending ? "Resending..." : "Resend"}
    </Button>
  );
}
