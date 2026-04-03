import { Metadata } from 'next';
import { generateLocalBusinessSchema } from '../schemas';

export interface LocationPageMetadataOptions {
  location: string;
  baseUrl?: string;
}

export function generateLocationPageMetadata(options: LocationPageMetadataOptions): Metadata {
  const baseUrl = options.baseUrl || 'https://sultanrestaurant.co.uk';
  const location = options.location;

  // Location-specific data
  const locationData: Record<string, {
    name: string;
    description: string;
    geo: { latitude: number; longitude: number };
    radius: number;
  }> = {
    'glasgow': {
      name: 'Glasgow',
      description: 'Glasgow city centre and surrounding areas',
      geo: { latitude: 55.8642, longitude: -4.2518 },
      radius: 8047, // 5 miles in meters
    },
    'bridgeton': {
      name: 'Bridgeton',
      description: 'Bridgeton and east end Glasgow area',
      geo: { latitude: 55.8497, longitude: -4.2269 },
      radius: 3219, // 2 miles in meters
    },
    'gallowgate': {
      name: 'Gallowgate',
      description: 'Gallowgate and Merchant City area',
      geo: { latitude: 55.8588, longitude: -4.2388 },
      radius: 1609, // 1 mile in meters
    },
    'east-end-glasgow': {
      name: 'East End Glasgow',
      description: 'East End Glasgow including Dennistoun, Calton, and Parkhead',
      geo: { latitude: 55.8541, longitude: -4.2119 },
      radius: 3219, // 2 miles in meters
    },
    // Add more locations as needed
  };

  const locationInfo = locationData[location] || {
    name: location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: `${location.replace(/-/g, ' ')} area in Glasgow`,
    geo: { latitude: 55.8642, longitude: -4.2518 },
    radius: 8047,
  };

  const title = `Middle Eastern Restaurant Delivery in ${locationInfo.name} | Sultan Restaurant`;
  const description = `Authentic Middle Eastern food delivery in ${locationInfo.name}, Glasgow. Syrian, Lebanese, and Iraqi cuisine delivered fresh to your door. Order online for fast delivery.`;

  const keywords = [
    `Middle Eastern food ${locationInfo.name}`,
    `restaurant delivery ${locationInfo.name}`,
    `Syrian food ${locationInfo.name}`,
    `Lebanese restaurant ${locationInfo.name}`,
    `takeaway ${locationInfo.name}`,
    `food delivery Glasgow`,
    `Middle Eastern takeaway ${locationInfo.name}`,
    `shawarma delivery ${locationInfo.name}`,
    `falafel ${locationInfo.name}`,
  ];

  const canonical = `/locations/${location}`;

  // Generate local business structured data
  const localBusinessData = {
    name: `Sultan Restaurant - ${locationInfo.name} Delivery`,
    description: `Authentic Middle Eastern restaurant serving ${locationInfo.name} and surrounding areas in Glasgow`,
    address: {
      streetAddress: '577 Gallowgate',
      addressLocality: 'Glasgow',
      addressRegion: 'Scotland',
      postalCode: 'G40 2PE',
      addressCountry: 'GB',
    },
    geo: locationInfo.geo,
    telephone: '+44 141 391 8883',
    email: 'info@sultanrestaurant.co.uk',
    url: `${baseUrl}${canonical}`,
    image: [
      `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80`,
      `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80`,
    ],
    priceRange: '££',
    servesCuisine: ['Syrian', 'Lebanese', 'Iraqi', 'Middle Eastern'],
    openingHours: [
      'Mo-Su 12:00-21:00',
    ],
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
    currenciesAccepted: 'GBP',
    areaServed: [{
      name: locationInfo.name,
      geoRadius: locationInfo.radius,
    }],
    aggregateRating: {
      ratingValue: 4.8,
      reviewCount: 342,
    },
  };

  const structuredData = [generateLocalBusinessSchema(localBusinessData)];

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
          url: `/images/og/location-${location}.jpg`,
          width: 1200,
          height: 630,
          alt: `Middle Eastern food delivery in ${locationInfo.name}`,
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/images/og/location-${location}.jpg`],
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
      'geo.region': 'GB-GLG',
      'geo.placename': locationInfo.name,
      'geo.position': `${locationInfo.geo.latitude};${locationInfo.geo.longitude}`,
      'ICBM': `${locationInfo.geo.latitude}, ${locationInfo.geo.longitude}`,
      'structured-data': JSON.stringify(structuredData),
    },
  };
}