import { MetadataRoute } from 'next';

export interface SitemapUrl {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export class SitemapGenerator {
  private baseUrl: string;
  private urls: SitemapUrl[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  addUrl(url: SitemapUrl): void {
    this.urls.push({
      ...url,
      url: url.url.startsWith('http') ? url.url : `${this.baseUrl}${url.url}`,
    });
  }

  addUrls(urls: SitemapUrl[]): void {
    urls.forEach(url => this.addUrl(url));
  }

  generate(): MetadataRoute.Sitemap {
    return this.urls.map(url => ({
      url: url.url,
      lastModified: url.lastModified,
      changeFrequency: url.changeFrequency,
      priority: url.priority,
    }));
  }

  // Static pages
  addStaticPages(): void {
    const staticPages: SitemapUrl[] = [
      { url: '/', priority: 1.0, changeFrequency: 'daily' },
      { url: '/menu', priority: 0.9, changeFrequency: 'weekly' },
      { url: '/book', priority: 0.8, changeFrequency: 'monthly' },
      { url: '/delivery', priority: 0.8, changeFrequency: 'monthly' },
      { url: '/pickup', priority: 0.8, changeFrequency: 'monthly' },
      { url: '/offers', priority: 0.8, changeFrequency: 'weekly' },
      { url: '/contact', priority: 0.7, changeFrequency: 'monthly' },
      { url: '/about', priority: 0.6, changeFrequency: 'monthly' },
      { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
      { url: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    ];

    this.addUrls(staticPages);
  }

  // Location pages for local SEO
  addLocationPages(): void {
    const locations = [
      'glasgow',
      'bridgeton',
      'gallowgate',
      'east-end-glasgow',
      'merchant-city',
      'city-centre',
      'west-end',
      'southside',
      'north-glasgow',
      'cathcart',
      'shawlands',
      'pollokshields',
      'hillhead',
      'kelvingrove',
      'finnieston',
      'partick',
      'hyndland',
      'dowanhill',
      'kings-park',
      'castlemilk',
      'croftfoot',
      'spittal',
    ];

    const locationPages: SitemapUrl[] = locations.map(location => ({
      url: `/locations/${location}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    }));

    this.addUrls(locationPages);
  }

  // Cuisine pages
  addCuisinePages(): void {
    const cuisines = [
      'syrian',
      'lebanese',
      'indian',
      'iraqi',
      'middle-eastern',
    ];

    const cuisinePages: SitemapUrl[] = cuisines.map(cuisine => ({
      url: `/cuisine/${cuisine}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    }));

    this.addUrls(cuisinePages);
  }
}