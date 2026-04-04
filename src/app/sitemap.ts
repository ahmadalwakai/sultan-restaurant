import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/site";
import { glasgowAreas, cuisineTypes } from "@/data/seo/glasgow-areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/menu`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/book`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/pickup`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/offers`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/delivery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/areas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const areaPages: MetadataRoute.Sitemap = glasgowAreas.map((area) => ({
    url: `${baseUrl}/areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const cuisinePages: MetadataRoute.Sitemap = cuisineTypes.flatMap((cuisine) =>
    glasgowAreas.map((area) => ({
      url: `${baseUrl}/cuisine/${cuisine.slug}-in-${area.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    }))
  );

  return [...corePages, ...areaPages, ...cuisinePages];
}
