// Pushes the built-in page content from src/content/*.ts into Sanity, so
// Sanity starts out exactly matching what the site shows. For each page it:
//   - backs up the current Sanity document to sanity/backups/,
//   - converts the content using the Sanity schema (adds _key/_type,
//     uploads local /public photos as Sanity images),
//   - fails if the content has a field the schema doesn't define,
//   - replaces the document, keeping fields that only exist in Sanity
//     (SEO text, uploaded PDFs, map links).
//
// Per page (see package.json): npm run sync:about, sync:hotels, sync:blog, …
// All pages:                   npm run sync:all
// Dry run (no changes):        npm run sync:about -- --dry-run
// Needs SANITY_API_WRITE_TOKEN in .env.local.

import {
  createReadStream,
  existsSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { schemaTypes } from "../sanity/schemas";
import { experienceGalleryFor } from "../src/content/experience-gallery";
import { contentDocuments } from "../src/content/registry";

config({ path: ".env.local", quiet: true });
config({ quiet: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry-run");
const only = process.argv
  .find((arg) => arg.startsWith("--only="))
  ?.slice("--only=".length)
  .split(",");

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!dryRun && !token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN (sanity.io/manage → API → Tokens), or use --dry-run.",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

// biome-ignore lint/suspicious/noExplicitAny: walks arbitrary Sanity schema definitions
type Field = any;
// biome-ignore lint/suspicious/noExplicitAny: arbitrary document content
type Value = any;

const uploads = new Map<string, Promise<string>>();

function uploadLocalImage(publicPath: string): Promise<string> {
  if (dryRun) return Promise.resolve(`(would upload ${publicPath})`);
  let pending = uploads.get(publicPath);
  if (!pending) {
    const file = path.join(process.cwd(), "public", decodeURI(publicPath));
    if (!existsSync(file))
      throw new Error(`Image not found in /public: ${publicPath}`);
    pending = client.assets
      .upload("image", createReadStream(file), {
        filename: path.basename(file),
      })
      .then((asset) => {
        console.log(`    ↑ ${publicPath}`);
        return asset._id;
      });
    uploads.set(publicPath, pending);
  }
  return pending;
}

let keyCounter = 0;
const newKey = () => `k${(keyCounter++).toString(36)}`;

async function convertImage(value: Value, where: string) {
  if (!value || typeof value !== "object") {
    throw new Error(`${where}: expected an image { url, alt }`);
  }
  const url: string = value.url;
  if (typeof url !== "string" || !url.startsWith("/")) {
    throw new Error(
      `${where}: only local /public images can be pushed (got ${url})`,
    );
  }
  const ref = await uploadLocalImage(url);
  return {
    _type: "image",
    asset: { _type: "reference", _ref: ref },
    ...(value.alt ? { alt: value.alt } : {}),
  };
}

async function convertObject(value: Value, fields: Field[], where: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${where}: expected an object`);
  }
  const out: Record<string, Value> = {};
  for (const [name, child] of Object.entries(value)) {
    if (child === undefined || child === null) continue;
    const field = fields.find((f) => f.name === name);
    if (!field)
      throw new Error(`${where}.${name}: not defined in the Sanity schema`);
    out[name] = await convertField(child, field, `${where}.${name}`);
  }
  return out;
}

async function convertField(
  value: Value,
  field: Field,
  where: string,
): Promise<Value> {
  switch (field.type) {
    case "object":
      return convertObject(value, field.fields, where);
    case "image":
      return convertImage(value, where);
    case "array": {
      if (!Array.isArray(value)) throw new Error(`${where}: expected a list`);
      const member = field.of[0];
      if (member.type === "string") return value;
      return Promise.all(
        value.map(async (item: Value, i: number) => {
          const at = `${where}[${i}]`;
          if (member.type === "image") {
            return { _key: newKey(), ...(await convertImage(item, at)) };
          }
          return {
            _key: newKey(),
            _type: member.name,
            ...(await convertObject(item, member.fields, at)),
          };
        }),
      );
    }
    default:
      return value;
  }
}

const isPlainObject = (v: Value) =>
  v !== null && typeof v === "object" && !Array.isArray(v);

/**
 * Copies over fields that only exist in Sanity — things added in Studio that
 * the built-in content has no value for (SEO text, uploaded PDFs, map links) —
 * so re-running a page doesn't wipe them. Built-in content still wins for
 * every field it defines. List items are matched by `slug` when they have one,
 * otherwise by position.
 */
function keepStudioOnlyFields(
  next: Value,
  current: Value,
  fields: Field[],
): Value {
  if (!isPlainObject(next) || !isPlainObject(current)) return next;
  const out: Record<string, Value> = { ...next };
  for (const field of fields) {
    const name = field.name;
    const existing = current[name];
    if (existing === undefined || existing === null) continue;
    if (!(name in out)) {
      out[name] = existing;
    } else if (field.type === "object") {
      out[name] = keepStudioOnlyFields(out[name], existing, field.fields);
    } else if (
      field.type === "array" &&
      field.of?.[0]?.type === "object" &&
      Array.isArray(out[name]) &&
      Array.isArray(existing)
    ) {
      out[name] = out[name].map((item: Value, i: number) => {
        const match =
          (item?.slug && existing.find((e: Value) => e?.slug === item.slug)) ||
          (!item?.slug ? existing[i] : undefined);
        return match
          ? keepStudioOnlyFields(item, match, field.of[0].fields)
          : item;
      });
    }
  }
  return out;
}

// Experiences hold prices used for payments, so they are never replaced:
// only empty photo slots are filled with the photos the detail page shows.
async function fillExperiencePhotos() {
  console.log("\nexperiences (photos only)");
  const experiences: {
    _id: string;
    slug?: { current?: string };
    image?: unknown;
    gallery?: Record<string, { image?: unknown } | undefined>;
  }[] = await client.fetch(
    `*[_type == "experience" && !(_id in path("drafts.**"))]{_id, slug, image, gallery}`,
  );
  for (const exp of experiences) {
    const photos = experienceGalleryFor(exp.slug?.current ?? "");
    const slots: [string, string, boolean][] = [
      ["image", photos.main, Boolean(exp.image)],
      [
        "gallery.mainCard.image",
        photos.main,
        Boolean(exp.gallery?.mainCard?.image),
      ],
      [
        "gallery.topRightCard.image",
        photos.topRight,
        Boolean(exp.gallery?.topRightCard?.image),
      ],
      [
        "gallery.bottomRightCard.image",
        photos.bottomRight,
        Boolean(exp.gallery?.bottomRightCard?.image),
      ],
    ];
    const set: Record<string, Value> = {};
    for (const [field, url, filled] of slots) {
      if (!filled)
        set[field] = await convertImage({ url }, `${exp._id}.${field}`);
    }
    const count = Object.keys(set).length;
    if (count === 0) {
      console.log(`  ${exp._id}: photos already set`);
    } else if (dryRun) {
      console.log(`  ${exp._id}: would fill ${count} photo(s)`);
    } else {
      await client.patch(exp._id).set(set).commit();
      console.log(`  ✓ ${exp._id}: filled ${count} photo(s)`);
    }
  }
}

async function main() {
  const backupDir = path.join(process.cwd(), "sanity", "backups");
  mkdirSync(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");

  const targets = contentDocuments.filter((d) => !only || only.includes(d.id));
  const fillExperiences = !only || only.includes("experiences");
  if (targets.length === 0 && !fillExperiences) {
    throw new Error(`Nothing matches --only=${only}`);
  }
  if (fillExperiences) await fillExperiencePhotos();

  for (const target of targets) {
    const schema = schemaTypes.find((t) => t.name === target.type) as Field;
    if (!schema) throw new Error(`No Sanity schema named ${target.type}`);
    console.log(`\n${target.id}`);

    const current = await client.fetch(`*[_id == $id][0]`, { id: target.id });
    writeFileSync(
      path.join(backupDir, `${target.id}-${stamp}.json`),
      JSON.stringify(current, null, 2),
    );

    const converted = await convertObject(
      target.content,
      schema.fields,
      target.id,
    );
    const doc = {
      ...keepStudioOnlyFields(converted, current, schema.fields),
      _id: target.id,
      _type: target.type,
    };

    if (dryRun) {
      writeFileSync(
        path.join(backupDir, `planned-${target.id}-${stamp}.json`),
        JSON.stringify(doc, null, 2),
      );
      console.log("  dry run OK");
      continue;
    }
    await client.createOrReplace(doc);
    console.log("  ✓ updated");
  }
  console.log(`\nBackups in ${path.relative(process.cwd(), backupDir)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
