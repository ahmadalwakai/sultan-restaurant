import { deleteSessionCookie } from "./session-cookie";

export async function destroyAdminSession(): Promise<void> {
  await deleteSessionCookie();
}
