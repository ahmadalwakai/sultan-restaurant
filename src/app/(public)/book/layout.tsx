import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Table",
  description:
    "Reserve a table at Sultan Restaurant, 577 Gallowgate, Glasgow. Authentic Middle Eastern & Indian dining for groups of 1 to 20.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
