import type { HealthCheckResult } from "./health-types";

export async function checkGoogleMaps(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return { ok: false, latencyMs: 0, message: "Google Maps API key not configured" };
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=Glasgow,UK&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const data = await response.json();
    if (data.status === "OK" || data.status === "ZERO_RESULTS") {
      return { ok: true, latencyMs: Date.now() - start };
    }
    return { ok: false, latencyMs: Date.now() - start, message: `Google Maps API: ${data.status}` };
  } catch (error) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      message: error instanceof Error ? error.message : "Google Maps API unreachable",
    };
  }
}
