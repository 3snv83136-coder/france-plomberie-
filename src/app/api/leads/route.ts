import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  createSupabaseServiceClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { isEmailConfigured, sendLeadEmail } from "@/lib/email";
import { getTradeBySlug } from "@/data/trades";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";

const POSTAL_CODE_RE = /^[0-9]{5}$/;
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PHONE_RE = /^[0-9 +.()-]{8,20}$/;

type LeadBody = {
  trade_slug?: string;
  city_slug?: string;
  city_name?: string;
  postal_code?: string;
  description?: string;
  name?: string;
  email?: string;
  phone?: string;
  rgpd_consent?: boolean;
  source?: string;
};

type ValidatedLead = Required<Omit<LeadBody, "city_name" | "city_slug" | "source">> & {
  city_slug: string | null;
  city_name: string;
  source: string;
};

function validate(body: LeadBody): { ok: true; data: ValidatedLead } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid payload" };
  if (!body.trade_slug || !getTradeBySlug(body.trade_slug)) {
    return { ok: false, error: "Métier invalide" };
  }
  if (!body.postal_code || !POSTAL_CODE_RE.test(body.postal_code)) {
    return { ok: false, error: "Code postal invalide" };
  }
  if (!body.description || body.description.trim().length < 10 || body.description.length > 5000) {
    return { ok: false, error: "Description trop courte ou trop longue" };
  }
  if (!body.name || body.name.trim().length < 2 || body.name.length > 120) {
    return { ok: false, error: "Nom invalide" };
  }
  if (!body.email || !EMAIL_RE.test(body.email)) {
    return { ok: false, error: "Email invalide" };
  }
  if (!body.phone || !PHONE_RE.test(body.phone)) {
    return { ok: false, error: "Téléphone invalide" };
  }
  if (body.rgpd_consent !== true) {
    return { ok: false, error: "Consentement RGPD requis" };
  }

  const citySlug = body.city_slug ?? (body.city_name ? slugify(body.city_name) : null);
  const cityName = body.city_name?.trim() ?? "";

  return {
    ok: true,
    data: {
      trade_slug: body.trade_slug,
      city_slug: citySlug,
      city_name: cityName,
      postal_code: body.postal_code,
      description: body.description.trim(),
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.replace(/[\s.()-]/g, ""),
      rgpd_consent: true,
      source: body.source ?? "web",
    },
  };
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validation = validate(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 422 });
  }

  const hdrs = await headers();
  const userAgent = hdrs.get("user-agent")?.slice(0, 500) ?? null;

  // 1) Persist to Supabase if configured.
  let persisted = false;
  if (isSupabaseConfigured()) {
    try {
      const supabase = createSupabaseServiceClient();
      // city_name is for the email template only; the DB has city_slug.
      const { city_name: _cityName, ...dbRow } = validation.data;
      void _cityName;
      const { error } = await supabase.from("leads").insert({
        ...dbRow,
        user_agent: userAgent,
      });
      if (error) {
        console.error("[api/leads] insert error:", error.message);
        return NextResponse.json({ error: "Erreur d'enregistrement" }, { status: 500 });
      }
      persisted = true;
    } catch (e) {
      console.error("[api/leads] supabase threw:", e);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  } else {
    console.warn("[api/leads] Supabase not configured — lead not persisted.");
  }

  // 2) Send the lead email (best-effort: never fails the request).
  let emailSent = false;
  if (isEmailConfigured()) {
    try {
      await sendLeadEmail(validation.data);
      emailSent = true;
    } catch (e) {
      console.error("[api/leads] email send failed:", e);
    }
  }

  // If neither persisted nor emailed, return 202 so the client knows we got the
  // request but no backend acted on it (graceful degradation in dev).
  if (!persisted && !emailSent) {
    return NextResponse.json(
      {
        ok: true,
        persisted: false,
        emailSent: false,
        message: "Demande reçue (backend non configuré).",
      },
      { status: 202 },
    );
  }

  return NextResponse.json({ ok: true, persisted, emailSent }, { status: 201 });
}
