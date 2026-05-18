import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Inscrire mon entreprise — Espace artisan",
  description:
    "Vous êtes artisan ? Inscrivez gratuitement votre entreprise sur Artisans Près De Chez Vous et recevez des demandes de devis qualifiés près de chez vous.",
  path: "/artisan/inscription",
});

const BENEFITS = [
  "Profil professionnel optimisé pour Google",
  "Demandes de devis qualifiées dans votre zone",
  "Avis clients vérifiés et modérés",
  "Statistiques de performance détaillées",
  "Sans engagement, sans abonnement caché",
];

export default function ArtisanInscriptionPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Inscription artisan", url: "/artisan/inscription" }]} />

      <div className="grid lg:grid-cols-2 gap-8 my-8 items-start">
        <div>
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium mb-3">
            ESPACE ARTISAN
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Développez votre activité avec des leads qualifiés
          </h1>
          <p className="text-muted-foreground mb-6">
            Rejoignez plus de 120 000 artisans qui trouvent leurs clients sur
            Artisans Près De Chez Vous. Inscription gratuite en 5 minutes.
          </p>

          <ul className="space-y-3 mb-6">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="card p-4 bg-muted/30 text-sm">
            <strong>Vérification obligatoire</strong> : votre numéro SIRET sera
            contrôlé via l'API Sirene de l'INSEE. Les entreprises non
            enregistrées ne peuvent pas figurer sur le site.
          </div>
        </div>

        <form className="card p-6 md:p-8 space-y-4" action="#" method="post">
          <h2 className="text-xl font-bold mb-2">Créer mon profil artisan</h2>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1.5">
              Nom de l'entreprise *
            </label>
            <input id="company" name="company" type="text" required className="input" />
          </div>

          <div>
            <label htmlFor="siret" className="block text-sm font-medium mb-1.5">
              Numéro SIRET *
            </label>
            <input
              id="siret"
              name="siret"
              type="text"
              required
              pattern="[0-9 ]{14,17}"
              maxLength={17}
              className="input"
              placeholder="14 chiffres"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium mb-1.5">
              Nom du contact *
            </label>
            <input id="contact" name="contact" type="text" required className="input" />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email pro *
              </label>
              <input id="email" name="email" type="email" required className="input" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                Téléphone *
              </label>
              <input id="phone" name="phone" type="tel" required className="input" />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full h-12 text-base">
            Créer mon profil gratuitement
          </button>
        </form>
      </div>
    </div>
  );
}
