import { SectionHeader } from "@/components/sections/SectionHeader";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import Image from "next/image";

export const metadata = { title: "About Us | Sultan Restaurant" };

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="relative h-[40vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80"
          alt="Sultan Restaurant"
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <h1 className="font-heading text-5xl font-bold text-white">Our Story</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <SectionHeader title="About Sultan" />
        <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
          <p>
            Sultan Restaurant has been serving authentic Indian and Bangladeshi
            cuisine for over a decade. Our passion for traditional flavours,
            combined with innovative presentation, creates a dining experience
            that&apos;s truly unforgettable.
          </p>
          <p>
            Our chefs bring generations of culinary expertise from South Asia,
            using only the finest ingredients and authentic spices to create
            dishes that transport you to the heart of the subcontinent.
          </p>
          <p>
            Whether you&apos;re joining us for a romantic dinner, family celebration,
            or a quick takeaway, we promise the same dedication to quality and
            flavour in every dish we serve.
          </p>
        </div>
      </div>

      <WhyChooseUs />
    </div>
  );
}
