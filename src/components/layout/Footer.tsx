import Link from "next/link";
import { SITE_NAME, CONTACT } from "@/lib/constants/site";
import { Logo } from "@/components/shared/Logo";
import { FOOTER_NAV } from "@/lib/constants/navigation";

export function Footer() {
  const columnStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  };

  const headingStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    color: "white",
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    marginBottom: 4,
  };

  const linkStyle: React.CSSProperties = {
    fontSize: 14,
    color: "#9CA3AF",
    textDecoration: "none",
    transition: "color 0.2s",
  };

  return (
    <footer
      style={{
        background: "#111111",
        borderTop: "1px solid #B8860B",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 24px 0",
        }}
      >
        {/* Grid: brand + 3 nav columns */}
        <div
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
        >
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <Logo size="sm" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 14, color: "#9CA3AF" }}>
                {CONTACT.address}
              </span>
              <a
                href={`tel:${CONTACT.phone}`}
                style={{ fontSize: 14, color: "#9CA3AF", textDecoration: "none" }}
              >
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                style={{ fontSize: 14, color: "#9CA3AF", textDecoration: "none" }}
              >
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={columnStyle}>
            <p style={headingStyle}>Quick Links</p>
            {FOOTER_NAV.quickLinks.map((item) => (
              <Link key={item.href} href={item.href} style={linkStyle}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Information */}
          <div style={columnStyle}>
            <p style={headingStyle}>Information</p>
            {FOOTER_NAV.info.map((item) => (
              <Link key={item.href} href={item.href} style={linkStyle}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div style={columnStyle}>
            <p style={headingStyle}>Legal</p>
            {FOOTER_NAV.legal.map((item) => (
              <Link key={item.href} href={item.href} style={linkStyle}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 40,
            borderTop: "1px solid #374151",
            padding: "20px 0",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 13, color: "#6B7280" }}>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
