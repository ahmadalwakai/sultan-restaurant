'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallPromptProps {
  className?: string;
  autoShow?: boolean;
  delay?: number;
}

export default function PWAInstallPrompt({
  className,
  autoShow = true,
  delay = 30000, // 30 seconds
}: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppiOS = (window.navigator as any).standalone === true;
      setIsInstalled(isStandalone || isInWebAppiOS);
    };

    checkInstalled();

    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      if (autoShow) {
        setTimeout(() => {
          setIsVisible(true);
        }, delay);
      }
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [autoShow, delay]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal to avoid showing again
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Don't show if already installed or dismissed recently
  const dismissedTime = localStorage.getItem('pwa-install-dismissed');
  const recentlyDismissed = dismissedTime && (Date.now() - parseInt(dismissedTime)) < 7 * 24 * 60 * 60 * 1000; // 7 days

  if (isInstalled || recentlyDismissed || (!deferredPrompt && !isIOS)) {
    return null;
  }

  // iOS instructions
  if (isIOS && !isVisible) {
    return (
      <div className={cn(
        'fixed bottom-4 left-4 right-4 z-50 bg-white rounded-lg shadow-lg border p-4',
        'safe-area-bottom pb-safe',
        className
      )}>
        <div className="flex items-start space-x-3">
          <Smartphone className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900">Install Sultan Restaurant</h3>
            <p className="text-sm text-gray-600 mt-1">
              Tap the share button <ShareIcon /> then "Add to Home Screen" to install.
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className={cn(
      'fixed bottom-4 left-4 right-4 z-50 bg-white rounded-lg shadow-lg border p-4',
      'safe-area-bottom pb-safe',
      className
    )}>
      <div className="flex items-start space-x-3">
        <Download className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900">Install Sultan Restaurant</h3>
          <p className="text-sm text-gray-600 mt-1">
            Install our app for a better experience with offline access and push notifications.
          </p>
          <div className="flex space-x-2 mt-3">
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-colors"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-gray-600 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// iOS Share icon component
function ShareIcon() {
  return (
    <svg
      className="w-4 h-4 inline-block mx-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
      />
    </svg>
  );
}