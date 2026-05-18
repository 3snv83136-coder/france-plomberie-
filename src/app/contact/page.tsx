import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Contact — Nous écrire, nous appeler, nous trouver",
  description: `Contactez ${SITE_NAME} par téléphone, email ou formulaire. Notre équipe vous répond en moins de 24h ouvrées du lundi au vendredi.`,
  path: "/contact",
});

const crumbs = [{ name: "Contact", url: "/contact" }];

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: `${SITE_URL}/contact`,
            name: `Contact ${SITE_NAME}`,
            inLanguage: "fr-FR",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: "+33-1-00-00-00-00",
                email: "contact@artisans-pres-de-chez-vous.fr",
                areaServed: "FR",
                availableLanguage: "French",
                hoursAvailable: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "18:00",
                },
              },
            ],
          },
        ]}
      />

      <div className="container">
        <Breadcrumbs items={crumbs} />

        <header className="py-8 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Contactez-nous
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Une question, une suggestion, un problème avec un artisan&nbsp;? Notre
            équipe vous répond en moins de 24h ouvrées.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6 my-6">
          <aside className="space-y-3 lg:col-span-1">
            <div className="card p-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="font-bold mb-1">Email</h2>
              <p className="text-sm text-muted-foreground mb-2">
                Pour toute question générale.
              </p>
              <a
                href="mailto:contact@artisans-pres-de-chez-vous.fr"
                className="text-primary text-sm font-medium hover:underline break-all"
              >
                contact@artisans-pres-de-chez-vous.fr
              </a>
            </div>

            <div className="card p-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="font-bold mb-1">Téléphone</h2>
              <p className="text-sm text-muted-foreground mb-2">
                Lundi au vendredi, 9h–18h.
              </p>
              <a
                href="tel:+33100000000"
                className="text-primary text-sm font-medium hover:underline"
              >
                01 00 00 00 00
              </a>
            </div>

            <div className="card p-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="font-bold mb-1">Adresse</h2>
              <p className="text-sm text-muted-foreground">
                [À COMPLÉTER]
                <br />
                Rue du Siège Social
                <br />
                75000 Paris
                <br />
                France
              </p>
            </div>

            <div className="card p-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="font-bold mb-1">Horaires</h2>
              <ul className="text-sm text-muted-foreground space-y-0.5">
                <li>Lundi – Vendredi&nbsp;: 9h – 18h</li>
                <li>Samedi – Dimanche&nbsp;: fermé</li>
              </ul>
            </div>
          </aside>

          <form
            className="card p-6 md:p-8 lg:col-span-2 space-y-5"
            action="#"
            method="post"
          >
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Envoyez-nous un message</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                  Nom complet *
                </label>
                <input id="name" name="name" type="text" required className="input" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email *
                </label>
                <input id="email" name="email" type="email" required className="input" />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
                Sujet *
              </label>
              <select id="subject" name="subject" required className="input">
                <option value="">Sélectionnez un sujet</option>
                <option value="question">Question générale</option>
                <option value="artisan">Question artisan / inscription</option>
                <option value="litige">Signaler un problème avec un artisan</option>
                <option value="presse">Demande presse / partenariat</option>
                <option value="bug">Signaler un bug</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="input min-h-[140px] py-2"
                placeholder="Décrivez votre demande en détail…"
              />
            </div>

            <div className="flex items-start gap-2">
              <input id="rgpd" name="rgpd" type="checkbox" required className="mt-1" />
              <label htmlFor="rgpd" className="text-xs text-muted-foreground">
                J'accepte que mes données soient utilisées pour répondre à ma
                demande, conformément à notre{" "}
                <a href="/confidentialite" className="text-primary hover:underline">
                  politique de confidentialité
                </a>
                .
              </label>
            </div>

            <button type="submit" className="btn-primary w-full h-12 text-base">
              Envoyer mon message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
