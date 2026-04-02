"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { CuisineTypesBar } from "@/components/home/CuisineTypesBar";
import { PopularDishes } from "@/components/home/PopularDishes";
import { OffersCarousel } from "@/components/home/OffersCarousel";
import { BookTableCTA } from "@/components/home/BookTableCTA";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { PickupCTA } from "@/components/home/PickupCTA";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { DeliveryPartnersSection } from "@/components/home/DeliveryPartnersSection";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CuisineTypesBar />
      <PopularDishes />
      <OffersCarousel />
      <WhyChooseUs />
      <BookTableCTA />
      <ReviewsSection />
      <PickupCTA />
      <GalleryPreview />
      <DeliveryPartnersSection />
      <NewsletterSignup />
    </>
  );
}
