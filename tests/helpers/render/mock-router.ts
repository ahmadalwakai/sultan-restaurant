import { vi } from "vitest";

export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn().mockResolvedValue(undefined),
};

export const mockPathname = vi.fn().mockReturnValue("/");
export const mockSearchParams = vi.fn().mockReturnValue(new URLSearchParams());
export const mockParams = vi.fn().mockReturnValue({});

/** Apply Next.js navigation mocks — call in beforeEach */
export function setupMockRouter(pathname = "/") {
  mockPathname.mockReturnValue(pathname);

  vi.doMock("next/navigation", () => ({
    useRouter: () => mockRouter,
    usePathname: () => mockPathname(),
    useSearchParams: () => mockSearchParams(),
    useParams: () => mockParams(),
    redirect: vi.fn(),
    notFound: vi.fn(),
  }));

  return mockRouter;
}

export function resetMockRouter() {
  mockRouter.push.mockClear();
  mockRouter.replace.mockClear();
  mockRouter.back.mockClear();
  mockRouter.forward.mockClear();
  mockRouter.refresh.mockClear();
  mockRouter.prefetch.mockClear();
}
