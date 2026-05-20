#!/usr/bin/env tsx
/**
 * Import real French companies (artisans) into Supabase from the official
 * "Recherche d'entreprises" API, which sources the RNE (INPI) + Sirene (INSEE).
 *
 *   API: https://recherche-entreprises.api.gouv.fr  (free, no API key)
 *
 * For every (city, NAF code) pair it fetches active companies, maps them to
 * our trades and city slugs, and upserts them into public.artisans with
 * source='inpi', verified=true (real SIRET). Idempotent: re-running updates
 * rather than duplicates (conflict on siret).
 *
 * Usage:
 *   pnpm import:inpi                 # full import (≈ 350 cities × 14 NAF)
 *   pnpm import:inpi --cities 20     # only the 20 largest cities (test run)
 *   pnpm import:inpi --per 8         # cap N companies per city × NAF (default 15)
 *
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   Outbound network access (won't run in a restricted sandbox).
 */

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { CITIES } from "../src/data/cities";
import { TRADES } from "../src/data/trades";
import { NAF_BY_TRADE } from "../src/lib/naf";

const API = "https://recherche-entreprises.api.gouv.fr/search";
const THROTTLE_MS = 200; // ~5 req/s, safely under the public rate limit

function env(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env var: ${name}`);
    process.exit(1);
  }
  return v;
}

function arg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const supabase = createClient(
  env("NEXT_PUBLIC_SUPABASE_URL"),
  env("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false } },
);

const cityLimit = Number(arg("--cities") ?? CITIES.length);
const perNaf = Number(arg("--per") ?? 15);

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// NAF code → list of trade slugs it maps to.
const NAF_TO_TRADES: Record<string, string[]> = {};
for (const [trade, codes] of Object.entries(NAF_BY_TRADE)) {
  for (const code of codes) {
    (NAF_TO_TRADES[code] ??= []).push(trade);
  }
}
const ALL_NAF = Object.keys(NAF_TO_TRADES);

type ApiCompany = {
  siren: string;
  nom_complet?: string;
  nom_raison_sociale?: string;
  date_creation?: string;
  siege?: {
    siret?: string;
    adresse?: string;
    code_postal?: string;
    libelle_commune?: string;
    latitude?: string;
    longitude?: string;
  };
};

async function fetchCompanies(
  postalCode: string,
  naf: string,
  retries = 3,
): Promise<ApiCompany[]> {
  const url = `${API}?code_postal=${postalCode}&activite_principale=${encodeURIComponent(naf)}&etat_administratif=A&per_page=25&page=1`;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
      });
      if (res.status === 429) {
        await sleep(2000 * (attempt + 1)); // backoff on rate limit
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as { results?: ApiCompany[] };
      return json.results ?? [];
    } catch (e) {
      if (attempt === retries) {
        console.warn(`  ! ${postalCode}/${naf} failed: ${e instanceof Error ? e.message : e}`);
        return [];
      }
      await sleep(1000 * (attempt + 1));
    }
  }
  return [];
}

function cleanName(c: ApiCompany): string {
  const raw = (c.nom_complet || c.nom_raison_sociale || "").trim();
  // Title-case ALL-CAPS company names for readability.
  if (raw === raw.toUpperCase()) {
    return raw
      .toLowerCase()
      .replace(/\b\w/g, (m) => m.toUpperCase());
  }
  return raw;
}

type ArtisanRow = Record<string, unknown>;

function toArtisanRows(
  companies: ApiCompany[],
  citySlug: string,
  postalCode: string,
  trades: string[],
): ArtisanRow[] {
  const rows: ArtisanRow[] = [];
  for (const c of companies) {
    const siret = c.siege?.siret;
    const name = cleanName(c);
    if (!siret || !/^[0-9]{14}$/.test(siret) || !name) continue;

    const yearsExperience = c.date_creation
      ? Math.max(0, new Date().getFullYear() - new Date(c.date_creation).getFullYear())
      : null;

    const tradeLabels = trades
      .map((t) => TRADES.find((x) => x.slug === t)?.name.toLowerCase())
      .filter(Boolean)
      .join(" / ");

    rows.push({
      slug: `${slugify(name)}-${c.siren.slice(-5)}`,
      name,
      siret,
      trades,
      city_slug: citySlug,
      address: c.siege?.adresse ?? null,
      postal_code: c.siege?.code_postal ?? postalCode,
      description: `${name}, ${tradeLabels} référencé(e) au Registre National des Entreprises (RNE). Entreprise vérifiée — SIRET ${siret}.`,
      years_experience: yearsExperience,
      certifications: ["Entreprise vérifiée RNE"],
      emergency: false,
      verified: true,
      price_range: 2,
      lat: c.siege?.latitude ? Number(c.siege.latitude) : null,
      lng: c.siege?.longitude ? Number(c.siege.longitude) : null,
      review_count: 0,
      status: "active",
      source: "inpi",
      published_at: new Date().toISOString(),
    });
  }
  return rows;
}

async function main() {
  const cities = CITIES.slice(0, cityLimit);
  console.log(`INPI / RNE import → Supabase`);
  console.log(`  Cities: ${cities.length}  ·  NAF codes: ${ALL_NAF.length}  ·  Cap: ${perNaf}/city×NAF`);
  console.log(`  Project: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
  console.log("");

  const t0 = Date.now();
  let totalImported = 0;
  let cityIndex = 0;

  for (const city of cities) {
    cityIndex++;
    const cityRows: ArtisanRow[] = [];
    const seenSiret = new Set<string>();

    for (const naf of ALL_NAF) {
      const trades = NAF_TO_TRADES[naf];
      const companies = await fetchCompanies(city.postalCode, naf);
      const rows = toArtisanRows(
        companies.slice(0, perNaf),
        city.slug,
        city.postalCode,
        trades,
      );
      for (const r of rows) {
        if (!seenSiret.has(r.siret as string)) {
          seenSiret.add(r.siret as string);
          cityRows.push(r);
        }
      }
      await sleep(THROTTLE_MS);
    }

    if (cityRows.length > 0) {
      const { error } = await supabase
        .from("artisans")
        .upsert(cityRows, { onConflict: "siret" });
      if (error) {
        console.warn(`  ! ${city.name}: upsert failed — ${error.message}`);
      } else {
        totalImported += cityRows.length;
      }
    }

    const pct = ((cityIndex / cities.length) * 100).toFixed(0);
    console.log(
      `  [${pct.padStart(3)}%] ${city.name.padEnd(28)} ${String(cityRows.length).padStart(3)} artisans  (total ${totalImported})`,
    );
  }

  const elapsed = ((Date.now() - t0) / 1000 / 60).toFixed(1);
  console.log("");
  console.log(`Done. ${totalImported} artisans importés en ${elapsed} min.`);
}

main().catch((e) => {
  console.error("Import failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});
