import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order for Pickup",
  description:
    "Order online for collection from Sultan Restaurant, 577 Gallowgate, Glasgow. Fresh Middle Eastern & Indian cuisine ready in 30 minutes.",
  openGraph: {
    title: "Order for Pickup | Sultan Restaurant",
    description:
      "Order online and collect fresh food from Sultan Restaurant Glasgow.",
  },
};

export default function PickupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
