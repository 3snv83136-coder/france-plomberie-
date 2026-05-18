import { TRADES } from "@/data/trades";
import { CITIES } from "@/data/cities";
import { REGIONS } from "@/data/regions";
import { DEPARTMENTS } from "@/data/departments";
import { GUIDES } from "@/data/guides";
import { getArtisansForCityAndTrade } from "@/data/artisans";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 86400;

type Entry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
};

function xmlEntry(e: Entry) {
  return [
    "  <url>",
    `    <loc>${e.loc}</loc>`,
    e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : "",
    e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : "",
    e.priority !== undefined ? `    <priority>${e.priority}</priority>` : "",
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

function urlset(entries: Entry[]) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries.map(xmlEntry).join("\n"),
    "</urlset>",
  ].join("\n");
}

function buildCoreShard(): Entry[] {
  const now = new Date().toISOString();
  const entries: Entry[] = [
    { loc: `${SITE_URL}/`, lastmod: now, changefreq: "daily", priority: 1 },
  ];

  for (const t of TRADES) {
    entries.push({
      loc: `${SITE_URL}/${t.slug}`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.9,
    });
    entries.push({
      loc: `${SITE_URL}/${t.slug}/region`,
      lastmod: now,
      changefreq: "monthly",
      priority: 0.6,
    });
    entries.push({
      loc: `${SITE_URL}/${t.slug}/departement`,
      lastmod: now,
      changefreq: "monthly",
      priority: 0.6,
    });
    for (const r of REGIONS) {
      entries.push({
        loc: `${SITE_URL}/${t.slug}/region/${r.slug}`,
        lastmod: now,
        changefreq: "weekly",
        priority: 0.75,
      });
    }
    for (const d of DEPARTMENTS) {
      entries.push({
        loc: `${SITE_URL}/${t.slug}/departement/${d.slug}`,
        lastmod: now,
        changefreq: "weekly",
        priority: 0.7,
      });
    }
  }

  for (const g of GUIDES) {
    entries.push({
      loc: `${SITE_URL}/guides/${g.slug}`,
      lastmod: new Date(g.updatedAt).toISOString(),
      changefreq: "monthly",
      priority: 0.7,
    });
  }

  for (const p of [
    "/devis",
    "/metiers",
    "/guides",
    "/recherche",
    "/artisan/inscription",
    "/a-propos",
    "/contact",
  ]) {
    entries.push({
      loc: `${SITE_URL}${p}`,
      lastmod: now,
      changefreq: "monthly",
      priority: 0.5,
    });
  }

  for (const p of ["/mentions-legales", "/confidentialite", "/cgu"]) {
    entries.push({
      loc: `${SITE_URL}${p}`,
      lastmod: now,
      changefreq: "yearly",
      priority: 0.2,
    });
  }

  return entries;
}

function buildTradeShard(tradeSlug: string): Entry[] | null {
  const trade = TRADES.find((t) => t.slug === tradeSlug);
  if (!trade) return null;
  const now = new Date().toISOString();
  const entries: Entry[] = [];

  for (const c of CITIES) {
    entries.push({
      loc: `${SITE_URL}/${trade.slug}/${c.slug}`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
    });
    for (const a of getArtisansForCityAndTrade(c.slug, trade.slug)) {
      entries.push({
        loc: `${SITE_URL}/${trade.slug}/${c.slug}/${a.slug}`,
        lastmod: now,
        changefreq: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ shard: string }> },
) {
  const { shard } = await params;
  const id = shard.endsWith(".xml") ? shard.slice(0, -4) : shard;

  let entries: Entry[] | null;
  if (id === "core") {
    entries = buildCoreShard();
  } else {
    entries = buildTradeShard(id);
  }

  if (!entries) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(urlset(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

export function generateStaticParams() {
  return [
    { shard: "core.xml" },
    ...TRADES.map((t) => ({ shard: `${t.slug}.xml` })),
  ];
}
