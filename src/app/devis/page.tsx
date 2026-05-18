import Image from "next/image";
import {
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
  Star,
  Tv,
  Zap,
} from "lucide-react";
import { TRADES } from "@/data/trades";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DevisForm } from "@/components/DevisForm";
import { CallbackButton } from "@/components/CallbackButton";
import { TrustBadges } from "@/components/TrustBadges";
import { buildMetadata } from "@/lib/seo";
import { tradeHeroImage } from "@/lib/hero-images";

export const metadata = buildMetadata({
  title: "Devis gratuit en 24h — Dès 69 €, sans engagement",
  description:
    "Décrivez votre projet en 2 minutes et recevez gratuitement plusieurs devis d'artisans qualifiés. Intervention 24h/24, dès 69 €. SIRET vérifiés.",
  path: "/devis",
});

const STEPS = [
  {
    n: 1,
    t: "Vous décrivez votre projet",
    d: "Métier, code postal, quelques détails. 2 minutes max, sans engagement.",
  },
  {
    n: 2,
    t: "On vous rappelle sous 5 min",
    d: "Un technicien vous contacte pour comprendre votre besoin et fixer rendez-vous.",
  },
  {
    n: 3,
    t: "Devis sur place, dès 69 €",
    d: "Tarif annoncé = tarif facturé. Paiement après intervention, garantie incluse.",
  },
];

export default function DevisPage() {
  const trades = TRADES.map((t) => ({ slug: t.slug, name: t.name }));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary via-[hsl(var(--primary-dark))] to-[hsl(217_91%_22%)] text-primary-foreground">
        <Image
          src={tradeHeroImage("plombier")}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center opacity-15 mix-blend-luminosity"
        />
        <div className="container relative py-8 md:py-12">
          <Breadcrumbs items={[{ name: "Demander un devis", url: "/devis" }]} />

          <div className="mt-2 max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground shadow-sm">
                <Zap className="w-3 h-3" /> DEVIS GRATUIT
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur">
                <Tv className="w-3 h-3" /> VU À LA TÉLÉ
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-accent/20 text-white border border-accent/30">
                <ShieldCheck className="w-3 h-3" /> SIRET VÉRIFIÉS
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-balance leading-[1.05]">
              Votre devis gratuit{" "}
              <span className="text-secondary">en moins de 5 min</span>
            </h1>
            <p className="text-white/90 text-base md:text-lg mb-5">
              Décrivez votre projet en 2 minutes. Réponse immédiate, devis
              gratuit à partir de <strong className="text-secondary">69 €</strong>.
              Sans engagement.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm mb-2">
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <strong>4,8/5</strong>
                <span className="text-white/75">· 12 000 avis</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-white/85">Réponse 24h/24</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span className="text-white/85">Sans engagement</span>
              </span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
      </section>

      <section className="container py-10 grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="card p-6 bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground">
            <div className="flex items-start gap-3 mb-3">
              <div className="inline-flex flex-col items-center justify-center bg-secondary text-secondary-foreground rounded-xl px-3 py-2.5 shrink-0 shadow-md">
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-90">À partir de</div>
                <div className="text-3xl font-extrabold leading-none">69 €</div>
              </div>
              <div>
                <h2 className="font-extrabold text-base leading-tight">
                  Pas de surprise sur la facture
                </h2>
                <p className="text-xs text-white/80 mt-1">
                  Tarif annoncé = tarif facturé.
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              {[
                "Déplacement compris",
                "Aucun frais caché",
                "Paiement après intervention",
                "Garantie pièces et main d'œuvre",
                "Intervention 24h/24 et 7j/7",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5">
            <h3 className="font-bold mb-2 text-sm">Plus rapide : être rappelé</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Préférez-vous qu'on vous rappelle directement ? Laissez votre
              numéro, un technicien vous appelle en 5 min.
            </p>
            <CallbackButton variant="cta" size="md" className="w-full">
              <Phone className="w-4 h-4 mr-2" />
              Être rappelé en 5 min
            </CallbackButton>
          </div>

          <div className="card p-5">
            <h3 className="font-bold mb-3 text-sm">Comment ça marche ?</h3>
            <ol className="space-y-3">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-3 text-sm">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-extrabold flex items-center justify-center shrink-0">
                    {s.n}
                  </span>
                  <div>
                    <div className="font-semibold leading-tight">{s.t}</div>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
            Décrivez votre projet
          </h2>
          <p className="text-muted-foreground mb-6">
            Réponse immédiate. Tous les champs marqués <span className="text-destructive">*</span> sont obligatoires.
          </p>
          <DevisForm trades={trades} />
        </div>
      </section>

      <section className="container py-6">
        <TrustBadges variant="compact" />
      </section>

      <section className="bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground">
        <div className="container py-12 text-center">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground mb-4 shadow">
            <Zap className="w-3 h-3" /> URGENCE 24/7 · DÈS 69 €
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-balance">
            Une urgence ? On vous rappelle en 5 min
          </h2>
          <p className="text-white/90 text-lg max-w-xl mx-auto mb-6">
            Pas le temps de remplir le formulaire ? Laissez juste votre numéro,
            un technicien vous appelle.
          </p>
          <CallbackButton variant="cta" size="xl">
            <Phone className="w-5 h-5 mr-2" />
            Être rappelé maintenant
          </CallbackButton>
        </div>
      </section>
    </>
  );
}
