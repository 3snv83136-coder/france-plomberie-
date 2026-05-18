import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { TRADES } from "@/data/trades";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DevisForm } from "@/components/DevisForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Devis gratuit : recevez 5 propositions d'artisans en 24h",
  description:
    "Décrivez votre projet en 2 minutes et recevez gratuitement jusqu'à 5 devis d'artisans qualifiés près de chez vous. Sans engagement, sans frais cachés.",
  path: "/devis",
});

export default function DevisPage() {
  const trades = TRADES.map((t) => ({ slug: t.slug, name: t.name }));

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

      <DevisForm trades={trades} />
    </div>
  );
}
