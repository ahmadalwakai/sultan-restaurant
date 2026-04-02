import { signJWT } from "./jwt";
import { setSessionCookie } from "./session-cookie";

export async function createAdminSession(admin: {
  id: string;
  email: string;
  name: string;
  role: string;
}): Promise<string> {
  const token = await signJWT({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });
  await setSessionCookie(token);
  return token;
}
