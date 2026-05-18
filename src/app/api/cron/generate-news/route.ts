import { NextResponse } from "next/server";
import {
  createSupabaseServiceClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { currentSlotSeed, generateArticleForSeed } from "@/lib/news/generator";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  // Vercel cron passes Authorization: Bearer ${CRON_SECRET} when the secret
  // is configured in the project. We also accept GETs from the same origin
  // for one-off testing via the dashboard.
  const auth = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // No secret configured → only allow vercel-cron internal header
    return request.headers.get("x-vercel-cron") === "1";
  }
  return auth === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 503 },
    );
  }

  const seed = currentSlotSeed();
  const article = generateArticleForSeed(seed);

  try {
    const supabase = createSupabaseServiceClient();

    const { data: existing } = await supabase
      .from("news_articles")
      .select("slug")
      .eq("generator_seed", article.generatorSeed)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        {
          ok: true,
          skipped: true,
          reason: "Already generated for this 12h slot",
          slug: existing.slug,
        },
        { status: 200 },
      );
    }

    const { error } = await supabase.from("news_articles").insert({
      slug: article.slug,
      title: article.title,
      meta_title: article.metaTitle,
      meta_description: article.metaDescription,
      excerpt: article.excerpt,
      body: article.body,
      type: article.type,
      city_slug: article.citySlug,
      trade_slug: article.tradeSlug,
      reading_minutes: article.readingMinutes,
      generator_seed: article.generatorSeed,
      published_at: article.publishedAt,
    });

    if (error) {
      console.error("[cron/news] insert error:", error.message);
      return NextResponse.json(
        { error: "Insert failed", detail: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        created: true,
        slug: article.slug,
        title: article.title,
        type: article.type,
        city: article.citySlug,
        trade: article.tradeSlug,
      },
      { status: 201 },
    );
  } catch (e) {
    console.error("[cron/news] threw:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
