'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface SafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface SafeAreaContextType {
  insets: SafeAreaInsets;
  isSupported: boolean;
}

const SafeAreaContext = createContext<SafeAreaContextType | undefined>(undefined);

interface SafeAreaProviderProps {
  children: ReactNode;
}

export function SafeAreaProvider({ children }: SafeAreaProviderProps) {
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if the browser supports env() CSS function for safe areas
    const testEl = document.createElement('div');
    testEl.style.cssText = 'position: fixed; top: env(safe-area-inset-top); visibility: hidden;';
    document.body.appendChild(testEl);

    const computedStyle = getComputedStyle(testEl);
    const hasSupport = computedStyle.top !== '' && computedStyle.top !== 'auto';

    document.body.removeChild(testEl);
    setIsSupported(hasSupport);

    if (hasSupport) {
      // Use CSS env() values to get safe area insets
      const updateInsets = () => {
        const root = document.documentElement;
        const top = parseInt(getComputedStyle(root).getPropertyValue('--safe-area-inset-top') || '0');
        const right = parseInt(getComputedStyle(root).getPropertyValue('--safe-area-inset-right') || '0');
        const bottom = parseInt(getComputedStyle(root).getPropertyValue('--safe-area-inset-bottom') || '0');
        const left = parseInt(getComputedStyle(root).getPropertyValue('--safe-area-inset-left') || '0');

        setInsets({ top, right, bottom, left });
      };

      updateInsets();

      // Update on resize and orientation change
      window.addEventListener('resize', updateInsets);
      window.addEventListener('orientationchange', updateInsets);

      return () => {
        window.removeEventListener('resize', updateInsets);
        window.removeEventListener('orientationchange', updateInsets);
      };
    } else {
      // Fallback for browsers without safe area support
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        // Estimate safe areas for common mobile devices
        setInsets({
          top: 20, // Status bar
          right: 0,
          bottom: 34, // Home indicator
          left: 0,
        });
      }
    }
  }, []);

  return (
    <SafeAreaContext.Provider value={{ insets, isSupported }}>
      {children}
    </SafeAreaContext.Provider>
  );
}

export function useSafeArea() {
  const context = useContext(SafeAreaContext);
  if (context === undefined) {
    throw new Error('useSafeArea must be used within a SafeAreaProvider');
  }
  return context;
}

// CSS custom properties for safe area insets
export const safeAreaCSS = `
  :root {
    --safe-area-inset-top: env(safe-area-inset-top, 0px);
    --safe-area-inset-right: env(safe-area-inset-right, 0px);
    --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
    --safe-area-inset-left: env(safe-area-inset-left, 0px);
  }

  .safe-area-top {
    padding-top: var(--safe-area-inset-top);
  }

  .safe-area-right {
    padding-right: var(--safe-area-inset-right);
  }

  .safe-area-bottom {
    padding-bottom: var(--safe-area-inset-bottom);
  }

  .safe-area-left {
    padding-left: var(--safe-area-inset-left);
  }

  .safe-area-all {
    padding-top: var(--safe-area-inset-top);
    padding-right: var(--safe-area-inset-right);
    padding-bottom: var(--safe-area-inset-bottom);
    padding-left: var(--safe-area-inset-left);
  }

  .pt-safe {
    padding-top: var(--safe-area-inset-top);
  }

  .pb-safe {
    padding-bottom: var(--safe-area-inset-bottom);
  }

  .pl-safe {
    padding-left: var(--safe-area-inset-left);
  }

  .pr-safe {
    padding-right: var(--safe-area-inset-right);
  }
`;