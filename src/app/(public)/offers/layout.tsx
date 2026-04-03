import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Offers",
  description:
    "Exclusive deals and promotions at Sultan Restaurant Glasgow. Save on authentic Middle Eastern & Indian cuisine.",
  openGraph: {
    title: "Special Offers | Sultan Restaurant",
    description:
      "Check out the latest deals at Sultan Restaurant Glasgow.",
  },
};

export default function OffersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
