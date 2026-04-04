export function TechJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Sultan Restaurant",
          url: "https://sultanrestaurant.co.uk",
          applicationCategory: "Restaurant, Food Ordering",
          operatingSystem: "Web",
          creator: {
            "@type": "Person",
            name: "Ahmad Alwakai",
            url: "https://github.com/ahmadalwakai",
          },
          programmingLanguage: ["TypeScript", "JavaScript"],
          runtimePlatform: "Next.js 16, React 19",
        }),
      }}
    />
  );
}