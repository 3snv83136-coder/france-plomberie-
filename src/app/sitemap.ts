import type { MetadataRoute } from "next";
import { TRADES } from "@/data/trades";
import { CITIES } from "@/data/cities";
import { getArtisansForCityAndTrade } from "@/data/artisans";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: `${SITE_URL}/`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1,
  });

  for (const t of TRADES) {
    entries.push({
      url: `${SITE_URL}/${t.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  for (const t of TRADES) {
    for (const c of CITIES) {
      entries.push({
        url: `${SITE_URL}/${t.slug}/${c.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });

      const artisans = getArtisansForCityAndTrade(c.slug, t.slug);
      for (const a of artisans) {
        entries.push({
          url: `${SITE_URL}/${t.slug}/${c.slug}/${a.slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  for (const path of ["/devis", "/metiers", "/guides", "/recherche", "/artisan/inscription"]) {
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
