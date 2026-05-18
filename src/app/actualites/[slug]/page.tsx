import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  Newspaper,
  Phone,
  Zap,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { NewsContent } from "@/components/NewsContent";
import { CallbackButton } from "@/components/CallbackButton";
import { getNewsBySlug, listNews } from "@/lib/db/news";
import { getCityBySlug } from "@/data/cities";
import { getTradeBySlug } from "@/data/trades";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/actualites/${slug}`,
  });
}

const TYPE_LABEL = {
  tarifs: "Tarifs",
  saison: "Saison",
  "guide-local": "Guide local",
  actualite: "Actualité",
};

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  const city = article.citySlug ? getCityBySlug(article.citySlug) : null;
  const trade = article.tradeSlug ? getTradeBySlug(article.tradeSlug) : null;
  const path = `/actualites/${slug}`;
  const others = (await listNews(4)).filter((a) => a.slug !== article.slug).slice(0, 3);

  const crumbs = [
    { name: "Actualités", url: "/actualites" },
    { name: article.title, url: path },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "fr-FR",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    articleSection: TYPE_LABEL[article.type],
    about:
      city && trade
        ? `${trade.name} à ${city.name}`
        : trade
          ? trade.name
          : city
            ? city.name
            : undefined,
  };

  return (
    <>
      <StructuredData data={[breadcrumbSchema(crumbs), articleSchema]} />

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary via-[hsl(var(--primary-dark))] to-[hsl(217_91%_22%)] text-primary-foreground">
        <div className="container relative py-8 md:py-12">
          <Breadcrumbs items={crumbs} />

          <div className="mt-2 max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground shadow-sm">
                <Newspaper className="w-3 h-3" />
                {TYPE_LABEL[article.type].toUpperCase()}
              </span>
              {trade && (
                <Link
                  href={`/${trade.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/15 hover:bg-white/25 backdrop-blur"
                >
                  {trade.name}
                </Link>
              )}
              {city && (
                <Link
                  href={trade ? `/${trade.slug}/${city.slug}` : `/`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/15 hover:bg-white/25 backdrop-blur"
                >
                  <MapPin className="w-3 h-3" />
                  {city.name}
                </Link>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-balance leading-[1.1]">
              {article.title}
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              {article.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readingMinutes} min de lecture
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                Publié le{" "}
                {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
      </section>

      <article className="container py-8 max-w-3xl">
        <NewsContent blocks={article.body} />

        <section className="my-10 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground p-6 md:p-8 shadow-lg">
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-secondary text-secondary-foreground mb-3 shadow-sm">
            <Zap className="w-3 h-3" /> DÈS 69 € · URGENCE 24/7
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-balance">
            Besoin d'{trade ? `un ${trade.name.toLowerCase()}` : "un artisan"}
            {city ? ` à ${city.name}` : ""} ?
          </h2>
          <p className="text-white/85 mb-4 max-w-2xl">
            Laissez votre numéro, un technicien vous rappelle sous 5 min pour un
            devis gratuit et sans engagement.
          </p>
          <div className="flex flex-wrap gap-2">
            <CallbackButton
              context={{
                trade: trade?.slug,
                citySlug: city?.slug,
                cityName: city?.name,
                postalCode: city?.postalCode,
              }}
              variant="cta"
              size="lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              Être rappelé en 5 min
            </CallbackButton>
            {city && trade && (
              <Link
                href={`/${trade.slug}/${city.slug}`}
                className="btn h-12 px-5 bg-white/10 text-white hover:bg-white/15 backdrop-blur"
              >
                Voir les {trade.plural.toLowerCase()} à {city.name}
              </Link>
            )}
          </div>
        </section>

        {others.length > 0 && (
          <section className="my-10">
            <h2 className="text-xl font-bold mb-4">À lire aussi</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/actualites/${o.slug}`}
                  className="card p-4 hover:border-primary hover:shadow-sm transition-all"
                >
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                    {TYPE_LABEL[o.type]}
                  </span>
                  <div className="font-bold mt-2 text-sm leading-tight">{o.title}</div>
                  <div className="text-xs text-muted-foreground mt-2 inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {o.readingMinutes} min
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
