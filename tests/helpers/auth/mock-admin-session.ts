import { vi } from "vitest";

/** Mock an admin session for admin API/page tests */
export function mockAdminSession(overrides?: Partial<MockAdminSession>) {
  const session: MockAdminSession = {
    id: "test-admin-1",
    email: "admin@sultan.com",
    name: "Test Admin",
    role: "ADMIN",
    ...overrides,
  };

  vi.doMock("@/middleware/require-admin", () => ({
    requireAdmin: vi.fn().mockResolvedValue(session),
  }));

  return session;
}

export function mockUnauthorizedAdmin() {
  vi.doMock("@/middleware/require-admin", () => ({
    requireAdmin: vi.fn().mockRejectedValue(new Error("Unauthorized")),
  }));
}

interface MockAdminSession {
  id: string;
  email: string;
  name: string;
  role: string;
}
