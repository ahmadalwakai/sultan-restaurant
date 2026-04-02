// Local Business schema types
interface LocalBusiness {
  '@context': string;
  '@type': 'LocalBusiness';
  name: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  telephone: string;
  email: string;
  url: string;
  image: string[];
  priceRange: string;
  servesCuisine: string[];
  openingHours: string[];
  paymentAccepted: string[];
  currenciesAccepted: string;
  areaServed: Array<{
    '@type': 'GeoCircle';
    geoMidpoint: {
      '@type': 'GeoCoordinates';
      latitude: number;
      longitude: number;
    };
    geoRadius: number;
    address: {
      '@type': 'PostalAddress';
      addressLocality: string;
      addressRegion: string;
      addressCountry: string;
    };
  }>;
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
  review?: Array<{
    '@type': 'Review';
    author: {
      '@type': 'Person';
      name: string;
    };
    reviewRating: {
      '@type': 'Rating';
      ratingValue: number;
    };
    reviewBody: string;
    datePublished: string;
  }>;
  sameAs?: string[];
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: Array<{
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Product';
        name: string;
        description: string;
      };
      offers: {
        '@type': 'Offer';
        price: number;
        priceCurrency: string;
      };
    }>;
  };
}

export interface LocalBusinessData {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  telephone: string;
  email: string;
  url: string;
  image: string[];
  priceRange: string;
  servesCuisine: string[];
  openingHours: string[];
  paymentAccepted: string[];
  currenciesAccepted: string;
  areaServed: Array<{
    name: string;
    geoRadius?: number;
  }>;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  review?: Array<{
    author: string;
    ratingValue: number;
    reviewBody: string;
    datePublished: string;
  }>;
  sameAs?: string[];
  hasOfferCatalog?: {
    name: string;
    itemListElement: Array<{
      name: string;
      description: string;
      offers: {
        price: number;
        priceCurrency: string;
      };
    }>;
  };
}

export function generateLocalBusinessSchema(data: LocalBusinessData): LocalBusiness {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    description: data.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    },
    telephone: data.telephone,
    email: data.email,
    url: data.url,
    image: data.image,
    priceRange: data.priceRange,
    servesCuisine: data.servesCuisine,
    openingHours: data.openingHours,
    paymentAccepted: data.paymentAccepted,
    currenciesAccepted: data.currenciesAccepted,
    areaServed: data.areaServed.map(area => ({
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: data.geo.latitude,
        longitude: data.geo.longitude,
      },
      geoRadius: area.geoRadius || 16093, // Default 10 miles in meters
      address: {
        '@type': 'PostalAddress',
        addressLocality: area.name,
        addressRegion: 'Glasgow',
        addressCountry: 'GB',
      },
    })),
    ...(data.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.aggregateRating.ratingValue,
        reviewCount: data.aggregateRating.reviewCount,
      },
    }),
    ...(data.review && {
      review: data.review.map(review => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.ratingValue,
        },
        reviewBody: review.reviewBody,
        datePublished: review.datePublished,
      })),
    }),
    ...(data.sameAs && { sameAs: data.sameAs }),
    ...(data.hasOfferCatalog && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: data.hasOfferCatalog.name,
        itemListElement: data.hasOfferCatalog.itemListElement.map(item => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: item.name,
            description: item.description,
          },
          offers: {
            '@type': 'Offer',
            price: item.offers.price,
            priceCurrency: item.offers.priceCurrency,
          },
        })),
      },
    }),
  };
}