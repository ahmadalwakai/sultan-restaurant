import { Metadata } from 'next';
import { generateRestaurantSchema, generateWebSiteSchema, sultanWebSiteData } from '../schemas';

export interface HomePageMetadataOptions {
  baseUrl?: string;
}

export function generateHomePageMetadata(options: HomePageMetadataOptions = {}): Metadata {
  const baseUrl = options.baseUrl || 'https://sultanrestaurant.co.uk';

  const restaurantData = {
    name: 'Sultan Restaurant',
    description: 'Experience authentic Middle Eastern cuisine in Glasgow. Order Syrian, Lebanese, and Iraqi dishes for delivery or pickup. Traditional flavors with modern convenience.',
    address: {
      streetAddress: '577 Gallowgate',
      addressLocality: 'Glasgow',
      addressRegion: 'Scotland',
      postalCode: 'G40 2PE',
      addressCountry: 'GB',
    },
    geo: {
      latitude: 55.8530,
      longitude: -4.2180,
    },
    telephone: '+44 141 391 8883',
    email: 'info@sultanrestaurant.co.uk',
    url: baseUrl,
    image: [
      `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80`,
      `https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1200&q=80`,
      `https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80`,
    ],
    priceRange: '££',
    servesCuisine: ['Syrian', 'Lebanese', 'Iraqi', 'Middle Eastern'],
    openingHours: [
      'Mo-Su 12:00-21:00',
    ],
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
    currenciesAccepted: 'GBP',
    menu: `${baseUrl}/menu`,
    aggregateRating: {
      ratingValue: 4.8,
      reviewCount: 342,
    },
  };

  const structuredData = [
    generateRestaurantSchema(restaurantData),
    generateWebSiteSchema(sultanWebSiteData),
  ];

  return {
    title: 'Sultan Restaurant - Authentic Middle Eastern Cuisine in Glasgow | Order Online',
    description: 'Experience authentic Syrian, Lebanese, and Iraqi cuisine in Glasgow. Order online for delivery or pickup. Traditional Middle Eastern flavors with modern convenience. Open daily 12:00 PM – 9:00 PM.',
    keywords: [
      'Middle Eastern restaurant Glasgow',
      'Syrian food Glasgow',
      'Lebanese restaurant Glasgow',
      'Iraqi cuisine Glasgow',
      'shawarma Glasgow',
      'falafel Glasgow',
      'hummus Glasgow',
      'Middle Eastern delivery Glasgow',
      'authentic Middle Eastern food',
      'Glasgow restaurant delivery',
      'Middle Eastern takeaway Glasgow',
    ],
    authors: [{ name: 'Sultan Restaurant' }],
    creator: 'Sultan Restaurant',
    publisher: 'Sultan Restaurant',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'Sultan Restaurant - Authentic Middle Eastern Cuisine in Glasgow',
      description: 'Experience authentic Syrian, Lebanese, and Iraqi cuisine in Glasgow. Order online for delivery or pickup.',
      url: '/',
      siteName: 'Sultan Restaurant',
      images: [
        {
          url: '/images/og/home.jpg',
          width: 1200,
          height: 630,
          alt: 'Sultan Restaurant - Authentic Middle Eastern Cuisine',
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sultan Restaurant - Authentic Middle Eastern Cuisine in Glasgow',
      description: 'Experience authentic Syrian, Lebanese, and Iraqi cuisine in Glasgow. Order online for delivery or pickup.',
      images: ['/images/og/home.jpg'],
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
    verification: {
      google: 'your-google-verification-code',
    },
    other: {
      'structured-data': JSON.stringify(structuredData),
    },
  };
}