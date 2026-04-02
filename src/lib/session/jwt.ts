import { SignJWT, jwtVerify } from "jose";
import type { JWTPayload } from "@/types/session";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET
);

export async function signJWT(payload: Omit<JWTPayload, "iat" | "exp">): Promise<string> {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}
