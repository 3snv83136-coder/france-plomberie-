import type { Guide } from "./types";

export const isolationComblesPrixAides: Guide = {
  slug: "isolation-combles-prix-aides",
  title: "Isolation des combles en 2026 : prix au m² et aides cumulables",
  metaTitle: "Isolation combles 2026 : prix au m², matériaux, aides",
  metaDescription:
    "Quel prix pour isoler ses combles en 2026 ? Soufflage, déroulage, sarking : tarifs au m², matériaux (laine, ouate), MaPrimeRénov' et CEE. Guide complet.",
  category: "Travaux",
  excerpt:
    "Isoler ses combles coûte de 20 à 80 € le m² selon la technique et le matériau. C'est le geste de rénovation au meilleur rapport coût/économies : jusqu'à 30 % de chauffage en moins.",
  heroIntro:
    "30 % des déperditions thermiques d'une maison passent par la toiture mal isolée. Isoler ses combles est donc le geste de rénovation énergétique le plus rentable, avec un retour sur investissement de 2 à 5 ans seulement. Voici les techniques, les matériaux et les aides 2026.",
  readingMinutes: 9,
  publishedAt: "2026-02-18",
  updatedAt: "2026-05-12",
  author: {
    name: "Sébastien Vidal",
    role: "Couvreur-charpentier (20 ans d'expérience)",
  },
  keyTakeaways: [
    "Combles perdus : 20 à 40 €/m² (soufflage ou déroulage).",
    "Combles aménagés : 50 à 80 €/m² (panneaux ou rouleaux entre chevrons).",
    "Sarking (par l'extérieur) : 150 à 250 €/m², en réfection de toiture.",
    "Aides MaPrimeRénov' + CEE peuvent couvrir 70 à 100 % du coût pour les ménages modestes.",
    "Économies de chauffage : 25 à 35 % dès la première année.",
  ],
  sections: [
    {
      id: "techniques",
      heading: "Les 3 techniques d'isolation des combles",
      blocks: [
        {
          type: "h3",
          text: "1. Soufflage (combles perdus)",
        },
        {
          type: "p",
          text: "L'isolant est projeté en flocons par une machine cardeuse, pour former une couche homogène de 30 à 40 cm. C'est la solution la plus rapide (1 jour pour 100 m²) et la plus économique. Adaptée aux combles non aménagés et difficiles d'accès.",
        },
        {
          type: "h3",
          text: "2. Déroulage (combles perdus)",
        },
        {
          type: "p",
          text: "Pose de rouleaux d'isolant entre les solives de plancher, en deux couches croisées pour limiter les ponts thermiques. Plus précis que le soufflage, mais nécessite un accès au plancher.",
        },
        {
          type: "h3",
          text: "3. Sarking (combles aménagés)",
        },
        {
          type: "p",
          text: "Isolation par l'extérieur, posée au-dessus de la charpente, sous la couverture. Réalisée lors d'une réfection de toiture, c'est la technique la plus performante (zéro pont thermique, conservation de l'espace habitable).",
        },
        {
          type: "callout",
          variant: "info",
          title: "Combles aménagés sans réfection ?",
          text: "Pour des combles déjà aménagés sans toucher à la toiture, l'isolation se fait entre et sous chevrons (à l'intérieur), avec une finition placo. Cela réduit légèrement la hauteur sous plafond mais coûte 2 à 3 fois moins cher qu'un sarking.",
        },
      ],
    },
    {
      id: "materiaux",
      heading: "Quel matériau choisir ?",
      blocks: [
        {
          type: "table",
          caption: "Matériaux d'isolation : performances et prix au m²",
          headers: ["Matériau", "λ (W/m.K)", "Prix fourniture", "Bilan"],
          rows: [
            ["Laine de verre", "0,032 – 0,040", "8 – 15 €/m²", "Économique, pose facile"],
            ["Laine de roche", "0,034 – 0,041", "10 – 18 €/m²", "Résistant au feu, phonique"],
            ["Ouate de cellulose", "0,038 – 0,042", "15 – 25 €/m²", "Écologique, déphasage++"],
            ["Laine de bois", "0,038 – 0,049", "20 – 35 €/m²", "Écologique, dense"],
            ["Polyuréthane (PIR)", "0,022 – 0,028", "25 – 45 €/m²", "Très performant, faible épaisseur"],
            ["Liège expansé", "0,038 – 0,041", "30 – 50 €/m²", "Bio-sourcé, durable"],
          ],
        },
        {
          type: "p",
          text: "Pour un comble perdu, l'objectif réglementaire est une résistance thermique R ≥ 7 m².K/W (équivalent à 30 cm de laine de verre). En sarking ou combles aménagés, viser R ≥ 6 m².K/W.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Bonus écologique",
          text: "Choisir un isolant biosourcé (ouate, laine de bois, chanvre) ouvre droit à un bonus MaPrimeRénov' dans plusieurs régions (Bretagne, Pays de la Loire, Auvergne-Rhône-Alpes…) — jusqu'à 5 €/m² supplémentaires.",
        },
      ],
    },
    {
      id: "prix-detailles",
      heading: "Prix détaillés au m² en 2026",
      blocks: [
        {
          type: "table",
          caption: "Coût total fourniture + pose (avant aides)",
          headers: ["Technique", "Prix bas", "Prix moyen", "Prix haut"],
          rows: [
            ["Soufflage combles perdus", "20 €/m²", "28 €/m²", "40 €/m²"],
            ["Déroulage combles perdus", "25 €/m²", "35 €/m²", "50 €/m²"],
            ["Isolation entre/sous chevrons", "50 €/m²", "65 €/m²", "80 €/m²"],
            ["Sarking par l'extérieur", "150 €/m²", "200 €/m²", "250 €/m²"],
          ],
        },
      ],
    },
    {
      id: "aides",
      heading: "Les aides 2026 pour l'isolation",
      blocks: [
        {
          type: "p",
          text: "L'isolation des combles est l'un des travaux les plus aidés en France. En cumulant les dispositifs, certains ménages bénéficient d'un reste à charge proche de zéro.",
        },
        {
          type: "table",
          caption: "MaPrimeRénov' isolation des combles (parcours par geste, €/m²)",
          headers: ["Catégorie", "Combles perdus", "Combles aménagés"],
          rows: [
            ["Bleu (très modeste)", "25 €/m²", "25 €/m²"],
            ["Jaune (modeste)", "20 €/m²", "20 €/m²"],
            ["Violet (intermédiaire)", "15 €/m²", "15 €/m²"],
            ["Rose (supérieur)", "7 €/m²", "7 €/m²"],
          ],
        },
        {
          type: "p",
          text: "À cela s'ajoute la prime CEE « Coup de pouce isolation » (5 à 15 €/m² selon le revenu) et la TVA à 5,5 %. Pour un ménage Bleu, le reste à charge pour 100 m² de combles soufflés peut être de 200 à 500 € seulement.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Méfiance avec l'« isolation à 1 € »",
          text: "Les offres « isolation des combles à 1 € » ont été massivement dévoyées par des arnaqueurs. Le dispositif a été encadré : aujourd'hui, le reste à charge minimum est de 10 % du coût pour les ménages très modestes. Toute offre à 1 € est suspecte.",
        },
      ],
    },
    {
      id: "etapes",
      heading: "Les étapes d'un chantier d'isolation",
      blocks: [
        {
          type: "ol",
          items: [
            "Diagnostic technique : état de la charpente, présence d'humidité, ventilation, conduits.",
            "Choix de la technique et du matériau adaptés.",
            "Demande de 2 à 3 devis à des artisans RGE.",
            "Dépôt MaPrimeRénov' et CEE avant signature.",
            "Préparation du chantier (vidage des combles, traitement parasitaire si nécessaire).",
            "Pose de l'isolant et finitions (pare-vapeur, jonctions).",
            "Pose de repères de niveau et de protections sur les boîtiers électriques.",
            "Contrôle final et attestation thermique.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Combien d'épaisseur d'isolant faut-il prévoir ?",
      a: "En combles perdus, l'objectif est une résistance thermique R ≥ 7 m².K/W, soit 30 à 40 cm de laine de verre, 25-30 cm de ouate de cellulose, ou 12-15 cm de polyuréthane. Plus l'épaisseur est forte, plus l'efficacité hivernale ET estivale est grande.",
    },
    {
      q: "Comment isoler en présence d'humidité dans les combles ?",
      a: "Traiter d'abord l'humidité (fuite de toiture, condensation, défaut de ventilation) avant tout isolant. Sans cela, l'isolant absorbera l'humidité, perdra son efficacité et pourra dégrader la charpente. Faites intervenir un couvreur en amont.",
    },
    {
      q: "L'isolation diminue-t-elle la hauteur sous plafond ?",
      a: "En combles perdus non aménagés : non, puisque l'isolant est posé sur le plancher des combles. En combles aménagés isolés par l'intérieur : oui, perte de 15 à 25 cm. Le sarking préserve la hauteur intérieure.",
    },
    {
      q: "Quelle durée de vie pour un isolant ?",
      a: "Laine minérale et ouate de cellulose : 30 à 50 ans si bien posées (sans tassement, sans humidité). Laine de bois et chanvre : 50 ans+. Polyuréthane : 50 ans+. Le respect du pare-vapeur et de la ventilation est essentiel à la longévité.",
    },
    {
      q: "Peut-on isoler soi-même ses combles ?",
      a: "Techniquement oui, mais on perd alors le bénéfice de MaPrimeRénov' (fournitures éligibles mais pas la pose). Le ROI financier est presque toujours meilleur en passant par un artisan RGE et en captant les aides.",
    },
  ],
  relatedTrades: ["couvreur", "plaquiste", "menuisier"],
  related: [
    "maprimerenov-2026-guide-complet",
    "pompe-a-chaleur-prix-2026",
    "aides-travaux-2026",
    "trouver-artisan-rge",
  ],
};
