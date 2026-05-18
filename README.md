# Artisans Près De Chez Vous

Annuaire d'artisans qualifiés partout en France, conçu pour viser le **top 3 SEO** sur les requêtes "métier + ville".

## Stack

- **Next.js 15** (App Router, ISR, Server Components)
- **React 19** RC
- **TypeScript** strict
- **Tailwind CSS** + design system custom
- **Supabase** (Postgres, Auth, Storage) — config prête, non encore branchée
- **Lucide** pour les icônes

## SEO baked in

- Schema.org JSON-LD : `Organization`, `WebSite` (SearchAction), `BreadcrumbList`, `ItemList`, `Service`, `FAQPage`, `LocalBusiness` (typé `Plumber`, `Electrician`, etc.)
- Metadata Next.js : title templates, canonical, OpenGraph, Twitter Card, robots
- Sitemap dynamique (`/sitemap.xml`) — ~2 260 URLs en dev (s'étend à 100k+ en prod)
- `robots.txt` dynamique
- ISR `revalidate = 86400`
- `lang="fr"`, `hreflang fr-FR`
- Headers de sécurité (CSP-ready, Referrer-Policy, etc.)

## Architecture des routes

```
/                                  Accueil
/[metier]                          Page pilier métier (plombier, electricien…)
/[metier]/[ville]                  Page ville×métier (la mine d'or SEO)
/[metier]/[ville]/[slug-artisan]   Fiche artisan
/metiers                           Index métiers
/guides                            Liste guides éditoriaux
/devis                             Formulaire devis
/artisan/inscription               Onboarding artisan
/recherche                         Recherche
/sitemap.xml                       Sitemap
/robots.txt                        Robots
```

## Démarrer

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # build production
pnpm typecheck
```

## Données

Les artisans sont fictifs et générés à la volée par `src/data/artisans.ts` (random seedé pour stabilité). À remplacer par un import depuis l'API Sirene de l'INSEE + table Supabase `artisans`.

## Roadmap (extraite du plan global)

1. Branchement Supabase + import Sirene
2. Recherche Meilisearch (autocomplete)
3. Auth artisan (Supabase Auth)
4. Espace artisan : dashboard leads, photos, abonnement Stripe
5. Pages département + région
6. 400+ guides éditoriaux
7. Avis vérifiés (mail post-intervention)
8. Carte interactive Leaflet/MapLibre
9. Tracking SERP (top 100 villes × top 10 métiers)
10. Backlinks campaign (50 RD DR>40 en 6 mois)
