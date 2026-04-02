// Restaurant schema types
interface Restaurant {
  '@context': string;
  '@type': 'Restaurant';
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
  menu: string;
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
}

export interface RestaurantData {
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
  menu: string;
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
}

export function generateRestaurantSchema(data: RestaurantData): Restaurant {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
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
    menu: data.menu,
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
  };
}