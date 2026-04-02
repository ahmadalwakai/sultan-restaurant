import { Metadata } from 'next';
import { generateMenuSchema } from '../schemas';

export interface MenuPageMetadataOptions {
  category?: string;
  baseUrl?: string;
}

export function generateMenuPageMetadata(options: MenuPageMetadataOptions = {}): Metadata {
  const baseUrl = options.baseUrl || 'https://sultanrestaurant.co.uk';
  const category = options.category;

  const title = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')} Menu | Sultan Restaurant`
    : 'Menu | Sultan Restaurant - Middle Eastern Cuisine Glasgow';

  const description = category
    ? `Explore our ${category.replace(/-/g, ' ')} menu at Sultan Restaurant. Authentic Middle Eastern dishes delivered fresh to your door in Glasgow.`
    : 'Explore our complete menu of authentic Middle Eastern cuisine. Syrian, Lebanese, and Iraqi dishes available for delivery and pickup in Glasgow.';

  const keywords = category
    ? [
        `${category.replace(/-/g, ' ')} Glasgow`,
        `${category.replace(/-/g, ' ')} delivery Glasgow`,
        `authentic ${category.replace(/-/g, ' ')} Glasgow`,
        'Middle Eastern food Glasgow',
        'Sultan Restaurant menu',
      ]
    : [
        'Middle Eastern menu Glasgow',
        'Syrian food menu',
        'Lebanese food menu',
        'Iraqi food menu',
        'shawarma menu Glasgow',
        'falafel menu Glasgow',
        'hummus menu Glasgow',
        'Middle Eastern delivery menu',
        'Glasgow restaurant menu',
      ];

  const canonical = category ? `/menu/${category}` : '/menu';

  const menuData = {
    name: category ? `${category.replace(/-/g, ' ')} Menu` : 'Sultan Restaurant Menu',
    description: 'Authentic Middle Eastern cuisine menu featuring Syrian, Lebanese, and Iraqi dishes',
    url: `${baseUrl}${canonical}`,
    image: `${baseUrl}/images/menu/${category || 'full-menu'}.jpg`,
    menuSections: [], // Would be populated with actual menu data
    restaurant: {
      name: 'Sultan Restaurant',
      url: baseUrl,
    },
  };

  const structuredData = [generateMenuSchema(menuData)];

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Sultan Restaurant' }],
    creator: 'Sultan Restaurant',
    publisher: 'Sultan Restaurant',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Sultan Restaurant',
      images: [
        {
          url: `/images/og/menu-${category || 'main'}.jpg`,
          width: 1200,
          height: 630,
          alt: category ? `${category.replace(/-/g, ' ')} menu at Sultan Restaurant` : 'Sultan Restaurant menu',
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/images/og/menu-${category || 'main'}.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'structured-data': JSON.stringify(structuredData),
    },
  };
}