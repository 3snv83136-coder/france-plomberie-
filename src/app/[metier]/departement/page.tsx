import Link from "next/link";
import { notFound } from "next/navigation";
import { TRADES, getTradeBySlug } from "@/data/trades";
import { DEPARTMENTS } from "@/data/departments";
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
    title: `${trade.name} par département : 96 départements en France`,
    description: `Annuaire complet des ${trade.plural.toLowerCase()} par département. Trouvez un pro vérifié dans les 96 départements de France métropolitaine et en Corse.`,
    path: `/${trade.slug}/departement`,
  });
}

export default async function DepartmentIndexPage({
  params,
}: {
  params: Promise<{ metier: string }>;
}) {
  const { metier } = await params;
  const trade = getTradeBySlug(metier);
  if (!trade) notFound();

  const crumbs = [
    { name: trade.plural, url: `/${trade.slug}` },
    { name: "Par département", url: `/${trade.slug}/departement` },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema(crumbs)} />
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <header className="py-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            {trade.name} par département en France
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Sélectionnez votre département pour découvrir les{" "}
            {trade.plural.toLowerCase()} qualifiés et vérifiés près de chez vous.
          </p>
        </header>

        {REGIONS.map((region) => {
          const deps = DEPARTMENTS.filter((d) => d.region === region.slug).sort(
            (a, b) => a.code.localeCompare(b.code),
          );
          if (deps.length === 0) return null;
          return (
            <section key={region.slug} className="my-8">
              <h2 className="text-xl font-bold mb-3">
                <Link
                  href={`/${trade.slug}/region/${region.slug}`}
                  className="hover:text-primary"
                >
                  {region.name}
                </Link>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                {deps.map((d) => (
                  <Link
                    key={d.code}
                    href={`/${trade.slug}/departement/${d.slug}`}
                    className="px-3 py-2 rounded-lg border hover:border-primary hover:text-primary transition-colors"
                  >
                    <span className="font-medium">{d.code}</span> · {d.name}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
