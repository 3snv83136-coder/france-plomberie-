import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Tv,
  Zap,
} from "lucide-react";
import { getTradeBySlug } from "@/data/trades";
import { getCityBySlug } from "@/data/cities";
import { getArtisanBySlug, getArtisansForCityAndTrade } from "@/lib/db/artisans";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { RatingStars } from "@/components/RatingStars";
import { AvatarInitials } from "@/components/AvatarInitials";
import { CallbackButton } from "@/components/CallbackButton";
import { TrustBadges } from "@/components/TrustBadges";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { tradeHeroImage } from "@/lib/hero-images";

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ metier: string; ville: string; slug: string }>;
}) {
  const { metier, ville, slug } = await params;
  const trade = getTradeBySlug(metier);
  const city = getCityBySlug(ville);
  if (!trade || !city) return {};
  const artisan = await getArtisanBySlug(city.slug, trade.slug, slug);
  if (!artisan) return {};

  return buildMetadata({
    title: `${artisan.name} — ${trade.name} à ${city.name} · Avis et contact`,
    description: `${artisan.name}, ${trade.name.toLowerCase()} à ${city.name} (${city.postalCode}). Note ${artisan.rating}/5 sur ${artisan.reviewCount} avis. ${artisan.description.slice(0, 120)}`,
    path: `/${trade.slug}/${city.slug}/${artisan.slug}`,
  });
}

