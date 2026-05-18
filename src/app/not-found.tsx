import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="text-3xl md:text-5xl font-extrabold mt-2 mb-4">
        Page introuvable
      </h1>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        La page que vous cherchez n'existe pas ou a été déplacée. Recherchez
        plutôt un artisan dans votre ville :
      </p>
      <div className="max-w-2xl mx-auto mb-6">
        <SearchBar />
      </div>
      <Link href="/" className="btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  );
}
