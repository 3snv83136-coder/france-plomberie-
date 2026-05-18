import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  ListOrdered,
  Phone,
  RefreshCw,
  User,
  Zap,
} from "lucide-react";
import { GUIDES, getGuideBySlug } from "@/data/guides";
import { getTradeBySlug } from "@/data/trades";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { GuideContent } from "@/components/GuideContent";
import { FAQ } from "@/components/FAQ";
import { CallbackButton } from "@/components/CallbackButton";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const path = `/guides/${guide.slug}`;
  const crumbs = [
    { name: "Guides", url: "/guides" },
    { name: guide.title, url: path },
  ];

  const related = guide.related
    .map((s) => GUIDES.find((g) => g.slug === s))
    .filter(Boolean) as typeof GUIDES;

  const relatedTrades = guide.relatedTrades
    .map(getTradeBySlug)
    .filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    inLanguage: "fr-FR",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${path}`,
    },
    author: {
      "@type": "Person",
      name: guide.author.name,
      jobTitle: guide.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    articleSection: guide.category,
    wordCount: guide.readingMinutes * 200,
  };

  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(crumbs),
          articleSchema,
          faqSchema(guide.faq),
        ]}
      />

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary via-[hsl(var(--primary-dark))] to-[hsl(217_91%_22%)] text-primary-foreground">
        <div className="container relative py-8 md:py-12">
          <Breadcrumbs items={crumbs} />

          <div className="mt-2 max-w-3xl">
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-bold mb-3 shadow-sm">
              {guide.category.toUpperCase()}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-balance leading-[1.1]">
              {guide.title}
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              {guide.heroIntro}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>
                  Par{" "}
                  <strong className="text-white">{guide.author.name}</strong>
                  , {guide.author.role}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {guide.readingMinutes} min de lecture
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                Publié le{" "}
                {new Date(guide.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4" />
                Maj{" "}
                {new Date(guide.updatedAt).toLocaleDateString("fr-FR", {
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

      <article className="container">

        <div className="grid lg:grid-cols-[1fr_280px] gap-8 my-6">
          <div className="min-w-0">
            <section className="card p-5 md:p-6 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Les points clés
              </h2>
              <ul className="space-y-2">
                {guide.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </section>

            <GuideContent sections={guide.sections} />

            <FAQ items={guide.faq} title="Questions fréquentes" />

            <section className="my-10 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground p-6 md:p-8 shadow-lg">
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-secondary text-secondary-foreground mb-3 shadow-sm">
                <Zap className="w-3 h-3" /> DÈS 69 € · 24/7
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-balance">
                Besoin d'un{" "}
                {relatedTrades[0]?.name.toLowerCase() ?? "artisan"} maintenant ?
              </h2>
              <p className="text-white/85 mb-4 max-w-2xl">
                Laissez votre numéro, un technicien vous rappelle sous 5 min pour
                un devis gratuit et sans engagement.
              </p>
              <div className="flex flex-wrap gap-2">
                <CallbackButton
                  context={{ trade: relatedTrades[0]?.slug }}
                  variant="cta"
                  size="lg"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Être rappelé en 5 min
                </CallbackButton>
                {relatedTrades.length > 0 && (
                  <Link
                    href={`/${relatedTrades[0]!.slug}`}
                    className="btn h-12 px-5 bg-white/10 text-white hover:bg-white/15 backdrop-blur"
                  >
                    Voir les {relatedTrades[0]!.plural.toLowerCase()}
                  </Link>
                )}
              </div>
            </section>

            {relatedTrades.length > 0 && (
              <section className="my-10">
                <h2 className="text-2xl font-bold mb-4">
                  Métiers concernés par ce guide
                </h2>
                <div className="flex flex-wrap gap-2">
                  {relatedTrades.map((t) => (
                    <Link
                      key={t!.slug}
                      href={`/${t!.slug}`}
                      className="px-3 py-1.5 rounded-full border text-sm hover:border-primary hover:text-primary transition-colors"
                    >
                      {t!.plural}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {related.length > 0 && (
              <section className="my-10">
                <h2 className="text-2xl font-bold mb-4">Guides liés</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {related.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/guides/${g.slug}`}
                      className="card p-4 hover:border-primary hover:shadow-md transition-all"
                    >
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {g.category}
                      </span>
                      <div className="font-semibold mt-2">{g.title}</div>
                      <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {g.readingMinutes} min
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <div className="card p-4">
                <div className="font-bold text-sm mb-3 flex items-center gap-2">
                  <ListOrdered className="w-4 h-4" />
                  Sommaire
                </div>
                <nav>
                  <ol className="space-y-1.5 text-sm">
                    {guide.sections.map((s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="text-muted-foreground hover:text-primary transition-colors flex gap-2"
                        >
                          <span className="text-xs font-medium text-primary mt-0.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="line-clamp-2">{s.heading}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>

              <Link
                href="/devis"
                className="btn-primary w-full mt-3"
              >
                Devis gratuit
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
