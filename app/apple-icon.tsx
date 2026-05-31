import { ImageResponse } from "next/og";

// Apple touch icon (home-screen): gold "T" on midnight.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 120,
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
