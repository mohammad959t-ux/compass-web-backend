import { Resend } from "resend";
import { env } from "../config/env.js";

type LeadNotification = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message?: string;
};

function escapeHtml(input: string) {
  const s = input ?? "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function nl2br(input: string) {
  return (input ?? "").split("\n").join("<br/>");
}

export async function sendLeadNotification(payload: LeadNotification) {
  if (!env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not configured, skipping email.");
    return { skipped: true };
  }

  const resend = new Resend(env.RESEND_API_KEY);

  // Important: keep EMAIL_FROM as plain email if your env schema validates email()
  const from = env.EMAIL_FROM || "onboarding@resend.dev";
  const to = env.EMAIL_TO || "delivered@resend.dev";

  // If you added EMAIL_REPLY_TO to env.ts, replace this line with: env.EMAIL_REPLY_TO || ...
  const replyToTeam = env.EMAIL_TO || "delivered@resend.dev";

  const safeName = escapeHtml(payload.name || "there");
  const safeEmail = escapeHtml(payload.email || "-");
  const safeCompany = escapeHtml(payload.company ?? "-");
  const safeBudget = escapeHtml(payload.budget ?? "-");
  const safeMessage = nl2br(escapeHtml(payload.message ?? "-"));

  // 1) Internal notification
  const subject = `New lead: ${payload.name}`;
  const notifyHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>New lead received</h2>
      <ul>
        <li><strong>Name:</strong> ${safeName}</li>
        <li><strong>Email:</strong> ${safeEmail}</li>
        <li><strong>Company:</strong> ${safeCompany}</li>
        <li><strong>Budget:</strong> ${safeBudget}</li>
      </ul>
      <p><strong>Message</strong></p>
      <p>${safeMessage}</p>
    </div>
  `;

  // 2) Auto-reply to client (brand email)
  const logoUrl = env.EMAIL_LOGO_URL || "";
  const autoReplySubject = "We received your message — Compass Digital Service";
  const autoReplyHtml = `
    <div style="margin:0;padding:0;background:#010f29;font-family:Arial,sans-serif;color:#ffffff">
      <div style="max-width:640px;margin:0 auto;padding:24px">
        <div style="border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08)">
          
          <div style="padding:18px 20px;background:linear-gradient(90deg,#43c6e8,#4167b1);">
            <div style="display:flex;align-items:center;gap:12px">
              ${logoUrl
      ? `<img src="${logoUrl}" alt="Compass Logo" width="44" height="44" style="border-radius:10px;display:block" />`
      : ``
    }
              <div style="line-height:1.2">
                <div style="font-size:16px;font-weight:700;color:#fff">Compass Digital Service</div>
                <div style="font-size:12px;opacity:.9;color:#fff">Branding • Web • Mobile • Marketing</div>
              </div>
            </div>
          </div>

          <div style="padding:20px;background:#010f29">
            <h2 style="margin:0 0 10px 0;color:#fff;font-size:20px">Thanks, ${safeName} 👋</h2>
            <p style="margin:0 0 14px 0;opacity:.92;line-height:1.7">
              We’ve received your message and our team will get back to you as soon as possible.
            </p>

            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);
                        border-radius:14px;padding:14px;margin:14px 0">
              <div style="font-weight:700;margin-bottom:8px">Your message</div>
              <div style="white-space:pre-line;opacity:.95">${safeMessage}</div>
            </div>

            <p style="margin:0;opacity:.85;font-size:13px">
              You can reply to this email — your reply will reach our team at
              <b>${escapeHtml(replyToTeam)}</b>.
            </p>

            <div style="margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.10);
                        font-size:12px;opacity:.75;line-height:1.6">
              © ${new Date().getFullYear()} Compass Digital Service
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  try {
    const notify = await resend.emails.send({
      from,
      to,
      subject,
      html: notifyHtml,
      reply_to: payload.email || replyToTeam
    });

    if (payload.email) {
      await resend.emails.send({
        from,
        to: [payload.email],
        subject: autoReplySubject,
        html: autoReplyHtml,
        reply_to: replyToTeam
      });
    } else {
      console.warn("Lead payload has no email; skipping auto-reply.");
    }

    return { sent: true, id: notify.data?.id, autoReply: Boolean(payload.email) };
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    throw error;
  }
}
