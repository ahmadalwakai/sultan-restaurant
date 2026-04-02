"use client";

interface OfferPreviewProps {
  offer: { title: string; description: string; discountType: string; discountValue: number; imageUrl?: string | null };
}

export function OfferPreview({ offer }: OfferPreviewProps) {
  const discountLabel = offer.discountType === "PERCENTAGE" ? `${offer.discountValue}% OFF` : `£${(offer.discountValue / 100).toFixed(2)} OFF`;

  return (
    <div className="border rounded-lg overflow-hidden bg-white max-w-sm">
      {offer.imageUrl && <div className="h-40 bg-gray-100"><img src={offer.imageUrl} alt={offer.title} className="w-full h-full object-cover" /></div>}
      <div className="p-4">
        <span className="text-xs font-bold text-amber-600">{discountLabel}</span>
        <h3 className="font-semibold mt-1">{offer.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
      </div>
    </div>
  );
}
