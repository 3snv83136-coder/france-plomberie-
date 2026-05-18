import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/utils";

export const runtime = "edge";
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #16a34a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            🔧
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, opacity: 0.92 }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Trouvez un artisan qualifié près de chez vous
          </div>
          <div style={{ fontSize: 28, opacity: 0.85, maxWidth: 900 }}>
            Plombier, électricien, chauffagiste… 120 000+ artisans vérifiés
            partout en France.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            fontSize: 22,
            opacity: 0.9,
          }}
        >
          <span>✓ SIRET vérifiés</span>
          <span>✓ Avis modérés</span>
          <span>✓ Devis gratuits</span>
        </div>
      </div>
    ),
    size,
  );
}