export default async function ArtisanProfilePage({
  params,
}: {
  params: Promise<{ metier: string; ville: string; slug: string }>;
}) {
  const { metier, ville, slug } = await params;
  const trade = getTradeBySlug(metier);
  const city = getCityBySlug(ville);
  if (!trade || !city) notFound();
  const artisan = await getArtisanBySlug(city.slug, trade.slug, slug);
  if (!artisan) notFound();

  const path = `/${trade.slug}/${city.slug}/${artisan.slug}`;
  const similar = (await getArtisansForCityAndTrade(city.slug, trade.slug))
    .filter((a) => a.id !== artisan.id)
    .slice(0, 4);

  const crumbs = [
    { name: trade.plural, url: `/${trade.slug}` },
    { name: city.name, url: `/${trade.slug}/${city.slug}` },
    { name: artisan.name, url: path },
  ];

  return (
    <>
      <StructuredData
        data={[breadcrumbSchema(crumbs), localBusinessSchema(artisan, city, trade, path)]}
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
        <div className="container relative py-6 md:py-10">
          <Breadcrumbs items={crumbs} />

          <div className="flex flex-col sm:flex-row gap-5 items-start mt-2">
            <div className="relative shrink-0 mx-auto sm:mx-0">
              <AvatarInitials
                name={artisan.name}
                size={128}
                rounded="xl"
                className="ring-4 ring-white/30 shadow-2xl"
              />
              {artisan.verified && (
                <span className="absolute -bottom-2 -right-2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent text-white ring-4 ring-[hsl(var(--primary-dark))] shadow-lg">
                  <ShieldCheck className="w-5 h-5" />
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                {artisan.emergency && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground shadow-sm">
                    <Zap className="w-3 h-3" /> URGENCE 24/7
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur">
                  <Tv className="w-3 h-3" /> VU À LA TÉLÉ
                </span>
                {artisan.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-accent/20 border border-accent/30">
                    <ShieldCheck className="w-3 h-3" /> SIRET VÉRIFIÉ
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold leading-tight text-balance">
                {artisan.name}
              </h1>
              <p className="text-white/80 text-base md:text-lg mt-1">
                {trade.name} à <Link href={`/${trade.slug}/${city.slug}`} className="text-white hover:underline font-semibold">{city.name}</Link> ({city.postalCode})
              </p>

              <div className="mt-3 flex items-center gap-4 flex-wrap text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i <= Math.round(artisan.rating) ? "text-amber-400 fill-amber-400" : "text-white/30"}`}
                      />
                    ))}
                  </div>
                  <strong>{artisan.rating.toFixed(1).replace(".", ",")}/5</strong>
                  <span className="text-white/75">· {artisan.reviewCount.toLocaleString("fr-FR")} avis</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-white/80" />
                  <span className="text-white/85">
                    Répond en ~{artisan.responseTimeMinutes} min
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="text-white/85">
                    {artisan.yearsExperience} ans d'expérience
                  </span>
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <CallbackButton
                  context={{
                    trade: trade.slug,
                    citySlug: city.slug,
                    cityName: city.name,
                    postalCode: city.postalCode,
                    artisanName: artisan.name,
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
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
      </section>

      <div className="container">
        <div className="my-6">
          <TrustBadges variant="compact" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 my-6">
          <div className="md:col-span-2 space-y-6">
            <section className="card p-6">
              <h2 className="text-xl font-bold mb-3">À propos</h2>
              <p className="text-muted-foreground leading-relaxed">
                {artisan.description}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="card p-3">
                  <div className="text-xs text-muted-foreground">Expérience</div>
                  <div className="font-bold text-lg">{artisan.yearsExperience} ans</div>
                </div>
                <div className="card p-3">
                  <div className="text-xs text-muted-foreground">Avis clients</div>
                  <div className="font-bold text-lg">{artisan.reviewCount.toLocaleString("fr-FR")}</div>
                </div>
              </div>
            </section>

            <section className="card p-6">
              <h2 className="text-xl font-bold mb-3">Services proposés</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {trade.commonServices.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            {artisan.certifications.length > 0 && (
              <section className="card p-6">
                <h2 className="text-xl font-bold mb-3">Certifications & qualifications</h2>
                <div className="flex flex-wrap gap-2">
                  {artisan.certifications.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {c}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section className="card p-6">
              <h2 className="text-xl font-bold mb-3">
                Avis clients ({artisan.reviewCount.toLocaleString("fr-FR")})
              </h2>
              <div className="space-y-4">
                {artisan.reviews.map((r, i) => (
                  <div key={i} className="border-b pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{r.author}</span>
                      <RatingStars rating={r.rating} size="sm" showValue={false} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{r.body}</p>
                    <time className="text-xs text-muted-foreground" dateTime={r.date}>
                      {new Date(r.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <section className="card p-5">
              <h2 className="text-base font-bold mb-3">Coordonnées</h2>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{artisan.address}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>
                    {artisan.emergency
                      ? "Urgence 24h/24 et 7j/7"
                      : "Lun-Ven 8h-18h"}
                  </span>
                </li>
              </ul>
            </section>

            <section className="card p-5 bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground">
              <div className="inline-flex items-center gap-1 text-xs font-bold bg-secondary text-secondary-foreground px-2 py-1 rounded mb-2">
                <Zap className="w-3 h-3" /> DÈS 69 €
              </div>
              <h2 className="text-lg font-extrabold mb-1">
                Devis gratuit en 5 min
              </h2>
              <p className="text-sm text-white/85 mb-3">
                Laissez votre numéro, un technicien vous rappelle pour fixer
                rendez-vous et établir un devis sans engagement.
              </p>
              <CallbackButton
                context={{
                  trade: trade.slug,
                  citySlug: city.slug,
                  cityName: city.name,
                  postalCode: city.postalCode,
                  artisanName: artisan.name,
                }}
                variant="cta"
                size="lg"
                className="w-full"
              >
                <Phone className="w-4 h-4 mr-2" />
                Être rappelé
              </CallbackButton>
            </section>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="my-8">
            <h2 className="text-2xl font-bold mb-4">
              Autres {trade.plural.toLowerCase()} à {city.name}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {similar.map((a) => (
                <Link
                  key={a.id}
                  href={`/${trade.slug}/${city.slug}/${a.slug}`}
                  className="card p-4 hover:border-primary transition-colors"
                >
                  <div className="font-semibold">{a.name}</div>
                  <RatingStars rating={a.rating} reviewCount={a.reviewCount} size="sm" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
