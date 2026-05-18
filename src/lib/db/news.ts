import {
  createSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import type { NewsArticle, NewsBlock, NewsType } from "@/lib/news/types";

type NewsRow = {
  id: string;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  body: NewsBlock[];
  type: NewsType;
  city_slug: string | null;
  trade_slug: string | null;
  reading_minutes: number;
  generator_seed: string;
  published_at: string;
};

function rowToArticle(row: NewsRow): NewsArticle {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    excerpt: row.excerpt,
    body: row.body,
    type: row.type,
    citySlug: row.city_slug,
    tradeSlug: row.trade_slug,
    readingMinutes: row.reading_minutes,
    generatorSeed: row.generator_seed,
    publishedAt: row.published_at,
  };
}

export async function listNews(limit = 24, offset = 0): Promise<NewsArticle[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);
    if (error || !data) {
      if (error) console.error("[db/news] list error:", error.message);
      return [];
    }
    return (data as NewsRow[]).map(rowToArticle);
  } catch (e) {
    console.error("[db/news] threw:", e);
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
  if (!isSupabaseConfigured()) return undefined;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error || !data) {
      if (error) console.error("[db/news] get error:", error.message);
      return undefined;
    }
    return rowToArticle(data as NewsRow);
  } catch (e) {
    console.error("[db/news] threw:", e);
    return undefined;
  }
}

export async function listAllNewsSlugs(): Promise<{ slug: string; published_at: string }[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("news_articles")
      .select("slug, published_at")
      .order("published_at", { ascending: false })
      .limit(5000);
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}
