// Lead notification email via Resend.
//
// Env:
//   RESEND_API_KEY      — server-only. Get one at https://resend.com (free tier).
//   NOTIFY_EMAIL_TO     — inbox that receives leads (your business email).
//   NOTIFY_EMAIL_FROM   — sender. Default "onboarding@resend.dev" works without
//                         domain verification; for production, verify your domain
//                         in Resend and use "no-reply@yourdomain.fr".

import { Resend } from "resend";
import { getTradeBySlug } from "@/data/trades";
import { SITE_NAME } from "./utils";

export type LeadEmailPayload = {
  trade_slug: string;
  city_name: string;
  city_slug: string | null;
  postal_code: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  source: string;
};

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL_TO);
}

function fmtPhone(p: string): string {
  return p.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(lead: LeadEmailPayload, tradeName: string): string {
  const phoneDisplay = fmtPhone(lead.phone);
  const telHref = `tel:${lead.phone.replace(/[^\d+]/g, "")}`;
  return `<!DOCTYPE html>
<html lang="fr">
<body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;background:#f3f4f6;margin:0;padding:24px;color:#0f172a;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.05);">
    <tr>
      <td style="background:linear-gradient(135deg,#2563eb 0%,#1e3a8a 100%);padding:24px;color:#fff;">
        <div style="font-size:11px;letter-spacing:.15em;text-transform:uppercase;opacity:.85;">${escape(SITE_NAME)} · Nouveau lead</div>
        <h1 style="margin:6px 0 0;font-size:22px;font-weight:800;line-height:1.2;">📞 ${escape(tradeName)} demandé à ${escape(lead.city_name)}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 24px;">
        <a href="${telHref}" style="display:inline-block;background:#f97316;color:#fff;text-decoration:none;font-weight:700;font-size:18px;padding:14px 22px;border-radius:10px;margin-bottom:18px;">
          📞 Rappeler ${escape(phoneDisplay)}
        </a>

        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#64748b;width:130px;">Téléphone</td><td style="padding:8px 0;font-weight:700;"><a href="${telHref}" style="color:#2563eb;text-decoration:none;">${escape(phoneDisplay)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Métier</td><td style="padding:8px 0;font-weight:600;">${escape(tradeName)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Ville</td><td style="padding:8px 0;font-weight:600;">${escape(lead.city_name)} (${escape(lead.postal_code)})</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Nom</td><td style="padding:8px 0;">${escape(lead.name)}</td></tr>
          ${lead.email && !lead.email.startsWith("rappel+") ? `<tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;"><a href="mailto:${escape(lead.email)}" style="color:#2563eb;">${escape(lead.email)}</a></td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#64748b;">Source</td><td style="padding:8px 0;color:#64748b;">${escape(lead.source)}</td></tr>
        </table>

        ${
          lead.description && lead.description.length > 0
            ? `<div style="margin-top:14px;padding:12px;background:#f8fafc;border-radius:8px;font-size:13px;line-height:1.5;color:#334155;"><strong style="display:block;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px;">Détails</strong>${escape(lead.description)}</div>`
            : ""
        }

        <p style="margin:18px 0 0;font-size:12px;color:#94a3b8;line-height:1.5;">
          Demande reçue le ${new Date().toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}.<br />
          Conformément au RGPD, le visiteur a coché la case de consentement avant envoi.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(lead: LeadEmailPayload, tradeName: string): string {
  return [
    `Nouveau lead — ${SITE_NAME}`,
    "",
    `📞 Téléphone : ${fmtPhone(lead.phone)}`,
    `Métier : ${tradeName}`,
    `Ville : ${lead.city_name} (${lead.postal_code})`,
    `Nom : ${lead.name}`,
    lead.email && !lead.email.startsWith("rappel+") ? `Email : ${lead.email}` : null,
    `Source : ${lead.source}`,
    "",
    lead.description ? `Détails : ${lead.description}` : null,
    "",
    `Reçu le ${new Date().toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}.`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendLeadEmail(lead: LeadEmailPayload): Promise<void> {
  if (!isEmailConfigured()) return;

  const trade = getTradeBySlug(lead.trade_slug);
  const tradeName = trade?.name ?? lead.trade_slug;

  const resend = new Resend(process.env.RESEND_API_KEY!);
  const from =
    process.env.NOTIFY_EMAIL_FROM ??
    `${SITE_NAME} <onboarding@resend.dev>`;

  const { error } = await resend.emails.send({
    from,
    to: process.env.NOTIFY_EMAIL_TO!.split(",").map((s) => s.trim()),
    subject: `🔔 ${tradeName} ${lead.city_name} — ${fmtPhone(lead.phone)}`,
    html: buildHtml(lead, tradeName),
    text: buildText(lead, tradeName),
    replyTo:
      lead.email && !lead.email.startsWith("rappel+") ? lead.email : undefined,
  });

  if (error) {
    throw new Error(`Resend: ${error.message ?? "unknown error"}`);
  }
}
