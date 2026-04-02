import { MetadataRoute } from 'next';

export interface SitemapIndexEntry {
  url: string;
  lastModified?: string | Date;
}

export class SitemapIndexGenerator {
  private baseUrl: string;
  private sitemaps: SitemapIndexEntry[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  addSitemap(sitemap: SitemapIndexEntry): void {
    this.sitemaps.push({
      ...sitemap,
      url: sitemap.url.startsWith('http') ? sitemap.url : `${this.baseUrl}${sitemap.url}`,
    });
  }

  addSitemaps(sitemaps: SitemapIndexEntry[]): void {
    sitemaps.forEach(sitemap => this.addSitemap(sitemap));
  }

  generate(): Array<{ url: string; lastModified?: string | Date }> {
    return this.sitemaps.map(sitemap => ({
      url: sitemap.url,
      lastModified: sitemap.lastModified,
    }));
  }

  // Default sitemap structure for Sultan Restaurant
  addDefaultSitemaps(): void {
    const defaultSitemaps: SitemapIndexEntry[] = [
      { url: '/sitemap.xml', lastModified: new Date() },
      { url: '/sitemap/menu.xml', lastModified: new Date() },
      { url: '/sitemap/locations.xml', lastModified: new Date() },
      { url: '/sitemap/cuisine.xml', lastModified: new Date() },
      { url: '/sitemap/offers.xml', lastModified: new Date() },
    ];

    this.addSitemaps(defaultSitemaps);
  }
}