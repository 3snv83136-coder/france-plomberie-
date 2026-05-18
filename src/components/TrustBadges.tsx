import { Award, Clock, ShieldCheck, Star, Tv } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "default" | "compact" | "dark";
  className?: string;
};

export function TrustBadges({ variant = "default", className }: Props) {
  const items = [
    { Icon: Tv, label: "Vu à la télé" },
    { Icon: ShieldCheck, label: "SIRET vérifié" },
    { Icon: Award, label: "Certifiés RGE" },
    { Icon: Star, label: "4,8/5 (12k avis)", colorClass: "text-amber-500 fill-amber-500" },
    { Icon: Clock, label: "Intervention 24/7" },
  ];

  if (variant === "compact") {
    return (
      <ul
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground",
          className,
        )}
      >
        {items.map(({ Icon, label, colorClass }) => (
          <li key={label} className="inline-flex items-center gap-1.5">
            <Icon className={cn("w-3.5 h-3.5 text-accent", colorClass)} />
            <span className="font-medium">{label}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (variant === "dark") {
    return (
      <ul
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/90",
          className,
        )}
      >
        {items.map(({ Icon, label, colorClass }) => (
          <li key={label} className="inline-flex items-center gap-1.5">
            <Icon className={cn("w-4 h-4", colorClass ?? "text-secondary")} />
            <span className="font-medium">{label}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3",
        className,
      )}
    >
      {items.map(({ Icon, label, colorClass }) => (
        <li
          key={label}
          className="card p-3 flex items-center gap-2 justify-center sm:justify-start"
        >
          <Icon className={cn("w-5 h-5 shrink-0 text-accent", colorClass)} />
          <span className="text-sm font-semibold leading-tight">{label}</span>
        </li>
      ))}
    </ul>
  );
}
