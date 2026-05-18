import type { Guide } from "./types";

export const prixRenovationSalleDeBain: Guide = {
  slug: "prix-renovation-salle-de-bain",
  title: "Prix d'une rénovation de salle de bain en 2026 : au m² et par poste",
  metaTitle: "Prix rénovation salle de bain 2026 : tarif au m² par poste",
  metaDescription:
    "Combien coûte une rénovation de salle de bain en 2026 ? Tarifs au m², détail par poste (douche, baignoire, carrelage, plomberie), aides cumulables. Guide complet.",
  category: "Prix",
  excerpt:
    "Une rénovation de salle de bain coûte de 600 € à 2 500 € le m² en 2026, soit 4 000 à 15 000 € pour une salle de bain standard. Voici le détail par poste.",
  heroIntro:
    "La salle de bain est l'une des pièces les plus complexes à rénover : plomberie, électricité, étanchéité, carrelage et finitions s'entremêlent. Selon la nature des travaux (simple rafraîchissement ou rénovation complète), le budget varie du simple au quadruple.",
  readingMinutes: 10,
  publishedAt: "2026-02-25",
  updatedAt: "2026-05-11",
  author: {
    name: "Olivier Martin",
    role: "Maître d'œuvre & rédacteur travaux",
  },
  keyTakeaways: [
    "Rafraîchissement (peinture, joints, robinetterie) : 600 – 1 000 €/m².",
    "Rénovation moyenne (douche, carrelage, meuble) : 1 200 – 1 800 €/m².",
    "Rénovation complète (tout neuf, plomberie revue) : 1 800 – 2 500 €/m².",
    "Aides : MaPrimeAdapt' pour PMR/seniors, TVA réduite, Action Logement.",
    "Délai moyen : 2 à 4 semaines selon l'ampleur.",
  ],
  sections: [
    {
      id: "vue-densemble",
      heading: "Tarifs moyens selon le niveau de rénovation",
      blocks: [
        {
          type: "table",
          caption: "Prix au m² selon le type de rénovation",
          headers: ["Niveau", "Prix /m²", "Exemple 6 m²"],
          rows: [
            ["Rafraîchissement", "600 – 1 000 €", "3 600 – 6 000 €"],
            ["Rénovation moyenne", "1 200 – 1 800 €", "7 200 – 10 800 €"],
            ["Rénovation complète", "1 800 – 2 500 €", "10 800 – 15 000 €"],
            ["Rénovation haut de gamme", "2 500 – 4 000 €", "15 000 – 24 000 €"],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Surface moyenne",
          text: "La salle de bain française mesure en moyenne 5 à 7 m². Les SDB de moins de 4 m² subissent un effet de seuil sur le coût au m² (10 à 20 % de plus). Au-delà de 10 m², le coût au m² baisse légèrement.",
        },
      ],
    },
    {
      id: "details-postes",
      heading: "Détail par poste de travaux",
      blocks: [
        {
          type: "h3",
          text: "Démolition et préparation",
        },
        {
          type: "ul",
          items: [
            "Dépose carrelage : 25 – 50 €/m²",
            "Évacuation gravats : 200 – 600 € (selon volume)",
            "Préparation des supports : 15 – 30 €/m²",
          ],
        },
        {
          type: "h3",
          text: "Plomberie",
        },
        {
          type: "ul",
          items: [
            "Reprise complète des arrivées et évacuations : 1 500 – 3 500 €",
            "Pose receveur douche : 200 – 500 € (hors receveur)",
            "Pose baignoire : 250 – 500 € (hors baignoire)",
            "Pose lavabo / vasque : 100 – 250 €",
            "Pose WC suspendu : 300 – 600 €",
            "Robinetterie thermostatique : 150 – 400 €",
          ],
        },
        {
          type: "h3",
          text: "Électricité",
        },
        {
          type: "ul",
          items: [
            "Mise aux normes NF C 15-100 : 600 – 1 500 €",
            "Spots LED encastrés (par point) : 60 – 120 €",
            "Sèche-serviettes électrique : 200 – 600 € (pose + fourniture)",
            "Prises supplémentaires : 80 – 150 €/point",
            "Extracteur d'air / VMC : 200 – 500 €",
          ],
        },
        {
          type: "h3",
          text: "Étanchéité et carrelage",
        },
        {
          type: "ul",
          items: [
            "Système d'étanchéité sous carrelage (SPEC) : 30 – 60 €/m²",
            "Pose carrelage sol : 40 – 80 €/m²",
            "Pose faïence murale : 50 – 100 €/m²",
            "Carrelage haut de gamme (grand format, pierre) : +50 à 150 %",
          ],
        },
        {
          type: "h3",
          text: "Équipements et mobilier",
        },
        {
          type: "table",
          caption: "Prix moyens des équipements (fourniture seule)",
          headers: ["Équipement", "Entrée de gamme", "Milieu de gamme", "Haut de gamme"],
          rows: [
            ["Douche italienne (receveur + paroi)", "400 €", "900 €", "2 500 €"],
            ["Baignoire", "200 €", "600 €", "2 000 €+"],
            ["Meuble vasque double", "400 €", "1 000 €", "3 000 €"],
            ["WC suspendu (bâti + cuvette)", "400 €", "800 €", "1 800 €"],
            ["Robinetterie complète", "200 €", "600 €", "2 000 €"],
          ],
        },
      ],
    },
    {
      id: "aides",
      heading: "Les aides mobilisables en 2026",
      blocks: [
        {
          type: "ul",
          items: [
            "TVA réduite à 10 % (logement >2 ans) ou 5,5 % (rénovation énergétique)",
            "MaPrimeAdapt' : aide à l'adaptation pour PMR ou seniors (douche italienne, WC surélevés, barres d'appui) – jusqu'à 70 % de prise en charge.",
            "Action Logement : prêt à 1 % pour les salariés du secteur privé (jusqu'à 10 000 €).",
            "Aides locales (CAF, ANAH, conseil régional) : ponctuelles, vérifier en mairie.",
            "Crédit d'impôt pour adaptation du logement (25 % plafonné à 5 000 €).",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "MaPrimeAdapt'",
          text: "Cette nouvelle aide lancée en 2024 cible les seniors (≥60 ans GIR 1-6) et les personnes en situation de handicap. Elle finance les travaux d'adaptation (douche de plain-pied, WC accessible, barres d'appui) jusqu'à 70 % pour les très modestes.",
        },
      ],
    },
    {
      id: "delais",
      heading: "Délais et organisation du chantier",
      blocks: [
        {
          type: "table",
          caption: "Durée moyenne par niveau de rénovation",
          headers: ["Niveau", "Durée"],
          rows: [
            ["Rafraîchissement", "3 – 7 jours"],
            ["Rénovation moyenne", "2 – 3 semaines"],
            ["Rénovation complète", "3 – 5 semaines"],
            ["Rénovation haut de gamme avec sur-mesure", "5 – 8 semaines"],
          ],
        },
        {
          type: "p",
          text: "Une bonne planification réduit la durée et le coût. Coordonnez plombier, électricien et carreleur via un maître d'œuvre ou un artisan tout corps d'état si possible. Évitez les chantiers en haute saison (été) où les délais sont rallongés.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Faut-il un permis pour une rénovation de salle de bain ?",
      a: "Aucun permis pour des travaux intérieurs sans modification de structure. Une déclaration préalable peut être nécessaire si vous percez une ouverture extérieure (fenêtre, VMC). En copropriété, demandez l'autorisation pour les colonnes d'évacuation.",
    },
    {
      q: "Peut-on rester chez soi pendant les travaux ?",
      a: "Oui pour un rafraîchissement (3-7 jours). Plus difficile pour une rénovation complète, car la salle de bain est inutilisable 2 à 3 semaines. Prévoyez une SDB alternative chez un voisin, en location courte durée, ou installez une douche provisoire.",
    },
    {
      q: "Quel revêtement de sol pour une SDB ?",
      a: "Carrelage grès cérame (le plus courant), béton ciré (étanchéité à soigner), parquet stratifié hydrofuge (déconseillé en zone humide directe), résine époxy (haut de gamme). Évitez tout revêtement non antidérapant : la norme R10 minimum est recommandée.",
    },
    {
      q: "Faut-il une VMC dans la salle de bain ?",
      a: "Oui, c'est obligatoire en France depuis 1969. Une ventilation naturelle ne suffit pas : la VMC évacue l'humidité (douches, bains) et prévient les moisissures. La VMC simple flux suffit dans la plupart des cas (200 – 500 € posée).",
    },
    {
      q: "Combien d'artisans interviennent sur un chantier complet ?",
      a: "En moyenne 3 à 4 : plombier, électricien, carreleur, peintre. Un artisan tout corps d'état ou un maître d'œuvre peut tout coordonner, ce qui simplifie le suivi mais ajoute 10-15 % de marge.",
    },
  ],
  relatedTrades: ["plombier", "carreleur", "electricien", "peintre"],
  related: [
    "devis-travaux-pieges-a-eviter",
    "aides-travaux-2026",
    "trouver-artisan-rge",
  ],
};
