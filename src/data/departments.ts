export type Department = {
  code: string;
  slug: string;
  name: string;
  prefecture: string;
  population: number;
  region: string; // region slug
};

export const DEPARTMENTS: Department[] = [
  { code: "01", slug: "ain", name: "Ain", prefecture: "Bourg-en-Bresse", population: 658000, region: "auvergne-rhone-alpes" },
  { code: "02", slug: "aisne", name: "Aisne", prefecture: "Laon", population: 528000, region: "hauts-de-france" },
  { code: "03", slug: "allier", name: "Allier", prefecture: "Moulins", population: 337000, region: "auvergne-rhone-alpes" },
  { code: "04", slug: "alpes-de-haute-provence", name: "Alpes-de-Haute-Provence", prefecture: "Digne-les-Bains", population: 165000, region: "provence-alpes-cote-d-azur" },
  { code: "05", slug: "hautes-alpes", name: "Hautes-Alpes", prefecture: "Gap", population: 141000, region: "provence-alpes-cote-d-azur" },
  { code: "06", slug: "alpes-maritimes", name: "Alpes-Maritimes", prefecture: "Nice", population: 1094000, region: "provence-alpes-cote-d-azur" },
  { code: "07", slug: "ardeche", name: "Ardèche", prefecture: "Privas", population: 326000, region: "auvergne-rhone-alpes" },
  { code: "08", slug: "ardennes", name: "Ardennes", prefecture: "Charleville-Mézières", population: 270000, region: "grand-est" },
  { code: "09", slug: "ariege", name: "Ariège", prefecture: "Foix", population: 154000, region: "occitanie" },
  { code: "10", slug: "aube", name: "Aube", prefecture: "Troyes", population: 311000, region: "grand-est" },
  { code: "11", slug: "aude", name: "Aude", prefecture: "Carcassonne", population: 374000, region: "occitanie" },
  { code: "12", slug: "aveyron", name: "Aveyron", prefecture: "Rodez", population: 280000, region: "occitanie" },
  { code: "13", slug: "bouches-du-rhone", name: "Bouches-du-Rhône", prefecture: "Marseille", population: 2043000, region: "provence-alpes-cote-d-azur" },
  { code: "14", slug: "calvados", name: "Calvados", prefecture: "Caen", population: 695000, region: "normandie" },
  { code: "15", slug: "cantal", name: "Cantal", prefecture: "Aurillac", population: 145000, region: "auvergne-rhone-alpes" },
  { code: "16", slug: "charente", name: "Charente", prefecture: "Angoulême", population: 352000, region: "nouvelle-aquitaine" },
  { code: "17", slug: "charente-maritime", name: "Charente-Maritime", prefecture: "La Rochelle", population: 651000, region: "nouvelle-aquitaine" },
  { code: "18", slug: "cher", name: "Cher", prefecture: "Bourges", population: 302000, region: "centre-val-de-loire" },
  { code: "19", slug: "correze", name: "Corrèze", prefecture: "Tulle", population: 240000, region: "nouvelle-aquitaine" },
  { code: "21", slug: "cote-d-or", name: "Côte-d'Or", prefecture: "Dijon", population: 533000, region: "bourgogne-franche-comte" },
  { code: "22", slug: "cotes-d-armor", name: "Côtes-d'Armor", prefecture: "Saint-Brieuc", population: 599000, region: "bretagne" },
  { code: "23", slug: "creuse", name: "Creuse", prefecture: "Guéret", population: 116000, region: "nouvelle-aquitaine" },
  { code: "24", slug: "dordogne", name: "Dordogne", prefecture: "Périgueux", population: 413000, region: "nouvelle-aquitaine" },
  { code: "25", slug: "doubs", name: "Doubs", prefecture: "Besançon", population: 545000, region: "bourgogne-franche-comte" },
  { code: "26", slug: "drome", name: "Drôme", prefecture: "Valence", population: 519000, region: "auvergne-rhone-alpes" },
  { code: "27", slug: "eure", name: "Eure", prefecture: "Évreux", population: 601000, region: "normandie" },
  { code: "28", slug: "eure-et-loir", name: "Eure-et-Loir", prefecture: "Chartres", population: 432000, region: "centre-val-de-loire" },
  { code: "29", slug: "finistere", name: "Finistère", prefecture: "Quimper", population: 919000, region: "bretagne" },
  { code: "2A", slug: "corse-du-sud", name: "Corse-du-Sud", prefecture: "Ajaccio", population: 158000, region: "corse" },
  { code: "2B", slug: "haute-corse", name: "Haute-Corse", prefecture: "Bastia", population: 186000, region: "corse" },
  { code: "30", slug: "gard", name: "Gard", prefecture: "Nîmes", population: 748000, region: "occitanie" },
  { code: "31", slug: "haute-garonne", name: "Haute-Garonne", prefecture: "Toulouse", population: 1416000, region: "occitanie" },
  { code: "32", slug: "gers", name: "Gers", prefecture: "Auch", population: 191000, region: "occitanie" },
  { code: "33", slug: "gironde", name: "Gironde", prefecture: "Bordeaux", population: 1633000, region: "nouvelle-aquitaine" },
  { code: "34", slug: "herault", name: "Hérault", prefecture: "Montpellier", population: 1175000, region: "occitanie" },
  { code: "35", slug: "ille-et-vilaine", name: "Ille-et-Vilaine", prefecture: "Rennes", population: 1080000, region: "bretagne" },
  { code: "36", slug: "indre", name: "Indre", prefecture: "Châteauroux", population: 217000, region: "centre-val-de-loire" },
  { code: "37", slug: "indre-et-loire", name: "Indre-et-Loire", prefecture: "Tours", population: 612000, region: "centre-val-de-loire" },
  { code: "38", slug: "isere", name: "Isère", prefecture: "Grenoble", population: 1264000, region: "auvergne-rhone-alpes" },
  { code: "39", slug: "jura", name: "Jura", prefecture: "Lons-le-Saunier", population: 257000, region: "bourgogne-franche-comte" },
  { code: "40", slug: "landes", name: "Landes", prefecture: "Mont-de-Marsan", population: 413000, region: "nouvelle-aquitaine" },
  { code: "41", slug: "loir-et-cher", name: "Loir-et-Cher", prefecture: "Blois", population: 331000, region: "centre-val-de-loire" },
  { code: "42", slug: "loire", name: "Loire", prefecture: "Saint-Étienne", population: 762000, region: "auvergne-rhone-alpes" },
  { code: "43", slug: "haute-loire", name: "Haute-Loire", prefecture: "Le Puy-en-Velay", population: 227000, region: "auvergne-rhone-alpes" },
  { code: "44", slug: "loire-atlantique", name: "Loire-Atlantique", prefecture: "Nantes", population: 1437000, region: "pays-de-la-loire" },
  { code: "45", slug: "loiret", name: "Loiret", prefecture: "Orléans", population: 681000, region: "centre-val-de-loire" },
  { code: "46", slug: "lot", name: "Lot", prefecture: "Cahors", population: 174000, region: "occitanie" },
  { code: "47", slug: "lot-et-garonne", name: "Lot-et-Garonne", prefecture: "Agen", population: 331000, region: "nouvelle-aquitaine" },
  { code: "48", slug: "lozere", name: "Lozère", prefecture: "Mende", population: 77000, region: "occitanie" },
  { code: "49", slug: "maine-et-loire", name: "Maine-et-Loire", prefecture: "Angers", population: 819000, region: "pays-de-la-loire" },
  { code: "50", slug: "manche", name: "Manche", prefecture: "Saint-Lô", population: 497000, region: "normandie" },
  { code: "51", slug: "marne", name: "Marne", prefecture: "Châlons-en-Champagne", population: 566000, region: "grand-est" },
  { code: "52", slug: "haute-marne", name: "Haute-Marne", prefecture: "Chaumont", population: 172000, region: "grand-est" },
  { code: "53", slug: "mayenne", name: "Mayenne", prefecture: "Laval", population: 305000, region: "pays-de-la-loire" },
  { code: "54", slug: "meurthe-et-moselle", name: "Meurthe-et-Moselle", prefecture: "Nancy", population: 733000, region: "grand-est" },
  { code: "55", slug: "meuse", name: "Meuse", prefecture: "Bar-le-Duc", population: 184000, region: "grand-est" },
  { code: "56", slug: "morbihan", name: "Morbihan", prefecture: "Vannes", population: 760000, region: "bretagne" },
  { code: "57", slug: "moselle", name: "Moselle", prefecture: "Metz", population: 1043000, region: "grand-est" },
  { code: "58", slug: "nievre", name: "Nièvre", prefecture: "Nevers", population: 200000, region: "bourgogne-franche-comte" },
  { code: "59", slug: "nord", name: "Nord", prefecture: "Lille", population: 2606000, region: "hauts-de-france" },
  { code: "60", slug: "oise", name: "Oise", prefecture: "Beauvais", population: 829000, region: "hauts-de-france" },
  { code: "61", slug: "orne", name: "Orne", prefecture: "Alençon", population: 277000, region: "normandie" },
  { code: "62", slug: "pas-de-calais", name: "Pas-de-Calais", prefecture: "Arras", population: 1465000, region: "hauts-de-france" },
  { code: "63", slug: "puy-de-dome", name: "Puy-de-Dôme", prefecture: "Clermont-Ferrand", population: 661000, region: "auvergne-rhone-alpes" },
  { code: "64", slug: "pyrenees-atlantiques", name: "Pyrénées-Atlantiques", prefecture: "Pau", population: 687000, region: "nouvelle-aquitaine" },
  { code: "65", slug: "hautes-pyrenees", name: "Hautes-Pyrénées", prefecture: "Tarbes", population: 229000, region: "occitanie" },
  { code: "66", slug: "pyrenees-orientales", name: "Pyrénées-Orientales", prefecture: "Perpignan", population: 481000, region: "occitanie" },
  { code: "67", slug: "bas-rhin", name: "Bas-Rhin", prefecture: "Strasbourg", population: 1153000, region: "grand-est" },
  { code: "68", slug: "haut-rhin", name: "Haut-Rhin", prefecture: "Colmar", population: 768000, region: "grand-est" },
  { code: "69", slug: "rhone", name: "Rhône", prefecture: "Lyon", population: 1876000, region: "auvergne-rhone-alpes" },
  { code: "70", slug: "haute-saone", name: "Haute-Saône", prefecture: "Vesoul", population: 235000, region: "bourgogne-franche-comte" },
  { code: "71", slug: "saone-et-loire", name: "Saône-et-Loire", prefecture: "Mâcon", population: 552000, region: "bourgogne-franche-comte" },
  { code: "72", slug: "sarthe", name: "Sarthe", prefecture: "Le Mans", population: 564000, region: "pays-de-la-loire" },
  { code: "73", slug: "savoie", name: "Savoie", prefecture: "Chambéry", population: 437000, region: "auvergne-rhone-alpes" },
  { code: "74", slug: "haute-savoie", name: "Haute-Savoie", prefecture: "Annecy", population: 836000, region: "auvergne-rhone-alpes" },
  { code: "75", slug: "paris", name: "Paris", prefecture: "Paris", population: 2103000, region: "ile-de-france" },
  { code: "76", slug: "seine-maritime", name: "Seine-Maritime", prefecture: "Rouen", population: 1253000, region: "normandie" },
  { code: "77", slug: "seine-et-marne", name: "Seine-et-Marne", prefecture: "Melun", population: 1454000, region: "ile-de-france" },
  { code: "78", slug: "yvelines", name: "Yvelines", prefecture: "Versailles", population: 1452000, region: "ile-de-france" },
  { code: "79", slug: "deux-sevres", name: "Deux-Sèvres", prefecture: "Niort", population: 374000, region: "nouvelle-aquitaine" },
  { code: "80", slug: "somme", name: "Somme", prefecture: "Amiens", population: 570000, region: "hauts-de-france" },
  { code: "81", slug: "tarn", name: "Tarn", prefecture: "Albi", population: 388000, region: "occitanie" },
  { code: "82", slug: "tarn-et-garonne", name: "Tarn-et-Garonne", prefecture: "Montauban", population: 263000, region: "occitanie" },
  { code: "83", slug: "var", name: "Var", prefecture: "Toulon", population: 1076000, region: "provence-alpes-cote-d-azur" },
  { code: "84", slug: "vaucluse", name: "Vaucluse", prefecture: "Avignon", population: 562000, region: "provence-alpes-cote-d-azur" },
  { code: "85", slug: "vendee", name: "Vendée", prefecture: "La Roche-sur-Yon", population: 685000, region: "pays-de-la-loire" },
  { code: "86", slug: "vienne", name: "Vienne", prefecture: "Poitiers", population: 438000, region: "nouvelle-aquitaine" },
  { code: "87", slug: "haute-vienne", name: "Haute-Vienne", prefecture: "Limoges", population: 374000, region: "nouvelle-aquitaine" },
  { code: "88", slug: "vosges", name: "Vosges", prefecture: "Épinal", population: 364000, region: "grand-est" },
  { code: "89", slug: "yonne", name: "Yonne", prefecture: "Auxerre", population: 333000, region: "bourgogne-franche-comte" },
  { code: "90", slug: "territoire-de-belfort", name: "Territoire de Belfort", prefecture: "Belfort", population: 141000, region: "bourgogne-franche-comte" },
  { code: "91", slug: "essonne", name: "Essonne", prefecture: "Évry-Courcouronnes", population: 1320000, region: "ile-de-france" },
  { code: "92", slug: "hauts-de-seine", name: "Hauts-de-Seine", prefecture: "Nanterre", population: 1626000, region: "ile-de-france" },
  { code: "93", slug: "seine-saint-denis", name: "Seine-Saint-Denis", prefecture: "Bobigny", population: 1671000, region: "ile-de-france" },
  { code: "94", slug: "val-de-marne", name: "Val-de-Marne", prefecture: "Créteil", population: 1422000, region: "ile-de-france" },
  { code: "95", slug: "val-d-oise", name: "Val-d'Oise", prefecture: "Cergy", population: 1252000, region: "ile-de-france" },
];

export function getDepartmentBySlug(slug: string): Department | undefined {
  return DEPARTMENTS.find((d) => d.slug === slug);
}

export function getDepartmentByCode(code: string): Department | undefined {
  return DEPARTMENTS.find((d) => d.code === code);
}

export function getDepartmentsByRegion(regionSlug: string): Department[] {
  return DEPARTMENTS.filter((d) => d.region === regionSlug);
}
