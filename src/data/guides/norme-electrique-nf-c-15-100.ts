import type { Guide } from "./types";

export const normeElectriqueNFC15100: Guide = {
  slug: "renovation-electrique-norme-nf-c-15-100",
  title: "Norme NF C 15-100 en rénovation : ce qui change en 2026",
  metaTitle: "Norme NF C 15-100 2026 : obligations en rénovation électrique",
  metaDescription:
    "Tout sur la norme NF C 15-100 en rénovation : nombre de prises, tableau, salle de bain, mise aux normes, Consuel. Guide complet 2026.",
  category: "Travaux",
  excerpt:
    "La norme NF C 15-100 régit les installations électriques basse tension en France. En rénovation, elle s'applique partiellement mais conditionne la sécurité et la vente future.",
  heroIntro:
    "Souvent perçue comme obscure, la norme NF C 15-100 protège pourtant la vie des occupants en encadrant les installations électriques. Mise à jour en 2015 (amendement 5) et complétée par des fiches d'interprétation, elle impose un nombre minimum de prises, des dispositifs de sécurité et des règles strictes dans les pièces humides.",
  readingMinutes: 9,
  publishedAt: "2026-01-20",
  updatedAt: "2026-05-07",
  author: {
    name: "Nicolas Dupré",
    role: "Électricien certifié Qualifelec",
  },
  keyTakeaways: [
    "Obligatoire pour toute installation neuve et toute rénovation totale.",
    "Tableau électrique : 20 % de modules libres minimum.",
    "Salle de bain : volumes 0, 1, 2 avec règles spécifiques.",
    "Mise aux normes : 90 – 130 €/m² en rénovation lourde.",
    "Consuel obligatoire avant remise sous tension.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Qu'est-ce que la norme NF C 15-100 ?",
      blocks: [
        {
          type: "p",
          text: "La norme NF C 15-100 («&nbsp;Installations électriques à basse tension&nbsp;») est le référentiel obligatoire pour toute installation électrique en France métropolitaine et dans les DOM-TOM. Elle couvre les logements, les locaux professionnels et les espaces extérieurs.",
        },
        {
          type: "p",
          text: "Elle est publiée par l'AFNOR et mise à jour régulièrement par amendements. La version en vigueur en 2026 est celle de 2015 (Amendement 5), complétée par les fiches d'interprétation 23 à 30.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Quand s'applique-t-elle ?",
          text: "En neuf : obligatoire à 100 %. En rénovation : obligatoire si vous refaites toute l'installation. Pour des modifications ponctuelles, seules les nouvelles parties sont soumises à la norme. La vente d'un logement >15 ans nécessite un diagnostic électrique (DET) qui pointe les écarts.",
        },
      ],
    },
    {
      id: "tableau-electrique",
      heading: "Le tableau électrique : règles principales",
      blocks: [
        {
          type: "ul",
          items: [
            "Un seul tableau principal par logement.",
            "Disjoncteur différentiel 30 mA en tête de chaque rangée.",
            "Chaque circuit protégé par un disjoncteur dédié (pas de fusibles).",
            "20 % de modules libres minimum (extensibilité).",
            "Borne de terre principale et liaison équipotentielle.",
            "Parafoudre obligatoire dans certaines zones (foudre fréquente).",
          ],
        },
        {
          type: "h3",
          text: "Nombre de circuits minimum",
        },
        {
          type: "table",
          headers: ["Usage", "Calibre", "Section fil"],
          rows: [
            ["Éclairage (8 points max)", "10 A", "1,5 mm²"],
            ["Prises 16 A (8 prises max)", "16 A", "2,5 mm²"],
            ["Cuisson (plaque)", "32 A", "6 mm²"],
            ["Four", "20 A", "2,5 mm²"],
            ["Lave-linge / lave-vaisselle (par appareil)", "20 A", "2,5 mm²"],
            ["Chauffe-eau électrique", "20 A", "2,5 mm²"],
            ["Sèche-serviettes (par appareil)", "16 A", "1,5 mm²"],
            ["Climatisation / PAC", "Selon puissance", "2,5 à 10 mm²"],
            ["Borne de recharge VE (si)", "32 A min.", "10 mm²"],
          ],
        },
      ],
    },
    {
      id: "nombre-prises",
      heading: "Nombre minimum de prises par pièce",
      blocks: [
        {
          type: "table",
          headers: ["Pièce", "Prises 16 A", "Points lumineux"],
          rows: [
            ["Séjour / salon", "5 (ou 1 par 4 m²)", "1 plafonnier minimum"],
            ["Chambre", "3", "1 plafonnier ou applique"],
            ["Cuisine", "6 (dont 4 sur plan de travail)", "1 plafonnier + éclairage plan"],
            ["Salle de bain", "1 (hors volumes 0-1-2)", "1 éclairage central"],
            ["Couloir / dégagement", "1", "1 par 5 m"],
            ["Entrée", "1", "1 plafonnier"],
            ["Cellier / garage", "1", "1"],
            ["Extérieur (terrasse, balcon)", "1 IP44 minimum", "1 éclairage"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Bonnes pratiques modernes",
          text: "Au-delà du minimum normatif, prévoyez : 1 prise RJ45 par pièce (réseau Ethernet), 1 prise USB intégrée par chambre, des prises commandées (lampes), et au moins 2 prises près du lit. Le surcoût est minime en rénovation.",
        },
      ],
    },
    {
      id: "salle-de-bain",
      heading: "Salle de bain : les 4 volumes de sécurité",
      blocks: [
        {
          type: "p",
          text: "La salle de bain est l'endroit le plus contraint par la norme, en raison de la présence d'eau. Quatre zones (volumes) déterminent ce qui est autorisé.",
        },
        {
          type: "ul",
          items: [
            "Volume 0 (intérieur baignoire/douche) : rien d'électrique sauf appareils 12 V SELV.",
            "Volume 1 (au-dessus jusqu'à 2,25 m de hauteur) : luminaires IPX4 minimum, classe II.",
            "Volume 2 (60 cm autour) : prises rasoir séparées tolérées, luminaires IPX4.",
            "Hors volume : prises classiques 16 A avec différentiel 30 mA.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Liaison équipotentielle locale",
          text: "Toutes les masses métalliques d'une salle de bain (canalisations, baignoire métallique, douche, sèche-serviettes…) doivent être reliées entre elles par un conducteur de 4 mm² minimum. Cette LES (Liaison Équipotentielle Supplémentaire) est non négociable.",
        },
      ],
    },
    {
      id: "mise-aux-normes",
      heading: "Mise aux normes : coût et démarche",
      blocks: [
        {
          type: "table",
          caption: "Coût moyen mise aux normes en rénovation",
          headers: ["Surface", "Coût total"],
          rows: [
            ["Studio (≤ 30 m²)", "3 000 – 5 000 €"],
            ["T2 (40 – 50 m²)", "4 500 – 7 000 €"],
            ["T3 (60 – 70 m²)", "6 500 – 10 000 €"],
            ["T4 (80 – 100 m²)", "9 000 – 13 000 €"],
            ["Maison (120 m²+)", "12 000 – 18 000 €"],
          ],
        },
        {
          type: "ol",
          items: [
            "Diagnostic électrique de l'installation existante.",
            "Devis d'un électricien Qualifelec ou Qualibat.",
            "Coupure du courant Enedis pour les gros travaux.",
            "Refonte du tableau et passage de câbles.",
            "Pose des nouveaux points lumineux et prises.",
            "Tests : continuité de terre, isolement, différentiels.",
            "Attestation Consuel obligatoire avant remise sous tension.",
            "Visite Enedis pour la rebranchement définitif.",
          ],
        },
      ],
    },
    {
      id: "consuel",
      heading: "Le Consuel : obligation et démarches",
      blocks: [
        {
          type: "p",
          text: "Le Consuel (Comité National pour la Sécurité des Usagers de l'Électricité) est un organisme indépendant qui contrôle la conformité des installations neuves ou rénovées avant leur mise sous tension par Enedis.",
        },
        {
          type: "ul",
          items: [
            "Attestation obligatoire pour toute installation neuve.",
            "Obligatoire en rénovation totale ou modification du tableau principal.",
            "Tarif : 145 € (visite simplifiée) à 200 € (visite complète).",
            "Délai : 3 à 6 semaines après dépôt du dossier.",
            "L'électricien remplit l'attestation, le particulier la transmet au Consuel.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Suis-je obligé de mettre aux normes en cas de simple remplacement ?",
      a: "Non. Le remplacement d'une prise, d'un interrupteur ou d'un luminaire à l'identique n'oblige pas à mettre toute l'installation aux normes. Mais les nouveaux éléments doivent eux-mêmes respecter la norme actuelle.",
    },
    {
      q: "Mon assurance peut-elle refuser de couvrir un sinistre électrique ?",
      a: "Oui, si l'installation est manifestement vétuste, non conforme et que le sinistre lui est imputable. Les assureurs s'appuient sur le diagnostic électrique obligatoire en cas de vente. Une mise aux normes documentée vous protège.",
    },
    {
      q: "Le diagnostic électrique est-il obligatoire ?",
      a: "Oui pour toute vente ou location d'un logement dont l'installation a plus de 15 ans. Il est valable 3 ans pour une vente, 6 ans pour une location. Il ne contraint pas à faire les travaux, mais le futur acquéreur les négocie souvent.",
    },
    {
      q: "Peut-on faire soi-même la mise aux normes ?",
      a: "Légalement oui pour des modifications ponctuelles. Mais le Consuel sera difficile à obtenir sans intervention d'un professionnel, et votre assurance habitation peut considérer une installation non professionnelle comme non couverte. Surtout, c'est risqué : 30 % des incendies domestiques en France sont d'origine électrique.",
    },
    {
      q: "Le différentiel 30 mA est-il obligatoire partout ?",
      a: "Oui depuis 2002 en logement neuf, et fortement recommandé en rénovation. Il protège les personnes contre l'électrocution en coupant le courant en cas de fuite vers la terre (eau, contact direct).",
    },
  ],
  relatedTrades: ["electricien"],
  related: [
    "prix-renovation-salle-de-bain",
    "trouver-artisan-rge",
    "devis-travaux-pieges-a-eviter",
  ],
};
