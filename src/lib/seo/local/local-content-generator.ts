import { GlasgowArea, getAreaBySlug, generateLocalKeywords } from './glasgow-areas';

export interface LocalSEOContent {
  title: string;
  description: string;
  h1: string;
  intro: string;
  deliveryInfo: string;
  menuHighlights: string;
  whyChooseUs: string;
  contactInfo: string;
  keywords: string[];
  structuredData: any;
}

export function generateLocalSEOContent(areaSlug: string): LocalSEOContent | null {
  const area = getAreaBySlug(areaSlug);
  if (!area) return null;

  const keywords = generateLocalKeywords(area);

  const content: LocalSEOContent = {
    title: `Middle Eastern Restaurant Delivery in ${area.name} | Sultan Restaurant`,
    description: `Authentic Middle Eastern food delivery in ${area.name}, Glasgow. Syrian, Lebanese, and Iraqi cuisine delivered fresh to your door. Order online for fast delivery.`,
    h1: `Authentic Middle Eastern Food Delivery in ${area.name}`,
    intro: `Experience the rich flavors of authentic Middle Eastern cuisine right in ${area.name}. At Sultan Restaurant, we bring you traditional Syrian, Lebanese, and Iraqi dishes made with the finest ingredients and authentic cooking techniques. Whether you're craving juicy shawarma, crispy falafel, or creamy hummus, we deliver fresh, delicious food straight to your door in ${area.name}.`,
    deliveryInfo: `We offer fast and reliable delivery throughout ${area.name} and surrounding areas within a ${Math.round(area.radius / 1609)} mile radius. Our delivery service operates daily from 12:00 PM to 9:00 PM, with minimum orders starting from £15. Most orders in ${area.name} are delivered within 30-45 minutes.`,
    menuHighlights: `Our menu features authentic Middle Eastern favorites including:
    • Shawarma wraps and plates with tender marinated meat
    • Fresh falafel with tahini sauce and salad
    • Creamy hummus with warm pita bread
    • Traditional tabbouleh salad
    • Juicy kebabs and grilled meats
    • Rice dishes with aromatic spices
    • Fresh baklava and traditional desserts`,
    whyChooseUs: `Choose Sultan Restaurant for your Middle Eastern food delivery in ${area.name} because:
    • Authentic recipes passed down through generations
    • Fresh ingredients sourced daily
    • Experienced chefs with Middle Eastern heritage
    • Fast, reliable delivery service
    • Competitive pricing and great value
    • Excellent customer service
    • Halal certified and dietary options available`,
    contactInfo: `Ready to order? Call us at +44 141 391 8883 or order online for delivery to ${area.name}. We're located at 577 Gallowgate, Glasgow, and serve the local community with pride.`,
    keywords,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `Sultan Restaurant - ${area.name} Delivery`,
      description: `Authentic Middle Eastern restaurant serving ${area.name} and surrounding areas`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '577 Gallowgate',
        addressLocality: 'Glasgow',
        addressRegion: 'Scotland',
        postalCode: 'G40 2PE',
        addressCountry: 'GB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: area.latitude,
        longitude: area.longitude,
      },
      areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: area.latitude,
          longitude: area.longitude,
        },
        geoRadius: area.radius,
      },
    },
  };

  return content;
}

export function generateLocalSEOFAQ(areaName: string): Array<{ question: string; answer: string }> {
  return [
    {
      question: `Do you deliver to ${areaName}?`,
      answer: `Yes, we offer delivery throughout ${areaName} and surrounding areas. Our delivery radius covers approximately ${Math.round(8047 / 1609)} miles from our restaurant in Glasgow city centre.`,
    },
    {
      question: `How long does delivery take to ${areaName}?`,
      answer: `Delivery times to ${areaName} typically range from 30-45 minutes, depending on current order volume and traffic conditions. You can track your order in real-time through our website.`,
    },
    {
      question: `What Middle Eastern food do you deliver to ${areaName}?`,
      answer: `We deliver authentic Syrian, Lebanese, and Iraqi cuisine including shawarma, falafel, hummus, kebabs, rice dishes, and traditional desserts. All food is prepared fresh and delivered hot.`,
    },
    {
      question: `Is there a minimum order for delivery to ${areaName}?`,
      answer: `Our minimum delivery order is £15 throughout ${areaName} and all areas we serve. This helps us maintain our fast delivery service and competitive pricing.`,
    },
    {
      question: `What are your delivery hours for ${areaName}?`,
      answer: `We deliver to ${areaName} daily from 12:00 PM to 9:00 PM. Our kitchen closes at 8:30 PM for dine-in orders and 8:00 PM for delivery orders.`,
    },
  ];
}