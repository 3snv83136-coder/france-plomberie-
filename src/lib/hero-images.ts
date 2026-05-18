// Curated Unsplash photo IDs per trade. Stable URLs served via images.unsplash.com,
// which is allowlisted in next.config.ts.

const TRADE_IMAGE_IDS: Record<string, string> = {
  plombier: "1581244277943-fe4a9c777189",            // tools on workbench
  electricien: "1621905251918-48416bd8575a",         // electric panel
  chauffagiste: "1635424709845-3c4f8fe2bccd",        // radiator / heating
  serrurier: "1582139329536-e7284fece509",           // key / lock
  vitrier: "1556228720-195a672e8a03",                // glass
  couvreur: "1632323093594-9e1b6e34c1d3",            // roof
  menuisier: "1581094288338-2314dddb7ece",           // wood
  peintre: "1562259949-e8e7689d7828",                // paint
  macon: "1581244249538-bcfbe038d0fa",               // bricks
  carreleur: "1556909114-44e3e9699cf3",              // tiles
  plaquiste: "1632823469850-1b7b8068e7e2",           // drywall
  "jardinier-paysagiste": "1416879595882-3373a0480b5b", // garden
};

const FALLBACK_ID = "1581244277943-fe4a9c777189";

export function tradeHeroImage(tradeSlug: string, width = 1600, quality = 80) {
  const id = TRADE_IMAGE_IDS[tradeSlug] ?? FALLBACK_ID;
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=${quality}&auto=format&fit=crop`;
}
