import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sultan Restaurant. Call +44 141 391 8883, email info@sultanrestaurant.co.uk, or visit us at 577 Gallowgate, Glasgow G40 2PE.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
