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
import { MapPreview } from "@/components/home/MapPreview";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { FAQSection } from "@/components/home/FAQSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ChefsTable } from "@/components/sections/ChefsTable";
import { CateringSection } from "@/components/sections/CateringSection";

// Premium Enhancement Components
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { StickyMobileOrder } from "@/components/mobile/StickyMobileOrder";
import { ChefProfiles } from "@/components/sections/ChefProfiles";
import { HowItsMade } from "@/components/sections/HowItsMade";
import { LoyaltyPreview } from "@/components/sections/LoyaltyPreview";
import { PressAwards } from "@/components/sections/PressAwards";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { BuildYourPlatter } from "@/components/menu/BuildYourPlatter";

const OffersCarousel = dynamic(() => import("@/components/home/OffersCarousel").then(m => ({ default: m.OffersCarousel })), {
  loading: () => <div style={{ height: "400px", background: "#1a1a1a" }} />,
});

export default function HomePage() {
  return (
    <>
      {/* Global UI enhancements */}
      <ScrollProgress />
      
      {/* Hero + Trust indicators */}
      <HeroSection />
      <TrustStrip />
      
      {/* Cuisine exploration */}
      <CuisineTypesBar />
      <CuisineShowcase />
      <PopularDishes />
      
      {/* Premium content */}
      <ChefsTable />
      <ChefProfiles />
      <DishOfTheDay />
      <OffersCarousel />
      <HowItsMade />
      
      {/* Services */}
      <CateringSection />
      <BuildYourPlatter />
      <AboutPreview />
      
      {/* Social proof */}
      <ReviewsSection />
      <PressAwards />
      <GalleryPreview />
      
      {/* Loyalty & Conversion */}
      <LoyaltyPreview />
      <WhyChooseUs />
      <BookTableCTA />
      <PickupCTA />
      <DeliveryPartnersSection />
      
      {/* Location & info */}
      <MapPreview />
      <FAQSection />
      <BlogTeaser />
      <NewsletterSignup />
      
      {/* Mobile sticky order bar */}
      <StickyMobileOrder />
    </>
  );
}
