import Link from "next/link";
import { CheckCircle2, Clock, MapPin, Phone, ShieldCheck, Zap } from "lucide-react";
import type { Artisan } from "@/data/artisans";
import type { Trade } from "@/data/trades";
import { RatingStars } from "./RatingStars";
import { AvatarInitials } from "./AvatarInitials";
import { CallbackButton } from "./CallbackButton";

type Props = {
  artisan: Artisan;
  trade: Trade;
  citySlug: string;
  cityName?: string;
  postalCode?: string;
  rank?: number;
};

export function ArtisanCard({
  artisan,
  trade,
  citySlug,
  cityName,
  postalCode,
  rank,
}: Props) {
  const profileUrl = `/${trade.slug}/${citySlug}/${artisan.slug}`;
  const callbackCtx = {
    trade: trade.slug,
    citySlug,
    cityName,
    postalCode,
    artisanName: artisan.name,
  };

  return (
    <article className="card p-4 sm:p-5 hover:shadow-md hover:border-primary/30 transition-all">
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <AvatarInitials name={artisan.name} size={72} rounded="lg" />
          {rank !== undefined && rank < 3 && (
            <span className="absolute -top-2 -left-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white text-xs font-bold shadow-md ring-2 ring-background">
              {rank + 1}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-base leading-tight">
              <Link href={profileUrl} className="hover:text-primary">
                {artisan.name}
              </Link>
            </h3>
            {artisan.verified && (
              <span
                title="Entreprise vérifiée (SIRET)"
                className="inline-flex items-center gap-1 text-xs text-accent shrink-0 font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Vérifié</span>
              </span>
            )}
          </div>

          {artisan.reviewCount > 0 && artisan.rating > 0 ? (
            <RatingStars
              rating={artisan.rating}
              reviewCount={artisan.reviewCount}
              size="sm"
            />
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-accent font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Entreprise vérifiée au RNE
            </span>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {artisan.address && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {artisan.address.split(",").slice(-1)[0].trim()}
              </span>
            )}
            {artisan.reviewCount > 0 && (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Répond en ~{artisan.responseTimeMinutes} min
              </span>
            )}
            {artisan.emergency && (
              <span className="inline-flex items-center gap-1 text-secondary font-bold">
                <Zap className="w-3.5 h-3.5 fill-secondary" />
                24/7
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
            <CallbackButton
              context={callbackCtx}
              variant="cta"
              size="md"
              className="flex-1 min-w-0 sm:flex-initial"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              Être rappelé
            </CallbackButton>
            <Link href={profileUrl} className="btn-outline h-10 text-sm">
              Voir le profil
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
