// Glasgow area coordinates and SEO data
export interface GlasgowArea {
  slug: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
  population?: number;
  keywords: string[];
  competitors?: string[];
}

export const glasgowAreas: GlasgowArea[] = [
  {
    slug: 'glasgow',
    name: 'Glasgow',
    description: 'Glasgow city centre and surrounding areas',
    latitude: 55.8642,
    longitude: -4.2518,
    radius: 8047, // 5 miles
    population: 635000,
    keywords: [
      'Glasgow restaurant',
      'Glasgow Middle Eastern food',
      'Glasgow Syrian restaurant',
      'Glasgow Lebanese food',
      'Glasgow Iraqi cuisine',
    ],
  },
  {
    slug: 'bridgeton',
    name: 'Bridgeton',
    description: 'Bridgeton and east end Glasgow area',
    latitude: 55.8497,
    longitude: -4.2269,
    radius: 3219, // 2 miles
    population: 18000,
    keywords: [
      'Bridgeton restaurant',
      'Bridgeton Middle Eastern food',
      'Bridgeton delivery',
      'Bridgeton takeaway',
      'East End Glasgow food delivery',
    ],
  },
  {
    slug: 'gallowgate',
    name: 'Gallowgate',
    description: 'Gallowgate and Merchant City area',
    latitude: 55.8588,
    longitude: -4.2388,
    radius: 1609, // 1 mile
    population: 12000,
    keywords: [
      'Gallowgate restaurant',
      'Gallowgate Middle Eastern food',
      'Merchant City Glasgow restaurant',
      'Gallowgate delivery',
      'Merchant City takeaway',
    ],
  },
  {
    slug: 'east-end-glasgow',
    name: 'East End Glasgow',
    description: 'East End Glasgow including Dennistoun, Calton, and Parkhead',
    latitude: 55.8541,
    longitude: -4.2119,
    radius: 3219, // 2 miles
    population: 25000,
    keywords: [
      'East End Glasgow restaurant',
      'East End Glasgow Middle Eastern food',
      'Dennistoun delivery',
      'Calton takeaway',
      'Parkhead food delivery',
    ],
  },
  {
    slug: 'merchant-city',
    name: 'Merchant City',
    description: 'Merchant City district in Glasgow city centre',
    latitude: 55.8594,
    longitude: -4.2442,
    radius: 804, // 0.5 miles
    population: 8000,
    keywords: [
      'Merchant City restaurant',
      'Merchant City Glasgow Middle Eastern food',
      'Merchant City delivery',
      'Glasgow city centre restaurant',
    ],
  },
  {
    slug: 'city-centre',
    name: 'City Centre',
    description: 'Glasgow city centre area',
    latitude: 55.8609,
    longitude: -4.2514,
    radius: 1609, // 1 mile
    population: 15000,
    keywords: [
      'Glasgow city centre restaurant',
      'Glasgow city centre Middle Eastern food',
      'Central Glasgow delivery',
      'Glasgow centre takeaway',
    ],
  },
  {
    slug: 'west-end',
    name: 'West End',
    description: 'West End Glasgow including Hillhead and Kelvingrove',
    latitude: 55.8733,
    longitude: -4.2924,
    radius: 2414, // 1.5 miles
    population: 20000,
    keywords: [
      'West End Glasgow restaurant',
      'West End Glasgow Middle Eastern food',
      'Hillhead delivery',
      'Kelvingrove takeaway',
      'West End Glasgow food',
    ],
  },
  {
    slug: 'southside',
    name: 'Southside',
    description: 'Southside Glasgow including Shawlands and Pollokshields',
    latitude: 55.8298,
    longitude: -4.2838,
    radius: 3219, // 2 miles
    population: 30000,
    keywords: [
      'Southside Glasgow restaurant',
      'Southside Glasgow Middle Eastern food',
      'Shawlands delivery',
      'Pollokshields takeaway',
      'South Glasgow food',
    ],
  },
  {
    slug: 'north-glasgow',
    name: 'North Glasgow',
    description: 'North Glasgow including Springburn and Balornock',
    latitude: 55.8894,
    longitude: -4.2333,
    radius: 3219, // 2 miles
    population: 15000,
    keywords: [
      'North Glasgow restaurant',
      'North Glasgow Middle Eastern food',
      'Springburn delivery',
      'Balornock takeaway',
    ],
  },
  {
    slug: 'cathcart',
    name: 'Cathcart',
    description: 'Cathcart area in south Glasgow',
    latitude: 55.8158,
    longitude: -4.2583,
    radius: 1609, // 1 mile
    population: 12000,
    keywords: [
      'Cathcart restaurant',
      'Cathcart Middle Eastern food',
      'Cathcart delivery',
      'Cathcart takeaway',
    ],
  },
  {
    slug: 'shawlands',
    name: 'Shawlands',
    description: 'Shawlands area in south Glasgow',
    latitude: 55.8292,
    longitude: -4.2858,
    radius: 804, // 0.5 miles
    population: 8000,
    keywords: [
      'Shawlands restaurant',
      'Shawlands Middle Eastern food',
      'Shawlands delivery',
      'Shawlands takeaway',
    ],
  },
  {
    slug: 'pollokshields',
    name: 'Pollokshields',
    description: 'Pollokshields area in south Glasgow',
    latitude: 55.8417,
    longitude: -4.2767,
    radius: 804, // 0.5 miles
    population: 10000,
    keywords: [
      'Pollokshields restaurant',
      'Pollokshields Middle Eastern food',
      'Pollokshields delivery',
      'Pollokshields takeaway',
    ],
  },
  {
    slug: 'hillhead',
    name: 'Hillhead',
    description: 'Hillhead area in west Glasgow',
    latitude: 55.8753,
    longitude: -4.2881,
    radius: 804, // 0.5 miles
    population: 6000,
    keywords: [
      'Hillhead restaurant',
      'Hillhead Middle Eastern food',
      'Hillhead delivery',
      'Hillhead takeaway',
    ],
  },
  {
    slug: 'kelvingrove',
    name: 'Kelvingrove',
    description: 'Kelvingrove area in west Glasgow',
    latitude: 55.8694,
    longitude: -4.2844,
    radius: 804, // 0.5 miles
    population: 8000,
    keywords: [
      'Kelvingrove restaurant',
      'Kelvingrove Middle Eastern food',
      'Kelvingrove delivery',
      'Kelvingrove takeaway',
    ],
  },
  {
    slug: 'finnieston',
    name: 'Finnieston',
    description: 'Finnieston area in west Glasgow',
    latitude: 55.8608,
    longitude: -4.2767,
    radius: 804, // 0.5 miles
    population: 5000,
    keywords: [
      'Finnieston restaurant',
      'Finnieston Middle Eastern food',
      'Finnieston delivery',
      'Finnieston takeaway',
    ],
  },
  {
    slug: 'partick',
    name: 'Partick',
    description: 'Partick area in west Glasgow',
    latitude: 55.8694,
    longitude: -4.3094,
    radius: 804, // 0.5 miles
    population: 10000,
    keywords: [
      'Partick restaurant',
      'Partick Middle Eastern food',
      'Partick delivery',
      'Partick takeaway',
    ],
  },
  {
    slug: 'hyndland',
    name: 'Hyndland',
    description: 'Hyndland area in west Glasgow',
    latitude: 55.8792,
    longitude: -4.3094,
    radius: 804, // 0.5 miles
    population: 6000,
    keywords: [
      'Hyndland restaurant',
      'Hyndland Middle Eastern food',
      'Hyndland delivery',
      'Hyndland takeaway',
    ],
  },
  {
    slug: 'dowanhill',
    name: 'Dowanhill',
    description: 'Dowanhill area in west Glasgow',
    latitude: 55.8658,
    longitude: -4.3094,
    radius: 804, // 0.5 miles
    population: 4000,
    keywords: [
      'Dowanhill restaurant',
      'Dowanhill Middle Eastern food',
      'Dowanhill delivery',
      'Dowanhill takeaway',
    ],
  },
  {
    slug: 'kings-park',
    name: 'Kings Park',
    description: 'Kings Park area in south Glasgow',
    latitude: 55.8167,
    longitude: -4.2333,
    radius: 804, // 0.5 miles
    population: 8000,
    keywords: [
      'Kings Park restaurant',
      'Kings Park Middle Eastern food',
      'Kings Park delivery',
      'Kings Park takeaway',
    ],
  },
  {
    slug: 'castlemilk',
    name: 'Castlemilk',
    description: 'Castlemilk area in south east Glasgow',
    latitude: 55.8042,
    longitude: -4.2167,
    radius: 1609, // 1 mile
    population: 12000,
    keywords: [
      'Castlemilk restaurant',
      'Castlemilk Middle Eastern food',
      'Castlemilk delivery',
      'Castlemilk takeaway',
    ],
  },
  {
    slug: 'croftfoot',
    name: 'Croftfoot',
    description: 'Croftfoot area in south east Glasgow',
    latitude: 55.8167,
    longitude: -4.2167,
    radius: 804, // 0.5 miles
    population: 6000,
    keywords: [
      'Croftfoot restaurant',
      'Croftfoot Middle Eastern food',
      'Croftfoot delivery',
      'Croftfoot takeaway',
    ],
  },
  {
    slug: 'spittal',
    name: 'Spittal',
    description: 'Spittal area in south east Glasgow',
    latitude: 55.8250,
    longitude: -4.2167,
    radius: 804, // 0.5 miles
    population: 4000,
    keywords: [
      'Spittal restaurant',
      'Spittal Middle Eastern food',
      'Spittal delivery',
      'Spittal takeaway',
    ],
  },
];

export function getAreaBySlug(slug: string): GlasgowArea | undefined {
  return glasgowAreas.find(area => area.slug === slug);
}

export function getAreasWithinRadius(centerLat: number, centerLng: number, radiusMeters: number): GlasgowArea[] {
  return glasgowAreas.filter(area => {
    const distance = calculateDistance(centerLat, centerLng, area.latitude, area.longitude);
    return distance <= radiusMeters;
  });
}

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function generateLocalKeywords(area: GlasgowArea): string[] {
  const baseKeywords = [
    'Middle Eastern restaurant',
    'Syrian food',
    'Lebanese restaurant',
    'Iraqi cuisine',
    'shawarma',
    'falafel',
    'hummus',
    'Middle Eastern delivery',
    'takeaway',
    'food delivery',
  ];

  return baseKeywords.flatMap(keyword =>
    area.keywords.map(areaKeyword =>
      `${keyword} ${areaKeyword.toLowerCase()}`
    )
  );
}