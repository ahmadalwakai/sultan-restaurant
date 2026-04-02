import { SITE_CONFIG } from "@/lib/constants/site";

export function MapPreview() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-xl shadow-lg">
          <iframe
            title="Sultan Restaurant Location"
            src={`https://www.google.com/maps/embed/v1/place?key=PLACEHOLDER&q=${encodeURIComponent(SITE_CONFIG.contact.address)}`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
