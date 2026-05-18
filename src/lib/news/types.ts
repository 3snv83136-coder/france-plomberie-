// Mirrors the GuideBlock discriminated union so we can reuse <GuideContent />
// to render news articles.

export type NewsBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | {
      type: "callout";
      variant: "tip" | "warning" | "info" | "success";
      title?: string;
      text: string;
    }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  | { type: "quote"; text: string; author?: string };

export type NewsType = "tarifs" | "saison" | "guide-local" | "actualite";

export type NewsArticle = {
  id?: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  body: NewsBlock[];
  type: NewsType;
  citySlug: string | null;
  tradeSlug: string | null;
  readingMinutes: number;
  generatorSeed: string;
  publishedAt: string; // ISO
};
