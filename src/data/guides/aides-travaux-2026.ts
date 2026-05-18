import type { Guide } from "./types";

export const aidesTravaux2026: Guide = {
  slug: "aides-travaux-2026",
  title: "Toutes les aides aux travaux en 2026 : le récap complet",
  metaTitle: "Aides travaux 2026 : MaPrimeRénov', CEE, Éco-PTZ, TVA",
  metaDescription:
    "Le guide récap de toutes les aides aux travaux en 2026 : MaPrimeRénov', CEE, Éco-PTZ, TVA 5,5 %, MaPrimeAdapt', chèque énergie, aides locales. Plafonds et conditions.",
  category: "Aides",
  excerpt:
    "Plus de 10 aides cumulables existent en 2026 pour financer vos travaux. De MaPrimeRénov' à l'Éco-PTZ en passant par les CEE et les aides locales, voici le panorama complet.",
  heroIntro:
    "Naviguer dans les aides aux travaux en France est devenu un sujet à part entière, tant les dispositifs se sont multipliés. La bonne nouvelle : ils sont presque tous cumulables, et certains ménages voient jusqu'à 90 % de leurs travaux pris en charge. Voici le panorama 2026 à jour.",
  readingMinutes: 11,
  publishedAt: "2026-02-08",
  updatedAt: "2026-05-16",
  author: {
    name: "Claire Moreau",
    role: "Conseillère France Rénov'",
  },
  keyTakeaways: [
    "MaPrimeRénov' : aide principale pour la rénovation énergétique, jusqu'à 70 000 € de travaux subventionnés.",
    "CEE : prime versée par les énergéticiens, cumulable avec MaPrimeRénov'.",
    "Éco-PTZ : prêt à taux zéro jusqu'à 30 000 €, sans condition de ressources.",
    "TVA à 5,5 % : sur la majorité des travaux énergétiques.",
    "MaPrimeAdapt' : pour les seniors et personnes en situation de handicap.",
    "Chèque énergie : 48 à 277 € selon revenus, à demander automatiquement.",
  ],
  sections: [
    {
      id: "maprimerenov",
      heading: "MaPrimeRénov' (Anah)",
      blocks: [
        {
          type: "p",
          text: "Aide forfaitaire de l'Agence nationale de l'habitat (Anah), réservée aux logements de plus de 15 ans. Elle se décline en deux parcours en 2026 : par geste et accompagné. Voir notre guide dédié pour le détail des montants par catégorie de revenu.",
        },
        {
          type: "ul",
          items: [
            "Conditions : propriétaire occupant ou bailleur, logement >15 ans, résidence principale 8 mois/an.",
            "Travaux : chauffage, isolation, ventilation, audit énergétique.",
            "Plafond : jusqu'à 70 000 € pour une rénovation d'ampleur.",
            "Cumul : oui avec CEE, Éco-PTZ, TVA 5,5 %, aides locales.",
            "Démarche : dossier déposé sur monprojet.anah.gouv.fr AVANT signature.",
          ],
        },
      ],
    },
    {
      id: "cee",
      heading: "Certificats d'Économie d'Énergie (CEE)",
      blocks: [
        {
          type: "p",
          text: "Mécanisme français qui oblige les fournisseurs d'énergie (TotalEnergies, EDF, Engie, Auchan…) à financer des travaux d'économie d'énergie pour leurs clients. La prime CEE est négociée directement avec un partenaire (signature avant devis !) puis versée après travaux.",
        },
        {
          type: "ul",
          items: [
            "Conditions : tous propriétaires, locataires (avec accord), tous logements.",
            "Montants : variables selon le travaux et la zone climatique. Pour une PAC : 2 500 – 5 000 €.",
            "« Coup de pouce chauffage » : prime CEE bonifiée pour les ménages modestes.",
            "Demande à faire AVANT signature du devis (sinon prime perdue).",
            "Cumulable avec MaPrimeRénov' : oui.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Faux CEE et démarchage",
          text: "Le démarchage téléphonique pour les CEE a été interdit en 2020. Si on vous appelle pour une « prime gouvernementale », c'est une arnaque. Vérifiez les fiches sur ecologie.gouv.fr et passez par un site officiel ou directement votre fournisseur d'énergie.",
        },
      ],
    },
    {
      id: "eco-ptz",
      heading: "Éco-prêt à taux zéro (Éco-PTZ)",
      blocks: [
        {
          type: "p",
          text: "Prêt sans intérêts, distribué par les banques, pour financer la rénovation énergétique. Pas de condition de ressources, mais le logement doit avoir plus de 2 ans.",
        },
        {
          type: "ul",
          items: [
            "Montant : jusqu'à 30 000 € (50 000 € pour rénovation d'ampleur).",
            "Durée : 20 ans maximum.",
            "Travaux : isolation, chauffage, ventilation, fenêtres, audit.",
            "Cumulable avec MaPrimeRénov' et CEE : oui.",
            "Demande auprès de votre banque (toutes les banques distribuent l'Éco-PTZ).",
          ],
        },
      ],
    },
    {
      id: "tva",
      heading: "TVA réduite à 5,5 % et 10 %",
      blocks: [
        {
          type: "p",
          text: "Pour les travaux dans un logement de plus de 2 ans, deux taux préférentiels s'appliquent.",
        },
        {
          type: "table",
          headers: ["Taux", "Travaux concernés"],
          rows: [
            ["5,5 %", "Travaux d'amélioration de la performance énergétique (PAC, isolation, chaudière performante, ventilation, audit)"],
            ["10 %", "Tous les autres travaux d'amélioration, transformation, aménagement, entretien"],
            ["20 %", "Construction neuve, agrandissement >9 m², piscine, équipement électroménager"],
          ],
        },
        {
          type: "p",
          text: "La TVA réduite s'applique automatiquement sur le devis de l'artisan, dès lors que vous remplissez et signez une attestation simplifiée. Aucune démarche supplémentaire.",
        },
      ],
    },
    {
      id: "maprimeadapt",
      heading: "MaPrimeAdapt' (adaptation au vieillissement)",
      blocks: [
        {
          type: "p",
          text: "Aide nationale lancée en 2024 pour adapter le logement au vieillissement ou au handicap. Versée par l'Anah, elle finance les travaux d'accessibilité et de sécurité.",
        },
        {
          type: "ul",
          items: [
            "Bénéficiaires : ≥60 ans (avec GIR 1-6) ou personnes handicapées.",
            "Travaux : douche italienne, monte-escalier, WC surélevés, barres d'appui, élargissement portes.",
            "Plafond : 70 % du coût des travaux pour ménages très modestes (50 % modestes, 35 % intermédiaires).",
            "Plafond travaux : 22 000 € HT.",
            "Démarche : sur monprojet.anah.gouv.fr.",
          ],
        },
      ],
    },
    {
      id: "cheque-energie",
      heading: "Chèque énergie",
      blocks: [
        {
          type: "p",
          text: "Aide nationale automatique envoyée chaque année (entre avril et mai) aux ménages aux revenus modestes. Sert à payer les factures d'énergie ou financer des travaux d'amélioration.",
        },
        {
          type: "ul",
          items: [
            "Montant : 48 à 277 € selon le revenu fiscal de référence et la composition du foyer.",
            "Bénéficiaires : ~5,8 millions de foyers chaque année.",
            "Démarche : aucune (envoi automatique par l'administration fiscale).",
            "Utilisation : factures d'énergie ou travaux RGE.",
            "Validité : 1 an, prolongeable 1 an supplémentaire.",
          ],
        },
      ],
    },
    {
      id: "aides-locales",
      heading: "Aides locales (régions, départements, EPCI)",
      blocks: [
        {
          type: "p",
          text: "De nombreuses collectivités proposent leurs propres aides à la rénovation, parfois très généreuses : bonus pour les isolants biosourcés, prime à la conversion fioul, aide à l'audit, aide à la rénovation globale, etc.",
        },
        {
          type: "ul",
          items: [
            "Île-de-France : aide « rénovation énergétique » jusqu'à 7 500 €.",
            "Bretagne : prime « rénovation globale » jusqu'à 5 000 €.",
            "Auvergne-Rhône-Alpes : aide « rénovation lourde » jusqu'à 4 000 €.",
            "Pays de la Loire : « Pacte régional habitat » jusqu'à 3 500 €.",
            "Et plus de 200 communautés de communes avec leurs propres dispositifs.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Où vérifier les aides locales ?",
          text: "Le simulateur officiel france-renov.gouv.fr croise votre code postal et votre revenu pour lister TOUTES les aides cumulables disponibles, locales incluses. C'est le réflexe n°1.",
        },
      ],
    },
    {
      id: "aides-specifiques",
      heading: "Aides spécifiques (CAF, Action Logement, ANAH)",
      blocks: [
        {
          type: "h3",
          text: "Action Logement",
        },
        {
          type: "p",
          text: "Prêt à 1 % pour les salariés du secteur privé non agricole. Jusqu'à 10 000 € pour des travaux d'amélioration. Remboursable sur 10 ans.",
        },
        {
          type: "h3",
          text: "Loc'Avantages (Anah)",
        },
        {
          type: "p",
          text: "Dispositif pour les propriétaires bailleurs : aide aux travaux + réduction d'impôt en échange d'un loyer modéré.",
        },
        {
          type: "h3",
          text: "Prêt CAF / MSA",
        },
        {
          type: "p",
          text: "Prêts à taux préférentiel pour amélioration de l'habitat, sous conditions de ressources. Plafonds variables selon les caisses départementales.",
        },
      ],
    },
    {
      id: "demarches",
      heading: "L'ordre des démarches à respecter",
      blocks: [
        {
          type: "ol",
          items: [
            "Simuler son éligibilité sur france-renov.gouv.fr (5 minutes).",
            "Contacter un conseiller France Rénov' (gratuit, indépendant).",
            "Faire réaliser un audit énergétique (pour parcours accompagné MaPrimeRénov').",
            "Demander 2-3 devis à des artisans RGE.",
            "Déposer la demande MaPrimeRénov' sur monprojet.anah.gouv.fr.",
            "Signer la convention CEE auprès d'un partenaire avant devis.",
            "Demander un Éco-PTZ à votre banque (offre du devis).",
            "Signer le devis APRÈS accord des aides.",
            "Réaliser les travaux.",
            "Envoyer factures acquittées → réception des aides sous 2-4 mois.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Toutes les aides sont-elles cumulables entre elles ?",
      a: "Dans la quasi-totalité des cas, oui : MaPrimeRénov', CEE, Éco-PTZ, TVA réduite, aides locales, chèque énergie. Le seul plafond est le coût TTC des travaux (vous ne pouvez pas être subventionné au-delà de 100 %).",
    },
    {
      q: "Faut-il forcément un artisan RGE pour toutes les aides ?",
      a: "Pour MaPrimeRénov', les CEE et l'Éco-PTZ : oui, sans exception. Pour la TVA à 5,5 % et le chèque énergie : non, mais la TVA 5,5 % concerne uniquement les travaux énergétiques éligibles.",
    },
    {
      q: "Puis-je faire une demande après les travaux ?",
      a: "Non pour MaPrimeRénov' et CEE : la demande doit être déposée AVANT signature du devis, sous peine de perte totale de l'aide. Pour l'Éco-PTZ et la TVA, c'est possible a posteriori sous conditions.",
    },
    {
      q: "Quel délai pour toucher les aides ?",
      a: "MaPrimeRénov' : 2 à 4 mois après envoi de la facture acquittée. CEE : 1 à 3 mois selon l'organisme. Éco-PTZ : versé directement à l'artisan. Aides locales : 3 à 12 mois selon les collectivités.",
    },
    {
      q: "Je suis locataire, ai-je droit à des aides ?",
      a: "Le chèque énergie est versé à tous (selon ressources, propriétaire ou locataire). MaPrimeRénov' et les CEE sont prioritairement pour le propriétaire bailleur. En tant que locataire, sollicitez votre bailleur ou demandez une réduction de loyer en contrepartie.",
    },
  ],
  relatedTrades: ["chauffagiste", "couvreur", "plombier", "electricien"],
  related: [
    "maprimerenov-2026-guide-complet",
    "prix-changement-chaudiere-2026",
    "isolation-combles-prix-aides",
    "trouver-artisan-rge",
  ],
};
