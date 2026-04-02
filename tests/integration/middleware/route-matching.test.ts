import { describe, it, expect } from "vitest";

describe("Route Matching", () => {
  const ADMIN_PATHS = ["/admin"];
  const PUBLIC_ADMIN_PATHS = ["/admin/signin", "/admin/auth/error"];

  const isAdminRoute = (pathname: string): boolean =>
    ADMIN_PATHS.some((p) => pathname.startsWith(p));

  const isPublicAdminRoute = (pathname: string): boolean =>
    PUBLIC_ADMIN_PATHS.some((p) => pathname === p);

  it("should match admin dashboard", () => {
    expect(isAdminRoute("/admin/dashboard")).toBe(true);
  });

  it("should match admin bookings", () => {
    expect(isAdminRoute("/admin/bookings")).toBe(true);
  });

  it("should not match public routes", () => {
    expect(isAdminRoute("/menu")).toBe(false);
    expect(isAdminRoute("/")).toBe(false);
  });

  it("should identify public admin routes", () => {
    expect(isPublicAdminRoute("/admin/signin")).toBe(true);
    expect(isPublicAdminRoute("/admin/auth/error")).toBe(true);
  });

  it("should not mark dashboard as public admin", () => {
    expect(isPublicAdminRoute("/admin/dashboard")).toBe(false);
  });
});
