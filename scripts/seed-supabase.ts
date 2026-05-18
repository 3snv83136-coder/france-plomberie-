#!/usr/bin/env tsx
/**
 * Seed reference data into Supabase from TS files.
 *
 * Usage:
 *   pnpm seed:db                       # seed regions/departments/cities/trades
 *   pnpm seed:db --with-artisans       # also seed fake artisans (top 50 cities × all trades)
 *
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  (server-only)
 */

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { REGIONS } from "../src/data/regions";
import { DEPARTMENTS } from "../src/data/departments";
import { CITIES } from "../src/data/cities";
import { TRADES } from "../src/data/trades";
import { getArtisansForCityAndTrade } from "../src/data/artisans";

function env(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env var: ${name}`);
    console.error("Set it in .env.local or export it before running.");
    process.exit(1);
  }
  return v;
}

const supabase = createClient(
  env("NEXT_PUBLIC_SUPABASE_URL"),
  env("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false } },
);

function chunked<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function seedRegions() {
  process.stdout.write(`Seeding ${REGIONS.length} regions… `);
  const rows = REGIONS.map((r) => ({
    slug: r.slug,
    name: r.name,
    prefecture: r.prefecture,
    population: r.population,
  }));
  const { error } = await supabase.from("regions").upsert(rows, { onConflict: "slug" });
  if (error) throw new Error(`regions: ${error.message}`);
  console.log("OK");
}

async function seedDepartments() {
  process.stdout.write(`Seeding ${DEPARTMENTS.length} departments… `);
  const rows = DEPARTMENTS.map((d) => ({
    code: d.code,
    slug: d.slug,
    name: d.name,
    prefecture: d.prefecture,
    population: d.population,
    region_slug: d.region,
  }));
  const { error } = await supabase.from("departments").upsert(rows, { onConflict: "code" });
  if (error) throw new Error(`departments: ${error.message}`);
  console.log("OK");
}

async function seedCities() {
  process.stdout.write(`Seeding ${CITIES.length} cities… `);
  const rows = CITIES.map((c, i) => ({
    slug: c.slug,
    name: c.name,
    // Fallback INSEE so the NOT NULL UNIQUE constraint holds for seed entries.
    // Real INSEE codes can be backfilled later via the geo.api.gouv.fr import.
    insee_code: c.insee ?? `SEED${String(i).padStart(8, "0")}`,
    postal_code: c.postalCode,
    population: c.population,
    lat: c.lat,
    lng: c.lng,
    department_code: c.department.code,
    nearby_slugs: c.nearby,
    is_active: true,
  }));

  for (const batch of chunked(rows, 200)) {
    const { error } = await supabase.from("cities").upsert(batch, { onConflict: "slug" });
    if (error) throw new Error(`cities: ${error.message}`);
  }
  console.log("OK");
}

async function seedTrades() {
  process.stdout.write(`Seeding ${TRADES.length} trades… `);
  const rows = TRADES.map((t) => ({
    slug: t.slug,
    name: t.name,
    plural: t.plural,
    category: t.category,
    schema_type: t.schemaType,
    short_description: t.shortDescription,
    description: t.description,
    avg_price_unit: t.avgPrice.unit,
    avg_price_min: t.avgPrice.min,
    avg_price_max: t.avgPrice.max,
    common_services: t.commonServices,
    emergency: t.emergency,
    icon: t.icon,
    faq: t.faq,
    feminine: t.feminine ?? false,
  }));
  const { error } = await supabase.from("trades").upsert(rows, { onConflict: "slug" });
  if (error) throw new Error(`trades: ${error.message}`);
  console.log("OK");
}

async function seedArtisans() {
  // Top 50 cities (already sorted by population in CITIES) × all trades.
  const topCities = CITIES.slice(0, 50);
  const rows: Array<Record<string, unknown>> = [];
  for (const city of topCities) {
    for (const trade of TRADES) {
      const artisans = getArtisansForCityAndTrade(city.slug, trade.slug);
      for (const a of artisans) {
        rows.push({
          slug: a.slug,
          name: a.name,
          owner_name: a.ownerName,
          trades: a.trades,
          city_slug: city.slug,
          address: a.address,
          postal_code: city.postalCode,
          phone: a.phone,
          email: a.email,
          description: a.description,
          rating: a.rating,
          review_count: a.reviewCount,
          years_experience: a.yearsExperience,
          certifications: a.certifications,
          emergency: a.emergency,
          verified: a.verified,
          price_range: a.priceRange,
          response_time_minutes: a.responseTimeMinutes,
          photo_seed: a.photoSeed,
          status: "active",
          source: "seed",
          published_at: new Date().toISOString(),
        });
      }
    }
  }

  process.stdout.write(`Seeding ${rows.length} artisans (top 50 cities × ${TRADES.length} trades)… `);
  for (const batch of chunked(rows, 200)) {
    const { error } = await supabase
      .from("artisans")
      .upsert(batch, { onConflict: "city_slug,slug" });
    if (error) throw new Error(`artisans: ${error.message}`);
  }
  console.log("OK");
}

async function main() {
  const withArtisans = process.argv.includes("--with-artisans");

  console.log("Seeding reference data into Supabase…");
  console.log(`  Project: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
  console.log("");

  const t0 = Date.now();
  await seedRegions();
  await seedDepartments();
  await seedCities();
  await seedTrades();

  if (withArtisans) {
    await seedArtisans();
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log("");
  console.log(`Done in ${elapsed}s.`);
  if (!withArtisans) {
    console.log("Run with --with-artisans to also seed fake artisan profiles.");
  }
}

main().catch((e) => {
  console.error("");
  console.error("Seed failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});
