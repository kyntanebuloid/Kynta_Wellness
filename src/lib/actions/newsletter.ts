"use server";

import { createHash } from "node:crypto";
import { createClient } from "next-sanity";
import { sendTransactionalEmail } from "@/lib/email/mailer";
import { buildGuestAcknowledgementHtml } from "@/lib/email/templates";

// Footer newsletter sign-up: saves the email in Sanity (Studio → Newsletter
// Subscribers, one document per email) and sends a short welcome email.

export type NewsletterResult = { ok: true } | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToNewsletter(
  formData: FormData,
): Promise<NewsletterResult> {
  // Bots fill the hidden "website" field; act as if it worked.
  if (String(formData.get("website") ?? "")) return { ok: true };

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 200);
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    console.error("[newsletter] Sanity write token or project ID missing");
    return { ok: false, error: "Sorry, sign-up isn't working right now." };
  }
  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2025-01-01",
    token,
    useCdn: false,
  });

  // One document per email, so signing up twice changes nothing.
  const id = `subscriber-${createHash("sha256").update(email).digest("hex").slice(0, 24)}`;
  try {
    const existing = await client.getDocument(id);
    if (existing && !existing.unsubscribed) return { ok: true };
    await client.createOrReplace({
      _id: id,
      _type: "newsletterSubscriber",
      email,
      subscribedAt: new Date().toISOString(),
      unsubscribed: false,
    });
  } catch (err) {
    console.error(
      "[newsletter] could not save subscriber:",
      err instanceof Error ? err.message : err,
    );
    return { ok: false, error: "Sorry, sign-up isn't working right now." };
  }

  const welcome = await sendTransactionalEmail({
    to: email,
    subject: "Welcome to Kynta Wellness",
    html: buildGuestAcknowledgementHtml({
      name: "there",
      heading: "Thank you for subscribing",
      intro:
        "you will now hear from Kynta Wellness about our spas, treatments and offers. To stop receiving our emails at any time, just reply to this email.",
      rows: [["Subscribed email", email]],
    }),
  });
  if (!welcome.ok) {
    console.warn(`[newsletter] welcome email failed: ${welcome.error}`);
  }
  return { ok: true };
}
