import { Resend } from "resend";

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  idempotencyKey?: string;
  replyTo?: string;
};

function assertServerOnly() {
  if (typeof window !== "undefined") {
    throw new Error("Email utilities must only run on the server");
  }
}

export function getResendClient(): Resend {
  assertServerOnly();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }

  return new Resend(apiKey);
}

export function getResendFromEmail(): string {
  assertServerOnly();

  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!from) {
    throw new Error("Missing RESEND_FROM_EMAIL environment variable");
  }

  return from;
}

export function getBookingOwnerEmail(): string | null {
  return process.env.BOOKING_OWNER_EMAIL?.trim() || null;
}

export async function sendTransactionalEmail(
  input: SendEmailInput,
): Promise<{ ok: boolean; id?: string; error?: string }> {
  assertServerOnly();

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const from = getResendFromEmail();

    if (!apiKey) {
      return { ok: false, error: "Missing RESEND_API_KEY" };
    }

    const resend = getResendClient();
    const { data, error } = await resend.emails.send(
      {
        from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        ...(input.replyTo ? { replyTo: input.replyTo } : {}),
      },
      input.idempotencyKey
        ? { idempotencyKey: input.idempotencyKey }
        : undefined,
    );

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, id: data?.id };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown email error",
    };
  }
}
