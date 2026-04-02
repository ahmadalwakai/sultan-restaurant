// Google Analytics 4 implementation without external dependencies

interface GoogleAnalyticsConfig {
  measurementId: string;
  debug?: boolean;
}

export class AnalyticsManager {
  private config: GoogleAnalyticsConfig;

  constructor(config: GoogleAnalyticsConfig) {
    this.config = config;
  }

  // Note: Initialization is now handled in AnalyticsProvider component

  // Track custom events
  trackEvent(eventName: string, parameters: Record<string, any> = {}): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        custom_parameter_1: 'sultan_restaurant',
      });
    }
  }

  // Track page views (usually handled automatically by Next.js)
  trackPageView(pagePath: string): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', this.config.measurementId, {
        page_path: pagePath,
      });
    }
  }

  // Track e-commerce events
  trackPurchase(transactionId: string, value: number, currency: string = 'GBP'): void {
    this.trackEvent('purchase', {
      transaction_id: transactionId,
      value,
      currency,
      items: [], // Would be populated with actual items
    });
  }

  trackAddToCart(itemId: string, itemName: string, price: number, quantity: number = 1): void {
    this.trackEvent('add_to_cart', {
      item_id: itemId,
      item_name: itemName,
      price,
      quantity,
      currency: 'GBP',
    });
  }

  trackBeginCheckout(value: number): void {
    this.trackEvent('begin_checkout', {
      value,
      currency: 'GBP',
    });
  }
}

// Default analytics configuration
export const defaultAnalyticsConfig: GoogleAnalyticsConfig = {
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID',
  debug: process.env.NODE_ENV === 'development',
};

// Global analytics instance
export const analytics = new AnalyticsManager(defaultAnalyticsConfig);

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}