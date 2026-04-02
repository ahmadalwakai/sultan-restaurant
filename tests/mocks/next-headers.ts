import { vi } from "vitest";

export const mockCookies = {
  get: vi.fn().mockReturnValue(undefined),
  set: vi.fn(),
  delete: vi.fn(),
  has: vi.fn().mockReturnValue(false),
  getAll: vi.fn().mockReturnValue([]),
};

export const mockHeaders = {
  get: vi.fn().mockReturnValue(null),
  has: vi.fn().mockReturnValue(false),
  entries: vi.fn().mockReturnValue([]),
  forEach: vi.fn(),
};

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => mockCookies),
  headers: vi.fn(() => mockHeaders),
}));
