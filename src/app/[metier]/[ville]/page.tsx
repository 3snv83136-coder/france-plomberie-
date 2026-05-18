import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, Phone, ShieldCheck, Star, Users } from "lucide-react";
import { TRADES, getTradeBySlug } from "@/data/trades";
import { CITIES, getCityBySlug } from "@/data/cities";
import { getArtisansForCityAndTrade } from "@/data/artisans";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { ArtisanCard } from "@/components/ArtisanCard";
import { FAQ } from "@/components/FAQ";
import { RatingStars } from "@/components/RatingStars";
import { SearchBar } from "@/components/SearchBar";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
  serviceSchema,
} from "@/lib/schema";
import { SITE_URL } from "@/lib/utils";

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  const params: { metier: string; ville: string }[] = [];
  for (const t of TRADES) {
    for (const c of CITIES) {
      params.push({ metier: t.slug, ville: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ metier: string; ville: string }>;
}) {
  const { metier, ville } = await params;
  const trade = getTradeBySlug(metier);
  const city = getCityBySlug(ville);
  if (!trade || !city) return {};

  const articleArtPro = trade.feminine ? "la " : "le ";
  const a = trade.name.toLowerCase();

  return buildMetadata({
    title: `${trade.name} ${city.name} (${city.department.code}) : top 10 des meilleurs ${trade.plural.toLowerCase()} 2026`,
    description: `Trouvez ${articleArtPro}${a} idéal à ${city.name}. ${trade.plural} vérifiés, avis clients certifiés, devis gratuit sous 24h. Tarif moyen : ${trade.avgPrice.min}–${trade.avgPrice.max}€${trade.emergency ? " · Urgence 24/7" : ""}.`,
    path: `/${trade.slug}/${city.slug}`,
  });
}

function buildLocalFAQ(tradeName: string, city: string, dept: string) {
  return [
    {
      q: `Combien coûte un ${tradeName.toLowerCase()} à ${city} ?`,
      a: `Le tarif moyen d'un ${tradeName.toLowerCase()} à ${city} (${dept}) est aligné sur la moyenne nationale, avec un forfait déplacement de 30 à 60 € et un taux horaire de 40 à 80 €. Les interventions d'urgence (nuit, week-end) sont majorées de 50 à 100 %. Demandez toujours un devis détaillé et signé avant intervention.`,
    },
    {
      q: `Comment trouver un ${tradeName.toLowerCase()} sérieux à ${city} ?`,
      a: `Privilégiez un artisan inscrit au Registre des Métiers, avec une assurance décennale en cours de validité. Sur Artisans Près De Chez Vous, tous les artisans affichés à ${city} sont vérifiés (SIRET, assurance, avis modérés). Comparez plusieurs devis avant de choisir.`,
    },
    {
      q: `Y a-t-il des ${tradeName.toLowerCase()}s disponibles en urgence à ${city} ?`,
      a: `Oui, plusieurs ${tradeName.toLowerCase()}s à ${city} interviennent 24h/24 et 7j/7. Le délai d'intervention en urgence est généralement de 30 à 60 minutes en zone urbaine. Identifiez les artisans marqués « Urgence 24/7 » dans la liste ci-dessus.`,
    },
    {
      q: `Quelles aides financières pour des travaux à ${city} ?`,
      a: `Selon vos travaux et vos revenus, vous pouvez prétendre à MaPrimeRénov', à l'Éco-PTZ, aux CEE (Certificats d'Économie d'Énergie) ou à la TVA réduite à 5,5 % ou 10 %. Pour bénéficier de ces aides, l'artisan doit être qualifié RGE. Filtrez sur ce critère pour ne voir que les artisans éligibles à ${city}.`,
    },
  ];
}

export default async function CityTradePage({
  params,
}: {
  params: Promise<{ metier: string; ville: string }>;
}) {
  const { metier, ville } = await params;
  const trade = getTradeBySlug(metier);
  const city = getCityBySlug(ville);
  if (!trade || !city) notFound();

  const artisans = getArtisansForCityAndTrade(city.slug, trade.slug);
  const path = `/${trade.slug}/${city.slug}`;
  const avgRating =
    artisans.reduce((sum, a) => sum + a.rating, 0) / Math.max(artisans.length, 1);
  const emergencyCount = artisans.filter((a) => a.emergency).length;
  const rgeCount = artisans.filter((a) =>
    a.certifications.some((c) => c.includes("RGE")),
  ).length;

  const localFAQ = [...trade.faq, ...buildLocalFAQ(trade.name, city.name, city.department.name)];

  const crumbs = [
    { name: trade.plural, url: `/${trade.slug}` },
    { name: city.name, url: path },
  ];

  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(crumbs),
          itemListSchema(artisans, city, trade),
          serviceSchema(trade, city),
          faqSchema(localFAQ),
        ]}
      />

      <div className="container">
        <Breadcrumbs items={crumbs} />

        <header className="py-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            {trade.name} à {city.name} ({city.department.code})
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl">
            Découvrez les <strong>{artisans.length} meilleurs {trade.plural.toLowerCase()}</strong> à {city.name} et alentours. Comparez les avis,
            tarifs et certifications pour choisir l'artisan idéal pour vos travaux.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
            <div className="inline-flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>
                <strong>{artisans.length}</strong> artisans à {city.name}
              </span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>
                <strong>{avgRating.toFixed(1).replace(".", ",")}/5</strong> de moyenne
              </span>
            </div>
            {emergencyCount > 0 && (
              <div className="inline-flex items-center gap-2">
                <span className="text-destructive">⚡</span>
                <span>
                  <strong>{emergencyCount}</strong> en urgence 24/7
                </span>
              </div>
            )}
            {rgeCount > 0 && (
              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>
                  <strong>{rgeCount}</strong> certifiés RGE
                </span>
              </div>
            )}
          </div>
        </header>

        <div className="mb-6">
          <SearchBar />
        </div>

        <section className="my-8">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl font-bold">
              Top {Math.min(artisans.length, 10)} des {trade.plural.toLowerCase()} à {city.name}
            </h2>
            <Link href="/devis" className="btn-primary h-10 hidden sm:inline-flex">
              <Phone className="w-4 h-4 mr-1.5" />
              Devis gratuit
            </Link>
          </div>
          <div className="grid gap-4">
            {artisans.map((a, i) => (
              <ArtisanCard
                key={a.id}
                artisan={a}
                trade={trade}
                citySlug={city.slug}
                rank={i}
              />
            ))}
          </div>
        </section>

        <section className="my-10 card p-6 bg-muted/30">
          <h2 className="text-2xl font-bold mb-4">
            Pourquoi choisir un {trade.name.toLowerCase()} à {city.name} ?
          </h2>
          <p className="leading-relaxed mb-4">
            {city.name} ({city.department.name}, {city.region}) compte plus de{" "}
            <strong>{city.population.toLocaleString("fr-FR")} habitants</strong> et un parc
            immobilier varié, du bâti ancien aux constructions récentes. Faire appel à un{" "}
            {trade.name.toLowerCase()} local à {city.name} présente plusieurs avantages :
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>Intervention rapide</strong> : la majorité des artisans interviennent
                en moins de 60 minutes en cas d'urgence à {city.name}.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>Connaissance du bâti local</strong> : un artisan basé à {city.name}{" "}
                connaît les spécificités du parc immobilier et les contraintes réglementaires
                de la ville.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>Tarifs maîtrisés</strong> : pas de frais de déplacement longue
                distance, devis souvent plus compétitifs.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>Suivi long terme</strong> : un artisan local reste joignable pour
                l'entretien et le service après-vente.
              </span>
            </li>
          </ul>
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">
            Interventions courantes d'un {trade.name.toLowerCase()} à {city.name}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {trade.commonServices.map((s) => (
              <div key={s} className="card p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold">{s}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Devis gratuit à {city.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="my-10 card p-6">
          <h2 className="text-2xl font-bold mb-3">
            Combien coûte un {trade.name.toLowerCase()} à {city.name} ?
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 my-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-xs text-muted-foreground mb-1">Petite intervention</div>
              <div className="text-2xl font-bold text-primary">
                {trade.avgPrice.min}€
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-primary/10 border-2 border-primary">
              <div className="text-xs text-muted-foreground mb-1">Tarif moyen</div>
              <div className="text-2xl font-bold text-primary">
                {Math.round((trade.avgPrice.min + trade.avgPrice.max) / 2)}€
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-xs text-muted-foreground mb-1">Travaux importants</div>
              <div className="text-2xl font-bold text-primary">
                {trade.avgPrice.max}€
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Prix indicatifs par {trade.avgPrice.unit} à {city.name}, hors fournitures. Pour
            connaître le prix exact de votre projet,{" "}
            <Link href="/devis" className="text-primary font-medium hover:underline">
              demandez un devis gratuit
            </Link>{" "}
            à plusieurs {trade.plural.toLowerCase()}.
          </p>
        </section>

        <FAQ items={localFAQ} title={`Questions fréquentes : ${trade.name.toLowerCase()} à ${city.name}`} />

        {city.nearby.length > 0 && (
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">
              {trade.plural} dans les communes proches de {city.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-sm">
              {city.nearby.map((slug) => {
                const c = CITIES.find((c) => c.slug === slug);
                if (c) {
                  return (
                    <Link
                      key={slug}
                      href={`/${trade.slug}/${slug}`}
                      className="card p-3 hover:border-primary hover:shadow-sm transition-all"
                    >
                      <div className="font-semibold text-sm">{c.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {trade.name}
                      </div>
                    </Link>
                  );
                }
                const pretty = slug
                  .split("-")
                  .map((w) => w[0]?.toUpperCase() + w.slice(1))
                  .join(" ");
                return (
                  <Link
                    key={slug}
                    href={`/${trade.slug}/${slug}`}
                    className="card p-3 hover:border-primary hover:shadow-sm transition-all"
                  >
                    <div className="font-semibold text-sm">{pretty}</div>
                    <div className="text-xs text-muted-foreground">{trade.name}</div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">
            Autres artisans à {city.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {TRADES.filter((t) => t.slug !== trade.slug).map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}/${city.slug}`}
                className="card p-3 hover:border-primary transition-colors"
              >
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {city.name}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="my-10 card p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="md:flex items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Besoin d'un {trade.name.toLowerCase()} à {city.name} ?
              </h2>
              <p className="text-muted-foreground">
                Recevez jusqu'à 5 devis gratuits sous 24h, sans engagement.
              </p>
            </div>
            <Link href="/devis" className="btn-primary h-12 px-6 shrink-0 mt-4 md:mt-0">
              <Phone className="w-4 h-4 mr-2" />
              Demander un devis gratuit
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
