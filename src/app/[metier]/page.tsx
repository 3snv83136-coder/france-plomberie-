import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { TRADES, getTradeBySlug } from "@/data/trades";
import { CITIES } from "@/data/cities";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { FAQ } from "@/components/FAQ";
import { SearchBar } from "@/components/SearchBar";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return TRADES.map((t) => ({ metier: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ metier: string }>;
}) {
  const { metier } = await params;
  const trade = getTradeBySlug(metier);
  if (!trade) return {};
  return buildMetadata({
    title: `${trade.name} en France : trouvez un pro qualifié près de chez vous`,
    description: `Trouvez un ${trade.name.toLowerCase()} qualifié partout en France. ${trade.shortDescription} Devis gratuits, avis vérifiés, intervention rapide.`,
    path: `/${trade.slug}`,
  });
}

export default async function TradePillarPage({
  params,
}: {
  params: Promise<{ metier: string }>;
}) {
  const { metier } = await params;
  const trade = getTradeBySlug(metier);
  if (!trade) notFound();

  const crumbs = [{ name: trade.plural, url: `/${trade.slug}` }];

  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(crumbs),
          ...(trade.faq.length > 0 ? [faqSchema(trade.faq)] : []),
        ]}
      />

      <div className="container">
        <Breadcrumbs items={crumbs} />

        <header className="py-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            {trade.name} : trouvez un professionnel partout en France
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl">
            {trade.description}
          </p>
        </header>

        <div className="mb-8">
          <SearchBar />
        </div>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">
            Trouvez un {trade.name.toLowerCase()} dans votre ville
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${trade.slug}/${city.slug}`}
                className="card p-4 hover:border-primary hover:shadow-md transition-all flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="font-semibold truncate">
                    {trade.name} à {city.name}
                  </div>
                  <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {city.department.name} · {city.population.toLocaleString("fr-FR")} hab.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        <section className="my-10 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Services proposés par un {trade.name.toLowerCase()}
            </h2>
            <ul className="space-y-2">
              {trade.commonServices.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6 bg-muted/30">
            <h2 className="text-xl font-bold mb-3">Tarif moyen</h2>
            <p className="text-3xl font-extrabold text-primary mb-1">
              {trade.avgPrice.min}€ – {trade.avgPrice.max}€
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Prix moyen par {trade.avgPrice.unit} en France métropolitaine.
            </p>
            <Link href="/devis" className="btn-primary w-full">
              Recevoir un devis gratuit
            </Link>
          </div>
        </section>

        <FAQ items={trade.faq} />

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Autres métiers</h2>
          <div className="flex flex-wrap gap-2">
            {TRADES.filter((t) => t.slug !== trade.slug).map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className="px-3 py-1.5 rounded-full border text-sm hover:border-primary hover:text-primary transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
