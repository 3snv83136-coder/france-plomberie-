import type { Guide } from "./types";

export const prixChangementChaudiere2026: Guide = {
  slug: "prix-changement-chaudiere-2026",
  title: "Prix changement de chaudière en 2026 : combien ça coûte vraiment ?",
  metaTitle: "Prix changement de chaudière 2026 : tarifs, devis et aides",
  metaDescription:
    "Combien coûte le remplacement d'une chaudière en 2026 ? Tarifs gaz, fioul, granulés, pompe à chaleur, aides MaPrimeRénov' et CEE. Guide complet pour bien choisir.",
  category: "Prix",
  excerpt:
    "Remplacer sa chaudière coûte entre 3 000 € et 25 000 € en 2026 selon la technologie choisie, hors aides. Voici le détail des tarifs, des coûts annexes et des aides cumulables.",
  heroIntro:
    "Le coût total d'un changement de chaudière en 2026 dépend du combustible (gaz, granulés, électrique), du modèle (à condensation, hybride, pompe à chaleur), des travaux annexes (raccordement, dépose, fumisterie) et surtout des aides financières mobilisables. Voici un guide complet, fourchettes de prix à jour et arbitrages clés.",
  readingMinutes: 11,
  publishedAt: "2026-01-12",
  updatedAt: "2026-05-15",
  author: {
    name: "Thomas Bertrand",
    role: "Chauffagiste & rédacteur expert énergie",
  },
  keyTakeaways: [
    "Chaudière à condensation gaz : 3 000 – 7 000 € pose comprise.",
    "Pompe à chaleur air/eau : 10 000 – 18 000 € avant aides.",
    "MaPrimeRénov' + CEE peuvent couvrir 30 à 90 % du coût pour une PAC ou une chaudière biomasse.",
    "La chaudière fioul est interdite à l'installation neuve depuis juillet 2022 — uniquement remplacement de l'existante sous conditions.",
    "L'entretien annuel est obligatoire (décret n°2020-912).",
  ],
  sections: [
    {
      id: "vue-densemble",
      heading: "Vue d'ensemble des prix en 2026",
      blocks: [
        {
          type: "p",
          text: "Le tableau ci-dessous résume les prix moyens pose comprise, hors aides, observés en France métropolitaine en 2026. Les fourchettes intègrent la dépose de l'ancien appareil, le raccordement et la mise en service.",
        },
        {
          type: "table",
          caption: "Prix moyens 2026, fourniture + pose, avant aides",
          headers: ["Type de chaudière", "Prix bas", "Prix moyen", "Prix haut"],
          rows: [
            ["Chaudière gaz à condensation", "3 000 €", "5 000 €", "7 000 €"],
            ["Chaudière fioul (remplacement)", "4 500 €", "7 000 €", "10 000 €"],
            ["Chaudière biomasse (granulés)", "12 000 €", "16 000 €", "22 000 €"],
            ["Chaudière électrique", "1 500 €", "3 000 €", "6 000 €"],
            ["Pompe à chaleur air/eau", "10 000 €", "13 500 €", "18 000 €"],
            ["Pompe à chaleur géothermique", "18 000 €", "23 000 €", "30 000 €"],
            ["Chaudière hybride gaz + PAC", "8 000 €", "11 000 €", "15 000 €"],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Pourquoi un tel écart ?",
          text: "Les écarts s'expliquent par la puissance nécessaire (kW), la marque, l'accessibilité du chantier, l'éloignement géographique de l'artisan et l'éventuelle nécessité de travaux annexes (fumisterie, plancher chauffant, ballon tampon).",
        },
      ],
    },
    {
      id: "facteurs-prix",
      heading: "Les 7 facteurs qui font varier le prix",
      blocks: [
        {
          type: "ol",
          items: [
            "La puissance de l'appareil (kW), calibrée selon la surface chauffée et l'isolation.",
            "Le combustible (gaz, granulés, électrique, aérothermie).",
            "Les travaux de dépose et d'évacuation de l'ancienne chaudière (200 – 800 €).",
            "L'adaptation du conduit de fumée et de la VMC.",
            "La pose éventuelle d'un ballon tampon ou d'un préparateur ECS.",
            "Les modifications du circuit hydraulique (vannes, désembouage).",
            "Les frais de mise en service Consuel ou QualiPAC et la garantie.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Le bon réflexe",
          text: "Demandez au minimum 3 devis détaillés. Le poste « pose » doit être ventilé poste par poste (dépose, raccordement, mise en service, garantie). Méfiez-vous des devis ronds (« 8 000 € tout compris »).",
        },
      ],
    },
    {
      id: "aides",
      heading: "Aides financières 2026 : jusqu'à 90 % du coût pris en charge",
      blocks: [
        {
          type: "p",
          text: "Le coût final dépend fortement des aides cumulables. En 2026, voici les dispositifs en vigueur pour le remplacement d'une chaudière, sous condition d'un artisan RGE et d'un logement de plus de 15 ans.",
        },
        {
          type: "h3",
          text: "MaPrimeRénov' (Anah)",
        },
        {
          type: "p",
          text: "Aide forfaitaire versée par l'Anah, accessible à tous les propriétaires occupants ou bailleurs. Le montant dépend de la catégorie de revenus (Bleu, Jaune, Violet, Rose) et du type d'équipement.",
        },
        {
          type: "table",
          caption: "Forfaits MaPrimeRénov' 2026 (estimations)",
          headers: ["Travaux", "Bleu", "Jaune", "Violet", "Rose"],
          rows: [
            ["PAC air/eau", "5 000 €", "4 000 €", "3 000 €", "0 €"],
            ["PAC géothermique", "11 000 €", "9 000 €", "6 000 €", "0 €"],
            ["Chaudière granulés", "10 000 €", "8 000 €", "4 000 €", "0 €"],
            ["Chaudière bois bûches", "8 000 €", "6 500 €", "3 000 €", "0 €"],
          ],
        },
        {
          type: "h3",
          text: "Certificats d'Économie d'Énergie (CEE)",
        },
        {
          type: "p",
          text: "Prime cumulable avec MaPrimeRénov', versée par les fournisseurs d'énergie. Les ménages aux ressources modestes bénéficient du « Coup de pouce chauffage » : 4 000 à 5 000 € pour une PAC ou une chaudière biomasse.",
        },
        {
          type: "h3",
          text: "Éco-PTZ et TVA réduite",
        },
        {
          type: "ul",
          items: [
            "Éco-PTZ : prêt à taux zéro jusqu'à 30 000 €, remboursable sur 20 ans, sans condition de ressources.",
            "TVA réduite à 5,5 % sur la fourniture et la pose (au lieu de 20 %).",
            "Aides locales (région, département, communauté de communes) : à vérifier sur le simulateur officiel france-renov.gouv.fr.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Attention au démarchage abusif",
          text: "Les fraudes liées aux aides à la rénovation explosent. Ne signez jamais un devis lors d'un démarchage téléphonique ou à domicile sans réflexion. Vérifiez systématiquement la qualification RGE Qualibat ou QualiPAC sur france-renov.gouv.fr.",
        },
      ],
    },
    {
      id: "choisir-type",
      heading: "Quel type de chaudière choisir en 2026 ?",
      blocks: [
        {
          type: "h3",
          text: "Chaudière gaz à condensation",
        },
        {
          type: "p",
          text: "Bonne option si vous êtes raccordé au gaz de ville et que votre logement n'est pas adapté à une PAC (mauvaise isolation, radiateurs haute température). Rendement de 105 à 110 %, durée de vie 15-20 ans. Plus de prime MaPrimeRénov' pour le neuf depuis 2024, mais entretien CEE possible.",
        },
        {
          type: "h3",
          text: "Pompe à chaleur air/eau",
        },
        {
          type: "p",
          text: "Solution la plus subventionnée en 2026. Rendement (COP) de 3 à 5 selon le climat : pour 1 kWh consommé, 3 à 5 kWh restitués. Idéale en remplacement d'une chaudière fioul ou gaz, en logement correctement isolé.",
        },
        {
          type: "h3",
          text: "Chaudière à granulés (pellets)",
        },
        {
          type: "p",
          text: "Très rentable sur le long terme grâce au coût du combustible. Nécessite un silo (1 à 5 m³). Aide MaPrimeRénov' importante. Idéale en maison individuelle avec espace de stockage et habitudes de chargement.",
        },
        {
          type: "h3",
          text: "Chaudière hybride",
        },
        {
          type: "p",
          text: "Combinaison gaz + PAC qui bascule automatiquement selon la température extérieure. Compromis intéressant pour des logements en gaz, mais investissement plus lourd et complexité accrue.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "L'arbitrage clé",
          text: "Avant tout devis, faites réaliser un audit énergétique (1 000 € avant aide, gratuit pour les ménages très modestes). Il identifie le meilleur scénario de rénovation et conditionne l'éligibilité au Parcours Accompagné de MaPrimeRénov'.",
        },
      ],
    },
    {
      id: "etapes",
      heading: "Les étapes du remplacement",
      blocks: [
        {
          type: "ol",
          items: [
            "Diagnostic énergétique du logement (audit ou bilan thermique).",
            "Choix du combustible et de l'équipement adapté.",
            "Demande de 3 devis à des chauffagistes qualifiés RGE.",
            "Constitution du dossier d'aides (MaPrimeRénov', CEE) avant signature du devis.",
            "Signature du devis une fois l'accord de subvention reçu.",
            "Installation (1 à 3 jours pour une chaudière, 2 à 5 jours pour une PAC).",
            "Mise en service, attestation Consuel et formation à l'usage.",
            "Versement des aides après facture acquittée.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "L'ordre est crucial",
          text: "Vous DEVEZ demander l'accord MaPrimeRénov' AVANT de signer le devis. Une signature anticipée vous prive de toute aide. Le portail monprojet.anah.gouv.fr délivre la décision en 15 jours à 2 mois.",
        },
      ],
    },
    {
      id: "entretien",
      heading: "Entretien annuel : obligatoire et indispensable",
      blocks: [
        {
          type: "p",
          text: "Conformément au décret n°2020-912, l'entretien annuel des chaudières de 4 à 400 kW est obligatoire en France. Il doit être réalisé par un professionnel qualifié, et coûte en moyenne 80 à 180 € selon le combustible.",
        },
        {
          type: "ul",
          items: [
            "Chaudière gaz : 80 – 150 €",
            "Chaudière fioul : 130 – 200 €",
            "Chaudière granulés : 180 – 250 €",
            "Pompe à chaleur : 150 – 250 €",
          ],
        },
        {
          type: "p",
          text: "Un contrat d'entretien annuel est souvent plus avantageux : il inclut un déplacement en cas de panne et une visite préventive. Conservez la facture, elle peut être exigée par votre assurance habitation en cas de sinistre.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Combien de temps dure le remplacement d'une chaudière ?",
      a: "L'installation seule prend 1 à 3 jours pour une chaudière classique, et 2 à 5 jours pour une pompe à chaleur (terrassement éventuel inclus). Compter en plus 2 à 4 semaines de délai de commande de l'équipement.",
    },
    {
      q: "Faut-il un permis ou une déclaration de travaux ?",
      a: "Aucun permis pour le remplacement d'une chaudière en intérieur. Pour une pompe à chaleur extérieure, une déclaration préalable peut être exigée selon le PLU communal (notamment en zone protégée ou en copropriété).",
    },
    {
      q: "Puis-je remplacer une chaudière fioul par une autre chaudière fioul ?",
      a: "Oui, en remplacement de l'existant uniquement. L'installation d'une chaudière fioul neuve est interdite depuis le 1er juillet 2022 (décret n°2022-8). En cas de panne, le remplacement par un équipement plus performant (PAC, granulés) est très fortement subventionné.",
    },
    {
      q: "MaPrimeRénov' et CEE sont-elles cumulables ?",
      a: "Oui, parfaitement. Vous pouvez aussi cumuler avec l'Éco-PTZ et la TVA à 5,5 %. Les aides locales (région, EPCI) sont également cumulables, dans la limite du coût des travaux.",
    },
    {
      q: "Comment vérifier qu'un artisan est qualifié RGE ?",
      a: "Rendez-vous sur france-renov.gouv.fr, rubrique « Trouver un professionnel RGE ». Vérifiez le numéro Qualibat, QualiPAC ou Qualibois, et sa date de validité (renouvellement annuel).",
    },
  ],
  relatedTrades: ["chauffagiste", "plombier", "electricien"],
  related: [
    "maprimerenov-2026-guide-complet",
    "pompe-a-chaleur-prix-2026",
    "trouver-artisan-rge",
  ],
};
