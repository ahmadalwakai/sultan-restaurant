import { resend } from "./resend-client";
import { EMAIL_CONFIG } from "./email-config";
import { logEmail } from "@/lib/services/email.service";
import type { EmailPayload } from "./email-types";

export async function sendEmail(payload: EmailPayload) {
  const { to, subject, html, template, replyTo } = payload;

  try {
    if (!resend) {
      console.log(`[email] Resend not configured. Would send "${subject}" to ${to}`);
      await logEmail({ to, subject, template, status: "SENT" });
      return { success: true };
    }

    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to,
      subject,
      html,
      replyTo: replyTo ?? EMAIL_CONFIG.replyTo,
    });

    await logEmail({ to, subject, template, status: "SENT", resendId: result.data?.id });
    return { success: true, id: result.data?.id };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    await logEmail({ to, subject, template, status: "FAILED", error: errorMessage });
    return { success: false, error: errorMessage };
  }
}
