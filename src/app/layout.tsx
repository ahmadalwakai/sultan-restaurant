import type { Metadata } from "next";
import { headingFont, bodyFont } from "@/fonts/fonts";
import { Providers } from "@/components/providers/Providers";
import { RestaurantStructuredData } from "@/components/seo/RestaurantJsonLd";
import { TechJsonLd } from "@/components/seo/TechJsonLd";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sultan Restaurant | Authentic Middle Eastern & Indian Cuisine",
    template: "%s | Sultan Restaurant",
  },
  description:
    "Authentic Syrian, Lebanese, Indian & Iraqi cuisine. Order online for pickup or book a table at Sultan Restaurant.",
  metadataBase: new URL("https://sultanrestaurant.co.uk"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Sultan Restaurant",
    title: "Sultan Restaurant | Authentic Middle Eastern & Indian Cuisine",
    description:
      "Authentic Syrian, Lebanese, Indian & Iraqi cuisine. Order online for pickup or book a table.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sultan Restaurant",
    description:
      "Authentic Syrian, Lebanese, Indian & Iraqi cuisine. Order online for pickup or book a table.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sultanrestaurant.co.uk",
  },
  generator: "Next.js 16",
  applicationName: "Sultan Restaurant",
  authors: [{ name: "Ahmad Alwakai", url: "https://github.com/ahmadalwakai" }],
  creator: "Ahmad Alwakai",
  publisher: "Sultan Restaurant",
  category: "Restaurant, Food Ordering, Table Reservation",
  other: {
    "technology-stack": "Next.js 16, React 19, Chakra UI v3, Prisma, TypeScript 5",
    "custom-built": "true",
    "humans": "/humans.txt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body style={{ backgroundColor: "#FDFAF6" }} suppressHydrationWarning>
        <RestaurantStructuredData />
        <TechJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
