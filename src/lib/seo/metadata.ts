import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants/site";

export function generatePageMetadata({
  title,
  description,
  path = "",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  return {
    title: `${title} | ${SITE_CONFIG.name}`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: ogImage ? [{ url: ogImage }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: { canonical: url },
  };
}
