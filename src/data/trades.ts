export type Trade = {
  slug: string;
  name: string;
  plural: string;
  feminine?: boolean;
  category: "batiment" | "energie" | "exterieur" | "second-oeuvre" | "depannage";
  schemaType: string;
  shortDescription: string;
  description: string;
  avgPrice: { unit: string; min: number; max: number };
  commonServices: string[];
  emergency: boolean;
  icon: string;
  faq: { q: string; a: string }[];
};

export const TRADES: Trade[] = [
  {
    slug: "plombier",
    name: "Plombier",
    plural: "Plombiers",
    category: "depannage",
    schemaType: "Plumber",
    shortDescription:
      "Installation, dépannage et entretien de plomberie : fuite, chauffe-eau, sanitaires.",
    description:
      "Le plombier intervient sur l'ensemble des installations d'eau de votre logement : réparation de fuites, débouchage de canalisations, remplacement de chauffe-eau, installation de sanitaires, mise aux normes. La majorité des plombiers proposent une intervention d'urgence 24h/24 et 7j/7 en cas de dégât des eaux.",
    avgPrice: { unit: "intervention", min: 80, max: 350 },
    commonServices: [
      "Recherche et réparation de fuite",
      "Débouchage canalisation",
      "Installation chauffe-eau",
      "Pose WC, lavabo, douche",
      "Détartrage chaudière",
      "Mise aux normes plomberie",
    ],
    emergency: true,
    icon: "wrench",
    faq: [
      {
        q: "Quel est le tarif moyen d'un plombier ?",
        a: "Le tarif d'un plombier varie entre 40 € et 80 € de l'heure en France, avec un forfait déplacement de 30 à 60 €. Une intervention d'urgence (nuit, week-end, jour férié) peut majorer le tarif de 50 à 100 %.",
      },
      {
        q: "Comment choisir un bon plombier ?",
        a: "Vérifiez la mention de l'entreprise au Registre du Commerce, demandez plusieurs devis détaillés, consultez les avis clients et privilégiez un artisan local avec une assurance décennale.",
      },
      {
        q: "Un plombier peut-il intervenir en urgence ?",
        a: "Oui, la majorité des plombiers proposent un service d'urgence 24h/24, généralement avec un délai d'intervention de 30 à 60 minutes en zone urbaine.",
      },
    ],
  },
  {
    slug: "electricien",
    name: "Électricien",
    plural: "Électriciens",
    category: "batiment",
    schemaType: "Electrician",
    shortDescription:
      "Installation électrique, mise aux normes, tableau, dépannage et domotique.",
    description:
      "L'électricien réalise l'installation, la rénovation et le dépannage de votre réseau électrique : tableau, prises, éclairage, mise aux normes NF C 15-100, certifications Consuel. Il intervient également en domotique, recharge véhicule électrique et tableau communicant.",
    avgPrice: { unit: "intervention", min: 90, max: 400 },
    commonServices: [
      "Remplacement tableau électrique",
      "Mise aux normes NF C 15-100",
      "Installation prise et interrupteur",
      "Pose éclairage et luminaire",
      "Borne de recharge véhicule",
      "Dépannage électrique 24/7",
    ],
    emergency: true,
    icon: "zap",
    faq: [
      {
        q: "Combien coûte la rénovation électrique d'un appartement ?",
        a: "Comptez en moyenne entre 90 € et 130 € par m² pour une rénovation électrique complète aux normes NF C 15-100, certification Consuel comprise.",
      },
      {
        q: "Mon électricien doit-il être qualifié RGE ?",
        a: "La qualification RGE n'est obligatoire que pour bénéficier des aides à la rénovation énergétique (MaPrimeRénov', CEE). Pour une installation classique, l'assurance décennale suffit.",
      },
    ],
  },
  {
    slug: "chauffagiste",
    name: "Chauffagiste",
    plural: "Chauffagistes",
    category: "energie",
    schemaType: "HVACBusiness",
    shortDescription:
      "Installation et entretien chaudière, pompe à chaleur, radiateurs et planchers chauffants.",
    description:
      "Le chauffagiste installe, entretient et dépanne les systèmes de chauffage : chaudière gaz, fioul, pompe à chaleur, poêle, plancher chauffant. La qualification RGE est indispensable pour bénéficier de MaPrimeRénov' et des CEE.",
    avgPrice: { unit: "installation", min: 1500, max: 12000 },
    commonServices: [
      "Installation pompe à chaleur",
      "Remplacement chaudière gaz",
      "Entretien annuel obligatoire",
      "Dépannage chauffage",
      "Pose plancher chauffant",
      "Désembouage radiateurs",
    ],
    emergency: true,
    icon: "flame",
    faq: [
      {
        q: "L'entretien annuel de la chaudière est-il obligatoire ?",
        a: "Oui, l'entretien annuel des chaudières de 4 à 400 kW est obligatoire en France. Il doit être réalisé par un professionnel qualifié et coûte en moyenne entre 80 € et 180 €.",
      },
    ],
  },
  {
    slug: "menuisier",
    name: "Menuisier",
    plural: "Menuisiers",
    category: "second-oeuvre",
    schemaType: "GeneralContractor",
    shortDescription:
      "Pose de fenêtres, portes, parquet, escalier, dressing et menuiserie sur mesure.",
    description:
      "Le menuisier travaille le bois, le PVC et l'aluminium pour fabriquer et poser fenêtres, portes, escaliers, parquets, dressings et meubles sur mesure. Il intervient aussi bien en construction neuve qu'en rénovation.",
    avgPrice: { unit: "m²", min: 150, max: 800 },
    commonServices: [
      "Pose fenêtre PVC, alu, bois",
      "Installation porte d'entrée",
      "Pose parquet massif et stratifié",
      "Aménagement dressing sur mesure",
      "Fabrication escalier",
      "Pose volet roulant",
    ],
    emergency: false,
    icon: "hammer",
    faq: [],
  },
  {
    slug: "peintre",
    name: "Peintre",
    plural: "Peintres",
    category: "second-oeuvre",
    schemaType: "HousePainter",
    shortDescription:
      "Peinture intérieure et extérieure, ravalement, pose de papier peint et enduits.",
    description:
      "Le peintre en bâtiment réalise la mise en peinture des murs, plafonds et façades, la pose de papier peint, de toile de verre et d'enduits décoratifs.",
    avgPrice: { unit: "m²", min: 25, max: 50 },
    commonServices: [
      "Peinture murs et plafonds",
      "Ravalement de façade",
      "Pose papier peint",
      "Enduit décoratif",
      "Traitement humidité",
    ],
    emergency: false,
    icon: "paint-bucket",
    faq: [],
  },
  {
    slug: "macon",
    name: "Maçon",
    plural: "Maçons",
    category: "batiment",
    schemaType: "GeneralContractor",
    shortDescription: "Construction, extension, gros œuvre, ouverture de mur, dalle béton.",
    description:
      "Le maçon assure le gros œuvre : fondations, murs porteurs, dalles, extensions, agrandissements et ouvertures dans murs porteurs avec étude de structure.",
    avgPrice: { unit: "m²", min: 1200, max: 2500 },
    commonServices: [
      "Construction maison neuve",
      "Extension et surélévation",
      "Ouverture mur porteur",
      "Dalle béton et fondation",
      "Démolition cloison",
    ],
    emergency: false,
    icon: "brick-wall",
    faq: [],
  },
  {
    slug: "serrurier",
    name: "Serrurier",
    plural: "Serruriers",
    category: "depannage",
    schemaType: "Locksmith",
    shortDescription: "Ouverture de porte, blindage, remplacement de serrure, urgence 24/7.",
    description:
      "Le serrurier intervient en urgence pour ouvrir une porte claquée ou forcée, changer une serrure, poser un cylindre certifié A2P et blinder une porte d'entrée. Méfiez-vous des arnaques : exigez un devis signé avant intervention.",
    avgPrice: { unit: "intervention", min: 90, max: 350 },
    commonServices: [
      "Ouverture porte claquée",
      "Remplacement serrure",
      "Blindage porte d'entrée",
      "Pose cylindre A2P",
      "Dépannage urgence 24/7",
    ],
    emergency: true,
    icon: "key-round",
    faq: [
      {
        q: "Comment éviter les arnaques de serrurier ?",
        a: "Exigez toujours un devis détaillé et signé avant toute intervention, vérifiez l'existence légale de l'entreprise (SIRET), et privilégiez un artisan local référencé. Le tarif moyen d'une ouverture de porte est de 90 à 200 € en journée.",
      },
    ],
  },
  {
    slug: "vitrier",
    name: "Vitrier",
    plural: "Vitriers",
    category: "depannage",
    schemaType: "GeneralContractor",
    shortDescription: "Remplacement de vitre, double vitrage, miroir, vitrine, urgence 24/7.",
    description:
      "Le vitrier intervient pour remplacer une vitre cassée, poser un double ou triple vitrage, installer une vitrine, une véranda ou un miroir sur mesure.",
    avgPrice: { unit: "m²", min: 80, max: 300 },
    commonServices: [
      "Remplacement vitre cassée",
      "Pose double vitrage",
      "Installation véranda",
      "Miroir sur mesure",
      "Urgence 24/7",
    ],
    emergency: true,
    icon: "square",
    faq: [],
  },
  {
    slug: "couvreur",
    name: "Couvreur",
    plural: "Couvreurs",
    category: "batiment",
    schemaType: "RoofingContractor",
    shortDescription: "Réfection toiture, démoussage, zinguerie, isolation des combles.",
    description:
      "Le couvreur installe, rénove et entretient les toitures : tuile, ardoise, zinc, tôle. Il intervient aussi en zinguerie, traitement de charpente, isolation de combles et démoussage.",
    avgPrice: { unit: "m²", min: 60, max: 250 },
    commonServices: [
      "Réfection complète toiture",
      "Démoussage et traitement",
      "Pose gouttière zinc",
      "Isolation combles",
      "Réparation fuite toit",
    ],
    emergency: true,
    icon: "home",
    faq: [],
  },
  {
    slug: "carreleur",
    name: "Carreleur",
    plural: "Carreleurs",
    category: "second-oeuvre",
    schemaType: "GeneralContractor",
    shortDescription: "Pose de carrelage sol et mur, faïence, mosaïque, terrasse.",
    description:
      "Le carreleur pose le carrelage au sol et au mur, la faïence dans la salle de bain et la cuisine, et la mosaïque décorative.",
    avgPrice: { unit: "m²", min: 40, max: 100 },
    commonServices: [
      "Pose carrelage sol",
      "Faïence salle de bain",
      "Carrelage extérieur terrasse",
      "Mosaïque décorative",
    ],
    emergency: false,
    icon: "grid-3x3",
    faq: [],
  },
  {
    slug: "plaquiste",
    name: "Plaquiste",
    plural: "Plaquistes",
    category: "second-oeuvre",
    schemaType: "GeneralContractor",
    shortDescription: "Pose de cloisons, faux plafonds, doublage, isolation phonique.",
    description:
      "Le plaquiste pose les cloisons en placoplâtre, les faux plafonds, le doublage isolant et l'isolation phonique des murs.",
    avgPrice: { unit: "m²", min: 35, max: 80 },
    commonServices: [
      "Pose cloison placo",
      "Faux plafond",
      "Doublage isolant",
      "Isolation phonique",
    ],
    emergency: false,
    icon: "layout-grid",
    faq: [],
  },
  {
    slug: "jardinier-paysagiste",
    name: "Jardinier-paysagiste",
    plural: "Jardiniers-paysagistes",
    category: "exterieur",
    schemaType: "GeneralContractor",
    shortDescription:
      "Création de jardin, élagage, tonte, entretien et aménagement extérieur.",
    description:
      "Le paysagiste conçoit et entretient votre jardin : création paysagère, plantation, élagage, tonte, taille de haie, pose de gazon et aménagement extérieur.",
    avgPrice: { unit: "heure", min: 35, max: 60 },
    commonServices: [
      "Création de jardin",
      "Élagage arbre",
      "Tonte et entretien",
      "Taille de haie",
      "Pose gazon",
    ],
    emergency: false,
    icon: "trees",
    faq: [],
  },
];

export function getTradeBySlug(slug: string): Trade | undefined {
  return TRADES.find((t) => t.slug === slug);
}
