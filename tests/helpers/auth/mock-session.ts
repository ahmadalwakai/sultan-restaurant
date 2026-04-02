import { vi } from "vitest";

/** Mock a customer session for API/service tests */
export function mockCustomerSession(overrides?: Partial<MockSession>) {
  const session: MockSession = {
    user: {
      id: "test-user-1",
      email: "customer@test.com",
      name: "Test Customer",
      image: null,
      role: "CUSTOMER",
    },
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    ...overrides,
  };

  vi.doMock("@/lib/auth/auth", () => ({
    getSession: vi.fn().mockResolvedValue(session),
  }));

  return session;
}

export function mockUnauthenticatedSession() {
  vi.doMock("@/lib/auth/auth", () => ({
    getSession: vi.fn().mockResolvedValue(null),
  }));
}

interface MockSession {
  user: {
    id: string;
    email: string;
    name: string;
    image: string | null;
    role: string;
  };
  expires: string;
}
