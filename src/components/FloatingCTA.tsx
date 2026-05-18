"use client";

import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { useCallback_ } from "./CallbackProvider";

export function FloatingCTA() {
  const { open } = useCallback_();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) {
      setVisible(false);
      return;
    }
    function onScroll() {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrolled / docHeight : 0;
      // Show after the user has scrolled past the hero (≈ 600px) and before the
      // final dark CTA section (typically last 12% of the page).
      setVisible(scrolled > 600 && ratio < 0.88);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Masquer"
        className="w-9 h-9 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition"
      >
        <X className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => open()}
        className="group relative inline-flex items-center gap-3 pl-5 pr-6 py-3 rounded-full bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--secondary-dark))] text-secondary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-transform font-semibold"
      >
        <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 pulse-ring">
          <Phone className="w-5 h-5" />
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-xs font-medium text-white/85">Urgence ?</span>
          <span className="text-base font-bold">Être rappelé en 5 min</span>
        </span>
      </button>
    </div>
  );
}
