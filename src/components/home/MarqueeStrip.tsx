export function MarqueeStrip() {
  const items = [
    "Biryani",
    "Tikka Masala",
    "Tandoori",
    "Korma",
    "Vindaloo",
    "Naan",
    "Samosa",
    "Bhaji",
    "Jalfrezi",
    "Madras",
  ];

  return (
    <div className="overflow-hidden bg-amber-500 py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-semibold uppercase tracking-wider text-white"
          >
            ✦ {item}
          </span>
        ))}
      </div>
    </div>
  );
}
