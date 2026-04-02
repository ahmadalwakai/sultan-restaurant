import { checkDatabase } from "./check-database";
import { checkStripe } from "./check-stripe";
import { checkResend } from "./check-resend";
import { checkStorage } from "./check-storage";
import { checkGoogleMaps } from "./check-google-maps";
import type { HealthReport, ServiceHealth } from "./health-types";
import type { ServiceName, HealthStatus } from "@/types/monitoring";

const APP_VERSION = process.env.npm_package_version ?? "0.1.0";
const startTime = Date.now();

function toServiceHealth(
  service: ServiceName,
  result: { ok: boolean; latencyMs: number; message?: string },
): ServiceHealth {
  return {
    service,
    status: result.ok ? "healthy" : "unhealthy",
    latencyMs: result.latencyMs,
    message: result.message,
    checkedAt: new Date().toISOString(),
  };
}

function overallStatus(services: ServiceHealth[]): HealthStatus {
  if (services.every((s) => s.status === "healthy")) return "healthy";
  if (services.some((s) => s.status === "unhealthy")) return "unhealthy";
  return "degraded";
}

export async function runFullHealthCheck(): Promise<HealthReport> {
  const [db, stripe, resend, storage, maps] = await Promise.allSettled([
    checkDatabase(),
    checkStripe(),
    checkResend(),
    checkStorage(),
    checkGoogleMaps(),
  ]);

  const services: ServiceHealth[] = [
    toServiceHealth("database", db.status === "fulfilled" ? db.value : { ok: false, latencyMs: 0, message: "Check failed" }),
    toServiceHealth("stripe", stripe.status === "fulfilled" ? stripe.value : { ok: false, latencyMs: 0, message: "Check failed" }),
    toServiceHealth("resend", resend.status === "fulfilled" ? resend.value : { ok: false, latencyMs: 0, message: "Check failed" }),
    toServiceHealth("storage", storage.status === "fulfilled" ? storage.value : { ok: false, latencyMs: 0, message: "Check failed" }),
    toServiceHealth("google-maps", maps.status === "fulfilled" ? maps.value : { ok: false, latencyMs: 0, message: "Check failed" }),
  ];

  return {
    status: overallStatus(services),
    version: APP_VERSION,
    uptime: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
    services,
  };
}

export async function runQuickHealthCheck(): Promise<{ status: "ok"; uptime: number }> {
  return {
    status: "ok",
    uptime: Math.floor((Date.now() - startTime) / 1000),
  };
}
