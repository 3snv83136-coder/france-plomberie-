import { SearchBar } from "@/components/SearchBar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Recherche d'artisans",
  description: "Recherchez un artisan qualifié partout en France.",
  path: "/recherche",
  noindex: true,
});

export default function RecherchePage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Recherche", url: "/recherche" }]} />

      <header className="py-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Trouvez un artisan en quelques secondes
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Sélectionnez votre métier et indiquez votre ville pour découvrir les
          artisans qualifiés près de chez vous.
        </p>
      </header>

      <div className="max-w-3xl mx-auto my-6">
        <SearchBar size="lg" />
      </div>
    </div>
  );
}
