// Event schema types
interface Event {
  '@context': string;
  '@type': 'Event';
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  eventStatus: string;
  eventAttendanceMode: string;
  location: {
    '@type': 'Place';
    name: string;
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
  };
  organizer: {
    '@type': 'Organization';
    name: string;
    url: string;
    telephone?: string;
    email?: string;
  };
  offers?: Array<{
    '@type': 'Offer';
    name: string;
    description: string;
    price: number;
    priceCurrency: string;
    availability: string;
    validFrom: string;
    validThrough: string;
  }>;
  image?: string[];
  url?: string;
}

export interface EventData {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  eventStatus: string;
  eventAttendanceMode: string;
  location: {
    name: string;
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
  };
  organizer: {
    name: string;
    url: string;
    telephone?: string;
    email?: string;
  };
  offers?: Array<{
    name: string;
    description: string;
    price: number;
    priceCurrency: string;
    availability: string;
    validFrom: string;
    validThrough: string;
  }>;
  image?: string[];
  url?: string;
}

export function generateEventSchema(data: EventData): Event {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    ...(data.endDate && { endDate: data.endDate }),
    eventStatus: data.eventStatus,
    eventAttendanceMode: data.eventAttendanceMode,
    location: {
      '@type': 'Place',
      name: data.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.location.address.streetAddress,
        addressLocality: data.location.address.addressLocality,
        addressRegion: data.location.address.addressRegion,
        postalCode: data.location.address.postalCode,
        addressCountry: data.location.address.addressCountry,
      },
      ...(data.location.geo && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: data.location.geo.latitude,
          longitude: data.location.geo.longitude,
        },
      }),
    },
    organizer: {
      '@type': 'Organization',
      name: data.organizer.name,
      url: data.organizer.url,
      ...(data.organizer.telephone && { telephone: data.organizer.telephone }),
      ...(data.organizer.email && { email: data.organizer.email }),
    },
    ...(data.offers && {
      offers: data.offers.map(offer => ({
        '@type': 'Offer',
        name: offer.name,
        description: offer.description,
        price: offer.price,
        priceCurrency: offer.priceCurrency,
        availability: offer.availability,
        validFrom: offer.validFrom,
        validThrough: offer.validThrough,
      })),
    }),
    ...(data.image && { image: data.image }),
    ...(data.url && { url: data.url }),
  };
}

// Helper function to create event data for special offers
export function createOfferEventData(
  offerName: string,
  description: string,
  startDate: string,
  endDate: string,
  discount?: number
): EventData {
  return {
    name: offerName,
    description,
    startDate,
    endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      name: 'Sultan Restaurant',
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
    },
    organizer: {
      name: 'Sultan Restaurant',
      url: 'https://sultanrestaurant.co.uk',
      telephone: '+44 141 391 8883',
      email: 'info@sultanrestaurant.co.uk',
    },
    ...(discount && {
      offers: [{
        name: `${discount}% Off ${offerName}`,
        description: `Special ${discount}% discount on ${offerName.toLowerCase()}`,
        price: discount,
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        validFrom: startDate,
        validThrough: endDate,
      }],
    }),
    image: ['https://sultanrestaurant.co.uk/images/og/offer.jpg'],
    url: 'https://sultanrestaurant.co.uk/offers',
  };
}