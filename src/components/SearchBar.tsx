import { TRADES } from "@/data/trades";
import { CITIES } from "@/data/cities";
import { SearchBarClient, type LiteCity, type LiteTrade } from "./SearchBarClient";

export function SearchBar({ size = "md" }: { size?: "md" | "lg" }) {
  const trades: LiteTrade[] = TRADES.map((t) => ({ slug: t.slug, name: t.name }));
  const cities: LiteCity[] = CITIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    postalCode: c.postalCode,
    departmentName: c.department.name,
  }));

  return <SearchBarClient size={size} trades={trades} cities={cities} />;
}
