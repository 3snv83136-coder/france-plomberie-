import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Clock, Phone, MapPin, ShieldCheck } from "lucide-react";
import type { Artisan } from "@/data/artisans";
import type { Trade } from "@/data/trades";
import { RatingStars } from "./RatingStars";

type Props = {
  artisan: Artisan;
  trade: Trade;
  citySlug: string;
  rank?: number;
};

export function ArtisanCard({ artisan, trade, citySlug, rank }: Props) {
  const profileUrl = `/${trade.slug}/${citySlug}/${artisan.slug}`;
  const photo = `https://ui-avatars.com/api/?name=${artisan.photoSeed}&background=2563eb&color=fff&size=200&bold=true`;

  return (
    <article className="card p-4 sm:p-5 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <Image
            src={photo}
            alt={`Logo de ${artisan.name}`}
            width={72}
            height={72}
            className="rounded-lg object-cover"
            unoptimized
          />
          {rank !== undefined && rank < 3 && (
            <span className="absolute -top-2 -left-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold">
              {rank + 1}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-base leading-tight">
              <Link href={profileUrl} className="hover:text-primary">
                {artisan.name}
              </Link>
            </h3>
            {artisan.verified && (
              <span
                title="Entreprise vérifiée (SIRET)"
                className="inline-flex items-center gap-1 text-xs text-accent shrink-0"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Vérifié</span>
              </span>
            )}
          </div>

          <RatingStars rating={artisan.rating} reviewCount={artisan.reviewCount} size="sm" />

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {artisan.address.split(",").slice(-1)[0].trim()}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Répond en ~{artisan.responseTimeMinutes} min
            </span>
            {artisan.emergency && (
              <span className="inline-flex items-center gap-1 text-destructive font-medium">
                ⚡ Urgence 24/7
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {artisan.description}
          </p>

          {artisan.certifications.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {artisan.certifications.slice(0, 3).map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {c}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Link href={profileUrl} className="btn-primary h-9 text-sm">
              Voir le profil
            </Link>
            <a
              href={`tel:${artisan.phone}`}
              className="btn-outline h-9 text-sm"
              aria-label={`Appeler ${artisan.name}`}
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              {artisan.phone.replace(/(\d{2})(?=\d)/g, "$1 ").trim()}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
