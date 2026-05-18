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
import { DEPARTMENTS, getDepartmentBySlug } from "@/data/departments";
import { getRegionBySlug } from "@/data/regions";
import {
  getCitiesByDepartment,
  getNeighboringDepartments,
} from "@/lib/geo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { FAQ } from "@/components/FAQ";
import { SearchBar } from "@/components/SearchBar";
import { CallbackButton } from "@/components/CallbackButton";
import { TrustBadges } from "@/components/TrustBadges";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { tradeHeroImage } from "@/lib/hero-images";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  const params: { metier: string; departement: string }[] = [];
  for (const t of TRADES) {
    for (const d of DEPARTMENTS) {
      params.push({ metier: t.slug, departement: d.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ metier: string; departement: string }>;
}) {
  const { metier, departement: deptSlug } = await params;
  const trade = getTradeBySlug(metier);
  const dept = getDepartmentBySlug(deptSlug);
  if (!trade || !dept) return {};
  return buildMetadata({
    title: `${trade.name} ${dept.name} (${dept.code}) : top des meilleurs ${trade.plural.toLowerCase()}`,
    description: `Trouvez un ${trade.name.toLowerCase()} qualifié dans le ${dept.name} (${dept.code}). ${trade.plural} vérifiés, devis gratuits sous 24h, avis clients certifiés${trade.emergency ? " · Urgence 24/7" : ""}.`,
    path: `/${trade.slug}/departement/${dept.slug}`,
  });
}

function buildDeptFAQ(tradeName: string, dept: { name: string; code: string; prefecture: string }) {
  return [
    {
      q: `Quel est le tarif moyen d'un ${tradeName.toLowerCase()} dans le ${dept.name} ?`,
      a: `Les tarifs d'un ${tradeName.toLowerCase()} dans le ${dept.name} (${dept.code}) sont alignés sur la moyenne nationale, avec parfois une légère variation selon les zones urbaines ou rurales. Forfait de déplacement de 30 à 60 € et taux horaire de 40 à 80 € en moyenne. Demandez plusieurs devis pour comparer.`,
    },
    {
      q: `Comment trouver un ${tradeName.toLowerCase()} de confiance dans le ${dept.name} ?`,
      a: `Sur Artisans Près De Chez Vous, tous les ${tradeName.toLowerCase()}s du département ${dept.code} sont vérifiés (SIRET, assurance décennale). Filtrez par ville, comparez les avis clients certifiés et demandez plusieurs devis détaillés avant de choisir.`,
    },
    {
      q: `Y a-t-il des ${tradeName.toLowerCase()}s disponibles en urgence dans le ${dept.name} ?`,
      a: `Oui, dans tout le département ${dept.code}, plusieurs artisans interviennent 24h/24 et 7j/7, particulièrement à ${dept.prefecture} et dans les villes principales. Délai d'intervention moyen en urgence&nbsp;: 30 à 60 minutes en zone urbaine, jusqu'à 90 minutes en zone rurale.`,
    },
  ];
}

export default async function DepartmentTradePage({
  params,
}: {
  params: Promise<{ metier: string; departement: string }>;
}) {
  const { metier, departement: deptSlug } = await params;
  const trade = getTradeBySlug(metier);
  const dept = getDepartmentBySlug(deptSlug);
  if (!trade || !dept) notFound();

  const region = getRegionBySlug(dept.region);
  const cities = getCitiesByDepartment(dept.code).sort(
    (a, b) => b.population - a.population,
  );
  const neighbors = getNeighboringDepartments(dept.code);
  const path = `/${trade.slug}/departement/${dept.slug}`;
  const localFAQ = buildDeptFAQ(trade.name, dept);

  const crumbs = [
    { name: trade.plural, url: `/${trade.slug}` },
    ...(region ? [{ name: region.name, url: `/${trade.slug}/region/${region.slug}` }] : []),
    { name: `${dept.name} (${dept.code})`, url: path },
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
            areaServed: { "@type": "AdministrativeArea", name: dept.name },
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
              {trade.name} {dept.name}
              <span className="text-white/70 font-bold"> ({dept.code})</span>
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-3xl mb-5">
              Intervention dans tout le {dept.name} en{" "}
              <strong className="text-secondary">30 minutes</strong>. Devis gratuit
              à partir de {trade.avgPrice.min} €. Pros vérifiés, 24h/24.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm mb-5">
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <strong>4,8/5</strong>
                <span className="text-white/75">· 12 000 avis</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-4 h-4 text-white/80" />
                <strong>{dept.population.toLocaleString("fr-FR")}</strong>
                <span className="text-white/75">habitants couverts</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-white/80" />
                <span className="text-white/85">
                  Préfecture <strong>{dept.prefecture}</strong>
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
              {region && (
                <Link
                  href={`/${trade.slug}/region/${region.slug}`}
                  className="btn h-14 px-5 text-base bg-white/10 text-white hover:bg-white/15 backdrop-blur"
                >
                  {trade.name} en {region.name}
                </Link>
              )}
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

        {cities.length > 0 ? (
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">
              {trade.plural} par ville dans le {dept.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${trade.slug}/${c.slug}`}
                  className="card p-4 hover:border-primary hover:shadow-md transition-all flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-semibold truncate">
                      {trade.name} à {c.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {c.postalCode} · {c.population.toLocaleString("fr-FR")} hab.
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="my-10 card p-6 bg-muted/30">
            <h2 className="text-xl font-bold mb-2">
              {trade.plural} dans tout le {dept.name}
            </h2>
            <p className="text-muted-foreground">
              Décrivez votre projet pour recevoir gratuitement plusieurs devis
              de {trade.plural.toLowerCase()} qualifiés dans le département {dept.code}.
            </p>
            <Link href="/devis" className="btn-primary mt-4">
              Demander un devis gratuit
            </Link>
          </section>
        )}

        <section className="my-10 card p-6 bg-muted/30">
          <h2 className="text-2xl font-bold mb-4">
            Faire appel à un {trade.name.toLowerCase()} dans le {dept.name}
          </h2>
          <p className="leading-relaxed mb-4">
            Le département du <strong>{dept.name} ({dept.code})</strong>, dont la
            préfecture est <strong>{dept.prefecture}</strong>, compte plus de{" "}
            <strong>{dept.population.toLocaleString("fr-FR")} habitants</strong>
            {region && <> et fait partie de la région <strong>{region.name}</strong></>}.
            Choisir un artisan local dans le {dept.code} vous garantit&nbsp;:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>Intervention rapide</strong> : un artisan basé dans votre département se déplace plus vite et avec des frais réduits.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>Connaissance du parc immobilier local</strong> : bâti ancien, normes locales, contraintes climatiques.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>Suivi facile</strong> : entretien, garantie, SAV avec un pro joignable et proche.
              </span>
            </li>
          </ul>
        </section>

        <FAQ
          items={localFAQ}
          title={`Questions fréquentes : ${trade.name.toLowerCase()} dans le ${dept.name}`}
        />

        {neighbors.length > 0 && (
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">
              {trade.plural} dans les départements voisins
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {neighbors.map((d) => (
                <Link
                  key={d.code}
                  href={`/${trade.slug}/departement/${d.slug}`}
                  className="card p-3 hover:border-primary hover:shadow-sm transition-all"
                >
                  <div className="font-semibold text-sm">
                    {d.name} ({d.code})
                  </div>
                  <div className="text-xs text-muted-foreground">{trade.name}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">
            Autres métiers dans le {dept.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {TRADES.filter((t) => t.slug !== trade.slug).map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}/departement/${dept.slug}`}
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
                Un {trade.name.toLowerCase()} dans le {dept.name}, maintenant ?
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
