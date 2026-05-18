// Hand-maintained DB types until we run `supabase gen types`.
// Mirror of the SQL schema in supabase/migrations/.

export type ArtisanStatus = "draft" | "pending" | "active" | "suspended" | "archived";
export type ArtisanSource = "seed" | "sirene" | "claim" | "manual";
export type ReviewStatus = "pending" | "published" | "rejected";
export type LeadStatus = "new" | "qualified" | "dispatched" | "closed" | "spam";
export type DispatchStatus = "sent" | "opened" | "quoted" | "declined" | "won" | "lost";

export type ArtisanRow = {
  id: string;
  slug: string;
  name: string;
  owner_name: string | null;
  siret: string | null;
  trades: string[];
  city_slug: string | null;
  address: string | null;
  postal_code: string | null;
  phone: string | null;
  email: string | null;
  description: string | null;
  rating: number | null;
  review_count: number;
  years_experience: number | null;
  certifications: string[];
  emergency: boolean;
  verified: boolean;
  price_range: 1 | 2 | 3 | null;
  response_time_minutes: number | null;
  photo_url: string | null;
  photo_seed: string | null;
  lat: number | null;
  lng: number | null;
  user_id: string | null;
  status: ArtisanStatus;
  source: ArtisanSource;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type LeadInsert = {
  trade_slug: string;
  city_slug: string | null;
  postal_code: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  rgpd_consent: boolean;
  source?: string;
};

export type ReviewInsert = {
  artisan_id: string;
  author_name: string;
  author_email?: string;
  rating: number;
  body: string;
  lead_id?: string;
};
