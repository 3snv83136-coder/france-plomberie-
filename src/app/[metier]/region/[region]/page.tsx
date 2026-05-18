import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Tv,
  Users,
  Zap,
} from "lucide-react";
import { TRADES, getTradeBySlug } from "@/data/trades";
import { REGIONS, getRegionBySlug } from "@/data/regions";
import {
  getCitiesByRegion,
  getDepartmentsByRegionSlug,
} from "@/lib/geo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { FAQ } from "@/components/FAQ";
import { SearchBar } from "@/components/SearchBar";
import { CallbackButton } from "@/components/CallbackButton";
import { TrustBadges } from "@/components/TrustBadges";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { tradeHeroImage } from "@/lib/hero-images";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  const params: { metier: string; region: string }[] = [];
  for (const t of TRADES) {
    for (const r of REGIONS) {
      params.push({ metier: t.slug, region: r.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ metier: string; region: string }>;
}) {
  const { metier, region: regionSlug } = await params;
  const trade = getTradeBySlug(metier);
  const region = getRegionBySlug(regionSlug);
  if (!trade || !region) return {};
  return buildMetadata({
    title: `${trade.name} en ${region.name} : trouvez un pro qualifié près de chez vous`,
    description: `Annuaire des meilleurs ${trade.plural.toLowerCase()} en ${region.name}. ${trade.plural} vérifiés sur ${region.departments.length} départements. Devis gratuits sous 24h, avis clients certifiés.`,
    path: `/${trade.slug}/region/${region.slug}`,
  });
}

function buildRegionFAQ(tradeName: string, region: { name: string; departments: string[] }) {
  return [
    {
      q: `Combien d'${tradeName.toLowerCase()}s sont référencés en ${region.name} ?`,
      a: `Plusieurs milliers de ${tradeName.toLowerCase()}s sont référencés sur Artisans Près De Chez Vous dans les ${region.departments.length} départements de la région ${region.name}. Tous sont vérifiés (SIRET, assurance décennale) avant publication.`,
    },
    {
      q: `Comment choisir un ${tradeName.toLowerCase()} en ${region.name} ?`,
      a: `Privilégiez un artisan local, c'est-à-dire situé dans votre ville ou département. Comparez au moins 3 devis détaillés, consultez les avis vérifiés et vérifiez les certifications (assurance décennale, qualification RGE si rénovation énergétique). Notre annuaire est filtrable par département et par ville en ${region.name}.`,
    },
    {
      q: `Les tarifs sont-ils différents selon les départements de ${region.name} ?`,
      a: `Oui, les tarifs varient sensiblement selon les départements et l'attractivité du marché local. En ${region.name}, comptez en moyenne 5 à 15 % d'écart entre les zones urbaines denses et les zones rurales. Demandez toujours plusieurs devis pour comparer.`,
    },
  ];
}

export default async function RegionTradePage({
  params,
}: {
  params: Promise<{ metier: string; region: string }>;
}) {
  const { metier, region: regionSlug } = await params;
  const trade = getTradeBySlug(metier);
  const region = getRegionBySlug(regionSlug);
  if (!trade || !region) notFound();

  const departments = getDepartmentsByRegionSlug(region.slug).sort(
    (a, b) => b.population - a.population,
  );
  const cities = getCitiesByRegion(region.slug).sort(
    (a, b) => b.population - a.population,
  );

  const path = `/${trade.slug}/region/${region.slug}`;
  const localFAQ = buildRegionFAQ(trade.name, region);

  const crumbs = [
    { name: trade.plural, url: `/${trade.slug}` },
    { name: region.name, url: path },
  ];

  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(crumbs),
          faqSchema(localFAQ),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: trade.name,
            areaServed: { "@type": "AdministrativeArea", name: region.name },
            provider: {
              "@type": "Organization",
              name: "Artisans Près De Chez Vous",
            },
          },
        ]}
      />

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary via-[hsl(var(--primary-dark))] to-[hsl(217_91%_22%)] text-primary-foreground">
        <Image
          src={tradeHeroImage(trade.slug)}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center opacity-15 mix-blend-luminosity"
        />
        <div className="container relative py-8 md:py-12">
          <Breadcrumbs items={crumbs} />

          <div className="mt-2">
            <div className="flex flex-wrap gap-2 mb-3">
              {trade.emergency && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground shadow-sm">
                  <Zap className="w-3 h-3" /> URGENCE 24/7
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur">
                <Tv className="w-3 h-3" /> VU À LA TÉLÉ
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-accent/20 text-white border border-accent/30">
                <ShieldCheck className="w-3 h-3" /> SIRET VÉRIFIÉS
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-balance">
              {trade.name} en {region.name}
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-3xl mb-5">
              Intervention en{" "}
              <strong className="text-secondary">30 minutes</strong> dans les{" "}
              <strong>{region.departments.length} départements</strong> de la
              région {region.name}. Devis gratuit dès {trade.avgPrice.min} €.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm mb-5">
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <strong>4,8/5</strong>
                <span className="text-white/75">· 12 000 avis</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-4 h-4 text-white/80" />
                <strong>{region.population.toLocaleString("fr-FR")}</strong>
                <span className="text-white/75">habitants</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-white/80" />
                <span className="text-white/85">
                  Préfecture <strong>{region.prefecture}</strong>
                </span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <CallbackButton
                context={{ trade: trade.slug }}
                variant="cta"
                size="xl"
              >
                <Phone className="w-5 h-5 mr-2" />
                Être rappelé en 5 min
              </CallbackButton>
              <Link
                href="#departements"
                className="btn h-14 px-5 text-base bg-white/10 text-white hover:bg-white/15 backdrop-blur"
              >
                Choisir mon département
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
      </section>

      <section className="container -mt-6 relative z-10 mb-6">
        <SearchBar size="lg" />
      </section>

      <section className="container py-4">
        <TrustBadges variant="compact" />
      </section>

      <div className="container">

        <section id="departements" className="my-10 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-4">
            {trade.plural} par département en {region.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {departments.map((d) => (
              <Link
                key={d.code}
                href={`/${trade.slug}/departement/${d.slug}`}
                className="card p-4 hover:border-primary hover:shadow-md transition-all flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="font-semibold truncate">
                    {trade.name} {d.name} ({d.code})
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Préfecture&nbsp;: {d.prefecture} ·{" "}
                    {d.population.toLocaleString("fr-FR")} hab.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {cities.length > 0 && (
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">
              {trade.plural} dans les principales villes de {region.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${trade.slug}/${c.slug}`}
                  className="card p-3 hover:border-primary hover:shadow-sm transition-all"
                >
                  <div className="font-semibold text-sm">{c.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {c.department.code} ·{" "}
                    {c.population.toLocaleString("fr-FR")} hab.
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="my-10 card p-6 bg-muted/30">
          <h2 className="text-2xl font-bold mb-4">
            Pourquoi faire appel à un {trade.name.toLowerCase()} en {region.name} ?
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>Couverture totale</strong> : {region.departments.length} départements, des centres urbains aux zones rurales.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>Connaissance du bâti régional</strong> : les artisans en {region.name} maîtrisent les spécificités locales (matériaux, contraintes climatiques, réglementations).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>Devis comparatifs</strong> : recevez gratuitement plusieurs propositions de pros locaux, sans engagement.
              </span>
            </li>
          </ul>
        </section>

        <FAQ
          items={localFAQ}
          title={`Questions fréquentes : ${trade.name.toLowerCase()} en ${region.name}`}
        />

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">
            Autres métiers en {region.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {TRADES.filter((t) => t.slug !== trade.slug).map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}/region/${region.slug}`}
                className="px-3 py-1.5 rounded-full border text-sm hover:border-primary hover:text-primary transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="my-10 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground p-6 md:p-8 shadow-lg">
          <div className="md:flex items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-secondary text-secondary-foreground mb-2">
                <Zap className="w-3 h-3" /> URGENCE 24/7 · DÈS {trade.avgPrice.min} €
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-balance">
                Un {trade.name.toLowerCase()} en {region.name}, maintenant ?
              </h2>
              <p className="text-white/85">
                Laissez votre numéro, un technicien vous rappelle sous 5 min pour
                un devis gratuit et sans engagement.
              </p>
            </div>
            <CallbackButton
              context={{ trade: trade.slug }}
              variant="cta"
              size="xl"
              className="shrink-0 mt-4 md:mt-0"
            >
              <Phone className="w-5 h-5 mr-2" />
              Être rappelé
            </CallbackButton>
          </div>
        </section>
      </div>
    </>
  );
}
