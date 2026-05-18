import type { Guide } from "./types";

export const trouverArtisanRge: Guide = {
  slug: "trouver-artisan-rge",
  title: "Comment trouver un artisan RGE en 2026 ? Le guide complet",
  metaTitle: "Trouver un artisan RGE : guide officiel 2026 (Qualibat, QualiPAC)",
  metaDescription:
    "Pourquoi et comment trouver un artisan RGE en 2026 ? Différences entre Qualibat, QualiPAC, Qualibois. Vérifier la qualification, éviter les fraudes.",
  category: "Conseils",
  excerpt:
    "La qualification RGE est obligatoire pour bénéficier de MaPrimeRénov', des CEE et de l'Éco-PTZ. Voici comment vérifier qu'un artisan est bien qualifié, et éviter les faux RGE.",
  heroIntro:
    "« Reconnu Garant de l'Environnement » (RGE) est un label délivré par 6 organismes accrédités, garantissant la compétence d'un artisan pour les travaux d'économies d'énergie. Sans ce label, pas d'aides MaPrimeRénov' ni de CEE. Décryptage du système et des bonnes pratiques.",
  readingMinutes: 8,
  publishedAt: "2026-03-02",
  updatedAt: "2026-05-14",
  author: {
    name: "Claire Moreau",
    role: "Conseillère France Rénov'",
  },
  keyTakeaways: [
    "Le RGE est obligatoire pour toucher MaPrimeRénov', CEE et Éco-PTZ.",
    "Plusieurs qualifications selon le métier : Qualibat, QualiPAC, Qualibois, Qualifelec, Qualisol…",
    "Vérification gratuite sur france-renov.gouv.fr ou faire-renov.gouv.fr.",
    "La validité est annuelle, à renouveler chaque année.",
    "Méfiance avec les « faux RGE » : numéro expiré, falsifié ou inexistant.",
  ],
  sections: [
    {
      id: "principe",
      heading: "Qu'est-ce que le label RGE ?",
      blocks: [
        {
          type: "p",
          text: "Créé en 2011 par l'État, l'ADEME et les organismes de qualification, le label RGE (Reconnu Garant de l'Environnement) atteste qu'un artisan est formé, compétent et contrôlé pour réaliser des travaux d'amélioration énergétique : isolation, chauffage, ventilation, énergies renouvelables.",
        },
        {
          type: "p",
          text: "L'éco-conditionnalité des aides publiques implique que les particuliers ne peuvent toucher MaPrimeRénov', les CEE, l'Éco-PTZ ou la TVA 5,5 % qu'à condition d'avoir fait appel à un artisan RGE.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Pas RGE = pas d'aides",
          text: "Même si vos travaux sont éligibles en théorie, ils ne le seront pas en pratique sans un artisan RGE qualifié pour le type de travaux concerné. Vérifiez la qualification AVANT signature.",
        },
      ],
    },
    {
      id: "qualifications",
      heading: "Les principales qualifications RGE",
      blocks: [
        {
          type: "table",
          caption: "Qualifications RGE par type de travaux",
          headers: ["Qualification", "Travaux couverts", "Organisme"],
          rows: [
            ["Qualibat RGE", "Isolation, gros œuvre, charpente, couverture", "Qualibat"],
            ["QualiPAC", "Pompes à chaleur (air/eau, géothermique)", "Qualit'EnR"],
            ["Qualibois", "Chaudière et poêles à bois/granulés", "Qualit'EnR"],
            ["Qualisol", "Solaire thermique (chauffe-eau, capteurs)", "Qualit'EnR"],
            ["QualiPV", "Photovoltaïque", "Qualit'EnR"],
            ["Qualifelec RGE", "Installations électriques performantes", "Qualifelec"],
            ["Eco Artisan", "Travaux d'isolation et menuiseries", "CAPEB"],
            ["Les Pros de la performance énergétique", "Multi-travaux", "FFB"],
          ],
        },
        {
          type: "p",
          text: "Un même artisan peut détenir plusieurs qualifications (par exemple Qualibat + QualiPAC). Chaque qualification correspond à un domaine précis : un chauffagiste QualiPAC ne peut pas, à lui seul, vous faire toucher MaPrimeRénov' pour de l'isolation.",
        },
      ],
    },
    {
      id: "verifier",
      heading: "Comment vérifier un artisan RGE ?",
      blocks: [
        {
          type: "h3",
          text: "Méthode officielle",
        },
        {
          type: "ol",
          items: [
            "Rendez-vous sur france-renov.gouv.fr, rubrique « Trouver un professionnel RGE ».",
            "Entrez le SIRET, le nom de l'entreprise ou son code postal.",
            "Vérifiez la qualification précise (Qualibat 8631, QualiPAC, etc.) et sa date de validité.",
            "Demandez à l'artisan une copie du certificat papier, qui doit comporter le numéro et la date d'échéance.",
            "Contre-vérifiez la qualification sur le site de l'organisme (qualibat.com, qualit-enr.org).",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Les fraudes courantes",
          text: "Numéro RGE expiré ou révoqué, qualification inadéquate au travaux, « RGE en cours d'obtention », faux logos sur devis, sous-traitance à un non-RGE… Une qualification RGE non vérifiée = un risque de perdre toutes vos aides.",
        },
      ],
    },
    {
      id: "obligations",
      heading: "Les obligations d'un artisan RGE",
      blocks: [
        {
          type: "ul",
          items: [
            "Formation initiale obligatoire (3 à 4 jours) + recyclage triennal.",
            "Contrôle de chantier sur site par l'organisme de qualification, dans les 2 premières années.",
            "Audit administratif (référence client, assurance, sinistralité).",
            "Renouvellement annuel de la qualification (paiement de la cotisation et mise à jour).",
            "Souscription obligatoire d'une assurance décennale couvrant l'activité visée.",
          ],
        },
      ],
    },
    {
      id: "bonnes-pratiques",
      heading: "Bonnes pratiques pour bien choisir",
      blocks: [
        {
          type: "ol",
          items: [
            "Demandez systématiquement 3 devis détaillés pour comparer.",
            "Préférez un artisan local : meilleur SAV, frais de déplacement réduits.",
            "Vérifiez les avis clients sur plusieurs plateformes (PagesJaunes, Google, Artisans Près De Chez Vous).",
            "Demandez des références chantiers similaires au vôtre.",
            "Examinez la composition du devis : marques d'équipements, références, garanties.",
            "Refusez les devis « tout compris » sans détail des postes.",
            "Vérifiez le sous-traitance éventuelle : tout sous-traitant doit aussi être RGE.",
            "Méfiez-vous du démarchage téléphonique ou à domicile (souvent fraude).",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Bon réflexe",
          text: "Le portail france-renov.gouv.fr propose un service gratuit de conseil indépendant. Un conseiller peut vérifier la cohérence de votre projet, la conformité du devis et l'éligibilité aux aides — avant signature.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Un artisan peut-il perdre sa qualification RGE ?",
      a: "Oui. En cas de manquements graves (malfaçons répétées, sinistralité élevée, non-renouvellement, fraude), l'organisme de qualification peut suspendre ou retirer le label. Le délai entre constat et retrait varie de 3 à 12 mois.",
    },
    {
      q: "Que faire si mon artisan RGE arrête son activité avant la fin des travaux ?",
      a: "L'assurance décennale couvre les malfaçons pendant 10 ans, même si l'entreprise disparaît. Pour les aides MaPrimeRénov', si l'artisan n'achève pas les travaux, le dossier est généralement bloqué : récupérez les paiements partiels et reprenez avec un nouveau RGE (nouvel attestation = nouveau dossier possible).",
    },
    {
      q: "Le RGE est-il valable pour tous les types de travaux ?",
      a: "Non, chaque qualification couvre un périmètre précis. Un Qualibat 7131 (isolation thermique) ne permet pas de toucher des aides pour une chaudière. Vérifiez que le numéro de qualification correspond bien aux travaux prévus.",
    },
    {
      q: "Combien coûte la qualification RGE pour l'artisan ?",
      a: "La cotisation annuelle est de 500 à 1 200 € selon l'organisme et le nombre de qualifications. Cela représente un investissement significatif pour les artisans, qui ne le maintiennent que s'ils traitent suffisamment de chantiers éligibles.",
    },
    {
      q: "Le label RGE garantit-il la qualité des travaux ?",
      a: "Il garantit un niveau minimum de formation et un contrôle administratif, mais n'est pas une garantie absolue de qualité technique. Croisez avec les avis clients, les références chantiers et les certifications complémentaires (Qualibat « mention », ProRenove…).",
    },
  ],
  relatedTrades: ["chauffagiste", "plombier", "couvreur", "electricien", "plaquiste"],
  related: [
    "maprimerenov-2026-guide-complet",
    "prix-changement-chaudiere-2026",
    "isolation-combles-prix-aides",
    "devis-travaux-pieges-a-eviter",
  ],
};
