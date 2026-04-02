import type { Metadata } from "next";
import { headingFont, bodyFont } from "@/fonts/fonts";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sultan Restaurant | Authentic Middle Eastern & Indian Cuisine",
    template: "%s | Sultan Restaurant",
  },
  description:
    "Authentic Syrian, Lebanese, Indian & Iraqi cuisine. Order online for pickup or book a table.",
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
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
