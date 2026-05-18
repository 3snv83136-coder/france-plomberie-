"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Phone,
  ShieldCheck,
  Star,
  X,
  Zap,
} from "lucide-react";
import type { CallbackContext } from "./CallbackProvider";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  context: CallbackContext;
};

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

const TRADES_LITE = [
  ["plombier", "Plombier"],
  ["electricien", "Électricien"],
  ["chauffagiste", "Chauffagiste"],
  ["serrurier", "Serrurier"],
  ["vitrier", "Vitrier"],
  ["couvreur", "Couvreur"],
  ["menuisier", "Menuisier"],
  ["peintre", "Peintre"],
  ["macon", "Maçon"],
  ["carreleur", "Carreleur"],
  ["plaquiste", "Plaquiste"],
  ["jardinier-paysagiste", "Jardinier-paysagiste"],
] as const;

export function CallbackModal({ isOpen, onClose, context }: Props) {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setState({ status: "idle" });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => firstInputRef.current?.focus());
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.status === "submitting") return;
    setState({ status: "submitting" });

    const fd = new FormData(e.currentTarget);
    const payload = {
      trade_slug: String(fd.get("trade") || context.trade || ""),
      city_name: String(fd.get("city") || context.cityName || ""),
      city_slug: context.citySlug,
      postal_code: String(fd.get("postalCode") || context.postalCode || "75000"),
      description: `Demande de rappel${
        context.artisanName ? ` (depuis profil ${context.artisanName})` : ""
      }. Métier : ${String(fd.get("trade") || context.trade || "")}. Ville : ${
        String(fd.get("city") || context.cityName || "")
      }.`,
      name: String(fd.get("name") || "Demande rappel"),
      email:
        String(fd.get("email") || "").trim() ||
        `rappel+${Date.now()}@artisanspresdechezvous.com`,
      phone: String(fd.get("phone") || ""),
      rgpd_consent: fd.get("rgpd") === "on",
      source: "callback-modal",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setState({
          status: "error",
          message: json.error ?? "Une erreur est survenue.",
        });
        return;
      }
      setState({ status: "success" });
    } catch {
      setState({ status: "error", message: "Connexion impossible." });
    }
  }

  const busy = state.status === "submitting";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="callback-title"
    >
      <div
        ref={dialogRef}
        className="bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[92vh] overflow-y-auto"
      >
        <div className="relative bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground p-5 rounded-t-2xl">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0 pulse-ring">
              <Phone className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <h2 id="callback-title" className="text-xl font-extrabold leading-tight">
                On vous rappelle <span className="underline decoration-secondary decoration-2">en 5 min</span>
              </h2>
              <p className="text-sm text-white/85">
                Devis gratuit · Sans engagement · 24h/24
              </p>
            </div>
          </div>
        </div>

        {state.status === "success" ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-9 h-9 text-accent" />
            </div>
            <h3 className="text-lg font-bold mb-1">Merci, c'est noté !</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Un technicien vous rappelle dans les minutes qui suivent pour
              prendre rendez-vous et établir votre devis gratuit.
            </p>
            <button type="button" onClick={onClose} className="btn-primary w-full">
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-5 space-y-3" noValidate>
            {state.status === "error" && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 flex gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <span>{state.message}</span>
              </div>
            )}

            <div>
              <label htmlFor="cb-phone" className="block text-sm font-semibold mb-1.5">
                Votre téléphone *
              </label>
              <input
                ref={firstInputRef}
                id="cb-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                disabled={busy}
                placeholder="06 12 34 56 78"
                pattern="[0-9 +.()-]{8,20}"
                className="input h-12 text-base"
              />
            </div>

            <div>
              <label htmlFor="cb-city" className="block text-sm font-semibold mb-1.5">
                Votre ville *
              </label>
              <input
                id="cb-city"
                name="city"
                type="text"
                required
                disabled={busy}
                defaultValue={context.cityName ?? ""}
                placeholder="Ex : Paris"
                className="input h-11"
              />
            </div>

            <div>
              <label htmlFor="cb-trade" className="block text-sm font-semibold mb-1.5">
                Type d'intervention *
              </label>
              <select
                id="cb-trade"
                name="trade"
                required
                disabled={busy}
                defaultValue={context.trade ?? ""}
                className="input h-11"
              >
                <option value="">Choisissez un métier</option>
                {TRADES_LITE.map(([slug, name]) => (
                  <option key={slug} value={slug}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="hidden"
              name="postalCode"
              defaultValue={context.postalCode ?? "75000"}
            />

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                name="rgpd"
                required
                disabled={busy}
                defaultChecked
                className="mt-0.5"
              />
              <span>
                J'accepte d'être recontacté pour cette demande. Données protégées
                (RGPD).
              </span>
            </label>

            <button
              type="submit"
              disabled={busy}
              className="btn-cta w-full h-14 text-base"
            >
              {busy ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Envoi…
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5 mr-2" />
                  Être rappelé maintenant
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 pt-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                SIRET vérifié
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                4,8/5
              </span>
              <span className="inline-flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-secondary" />
                Dès 69 €
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
