import { SectionHeader } from "@/components/sections/SectionHeader";
import { SectionShell } from "@/components/shared/SectionShell";
import { CardSurface } from "@/components/shared/CardSurface";

const features = [
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    description: "Locally sourced produce and authentic spices imported directly from the Middle East.",
  },
  {
    icon: "👨\u200d🍳",
    title: "Expert Chefs",
    description: "Our team of chefs brings decades of culinary expertise to every dish.",
  },
  {
    icon: "⏰",
    title: "Fast Service",
    description: "Quick preparation without compromising on quality or taste",
  },
  {
    icon: "❤️",
    title: "Made with Love",
    description: "Every dish is prepared with care, passion, and attention to detail.",
  },
];

export function WhyChooseUs() {
  return (
    <SectionShell>
      <SectionHeader
        title="Why Choose Sultan?"
        subtitle="What makes us stand out from the rest"
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <CardSurface
            key={feature.title}
            className="px-6 py-8 text-center transition-all hover:border-amber-200 hover:shadow-md"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-xl">
              {feature.icon}
            </div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-gray-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{feature.description}</p>
          </CardSurface>
        ))}
      </div>
    </SectionShell>
  );
}
