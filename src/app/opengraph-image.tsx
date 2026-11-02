import { ImageResponse } from "next/og";

export const alt = "Mamalla Beach Resort — Mahabalipuram, Tamil Nadu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Typographic social-sharing card (no photography is implied). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(180deg, #1f3a4b 0%, #12232f 60%, #3c4c55 100%)",
          color: "#f7f2e9",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, color: "#e5d7bf" }}>MAHABALIPURAM · EAST COAST ROAD</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, letterSpacing: 18 }}>MAMALLA</div>
          <div style={{ fontSize: 28, letterSpacing: 12, color: "#e5d7bf" }}>BEACH RESORT</div>
        </div>
        <div style={{ display: "flex", height: 4, width: 160, background: "#a85a36" }} />
      </div>
    ),
    size,
  );
}
