// ─── Uptime Module Index ─────────────────────────────────

export { pingEndpoint, type PingResult } from "./uptime-ping";
export { getStatusPageData, type StatusPageData } from "./status-page-data";
export { recordPingResult, checkAndRecordUptime } from "./downtime-detector";
