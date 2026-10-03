// Pushes the real menu-based TEXT for the About page and the Locations pages
// into Sanity, from src/content/about.ts and src/content/real-locations.ts.
// Only text is changed: photos, booking menus, membership plans, map links
// and PDFs are left exactly as they are. Unpublished drafts are updated too.
// Backups of both documents go to sanity/backups/ first.
//
// Preview:  npm run apply:real-text -- --dry-run
// Write:    npm run apply:real-text
// Needs SANITY_API_WRITE_TOKEN in .env.local.

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { aboutDefaults } from "../src/content/about";
import {
  realLocationsPageText,
  realLocationText,
} from "../src/content/real-locations";

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

let n = 0;
const keyed = <T extends object>(type: string, items: T[]) =>
  items.map((item) => ({
    _key: `rt${(n++).toString(36)}`,
    _type: type,
    ...item,
  }));

function aboutFields(doc: Record<string, unknown>) {
  const a = aboutDefaults;
  const set: Record<string, unknown> = {
    "hero.eyebrow": a.hero.eyebrow,
    "hero.heading": a.hero.heading,
    "hero.description": a.hero.description,
    "hero.imageCaption": a.hero.imageCaption,
    "hero.badgeLabel": a.hero.badgeLabel,
    "hero.badgeText": a.hero.badgeText,
    "hero.stats": keyed("stat", a.hero.stats),
    "triadSection.eyebrow": a.triadSection.eyebrow,
    "triadSection.heading": a.triadSection.heading,
    "triadSection.description": a.triadSection.description,
    "stewardshipSection.eyebrow": a.stewardshipSection.eyebrow,
    "stewardshipSection.heading": a.stewardshipSection.heading,
    "stewardshipSection.description": a.stewardshipSection.description,
    "stewardshipSection.features": keyed(
      "feature",
      a.stewardshipSection.features,
    ),
  };
  // Pillar cards and photo alt text by position, keeping the photos.
  const cards = (
    (doc.triadSection as { cards?: unknown[] } | undefined)?.cards ?? []
  ).length;
  a.triadSection.cards.slice(0, cards).forEach((card, i) => {
    set[`triadSection.cards[${i}].title`] = card.title;
    set[`triadSection.cards[${i}].description`] = card.description;
    set[`triadSection.cards[${i}].footerLabel`] = card.footerLabel;
    set[`triadSection.cards[${i}].footerValue`] = card.footerValue;
  });
  const images = (
    (doc.stewardshipSection as { images?: unknown[] } | undefined)?.images ?? []
  ).length;
  a.stewardshipSection.images.slice(0, images).forEach((image, i) => {
    set[`stewardshipSection.images[${i}].alt`] = image.alt;
  });
  return set;
}

function locationsFields(doc: Record<string, unknown>) {
  const p = realLocationsPageText;
  const set: Record<string, unknown> = {
    hero: p.hero,
    filterLabels: p.filterLabels,
    glanceHeading: "Spa at a Glance",
    ctaSection: p.ctaSection,
  };
  const slugs = ((doc.locations as { slug?: string }[] | undefined) ?? []).map(
    (l) => l.slug,
  );
  for (const slug of slugs) {
    const real = slug ? realLocationText(slug) : null;
    if (!real) continue;
    const at = (field: string) => `locations[slug=="${slug}"].${field}`;
    Object.assign(set, {
      [at("name")]: real.name,
      [at("address")]: real.address,
      [at("hours")]: real.hours,
      [at("phone")]: real.phone,
      [at("price")]: real.price,
      [at("cardDescription")]: real.cardDescription,
      [at("breadcrumbEyebrow")]: real.breadcrumbEyebrow,
      [at("description")]: real.description,
      [at("sanctuaryId")]: real.sanctuaryId,
      [at("sanctuaryInfo")]: keyed("infoRow", real.sanctuaryInfo),
      [at("primaryCta")]: real.primaryCta,
      [at("services")]: real.services,
      [at("facilities")]: keyed("facility", real.facilities),
    });
    for (const card of [
      "mainCard",
      "topRightCard",
      "bottomRightCard",
    ] as const) {
      for (const [field, value] of Object.entries(real.gallery[card])) {
        set[at(`gallery.${card}.${field}`)] = value;
      }
    }
  }
  return set;
}

async function main() {
  const docs: Record<string, unknown>[] = await client.fetch(
    `*[_type in ["aboutPage", "locationsPage"]]`,
  );
  const backupDir = path.join(process.cwd(), "sanity", "backups");
  mkdirSync(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  writeFileSync(
    path.join(backupDir, `real-text-before-${stamp}.json`),
    JSON.stringify(docs, null, 2),
  );

  const tx = client.transaction();
  for (const doc of docs) {
    const id = doc._id as string;
    const set =
      doc._type === "aboutPage" ? aboutFields(doc) : locationsFields(doc);
    tx.patch(id, (p) => p.set(set));
    console.log(
      `  ${dryRun ? "would update" : "✓"} ${id}: ${Object.keys(set).length} text fields`,
    );
  }
  if (dryRun) {
    console.log("\nDry run: nothing written.");
    return;
  }
  await tx.commit();
  console.log(`\nDone. Backup in ${path.relative(process.cwd(), backupDir)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
