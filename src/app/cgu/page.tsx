import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Conditions générales d'utilisation",
  description: `Conditions générales d'utilisation du site ${SITE_NAME}. Règles d'usage pour les particuliers et les artisans.`,
  path: "/cgu",
});

const crumbs = [{ name: "CGU", url: "/cgu" }];

export default function CguPage() {
  return (
    <>
      <StructuredData data={breadcrumbSchema(crumbs)} />

      <div className="container">
        <Breadcrumbs items={crumbs} />

        <article className="max-w-3xl py-6">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Conditions générales d'utilisation
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            En vigueur au{" "}
            {new Date().toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <section className="space-y-6 text-[15px] leading-relaxed">
            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">1. Objet</h2>
              <p>
                Les présentes conditions générales d'utilisation
                («&nbsp;CGU&nbsp;») régissent l'utilisation du site{" "}
                <strong>{SITE_NAME}</strong> par les particuliers
                («&nbsp;Utilisateurs&nbsp;») et les artisans
                («&nbsp;Professionnels&nbsp;»).
              </p>
              <p>
                {SITE_NAME} est une plateforme de mise en relation entre
                particuliers à la recherche d'un artisan et professionnels
                qualifiés. L'éditeur n'est pas partie aux contrats conclus entre
                Utilisateurs et Professionnels.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                2. Acceptation des CGU
              </h2>
              <p>
                L'utilisation du site implique l'acceptation pleine et entière
                des présentes CGU. Si vous n'acceptez pas ces conditions, vous
                devez renoncer à utiliser le site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                3. Services pour les particuliers
              </h2>
              <p>
                Le site permet aux particuliers de&nbsp;:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Consulter gratuitement les fiches d'artisans</li>
                <li>Demander gratuitement un ou plusieurs devis</li>
                <li>Consulter et publier des avis sur les prestations reçues</li>
                <li>Accéder à nos guides et conseils éditoriaux</li>
              </ul>
              <p className="mt-2">
                L'utilisation du site est gratuite et n'engage à rien. Aucun
                achat de service n'est conclu via le site&nbsp;: la transaction
                se fait directement entre l'Utilisateur et le Professionnel.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                4. Services pour les artisans
              </h2>
              <p>
                Les Professionnels peuvent créer gratuitement un profil après
                vérification de leur immatriculation (SIRET via API Sirene).
                Des options payantes peuvent être proposées&nbsp;: mise en
                avant, abonnement Premium, accès à des leads qualifiés. Ces
                offres sont décrites dans les{" "}
                <a href="#" className="text-primary hover:underline">
                  conditions générales de vente
                </a>{" "}
                spécifiques aux Professionnels.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                5. Obligations des utilisateurs
              </h2>
              <p>L'Utilisateur s'engage à&nbsp;:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Fournir des informations exactes et à jour</li>
                <li>
                  Ne publier que des avis honnêtes, factuels et liés à une
                  prestation effectivement reçue
                </li>
                <li>
                  Ne pas utiliser le site à des fins commerciales (collecte
                  d'emails, prospection)
                </li>
                <li>Respecter les Professionnels et les autres utilisateurs</li>
                <li>Ne pas tenter de contourner les mesures de sécurité</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                6. Obligations des artisans
              </h2>
              <p>Le Professionnel s'engage à&nbsp;:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Être titulaire d'un SIRET en cours de validité et d'une
                  assurance professionnelle adaptée à son activité
                </li>
                <li>
                  Répondre aux demandes de devis dans un délai raisonnable (24 à
                  72h)
                </li>
                <li>
                  Fournir des devis clairs, détaillés et conformes à la
                  réglementation en vigueur
                </li>
                <li>
                  Respecter le délai et le tarif annoncés sauf modification
                  acceptée par écrit par l'Utilisateur
                </li>
                <li>
                  Ne pas publier de faux avis ou solliciter d'avis frauduleux
                </li>
              </ul>
              <p className="mt-2">
                En cas de manquement, le profil peut être suspendu ou supprimé
                sans préavis.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">7. Avis clients</h2>
              <p>
                Les avis publiés font l'objet d'une modération humaine.
                L'éditeur peut refuser tout avis manifestement injurieux,
                diffamatoire, hors-sujet, non lié à une prestation réelle, ou
                contraire à la législation.
              </p>
              <p>
                Conformément à la norme NF Service Z74-501, les modalités de
                collecte, de modération et de publication des avis sont
                consultables sur demande à l'adresse{" "}
                <a
                  href="mailto:contact@artisans-pres-de-chez-vous.fr"
                  className="text-primary hover:underline"
                >
                  contact@artisans-pres-de-chez-vous.fr
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                8. Responsabilité de l'éditeur
              </h2>
              <p>
                {SITE_NAME} agit en qualité d'intermédiaire technique. L'éditeur
                ne peut être tenu responsable&nbsp;:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  De la qualité des prestations fournies par les Professionnels
                </li>
                <li>
                  Des litiges éventuels entre Utilisateurs et Professionnels
                </li>
                <li>
                  D'éventuelles interruptions techniques du service
                </li>
                <li>
                  Des contenus publiés par les Professionnels ou Utilisateurs
                </li>
              </ul>
              <p className="mt-2">
                En cas de litige avec un Professionnel, l'Utilisateur est invité
                à contacter en priorité le Professionnel concerné, puis
                l'éditeur via la page{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">9. Médiation</h2>
              <p>
                Conformément aux articles L.611-1 et suivants du Code de la
                consommation, en cas de litige non résolu, l'Utilisateur peut
                recourir gratuitement au service de médiation suivant&nbsp;:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>[À COMPLÉTER&nbsp;: nom du médiateur conventionné]</li>
                <li>Adresse&nbsp;: [Adresse postale]</li>
                <li>Site&nbsp;: [URL]</li>
              </ul>
              <p className="mt-2">
                Vous pouvez également utiliser la plateforme européenne de
                règlement en ligne des litiges&nbsp;:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  className="text-primary hover:underline"
                  rel="noopener nofollow"
                  target="_blank"
                >
                  ec.europa.eu/consumers/odr
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">10. Modification des CGU</h2>
              <p>
                L'éditeur se réserve le droit de modifier les présentes CGU à
                tout moment. La version applicable est celle en vigueur lors de
                votre utilisation du site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                11. Droit applicable
              </h2>
              <p>
                Les présentes CGU sont soumises au droit français. Tout litige
                relève de la compétence des tribunaux français.
              </p>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
