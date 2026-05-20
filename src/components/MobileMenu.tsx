"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { CallbackButton } from "./CallbackButton";

const NAV_LINKS = [
  { href: "/plombier", label: "Plombier" },
  { href: "/electricien", label: "Électricien" },
  { href: "/chauffagiste", label: "Chauffagiste" },
  { href: "/metiers", label: "Tous les métiers" },
  { href: "/guides", label: "Guides" },
  { href: "/actualites", label: "Actualités" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-outline h-10 px-3 md:hidden"
        aria-label="Ouvrir le menu"
        aria-expanded={open}
      >
        <Menu className="w-5 h-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[90] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
            onClick={() => setOpen(false)}
          />
          <nav className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-background shadow-2xl flex flex-col animate-in slide-in-from-right">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-medium hover:bg-muted transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/recherche"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-3 rounded-lg text-base font-medium hover:bg-muted transition-colors"
              >
                <Search className="w-4 h-4" />
                Rechercher un artisan
              </Link>
            </div>

            <div className="p-4 border-t">
              <CallbackButton variant="cta" size="lg" className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
