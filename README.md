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

Le site fonctionne en deux modes :

1. **Sans Supabase configuré** (par défaut) : les artisans sont générés à la volée par `src/data/artisans.ts` (RNG seedée, données stables). Le formulaire de devis renvoie `202 Accepted` sans persister.

2. **Avec Supabase configuré** : la data access layer (`src/lib/db/`) requête Supabase en priorité, tombe sur les données seed en cas d'erreur/absence. Le formulaire devis persiste dans `public.leads`.

### Setup Supabase

```bash
# 1. Créer un projet sur https://supabase.com
# 2. Copier .env.example vers .env.local et remplir les 3 variables

# 3. Appliquer les migrations (au choix)
#    a) Via Supabase CLI :
supabase link --project-ref <REF>
supabase db push
#    b) Ou copier-coller le contenu de supabase/migrations/*.sql
#       dans le SQL Editor de Supabase Studio, dans l'ordre.

# 4. Peupler les tables référentielles (regions / departments / cities / trades)
pnpm seed:db
# Pour aussi importer des artisans fictifs (top 50 villes × 12 métiers) :
pnpm seed:db:full

# 5. Importer les VRAIS artisans depuis le RNE de l'INPI (recommandé)
pnpm import:inpi              # toutes les villes
pnpm import:inpi --cities 20  # test sur les 20 plus grandes villes
pnpm import:inpi --per 8      # plafonne à N entreprises par ville × NAF

# 6. Lancer le site
pnpm dev
```

### Import INPI / RNE (vraies données artisans)

`pnpm import:inpi` interroge l'API officielle gratuite
`recherche-entreprises.api.gouv.fr` (qui source le Registre National des
Entreprises de l'INPI + Sirene de l'INSEE) et remplit `public.artisans`
avec de vraies entreprises : nom, SIRET, adresse, code NAF, date de
création. `source='inpi'`, `verified=true`. Idempotent (conflit sur
`siret`). Nécessite un accès réseau sortant + `SUPABASE_SERVICE_ROLE_KEY`.

Les fiches importées n'ont ni note, ni avis, ni téléphone (le RNE ne les
fournit pas) : l'UI s'adapte et affiche « Entreprise vérifiée au RNE » à
la place. Les leads passent toujours par la modale de rappel.

### Schéma BDD

- `regions`, `departments`, `cities`, `trades` — référentiel géo et métiers (read-only public)
- `artisans` — fiches artisans (RLS : public si `status = 'active'`, écriture artisan via `user_id`)
- `reviews` — avis clients (RLS : insertion publique en `pending`, modération via service_role)
- `leads` — demandes de devis (RLS : insertion publique, lecture service_role uniquement → PII)
- `lead_dispatches` — relation lead × artisan (RLS : artisan voit ses dispatches)
- `profiles` — extension de `auth.users` (artisans, admin, support)

Tous les triggers `updated_at` et la création automatique de profil au signup sont inclus.

## Roadmap restante

1. ~~Scaffold Next.js + SEO programmatique~~ ✓
2. ~~Pages département + région~~ ✓
3. ~~Pages trust/légales (E-E-A-T)~~ ✓
4. ~~10+ guides éditoriaux longs~~ ✓
5. ~~Performance (avatars locaux, OG dynamique, manifest)~~ ✓
6. ~~Supabase schema + API leads~~ ✓
7. ~~Script de seed `pnpm seed:db`~~ ✓
8. ~~Import INPI / RNE des vraies entreprises (`pnpm import:inpi`)~~ ✓
9. Auth artisan (Supabase Auth) + espace dashboard
10. Recherche Meilisearch (autocomplete)
11. Avis vérifiés (mail post-intervention)
12. Carte interactive Leaflet/MapLibre
13. Stripe abonnements Premium artisan
14. Tracking SERP (top 100 villes × top 10 métiers)
15. Backlinks campaign (50 RD DR>40 en 6 mois)
