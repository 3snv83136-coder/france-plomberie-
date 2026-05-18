import type { Artisan } from "@/data/artisans";
import { getArtisansForCityAndTrade as seedGetArtisans } from "@/data/artisans";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { ArtisanRow } from "@/lib/supabase/types";

function rowToArtisan(row: ArtisanRow): Artisan {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    ownerName: row.owner_name ?? "",
    trades: row.trades,
    citySlug: row.city_slug ?? "",
    address: row.address ?? "",
    phone: row.phone ?? "",
    email: row.email ?? "",
    description: row.description ?? "",
    rating: row.rating ?? 0,
    reviewCount: row.review_count,
    yearsExperience: row.years_experience ?? 0,
    certifications: row.certifications,
    emergency: row.emergency,
    verified: row.verified,
    priceRange: (row.price_range ?? 2) as 1 | 2 | 3,
    responseTimeMinutes: row.response_time_minutes ?? 60,
    photoSeed: row.photo_seed ?? row.name,
    reviews: [],
  };
}

export async function getArtisansForCityAndTrade(
  citySlug: string,
  tradeSlug: string,
): Promise<Artisan[]> {
  if (!isSupabaseConfigured()) {
    return seedGetArtisans(citySlug, tradeSlug);
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("artisans")
      .select("*")
      .eq("city_slug", citySlug)
      .eq("status", "active")
      .contains("trades", [tradeSlug])
      .order("rating", { ascending: false })
      .limit(20);

    if (error) {
      console.error("[db] artisans query failed:", error.message);
      return seedGetArtisans(citySlug, tradeSlug);
    }
    if (!data || data.length === 0) {
      return seedGetArtisans(citySlug, tradeSlug);
    }
    return (data as ArtisanRow[]).map(rowToArtisan);
  } catch (e) {
    console.error("[db] artisans query threw:", e);
    return seedGetArtisans(citySlug, tradeSlug);
  }
}

export async function getArtisanBySlug(
  citySlug: string,
  tradeSlug: string,
  artisanSlug: string,
): Promise<Artisan | undefined> {
  const list = await getArtisansForCityAndTrade(citySlug, tradeSlug);
  return list.find((a) => a.slug === artisanSlug);
}
