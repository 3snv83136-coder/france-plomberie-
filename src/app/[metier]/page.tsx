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
  Zap,
} from "lucide-react";
import { TRADES, getTradeBySlug } from "@/data/trades";
import { CITIES } from "@/data/cities";
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
    title: `${trade.name} en France : intervention 24/7 dès ${trade.avgPrice.min} €`,
    description: `${trade.shortDescription} Intervention en 30 min partout en France. Devis gratuit, à partir de ${trade.avgPrice.min} €. SIRET vérifiés, certifiés RGE.`,
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
  const topCities = CITIES.slice(0, 24);

  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(crumbs),
          ...(trade.faq.length > 0 ? [faqSchema(trade.faq)] : []),
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

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10 items-center mt-2">
            <div>
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
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-balance leading-[1.05]">
                {trade.name} en France :{" "}
                <span className="text-secondary">intervention 30 min</span>
              </h1>
              <p className="text-white/90 text-base md:text-lg max-w-2xl mb-5">
                {trade.shortDescription} Devis gratuit à partir de{" "}
                <strong className="text-secondary">{trade.avgPrice.min} €</strong>.
                Pros vérifiés, partout en France.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm mb-5">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <strong>4,8/5</strong>
                  <span className="text-white/75">· 12 000 avis</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span className="text-white/85">SIRET vérifiés</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="text-white/85">Garantie incluse</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <CallbackButton context={{ trade: trade.slug }} variant="cta" size="xl">
                  <Phone className="w-5 h-5 mr-2" />
                  Être rappelé en 5 min
                </CallbackButton>
                <Link
                  href="#villes"
                  className="btn h-14 px-5 text-base bg-white/10 text-white hover:bg-white/15 backdrop-blur"
                >
                  Choisir ma ville
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
                  <div className="inline-flex flex-col items-center justify-center bg-gradient-to-br from-secondary to-[hsl(var(--secondary-dark))] text-secondary-foreground rounded-xl px-4 py-3 shrink-0 shadow-md">
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-90">
                      À partir de
                    </div>
                    <div className="text-3xl font-extrabold leading-none mt-0.5">
                      {trade.avgPrice.min} €
                    </div>
                  </div>
                  <div>
                    <h2 className="font-extrabold text-lg leading-tight">
                      Tarif annoncé = tarif facturé
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Devis signé avant intervention. Aucune surprise.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  {[
                    "Déplacement compris",
                    "Aucun frais caché",
                    "Paiement après intervention",
                    "Garantie pièces et main d'œuvre",
                    trade.emergency ? "Disponibles 24h/24 et 7j/7" : "Lun-Sam, 8h-20h",
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

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
      </section>

      <section className="container -mt-6 relative z-10 mb-10">
        <SearchBar size="lg" />
      </section>

      <section className="container py-6">
        <TrustBadges variant="compact" />
      </section>

      <section id="villes" className="container py-10 scroll-mt-20">
        <div className="flex items-end justify-between mb-5 gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
              {trade.name} dans votre ville
            </h2>
            <p className="text-sm text-muted-foreground">
              Plus de 350 villes en France couvertes.
            </p>
          </div>
          <CallbackButton
            context={{ trade: trade.slug }}
            variant="cta"
            size="md"
            className="hidden sm:inline-flex shrink-0"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${trade.slug}/${city.slug}`}
              className="card p-4 hover:border-primary hover:shadow-md transition-all flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="font-bold truncate">
                  {trade.name} à {city.name}
                </div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {city.department.code} ·{" "}
                  {city.population.toLocaleString("fr-FR")} hab.
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </Link>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/${trade.slug}/departement`}
            className="text-primary font-semibold hover:underline text-sm inline-flex items-center gap-1"
          >
            Toutes les villes par département
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-muted-foreground">·</span>
          <Link
            href={`/${trade.slug}/region`}
            className="text-primary font-semibold hover:underline text-sm inline-flex items-center gap-1"
          >
            Par région
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-4">
              Interventions courantes
            </h2>
            <ul className="space-y-2.5">
              {trade.commonServices.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6 bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground relative overflow-hidden">
            <div className="inline-flex items-center gap-1 text-xs font-bold bg-secondary text-secondary-foreground px-2 py-1 rounded mb-3 shadow-sm">
              <Zap className="w-3 h-3" /> DÈS {trade.avgPrice.min} €
            </div>
            <h2 className="text-xl font-extrabold mb-2">
              Combien coûte un {trade.name.toLowerCase()} ?
            </h2>
            <div className="text-4xl md:text-5xl font-extrabold mb-1">
              {trade.avgPrice.min} – {trade.avgPrice.max} €
            </div>
            <p className="text-sm text-white/85 mb-4">
              Prix moyen par {trade.avgPrice.unit} en France. Devis gratuit, pas de surprise.
            </p>
            <CallbackButton
              context={{ trade: trade.slug }}
              variant="cta"
              size="lg"
              className="w-full"
            >
              <Phone className="w-4 h-4 mr-2" />
              Recevoir mon devis
            </CallbackButton>
          </div>
        </div>
      </section>

      <FAQ items={trade.faq} />

      <section className="container py-10">
        <h2 className="text-xl font-bold mb-3">Autres métiers</h2>
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

      <section className="bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground">
        <div className="container py-12 text-center">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground mb-4 shadow">
            <Zap className="w-3 h-3" /> URGENCE 24/7 · DÈS {trade.avgPrice.min} €
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-balance">
            Besoin d'un {trade.name.toLowerCase()} maintenant ?
          </h2>
          <p className="text-white/90 text-lg max-w-xl mx-auto mb-6">
            Laissez votre numéro, on vous rappelle sous 5 min pour organiser
            l'intervention.
          </p>
          <CallbackButton context={{ trade: trade.slug }} variant="cta" size="xl">
            <Phone className="w-5 h-5 mr-2" />
            Être rappelé maintenant
          </CallbackButton>
        </div>
      </section>
    </>
  );
}
