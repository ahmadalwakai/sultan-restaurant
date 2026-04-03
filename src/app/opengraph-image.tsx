import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sultan Restaurant — Authentic Middle Eastern & Indian Cuisine in Glasgow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%",
        background: "linear-gradient(135deg, #2D1810 0%, #1A1207 100%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "serif",
      }}>
        <div style={{ color: "#C8A951", fontSize: 28, letterSpacing: "6px", textTransform: "uppercase" }}>
          Authentic Middle Eastern & Indian Cuisine
        </div>
        <div style={{ color: "#FDFAF6", fontSize: 72, fontWeight: "bold", marginTop: 16 }}>
          Sultan Restaurant
        </div>
        <div style={{ color: "#C8A951", fontSize: 20, marginTop: 24, opacity: 0.8 }}>
          577 Gallowgate, Glasgow • sultanrestaurant.co.uk
        </div>
      </div>
    ),
    { ...size }
  );
}