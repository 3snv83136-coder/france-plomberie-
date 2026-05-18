import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { getTradeBySlug } from "@/data/trades";
import { getCityBySlug } from "@/data/cities";
import { getArtisanBySlug, getArtisansForCityAndTrade } from "@/data/artisans";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { RatingStars } from "@/components/RatingStars";
import { AvatarInitials } from "@/components/AvatarInitials";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";

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
  const artisan = getArtisanBySlug(city.slug, trade.slug, slug);
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
  const artisan = getArtisanBySlug(city.slug, trade.slug, slug);
  if (!artisan) notFound();

  const path = `/${trade.slug}/${city.slug}/${artisan.slug}`;
  const similar = getArtisansForCityAndTrade(city.slug, trade.slug)
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

      <div className="container">
        <Breadcrumbs items={crumbs} />

        <section className="card p-6 my-4">
          <div className="flex flex-col sm:flex-row gap-5">
            <AvatarInitials
              name={artisan.name}
              size={128}
              rounded="xl"
              className="mx-auto sm:mx-0"
            />

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
                    {artisan.name}
                  </h1>
                  <p className="text-muted-foreground">
                    {trade.name} à {city.name} ({city.postalCode})
                  </p>
                </div>
                {artisan.verified && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    Entreprise vérifiée
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-center gap-4 flex-wrap">
                <RatingStars
                  rating={artisan.rating}
                  reviewCount={artisan.reviewCount}
                  size="lg"
                />
                <span className="text-sm text-muted-foreground inline-flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Répond en ~{artisan.responseTimeMinutes} min
                </span>
                {artisan.emergency && (
                  <span className="text-sm font-medium text-destructive inline-flex items-center gap-1">
                    ⚡ Urgence 24h/24
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a href={`tel:${artisan.phone}`} className="btn-primary h-11">
                  <Phone className="w-4 h-4 mr-2" />
                  {artisan.phone.replace(/(\d{2})(?=\d)/g, "$1 ").trim()}
                </a>
                <Link href="/devis" className="btn-secondary h-11">
                  Demander un devis
                </Link>
                <a
                  href={`mailto:${artisan.email}`}
                  className="btn-outline h-11"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer un email
                </a>
              </div>
            </div>
          </div>
        </section>

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
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <a href={`tel:${artisan.phone}`} className="text-primary hover:underline">
                    {artisan.phone.replace(/(\d{2})(?=\d)/g, "$1 ").trim()}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <a href={`mailto:${artisan.email}`} className="text-primary hover:underline break-all">
                    {artisan.email}
                  </a>
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

            <section className="card p-5 bg-gradient-to-br from-primary/10 to-accent/10">
              <h2 className="text-base font-bold mb-2">Devis gratuit</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Décrivez votre projet en 2 minutes, recevez jusqu'à 5 devis.
              </p>
              <Link href="/devis" className="btn-primary w-full">
                Demander un devis
              </Link>
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
