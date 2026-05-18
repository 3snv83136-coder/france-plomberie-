import type { Guide } from "./types";

export const maprimerenov2026: Guide = {
  slug: "maprimerenov-2026-guide-complet",
  title: "MaPrimeRénov' 2026 : guide complet, montants et démarches",
  metaTitle: "MaPrimeRénov' 2026 : montants, conditions, démarches (guide officiel)",
  metaDescription:
    "Tout sur MaPrimeRénov' en 2026 : barèmes par catégorie de revenus, travaux éligibles, parcours par geste et parcours accompagné, démarches sur monprojet.anah.gouv.fr.",
  category: "Aides",
  excerpt:
    "MaPrimeRénov' est l'aide principale à la rénovation énergétique en France. En 2026, elle se décline en deux parcours et peut atteindre 70 000 € pour une rénovation d'ampleur.",
  heroIntro:
    "Versée par l'Agence nationale de l'habitat (Anah), MaPrimeRénov' finance les travaux d'économies d'énergie dans les logements de plus de 15 ans. Le dispositif a été refondu pour 2026, avec deux parcours distincts et des barèmes mis à jour. Voici le guide pratique pour ne rien rater.",
  readingMinutes: 13,
  publishedAt: "2026-02-03",
  updatedAt: "2026-05-10",
  author: {
    name: "Camille Renault",
    role: "Conseillère France Rénov' & rédactrice expert",
  },
  keyTakeaways: [
    "Deux parcours : par geste (chauffage seul) ou rénovation d'ampleur (audit + bouquet de travaux).",
    "Barème selon 4 catégories de revenus : Bleu, Jaune, Violet, Rose.",
    "Logement éligible : >15 ans, occupé en résidence principale 8 mois par an.",
    "Demande obligatoirement déposée AVANT signature du devis.",
    "Cumulable avec CEE, Éco-PTZ et aides locales.",
  ],
  sections: [
    {
      id: "principe",
      heading: "Le principe de MaPrimeRénov' en 2026",
      blocks: [
        {
          type: "p",
          text: "MaPrimeRénov' remplace depuis 2020 le crédit d'impôt transition énergétique (CITE) et la subvention Habiter Mieux Agilité de l'Anah. C'est aujourd'hui le principal levier financier pour la rénovation énergétique des logements en France.",
        },
        {
          type: "p",
          text: "En 2026, le dispositif est structuré en deux parcours, selon l'ambition du projet :",
        },
        {
          type: "ul",
          items: [
            "Parcours « par geste » : un seul équipement remplacé (chaudière, fenêtre, isolation d'un mur…).",
            "Parcours « accompagné » : rénovation d'ampleur avec au moins 2 gestes d'isolation et un saut de 2 classes énergétiques (DPE).",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Nouveauté 2026",
          text: "Le parcours accompagné est désormais obligatoire pour les passoires thermiques (étiquette F et G) au-delà d'un certain montant de travaux, avec recours obligatoire à un accompagnateur Mon Accompagnateur Rénov' agréé.",
        },
      ],
    },
    {
      id: "categories",
      heading: "Les 4 catégories de revenus 2026",
      blocks: [
        {
          type: "p",
          text: "Le montant de MaPrimeRénov' dépend de votre revenu fiscal de référence et du nombre de personnes au foyer. Quatre couleurs : Bleu (très modestes), Jaune (modestes), Violet (intermédiaires), Rose (supérieurs).",
        },
        {
          type: "table",
          caption: "Plafonds de revenus 2026 (estimation Île-de-France)",
          headers: ["Personnes au foyer", "Bleu", "Jaune", "Violet", "Rose"],
          rows: [
            ["1", "≤ 23 768 €", "≤ 28 933 €", "≤ 40 404 €", "> 40 404 €"],
            ["2", "≤ 34 884 €", "≤ 42 463 €", "≤ 59 394 €", "> 59 394 €"],
            ["3", "≤ 41 893 €", "≤ 51 000 €", "≤ 71 060 €", "> 71 060 €"],
            ["4", "≤ 48 914 €", "≤ 59 549 €", "≤ 83 637 €", "> 83 637 €"],
            ["5", "≤ 55 961 €", "≤ 68 123 €", "≤ 95 758 €", "> 95 758 €"],
          ],
        },
        {
          type: "callout",
          variant: "info",
          text: "Pour les autres régions, les plafonds sont inférieurs d'environ 25 %. Le simulateur officiel sur france-renov.gouv.fr donne le détail par foyer.",
        },
      ],
    },
    {
      id: "travaux-eligibles",
      heading: "Quels travaux sont éligibles en 2026 ?",
      blocks: [
        {
          type: "h3",
          text: "Chauffage et eau chaude",
        },
        {
          type: "ul",
          items: [
            "Pompe à chaleur air/eau ou géothermique",
            "Chaudière à granulés ou à bûches",
            "Chauffe-eau solaire ou thermodynamique",
            "Raccordement à un réseau de chaleur urbain (vertueux)",
            "Poêle à bois ou à granulés (label Flamme Verte 7*)",
          ],
        },
        {
          type: "h3",
          text: "Isolation",
        },
        {
          type: "ul",
          items: [
            "Isolation des combles (perdus ou aménagés)",
            "Isolation des murs (par l'intérieur ou l'extérieur)",
            "Isolation des planchers bas",
            "Remplacement des fenêtres et portes-fenêtres (uniquement parcours accompagné)",
          ],
        },
        {
          type: "h3",
          text: "Ventilation et audit",
        },
        {
          type: "ul",
          items: [
            "VMC double flux",
            "Audit énergétique préalable (300 à 500 € après aide)",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Non éligibles",
          text: "En 2026 : chaudière gaz neuve (sauf très haute performance dans certains cas), climatisation, panneaux photovoltaïques (relèvent d'aides spécifiques).",
        },
      ],
    },
    {
      id: "montants",
      heading: "Montants par geste et par catégorie",
      blocks: [
        {
          type: "table",
          caption: "Forfaits 2026 par type de travaux (parcours par geste)",
          headers: ["Travaux", "Bleu", "Jaune", "Violet", "Rose"],
          rows: [
            ["PAC air/eau", "5 000 €", "4 000 €", "3 000 €", "0 €"],
            ["PAC géothermique", "11 000 €", "9 000 €", "6 000 €", "0 €"],
            ["Chaudière granulés", "10 000 €", "8 000 €", "4 000 €", "0 €"],
            ["Chauffe-eau solaire", "4 000 €", "3 000 €", "2 000 €", "0 €"],
            ["Isolation combles (€/m²)", "25 €", "20 €", "15 €", "7 €"],
            ["Isolation murs ITE (€/m²)", "75 €", "60 €", "40 €", "15 €"],
            ["VMC double flux", "2 500 €", "2 000 €", "1 500 €", "0 €"],
            ["Audit énergétique", "500 €", "400 €", "300 €", "0 €"],
          ],
        },
        {
          type: "p",
          text: "Pour le parcours accompagné (rénovation d'ampleur), la prime atteint jusqu'à 70 000 € de travaux subventionnés, avec un taux de prise en charge de 30 à 90 % selon les revenus et le saut énergétique réalisé.",
        },
      ],
    },
    {
      id: "demarche",
      heading: "Les démarches étape par étape",
      blocks: [
        {
          type: "ol",
          items: [
            "Estimer son éligibilité sur le simulateur france-renov.gouv.fr.",
            "Réaliser un audit énergétique pour le parcours accompagné (par un auditeur certifié).",
            "Demander 2 à 3 devis à des artisans qualifiés RGE.",
            "Créer son compte sur monprojet.anah.gouv.fr et y déposer la demande AVANT signature.",
            "Attendre la décision favorable (15 jours à 2 mois).",
            "Signer le devis, faire réaliser les travaux.",
            "Transmettre la facture acquittée à l'Anah.",
            "Recevoir le versement de la prime (sous 2 à 4 mois).",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Conseil clé",
          text: "Faites-vous accompagner gratuitement par un conseiller France Rénov' (numéro vert 0 808 800 700 ou conseiller-france-renov.fr). Il vérifie votre projet, vous oriente vers le bon parcours et sécurise votre dossier.",
        },
      ],
    },
    {
      id: "cumuls",
      heading: "Cumul avec les autres aides",
      blocks: [
        {
          type: "table",
          caption: "Cumul possible des aides en 2026",
          headers: ["Aide", "Cumulable avec MaPrimeRénov' ?"],
          rows: [
            ["CEE (Certificats d'Économie d'Énergie)", "Oui, systématiquement"],
            ["Éco-PTZ jusqu'à 30 000 €", "Oui"],
            ["TVA réduite à 5,5 %", "Oui"],
            ["Aides locales (région, EPCI)", "Oui, dans la limite du coût"],
            ["Chèque énergie", "Oui"],
            ["Coup de pouce chauffage", "Oui (pour ménages modestes)"],
          ],
        },
      ],
    },
    {
      id: "pieges",
      heading: "Les 5 pièges à éviter",
      blocks: [
        {
          type: "ol",
          items: [
            "Signer le devis avant le dépôt de la demande MaPrimeRénov' (= aucune aide).",
            "Choisir un artisan non RGE (= aucune aide).",
            "Démarchage à domicile ou téléphonique : signaler à signal.conso.gouv.fr.",
            "Sous-évaluer le reste à charge : prévoir au moins 20-30 % de fonds propres.",
            "Oublier de cumuler avec les CEE : c'est automatique mais à demander à l'artisan.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Fraude MaPrimeRénov'",
          text: "L'Anah a constaté une explosion des arnaques en 2024-2025. Si on vous appelle au nom de l'État ou de l'Anah : raccrochez. Ces organismes ne démarchent jamais. Vérifiez tout sur france-renov.gouv.fr.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Qui peut bénéficier de MaPrimeRénov' en 2026 ?",
      a: "Les propriétaires occupants, bailleurs et copropriétaires (en copropriété : aides MaPrimeRénov' Copropriétés), pour une résidence principale construite depuis plus de 15 ans, occupée 8 mois par an au minimum.",
    },
    {
      q: "Combien de temps pour recevoir la prime ?",
      a: "Comptez 2 à 4 mois entre la transmission de la facture acquittée et le virement. Pour les ménages très modestes, une avance de 70 % est possible dès l'acceptation du dossier (avant travaux).",
    },
    {
      q: "Puis-je faire la demande après les travaux ?",
      a: "Non. La demande doit obligatoirement être déposée AVANT la signature du devis. Toute demande postérieure aux travaux est rejetée.",
    },
    {
      q: "Quel revenu fiscal de référence est pris en compte ?",
      a: "Le revenu fiscal de référence (RFR) de l'année N-2 figurant sur votre avis d'imposition. Pour une demande en 2026, c'est donc le RFR 2024.",
    },
    {
      q: "MaPrimeRénov' s'applique-t-elle aux locataires ?",
      a: "Non, sauf si le locataire est aussi propriétaire bailleur d'un autre bien. Pour un locataire, ce sont au propriétaire bailleur de faire la demande.",
    },
  ],
  relatedTrades: ["chauffagiste", "plombier", "electricien", "couvreur"],
  related: [
    "prix-changement-chaudiere-2026",
    "isolation-combles-prix-aides",
    "trouver-artisan-rge",
    "aides-travaux-2026",
  ],
};
