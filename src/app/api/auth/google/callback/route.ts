import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/auth/signin?error=${error || "no_code"}`
    );
  }

  // Exchange code for tokens via NextAuth's built-in Google provider
  // This route is a fallback — NextAuth handles the main OAuth flow
  return NextResponse.redirect(
    `${process.env.NEXTAUTH_URL}/api/auth/callback/google?code=${encodeURIComponent(code)}`
  );
}
