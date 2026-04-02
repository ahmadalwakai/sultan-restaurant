import { prisma } from '@/lib/db/prisma';
import { SitemapGenerator } from './sitemap-generator';

export class DynamicSitemapGenerator extends SitemapGenerator {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async addMenuItems(): Promise<void> {
    try {
      const menuItems = await prisma.menuItem.findMany({
        where: { isAvailable: true },
        select: {
          slug: true,
          updatedAt: true,
          category: {
            select: {
              slug: true,
            },
          },
        },
      });

      const menuUrls = menuItems.map(item => ({
        url: `/menu/${item.category.slug}/${item.slug}`,
        lastModified: item.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));

      this.addUrls(menuUrls);
    } catch (error) {
      console.error('Error generating menu sitemap:', error);
    }
  }

  async addCategories(): Promise<void> {
    try {
      const categories = await prisma.category.findMany({
        select: {
          slug: true,
          updatedAt: true,
        },
      });

      const categoryUrls = categories.map(category => ({
        url: `/menu/${category.slug}`,
        lastModified: category.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

      this.addUrls(categoryUrls);
    } catch (error) {
      console.error('Error generating category sitemap:', error);
    }
  }

  async addOffers(): Promise<void> {
    try {
      const offers = await prisma.offer.findMany({
        where: {
          isActive: true,
          validUntil: {
            gte: new Date(),
          },
        },
        select: {
          id: true,
          title: true,
          updatedAt: true,
        },
      });

      const offerUrls = offers.map(offer => ({
        url: `/offers/${offer.id}`,
        lastModified: offer.updatedAt,
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }));

      this.addUrls(offerUrls);
    } catch (error) {
      console.error('Error generating offers sitemap:', error);
    }
  }

  async addAllDynamicContent(): Promise<void> {
    await Promise.all([
      this.addMenuItems(),
      this.addCategories(),
      this.addOffers(),
    ]);
  }
}