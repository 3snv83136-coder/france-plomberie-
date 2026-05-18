import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Mentions légales",
  description: `Mentions légales et informations sur l'éditeur du site ${SITE_NAME}.`,
  path: "/mentions-legales",
});

const crumbs = [{ name: "Mentions légales", url: "/mentions-legales" }];

export default function MentionsLegalesPage() {
  return (
    <>
      <StructuredData data={breadcrumbSchema(crumbs)} />

      <div className="container">
        <Breadcrumbs items={crumbs} />

        <article className="max-w-3xl py-6">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Mentions légales
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Dernière mise à jour&nbsp;:{" "}
            {new Date().toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <section className="prose max-w-none space-y-6 text-[15px] leading-relaxed">
            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">1. Éditeur du site</h2>
              <p>
                Le site <strong>{SITE_NAME}</strong>, accessible à l'adresse{" "}
                <Link href="/" className="text-primary hover:underline">
                  {SITE_URL}
                </Link>
                , est édité par&nbsp;:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Raison sociale&nbsp;:</strong> [À COMPLÉTER]
                </li>
                <li>
                  <strong>Forme juridique&nbsp;:</strong> [SAS / SARL / EURL / …]
                </li>
                <li>
                  <strong>Capital social&nbsp;:</strong> [Montant] €
                </li>
                <li>
                  <strong>Siège social&nbsp;:</strong> [Adresse complète]
                </li>
                <li>
                  <strong>SIRET&nbsp;:</strong> [14 chiffres]
                </li>
                <li>
                  <strong>RCS&nbsp;:</strong> [Ville et numéro]
                </li>
                <li>
                  <strong>N° TVA intracommunautaire&nbsp;:</strong> FR [11 chiffres]
                </li>
                <li>
                  <strong>Directeur de la publication&nbsp;:</strong> [Nom Prénom]
                </li>
                <li>
                  <strong>Email&nbsp;:</strong>{" "}
                  <a
                    href="mailto:contact@artisanspresdechezvous.com"
                    className="text-primary hover:underline"
                  >
                    contact@artisanspresdechezvous.com
                  </a>
                </li>
                <li>
                  <strong>Téléphone&nbsp;:</strong> 01 00 00 00 00
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">2. Hébergeur</h2>
              <p>Le site est hébergé par&nbsp;:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Vercel Inc.</strong>
                </li>
                <li>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
                <li>
                  Site&nbsp;:{" "}
                  <a
                    href="https://vercel.com"
                    className="text-primary hover:underline"
                    rel="noopener nofollow"
                    target="_blank"
                  >
                    vercel.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                3. Propriété intellectuelle
              </h2>
              <p>
                L'ensemble des éléments présents sur {SITE_NAME} (textes,
                graphismes, logos, icônes, sons, logiciels) sont la propriété
                exclusive de l'éditeur, à l'exception des éléments fournis par
                les artisans (textes de présentation, photos) qui restent la
                propriété de leurs auteurs respectifs.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication,
                adaptation de tout ou partie des éléments du site, quel que soit
                le moyen ou le procédé utilisé, est interdite, sauf autorisation
                écrite préalable de l'éditeur, conformément aux articles L.122-4
                et suivants du Code de la propriété intellectuelle.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                4. Responsabilité éditoriale
              </h2>
              <p>
                Les informations diffusées sur {SITE_NAME} (tarifs indicatifs,
                guides, conseils) le sont à titre informatif et ne constituent
                pas un conseil professionnel personnalisé. L'éditeur s'efforce
                de tenir ces informations à jour mais ne peut garantir leur
                exactitude absolue.
              </p>
              <p>
                Les fiches d'artisans sont alimentées à partir des données
                publiques (API Sirene de l'INSEE) et des informations
                renseignées par les artisans eux-mêmes. L'éditeur ne peut être
                tenu responsable de la qualité des prestations fournies par les
                artisans référencés.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">5. Liens hypertextes</h2>
              <p>
                Le site peut contenir des liens vers d'autres sites internet.
                L'éditeur n'exerce aucun contrôle sur ces sites et décline toute
                responsabilité quant à leur contenu.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                6. Données personnelles
              </h2>
              <p>
                Le traitement des données personnelles collectées sur ce site
                est détaillé dans notre{" "}
                <Link
                  href="/confidentialite"
                  className="text-primary hover:underline"
                >
                  politique de confidentialité
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">
                7. Loi applicable et juridiction
              </h2>
              <p>
                Les présentes mentions légales sont soumises au droit français.
                En cas de litige, et après échec de toute tentative de
                résolution amiable, les tribunaux français seront seuls
                compétents.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mt-6 mb-2">8. Signalement</h2>
              <p>
                Pour toute demande relative au contenu du site, à un artisan
                référencé ou à un avis publié, contactez-nous via la page{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact
                </Link>
                .
              </p>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
