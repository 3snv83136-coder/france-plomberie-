import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
};

export function RatingStars({ rating, size = "md", showValue = true, reviewCount }: Props) {
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4";
  const textClass = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center" aria-label={`Note ${rating.toFixed(1)} sur 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              sizeClass,
              i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted",
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className={cn("font-semibold tabular-nums", textClass)}>
          {rating.toFixed(1).replace(".", ",")}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={cn("text-muted-foreground", textClass)}>
          ({reviewCount.toLocaleString("fr-FR")} avis)
        </span>
      )}
    </div>
  );
}
