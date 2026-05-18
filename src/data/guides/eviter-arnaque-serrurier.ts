import type { Guide } from "./types";

export const eviterArnaqueSerrurier: Guide = {
  slug: "eviter-arnaque-serrurier",
  title: "Comment éviter les arnaques de serrurier : 8 réflexes essentiels",
  metaTitle: "Arnaque serrurier : 8 réflexes pour ne pas se faire piéger",
  metaDescription:
    "Porte claquée, serrure forcée : comment éviter une arnaque de serrurier ? Tarifs, devis, recours en cas d'abus, comment vérifier un artisan. Guide complet.",
  category: "Conseils",
  excerpt:
    "Les arnaques de serrurerie représentent plus de 50 000 plaintes annuelles en France. Avec ces 8 réflexes simples, vous éviterez 90 % des pièges les plus courants.",
  heroIntro:
    "Vous êtes coincé dehors, votre serrure est bloquée ou forcée, et vous tapez « serrurier urgence » sur Google. Les premiers résultats sont souvent des numéros surtaxés tenus par des plateformes peu scrupuleuses. Voici comment ne pas se faire piéger.",
  readingMinutes: 8,
  publishedAt: "2026-03-14",
  updatedAt: "2026-05-02",
  author: {
    name: "Yanis Akkari",
    role: "Serrurier-métallier (15 ans d'expérience)",
  },
  keyTakeaways: [
    "Une ouverture de porte coûte 90 à 200 € en journée, 150 à 400 € la nuit.",
    "Exigez TOUJOURS un devis signé avant intervention.",
    "Méfiez-vous des numéros « urgence 24/7 » non rattachés à une entreprise locale.",
    "Le délit d'abus de faiblesse permet de contester une facture excessive.",
    "Privilégiez un serrurier de quartier, vérifiez son SIRET avant.",
  ],
  sections: [
    {
      id: "comprendre-arnaque",
      heading: "Comment fonctionne l'arnaque type ?",
      blocks: [
        {
          type: "p",
          text: "Les fausses sociétés de dépannage exploitent l'urgence et le stress. Le schéma est presque toujours le même :",
        },
        {
          type: "ol",
          items: [
            "Le client cherche « serrurier 75011 » sur Google ou dans un annuaire en ligne.",
            "Il clique sur une annonce sponsorisée ou un site de mise en relation.",
            "Un opérateur prend l'appel, annonce un tarif raisonnable au téléphone (≈ 100 €).",
            "Un sous-traitant arrive sous 30 min, sans badge ni véhicule logoté.",
            "Il « tente » l'ouverture fine, échoue, puis « doit » percer la serrure (300 €).",
            "Il « doit » la remplacer par un cylindre neuf de marque inconnue (400 € de plus).",
            "Facture finale : 800 à 2 500 €, payable en CB sur TPE mobile.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Le cœur de l'arnaque",
          text: "Le tarif réel d'une ouverture de porte simple par crochetage est de 80 à 200 €. Tout devis supérieur à 350 € sans changement de pièce est suspect. Tout cylindre vendu sans certification A2P (1, 2 ou 3 étoiles) est à refuser.",
        },
      ],
    },
    {
      id: "tarifs-reels",
      heading: "Les vrais tarifs en 2026",
      blocks: [
        {
          type: "table",
          caption: "Fourchettes de prix observées (intervention + déplacement)",
          headers: ["Prestation", "Jour ouvré", "Nuit / week-end / férié"],
          rows: [
            ["Ouverture porte claquée (crochetage)", "80 – 150 €", "150 – 300 €"],
            ["Ouverture porte fermée à clé (crochetage)", "120 – 220 €", "200 – 400 €"],
            ["Remplacement cylindre standard", "60 – 120 € (hors pièce)", "Idem + majoration"],
            ["Cylindre A2P 1 étoile (pièce seule)", "70 – 130 €", "—"],
            ["Cylindre A2P 2 étoiles", "120 – 200 €", "—"],
            ["Serrure 3 points A2P", "300 – 600 € (hors pose)", "—"],
            ["Blindage de porte (3 points)", "500 – 1 200 €", "—"],
            ["Porte blindée complète", "1 800 – 3 500 €", "—"],
          ],
        },
        {
          type: "callout",
          variant: "info",
          text: "La majoration nuit/week-end est légalement encadrée mais varie selon les départements. Elle ne devrait pas dépasser 50 à 100 % du tarif diurne. Toute majoration de 200 à 300 % constitue une pratique commerciale trompeuse.",
        },
      ],
    },
    {
      id: "8-reflexes",
      heading: "Les 8 réflexes à avoir",
      blocks: [
        {
          type: "h3",
          text: "1. Ne paniquez pas, respirez",
        },
        {
          type: "p",
          text: "Une porte claquée n'est pas une urgence absolue. Vous pouvez patienter 30 minutes pour trouver un vrai serrurier de quartier. Appelez d'abord un proche, un voisin, votre syndic ou votre bailleur.",
        },
        {
          type: "h3",
          text: "2. Évitez les annonces sponsorisées Google",
        },
        {
          type: "p",
          text: "Les premiers résultats payants pour « serrurier urgence » sont massivement détenus par des plateformes douteuses. Scrollez jusqu'aux résultats organiques, ou cherchez directement « serrurier + nom de votre rue ».",
        },
        {
          type: "h3",
          text: "3. Vérifiez le SIRET avant déplacement",
        },
        {
          type: "p",
          text: "Demandez le SIRET au téléphone, vérifiez-le sur societe.com ou annuaire-entreprises.data.gouv.fr. Un vrai artisan local n'a aucun problème à fournir cette information.",
        },
        {
          type: "h3",
          text: "4. Exigez un devis signé AVANT l'intervention",
        },
        {
          type: "p",
          text: "Pour tout dépannage à domicile supérieur à 150 €, un devis écrit est obligatoire (article L. 111-1 du Code de la consommation). Lisez-le, signez-le, conservez une copie. Pas de devis = pas d'intervention.",
        },
        {
          type: "h3",
          text: "5. Refusez le perçage systématique",
        },
        {
          type: "p",
          text: "Un bon serrurier ouvre 90 % des serrures par crochetage, sans casse. Si l'artisan annonce d'emblée « il faut percer », c'est un signal d'alerte. Demandez pourquoi par écrit avant d'accepter.",
        },
        {
          type: "h3",
          text: "6. Exigez une certification A2P sur les nouvelles pièces",
        },
        {
          type: "p",
          text: "Toute serrure ou cylindre vendu en remplacement doit porter la certification A2P (CNPP). Sans ce label, c'est une pièce générique non assurable, parfois moins solide que celle d'origine.",
        },
        {
          type: "h3",
          text: "7. Refusez le paiement immédiat par TPE mobile",
        },
        {
          type: "p",
          text: "Un vrai professionnel envoie sa facture sous 24 à 48h et accepte le virement bancaire ou le chèque. Le paiement immédiat « impératif sur place » est une pratique d'arnaque connue.",
        },
        {
          type: "h3",
          text: "8. Conservez toutes les preuves",
        },
        {
          type: "p",
          text: "Photographiez le véhicule, la plaque, le badge, le devis, la pièce remplacée. En cas de litige, ces preuves serviront à votre plainte ou à une action devant le juge.",
        },
      ],
    },
    {
      id: "recours",
      heading: "Que faire en cas d'arnaque avérée ?",
      blocks: [
        {
          type: "ol",
          items: [
            "Faire opposition à la carte bancaire sous 13 mois si paiement frauduleux.",
            "Déposer un signalement sur signal.conso.gouv.fr (DGCCRF).",
            "Porter plainte au commissariat ou à la gendarmerie (escroquerie, abus de faiblesse).",
            "Saisir le médiateur de la consommation (BTP : Médiation BTP).",
            "Action devant le juge de proximité pour les montants < 5 000 €.",
            "Prévenir votre assurance habitation : certaines couvrent ce type de litige (protection juridique).",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Bon à savoir",
          text: "Une facture acquittée n'est pas une fatalité. Le juge peut annuler la transaction pour abus de faiblesse, pratique commerciale trompeuse ou défaut de devis. Les délais de prescription sont de 5 ans pour la consommation.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Un serrurier peut-il refuser un devis écrit ?",
      a: "Non. Tout dépannage supérieur à 150 € à domicile rend le devis écrit obligatoire (article L. 111-1 du Code de la consommation). Un refus de devis constitue à lui seul un motif de contestation et de plainte.",
    },
    {
      q: "Que faire si je suis sur le palier sans téléphone ni argent ?",
      a: "Demandez à un voisin ou descendez chez le gardien pour appeler un proche. La plupart des villes disposent d'un Police-Secours capable de joindre un artisan référencé. En dernier recours, contactez votre bailleur ou syndic, qui a souvent des contrats avec un serrurier de confiance.",
    },
    {
      q: "Mon assurance habitation rembourse-t-elle l'ouverture ?",
      a: "Les contrats multirisques habitation incluent souvent une garantie « assistance serrurerie » plafonnée à 200-400 €. Vérifiez votre contrat avant d'appeler n'importe qui : votre assureur peut aussi vous orienter vers un partenaire certifié.",
    },
    {
      q: "Une porte claquée est-elle une urgence ?",
      a: "Pas absolument. Sauf si un enfant est seul à l'intérieur, vous pouvez patienter quelques heures et appeler un serrurier en journée pour économiser 100 à 200 € de majoration nuit/week-end.",
    },
    {
      q: "Comment reconnaître un faux serrurier ?",
      a: "Plusieurs signes : refus de fournir le SIRET, pas de véhicule logoté, pas de carte de visite, devis incomplet ou flou, exigence de paiement immédiat, refus du chèque ou du virement, perçage proposé en première intention.",
    },
  ],
  relatedTrades: ["serrurier", "vitrier"],
  related: [
    "trouver-artisan-rge",
    "devis-travaux-pieges-a-eviter",
  ],
};
