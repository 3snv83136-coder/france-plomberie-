import type { Guide } from "./types";

export const devisTravauxPiegesAEviter: Guide = {
  slug: "devis-travaux-pieges-a-eviter",
  title: "Devis travaux : les 10 pièges à éviter avant de signer",
  metaTitle: "Devis travaux : 10 pièges classiques à éviter avant signature",
  metaDescription:
    "Avant de signer un devis travaux, vérifiez ces 10 points cruciaux : mentions obligatoires, prix au m² ou forfait, pénalités, acompte, garantie décennale, etc.",
  category: "Conseils",
  excerpt:
    "Un devis travaux mal rédigé est la première cause de litige en France. Voici les 10 pièges les plus courants et les mentions absolument obligatoires à exiger.",
  heroIntro:
    "Le devis travaux est un document contractuel qui engage les deux parties dès signature. Trop souvent, les particuliers le lisent en diagonale, signent vite, et découvrent les zones grises au moment des suppléments. Voici les 10 pièges à connaître pour comparer sereinement.",
  readingMinutes: 9,
  publishedAt: "2026-03-08",
  updatedAt: "2026-05-14",
  author: {
    name: "Olivier Martin",
    role: "Maître d'œuvre & rédacteur travaux",
  },
  keyTakeaways: [
    "Un devis doit comporter 11 mentions obligatoires (Code de la consommation).",
    "Comparez au moins 3 devis pour des travaux >2 000 €.",
    "Méfiez-vous des devis trop ronds ou trop bas (15-20 % sous le marché).",
    "Acompte maximum recommandé : 30 % à la commande.",
    "Vérifiez assurance décennale et qualification RGE avant signature.",
  ],
  sections: [
    {
      id: "mentions-obligatoires",
      heading: "Les 11 mentions obligatoires d'un devis",
      blocks: [
        {
          type: "p",
          text: "Selon les articles L. 111-1 et R. 111-1 du Code de la consommation, et l'arrêté du 2 mars 1990, tout devis travaux doit comporter :",
        },
        {
          type: "ol",
          items: [
            "Date du devis et durée de validité (15 à 90 jours).",
            "Nom, raison sociale et adresse de l'entreprise.",
            "Numéro SIRET et forme juridique.",
            "N° d'assurance décennale et nom de l'assureur.",
            "Nom et adresse du client.",
            "Description détaillée des prestations (poste par poste).",
            "Décompte des matériaux et de la main d'œuvre.",
            "Prix unitaires et quantités (HT et TTC).",
            "Taux de TVA appliqué (5,5 %, 10 % ou 20 %).",
            "Montant total HT, TVA et TTC.",
            "Modalités de paiement (acompte, échéances, mode).",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Devis incomplet = devis nul",
          text: "Un devis qui ne comporte pas ces 11 mentions peut être contesté devant le juge. Surtout, il est généralement le signe d'un artisan peu sérieux ou qui cherche à dissimuler des informations.",
        },
      ],
    },
    {
      id: "piege-1",
      heading: "Piège n°1 : le « tout compris » sans détail",
      blocks: [
        {
          type: "p",
          text: "Un devis qui annonce « Rénovation salle de bain : 12 000 € » sans ventilation détaillée est inexploitable. Vous ne pouvez ni comparer, ni contester, ni demander une modification. Exigez le détail poste par poste : démolition, plomberie, électricité, carrelage, peinture, fournitures, main d'œuvre.",
        },
      ],
    },
    {
      id: "piege-2",
      heading: "Piège n°2 : prix au forfait vs prix au m²",
      blocks: [
        {
          type: "p",
          text: "Un prix au forfait fige le coût total, indépendamment des aléas. Un prix au m² peut grimper si le chantier est plus complexe que prévu. Pour des travaux clairs (peinture, carrelage), préférez le forfait. Pour des chantiers complexes ou évolutifs, le prix au m² peut être plus juste — à condition que les surfaces soient mesurées contradictoirement.",
        },
      ],
    },
    {
      id: "piege-3",
      heading: "Piège n°3 : matériaux non précisés",
      blocks: [
        {
          type: "p",
          text: "« Pose carrelage » sans marque, modèle, dimensions et qualité : c'est ouvrir la porte au « j'ai changé pour moins cher » au moment de la pose. Exigez la marque, la référence et la catégorie (UPEC pour le sol, classement PEI).",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Annexer la fiche technique",
          text: "Pour les équipements coûteux (chaudière, PAC, fenêtres, parquet), demandez la fiche technique du fournisseur en annexe du devis. Cela engage l'artisan sur le modèle exact.",
        },
      ],
    },
    {
      id: "piege-4",
      heading: "Piège n°4 : l'acompte excessif",
      blocks: [
        {
          type: "p",
          text: "Aucune règle légale ne fixe le montant de l'acompte, mais l'usage en France est de 30 % maximum à la signature. Au-delà, c'est un signal d'alerte (trésorerie tendue, fuite en avant).",
        },
        {
          type: "ul",
          items: [
            "Acompte 30 % à la commande.",
            "Acompte 40 % à mi-chantier.",
            "Solde 30 % à réception, après vérification.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          text: "Un artisan qui exige 70 ou 100 % d'avance avant tout début de chantier doit vous mettre en garde. Refusez et passez à un autre prestataire.",
        },
      ],
    },
    {
      id: "piege-5",
      heading: "Piège n°5 : pénalités de retard absentes",
      blocks: [
        {
          type: "p",
          text: "La plupart des devis ne mentionnent ni délai d'exécution, ni pénalités de retard. C'est légal, mais cela vous laisse sans recours si les travaux traînent. Exigez l'ajout d'une clause : « Délai d'exécution X semaines à compter de la date de démarrage, sous peine d'une pénalité de Y € par jour ouvré de retard. »",
        },
      ],
    },
    {
      id: "piege-6",
      heading: "Piège n°6 : la « TVA en sus »",
      blocks: [
        {
          type: "p",
          text: "Le devis doit afficher clairement le prix HT et TTC. Toute mention « TVA en sus » ou « voir avec le client » est suspecte : pour un particulier, la TVA est obligatoire et déjà fixée (5,5 %, 10 % ou 20 %).",
        },
      ],
    },
    {
      id: "piege-7",
      heading: "Piège n°7 : pas d'assurance décennale",
      blocks: [
        {
          type: "p",
          text: "Pour tout travaux de gros œuvre ou impactant la solidité de l'ouvrage, l'assurance décennale est obligatoire. Sans ce justificatif, l'artisan ne peut être condamné en cas de malfaçon, et votre habitation n'est pas couverte. Demandez l'attestation en cours de validité (renouvellement annuel).",
        },
      ],
    },
    {
      id: "piege-8",
      heading: "Piège n°8 : devis 15 à 20 % sous le marché",
      blocks: [
        {
          type: "p",
          text: "Un devis très bas par rapport à 2-3 autres est rarement une bonne nouvelle. Trois explications possibles :",
        },
        {
          type: "ul",
          items: [
            "L'artisan a sous-évalué le chantier et fera passer des suppléments en cours.",
            "Il sous-traite à des intervenants non qualifiés (et non RGE).",
            "Travail dissimulé partiel (pas de TVA réelle, pas de déclaration).",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Ce qui « semble trop beau »",
          text: "Le bon prix est rarement le plus bas, ni le plus haut. Privilégiez le devis dans la moyenne, le plus détaillé, et l'artisan qui inspire confiance par sa rigueur de chiffrage.",
        },
      ],
    },
    {
      id: "piege-9",
      heading: "Piège n°9 : aides MaPrimeRénov' « gérées par nous »",
      blocks: [
        {
          type: "p",
          text: "Méfiance avec les artisans qui proposent de gérer eux-mêmes votre dossier MaPrimeRénov' moyennant une avance ou une cession de créance. La pratique est légale, mais souvent dévoyée : prix gonflés pour absorber l'aide, dossier mal monté, ou aide jamais demandée. Faites votre dossier vous-même ou via un conseiller France Rénov'.",
        },
      ],
    },
    {
      id: "piege-10",
      heading: "Piège n°10 : signer sous pression",
      blocks: [
        {
          type: "p",
          text: "Aucun devis n'est valide « uniquement aujourd'hui ». Les techniques de pression commerciale (« si vous ne signez pas avant ce soir, vous perdez la promo ») sont des manipulations. Prenez 48 à 72 heures de réflexion minimum, faites lire le devis par un proche.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Droit de rétractation",
          text: "Pour les travaux signés à domicile (démarchage), vous disposez d'un délai légal de rétractation de 14 jours (article L. 221-18 du Code de la consommation), sauf urgence dûment justifiée. Ce droit n'existe pas si vous signez dans l'agence de l'artisan.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Un devis est-il payant ?",
      a: "En principe non, sauf pour les chantiers très complexes nécessitant un déplacement et une étude technique poussée. Dans ce cas, le coût du devis doit être annoncé à l'avance et déduit du chantier si signé. Pour une intervention courante, exigez un devis gratuit.",
    },
    {
      q: "Combien de temps un devis est-il valable ?",
      a: "Le devis doit afficher sa durée de validité, généralement 15 à 90 jours. Au-delà, l'artisan peut refuser de le maintenir, notamment en cas de hausse des prix des matériaux. Conservez tous les devis : ils servent de preuve en cas de litige.",
    },
    {
      q: "Que faire si le chantier dérape ?",
      a: "En cas de dépassement de devis ou de retard, mettez l'artisan en demeure par LRAR. Si pas de réponse sous 15 jours, saisissez le médiateur de la consommation (Médiation BTP) puis le juge des contentieux (montants < 5 000 €). Pour les vices cachés, l'assurance décennale s'applique 10 ans.",
    },
    {
      q: "L'artisan peut-il facturer plus que le devis ?",
      a: "Non, sauf signature d'un avenant pour travaux supplémentaires. Tout supplément non accepté par écrit est contestable. Conservez tous les échanges (mails, SMS) qui peuvent attester d'éventuels accords oraux.",
    },
    {
      q: "Faut-il payer en espèces, en chèque ou en virement ?",
      a: "Le paiement en espèces est plafonné à 1 000 € pour les paiements à des professionnels (3 000 € si l'artisan est non-résident fiscal français). Privilégiez virement ou chèque : trace écrite, recours plus simple en cas de litige.",
    },
  ],
  relatedTrades: [
    "plombier",
    "electricien",
    "chauffagiste",
    "couvreur",
    "menuisier",
    "peintre",
    "macon",
  ],
  related: [
    "trouver-artisan-rge",
    "maprimerenov-2026-guide-complet",
    "eviter-arnaque-serrurier",
  ],
};
