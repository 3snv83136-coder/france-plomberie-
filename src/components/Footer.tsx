import Link from "next/link";
import { CITIES } from "@/data/cities";
import { TRADES } from "@/data/trades";
import { SITE_NAME } from "@/lib/utils";

export function Footer() {
  const topCities = CITIES.slice(0, 12);
  const topTrades = TRADES.slice(0, 12);

  return (
    <footer className="mt-16 border-t bg-muted/30">
      <div className="container py-12 grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="font-bold text-base mb-3">{SITE_NAME}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Trouvez un artisan qualifié près de chez vous partout en France.
            Devis gratuits, avis vérifiés, intervention rapide.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3">Métiers</h4>
          <ul className="space-y-1.5 text-sm">
            {topTrades.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.plural}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3">Villes principales</h4>
          <ul className="space-y-1.5 text-sm">
            {topCities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/plombier/${c.slug}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Artisans à {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-3">Informations</h4>
          <ul className="space-y-1.5 text-sm">
            <li>
              <Link href="/guides" className="text-muted-foreground hover:text-foreground">
                Guides & conseils
              </Link>
            </li>
            <li>
              <Link href="/devis" className="text-muted-foreground hover:text-foreground">
                Demander un devis
              </Link>
            </li>
            <li>
              <Link href="/artisan/inscription" className="text-muted-foreground hover:text-foreground">
                Inscrire mon entreprise
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="text-muted-foreground hover:text-foreground">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" className="text-muted-foreground hover:text-foreground">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="text-muted-foreground hover:text-foreground">
                Confidentialité (RGPD)
              </Link>
            </li>
            <li>
              <Link href="/cgu" className="text-muted-foreground hover:text-foreground">
                CGU
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.</p>
          <p>Annuaire d'artisans qualifiés partout en France · SIRET vérifiés · Avis modérés</p>
        </div>
      </div>
    </footer>
  );
}
