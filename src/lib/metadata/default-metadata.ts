import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: { default: "Sultan Restaurant | Authentic Middle Eastern Cuisine", template: "%s | Sultan Restaurant" },
  description: "Experience authentic Middle Eastern cuisine at Sultan Restaurant. Fresh kebabs, mezzes, and traditional dishes made with the finest ingredients.",
  keywords: ["restaurant", "middle eastern", "turkish", "lebanese", "halal", "london", "kebab", "meze"],
  authors: [{ name: "Sultan Restaurant" }],
  openGraph: { type: "website", siteName: "Sultan Restaurant", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
