// ─── Bundle Size Tracker ─────────────────────────────────

import { logger } from "../logging";

export interface BundleInfo {
  page: string;
  jsSize: number;
  cssSize: number;
  totalSize: number;
}

export function logBundleSize(info: BundleInfo): void {
  const warnThresholdKb = 250;
  const totalKb = info.totalSize / 1024;

  if (totalKb > warnThresholdKb) {
    logger.warn(`Bundle size warning: ${info.page} is ${totalKb.toFixed(1)}KB`, {
      bundleSize: true,
      page: info.page,
      jsKb: (info.jsSize / 1024).toFixed(1),
      cssKb: (info.cssSize / 1024).toFixed(1),
      totalKb: totalKb.toFixed(1),
    });
  }
}
