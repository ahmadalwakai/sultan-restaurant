// Website schema types
interface WebSite {
  '@context': string;
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo: string;
    url: string;
  };
  sameAs?: string[];
  mainEntity?: {
    '@type': 'Restaurant';
    name: string;
    description: string;
    url: string;
  };
}

export interface WebSiteData {
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
  publisher?: {
    name: string;
    logo: string;
    url: string;
  };
  sameAs?: string[];
  mainEntity?: {
    name: string;
    description: string;
    url: string;
  };
}

export function generateWebSiteSchema(data: WebSiteData): WebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    description: data.description,
    inLanguage: data.inLanguage,
    ...(data.potentialAction && {
      potentialAction: {
        '@type': 'SearchAction',
        target: data.potentialAction.target,
        'query-input': data.potentialAction.queryInput,
      },
    }),
    ...(data.publisher && {
      publisher: {
        '@type': 'Organization',
        name: data.publisher.name,
        logo: data.publisher.logo,
        url: data.publisher.url,
      },
    }),
    ...(data.sameAs && { sameAs: data.sameAs }),
    ...(data.mainEntity && {
      mainEntity: {
        '@type': 'Restaurant',
        name: data.mainEntity.name,
        description: data.mainEntity.description,
        url: data.mainEntity.url,
      },
    }),
  };
}

// Default website schema data for Sultan Restaurant
export const sultanWebSiteData: WebSiteData = {
  name: 'Sultan Restaurant - Authentic Middle Eastern Cuisine in Glasgow',
  url: 'https://sultanrestaurant.co.uk',
  description: 'Experience authentic Syrian, Lebanese, and Middle Eastern cuisine in the heart of Glasgow. Order online for delivery or pickup, make reservations, and enjoy traditional flavors with modern convenience.',
  inLanguage: 'en-GB',
  potentialAction: {
    target: 'https://sultanrestaurant.co.uk/search?q={search_term_string}',
    queryInput: 'required name=search_term_string',
  },
  publisher: {
    name: 'Sultan Restaurant',
    logo: 'https://sultanrestaurant.co.uk/images/logo.png',
    url: 'https://sultanrestaurant.co.uk',
  },
  sameAs: [
    'https://www.facebook.com/share/1HDKRSvdoC/',
    'https://www.instagram.com/sultan.restaurants?igsh=MWw3b3YwZmFjcHh6Zg==',
    'https://www.tiktok.com/@sultanrestaurant.glasgow?_r=1&_t=ZN-95F3iqpZPde',
  ],
  mainEntity: {
    name: 'Sultan Restaurant',
    description: 'Authentic Middle Eastern restaurant serving Syrian, Lebanese, and Iraqi cuisine in Glasgow',
    url: 'https://sultanrestaurant.co.uk',
  },
};