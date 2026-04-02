import { SectionHeader } from "@/components/sections/SectionHeader";

const features = [
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    description: "Locally sourced produce and authentic spices imported directly",
  },
  {
    icon: "👨\u200d🍳",
    title: "Expert Chefs",
    description: "Our team of chefs brings decades of culinary expertise",
  },
  {
    icon: "⏰",
    title: "Fast Service",
    description: "Quick preparation without compromising on quality or taste",
  },
  {
    icon: "❤️",
    title: "Made with Love",
    description: "Every dish is prepared with care and attention to detail",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Why Choose Sultan?"
          subtitle="What makes us stand out from the rest"
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-white p-6 text-center shadow-md transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-3xl">
                {feature.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
