import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guides & conseils travaux : prix, aides, démarches",
  description:
    "Tous nos guides pour réussir vos travaux : prix moyens, aides à la rénovation (MaPrimeRénov', CEE, Éco-PTZ), choisir un artisan, démarches administratives.",
  path: "/guides",
});

const GUIDES = [
  { slug: "prix-changement-chaudiere-2026", title: "Prix changement chaudière en 2026", category: "Prix" },
  { slug: "maprimerenov-2026-guide-complet", title: "MaPrimeRénov' 2026 : guide complet", category: "Aides" },
  { slug: "trouver-artisan-rge", title: "Comment trouver un artisan RGE ?", category: "Conseils" },
  { slug: "prix-renovation-salle-de-bain", title: "Prix d'une rénovation de salle de bain", category: "Prix" },
  { slug: "eviter-arnaque-serrurier", title: "Comment éviter les arnaques de serrurier", category: "Conseils" },
  { slug: "isolation-combles-prix-aides", title: "Isolation des combles : prix et aides", category: "Travaux" },
  { slug: "pompe-a-chaleur-prix-2026", title: "Pompe à chaleur : prix et rentabilité 2026", category: "Travaux" },
  { slug: "renovation-electrique-norme-nfc15100", title: "Rénovation électrique : norme NF C 15-100", category: "Travaux" },
  { slug: "debouchage-canalisation-prix", title: "Prix d'un débouchage de canalisation", category: "Prix" },
  { slug: "ravalement-facade-obligation", title: "Ravalement de façade : obligations légales", category: "Démarches" },
];

export default function GuidesPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Guides & conseils", url: "/guides" }]} />

      <header className="py-6">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Guides & conseils travaux
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Tous nos guides pratiques pour préparer, budgéter et réussir vos
          travaux : prix moyens, aides financières, démarches, choix de
          l'artisan.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="card p-5 hover:border-primary hover:shadow-md transition-all"
          >
            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium mb-2">
              {g.category}
            </span>
            <h2 className="font-bold text-lg">{g.title}</h2>
            <p className="text-sm text-primary mt-2">Lire le guide →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
