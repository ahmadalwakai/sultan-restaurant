"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { CuisineTypesBar } from "@/components/home/CuisineTypesBar";
import { PopularDishes } from "@/components/home/PopularDishes";
import { CuisineShowcase } from "@/components/home/CuisineShowcase";
import { DishOfTheDay } from "@/components/home/DishOfTheDay";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { BookTableCTA } from "@/components/home/BookTableCTA";
import { PickupCTA } from "@/components/home/PickupCTA";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { DeliveryPartnersSection } from "@/components/home/DeliveryPartnersSection";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { FAQSection } from "@/components/home/FAQSection";

const OffersCarousel = dynamic(() => import("@/components/home/OffersCarousel").then(m => ({ default: m.OffersCarousel })), {
  loading: () => <div style={{ height: "400px", background: "#1a1a1a" }} />,
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CuisineTypesBar />
      <PopularDishes />
      <CuisineShowcase />
      <DishOfTheDay />
      <OffersCarousel />
      <AboutPreview />
      <ReviewsSection />
      <WhyChooseUs />
      <BookTableCTA />
      <PickupCTA />
      <GalleryPreview />
      <DeliveryPartnersSection />
      <FAQSection />
      <NewsletterSignup />
    </>
  );
}
