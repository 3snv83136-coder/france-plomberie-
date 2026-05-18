export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; variant: "tip" | "warning" | "info" | "success"; title?: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  | { type: "quote"; text: string; author?: string };

export type GuideSection = {
  id: string;
  heading: string;
  blocks: GuideBlock[];
};

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: "Prix" | "Aides" | "Conseils" | "Travaux" | "Démarches";
  excerpt: string;
  heroIntro: string;
  readingMinutes: number;
  publishedAt: string;
  updatedAt: string;
  author: { name: string; role: string };
  keyTakeaways: string[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  relatedTrades: string[];
  related: string[];
};
