"use client";

import { Phone, Zap } from "lucide-react";
import { useCallback_ } from "./CallbackProvider";

export function StickyMobileCTA() {
  const { open } = useCallback_();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <button
        type="button"
        onClick={() => open()}
        className="btn-cta w-full h-12 text-base"
      >
        <Phone className="w-4 h-4 mr-2" />
        Être rappelé en 5 min
        <span className="ml-2 inline-flex items-center text-xs bg-white/20 rounded-full px-2 py-0.5">
          <Zap className="w-3 h-3 mr-1" />
          Dès 69 €
        </span>
      </button>
    </div>
  );
}
