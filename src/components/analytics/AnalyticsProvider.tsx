'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics/google-analytics';
import { gtm } from '@/lib/analytics/google-tag-manager';

interface AnalyticsProviderProps {
  children: React.ReactNode;
  measurementId?: string;
  gtmId?: string;
}

export function AnalyticsProvider({
  children,
  measurementId,
  gtmId
}: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialize Google Analytics if measurement ID is provided
    if (measurementId && typeof window !== 'undefined') {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', measurementId);

      // Track initial page view
      analytics.trackPageView(window.location.pathname);
    }

    // Initialize Google Tag Manager if GTM ID is provided
    if (gtmId && typeof window !== 'undefined') {
      // Load GTM script
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(script);
    }

    // Track route changes
    const handleRouteChange = (url: string) => {
      analytics.trackPageView(url);
    };

    // Listen for route changes (Next.js specific)
    if (typeof window !== 'undefined') {
      // This would be enhanced with Next.js router events
      window.addEventListener('popstate', () => {
        handleRouteChange(window.location.pathname);
      });
    }

    return () => {
      window.removeEventListener('popstate', () => {
        handleRouteChange(window.location.pathname);
      });
    };
  }, [measurementId, gtmId]);

  return <>{children}</>;
}

// Hook for tracking events
export function useAnalytics() {
  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackPurchase: analytics.trackPurchase.bind(analytics),
    trackAddToCart: analytics.trackAddToCart.bind(analytics),
    trackBeginCheckout: analytics.trackBeginCheckout.bind(analytics),
  };
}

// Hook for GTM events
export function useGTM() {
  return {
    pushEvent: gtm.pushEvent.bind(gtm),
    trackProductImpressions: gtm.trackProductImpressions.bind(gtm),
    trackProductClick: gtm.trackProductClick.bind(gtm),
    trackAddToCart: gtm.trackAddToCart.bind(gtm),
    trackCheckoutStep: gtm.trackCheckoutStep.bind(gtm),
    trackPurchase: gtm.trackPurchase.bind(gtm),
  };
}