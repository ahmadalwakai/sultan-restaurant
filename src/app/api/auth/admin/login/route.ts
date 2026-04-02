import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { adminLoginSchema } from "@/lib/validators";
import { adminRepository } from "@/lib/repositories";
import { verifyPassword } from "@/lib/crypto";
import { createAdminSession } from "@/lib/session";
import { UnauthorizedError } from "@/lib/errors";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { email, password } = await parseBody(req, adminLoginSchema);
  const admin = await adminRepository.findByEmail(email);
  if (!admin) throw new UnauthorizedError("Invalid credentials");

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) throw new UnauthorizedError("Invalid credentials");

  await adminRepository.updateLastLogin(admin.id);
  const token = await createAdminSession(admin);

  return successResponse({ token, admin: { id: admin.id, email: admin.email, name: admin.name } });
});
