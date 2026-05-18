import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Newspaper } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallbackButton } from "@/components/CallbackButton";
import { listNews } from "@/lib/db/news";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600; // 1h

export const metadata = buildMetadata({
  title: "Actualités travaux & dépannage — nouveaux articles tous les jours",
  description:
    "Suivez les tarifs, aides et conseils pour vos travaux et dépannages partout en France. Articles publiés deux fois par jour.",
  path: "/actualites",
});

const TYPE_LABEL = {
  tarifs: "Tarifs",
  saison: "Saison",
  "guide-local": "Guide local",
  actualite: "Actualité",
};

export default async function ActualitesIndexPage() {
  const articles = await listNews(36);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary via-[hsl(var(--primary-dark))] to-[hsl(217_91%_22%)] text-primary-foreground">
        <div className="container relative py-8 md:py-12">
          <Breadcrumbs items={[{ name: "Actualités", url: "/actualites" }]} />

          <div className="mt-2 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground mb-3 shadow-sm">
              <Newspaper className="w-3 h-3" />
              MIS À JOUR EN TEMPS RÉEL
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-balance leading-[1.05]">
              Actualités travaux & dépannage
            </h1>
            <p className="text-base md:text-lg text-white/90">
              Tarifs, aides, conseils saison par saison, partout en France.
              Nouveaux articles publiés deux fois par jour.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
      </section>

      <div className="container py-10">
        {articles.length === 0 ? (
          <div className="card p-8 text-center max-w-2xl mx-auto">
            <Newspaper className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <h2 className="text-xl font-bold mb-2">
              Pas encore d'articles publiés
            </h2>
            <p className="text-muted-foreground mb-5">
              Les premiers articles seront générés automatiquement{" "}
              {isSupabaseConfigured()
                ? "lors du prochain cron (toutes les 12 heures)."
                : "dès que le backend Supabase et le cron Vercel seront configurés."}
            </p>
            <CallbackButton variant="cta" size="md" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/actualites/${a.slug}`}
                className="card p-5 hover:border-primary hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                    {TYPE_LABEL[a.type]}
                  </span>
                  <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {a.readingMinutes} min
                  </span>
                </div>
                <h2 className="font-bold leading-tight">{a.title}</h2>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">
                  {a.excerpt}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {new Date(a.publishedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-primary font-semibold inline-flex items-center gap-0.5">
                    Lire
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
