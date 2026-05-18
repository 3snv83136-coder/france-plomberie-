export type Region = {
  slug: string;
  name: string;
  prefecture: string;
  population: number;
  departments: string[]; // department codes
};

export const REGIONS: Region[] = [
  {
    slug: "ile-de-france",
    name: "Île-de-France",
    prefecture: "Paris",
    population: 12317000,
    departments: ["75", "77", "78", "91", "92", "93", "94", "95"],
  },
  {
    slug: "auvergne-rhone-alpes",
    name: "Auvergne-Rhône-Alpes",
    prefecture: "Lyon",
    population: 8092000,
    departments: ["01", "03", "07", "15", "26", "38", "42", "43", "63", "69", "73", "74"],
  },
  {
    slug: "hauts-de-france",
    name: "Hauts-de-France",
    prefecture: "Lille",
    population: 5963000,
    departments: ["02", "59", "60", "62", "80"],
  },
  {
    slug: "nouvelle-aquitaine",
    name: "Nouvelle-Aquitaine",
    prefecture: "Bordeaux",
    population: 6033000,
    departments: ["16", "17", "19", "23", "24", "33", "40", "47", "64", "79", "86", "87"],
  },
  {
    slug: "occitanie",
    name: "Occitanie",
    prefecture: "Toulouse",
    population: 5985000,
    departments: ["09", "11", "12", "30", "31", "32", "34", "46", "48", "65", "66", "81", "82"],
  },
  {
    slug: "grand-est",
    name: "Grand Est",
    prefecture: "Strasbourg",
    population: 5557000,
    departments: ["08", "10", "51", "52", "54", "55", "57", "67", "68", "88"],
  },
  {
    slug: "provence-alpes-cote-d-azur",
    name: "Provence-Alpes-Côte d'Azur",
    prefecture: "Marseille",
    population: 5089000,
    departments: ["04", "05", "06", "13", "83", "84"],
  },
  {
    slug: "pays-de-la-loire",
    name: "Pays de la Loire",
    prefecture: "Nantes",
    population: 3856000,
    departments: ["44", "49", "53", "72", "85"],
  },
  {
    slug: "normandie",
    name: "Normandie",
    prefecture: "Rouen",
    population: 3303000,
    departments: ["14", "27", "50", "61", "76"],
  },
  {
    slug: "bretagne",
    name: "Bretagne",
    prefecture: "Rennes",
    population: 3373000,
    departments: ["22", "29", "35", "56"],
  },
  {
    slug: "bourgogne-franche-comte",
    name: "Bourgogne-Franche-Comté",
    prefecture: "Dijon",
    population: 2783000,
    departments: ["21", "25", "39", "58", "70", "71", "89", "90"],
  },
  {
    slug: "centre-val-de-loire",
    name: "Centre-Val de Loire",
    prefecture: "Orléans",
    population: 2570000,
    departments: ["18", "28", "36", "37", "41", "45"],
  },
  {
    slug: "corse",
    name: "Corse",
    prefecture: "Ajaccio",
    population: 344000,
    departments: ["2A", "2B"],
  },
];

export function getRegionBySlug(slug: string): Region | undefined {
  return REGIONS.find((r) => r.slug === slug);
}
