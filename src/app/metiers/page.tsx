import Link from "next/link";
import { TRADES } from "@/data/trades";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tous les métiers de l'artisanat — Annuaire complet",
  description:
    "Liste de tous les métiers de l'artisanat en France : plombier, électricien, chauffagiste, menuisier, peintre, maçon, serrurier, couvreur, paysagiste et plus encore.",
  path: "/metiers",
});

export default function MetiersPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Tous les métiers", url: "/metiers" }]} />

      <header className="py-6">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Tous les métiers de l'artisanat
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Quel que soit votre projet, du dépannage urgent à la rénovation
          complète, trouvez le bon professionnel parmi les corps de métier
          référencés sur Artisans Près De Chez Vous.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {TRADES.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            className="card p-5 hover:border-primary hover:shadow-md transition-all"
          >
            <h2 className="font-bold text-lg mb-1">{t.name}</h2>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {t.shortDescription}
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-primary font-medium">
                Dès {t.avgPrice.min}€
              </span>
              {t.emergency && (
                <span className="text-destructive font-medium">⚡ Urgence 24/7</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
