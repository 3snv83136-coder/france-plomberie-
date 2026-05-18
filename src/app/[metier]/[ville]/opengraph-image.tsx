import { ImageResponse } from "next/og";
import { getTradeBySlug } from "@/data/trades";
import { getCityBySlug } from "@/data/cities";
import { getArtisansForCityAndTrade } from "@/data/artisans";
import { SITE_NAME } from "@/lib/utils";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { metier: string; ville: string };
}) {
  const trade = getTradeBySlug(params.metier);
  const city = getCityBySlug(params.ville);

  if (!trade || !city) {
    return new ImageResponse(<div>404</div>, size);
  }

  const artisans = getArtisansForCityAndTrade(city.slug, trade.slug);
  const avgRating =
    artisans.reduce((s, a) => s + a.rating, 0) / Math.max(artisans.length, 1);

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
            "linear-gradient(135deg, #1e40af 0%, #2563eb 70%, #f97316 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, opacity: 0.9 }}>
          <span
            style={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
            }}
          >
            🔧
          </span>
          <span style={{ fontWeight: 600 }}>{SITE_NAME}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              opacity: 0.85,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            Top {Math.min(artisans.length, 10)} {trade.plural.toLowerCase()}
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            {trade.name}
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1,
              opacity: 0.95,
            }}
          >
            à {city.name} <span style={{ opacity: 0.6 }}>({city.department.code})</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 26,
            alignItems: "center",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            ★ {avgRating.toFixed(1).replace(".", ",")}/5
          </span>
          <span>· {artisans.length} artisans</span>
          <span>· Devis gratuit 24h</span>
        </div>
      </div>
    ),
    size,
  );
}
