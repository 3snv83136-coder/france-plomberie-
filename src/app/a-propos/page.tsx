import Link from "next/link";
import {
  Award,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "À propos — Notre mission, notre équipe, nos valeurs",
  description: `Découvrez ${SITE_NAME}, l'annuaire de référence des artisans qualifiés en France. Notre mission : aider les particuliers à trouver le bon professionnel, vérifié et noté.`,
  path: "/a-propos",
});

const crumbs = [{ name: "À propos", url: "/a-propos" }];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Transparence",
    text: "Tous les artisans référencés sont vérifiés (SIRET, assurance décennale). Aucun avis acheté, aucune mise en avant payée déguisée.",
  },
  {
    icon: Users,
    title: "Proximité",
    text: "Notre algorithme privilégie les artisans locaux à votre ville, pour des interventions plus rapides et des tarifs plus justes.",
  },
  {
    icon: Award,
    title: "Exigence",
    text: "Profils incomplets, entreprises non immatriculées ou avis suspects : modération humaine systématique avant publication.",
  },
  {
    icon: HeartHandshake,
    title: "Service",
    text: "Si une intervention se passe mal, notre équipe vous accompagne dans la résolution du litige, en lien avec l'artisan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: `${SITE_URL}/a-propos`,
            name: `À propos de ${SITE_NAME}`,
            inLanguage: "fr-FR",
            isPartOf: {
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
            },
          },
        ]}
      />

      <div className="container">
        <Breadcrumbs items={crumbs} />

        <header className="py-8 max-w-3xl">
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium mb-3">
            À PROPOS
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Aider chaque foyer français à trouver le bon artisan
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {SITE_NAME} est l'annuaire de référence des artisans qualifiés en
            France. Notre mission&nbsp;: remettre la confiance au cœur du marché
            des travaux et du dépannage, en mettant en relation les particuliers
            avec des professionnels vérifiés, transparents et bien notés.
          </p>
        </header>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
          <div className="card p-6 text-center">
            <div className="text-3xl font-extrabold text-primary">120 000+</div>
            <div className="text-sm text-muted-foreground mt-1">
              Artisans référencés
            </div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-extrabold text-primary">35 000</div>
            <div className="text-sm text-muted-foreground mt-1">
              Communes couvertes
            </div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-extrabold text-primary">4,7/5</div>
            <div className="text-sm text-muted-foreground mt-1">
              Satisfaction moyenne
            </div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-extrabold text-primary">24h</div>
            <div className="text-sm text-muted-foreground mt-1">
              Délai moyen de devis
            </div>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Notre histoire</h2>
          <div className="prose prose-sm md:prose max-w-3xl text-muted-foreground space-y-4">
            <p>
              {SITE_NAME} est né d'un constat simple&nbsp;: trouver un artisan
              fiable en France relève souvent du parcours du combattant. Devis
              flous, délais à rallonge, factures gonflées en cas d'urgence, faux
              avis sur les grandes plateformes… Le marché de l'artisanat
              souffrait d'un déficit de confiance, alors même que la grande
              majorité des artisans français sont des professionnels sérieux et
              passionnés.
            </p>
            <p>
              Nous avons décidé de construire une plateforme qui parte de
              l'inverse&nbsp;: vérifier rigoureusement chaque entreprise avant
              publication, modérer humainement chaque avis, n'accepter aucune
              mise en avant payée déguisée, et favoriser systématiquement les
              artisans locaux à votre ville.
            </p>
            <p>
              Aujourd'hui, plus de 120 000 artisans sont référencés sur{" "}
              {SITE_NAME}, dans 35 000 communes et plus de 30 corps de métier.
              Notre engagement&nbsp;: rester indépendants et transparents.
            </p>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Nos valeurs</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Comment vérifions-nous les artisans ?
          </h2>
          <ul className="space-y-3 max-w-3xl">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <strong>Vérification SIRET via l'API Sirene de l'INSEE</strong>
                <p className="text-sm text-muted-foreground">
                  Chaque inscription est contrôlée auprès du Registre National
                  des Entreprises. Les entreprises non immatriculées ou
                  radiées sont automatiquement refusées.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <strong>Justificatif d'assurance décennale</strong>
                <p className="text-sm text-muted-foreground">
                  Obligatoire pour la majorité des corps de métier du bâtiment.
                  Nous demandons une attestation en cours de validité.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <strong>Modération humaine des avis</strong>
                <p className="text-sm text-muted-foreground">
                  Tout avis publié doit être rattaché à une demande de devis
                  vérifiée. Les avis suspects sont supprimés sous 24h.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <strong>Renouvellement annuel des justificatifs</strong>
                <p className="text-sm text-muted-foreground">
                  Les profils dont les pièces ne sont plus à jour sont
                  désactivés jusqu'à mise en conformité.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section className="my-12 card p-6 md:p-8 bg-gradient-to-br from-primary/10 to-accent/10">
          <Sparkles className="w-8 h-8 text-primary mb-3" />
          <h2 className="text-2xl font-bold mb-2">Une question, un retour ?</h2>
          <p className="text-muted-foreground mb-4 max-w-xl">
            Notre équipe est joignable par email et par téléphone du lundi au
            vendredi. Nous répondons en moins de 24h ouvrées.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Nous contacter
            </Link>
            <Link href="/artisan/inscription" className="btn-outline">
              Inscrire mon entreprise
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
