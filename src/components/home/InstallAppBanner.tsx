"use client";

import { useEffect, useState } from "react";

export function InstallAppBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem("sultan-install-dismissed");
    if (dismissed) return;

    function handleBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  function handleInstall() {
    if (!deferredPrompt) return;
    (deferredPrompt as unknown as { prompt: () => void }).prompt();
    setShowBanner(false);
  }

  function handleDismiss() {
    setShowBanner(false);
    localStorage.setItem("sultan-install-dismissed", "true");
  }

  if (!showBanner) return null;

  return (
    <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <div className="flex items-center gap-4 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">
            📱
          </div>
          <div>
            <h3 className="font-bold text-lg">Add Sultan to your Home Screen</h3>
            <p className="text-sm text-white/80">
              Quick access to menu, orders & exclusive offers
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleInstall}
            className="rounded-lg bg-white px-6 py-2.5 font-semibold text-amber-600 transition-colors hover:bg-amber-50"
          >
            Install App
          </button>
          <button
            onClick={handleDismiss}
            className="rounded-lg border-2 border-white/40 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white"
          >
            Not Now
          </button>
        </div>
      </div>
    </section>
  );
}
