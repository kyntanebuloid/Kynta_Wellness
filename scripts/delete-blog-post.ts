// Lists or deletes Blog Post documents in Sanity.
//
// List every post:           npm run blog:delete
// Delete one (by web address or id):
//                            npm run blog:delete -- my-test-post
//
// Deleting also removes the post from any Blog page hero category that picked
// it (otherwise Sanity refuses the delete), and removes its unpublished draft.
// A backup of the post goes to sanity/backups/ first.
// Needs SANITY_API_WRITE_TOKEN in .env.local.

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });
config({ quiet: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN (sanity.io/manage → API → Tokens).",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
  // Include drafts, so unpublished test posts show up too.
  perspective: "raw",
});

type Post = {
  _id: string;
  title?: string;
  slug?: string;
  showOnSite?: boolean;
  position?: number;
};

const publishedId = (id: string) => id.replace(/^drafts\./, "");

async function listPosts() {
  const posts: Post[] = await client.fetch(
    `*[_type == "blogPost"] | order(coalesce(position, 1000000) asc) {
      _id, title, "slug": slug.current, showOnSite, position
    }`,
  );
  if (posts.length === 0) {
    console.log("No blog posts in Sanity.");
    return;
  }
  console.log("Blog posts:\n");
  for (const p of posts) {
    const draft = p._id.startsWith("drafts.") ? " (unpublished draft)" : "";
    const shown = p.showOnSite === false ? "hidden" : "shown";
    const pos = typeof p.position === "number" ? `#${p.position}` : "#-";
    console.log(`  ${pos}  ${p.title ?? "(no title)"}${draft}`);
    console.log(`       web address: ${p.slug ?? "(none)"}   ${shown}`);
    console.log(`       id: ${p._id}\n`);
  }
  console.log("Delete one with:  npm run blog:delete -- <web address or id>");
}

async function deletePost(target: string) {
  const matches: Post[] = await client.fetch(
    `*[_type == "blogPost" && (slug.current == $t || _id == $t || _id == "drafts." + $t)]{
      _id, title, "slug": slug.current
    }`,
    { t: target },
  );
  if (matches.length === 0) {
    console.log(`No blog post with web address or id "${target}".\n`);
    await listPosts();
    process.exitCode = 1;
    return;
  }

  const ids = new Set<string>();
  for (const m of matches) {
    ids.add(publishedId(m._id));
    ids.add(`drafts.${publishedId(m._id)}`);
  }
  const baseIds = [...ids].filter((id) => !id.startsWith("drafts."));
  if (baseIds.length > 1) {
    console.log(
      `"${target}" matches more than one post; delete by id instead:\n`,
    );
    for (const m of matches) console.log(`  ${m._id}  ${m.title}`);
    process.exitCode = 1;
    return;
  }

  // Back up the full documents first.
  const full = await client.fetch(`*[_id in $ids]`, { ids: [...ids] });
  const backupDir = path.join(process.cwd(), "sanity", "backups");
  mkdirSync(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backup = path.join(backupDir, `blogPost-${baseIds[0]}-${stamp}.json`);
  writeFileSync(backup, JSON.stringify(full, null, 2));

  // Clear the post from any hero category (published page and its draft).
  const pages: {
    _id: string;
    keys: (string | null)[] | null;
  }[] = await client.fetch(
    `*[_type == "blogPage"]{
      _id,
      "keys": hero.categories[post._ref == $id]._key
    }`,
    { id: baseIds[0] },
  );

  const tx = client.transaction();
  for (const page of pages) {
    for (const key of (page.keys ?? []).filter(Boolean)) {
      tx.patch(page._id, (p) =>
        p.unset([`hero.categories[_key=="${key}"].post`]),
      );
      console.log(`  cleared it from a hero category on ${page._id}`);
    }
  }
  for (const id of ids) tx.delete(id);
  await tx.commit();

  console.log(`✓ Deleted "${matches[0].title ?? target}"`);
  console.log(`  backup: ${path.relative(process.cwd(), backup)}`);
}

const target = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
(target ? deletePost(target) : listPosts()).catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
