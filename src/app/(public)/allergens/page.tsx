export const metadata = { title: "Allergen Information | Sultan Restaurant" };

const allergens = [
  { name: "Gluten", icon: "🌾", description: "Wheat, rye, barley" },
  { name: "Dairy", icon: "🧀", description: "Milk, cream, butter, ghee" },
  { name: "Nuts", icon: "🥜", description: "Almonds, cashews, pistachios" },
  { name: "Eggs", icon: "🥚", description: "Found in some breads and desserts" },
  { name: "Fish", icon: "🐟", description: "Fish-based dishes" },
  { name: "Shellfish", icon: "🦐", description: "Prawn and shrimp dishes" },
  { name: "Sesame", icon: "🌱", description: "Sesame seeds in naan and sides" },
  { name: "Mustard", icon: "🌶️", description: "Used in various sauces and curries" },
];

export default function AllergensPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="font-heading text-3xl font-bold">Allergen Information</h1>
        <p className="mt-4 text-gray-600">
          We take food allergies very seriously. Please inform staff of any allergies
          when ordering. Below are common allergens found in our dishes.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {allergens.map((allergen) => (
            <div
              key={allergen.name}
              className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-md"
            >
              <span className="text-3xl">{allergen.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900">{allergen.name}</h3>
                <p className="text-sm text-gray-500">{allergen.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
