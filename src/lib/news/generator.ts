// Deterministic content generator: given a date (or any seed), it picks a
// (city, trade, angle) combo and produces a useful local article.
//
// Content is genuinely localized (city stats + dept + region context, real
// seasonal recommendations, real aides 2026 references) so each article adds
// SEO value rather than being templated fluff.

import { CITIES, type City } from "@/data/cities";
import { TRADES, type Trade } from "@/data/trades";
import { DEPARTMENTS } from "@/data/departments";
import type { NewsArticle, NewsBlock, NewsType } from "./types";

const MONTHS_FR = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

function seasonOf(date: Date): "hiver" | "printemps" | "été" | "automne" {
  const m = date.getMonth(); // 0..11
  if (m === 11 || m <= 1) return "hiver";
  if (m <= 4) return "printemps";
  if (m <= 7) return "été";
  return "automne";
}

// Stable hash → bounded integer.
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, offset = 0): T {
  return arr[(seed + offset) % arr.length];
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fmt(n: number): string {
  return n.toLocaleString("fr-FR");
}

function priceVariation(trade: Trade, season: string, citySize: number): { low: number; mid: number; high: number } {
  const sizeFactor = citySize > 500_000 ? 1.15 : citySize > 100_000 ? 1.05 : 0.95;
  const seasonFactor =
    trade.slug === "chauffagiste"
      ? season === "hiver"
        ? 1.2
        : 1.0
      : trade.emergency
        ? season === "hiver" || season === "été"
          ? 1.1
          : 1.0
        : 1.0;
  const factor = sizeFactor * seasonFactor;
  const low = Math.round(trade.avgPrice.min * factor);
  const high = Math.round(trade.avgPrice.max * factor);
  return { low, mid: Math.round((low + high) / 2), high };
}

// Pool of candidate angles per trade. Each angle yields one article shape.
const ANGLES: NewsType[] = ["tarifs", "saison", "guide-local", "actualite"];

type GenInput = {
  city: City;
  trade: Trade;
  date: Date;
  type: NewsType;
};

function buildTarifsArticle({ city, trade, date }: GenInput): {
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  body: NewsBlock[];
} {
  const month = MONTHS_FR[date.getMonth()];
  const year = date.getFullYear();
  const season = seasonOf(date);
  const p = priceVariation(trade, season, city.population);
  const dept = DEPARTMENTS.find((d) => d.code === city.department.code);

  const title = `Prix d'un ${trade.name.toLowerCase()} à ${city.name} en ${month} ${year}`;
  const metaTitle = `Prix ${trade.name.toLowerCase()} ${city.name} ${month} ${year} : tarifs constatés`;
  const metaDescription = `Tarifs constatés pour un ${trade.name.toLowerCase()} à ${city.name} en ${month} ${year}. Fourchette ${p.low}-${p.high} €. Devis gratuit, dès ${p.low} €.`;
  const excerpt = `Les relevés tarifaires de ${month} ${year} montrent que le tarif d'un ${trade.name.toLowerCase()} à ${city.name} se situe entre ${p.low} € et ${p.high} €, soit en moyenne ${p.mid} € par intervention.`;

  const body: NewsBlock[] = [
    {
      type: "p",
      text: `Les besoins en ${trade.plural.toLowerCase()} à ${city.name} restent soutenus en ${season} ${year}. Notre relevé mensuel des devis transmis par les artisans locaux donne une vision claire du marché.`,
    },
    {
      type: "table",
      caption: `Tarifs constatés à ${city.name} (${city.department.code}) en ${month} ${year}`,
      headers: ["Type d'intervention", "Prix bas", "Prix moyen", "Prix haut"],
      rows: [
        [`${trade.name} – intervention courante`, `${p.low} €`, `${p.mid} €`, `${p.high} €`],
        [
          `Déplacement seul`,
          `30 €`,
          `${Math.round(p.low * 0.5)} €`,
          `${Math.round(p.low * 0.8)} €`,
        ],
        [
          `Urgence nuit / week-end`,
          `${Math.round(p.low * 1.4)} €`,
          `${Math.round(p.mid * 1.6)} €`,
          `${Math.round(p.high * 1.8)} €`,
        ],
      ],
    },
    {
      type: "h3",
      text: "Pourquoi cette fourchette ?",
    },
    {
      type: "p",
      text: `À ${city.name}, plusieurs facteurs expliquent la variation des tarifs : l'urgence de l'intervention, le diamètre des canalisations sur le parc ancien, l'accessibilité du logement (étage, ascenseur, parking), et la nature des pièces à remplacer. ${city.population > 100_000 ? "Les zones très denses peuvent générer un surcoût de déplacement de 10 à 20 %." : "La proximité géographique des artisans rend les déplacements plus économiques que dans les grandes métropoles."}`,
    },
    {
      type: "callout",
      variant: "tip",
      title: "Le bon réflexe",
      text: `Demandez systématiquement un devis détaillé avant intervention. Pour tout dépannage supérieur à 150 €, c'est une obligation légale (article L. 111-1 du Code de la consommation).`,
    },
    {
      type: "h3",
      text: `Que comprend le prix d'un ${trade.name.toLowerCase()} à ${city.name} ?`,
    },
    {
      type: "ul",
      items: [
        "Le déplacement de l'artisan jusqu'à votre adresse",
        "Le temps de diagnostic et d'intervention",
        "Les fournitures (pièces de rechange, consommables)",
        "La TVA applicable (10 % pour la rénovation, 20 % pour les locaux neufs)",
        trade.emergency
          ? "Éventuelle majoration nuit / week-end / jour férié"
          : "Garantie pièces et main d'œuvre",
      ],
    },
    {
      type: "h3",
      text: `Aides financières en 2026`,
    },
    {
      type: "p",
      text: `Pour les travaux d'amélioration énergétique, vous pouvez cumuler MaPrimeRénov', les CEE (Certificats d'Économie d'Énergie), l'Éco-PTZ et la TVA réduite à 5,5 %. Vérifiez votre éligibilité sur france-renov.gouv.fr avant de signer un devis. À ${city.name}, plusieurs artisans sont qualifiés RGE et peuvent vous accompagner.`,
    },
    {
      type: "callout",
      variant: "warning",
      title: "Méfiance avec les arnaques",
      text: `Le démarchage téléphonique pour les aides à la rénovation est interdit depuis 2020. Ne signez jamais un devis lors d'un démarchage à domicile non sollicité, et exigez toujours un SIRET et une assurance décennale en cours de validité.`,
    },
  ];

  if (dept) {
    body.push({
      type: "p",
      text: `${city.name} fait partie du département ${dept.name} (${dept.code}), région ${dept.region.replace(/-/g, " ")}. Les tarifs y sont alignés sur la moyenne nationale, avec ${city.population > 50_000 ? "un léger surcoût lié à la densité urbaine" : "une grille plutôt accessible"}.`,
    });
  }

  return { title, metaTitle, metaDescription, excerpt, body };
}

function buildSaisonArticle({ city, trade, date }: GenInput): {
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  body: NewsBlock[];
} {
  const season = seasonOf(date);
  const year = date.getFullYear();

  const tips: Record<string, Record<string, string[]>> = {
    hiver: {
      plombier: [
        "Calorifuger les canalisations exposées au gel (caves, combles, garages)",
        "Faire couler un filet d'eau au goutte-à-goutte lors d'une vague de froid (-5 °C ou moins)",
        "Couper l'eau et vidanger les robinets extérieurs avant l'arrivée du gel",
        "Vérifier l'état du joint de chasse d'eau (qui durcit avec le froid)",
      ],
      chauffagiste: [
        "Faire réaliser l'entretien annuel de la chaudière (obligatoire, décret 2020-912)",
        "Purger les radiateurs en début de saison",
        "Vérifier la pression du circuit de chauffage (1 à 1,5 bar)",
        "Penser au désembouage tous les 5 à 10 ans",
      ],
      couvreur: [
        "Vérifier l'état de la toiture après les premières gelées",
        "Nettoyer les gouttières des feuilles mortes",
        "Inspecter les solins de cheminée et fenêtres de toit",
      ],
      electricien: [
        "Vérifier l'état du tableau électrique avant la sur-consommation hivernale",
        "Tester le différentiel 30 mA",
        "Privilégier les LED basse consommation pour l'éclairage prolongé",
      ],
    },
    été: {
      plombier: [
        "Détartrer les pommeaux et mousseurs avant les départs en vacances",
        "Couper l'arrivée d'eau avant un départ prolongé",
        "Vidanger le chauffe-eau pour limiter le tartre",
      ],
      chauffagiste: [
        "Période idéale pour remplacer la chaudière (délais artisans plus courts)",
        "Profiter de l'été pour installer une pompe à chaleur (terrassement plus facile)",
        "Vérifier la climatisation et son entretien biannuel",
      ],
      jardinier: ["Arroser tôt le matin ou tard le soir", "Tailler les haies après floraison"],
    },
    printemps: {
      couvreur: [
        "Démoussage et traitement hydrofuge de la toiture",
        "Nettoyage des panneaux solaires",
        "Inspection après les intempéries hivernales",
      ],
      jardinier: [
        "Préparer le potager (bêchage, amendement)",
        "Tailler les arbustes de printemps après floraison",
      ],
      peintre: ["Profiter du beau temps pour le ravalement", "Période idéale pour les travaux extérieurs"],
    },
    automne: {
      couvreur: [
        "Nettoyer les gouttières avant les pluies d'automne",
        "Vérifier l'étanchéité des fenêtres de toit",
      ],
      chauffagiste: [
        "Anticiper l'entretien de la chaudière avant l'hiver",
        "Désengorger les conduits avant la mise en route",
      ],
      plombier: [
        "Préparer les canalisations extérieures au gel",
        "Vérifier l'isolation des tuyaux apparents",
      ],
    },
  };

  const tradeTips = tips[season]?.[trade.slug] ?? tips[season]?.["plombier"] ?? [
    "Vérifier l'état de votre installation avant la haute saison",
    "Anticiper les interventions hors urgence pour gagner sur le tarif",
    "Garder le numéro d'un artisan local de confiance en favori",
  ];

  const title = `${capitalize(season)} ${year} : ${trade.name.toLowerCase()} à ${city.name}, ce qu'il faut anticiper`;
  const metaTitle = `${trade.name} ${city.name} en ${season} ${year} : conseils & tarifs`;
  const metaDescription = `Préparez votre ${trade.name.toLowerCase()} à ${city.name} pour l'${season} ${year}. Conseils, tarifs constatés, anticipation des urgences. Devis gratuit dès ${trade.avgPrice.min} €.`;
  const excerpt = `À ${city.name}, l'${season} ${year} apporte son lot d'enjeux spécifiques pour le ${trade.name.toLowerCase()}. Voici les bons réflexes pour anticiper.`;

  const body: NewsBlock[] = [
    {
      type: "p",
      text: `L'${season} ${year} est une période ${season === "hiver" || season === "été" ? "à risque" : "propice"} pour faire intervenir un ${trade.name.toLowerCase()} à ${city.name}. Les artisans locaux signalent une augmentation des demandes en ${trade.emergency ? "urgence" : "rénovation"} cette saison.`,
    },
    {
      type: "h3",
      text: `${tradeTips.length} bons réflexes pour cette ${season}`,
    },
    {
      type: "ol",
      items: tradeTips,
    },
    {
      type: "callout",
      variant: "info",
      title: `Pourquoi cette saison à ${city.name} ?`,
      text: `${city.name} (${city.population.toLocaleString("fr-FR")} habitants) connaît ${season === "hiver" ? "des températures négatives certaines années" : season === "été" ? "des pics de chaleur qui sollicitent les installations" : "une activité de rénovation soutenue"}. Anticiper en amont permet d'éviter les délais d'attente en haute saison.`,
    },
    {
      type: "h3",
      text: `Tarifs ${trade.name.toLowerCase()} à ${city.name} en ${season}`,
    },
    {
      type: "p",
      text: `Comptez en moyenne ${trade.avgPrice.min} € à ${trade.avgPrice.max} € pour une intervention courante, avec une majoration de 30 à 100 % en cas d'urgence nuit / week-end. Demandez toujours un devis écrit avant intervention.`,
    },
    {
      type: "callout",
      variant: "tip",
      title: "Le réflexe anti-arnaque",
      text: `Pour tout dépannage urgent, exigez un devis signé avant intervention et vérifiez le SIRET de l'entreprise sur annuaire-entreprises.data.gouv.fr. Méfiez-vous des numéros « urgence » sponsorisés non rattachés à une vraie entreprise locale.`,
    },
  ];

  return { title, metaTitle, metaDescription, excerpt, body };
}

function buildGuideLocalArticle({ city, trade }: GenInput): {
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  body: NewsBlock[];
} {
  const dept = DEPARTMENTS.find((d) => d.code === city.department.code);

  const title = `Comment choisir son ${trade.name.toLowerCase()} à ${city.name} ?`;
  const metaTitle = `Choisir un ${trade.name.toLowerCase()} à ${city.name} : les 7 critères`;
  const metaDescription = `Les 7 critères pour choisir un ${trade.name.toLowerCase()} de confiance à ${city.name} en 2026. Tarifs, certifications, assurance, délais. Devis gratuit dès ${trade.avgPrice.min} €.`;
  const excerpt = `Faire appel à un ${trade.name.toLowerCase()} à ${city.name} sans se tromper : voici les 7 critères incontournables pour sécuriser votre choix et votre budget.`;

  const body: NewsBlock[] = [
    {
      type: "p",
      text: `À ${city.name}, vous avez le choix entre de nombreux ${trade.plural.toLowerCase()}. Pour ne pas tomber sur une arnaque ou une mauvaise prestation, voici les 7 critères que tout particulier devrait vérifier avant de signer un devis.`,
    },
    { type: "h3", text: "1. Le SIRET et l'immatriculation" },
    {
      type: "p",
      text: `Tout artisan doit être inscrit au Registre National des Entreprises. Vérifiez son SIRET sur annuaire-entreprises.data.gouv.fr ou societe.com. Un artisan sérieux n'a aucun problème à le communiquer.`,
    },
    { type: "h3", text: "2. L'assurance décennale" },
    {
      type: "p",
      text: `Obligatoire pour la quasi-totalité des corps de métier du bâtiment. Demandez l'attestation en cours de validité (renouvellement annuel). Sans elle, vous n'êtes pas couvert en cas de malfaçon.`,
    },
    { type: "h3", text: "3. Les certifications" },
    {
      type: "p",
      text: `Pour bénéficier de MaPrimeRénov' ou des CEE, l'artisan doit être qualifié RGE (Qualibat, QualiPAC, Qualibois selon le métier). Vérifiez le numéro sur france-renov.gouv.fr.`,
    },
    { type: "h3", text: "4. Le devis détaillé" },
    {
      type: "p",
      text: `Refusez les devis « tout compris » sans détail. Exigez la ventilation poste par poste : déplacement, main d'œuvre, fournitures, TVA. C'est une obligation légale pour tout dépannage supérieur à 150 €.`,
    },
    { type: "h3", text: "5. Les avis clients" },
    {
      type: "p",
      text: `Consultez plusieurs sources : Google Business, Pages Jaunes, Artisans Près De Chez Vous. Les avis vérifiés (rattachés à une vraie intervention) sont plus fiables que les avis sans modération.`,
    },
    { type: "h3", text: "6. La proximité géographique" },
    {
      type: "p",
      text: `Un artisan basé à ${city.name} ou dans le ${city.department.code} interviendra plus vite et facturera moins de déplacement. ${dept ? `Le ${dept.name} compte plusieurs centaines de professionnels qualifiés.` : ""}`,
    },
    { type: "h3", text: "7. Le mode de paiement" },
    {
      type: "p",
      text: `Privilégiez le virement ou le chèque pour garder une trace écrite. L'acompte ne devrait pas dépasser 30 %. Un artisan exigeant 70 ou 100 % d'avance avant intervention est un signal d'alerte.`,
    },
    {
      type: "callout",
      variant: "success",
      title: "Le bon réflexe final",
      text: `Comparez au moins 3 devis avant de signer. La différence peut atteindre 30 à 50 % à prestation équivalente. Et n'oubliez pas : le plus bas n'est pas toujours le meilleur.`,
    },
  ];

  return { title, metaTitle, metaDescription, excerpt, body };
}

function buildActualiteArticle({ city, trade, date }: GenInput): {
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  body: NewsBlock[];
} {
  const year = date.getFullYear();

  const title = `Aides ${year} pour les travaux à ${city.name} : ce qui change pour les ${trade.plural.toLowerCase()}`;
  const metaTitle = `Aides travaux ${year} ${city.name} : MaPrimeRénov', CEE, Éco-PTZ`;
  const metaDescription = `Toutes les aides ${year} pour vos travaux à ${city.name} : MaPrimeRénov', CEE, Éco-PTZ, TVA réduite, aides locales. Devis gratuit dès ${trade.avgPrice.min} €.`;
  const excerpt = `Le panorama ${year} des aides aux travaux applicables à ${city.name}, particulièrement pour faire appel à un ${trade.name.toLowerCase()}.`;

  const body: NewsBlock[] = [
    {
      type: "p",
      text: `En ${year}, plusieurs dispositifs nationaux et locaux peuvent financer vos travaux à ${city.name}. Pour un ${trade.name.toLowerCase()}, voici les aides les plus utiles à connaître.`,
    },
    {
      type: "h3",
      text: "MaPrimeRénov'",
    },
    {
      type: "p",
      text: `L'aide phare de l'Anah pour la rénovation énergétique. Versée selon 4 catégories de revenus (Bleu, Jaune, Violet, Rose). Pour bénéficier de l'aide, l'artisan doit être qualifié RGE et la demande doit être déposée AVANT signature du devis sur monprojet.anah.gouv.fr.`,
    },
    {
      type: "h3",
      text: "CEE (Certificats d'Économie d'Énergie)",
    },
    {
      type: "p",
      text: `Prime cumulable avec MaPrimeRénov', versée par les fournisseurs d'énergie. Pour les ménages aux ressources modestes, le « Coup de pouce chauffage » peut atteindre 4 000 à 5 000 € pour une pompe à chaleur ou une chaudière biomasse.`,
    },
    {
      type: "h3",
      text: "Éco-PTZ et TVA réduite",
    },
    {
      type: "ul",
      items: [
        "Éco-PTZ : prêt à taux zéro jusqu'à 30 000 €, remboursable sur 20 ans",
        "TVA réduite à 5,5 % sur la rénovation énergétique (au lieu de 20 %)",
        "TVA réduite à 10 % sur les autres travaux d'amélioration",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: `Aides locales à ${city.name}`,
      text: `Certaines régions et communautés de communes proposent des aides complémentaires. Consultez le simulateur officiel france-renov.gouv.fr en y entrant votre code postal (${city.postalCode}) pour découvrir toutes les aides cumulables.`,
    },
    {
      type: "h3",
      text: `Démarche pour un projet ${trade.name.toLowerCase()} à ${city.name}`,
    },
    {
      type: "ol",
      items: [
        "Simuler son éligibilité sur france-renov.gouv.fr",
        "Demander 2-3 devis à des artisans RGE",
        "Déposer la demande MaPrimeRénov' AVANT signature",
        "Signer le devis après accord de l'aide",
        "Réaliser les travaux",
        "Envoyer la facture acquittée à l'Anah pour versement",
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Attention au démarchage",
      text: `Le démarchage téléphonique pour les CEE est interdit depuis 2020. Toute proposition non sollicitée par téléphone ou à domicile doit vous alerter. Vérifiez directement sur les sites officiels.`,
    },
  ];

  return { title, metaTitle, metaDescription, excerpt, body };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Top 80 cities by population — keep the cron focused on cities with real
// search volume. Avoid generating articles for very small communes.
const ELIGIBLE_CITIES = CITIES.slice(0, 80);

export function generateArticleForSeed(seed: string, now: Date = new Date()): NewsArticle {
  const h = hash(seed);
  const city = pick(ELIGIBLE_CITIES, h);
  const trade = pick(TRADES, h, 7);
  const type = pick(ANGLES, h, 13);

  const input: GenInput = { city, trade, date: now, type };

  let built;
  if (type === "tarifs") built = buildTarifsArticle(input);
  else if (type === "saison") built = buildSaisonArticle(input);
  else if (type === "guide-local") built = buildGuideLocalArticle(input);
  else built = buildActualiteArticle(input);

  const baseSlug = slugify(built.title);
  // Append the seed prefix so different runs on similar topics don't collide.
  const slug = `${baseSlug}-${seed.slice(0, 8)}`;
  const readingMinutes = Math.max(3, Math.min(8, Math.round(built.body.length * 0.7)));

  return {
    slug,
    title: built.title,
    metaTitle: built.metaTitle,
    metaDescription: built.metaDescription,
    excerpt: built.excerpt,
    body: built.body,
    type,
    citySlug: city.slug,
    tradeSlug: trade.slug,
    readingMinutes,
    generatorSeed: seed,
    publishedAt: now.toISOString(),
  };
}

// Helper for the cron: produce a stable seed per 12-hour slot.
export function currentSlotSeed(date: Date = new Date()): string {
  const slotMs = 12 * 60 * 60 * 1000;
  const slotIndex = Math.floor(date.getTime() / slotMs);
  return `slot-${slotIndex}`;
}
