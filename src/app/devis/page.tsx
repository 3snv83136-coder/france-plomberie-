import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { TRADES } from "@/data/trades";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Devis gratuit : recevez 5 propositions d'artisans en 24h",
  description:
    "Décrivez votre projet en 2 minutes et recevez gratuitement jusqu'à 5 devis d'artisans qualifiés près de chez vous. Sans engagement, sans frais cachés.",
  path: "/devis",
});

export default function DevisPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Demander un devis", url: "/devis" }]} />

      <header className="py-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Recevez jusqu'à 5 devis gratuits sous 24h
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Décrivez votre projet en 2 minutes. Nos artisans qualifiés vous
          contactent rapidement avec un devis détaillé et personnalisé.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-8 text-sm">
        <div className="card p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
          <span>100% gratuit, sans engagement</span>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
          <span>Artisans vérifiés SIRET</span>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-accent shrink-0" />
          <span>Réponse en moins de 24h</span>
        </div>
      </div>

      <form
        className="card p-6 md:p-8 max-w-3xl mx-auto space-y-5"
        action="#"
        method="post"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="trade" className="block text-sm font-medium mb-1.5">
              Métier recherché *
            </label>
            <select id="trade" name="trade" required className="input">
              <option value="">Sélectionnez un métier</option>
              {TRADES.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium mb-1.5">
              Code postal *
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{5}"
              maxLength={5}
              required
              className="input"
              placeholder="75001"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1.5">
            Décrivez votre projet *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="input min-h-[100px] py-2"
            placeholder="Ex : Je souhaite remplacer mon chauffe-eau électrique de 200 L par un nouveau modèle. Salle de bain au 1er étage…"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">
              Votre nom *
            </label>
            <input id="name" name="name" type="text" required className="input" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
              Téléphone *
            </label>
            <input id="phone" name="phone" type="tel" required className="input" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email *
          </label>
          <input id="email" name="email" type="email" required className="input" />
        </div>

        <div className="flex items-start gap-2">
          <input
            id="rgpd"
            name="rgpd"
            type="checkbox"
            required
            className="mt-1"
          />
          <label htmlFor="rgpd" className="text-xs text-muted-foreground">
            J'accepte que mes données soient transmises aux artisans sélectionnés
            pour me proposer un devis. Vos données sont protégées (RGPD).
          </label>
        </div>

        <button type="submit" className="btn-primary w-full h-12 text-base">
          Recevoir mes devis gratuits
        </button>
      </form>
    </div>
  );
}
