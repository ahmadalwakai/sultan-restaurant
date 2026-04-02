"use client";

// ─── Web Vitals Reporter ────────────────────────────────

type WebVitalMetric = {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  id: string;
};

export function reportWebVitals(metric: WebVitalMetric): void {
  // Send to analytics endpoint
  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const body = JSON.stringify({
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
      id: metric.id,
      url: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
    navigator.sendBeacon("/api/analytics/vitals", body);
  }
}

export function onCLS(callback: (metric: WebVitalMetric) => void): void {
  if (typeof window === "undefined") return;
  import("web-vitals").then(({ onCLS }) => onCLS(callback as never)).catch(() => {});
}

export function onLCP(callback: (metric: WebVitalMetric) => void): void {
  if (typeof window === "undefined") return;
  import("web-vitals").then(({ onLCP }) => onLCP(callback as never)).catch(() => {});
}

export function onINP(callback: (metric: WebVitalMetric) => void): void {
  if (typeof window === "undefined") return;
  import("web-vitals").then(({ onINP }) => onINP(callback as never)).catch(() => {});
}
