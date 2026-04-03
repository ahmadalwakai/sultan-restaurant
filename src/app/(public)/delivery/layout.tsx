import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery",
  description:
    "Sultan Restaurant delivery via Uber Eats, Deliveroo & Just Eat. Or order online for collection from 577 Gallowgate, Glasgow.",
};

export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
