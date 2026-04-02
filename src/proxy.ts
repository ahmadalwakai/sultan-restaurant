import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_PATHS = ["/admin"];
const PUBLIC_ADMIN_PATHS = ["/admin/signin", "/admin/auth/error"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin route protection
  if (ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p)) {
      return NextResponse.next();
    }

    const token = request.cookies.get("sultan-admin-session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/signin", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "fallback-secret");
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL("/admin/signin", request.url));
      response.cookies.delete("sultan-admin-session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
