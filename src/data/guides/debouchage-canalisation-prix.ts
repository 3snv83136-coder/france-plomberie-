import type { Guide } from "./types";

export const debouchageCanalisationPrix: Guide = {
  slug: "debouchage-canalisation-prix",
  title: "Prix d'un débouchage de canalisation en 2026 : tarifs, urgence, méthodes",
  metaTitle: "Prix débouchage canalisation 2026 : tarifs, urgence, devis",
  metaDescription:
    "Combien coûte un débouchage de canalisation en 2026 ? Tarifs ventouse, furet, haute pression, urgence 24/7, qui paie en location, copro. Guide complet.",
  category: "Prix",
  excerpt:
    "Un débouchage de canalisation coûte 80 à 350 € selon la méthode et l'heure. En urgence nuit/week-end, le tarif peut grimper à 600 € — souvent injustifié.",
  heroIntro:
    "Évier bouché, WC qui débordent, eaux usées qui remontent dans la douche : un débouchage est rarement planifié. Les tarifs varient énormément selon la technique utilisée et la plage horaire. Voici comment évaluer un devis honnête et éviter les pièges classiques.",
  readingMinutes: 7,
  publishedAt: "2026-03-22",
  updatedAt: "2026-05-13",
  author: {
    name: "Vincent Roux",
    role: "Plombier-dépanneur (12 ans)",
  },
  keyTakeaways: [
    "Furet manuel : 80 – 180 € en journée.",
    "Haute pression : 180 – 400 € selon la longueur.",
    "Inspection caméra : 100 – 250 € en complément.",
    "Majoration nuit/week-end : 50 à 100 % maximum.",
    "En location, qui paie ? Souvent le locataire si bouchon courant, le propriétaire si la canalisation est défectueuse.",
  ],
  sections: [
    {
      id: "methodes",
      heading: "Les méthodes de débouchage et leurs prix",
      blocks: [
        {
          type: "h3",
          text: "Ventouse et chimique (à faire soi-même)",
        },
        {
          type: "p",
          text: "Ventouse, soude caustique, bicarbonate + vinaigre : ces solutions ménagères suffisent pour 60 % des bouchons « légers » (cheveux, savon dans l'évacuation). Coût : moins de 20 €.",
        },
        {
          type: "h3",
          text: "Furet manuel ou électrique",
        },
        {
          type: "p",
          text: "Tige flexible (jusqu'à 30 m) introduite dans la canalisation pour casser ou ramener le bouchon. C'est la méthode la plus courante pour un évier, un lavabo, ou un WC.",
        },
        {
          type: "ul",
          items: [
            "Furet manuel : 80 – 180 € en journée.",
            "Furet électrique (rotatif) : 150 – 300 €.",
            "Durée d'intervention : 30 à 60 minutes en moyenne.",
          ],
        },
        {
          type: "h3",
          text: "Hydrocurage (haute pression)",
        },
        {
          type: "p",
          text: "Jet d'eau haute pression (150 à 300 bars) qui détruit les bouchons gras, calcaire, racines. Indispensable pour les canalisations principales et les eaux usées.",
        },
        {
          type: "ul",
          items: [
            "Hydrocurage courant : 180 – 400 €.",
            "Hydrocurage longue distance (>20 m) : 300 – 700 €.",
            "Camion hydrocureur : pour un immeuble ou des canalisations enterrées importantes.",
          ],
        },
        {
          type: "h3",
          text: "Inspection caméra",
        },
        {
          type: "p",
          text: "Caméra étanche introduite dans la canalisation pour identifier la cause (bouchon, fissure, racines, affaissement). Souvent proposée en complément d'un débouchage récurrent.",
        },
        {
          type: "ul",
          items: [
            "Inspection caméra : 100 – 250 €.",
            "Inspection + rapport vidéo : 200 – 350 €.",
          ],
        },
      ],
    },
    {
      id: "facteurs",
      heading: "Les facteurs qui font varier le prix",
      blocks: [
        {
          type: "ol",
          items: [
            "Heure d'intervention : journée (8h-19h), nuit, week-end, jour férié.",
            "Localisation : Paris/grandes villes 10 à 30 % plus cher qu'en zone rurale.",
            "Type de canalisation : intérieur (évier, WC) vs extérieur (regard, fosse).",
            "Distance de l'intervention : forfait déplacement de 30 à 80 €.",
            "Méthode requise : furet < haute pression < hydrocurage camion.",
            "Diamètre et longueur de canalisation.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Majoration nuit/week-end",
          text: "Légalement encadrée mais souvent abusée. Une majoration de 50 à 100 % est acceptable ; au-delà de 200 %, c'est suspect. Demandez le détail du calcul AVANT acceptation. Le débouchage est rarement une urgence vitale : attendre 12 heures économise 100 à 300 €.",
        },
      ],
    },
    {
      id: "tarif-fourchette",
      heading: "Tarifs moyens par type d'intervention",
      blocks: [
        {
          type: "table",
          caption: "Prix moyens 2026 (déplacement + main d'œuvre)",
          headers: ["Intervention", "Jour ouvré", "Week-end / nuit"],
          rows: [
            ["Débouchage évier ou lavabo", "80 – 180 €", "150 – 300 €"],
            ["Débouchage WC", "100 – 220 €", "180 – 350 €"],
            ["Débouchage douche / baignoire", "100 – 200 €", "180 – 320 €"],
            ["Hydrocurage canalisation", "180 – 400 €", "300 – 600 €"],
            ["Inspection caméra", "100 – 250 €", "180 – 350 €"],
            ["Recherche fuite (corrélation)", "300 – 600 €", "—"],
            ["Dégorgement fosse septique", "200 – 500 €", "350 – 700 €"],
          ],
        },
      ],
    },
    {
      id: "qui-paye",
      heading: "Qui paie en location ou en copropriété ?",
      blocks: [
        {
          type: "h3",
          text: "En location",
        },
        {
          type: "p",
          text: "Le décret n°87-712 répartit clairement les charges : le locataire paie l'entretien courant (bouchon de cheveux, gras, lingettes), le propriétaire les défauts d'installation (canalisation cassée, fuite due à la vétusté).",
        },
        {
          type: "ul",
          items: [
            "Bouchon causé par usage normal (cheveux, savon) : locataire.",
            "Bouchon causé par lingettes, jouets, objets : locataire.",
            "Canalisation cassée, racines, affaissement : propriétaire.",
            "Calcaire ancien, vétusté : propriétaire.",
            "Bouchon dans les colonnes communes (copro) : syndic.",
          ],
        },
        {
          type: "h3",
          text: "En copropriété",
        },
        {
          type: "p",
          text: "Les colonnes communes (parties horizontales et verticales jusqu'à la dérivation privative) relèvent du syndic. Les canalisations privatives (du robinet à la colonne) sont à la charge du copropriétaire.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Réflexe à avoir",
          text: "Avant d'appeler un plombier en urgence, contactez votre syndic ou votre propriétaire. Beaucoup ont un contrat avec un prestataire agréé, à tarifs négociés.",
        },
      ],
    },
    {
      id: "prevention",
      heading: "Prévention : éviter les bouchons",
      blocks: [
        {
          type: "ul",
          items: [
            "Installer une grille filtrante dans chaque évacuation.",
            "Ne jamais jeter de gras, marc de café, cotons, lingettes (même « biodégradables ») dans l'évier ou les WC.",
            "Faire couler de l'eau bouillante 1 fois par mois dans l'évier de cuisine.",
            "Détartrer annuellement avec un produit dédié (ou bicarbonate + vinaigre + eau chaude).",
            "En cas de récidive : faire passer un furet préventif tous les 2-3 ans.",
            "Hydrocurer les canalisations principales tous les 5-10 ans en maison individuelle.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Un débouchage de WC est-il une urgence ?",
      a: "Cela dépend. Si vous avez un seul WC dans le logement et qu'il est totalement bouché : oui, intervention rapide justifiée. Si vous avez un autre WC ou pouvez attendre la journée : non, économisez 100-200 € de majoration nocturne.",
    },
    {
      q: "Un plombier peut-il refuser de faire un devis ?",
      a: "Non. Tout dépannage à domicile supérieur à 150 € exige un devis écrit avant intervention (article L. 111-1 Code de la consommation). Pas de devis = pas d'intervention, et motif de plainte.",
    },
    {
      q: "Mon assurance couvre-t-elle un débouchage ?",
      a: "L'assurance habitation couvre les dégâts des eaux causés par un bouchon (carrelage, murs, parquet), mais rarement la prestation de débouchage en elle-même. Vérifiez la clause « assistance plomberie » de votre contrat — certains incluent 300 à 500 €.",
    },
    {
      q: "Combien de temps dure un débouchage standard ?",
      a: "Entre 30 et 90 minutes pour un bouchon classique (évier, WC). Jusqu'à 3 heures pour un hydrocurage longue distance ou un dégorgement fosse. Le temps facturé doit correspondre au temps réel passé sur place.",
    },
    {
      q: "La caméra d'inspection est-elle utile ?",
      a: "Oui en cas de bouchon récidivant (3 fois en 12 mois), de doute sur l'état de la canalisation ou avant un achat immobilier. Elle évite de payer plusieurs débouchages successifs en identifiant la cause profonde.",
    },
  ],
  relatedTrades: ["plombier"],
  related: [
    "devis-travaux-pieges-a-eviter",
    "eviter-arnaque-serrurier",
  ],
};
