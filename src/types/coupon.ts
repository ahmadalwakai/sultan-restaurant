export type CouponPublic = {
  code: string;
  discount: number;
  discountType: "PERCENTAGE" | "FIXED";
  minOrder: number | null;
  maxDiscount: number | null;
};

export type CouponAdmin = CouponPublic & {
  id: string;
  description: string | null;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
  validFrom: string;
  validUntil: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCouponInput = {
  code: string;
  description?: string;
  discount: number;
  discountType?: "PERCENTAGE" | "FIXED";
  minOrder?: number;
  maxDiscount?: number;
  maxUses?: number;
  validFrom?: string;
  validUntil?: string;
  isActive?: boolean;
};

export type ValidateCouponResult = {
  valid: boolean;
  coupon?: CouponPublic;
  error?: string;
};
