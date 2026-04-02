"use client";

interface MenuItemPreviewProps {
  name: string;
  description?: string;
  price: number;
  image?: string | null;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

export function MenuItemPreview({ name, description, price, image, isVegetarian, isVegan, isGlutenFree }: MenuItemPreviewProps) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden max-w-xs">
      {image && <img src={image} alt={name} className="w-full h-40 object-cover" />}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-sm">{name}</h3>
          <span className="font-bold text-amber-600">£{(price / 100).toFixed(2)}</span>
        </div>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        <div className="flex gap-1 mt-2">
          {isVegetarian && <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">V</span>}
          {isVegan && <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">VG</span>}
          {isGlutenFree && <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded">GF</span>}
        </div>
      </div>
    </div>
  );
}
