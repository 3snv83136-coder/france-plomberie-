import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Award, Search } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { TRADES } from "@/data/trades";
import { CITIES } from "@/data/cities";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/utils";

export const metadata = buildMetadata({
  title: `${SITE_NAME} — Trouvez un artisan qualifié près de chez vous en France`,
  description:
    "Annuaire des meilleurs artisans en France : plombier, électricien, chauffagiste, menuisier, peintre… Devis gratuits sous 24h, avis vérifiés, intervention rapide partout en France.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
        <div className="container py-12 md:py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-3xl mx-auto">
            Trouvez un artisan qualifié{" "}
            <span className="text-primary">près de chez vous</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8">
            Plombier, électricien, chauffagiste, menuisier… Comparez plus de
            120&nbsp;000 artisans vérifiés partout en France. Devis gratuits sous
            24h.
          </p>

          <div className="max-w-3xl mx-auto">
            <SearchBar size="lg" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" />
              SIRET vérifiés
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Award className="w-4 h-4 text-accent" />
              Artisans certifiés RGE
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" />
              Réponse en moins de 24h
            </span>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Tous les métiers de l'artisanat
        </h2>
        <p className="text-muted-foreground mb-6">
          Quel que soit votre projet, trouvez le bon professionnel.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {TRADES.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="card p-4 text-center hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="mb-2 mx-auto w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Dès {t.avgPrice.min}€
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 border-y">
        <div className="container py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Comment ça marche ?
          </h2>
          <p className="text-muted-foreground mb-8">
            Trouvez l'artisan idéal en 3 étapes simples.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: 1,
                t: "Décrivez votre besoin",
                d: "Renseignez votre métier et votre ville. Précisez votre projet en quelques mots.",
              },
              {
                n: 2,
                t: "Recevez jusqu'à 5 devis",
                d: "Les artisans vérifiés près de chez vous vous contactent sous 24h avec un devis détaillé gratuit.",
              },
              {
                n: 3,
                t: "Comparez et choisissez",
                d: "Consultez les avis, comparez les prix, sélectionnez l'artisan qui vous convient.",
              },
            ].map((s) => (
              <div key={s.n} className="card p-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-3">
                  {s.n}
                </div>
                <h3 className="font-semibold text-lg mb-1">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/devis" className="btn-primary h-11 px-6">
              Demander un devis gratuit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Trouvez un artisan dans votre ville
        </h2>
        <p className="text-muted-foreground mb-6">
          Découvrez nos artisans dans les plus grandes villes de France.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-sm">
          {CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/plombier/${c.slug}`}
              className="px-3 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              Artisans à <span className="font-medium">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Pourquoi nous faire confiance ?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { v: "120 000+", l: "Artisans référencés" },
            { v: "35 000", l: "Communes couvertes" },
            { v: "4,7/5", l: "Note moyenne (50k avis)" },
            { v: "24h", l: "Délai moyen de devis" },
          ].map((s) => (
            <div key={s.l} className="card p-6 text-center">
              <div className="text-3xl font-extrabold text-primary">{s.v}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
