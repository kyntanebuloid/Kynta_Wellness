// Loads the spa price menus (from the printed menus) into Sanity:
// Pages → Locations → each spa → Booking Menu. Each spa's other fields are
// left alone. Also sets the GST % if it isn't set yet.
//
// Preview:  npm run seed:menus -- --dry-run
// Write:    npm run seed:menus
// Only some spas:  npm run seed:menus -- --only=indraprastha-dalhousie
// The Brahma Mandir Rd (Pushkar) menu is skipped until it is confirmed which
// spa it belongs to; then run with  --brahma-mandir=<location slug>.
//
// Prices are before tax, as printed. Needs SANITY_API_WRITE_TOKEN.

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });
config({ quiet: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry-run");
const arg = (name: string) =>
  process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const only = arg("only")?.split(",");
const brahmaMandirSlug = arg("brahma-mandir");

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!dryRun && !token) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN, or use --dry-run.");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

type Category = "sojourn" | "couple" | "massage" | "glamour" | "rapid";
type Prices = {
  deepSleep: number;
  nourish: number;
  royalRenewal: number;
  coupleRetreat: number;
  coupleBliss: number;
  swedish: [number, number];
  deepTissue: [number, number];
  aroma: [number, number];
  abhyanga: [number, number];
  potli: [number, number];
  /** [60, 90] or just the 90-minute price. */
  signature: [number, number] | number;
  signatureName: string;
  bodyTreatment: number;
  cleansingFacial: number;
  facial60: number;
  rapid: number;
};

let keyCounter = 0;
const key = (prefix: string) =>
  `${prefix}${(keyCounter++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;

function item(
  name: string,
  category: Category,
  options: [minutes: number, price: number][],
  perPerson = false,
) {
  return {
    _key: key("t"),
    _type: "menuItem",
    name,
    category,
    perPerson,
    options: options.map(([minutes, price]) => ({
      _key: key("o"),
      _type: "menuOption",
      minutes,
      price,
    })),
  };
}

// Every spa's printed menu has the same treatments; only prices differ.
function buildMenu(p: Prices) {
  const sixtyNinety = (name: string, [a, b]: [number, number]) =>
    item(name, "massage", [
      [60, a],
      [90, b],
    ]);
  return [
    item("Deep Sleep", "sojourn", [[120, p.deepSleep]]),
    item("Nourish", "sojourn", [[120, p.nourish]]),
    item("Royal Renewal", "sojourn", [[300, p.royalRenewal]]),
    // Printed as "each": charged for both guests.
    item("Couple's Retreat", "couple", [[90, p.coupleRetreat]], true),
    item("Couple's Bliss", "couple", [[60, p.coupleBliss]], true),
    sixtyNinety("Swedish Massage", p.swedish),
    sixtyNinety("Deep Tissue Massage", p.deepTissue),
    sixtyNinety("Aroma Massage", p.aroma),
    sixtyNinety("Indian Abhyanga", p.abhyanga),
    sixtyNinety("Ayurvedic Potli Massage", p.potli),
    typeof p.signature === "number"
      ? item(p.signatureName, "massage", [[90, p.signature]])
      : sixtyNinety(p.signatureName, p.signature),
    item("Renew & Glow Body Scrub", "glamour", [[45, p.bodyTreatment]]),
    item("Renew & Glow Body Polisher", "glamour", [[45, p.bodyTreatment]]),
    item("Soothe & Revive Body Masque", "glamour", [[45, p.bodyTreatment]]),
    item("Cleansing Facial", "glamour", [[30, p.cleansingFacial]]),
    item("Shine Facial", "glamour", [[60, p.facial60]]),
    item("Young & Radiant Facial", "glamour", [[60, p.facial60]]),
    item("Marma Head Massage", "rapid", [[30, p.rapid]]),
    item("Kansa Glow Face Massage", "rapid", [[30, p.rapid]]),
    item("Foot to Knee Bliss", "rapid", [[30, p.rapid]]),
    item("Kansa Foot Revive Massage", "rapid", [[30, p.rapid]]),
    item("Back Massage", "rapid", [[30, p.rapid]]),
  ];
}

const MENUS: { slug: string; label: string; phone: string; prices: Prices }[] =
  [
    {
      // Strawberry Hills, Satobari, near Dal Lake – McLeod Ganj, Dharamshala
      slug: "indraprastha-dharamshala",
      label: "Indraprastha Resort, Dharamshala",
      phone: "+91 7250333494",
      prices: {
        deepSleep: 6750,
        nourish: 5850,
        royalRenewal: 14625,
        coupleRetreat: 10350,
        coupleBliss: 6900,
        swedish: [3900, 5850],
        deepTissue: [4600, 6900],
        aroma: [5100, 7200],
        abhyanga: [3900, 5850],
        potli: [4600, 6900],
        signature: 6830,
        signatureName: "Kynta Signature Therapy",
        bodyTreatment: 2500,
        cleansingFacial: 2000,
        facial60: 3000,
        rapid: 2100,
      },
    },
    {
      // Chamba Rd, near Bus Stand, Moti Tiba, Dalhousie
      slug: "indraprastha-dalhousie",
      label: "Indraprastha Spa Resort, Dalhousie",
      phone: "+91 7250333494",
      prices: {
        deepSleep: 3999,
        nourish: 3000,
        royalRenewal: 7875,
        coupleRetreat: 4200,
        coupleBliss: 3150,
        swedish: [2100, 2850],
        deepTissue: [2300, 3150],
        aroma: [2500, 3250],
        abhyanga: [2100, 2850],
        potli: [2500, 3250],
        signature: 3500,
        signatureName: "Kynta Signature Therapy",
        bodyTreatment: 1350,
        cleansingFacial: 1250,
        facial60: 1700,
        rapid: 1100,
      },
    },
    {
      // Village Hokra, Ajmer–Pushkar Bypass (printed menu is "Nirwana Wellness";
      // Royal Renewal is six massages there)
      slug: "bhanjwar-palace",
      label: "Bhanwar Singh Palace, Pushkar",
      phone: "+91 7250333494",
      prices: {
        deepSleep: 6000,
        nourish: 5200,
        royalRenewal: 16800,
        coupleRetreat: 7200,
        coupleBliss: 5100,
        swedish: [3200, 4500],
        deepTissue: [3500, 5000],
        aroma: [3800, 5500],
        abhyanga: [3200, 4500],
        potli: [4500, 6000],
        signature: [4500, 6000],
        signatureName: "Signature Therapy",
        bodyTreatment: 2500,
        cleansingFacial: 2000,
        facial60: 3000,
        rapid: 2000,
      },
    },
  ];

// Brahma Mandir Rd, near Savitri Mata Temple, Pushkar: which spa is this?
const BRAHMA_MANDIR: Prices = {
  deepSleep: 5700,
  nourish: 4800,
  royalRenewal: 12750,
  coupleRetreat: 7200,
  coupleBliss: 5100,
  swedish: [3400, 4800],
  deepTissue: [3900, 5400],
  aroma: [4200, 5900],
  abhyanga: [3400, 4800],
  potli: [4200, 5900],
  signature: 6000,
  signatureName: "Kynta Signature Therapy",
  bodyTreatment: 2500,
  cleansingFacial: 2000,
  facial60: 3000,
  rapid: 2100,
};
if (brahmaMandirSlug) {
  MENUS.push({
    slug: brahmaMandirSlug,
    label: "Brahma Mandir Rd, Pushkar",
    phone: "+91 7250333494",
    prices: BRAHMA_MANDIR,
  });
}

async function main() {
  const ids: string[] = await client.fetch(
    `*[_type == "locationsPage"]._id`,
    {},
    { perspective: "raw" },
  );
  if (ids.length === 0) throw new Error("No Locations page in Sanity yet.");

  const backupDir = path.join(process.cwd(), "sanity", "backups");
  mkdirSync(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");

  const targets = MENUS.filter((m) => !only || only.includes(m.slug));
  if (targets.length === 0) throw new Error(`Nothing matches --only=${only}`);

  // Write to the published page and to any unpublished draft of it, so
  // publishing a draft later doesn't drop the menus.
  for (const id of ids) {
    const doc = await client.getDocument(id);
    if (!doc) continue;
    writeFileSync(
      path.join(backupDir, `${id}-before-menus-${stamp}.json`),
      JSON.stringify(doc, null, 2),
    );
    const slugs = new Set(
      ((doc.locations as { slug?: string }[] | undefined) ?? []).map(
        (l) => l.slug,
      ),
    );

    let tx = client.patch(id).setIfMissing({ gstPercent: 18 });
    for (const menu of targets) {
      if (!slugs.has(menu.slug)) {
        console.warn(
          `  ! ${id}: no location with slug "${menu.slug}", skipped`,
        );
        continue;
      }
      const items = buildMenu(menu.prices);
      tx = tx.set({
        [`locations[slug=="${menu.slug}"].menu`]: items,
        [`locations[slug=="${menu.slug}"].phone`]: menu.phone,
      });
      console.log(
        `  ${dryRun ? "would set" : "✓"} ${id}: ${menu.label} — ${items.length} treatments`,
      );
    }
    if (!dryRun) await tx.commit();
  }
  console.log(
    dryRun
      ? "\nDry run: nothing written."
      : `\nDone. Backups in ${path.relative(process.cwd(), backupDir)}`,
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
