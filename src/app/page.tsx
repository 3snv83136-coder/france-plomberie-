import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Tv,
  Zap,
} from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { CallbackButton } from "@/components/CallbackButton";
import { TrustBadges } from "@/components/TrustBadges";
import { TRADES } from "@/data/trades";
import { CITIES } from "@/data/cities";
import { buildMetadata } from "@/lib/seo";
import { tradeHeroImage } from "@/lib/hero-images";
import { SITE_NAME } from "@/lib/utils";

export const metadata = buildMetadata({
  title: `${SITE_NAME} — Plombier, électricien, chauffagiste près de chez vous`,
  description:
    "Intervention en 30 min · Devis gratuit · Dès 69 €. Plombier, électricien, chauffagiste, serrurier… Vos artisans vérifiés partout en France, 24h/24.",
  path: "/",
});

const TESTIMONIALS = [
  {
    name: "Sophie L.",
    city: "Paris 15ᵉ",
    rating: 5,
    body: "Fuite à 22h un dimanche, plombier sur place en 35 min, problème réglé. Tarif annoncé respecté. Top !",
  },
  {
    name: "Marc D.",
    city: "Lyon",
    rating: 5,
    body: "Tableau électrique refait aux normes, devis clair, intervention propre. Je recommande sans hésiter.",
  },
  {
    name: "Camille R.",
    city: "Marseille",
    rating: 5,
    body: "Porte claquée à 23h, serrurier en 40 min, ouverture sans casse à 120 €. Vraiment professionnel.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary via-[hsl(var(--primary-dark))] to-[hsl(217_91%_22%)] text-primary-foreground">
        <Image
          src={tradeHeroImage("plombier")}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center opacity-15 mix-blend-luminosity"
        />
        <div className="container relative py-12 md:py-20">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground shadow">
                  <Zap className="w-3 h-3" /> URGENCE 24/7
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur">
                  <Tv className="w-3 h-3" /> VU À LA TÉLÉ
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-accent/20 border border-accent/30">
                  <ShieldCheck className="w-3 h-3" /> SIRET VÉRIFIÉS
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-balance leading-[1.05]">
                Un artisan qualifié <br className="hidden md:block" />
                <span className="text-secondary">chez vous en 30 min</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">
                Plombier, électricien, chauffagiste, serrurier… Intervention
                rapide partout en France. Devis gratuit, <strong>à partir de 69 €</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <CallbackButton variant="cta" size="xl" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Être rappelé en 5 min
                </CallbackButton>
                <Link
                  href="#metiers"
                  className="btn h-14 px-5 text-base bg-white/10 hover:bg-white/15 backdrop-blur text-white w-full sm:w-auto"
                >
                  Voir les métiers
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <strong className="text-white">4,8/5</strong> · 12 000 avis
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-accent" />
                  Intervention 24h/24 et 7j/7
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  Sans engagement
                </span>
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="card bg-white text-foreground p-6 shadow-2xl -rotate-1">
                <div className="flex items-start gap-3 mb-4">
                  <div className="inline-flex flex-col items-center justify-center bg-gradient-to-br from-secondary to-[hsl(var(--secondary-dark))] text-secondary-foreground rounded-xl px-4 py-3 shrink-0 shadow-md">
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-90">À partir de</div>
                    <div className="text-3xl font-extrabold leading-none mt-0.5">69 €</div>
                  </div>
                  <div>
                    <h2 className="font-extrabold text-lg leading-tight">
                      Pas de surprise sur la facture
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tarif annoncé = tarif facturé. Devis signé.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  {[
                    "Déplacement compris",
                    "Aucun frais caché",
                    "Paiement après intervention",
                    "Garantie pièces et main d'œuvre",
                    "Disponibles 24h/24 et 7j/7",
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
        <TrustBadges />
      </section>

      <section id="metiers" className="container py-12 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-balance">
            Tous les métiers du dépannage et de la rénovation
          </h2>
          <p className="text-muted-foreground">
            Quel que soit votre besoin, on a le bon professionnel près de chez vous.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {TRADES.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="card p-4 text-center hover:border-primary hover:shadow-md transition-all group relative"
            >
              {t.emergency && (
                <span className="absolute top-2 right-2 inline-flex items-center gap-0.5 text-[9px] font-bold bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">
                  <Zap className="w-2 h-2" /> 24/7
                </span>
              )}
              <div className="mb-2 mx-auto w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-[hsl(var(--primary-dark))] group-hover:text-primary-foreground transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm">{t.name}</div>
              <div className="text-xs text-secondary font-bold mt-0.5">
                Dès {t.avgPrice.min} €
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-muted/40 to-muted/20 border-y">
        <div className="container py-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-balance">
              Un rappel en 5 min, un technicien en 30 min
            </h2>
            <p className="text-muted-foreground">
              On ne vous prend pas en otage avec une ligne saturée. Vous laissez votre numéro, on vous rappelle.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                n: 1,
                t: "Laissez votre numéro",
                d: "30 secondes : votre téléphone, votre ville, votre métier. Aucun engagement, aucun email obligatoire.",
              },
              {
                n: 2,
                t: "On vous rappelle en 5 min",
                d: "Un technicien vous contacte pour comprendre votre besoin et organiser l'intervention au mieux.",
              },
              {
                n: 3,
                t: "Intervention 30 min plus tard",
                d: "Devis gratuit sur place, à partir de 69 €. Pas de surprise, paiement après réalisation.",
              },
            ].map((s) => (
              <div key={s.n} className="card p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground flex items-center justify-center font-extrabold text-lg mb-3 shadow-md">
                  {s.n}
                </div>
                <h3 className="font-bold text-lg mb-1">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <CallbackButton variant="cta" size="xl">
              <Phone className="w-5 h-5 mr-2" />
              Être rappelé maintenant — Dès 69 €
            </CallbackButton>
          </div>
        </div>
      </section>

      <section className="container py-14">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-balance">
            12 000 clients nous font confiance
          </h2>
          <div className="flex items-center justify-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <span className="font-extrabold text-lg">4,8/5</span>
            <span className="text-muted-foreground text-sm">· 12 000 avis vérifiés</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <article key={t.name} className="card p-5">
              <div className="flex mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-3">« {t.body} »</p>
              <div className="text-xs text-muted-foreground">
                <strong className="text-foreground">{t.name}</strong> · {t.city}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
          Trouvez un artisan dans votre ville
        </h2>
        <p className="text-muted-foreground mb-6">
          Plus de 350 villes en France couvertes.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-sm">
          {CITIES.slice(0, 30).map((c) => (
            <Link
              key={c.slug}
              href={`/plombier/${c.slug}`}
              className="px-3 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              Artisans à <span className="font-bold">{c.name}</span>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/metiers" className="text-primary font-semibold hover:underline text-sm">
            Voir toutes les villes →
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground">
        <div className="container py-14 text-center">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground mb-4 shadow">
            <Zap className="w-3 h-3" /> URGENCE 24/7 · DÈS 69 €
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-balance">
            Besoin d'un pro maintenant ?
          </h2>
          <p className="text-white/90 text-lg max-w-xl mx-auto mb-6">
            Laissez votre numéro, on vous rappelle sous 5 minutes pour organiser
            l'intervention.
          </p>
          <CallbackButton variant="cta" size="xl">
            <Phone className="w-5 h-5 mr-2" />
            Être rappelé maintenant
          </CallbackButton>
          <div className="mt-6">
            <TrustBadges variant="dark" />
          </div>
        </div>
      </section>
    </>
  );
}
