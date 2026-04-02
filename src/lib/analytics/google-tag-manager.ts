// Google Tag Manager implementation without external dependencies

interface GTMConfig {
  gtmId: string;
  debug?: boolean;
}

export class GTMManager {
  private config: GTMConfig;

  constructor(config: GTMConfig) {
    this.config = config;
  }

  // Note: Initialization is now handled in AnalyticsProvider component

  // Push custom events to dataLayer
  pushEvent(eventName: string, parameters: Record<string, any> = {}): void {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...parameters,
        custom_parameter_1: 'sultan_restaurant',
      });
    }
  }

  // Track custom events with enhanced e-commerce
  trackEcommerceEvent(event: string, ecommerce: Record<string, any>): void {
    this.pushEvent(event, { ecommerce });
  }

  // Track product impressions
  trackProductImpressions(products: Array<{
    id: string;
    name: string;
    category: string;
    price: number;
    list: string;
    position: number;
  }>): void {
    this.trackEcommerceEvent('productImpressions', {
      impressions: products.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        list: product.list,
        position: product.position,
      })),
    });
  }

  // Track product clicks
  trackProductClick(product: {
    id: string;
    name: string;
    category: string;
    price: number;
    list: string;
    position: number;
  }): void {
    this.trackEcommerceEvent('productClick', {
      click: {
        actionField: { list: product.list },
        products: [{
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          position: product.position,
        }],
      },
    });
  }

  // Track add to cart
  trackAddToCart(product: {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
  }): void {
    this.trackEcommerceEvent('addToCart', {
      add: {
        products: [{
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          quantity: product.quantity,
        }],
      },
    });
  }

  // Track checkout steps
  trackCheckoutStep(step: number, products: Array<{
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
  }>): void {
    this.trackEcommerceEvent('checkout', {
      checkout: {
        actionField: { step },
        products: products.map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          quantity: product.quantity,
        })),
      },
    });
  }

  // Track purchases
  trackPurchase(order: {
    id: string;
    revenue: number;
    tax: number;
    shipping: number;
    coupon?: string;
    products: Array<{
      id: string;
      name: string;
      category: string;
      price: number;
      quantity: number;
    }>;
  }): void {
    this.trackEcommerceEvent('purchase', {
      purchase: {
        actionField: {
          id: order.id,
          revenue: order.revenue,
          tax: order.tax,
          shipping: order.shipping,
          coupon: order.coupon,
        },
        products: order.products.map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          quantity: product.quantity,
        })),
      },
    });
  }
}

// Default GTM configuration
export const defaultGTMConfig: GTMConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM_ID',
  debug: process.env.NODE_ENV === 'development',
};

// Global GTM instance
export const gtm = new GTMManager(defaultGTMConfig);

// Type declarations for dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}