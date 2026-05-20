// NAF / APE code mapping (Nomenclature d'Activités Française, rév. 2).
// Used by the INPI / RNE import to classify a company into one of our trades.

export const NAF_BY_TRADE: Record<string, string[]> = {
  plombier: ["43.22A"], // Travaux d'installation d'eau et de gaz en tous locaux
  chauffagiste: ["43.22B"], // Installation d'équipements thermiques et de climatisation
  electricien: ["43.21A"], // Travaux d'installation électrique dans tous locaux
  menuisier: ["43.32A"], // Travaux de menuiserie bois et PVC
  peintre: ["43.34Z"], // Travaux de peinture et vitrerie
  vitrier: ["43.34Z"], // Peinture et vitrerie (partagé avec peintre)
  macon: ["43.99C", "43.99A"], // Maçonnerie générale / gros œuvre
  serrurier: ["43.32B", "25.72Z"], // Menuiserie métallique-serrurerie / fabrication serrures
  couvreur: ["43.91B", "43.91A"], // Couverture / charpente
  carreleur: ["43.33Z"], // Revêtement des sols et des murs
  plaquiste: ["43.39Z"], // Autres travaux de finition
  "jardinier-paysagiste": ["81.30Z"], // Services d'aménagement paysager
};

// Reverse lookup: NAF code → trade slug. First trade wins for shared codes
// (43.34Z → peintre). The importer treats vitrier separately by querying it
// explicitly so the shared code is not a problem in practice.
export const TRADE_BY_NAF: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const [trade, codes] of Object.entries(NAF_BY_TRADE)) {
    for (const code of codes) {
      if (!map[code]) map[code] = trade;
    }
  }
  return map;
})();

export function nafCodesForTrade(tradeSlug: string): string[] {
  return NAF_BY_TRADE[tradeSlug] ?? [];
}
