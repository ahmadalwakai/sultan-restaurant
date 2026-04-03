export function MenuJsonLd({ categories }: { categories: any[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Sultan Restaurant Menu",
    "description": "Full menu of authentic Middle Eastern and Indian dishes",
    "hasMenuSection": categories.map(cat => ({
      "@type": "MenuSection",
      "name": cat.name,
      "description": cat.description,
      "hasMenuItem": cat.items.map((item: any) => ({
        "@type": "MenuItem",
        "name": item.name,
        "description": item.description,
        "offers": {
          "@type": "Offer",
          "price": item.price,
          "priceCurrency": "GBP",
        },
        ...(item.suitableForDiet && {
          "suitableForDiet": item.suitableForDiet,
        }),
      })),
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}