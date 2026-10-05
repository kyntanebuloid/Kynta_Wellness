"use server";

import { createHash } from "node:crypto";
import { createClient } from "next-sanity";
import { sendTransactionalEmail } from "@/lib/email/mailer";
import { buildGuestAcknowledgementHtml } from "@/lib/email/templates";
import { realBlogPosts } from "@/content/real-blog";

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

  const blogLinks = realBlogPosts.slice(0, 3)
    .map((post) => `<li><a href="https://kyntawellness.com/blog/${post.slug}" style="color: #1a5c57; text-decoration: none; font-weight: 500;">${post.title}</a> — ${post.readTime}</li>`)
    .join("");

  const welcome = await sendTransactionalEmail({
    to: email,
    subject: "Welcome to Kynta Wellness",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2c2c2c;">
        <div style="background: #1a5c57; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; font-size: 24px;">Welcome to Kynta Wellness</h2>
        </div>
        <div style="background: #f7f9f7; padding: 24px; border-radius: 0 0 8px 8px;">
          <p style="margin-top: 0;">Thank you for subscribing!</p>
          <p>You'll now receive updates about our spas, treatments and wellness insights from Kynta.</p>

          <div style="background: white; padding: 16px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #1a5c57;">
            <h3 style="margin-top: 0; color: #1a5c57; font-size: 16px;">Latest from the Kynta Journal</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${blogLinks}
            </ul>
            <p style="margin: 16px 0 0 0; text-align: center;">
              <a href="https://kyntawellness.com/blog" style="color: #1a5c57; text-decoration: none; font-weight: bold;">Read all articles →</a>
            </p>
          </div>

          <p style="font-size: 12px; color: #6b6b6b; margin-bottom: 0;">To unsubscribe, reply to this email with "unsubscribe".</p>
          <p style="font-size: 12px; color: #6b6b6b;">Kynta Wellness Private Limited</p>
        </div>
      </div>
    `,
  });
  if (!welcome.ok) {
    console.warn(`[newsletter] welcome email failed: ${welcome.error}`);
  }
  return { ok: true };
}
