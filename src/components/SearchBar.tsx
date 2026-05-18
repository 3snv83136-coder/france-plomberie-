"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import { TRADES } from "@/data/trades";
import { CITIES } from "@/data/cities";
import { slugify } from "@/lib/utils";

export function SearchBar({ size = "md" }: { size?: "md" | "lg" }) {
  const router = useRouter();
  const [trade, setTrade] = useState("");
  const [city, setCity] = useState("");

  const tradeOptions = TRADES;
  const citySuggestions = useMemo(() => {
    const q = slugify(city);
    if (!q) return [];
    return CITIES.filter(
      (c) => c.slug.startsWith(q) || c.name.toLowerCase().includes(city.toLowerCase()),
    ).slice(0, 5);
  }, [city]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tradeSlug = trade || "plombier";
    const matchedCity = CITIES.find(
      (c) => c.slug === slugify(city) || c.name.toLowerCase() === city.toLowerCase(),
    );
    if (matchedCity) {
      router.push(`/${tradeSlug}/${matchedCity.slug}`);
    } else if (city) {
      router.push(`/${tradeSlug}/${slugify(city)}`);
    } else {
      router.push(`/${tradeSlug}`);
    }
  }

  const baseH = size === "lg" ? "h-14" : "h-12";

  return (
    <form
      onSubmit={onSubmit}
      className="card flex flex-col md:flex-row items-stretch gap-2 p-2 shadow-lg"
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
          {tradeOptions.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:block w-px bg-border" />

      <div className="flex-1 flex items-center gap-2 px-3 border rounded-lg md:border-0 relative">
        <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
        <label htmlFor="city" className="sr-only">
          Ville
        </label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Votre ville ou code postal"
          autoComplete="off"
          className={`${baseH} w-full bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground`}
        />
        {citySuggestions.length > 0 && (
          <ul className="absolute left-0 right-0 top-full mt-1 card divide-y z-10">
            {citySuggestions.map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => {
                    setCity(c.name);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                >
                  <span className="font-medium">{c.name}</span>{" "}
                  <span className="text-muted-foreground">
                    ({c.postalCode}, {c.department.name})
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className={`btn-primary ${baseH} px-6`}>
        <Search className="w-4 h-4 mr-1.5" />
        Rechercher
      </button>
    </form>
  );
}
