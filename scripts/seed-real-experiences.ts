// Replaces the experience pages in Sanity with the five real treatment
// categories from src/content/real-experiences.ts (from the printed menus).
//   - backs up every experience document to sanity/backups/ first
//   - keeps the photos already uploaded (new pages reuse the photos of the
//     made-up page they replace)
//   - deletes the made-up pages (Hydrotherapy Plunge, Sound Immersion,
//     Couples Sanctuary) and any unpublished drafts of these pages
//
// Preview:  npm run seed:experiences -- --dry-run
// Write:    npm run seed:experiences
// Needs SANITY_API_WRITE_TOKEN in .env.local.

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { realExperiences } from "../src/content/real-experiences";

config({ path: ".env.local", quiet: true });
config({ quiet: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry-run");

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
  perspective: "raw",
});

// New pages take their photos from the made-up page they replace.
const PHOTO_DONORS: Record<string, string> = {
  "couple-spa": "experience-couples-sanctuary",
  "rapid-relax": "experience-sound-immersion",
};
const REMOVE = [
  "experience-hydrotherapy-plunge",
  "experience-sound-immersion",
  "experience-couples-sanctuary",
];

// biome-ignore lint/suspicious/noExplicitAny: raw Sanity documents
type Doc = Record<string, any>;

async function main() {
  const existing: Doc[] = await client.fetch(`*[_type == "experience"]`);
  const byId = new Map(existing.map((d) => [d._id, d]));

  const backupDir = path.join(process.cwd(), "sanity", "backups");
  mkdirSync(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backup = path.join(backupDir, `experiences-${stamp}.json`);
  writeFileSync(backup, JSON.stringify(existing, null, 2));
  console.log(`Backed up ${existing.length} experience documents.`);

  const tx = client.transaction();

  for (const e of realExperiences) {
    const id = `experience-${e.slug}`;
    const donor = byId.get(id) ?? byId.get(PHOTO_DONORS[e.slug] ?? "") ?? {};
    const card = (
      name: "mainCard" | "topRightCard" | "bottomRightCard",
      text: Record<string, string>,
    ) => ({
      ...text,
      ...(donor.gallery?.[name]?.image
        ? { image: donor.gallery[name].image }
        : {}),
    });

    const doc = {
      _id: id,
      _type: "experience",
      title: e.title,
      slug: { _type: "slug", current: e.slug },
      eyebrow: e.eyebrow,
      description: e.description,
      category: e.category,
      duration: e.duration,
      sensoryNote: e.highlights.join(" • "),
      price: `From ₹${e.fromPrice.toLocaleString("en-IN")}`,
      priceAmount: e.fromPrice,
      currency: "INR",
      primaryCta: { label: "BOOK NOW", url: "/book" },
      secondaryCta: { label: "CALL TO BOOK", url: "/contact" },
      ...(donor.image ? { image: donor.image } : {}),
      gallery: {
        mainCard: card("mainCard", e.gallery.main),
        topRightCard: card("topRightCard", e.gallery.topRight),
        bottomRightCard: card("bottomRightCard", e.gallery.bottomRight),
      },
      footerNote: e.footerNote,
      highlights: e.highlights,
      treatments: e.treatments.map((t, i) => ({
        _key: `${e.slug}-${i}`,
        _type: "experienceTreatment",
        ...t,
      })),
      seo: {
        title: `${e.title} | Kynta Wellness`,
        description: e.description.slice(0, 160),
      },
    };
    tx.createOrReplace(doc);
    // An old unpublished draft would otherwise hide the new text in Studio.
    if (byId.has(`drafts.${id}`)) tx.delete(`drafts.${id}`);
    console.log(
      `  ${dryRun ? "would write" : "✓"} ${id}: ${e.treatments.length} treatments${
        donor.image ? ", photos kept" : ""
      }`,
    );
  }

  for (const id of REMOVE) {
    for (const docId of [id, `drafts.${id}`]) {
      if (byId.has(docId)) {
        tx.delete(docId);
        console.log(`  ${dryRun ? "would delete" : "✗ deleted"} ${docId}`);
      }
    }
  }

  if (dryRun) {
    console.log("\nDry run: nothing written.");
    return;
  }
  await tx.commit();
  console.log(`\nDone. Backup: ${path.relative(process.cwd(), backup)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
