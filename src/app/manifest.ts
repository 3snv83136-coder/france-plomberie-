import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/utils";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "APDCV",
    description:
      "Annuaire d'artisans qualifiés partout en France. Plombier, électricien, chauffagiste, menuisier — devis gratuits, avis vérifiés.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    lang: "fr-FR",
    categories: ["business", "lifestyle", "productivity"],
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
