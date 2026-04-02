// Organization schema types
interface Organization {
  '@context': string;
  '@type': 'Organization';
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string[];
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  telephone: string;
  email: string;
  foundingDate?: string;
  sameAs?: string[];
  contactPoint?: Array<{
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    areaServed?: string;
    availableLanguage?: string[];
  }>;
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

export interface OrganizationData {
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string[];
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  telephone: string;
  email: string;
  foundingDate?: string;
  sameAs?: string[];
  contactPoint?: Array<{
    telephone: string;
    contactType: string;
    areaServed?: string;
    availableLanguage?: string[];
  }>;
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

export function generateOrganizationSchema(data: OrganizationData): Organization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    description: data.description,
    url: data.url,
    logo: data.logo,
    image: data.image,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    ...(data.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data.geo.latitude,
        longitude: data.geo.longitude,
      },
    }),
    telephone: data.telephone,
    email: data.email,
    ...(data.foundingDate && { foundingDate: data.foundingDate }),
    ...(data.sameAs && { sameAs: data.sameAs }),
    ...(data.contactPoint && {
      contactPoint: data.contactPoint.map(point => ({
        '@type': 'ContactPoint',
        telephone: point.telephone,
        contactType: point.contactType,
        ...(point.areaServed && { areaServed: point.areaServed }),
        ...(point.availableLanguage && { availableLanguage: point.availableLanguage }),
      })),
    }),
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