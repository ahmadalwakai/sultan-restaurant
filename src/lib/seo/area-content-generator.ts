import type { AreaData } from "@/data/seo/glasgow-areas";

export interface AreaContent {
  title: string;
  description: string;
  h1: string;
  intro: string;
  deliveryLine: string;
  ctaText: string;
  nearText: string;
}

export interface CuisineAreaContent {
  title: string;
  description: string;
  h1: string;
  intro: string;
}

export interface ServiceAreaContent {
  title: string;
  description: string;
  h1: string;
}

export function generateAreaContent(area: AreaData): AreaContent {
  const distanceText =
    area.distanceMiles === 0
      ? "right in the heart of our neighbourhood"
      : `just ${area.distanceMiles} mile${area.distanceMiles !== 1 ? "s" : ""} from our kitchen`;

  const deliveryTime = area.deliveryTime ?? "20-30 min";

  return {
    title: `Middle Eastern & Halal Food in ${area.name} | Sultan Restaurant Glasgow`,
    description: `Order authentic Middle Eastern and halal food to ${area.name} (${area.postcode}). Charcoal-grilled kebabs, mezze platters, biryani and more — delivered in ${deliveryTime}. Sultan Restaurant, 577 Gallowgate.`,
    h1: `Halal Food Delivery to ${area.name}`,
    intro: `Sultan Restaurant delivers the best charcoal-grilled kebabs, mezze platters, biryanis, and shawarmas to ${area.name}, ${distanceText}. Fresh halal ingredients, authentic Middle Eastern recipes, and fast delivery straight to your door.`,
    deliveryLine: `We deliver to ${area.name} (${area.postcode}) in approximately ${deliveryTime}. Order online or call us on 0141 391 8883.`,
    ctaText: `Order Now — Delivered to ${area.name} in ${deliveryTime}`,
    nearText: `${area.name} is part of the greater Glasgow area we're proud to serve from our kitchen at 577 Gallowgate, Glasgow G40 2PE.`,
  };
}

export function generateCuisineAreaContent(
  cuisine: { slug: string; name: string; keywords: string },
  area: AreaData
): CuisineAreaContent {
  const deliveryTime = area.deliveryTime ?? "20-30 min";

  return {
    title: `${cuisine.name} Food in ${area.name} | Sultan Restaurant Glasgow`,
    description: `Looking for the best ${cuisine.name.toLowerCase()} food in ${area.name}? Sultan Restaurant in Gallowgate delivers ${cuisine.keywords} to ${area.postcode} in ${deliveryTime}. Authentic, halal-certified, freshly prepared.`,
    h1: `${cuisine.name} Food Delivery to ${area.name}`,
    intro: `Get authentic ${cuisine.name.toLowerCase()} cuisine delivered to ${area.name} from Sultan Restaurant. We use the freshest halal ingredients and traditional recipes to bring you ${cuisine.keywords} — delivered in ${deliveryTime}.`,
  };
}

export function generateServiceAreaContent(
  service: { slug: string; name: string; verb: string },
  area: AreaData
): ServiceAreaContent {
  return {
    title: `Halal ${service.name} in ${area.name} | Sultan Restaurant Glasgow`,
    description: `Sultan Restaurant offers halal ${service.name.toLowerCase()} ${service.verb} ${area.name}. Charcoal-grilled kebabs, mezze platters, biryanis and more. Order online or call 0141 391 8883.`,
    h1: `Halal ${service.name} — ${area.name}`,
  };
}
