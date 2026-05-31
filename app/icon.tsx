import { ImageResponse } from "next/og";

// Branded browser-tab icon: gold "T" on midnight.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#151d32",
          color: "#cc9933",
          fontSize: 46,
          fontWeight: 700,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        T
      </div>
    ),
    { ...size },
  );
}
