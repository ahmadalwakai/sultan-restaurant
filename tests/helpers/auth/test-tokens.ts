import { SignJWT, jwtVerify } from "jose";

const TEST_SECRET = new TextEncoder().encode("test-admin-jwt-secret");

/** Generate a valid admin JWT token */
export async function generateValidToken(payload?: Record<string, unknown>) {
  return new SignJWT({
    sub: "test-admin-1",
    email: "admin@sultan.com",
    role: "ADMIN",
    ...payload,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(TEST_SECRET);
}

/** Generate an expired JWT token */
export async function generateExpiredToken() {
  return new SignJWT({
    sub: "test-admin-1",
    email: "admin@sultan.com",
    role: "ADMIN",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(Math.floor(Date.now() / 1000) - 86400 * 2)
    .setExpirationTime(Math.floor(Date.now() / 1000) - 86400)
    .sign(TEST_SECRET);
}

/** Generate an invalid (wrong secret) token */
export async function generateInvalidToken() {
  const wrongSecret = new TextEncoder().encode("wrong-secret");
  return new SignJWT({ sub: "test-admin-1" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(wrongSecret);
}

/** Verify a token using the test secret */
export async function verifyTestToken(token: string) {
  return jwtVerify(token, TEST_SECRET);
}
