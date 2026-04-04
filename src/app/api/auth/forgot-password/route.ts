import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Find admin user
    const admin = await prisma.admin.findUnique({ where: { email } });

    // Always return success to prevent email enumeration
    if (!admin) {
      console.log(`[Auth] Password reset requested for non-existent email: ${email}`);
      return NextResponse.json({ message: "If this email exists, a reset link has been sent." });
    }

    // TODO: Implement actual password reset with token
    // 1. Add resetToken and resetTokenExpiry fields to Admin model
    // 2. Generate and store token
    // 3. Send email with Resend

    console.log(`[Auth] Password reset requested for admin: ${email}`);

    // For now, just log and return success
    // In production, you would:
    // const resetToken = randomBytes(32).toString("hex");
    // const resetExpiry = new Date(Date.now() + 3600000); // 1 hour
    // await prisma.admin.update({ where: { email }, data: { resetToken, resetTokenExpiry: resetExpiry } });
    // const resetUrl = `${process.env.NEXTAUTH_URL}/admin/auth/reset-password?token=${resetToken}`;
    // await sendEmail({ to: email, subject: "Reset your password", ... });

    return NextResponse.json({ message: "If this email exists, a reset link has been sent." });
  } catch (error) {
    console.error("[Auth] Forgot password error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
