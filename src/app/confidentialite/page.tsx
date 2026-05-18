import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Politique de confidentialité (RGPD)",
  description: `Comment ${SITE_NAME} collecte, utilise et protège vos données personnelles, conformément au RGPD et à la loi Informatique et Libertés.`,
  path: "/confidentialite",
});

const crumbs = [{ name: "Confidentialité", url: "/confidentialite" }];

export default function ConfidentialitePage() {
  return (
    <>
      <StructuredData data={breadcrumbSchema(crumbs)} />

      <div className="container">
        <Breadcrumbs items={crumbs} />

        <article className="max-w-3xl py-6">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Politique de confidentialité
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Conforme RGPD (Règlement UE 2016/679) et à la loi n°78-17 du 6
            janvier 1978 modifiée. Dernière mise à jour&nbsp;:{" "}
            {new Date().toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <section className="space-y-6 text-[15px] leading-relaxed">
            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">1. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des données personnelles collectées
                sur {SITE_NAME} est&nbsp;:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>[Raison sociale de l'éditeur — À COMPLÉTER]</li>
                <li>Adresse&nbsp;: [Adresse complète]</li>
                <li>
                  Email DPO&nbsp;:{" "}
                  <a
                    href="mailto:dpo@artisanspresdechezvous.com"
                    className="text-primary hover:underline"
                  >
                    dpo@artisanspresdechezvous.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">2. Données collectées</h2>
              <p>Nous collectons les données suivantes&nbsp;:</p>

              <h3 className="font-semibold mt-4 mb-1">a) Particuliers (demandeurs de devis)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nom, prénom</li>
                <li>Email, téléphone</li>
                <li>Code postal, ville</li>
                <li>Description du projet / besoin</li>
                <li>Données de navigation (IP, cookies, pages visitées)</li>
              </ul>

              <h3 className="font-semibold mt-4 mb-1">b) Artisans</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Raison sociale, SIRET, adresse</li>
                <li>Nom du contact, email, téléphone professionnel</li>
                <li>Certifications, assurances, photos d'interventions</li>
                <li>Avis clients reçus</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                3. Finalités du traitement
              </h2>
              <p>Vos données sont utilisées pour&nbsp;:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Mettre en relation les particuliers avec les artisans
                  référencés (base légale&nbsp;: exécution du contrat)
                </li>
                <li>
                  Permettre la création et la gestion d'un compte artisan (base
                  légale&nbsp;: exécution du contrat)
                </li>
                <li>
                  Vous adresser des informations sur nos services (base
                  légale&nbsp;: consentement)
                </li>
                <li>
                  Mesurer l'audience du site et améliorer notre service (base
                  légale&nbsp;: intérêt légitime)
                </li>
                <li>
                  Lutter contre la fraude et respecter nos obligations légales
                  (base légale&nbsp;: obligation légale)
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                4. Destinataires des données
              </h2>
              <p>Vos données peuvent être transmises&nbsp;:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Aux artisans sélectionnés pour répondre à votre demande de
                  devis (uniquement les informations nécessaires)
                </li>
                <li>
                  À nos sous-traitants techniques (hébergement Vercel, base de
                  données Supabase, emailing) liés par des accords de
                  confidentialité
                </li>
                <li>
                  Aux autorités compétentes en cas de demande légale
                </li>
              </ul>
              <p className="mt-2">
                Vos données ne sont <strong>jamais vendues</strong> à des tiers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">5. Durée de conservation</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Demandes de devis&nbsp;: <strong>3 ans</strong> à compter du dernier contact</li>
                <li>Comptes artisans inactifs&nbsp;: <strong>3 ans</strong> après dernière connexion</li>
                <li>Données comptables&nbsp;: <strong>10 ans</strong> (obligation légale)</li>
                <li>Cookies&nbsp;: <strong>13 mois</strong> maximum</li>
                <li>Données de prospection commerciale&nbsp;: <strong>3 ans</strong></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">6. Vos droits</h2>
              <p>
                Conformément au RGPD, vous disposez des droits suivants sur vos
                données&nbsp;:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Droit d'accès</strong> à vos données</li>
                <li><strong>Droit de rectification</strong> des données inexactes</li>
                <li><strong>Droit à l'effacement</strong> (droit à l'oubli)</li>
                <li><strong>Droit à la limitation</strong> du traitement</li>
                <li><strong>Droit à la portabilité</strong> de vos données</li>
                <li><strong>Droit d'opposition</strong> au traitement</li>
                <li>Droit de retirer votre consentement à tout moment</li>
                <li>Droit de définir des directives post-mortem</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, contactez notre DPO&nbsp;:{" "}
                <a
                  href="mailto:dpo@artisanspresdechezvous.com"
                  className="text-primary hover:underline"
                >
                  dpo@artisanspresdechezvous.com
                </a>
              </p>
              <p>
                En cas de réponse non satisfaisante, vous pouvez introduire une
                réclamation auprès de la{" "}
                <a
                  href="https://www.cnil.fr"
                  className="text-primary hover:underline"
                  rel="noopener nofollow"
                  target="_blank"
                >
                  CNIL
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">7. Cookies</h2>
              <p>
                {SITE_NAME} utilise des cookies pour assurer le bon
                fonctionnement du site, mesurer l'audience et améliorer
                l'expérience utilisateur&nbsp;:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Cookies essentiels</strong>&nbsp;: nécessaires au
                  fonctionnement (session, panier, sécurité). Non
                  désactivables.
                </li>
                <li>
                  <strong>Cookies de mesure d'audience</strong>&nbsp;: Plausible
                  Analytics (anonymisé) ou Google Analytics. Soumis au
                  consentement.
                </li>
                <li>
                  <strong>Cookies tiers</strong>&nbsp;: éventuels boutons de
                  partage social. Soumis au consentement.
                </li>
              </ul>
              <p className="mt-2">
                Vous pouvez à tout moment modifier vos préférences via le
                bandeau de consentement, accessible en bas de page.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">8. Sécurité</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et
                organisationnelles appropriées pour protéger vos données contre
                tout accès non autorisé, modification, divulgation ou
                destruction&nbsp;:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Chiffrement TLS 1.3 de bout en bout (HTTPS)</li>
                <li>Mots de passe chiffrés (bcrypt)</li>
                <li>Hébergement européen ou conforme aux clauses contractuelles types</li>
                <li>Sauvegardes quotidiennes chiffrées</li>
                <li>Accès restreint en interne sur la base du moindre privilège</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                9. Transferts hors UE
              </h2>
              <p>
                Certains de nos sous-traitants peuvent traiter des données hors
                Union européenne (notamment Vercel aux États-Unis). Ces
                transferts sont encadrés par les clauses contractuelles types
                approuvées par la Commission européenne.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">10. Modifications</h2>
              <p>
                Cette politique peut être amenée à évoluer. Toute modification
                substantielle vous sera notifiée par email ou via un bandeau
                informatif sur le site.
              </p>
            </div>
          </section>

          <div className="mt-10 card p-5 bg-muted/30">
            <p className="text-sm">
              Pour toute question, contactez notre DPO ou consultez nos{" "}
              <Link href="/mentions-legales" className="text-primary hover:underline">
                mentions légales
              </Link>{" "}
              et nos{" "}
              <Link href="/cgu" className="text-primary hover:underline">
                conditions générales d'utilisation
              </Link>
              .
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
