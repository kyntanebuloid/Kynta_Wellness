import nodemailer, { type Transporter } from "nodemailer";
import { Resend } from "resend";

// Every email the site sends goes through sendTransactionalEmail():
//   1. Resend, when RESEND_API_KEY is a real key (not empty / "none"),
//   2. otherwise — or if Resend reports a failure — Gmail/SMTP via Nodemailer.
// Set RESEND_API_KEY=none to switch Resend off without deleting the key.

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  idempotencyKey?: string;
  replyTo?: string;
};

export type SendEmailResult = {
  ok: boolean;
  id?: string;
  error?: string;
  provider?: "resend" | "smtp";
};

function assertServerOnly() {
  if (typeof window !== "undefined") {
    throw new Error("Email utilities must only run on the server");
  }
}

function resendConfig(): { apiKey: string; from: string } | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || apiKey.toLowerCase() === "none" || !from) return null;
  return { apiKey, from };
}

function smtpConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  if (!user || !pass) return null;
  const port = Number(process.env.SMTP_PORT) || 465;
  return {
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure: port === 465,
    user,
    pass,
    // Relays like Brevo log in with one address but send as a verified sender.
    fromEmail: process.env.EMAIL_FROM?.trim() || user,
    fromName: process.env.EMAIL_FROM_NAME?.trim() || "Kynta Wellness",
    replyTo: process.env.EMAIL_REPLY_TO?.trim() || undefined,
  };
}

export function getBookingOwnerEmail(): string | null {
  return process.env.BOOKING_OWNER_EMAIL?.trim() || null;
}

async function sendViaResend(
  input: SendEmailInput,
  config: { apiKey: string; from: string },
): Promise<SendEmailResult> {
  const { data, error } = await new Resend(config.apiKey).emails.send(
    {
      from: config.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
    },
    input.idempotencyKey ? { idempotencyKey: input.idempotencyKey } : undefined,
  );
  if (error) return { ok: false, error: error.message, provider: "resend" };
  return { ok: true, id: data?.id, provider: "resend" };
}

let transporter: Transporter | null = null;

async function sendViaSmtp(input: SendEmailInput): Promise<SendEmailResult> {
  const config = smtpConfig();
  if (!config) {
    return {
      ok: false,
      error: "SMTP is not configured (set SMTP_USER and SMTP_PASS)",
      provider: "smtp",
    };
  }
  transporter ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });
  try {
    const info = await transporter.sendMail({
      // Gmail only allows sending as the signed-in account; Brevo only as a
      // sender verified in its dashboard.
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: input.to,
      subject: input.subject,
      html: input.html,
      ...((input.replyTo ?? config.replyTo)
        ? { replyTo: input.replyTo ?? config.replyTo }
        : {}),
    });
    return { ok: true, id: info.messageId, provider: "smtp" };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown SMTP error",
      provider: "smtp",
    };
  }
}

export async function sendTransactionalEmail(
  input: SendEmailInput,
): Promise<SendEmailResult> {
  assertServerOnly();

  const resend = resendConfig();
  if (resend) {
    try {
      const result = await sendViaResend(input, resend);
      if (result.ok) return result;
      console.warn(
        `[email] Resend failed (${result.error}) — falling back to SMTP`,
      );
    } catch (err) {
      console.warn(
        "[email] Resend threw — falling back to SMTP:",
        err instanceof Error ? err.message : err,
      );
    }
  }

  const result = await sendViaSmtp(input);
  if (!result.ok) {
    console.error(`[email] SMTP send failed: ${result.error}`);
  }
  return result;
}
