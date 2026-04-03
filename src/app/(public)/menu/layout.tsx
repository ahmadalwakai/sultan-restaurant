import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse our full menu of authentic Middle Eastern, Syrian, Lebanese, Iraqi & Indian dishes. Order online for pickup from Sultan Restaurant, Glasgow.",
  openGraph: {
    title: "Menu | Sultan Restaurant",
    description:
      "Explore kebabs, mixed grills, hummus, biryani and more. Order online for pickup.",
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
