import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { OpeningHoursBar } from "@/components/home/OpeningHoursBar";
import { OfferBanner } from "@/components/home/OfferBanner";
import { OrderModalProvider } from "@/components/order/OrderModalProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/consent/CookieConsent";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OfferBanner />
      <OpeningHoursBar />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingActions />
      <WhatsAppButton />
      <OrderModalProvider />
      <CookieConsent />
    </>
  );
}
