"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

export type LiteTradeOption = { slug: string; name: string };

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; persisted: boolean }
  | { status: "error"; message: string };

export function DevisForm({ trades }: { trades: LiteTradeOption[] }) {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.status === "submitting") return;
    setState({ status: "submitting" });

    const fd = new FormData(e.currentTarget);
    const payload = {
      trade_slug: String(fd.get("trade") || ""),
      postal_code: String(fd.get("postalCode") || ""),
      description: String(fd.get("description") || ""),
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      rgpd_consent: fd.get("rgpd") === "on",
      source: "devis-page",
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
      setState({ status: "success", persisted: Boolean(json.persisted) });
      (e.target as HTMLFormElement).reset();
    } catch {
      setState({ status: "error", message: "Connexion impossible." });
    }
  }

  if (state.status === "success") {
    return (
      <div className="card p-6 md:p-8 max-w-3xl mx-auto text-center">
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-3" />
        <h2 className="text-xl font-bold mb-2">Demande envoyée !</h2>
        <p className="text-muted-foreground mb-4">
          {state.persisted
            ? "Nos artisans vérifiés vous contactent sous 24h avec un devis gratuit."
            : "Demande reçue. Notre équipe vous recontacte dès que possible."}
        </p>
        <button
          type="button"
          onClick={() => setState({ status: "idle" })}
          className="btn-outline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  const busy = state.status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="card p-6 md:p-8 max-w-3xl mx-auto space-y-5"
      noValidate
    >
      {state.status === "error" && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 flex gap-2 text-sm">
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="trade" className="block text-sm font-medium mb-1.5">
            Métier recherché *
          </label>
          <select id="trade" name="trade" required className="input" disabled={busy}>
            <option value="">Sélectionnez un métier</option>
            {trades.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium mb-1.5">
            Code postal *
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            required
            disabled={busy}
            className="input"
            placeholder="75001"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1.5">
          Décrivez votre projet *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          minLength={10}
          maxLength={5000}
          disabled={busy}
          className="input min-h-[100px] py-2"
          placeholder="Ex : Je souhaite remplacer mon chauffe-eau électrique de 200 L par un nouveau modèle. Salle de bain au 1er étage…"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Votre nom *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={120}
            disabled={busy}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
            Téléphone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            disabled={busy}
            className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={busy}
          className="input"
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          id="rgpd"
          name="rgpd"
          type="checkbox"
          required
          disabled={busy}
          className="mt-1"
        />
        <label htmlFor="rgpd" className="text-xs text-muted-foreground">
          J'accepte que mes données soient transmises aux artisans sélectionnés
          pour me proposer un devis. Vos données sont protégées (RGPD).
        </label>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="btn-primary w-full h-12 text-base"
      >
        {busy ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Envoi en cours…
          </>
        ) : (
          "Recevoir mes devis gratuits"
        )}
      </button>
    </form>
  );
}
