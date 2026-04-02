// ─── Performance Types ───────────────────────────────────

export type PerformanceEntryType = "api" | "db" | "render" | "external" | "custom";

export interface TimingResult {
  durationMs: number;
  startTime: number;
  endTime: number;
}

export interface ApiTiming extends TimingResult {
  path: string;
  method: string;
  statusCode?: number;
}

export interface DbTiming extends TimingResult {
  query: string;
  model?: string;
  operation?: string;
}

export interface SlowEntry {
  type: PerformanceEntryType;
  name: string;
  durationMs: number;
  threshold: number;
  timestamp: string;
  metadata?: Record<string, unknown>;
}
