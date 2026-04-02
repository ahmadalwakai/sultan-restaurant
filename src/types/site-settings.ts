export type SiteSettingsMap = Record<string, string>;

export type OpeningHoursEntry = {
  dayOfWeek: number;
  dayName: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
};

export type ContactSettings = {
  phone: string;
  email: string;
  address: string;
};

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
};

export type DeliveryPartner = {
  name: string;
  url: string;
  logo: string;
};
