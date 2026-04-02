import { PrismaClient } from "@prisma/client";
import { seedLogger } from "../utils";

const seoData = [
  {
    pageSlug: "home",
    title: "Sultan Restaurant | Authentic Middle Eastern & Indian Cuisine in London",
    description: "Experience the finest Syrian, Lebanese, Indian & Iraqi cuisine. Order online for pickup or book a table at Sultan Restaurant.",
    ogImage: "/images/og/home.jpg",
  },
  {
    pageSlug: "menu",
    title: "Menu | Sultan Restaurant",
    description: "Explore our full menu featuring authentic grills, shawarma, curries, and more. Fresh ingredients, traditional recipes.",
    ogImage: "/images/og/menu.jpg",
  },
  {
    pageSlug: "book",
    title: "Book a Table | Sultan Restaurant",
    description: "Reserve your table at Sultan Restaurant. Perfect for family dinners, celebrations, or a romantic evening.",
    ogImage: "/images/og/booking.jpg",
  },
  {
    pageSlug: "about",
    title: "About Us | Sultan Restaurant",
    description: "Learn about Sultan Restaurant's story, our passion for authentic Middle Eastern cuisine, and our commitment to quality.",
    ogImage: "/images/og/about.jpg",
  },
  {
    pageSlug: "contact",
    title: "Contact Us | Sultan Restaurant",
    description: "Get in touch with Sultan Restaurant. Find our location, phone number, opening hours, and send us a message.",
    ogImage: "/images/og/contact.jpg",
  },
  {
    pageSlug: "gallery",
    title: "Gallery | Sultan Restaurant",
    description: "View photos of our dishes, restaurant interior, and happy customers at Sultan Restaurant.",
    ogImage: "/images/og/gallery.jpg",
  },
  {
    pageSlug: "offers",
    title: "Special Offers | Sultan Restaurant",
    description: "Check out our latest deals and special offers. Save on your favourite Middle Eastern dishes.",
    ogImage: "/images/og/offers.jpg",
  },
];

export async function seedSeoSettings(prisma: PrismaClient) {
  seedLogger.info("Seeding SEO settings...");

  const seo = await Promise.all(
    seoData.map((s) =>
      prisma.seoSettings.upsert({
        where: { pageSlug: s.pageSlug },
        update: { title: s.title, description: s.description, ogImage: s.ogImage },
        create: s,
      })
    )
  );

  seedLogger.table("SeoSettings", seo.length);
  return seo;
}
