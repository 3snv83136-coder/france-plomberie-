import { CITIES } from "./cities";
import { TRADES } from "./trades";

export type Artisan = {
  id: string;
  slug: string;
  name: string;
  ownerName: string;
  trades: string[];
  citySlug: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  certifications: string[];
  emergency: boolean;
  verified: boolean;
  priceRange: 1 | 2 | 3;
  responseTimeMinutes: number;
  photoSeed: string;
  reviews: { author: string; rating: number; date: string; body: string }[];
};

const FIRST_NAMES = [
  "Pierre",
  "Jean",
  "Mohammed",
  "Sébastien",
  "Karim",
  "Antoine",
  "Stéphane",
  "Nicolas",
  "Frédéric",
  "Mathieu",
  "Olivier",
  "Christophe",
  "Julien",
  "Vincent",
  "Cédric",
];

const LAST_NAMES = [
  "Martin",
  "Bernard",
  "Dubois",
  "Thomas",
  "Robert",
  "Petit",
  "Durand",
  "Leroy",
  "Moreau",
  "Simon",
  "Laurent",
  "Lefèvre",
  "Michel",
  "Garcia",
  "David",
];

const COMPANY_SUFFIX = [
  "SARL",
  "& Fils",
  "Pro",
  "Services",
  "Expert",
  "Plus",
  "Artisan",
  "Solutions",
];

const STREET_NAMES = [
  "rue de la République",
  "avenue Jean Jaurès",
  "rue Victor Hugo",
  "boulevard Voltaire",
  "rue Pasteur",
  "avenue de la Liberté",
  "rue des Lilas",
  "place du Marché",
  "rue de la Mairie",
  "avenue Foch",
];

const REVIEW_TEMPLATES: { rating: number; body: string }[] = [
  {
    rating: 5,
    body: "Intervention rapide et efficace. Tarif annoncé respecté, travail propre. Je recommande sans hésiter.",
  },
  {
    rating: 5,
    body: "Très professionnel, ponctuel, prend le temps d'expliquer. Devis clair et facture conforme. Top !",
  },
  {
    rating: 4,
    body: "Bon artisan, prestation conforme. Quelques minutes de retard mais a prévenu à l'avance. Bon rapport qualité-prix.",
  },
  {
    rating: 5,
    body: "Urgence un dimanche, est venu en 45 minutes. Problème résolu, prix correct pour un week-end. Sauveur !",
  },
  {
    rating: 4,
    body: "Travail soigné, équipe sympa. Petit oubli sur la finition rapidement corrigé après appel. Je recommande.",
  },
  {
    rating: 5,
    body: "Excellent rapport qualité-prix, devis détaillé, intervention propre. À garder dans ses contacts !",
  },
  {
    rating: 5,
    body: "Très satisfait, deuxième intervention en deux ans. Toujours sérieux, prix juste, conseils pertinents.",
  },
];

const REVIEW_AUTHORS = [
  "Sophie L.",
  "Marc D.",
  "Camille R.",
  "Léa M.",
  "Thomas B.",
  "Inès K.",
  "Patrick V.",
  "Nathalie F.",
  "Yanis A.",
  "Élodie P.",
];

function seedRandom(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function buildArtisansForCity(citySlug: string, tradeSlug: string): Artisan[] {
  const rng = seedRandom(`${citySlug}-${tradeSlug}`);
  const trade = TRADES.find((t) => t.slug === tradeSlug)!;
  const count = 5 + Math.floor(rng() * 4); // 5-8 artisans
  const city = CITIES.find((c) => c.slug === citySlug)!;
  const artisans: Artisan[] = [];

  for (let i = 0; i < count; i++) {
    const first = pick(FIRST_NAMES, rng);
    const last = pick(LAST_NAMES, rng);
    const useFullName = rng() > 0.5;
    const suffix = pick(COMPANY_SUFFIX, rng);
    const baseName = useFullName ? `${first} ${last}` : `${trade.name} ${last}`;
    const name = `${baseName} ${suffix}`;
    const id = `${citySlug}-${tradeSlug}-${i + 1}`;
    const slug = `${name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")}-${i + 1}`;

    const reviewCount = 15 + Math.floor(rng() * 180);
    const ratingRaw = 4.0 + rng() * 1.0;
    const rating = Math.round(ratingRaw * 10) / 10;

    const reviewBlocks = Math.min(3, reviewCount);
    const reviews = [];
    for (let r = 0; r < reviewBlocks; r++) {
      const tpl = pick(REVIEW_TEMPLATES, rng);
      const d = new Date(2026, 4 - Math.floor(rng() * 12), 1 + Math.floor(rng() * 27));
      reviews.push({
        author: pick(REVIEW_AUTHORS, rng),
        rating: tpl.rating,
        date: d.toISOString().slice(0, 10),
        body: tpl.body,
      });
    }

    artisans.push({
      id,
      slug,
      name,
      ownerName: `${first} ${last}`,
      trades: [tradeSlug],
      citySlug,
      address: `${1 + Math.floor(rng() * 80)} ${pick(STREET_NAMES, rng)}, ${city.postalCode} ${city.name}`,
      phone: `0${1 + Math.floor(rng() * 6)}${Math.floor(rng() * 100000000)
        .toString()
        .padStart(8, "0")}`,
      email: `contact@${slug.split("-").slice(0, 2).join("")}.fr`,
      description: `Artisan ${trade.name.toLowerCase()} basé à ${city.name}, ${5 + Math.floor(rng() * 25)} ans d'expérience au service des particuliers et professionnels. Devis gratuit, intervention rapide${
        trade.emergency ? ", urgence 24h/24 et 7j/7" : ""
      }.`,
      rating,
      reviewCount,
      yearsExperience: 5 + Math.floor(rng() * 25),
      certifications: pickCertifications(trade.slug, rng),
      emergency: trade.emergency && rng() > 0.3,
      verified: rng() > 0.2,
      priceRange: (1 + Math.floor(rng() * 3)) as 1 | 2 | 3,
      responseTimeMinutes: 15 + Math.floor(rng() * 105),
      photoSeed: `${first}+${last}`,
      reviews,
    });
  }

  return artisans.sort((a, b) => b.rating - a.rating);
}

function pickCertifications(tradeSlug: string, rng: () => number): string[] {
  const certs: string[] = [];
  if (rng() > 0.4) certs.push("Assurance décennale");
  if (["chauffagiste", "plombier", "electricien", "couvreur"].includes(tradeSlug) && rng() > 0.5) {
    certs.push("RGE Qualibat");
  }
  if (tradeSlug === "chauffagiste" && rng() > 0.6) certs.push("QualiPAC");
  if (tradeSlug === "electricien" && rng() > 0.6) certs.push("Qualifelec");
  if (rng() > 0.7) certs.push("Artisan vérifié SIRET");
  return certs;
}

const CACHE = new Map<string, Artisan[]>();

export function getArtisansForCityAndTrade(
  citySlug: string,
  tradeSlug: string,
): Artisan[] {
  const key = `${citySlug}:${tradeSlug}`;
  if (!CACHE.has(key)) {
    CACHE.set(key, buildArtisansForCity(citySlug, tradeSlug));
  }
  return CACHE.get(key)!;
}

export function getArtisanBySlug(
  citySlug: string,
  tradeSlug: string,
  artisanSlug: string,
): Artisan | undefined {
  return getArtisansForCityAndTrade(citySlug, tradeSlug).find(
    (a) => a.slug === artisanSlug,
  );
}
