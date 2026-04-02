export type OfferPublic = {
  id: string;
  title: string;
  description: string | null;
  code: string | null;
  discount: number;
  discountType: "PERCENTAGE" | "FIXED";
  image: string | null;
  validFrom: string;
  validUntil: string | null;
  minOrder: number | null;
};

export type OfferAdmin = OfferPublic & {
  isActive: boolean;
  maxUses: number | null;
  usedCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateOfferInput = {
  title: string;
  description?: string;
  code?: string;
  discount: number;
  discountType?: "PERCENTAGE" | "FIXED";
  image?: string;
  validFrom?: string;
  validUntil?: string;
  minOrder?: number;
  maxUses?: number;
  isActive?: boolean;
};

export type UpdateOfferInput = Partial<CreateOfferInput>;
