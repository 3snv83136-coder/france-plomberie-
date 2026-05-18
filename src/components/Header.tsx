import Link from "next/link";
import { Search } from "lucide-react";
import { SITE_NAME } from "@/lib/utils";
import { CallbackButton } from "./CallbackButton";

export function Header() {
  return (
    <>
      {/* Top urgency bar */}
      <div className="bg-gradient-to-r from-secondary to-[hsl(var(--secondary-dark))] text-secondary-foreground text-xs sm:text-sm">
        <div className="container py-1.5 flex items-center justify-center gap-2 font-medium text-center">
          <span className="hidden sm:inline">⚡</span>
          <span>
            Urgence 24h/24 · Intervention en 30 min · Dès <strong>69 €</strong>
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg shrink-0"
            aria-label={SITE_NAME}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path
                  d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-0.5 8-5 8-10V6l-8-4z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="hidden sm:inline">{SITE_NAME}</span>
            <span className="sm:hidden">APDCV</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/plombier" className="hover:text-primary transition-colors">
              Plombier
            </Link>
            <Link href="/electricien" className="hover:text-primary transition-colors">
              Électricien
            </Link>
            <Link href="/chauffagiste" className="hover:text-primary transition-colors">
              Chauffagiste
            </Link>
            <Link href="/metiers" className="hover:text-primary transition-colors">
              Tous les métiers
            </Link>
            <Link href="/guides" className="hover:text-primary transition-colors">
              Guides
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/recherche"
              className="btn-outline h-10 px-3"
              aria-label="Rechercher"
            >
              <Search className="w-4 h-4" />
            </Link>
            <CallbackButton variant="cta" size="md" className="hidden sm:inline-flex" />
          </div>
        </div>
      </header>
    </>
  );
}
