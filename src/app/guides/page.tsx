import Link from "next/link";
import { ArrowRight, Clock, RefreshCw } from "lucide-react";
import { GUIDES } from "@/data/guides";
import type { Guide } from "@/data/guides";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guides & conseils travaux 2026 : prix, aides, démarches",
  description:
    "Tous nos guides pour réussir vos travaux : prix moyens, aides à la rénovation (MaPrimeRénov', CEE, Éco-PTZ), choisir un artisan, démarches administratives.",
  path: "/guides",
});

const CATEGORIES: { name: Guide["category"]; description: string }[] = [
  { name: "Prix", description: "Tarifs moyens et fourchettes de coûts par type de travaux." },
  { name: "Aides", description: "MaPrimeRénov', CEE, Éco-PTZ : toutes les aides 2026." },
  { name: "Travaux", description: "Guides techniques pour planifier et réussir vos chantiers." },
  { name: "Conseils", description: "Astuces, bonnes pratiques et pièges à éviter." },
  { name: "Démarches", description: "Démarches administratives et formalités." },
];

export default function GuidesIndexPage() {
  const featured = GUIDES.slice(0, 3);

  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Guides & conseils", url: "/guides" }]} />

      <header className="py-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Guides & conseils travaux 2026
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Tous nos guides pratiques pour préparer, budgéter et réussir vos
          travaux&nbsp;: prix moyens, aides financières, démarches, choix de
          l'artisan, normes en vigueur.
        </p>
      </header>

      <section className="my-6">
        <h2 className="text-xl font-bold mb-3">À la une</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {featured.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="card p-5 hover:border-primary hover:shadow-md transition-all flex flex-col"
            >
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium self-start">
                {g.category}
              </span>
              <h3 className="font-bold text-lg mt-2 mb-2">{g.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3 flex-1">
                {g.excerpt}
              </p>
              <div className="text-xs text-muted-foreground flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {g.readingMinutes} min
                </span>
                <span className="inline-flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Maj{" "}
                  {new Date(g.updatedAt).toLocaleDateString("fr-FR", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {CATEGORIES.map((cat) => {
        const guides = GUIDES.filter((g) => g.category === cat.name);
        if (guides.length === 0) return null;
        return (
          <section key={cat.name} className="my-10">
            <div className="flex items-end justify-between mb-3">
              <div>
                <h2 className="text-2xl font-bold">{cat.name}</h2>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {guides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="card p-4 hover:border-primary hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold leading-tight">{g.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                    {g.excerpt}
                  </p>
                  <div className="text-xs text-primary mt-3 inline-flex items-center gap-1 font-medium">
                    Lire le guide
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
