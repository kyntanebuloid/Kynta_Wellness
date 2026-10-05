// Send a test plaintext email with a random blog post
// Usage: npx tsx scripts/send-test-email.ts your@email.com

import { config } from "dotenv";
import { realBlogPosts } from "../src/content/real-blog";
import { sendTransactionalEmail } from "../src/lib/email/mailer";

config({ path: ".env.local", quiet: true });

async function main() {
  const to = process.argv[2];
  if (!to) {
    console.error("Usage: npx tsx scripts/send-test-email.ts your@email.com");
    process.exit(1);
  }

  const post = realBlogPosts[Math.floor(Math.random() * realBlogPosts.length)];

  const textContent = `
Kynta Wellness – New Article
${post.category} • ${post.readTime}

${post.title}

${post.excerpt}

Read the full article: https://kyntawellness.com/blog/${post.slug}

---

You are receiving this because you subscribed to Kynta Wellness blog updates.
To unsubscribe, reply to this email.

Kynta Wellness Private Limited
  `;

  console.log(
    `Sending: "${post.title}" to ${to} via ${process.env.RESEND_API_KEY ? "Resend" : "SMTP"}...`,
  );

  const result = await sendTransactionalEmail({
    to,
    subject: `Kynta Blog: ${post.title}`,
    html: `<pre>${textContent}</pre>`,
  });

  if (result.ok) {
    console.log(`✓ Sent (${result.provider})`);
  } else {
    console.error(`✗ ${result.error}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
