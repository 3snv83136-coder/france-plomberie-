import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { TRADES, getTradeBySlug } from "@/data/trades";
import { REGIONS } from "@/data/regions";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

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
    title: `${trade.name} par région : trouvez un pro partout en France`,
    description: `Annuaire des ${trade.plural.toLowerCase()} par région française. ${trade.plural} qualifiés et vérifiés dans les 13 régions de France métropolitaine.`,
    path: `/${trade.slug}/region`,
  });
}

export default async function RegionIndexPage({
  params,
}: {
  params: Promise<{ metier: string }>;
}) {
  const { metier } = await params;
  const trade = getTradeBySlug(metier);
  if (!trade) notFound();

  const crumbs = [
    { name: trade.plural, url: `/${trade.slug}` },
    { name: "Par région", url: `/${trade.slug}/region` },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema(crumbs)} />
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <header className="py-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            {trade.name} par région
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Sélectionnez votre région pour trouver un {trade.name.toLowerCase()}{" "}
            qualifié près de chez vous, dans toute la France métropolitaine et en
            Corse.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
          {REGIONS.sort((a, b) => b.population - a.population).map((r) => (
            <Link
              key={r.slug}
              href={`/${trade.slug}/region/${r.slug}`}
              className="card p-4 hover:border-primary hover:shadow-md transition-all flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">
                  {r.departments.length} départements · {r.population.toLocaleString("fr-FR")} hab.
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
