import Link from "next/link";
import { Search, Phone, UserCircle2 } from "lucide-react";
import { SITE_NAME } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0" aria-label={SITE_NAME}>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
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
            className="btn-outline h-9 px-3"
            aria-label="Rechercher"
          >
            <Search className="w-4 h-4" />
          </Link>
          <Link
            href="/devis"
            className="btn-primary h-9 hidden sm:inline-flex"
          >
            <Phone className="w-4 h-4 mr-1.5" />
            Devis gratuit
          </Link>
          <Link
            href="/artisan/inscription"
            className="btn-outline h-9 hidden lg:inline-flex"
          >
            <UserCircle2 className="w-4 h-4 mr-1.5" />
            Je suis artisan
          </Link>
        </div>
      </div>
    </header>
  );
}
