"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import { slugify } from "@/lib/utils";

export type LiteTrade = { slug: string; name: string };
export type LiteCity = {
  slug: string;
  name: string;
  postalCode: string;
  departmentName: string;
};

type Props = {
  size?: "md" | "lg";
  trades: LiteTrade[];
  cities: LiteCity[];
};

export function SearchBarClient({ size = "md", trades, cities }: Props) {
  const router = useRouter();
  const [trade, setTrade] = useState("");
  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const citySuggestions = useMemo(() => {
    const q = slugify(city);
    if (!q) return [];
    const lower = city.toLowerCase();
    return cities
      .filter((c) => c.slug.startsWith(q) || c.name.toLowerCase().includes(lower))
      .slice(0, 6);
  }, [city, cities]);

  function goTo(citySlug: string | null) {
    const tradeSlug = trade || "plombier";
    if (citySlug) {
      router.push(`/${tradeSlug}/${citySlug}`);
    } else if (city.trim()) {
      router.push(`/${tradeSlug}/${slugify(city)}`);
    } else {
      router.push(`/${tradeSlug}`);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    const matched = cities.find(
      (c) => c.slug === slugify(city) || c.name.toLowerCase() === city.toLowerCase(),
    );
    goTo(matched ? matched.slug : null);
  }

  function selectCity(c: LiteCity) {
    setCity(c.name);
    setOpen(false);
    goTo(c.slug); // pick = navigate immediately, no button needed
  }

  const baseH = size === "lg" ? "h-14" : "h-12";
  const showList = open && citySuggestions.length > 0;

  return (
    <form
      onSubmit={onSubmit}
      className="card flex flex-col md:flex-row md:items-stretch gap-2 p-2 shadow-lg"
      role="search"
    >
      <div className="flex-1 flex items-center gap-2 px-3 border rounded-lg md:border-0">
        <Briefcase className="w-5 h-5 text-muted-foreground shrink-0" />
        <label htmlFor="trade" className="sr-only">
          Métier recherché
        </label>
        <select
          id="trade"
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
          className={`${baseH} w-full bg-transparent text-sm focus:outline-none`}
        >
          <option value="">Tous les métiers</option>
          {trades.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:block w-px bg-border" />

      {/* City field + suggestions. On mobile the list is in normal flow so it
          pushes the submit button down instead of covering it. On desktop it
          floats as a dropdown. */}
      <div className="flex-1 md:relative">
        <div className="flex items-center gap-2 px-3 border rounded-lg md:border-0">
          <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
          <label htmlFor="city" className="sr-only">
            Ville
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              // Delay so a suggestion click registers before the list unmounts.
              blurTimer.current = setTimeout(() => setOpen(false), 150);
            }}
            placeholder="Votre ville ou code postal"
            autoComplete="off"
            className={`${baseH} w-full bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground`}
          />
        </div>
        {showList && (
          <ul
            className="mt-1 card divide-y overflow-hidden md:absolute md:left-0 md:right-0 md:top-full md:mt-1 z-30 shadow-lg"
            onMouseDown={(e) => {
              // Keep focus so onBlur's timeout doesn't fire before the click.
              e.preventDefault();
              if (blurTimer.current) clearTimeout(blurTimer.current);
            }}
          >
            {citySuggestions.map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => selectCity(c)}
                  className="w-full text-left px-3 py-2.5 hover:bg-muted active:bg-muted text-sm"
                >
                  <span className="font-medium">{c.name}</span>{" "}
                  <span className="text-muted-foreground">
                    ({c.postalCode}, {c.departmentName})
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className={`btn-primary ${baseH} px-6 shrink-0`}>
        <Search className="w-4 h-4 mr-1.5" />
        Rechercher
      </button>
    </form>
  );
}
