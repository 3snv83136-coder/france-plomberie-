import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, Phone, ShieldCheck, Star, Tv, Users, Zap } from "lucide-react";
import { TRADES, getTradeBySlug } from "@/data/trades";
import { CITIES, getCityBySlug } from "@/data/cities";
import { getDepartmentByCode } from "@/data/departments";
import { getRegionForDepartment } from "@/lib/geo";
import { getArtisansForCityAndTrade } from "@/lib/db/artisans";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { ArtisanCard } from "@/components/ArtisanCard";
import { CallbackButton } from "@/components/CallbackButton";
import { FAQ } from "@/components/FAQ";
import { SearchBar } from "@/components/SearchBar";
import { TrustBadges } from "@/components/TrustBadges";
import { tradeHeroImage } from "@/lib/hero-images";
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

  const artisans = await getArtisansForCityAndTrade(city.slug, trade.slug);
  const path = `/${trade.slug}/${city.slug}`;
  const avgRating =
    artisans.reduce((sum, a) => sum + a.rating, 0) / Math.max(artisans.length, 1);
  const emergencyCount = artisans.filter((a) => a.emergency).length;
  const rgeCount = artisans.filter((a) =>
    a.certifications.some((c) => c.includes("RGE")),
  ).length;

  const localFAQ = [...trade.faq, ...buildLocalFAQ(trade.name, city.name, city.department.name)];

  const dept = getDepartmentByCode(city.department.code);
  const region = getRegionForDepartment(city.department.code);
  const crumbs = [
    { name: trade.plural, url: `/${trade.slug}` },
    ...(region ? [{ name: region.name, url: `/${trade.slug}/region/${region.slug}` }] : []),
    ...(dept
      ? [{ name: `${dept.name} (${dept.code})`, url: `/${trade.slug}/departement/${dept.slug}` }]
      : []),
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

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary via-[hsl(var(--primary-dark))] to-[hsl(217_91%_25%)] text-primary-foreground">
        <Image
          src={tradeHeroImage(trade.slug)}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center opacity-20 mix-blend-luminosity"
        />
        <div className="container relative py-8 md:py-12">
          <Breadcrumbs items={crumbs} />

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10 items-center mt-2">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground shadow-sm">
                  <Zap className="w-3 h-3" /> URGENCE 24/7
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur">
                  <Tv className="w-3 h-3" /> VU À LA TÉLÉ
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-accent/20 text-white border border-accent/30">
                  <ShieldCheck className="w-3 h-3" /> SIRET VÉRIFIÉS
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-balance">
                {trade.name} à {city.name}
                <span className="text-white/70 font-bold"> ({city.department.code})</span>
              </h1>
              <p className="text-white/90 text-base md:text-lg max-w-2xl mb-4">
                Intervention en <strong className="text-secondary">30 minutes</strong> chez vous à {city.name}.
                Devis gratuit, sans engagement. Disponibles 7j/7, jour et nuit.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm mb-5">
                {avgRating > 0 ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <strong>{avgRating.toFixed(1).replace(".", ",")}/5</strong>
                    <span className="text-white/75">· {artisans.length} pros</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <strong>{artisans.length}</strong>
                    <span className="text-white/75">artisans vérifiés</span>
                  </span>
                )}
                {emergencyCount > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-secondary fill-secondary" />
                    <strong>{emergencyCount}</strong>
                    <span className="text-white/75">disponibles 24/7</span>
                  </span>
                )}
                {rgeCount > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <strong>{rgeCount}</strong>
                    <span className="text-white/75">certifiés RGE</span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <CallbackButton
                  context={{
                    trade: trade.slug,
                    citySlug: city.slug,
                    cityName: city.name,
                    postalCode: city.postalCode,
                  }}
                  variant="cta"
                  size="xl"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Être rappelé en 5 min
                </CallbackButton>
                <Link
                  href="/devis"
                  className="btn h-14 px-5 text-base bg-white/10 text-white hover:bg-white/15 backdrop-blur"
                >
                  Devis détaillé
                </Link>
              </div>

              <p className="mt-3 text-xs text-white/70 inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                100% gratuit · Sans engagement · Réponse sous 5 min
              </p>
            </div>

            <aside className="hidden lg:block">
              <div className="card bg-white text-foreground p-6 shadow-2xl rotate-1">
                <div className="flex items-start gap-3 mb-4">
                  <div className="inline-flex items-center justify-center bg-secondary text-secondary-foreground rounded-xl px-3 py-2.5 shrink-0">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider opacity-90">À partir de</div>
                      <div className="text-3xl font-extrabold leading-none">69 €</div>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-extrabold text-lg leading-tight">
                      Pas de surprise sur la facture
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tarif annoncé = tarif facturé. Devis signé avant intervention.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  {[
                    "Déplacement compris dans le devis",
                    "Aucun frais caché",
                    "Paiement après intervention",
                    "Garantie pièces et main d'œuvre",
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
      </section>

      <div className="container">
        <div className="my-6">
          <SearchBar />
        </div>

        <section className="my-8">
          <div className="flex items-end justify-between mb-4 gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                Top {Math.min(artisans.length, 10)} {trade.plural.toLowerCase()} à {city.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Classement basé sur les avis, l'ancienneté et les certifications.
              </p>
            </div>
            <CallbackButton
              context={{
                trade: trade.slug,
                citySlug: city.slug,
                cityName: city.name,
                postalCode: city.postalCode,
              }}
              variant="cta"
              size="md"
              className="hidden sm:inline-flex shrink-0"
            />
          </div>
          <div className="grid gap-4">
            {artisans.map((a, i) => (
              <ArtisanCard
                key={a.id}
                artisan={a}
                trade={trade}
                cityName={city.name}
                postalCode={city.postalCode}
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

        <section className="my-10 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground p-6 md:p-8 shadow-lg">
          <div className="md:flex items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-secondary text-secondary-foreground mb-2">
                <Zap className="w-3 h-3" /> URGENCE 24/7 · DÈS 69 €
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-balance">
                Un {trade.name.toLowerCase()} à {city.name}, maintenant ?
              </h2>
              <p className="text-white/85">
                Laissez votre numéro, un technicien vous rappelle sous 5 min pour
                un devis gratuit et sans engagement.
              </p>
            </div>
            <CallbackButton
              context={{
                trade: trade.slug,
                citySlug: city.slug,
                cityName: city.name,
                postalCode: city.postalCode,
              }}
              variant="cta"
              size="xl"
              className="shrink-0 mt-4 md:mt-0"
            >
              <Phone className="w-5 h-5 mr-2" />
              Être rappelé
            </CallbackButton>
          </div>
        </section>

        <div className="my-8">
          <TrustBadges variant="compact" />
        </div>
      </div>
    </>
  );
}
