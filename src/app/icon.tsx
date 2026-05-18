import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
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
          fontSize: 22,
          fontWeight: 800,
          background: "linear-gradient(135deg, #2563eb, #1e40af)",
          color: "white",
          borderRadius: 6,
        }}
      >
        A
      </div>
    ),
    size,
  );
}
