import { aidesTravaux2026 } from "./aides-travaux-2026";
import { debouchageCanalisationPrix } from "./debouchage-canalisation-prix";
import { devisTravauxPiegesAEviter } from "./devis-travaux-pieges-a-eviter";
import { eviterArnaqueSerrurier } from "./eviter-arnaque-serrurier";
import { isolationComblesPrixAides } from "./isolation-combles-prix-aides";
import { maprimerenov2026 } from "./maprimerenov-2026-guide-complet";
import { normeElectriqueNFC15100 } from "./norme-electrique-nf-c-15-100";
import { pompeAChaleurPrix2026 } from "./pompe-a-chaleur-prix-2026";
import { prixChangementChaudiere2026 } from "./prix-changement-chaudiere-2026";
import { prixRenovationSalleDeBain } from "./prix-renovation-salle-de-bain";
import { trouverArtisanRge } from "./trouver-artisan-rge";
import type { Guide } from "./types";

export type { Guide, GuideBlock, GuideSection } from "./types";

export const GUIDES: Guide[] = [
  prixChangementChaudiere2026,
  maprimerenov2026,
  pompeAChaleurPrix2026,
  isolationComblesPrixAides,
  aidesTravaux2026,
  trouverArtisanRge,
  prixRenovationSalleDeBain,
  normeElectriqueNFC15100,
  devisTravauxPiegesAEviter,
  debouchageCanalisationPrix,
  eviterArnaqueSerrurier,
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: Guide["category"]): Guide[] {
  return GUIDES.filter((g) => g.category === category);
}
