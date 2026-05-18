import { cn } from "@/lib/utils";

const PALETTE = [
  { bg: "#2563eb", fg: "#ffffff" }, // blue
  { bg: "#16a34a", fg: "#ffffff" }, // green
  { bg: "#f97316", fg: "#ffffff" }, // orange
  { bg: "#9333ea", fg: "#ffffff" }, // purple
  { bg: "#0891b2", fg: "#ffffff" }, // cyan
  { bg: "#dc2626", fg: "#ffffff" }, // red
  { bg: "#ca8a04", fg: "#ffffff" }, // amber
  { bg: "#0d9488", fg: "#ffffff" }, // teal
  { bg: "#7c3aed", fg: "#ffffff" }, // violet
  { bg: "#be185d", fg: "#ffffff" }, // pink
];

function hashString(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(h);
}

function extractInitials(name: string): string {
  const cleaned = name
    .replace(/(SARL|SAS|EURL|& Fils|Pro|Services|Expert|Plus|Artisan|Solutions)/gi, "")
    .trim();
  const parts = cleaned.split(/[\s-]+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

type Props = {
  name: string;
  size?: number;
  className?: string;
  rounded?: "md" | "lg" | "xl" | "full";
  alt?: string;
};

export function AvatarInitials({
  name,
  size = 72,
  className,
  rounded = "lg",
  alt,
}: Props) {
  const initials = extractInitials(name);
  const color = PALETTE[hashString(name) % PALETTE.length];
  const fontSize = Math.round(size * 0.42);
  const radiusClass = {
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  }[rounded];

  return (
    <span
      role="img"
      aria-label={alt ?? `Logo ${name}`}
      className={cn(
        "inline-flex items-center justify-center font-bold tracking-tight shrink-0 select-none",
        radiusClass,
        className,
      )}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color.bg}, ${shade(color.bg, -15)})`,
        color: color.fg,
        fontSize,
        lineHeight: 1,
      }}
    >
      {initials}
    </span>
  );
}

function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + percent));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + percent));
  const b = Math.max(0, Math.min(255, (num & 0xff) + percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
