// Replaces every Blog Post in Sanity with the five Kynta posts in
// src/content/real-blog.ts, and points the blog page's category buttons at
// them (one post per category, ALL ESSAYS shows the first).
//
//   npm run seed:blog -- --dry-run   show what would change
//   npm run seed:blog                write it
//
// Old posts (and drafts) are deleted after a backup to sanity/backups/.
// Cover photos are uploaded from /public/blog (see image in real-blog.ts);
// the photos already on the category buttons are kept.
// Needs SANITY_API_WRITE_TOKEN in .env.local.

import { randomUUID } from "node:crypto";
import { createReadStream, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { blogPageDefaults } from "../src/content/blog";
import { BLOG_AUTHOR, realBlogPosts } from "../src/content/real-blog";

config({ path: ".env.local", quiet: true });
config({ quiet: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN");

const dryRun = process.argv.includes("--dry-run");
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
  perspective: "raw",
});

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

/** "Some **bold** and a [link](/x)" → Portable Text spans + link marks. */
function spans(line: string) {
  const children: Record<string, unknown>[] = [];
  const markDefs: Record<string, unknown>[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  for (const m of line.matchAll(re)) {
    const at = m.index ?? 0;
    if (at > last) {
      children.push({
        _type: "span",
        _key: key(),
        text: line.slice(last, at),
        marks: [],
      });
    }
    if (m[1]) {
      children.push({
        _type: "span",
        _key: key(),
        text: m[1],
        marks: ["strong"],
      });
    } else {
      const k = key();
      markDefs.push({ _type: "link", _key: k, href: m[3] });
      children.push({ _type: "span", _key: key(), text: m[2], marks: [k] });
    }
    last = at + m[0].length;
  }
  if (last < line.length) {
    children.push({
      _type: "span",
      _key: key(),
      text: line.slice(last),
      marks: [],
    });
  }
  return { children, markDefs };
}

function toBlocks(body: string[]) {
  return body.map((line) => {
    const base = { _type: "block", _key: key() };
    if (line.startsWith("## ")) {
      return { ...base, style: "h2", ...spans(line.slice(3)) };
    }
    if (line.startsWith("> ")) {
      return { ...base, style: "blockquote", ...spans(line.slice(2)) };
    }
    if (line.startsWith("- ")) {
      return {
        ...base,
        style: "normal",
        listItem: "bullet",
        level: 1,
        ...spans(line.slice(2)),
      };
    }
    return { ...base, style: "normal", ...spans(line) };
  });
}

const postId = (slug: string) => `blogpost-${slug}`;

async function main() {
  const oldPosts: { _id: string; title?: string }[] = await client.fetch(
    `*[_type == "blogPost"]{_id, title}`,
  );
  const pages: Record<string, unknown>[] = await client.fetch(
    `*[_type == "blogPage"]`,
  );

  // Back up everything this touches.
  const backupDir = path.join(process.cwd(), "sanity", "backups");
  mkdirSync(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fullOld = await client.fetch(`*[_type == "blogPost"]`);
  const backup = path.join(backupDir, `blog-before-reseed-${stamp}.json`);
  if (!dryRun) {
    writeFileSync(backup, JSON.stringify({ posts: fullOld, pages }, null, 2));
  }

  const tx = client.transaction();
  const newIds = new Set(realBlogPosts.map((p) => postId(p.slug)));

  for (const old of oldPosts) {
    if (newIds.has(old._id.replace(/^drafts\./, ""))) continue;
    tx.delete(old._id);
    console.log(
      `  ${dryRun ? "would delete" : "✗ delete"} ${old._id}  ${old.title ?? ""}`,
    );
  }

  // Upload each cover photo from /public (Sanity skips duplicates).
  const assetIds: (string | null)[] = [];
  for (const post of realBlogPosts) {
    if (dryRun) {
      assetIds.push(null);
      continue;
    }
    const file = path.join(process.cwd(), "public", post.image);
    const asset = await client.assets.upload("image", createReadStream(file), {
      filename: path.basename(file),
    });
    assetIds.push(asset._id);
    console.log(`  ✓ photo ${path.basename(file)}`);
  }

  const start = new Date("2026-10-05T09:00:00+05:30").getTime();
  realBlogPosts.forEach((post, i) => {
    const assetId = assetIds[i];
    const id = postId(post.slug);
    tx.createOrReplace({
      _id: id,
      _type: "blogPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      showOnSite: true,
      position: i + 1,
      featuredImage: {
        _type: "image",
        ...(assetId ? { asset: { _type: "reference", _ref: assetId } } : {}),
        alt: post.imageAlt,
      },
      category: post.category,
      readTime: post.readTime,
      excerpt: post.excerpt,
      // Newest first in date order too, matching the positions.
      publishedAt: new Date(start - i * 60_000).toISOString(),
      author: BLOG_AUTHOR,
      authorRole: "",
      content: toBlocks(post.body),
      seo: {
        title: post.seoTitle ?? `${post.title} | Kynta Wellness`,
        description: post.seoDescription,
      },
    });
    // Remove any stale draft of the same post.
    tx.delete(`drafts.${id}`);
    console.log(
      `  ${dryRun ? "would create" : "✓ create"} #${i + 1} ${post.title}`,
    );
  });

  // Blog page (published + draft): new hero text, each button → its post.
  const d = blogPageDefaults;
  for (const page of pages) {
    const hero = (page.hero ?? {}) as {
      categories?: Record<string, unknown>[];
    };
    const existing = new Map(
      (hero.categories ?? []).map((c) => [c.label as string, c]),
    );
    const categories = d.hero.categories.map((c, i) => {
      const old = existing.get(c.label);
      const post = realBlogPosts[Math.max(0, i - 1)];
      return {
        _type: "blogCategory",
        _key: (old?._key as string) ?? key(),
        label: c.label,
        post: { _type: "reference", _ref: postId(post.slug), _weak: true },
        ...(old?.image ? { image: old.image } : {}),
        badge: c.badge,
        category: c.category,
        issue: "",
        readTime: c.readTime,
        title: c.title,
        description: c.description,
        authorInitials: c.authorInitials,
        authorName: c.authorName,
        authorRole: "",
        url: c.url,
        linkLabel: c.linkLabel,
      };
    });
    tx.patch(page._id as string, (p) =>
      p.set({
        "hero.eyebrow": d.hero.eyebrow,
        "hero.heading": d.hero.heading,
        "hero.subheading": d.hero.subheading,
        "hero.categories": categories,
        "inquiriesSection.eyebrow": d.inquiriesSection.eyebrow,
        "inquiriesSection.heading": d.inquiriesSection.heading,
        "inquiriesSection.note": d.inquiriesSection.note,
      }),
    );
    console.log(
      `  ${dryRun ? "would update" : "✓ update"} ${page._id}: hero + ${categories.length} category buttons`,
    );
  }

  if (dryRun) {
    console.log("\nDry run: nothing written.");
    return;
  }
  await tx.commit();
  console.log(`\nDone. Backup in ${path.relative(process.cwd(), backup)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
