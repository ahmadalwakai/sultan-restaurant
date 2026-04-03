export function TechJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Sultan Restaurant Platform",
    url: "https://sultanrestaurant.co.uk",
    applicationCategory: "Restaurant Management, Food Ordering",
    operatingSystem: "Web (All Browsers)",
    browserRequirements: "Modern browser with JavaScript enabled",
    softwareVersion: "0.1.0",
    description:
      "Custom-built full-stack restaurant platform featuring online ordering, table reservations, real-time order management, and multi-role admin dashboard.",
    offers: [
      {
        "@type": "Offer",
        category: "Online Food Ordering",
      },
      {
        "@type": "Offer",
        category: "Table Reservation",
      },
    ],
    creator: {
      "@type": "Person",
      name: "Ahmad Alwakai",
      url: "https://github.com/ahmadalwakai",
    },
    sourceOrganization: {
      "@type": "Organization",
      name: "Sultan Restaurant",
      url: "https://sultanrestaurant.co.uk",
    },
    programmingLanguage: ["TypeScript", "JavaScript"],
    runtimePlatform: "Next.js 16, React 19, Node.js",
    softwareRequirements: "PostgreSQL, Stripe, AWS S3, Resend",
    featureList: [
      "Server-Side Rendering",
      "Progressive Web App",
      "Real-time Order Tracking",
      "Stripe Payment Integration",
      "Multi-role Admin Dashboard",
      "Responsive Mobile-First Design",
      "SEO Optimized with Structured Data",
      "Email Notification System",
      "Push Notification Support",
    ],
    screenshot: {
      "@type": "ImageObject",
      url: "https://sultanrestaurant.co.uk/og-image.jpg",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}