import { vi } from "vitest";

/**
 * Create a mock Prisma client with all model methods stubbed.
 * Use vi.mocked() to customise return values per test.
 */
function createMockModel() {
  return {
    findMany: vi.fn().mockResolvedValue([]),
    findFirst: vi.fn().mockResolvedValue(null),
    findUnique: vi.fn().mockResolvedValue(null),
    create: vi.fn().mockResolvedValue({}),
    update: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
    updateMany: vi.fn().mockResolvedValue({ count: 0 }),
    count: vi.fn().mockResolvedValue(0),
    upsert: vi.fn().mockResolvedValue({}),
    aggregate: vi.fn().mockResolvedValue({}),
    groupBy: vi.fn().mockResolvedValue([]),
  };
}

export const prismaMock = {
  user: createMockModel(),
  admin: createMockModel(),
  account: createMockModel(),
  session: createMockModel(),
  category: createMockModel(),
  menuItem: createMockModel(),
  order: createMockModel(),
  orderItem: createMockModel(),
  booking: createMockModel(),
  combo: createMockModel(),
  comboItem: createMockModel(),
  dishOfDay: createMockModel(),
  coupon: createMockModel(),
  offer: createMockModel(),
  review: createMockModel(),
  galleryImage: createMockModel(),
  contactMessage: createMockModel(),
  siteSetting: createMockModel(),
  openingHours: createMockModel(),
  seoSettings: createMockModel(),
  emailLog: createMockModel(),
  $transaction: vi.fn((fn: any) => fn(prismaMock)),
  $connect: vi.fn(),
  $disconnect: vi.fn(),
};

vi.mock("@/lib/db/prisma", () => ({
  default: prismaMock,
  prisma: prismaMock,
}));

export function resetPrismaMock() {
  for (const model of Object.values(prismaMock)) {
    if (typeof model === "object" && model !== null) {
      for (const method of Object.values(model)) {
        if (typeof method === "function" && "mockClear" in method) {
          (method as any).mockClear();
        }
      }
    }
  }
}
